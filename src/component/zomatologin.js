import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { add_social_account } from "./apis/social_platforms";

const Zomatoconfig = {
  headers: {
    "user-key": "0850988704eeed5da2f4d38fdfc582c1",
    Accept: "application/json"
  }
};
const DjangoConfig = {
  headers: {
    Authorization: "Token " + localStorage.getItem("UserToken")
  }
};

class ZomatoLogin extends Component {
  state = {
    url: "",
    username: "",
    password: "",
    log: false,
    isUrl: false,
    username_error: "",
    password_error: "",
    url_error: "",
    wrong: "",
    loading: false
  };

  onSubmit = e => {
    e.preventDefault();

    let isError = false;
    this.setState({
      username_error: "",
      password_error: "",
      url_error: "",
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
    if (this.state.url == "") {
      this.setState({ url_error: "Enter your restaurant id" });
      console.log("i am in console");
      isError = true;
    }

    if (isError == false) {
      this.setState({ loading: true });
      Axios.get(
        "https://developers.zomato.com/api/v2.1/restaurant?res_id=" +
          this.state.url,
        Zomatoconfig
      )
        .then(res => {
          // console.log("zomato checking data", res.data);
          if (res.data && res.data.name) {
            const data = {
              location_id: localStorage.getItem("locationId"),
              Platform: "Zomato",
              Token: "",
              Username: res.data.name,
              Email: this.state.username,
              Password: this.state.password,
              Connect_status: "Connect",
              Other_info: this.state.url
            };

            // Axios.post(
            //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/social-platforms/add-account",
            //   data,
            //   DjangoConfig
            // );
            add_social_account(data, DjangoConfig)
              .then(resp => {
                console.log("zomato resp", resp.data);
                this.setState({ isUrl: true, loading: false });
              })
              .catch(resp => {
                alert("Invalid Zomato id");
                console.log("Zomato resp", resp.data);
                this.setState({
                  loading: false
                });
              });
          } else {
            alert("Invalid Zomato id");
            this.setState({ loading: false });
          }
        })
        .catch(res => {
          alert("Invalid Zomato id");
          this.setState({ loading: false });
        });
    }
  };

  render() {
    if (this.state.isUrl) {
      return (
        <Redirect
          to={
            "/dashboard#/locations/" +
            localStorage.getItem("locationId") +
            "/view-listing"
          }
        />
      );
    }

    return (
      <div>
        <div className="foursquer-logo">
          <img src={require("../images/zomato.png")} alt="Zomato" />
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
                <div class='err_msg'>{this.state.wrong}</div>
              )}
              <p>
                <label htmlFor="url">Zomato Restaurant Id</label>
                <input
                  type="text"
                  id="url"
                  value={this.state.url}
                  placeholder="18740397"
                  onChange={e => this.setState({ url: e.target.value })}
                />
                <div class='err_msg'>{this.state.url_error}</div>
              </p>

              <p>
                <label htmlFor="username">Email</label>
                <input
                  type="text"
                  id="username"
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <div class='err_msg'>{this.state.username_error}</div>
              </p>
              <p>
                <label htmlFor="password">Password</label>
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

export default ZomatoLogin;
