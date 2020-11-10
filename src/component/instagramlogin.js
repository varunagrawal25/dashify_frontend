import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { add_social_account } from "./apis/social_platforms";

class InstagramLogin extends Component {
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
      this.setState({ url_error: "Enter your Instagram user id" });
      isError = true;
    }

    if (!isError) {
      this.setState({ loading: true });

      const DjangoConfig = {
        headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
      };
      const instagramUrl = this.state.url;
      // localStorage.setItem('instagramUrl', instagramUrl);
      const data = {
        location_id: localStorage.getItem("locationId"),
        Platform: "Instagram",
        Token: "",
        Username: this.state.url,
        Email: this.state.username,
        Password: "",
        Connect_status: "Connect",
        Other_info: "{'URL':" + this.state.url + ",'data':''}"
      };

      Axios.get("https://www.instagram.com/" + this.state.url + "/?__a=1")
        .then(res => {
          if (res.data.graphql.user) {
            add_social_account(data, DjangoConfig)
              .then(resp => {
                console.log(resp);
                this.setState({ isUrl: true, loading: false });
              })
              .catch(resp => {
                console.log(resp);
                alert("Invalid username or password");
                this.setState({
                  wrong: "Invalid or Not authorised",
                  loading: false
                });
              });
          } else {
            alert("Invalid username or password");
            this.setState({ loading: false });
          }
        })
        .catch(resp => {
          alert("Invalid username or password");
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
          <img src={require("../images/instagram.png")} alt="instagram" />
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
                <label htmlFor="url">Instagram User Id</label>
                <input
                  type="text"
                  id="url"
                  value={this.state.url}
                  placeholder="teamdigimonk"
                  onChange={e => this.setState({ url: e.target.value })}
                />
                <div class='err_msg'>{this.state.url_error}</div>
              </p>

              <p>
                <label htmlFor="username">Instagram Email</label>
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

export default InstagramLogin;
