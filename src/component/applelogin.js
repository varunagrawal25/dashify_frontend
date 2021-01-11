import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { add_social_account } from "./apis/social_platforms";
import swal from "sweetalert";

class AppleLogin extends Component {
  state = {
    id: "",
    username: "",
    password: "",
    log: false,
    isId: false,
    username_error: "",
    password_error: "",
    id_error: "",
    wrong: "",
    loading: false
  };

  onSubmit = e => {
    e.preventDefault();

    let isError = false;

    this.setState({
      username_error: "",
      password_error: "",
      id_error: "",
      wrong: ""
    });

    if (this.state.username == "") {
      this.setState({
        username_error: "Enter your Email"
      });
      isError = true;
    }
    if (this.state.password == "") {
      this.setState({ password_error: "Enter your password" });
      isError = true;
    }
    if (this.state.id == "") {
      this.setState({ id_error: "Enter Url" });
      isError = true;
    }

    if (!isError) {
      this.setState({ loading: true });

      const DjangoConfig = {
        headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
      };

      // const appleId = this.state.id.split("/")[6].slice(2);
      // localStorage.setItem("appleId", appleId)

      if (this.state.id.split("/")[6]) {
        Axios.get(
          "https://itunes.apple.com/in/rss/customerreviews/id=" +
            this.state.id.split("/")[6].slice(2) +
            "/sortBy=mostRecent/json"
        )
          .then(res => {
            if (res.data && res.data.feed && res.data.feed.entry) {
              const data = {
                location_id: localStorage.getItem("locationId"),
                Platform: "Apple",
                Token: "",
                Username: this.state.id.split("/")[5],
                Email: this.state.username,
                Password: "",
                Connect_status: "Connect",
                Other_info: "{'URL':" + this.state.id + ",'data':''}"
              };

              // console.log("apple esponse", res.data);
              // Axios.post(
              //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/social-platforms/add-account",
              //   data,
              //   DjangoConfig
              // )
              add_social_account(data, DjangoConfig)
                .then(resp => {
                  console.log("apple response", resp);
                  this.setState({ isId: true, loading: false });
                })
                .catch(resp => {
                  console.log("apple response", resp);
                  swal("Invalid username or password");
                  this.setState({
                    wrong: "Invalid or Not authorised",
                    loading: false
                  });
                });
            } else {
              swal("Invalid url");
              this.setState({ loading: false });
            }
          })
          .catch(resp => {
            swal("Invalid username or password");
            this.setState({ loading: false });
          });
      } else {
        swal("Invalid username or password");
        this.setState({ loading: false });
      }
    }
  };

  render() {
    if (this.state.isId) {
      return (
        <Redirect
        to={
          "/locations/" +
          localStorage.getItem("locationId") +
          "/view-listing"
        }
      />
      );
    }

    return (
      <div>
        <div className="foursquer-logo">
          <img src={require("../images/apple.png")} alt="" />
        </div>
        <div className="login_form">
          <form onSubmit={this.onSubmit}>
            <fieldset className="login_fieldset">
              <legend>Login</legend>
              {this.state.loading ? (
                <Loader
                  type="Oval"
                  color="#00BFFF"
                  height={25}
                  width={25}
                  // timeout={3000} //3 secs
                />
              ) : (
                <div classname='err_msg'>{this.state.wrong}</div>
              )}
              <p>
                <label htmlFor="url">Apple Listing Url</label>
                <input
                  type="url"
                  id="id"
                  value={this.state.id}
                  placeholder="https://apps.apple.com/us/app/ullu/id1435281792"
                  onChange={e => this.setState({ id: e.target.value })}
                />
                <div class='err_msg'>{this.state.id_error}</div>
              </p>

              <p>
                <label htmlFor="username">Apple Email</label>
                <input
                  type="text"
                  id="username"
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <div class='err_msg'>{this.state.username_error}</div>
              </p>
              <p>
                <label htmlFor="password">Apple Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <div class='err_msg'>{this.state.password_error}</div>
              </p>
              <p>
                {/* <button type="submit" ><Link to="/yelp">Login</Link></button> */}
                <button type="submit">Login</button>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default AppleLogin;
