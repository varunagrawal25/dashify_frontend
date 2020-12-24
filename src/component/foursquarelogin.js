import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { add_social_account } from "./apis/social_platforms";
import swal from "sweetalert";
import {secure_pin} from "../config"

class FourSquareLogin extends Component {
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
      this.setState({ url_error: "Enter Url" });
      isError = true;
    }

    if (!isError) {
      this.setState({ loading: true });

      const DjangoConfig = {
        headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
      };

      // const fourUrl = this.state.url.split("/")[5];
      // localStorage.setItem("fourUrl", fourUrl);

      Axios.get(
        "https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v2/venues/" +
          this.state.url.split("/")[5] +
          "?client_id=44RU2431YG02H4E00RQTLKEUKIKINQSFO2JBHII2WHH32PXZ&client_secret=FWV2WOL40MQ5M1YZ5E2TKUWIQ4WYZ1QUJXOQ24VGRSXFA3IY&v=20180323"
      )
        .then(res => {
          // console.log("citysearch resp",res);
          if (res.data && res.data.response && res.data.response.venue) {
            const data = {
              // location_id: localStorage.getItem("locationId"),
              // Platform: "Foursquare",
              // Token: "",
              // Username: res.data.response.venue.name,
              // Email: this.state.username,
              // Password: this.state.password,
              // Connect_status: "Connect",
              // Other_info: "{'URL':" + this.state.url + ",'data':''}"

              secure_pin,
        "user_id":localStorage.getItem("UserId"),
        "location_id":localStorage.getItem("locationId"),
        "connect_unique_id":"",
        "token":"",
        "username":"",
        "password":this.state.password,
        "first_name":"",
        "last_name":"",
        "email_id":this.state.username,
        "connect_url": this.state.url,
        "connect_type":"Foursquare",
            };

            add_social_account(data)
              .then(resp => {
                console.log(resp);
                this.setState({ isUrl: true, loading: false });
              })
              .catch(resp => {
                swal("Invalid username or password");
                console.log(resp);
                this.setState({
                  wrong: "Invalid or Not authorised",
                  loading: false
                });
              });
          } else {
            swal("Invalid urlp");
            this.setState({ loading: false });
          }
        })
        .catch(res => {
          swal("Invalid username or password");
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
          <img src={require("../images/foursquare.png")} alt="" />
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
                <label htmlFor="url">Foursquare Listing Url</label>
                <input
                  type="url"
                  id="url"
                  value={this.state.url}
                  placeholder="https://foursquare.com/v/mudspot/3fd66200f964a520c4f11ee3"
                  onChange={e => this.setState({ url: e.target.value })}
                />
                <div class='err_msg'>{this.state.url_error}</div>
              </p>

              <p>
                <label htmlFor="username">Foursquare Email</label>
                <input
                  type="text"
                  id="username"
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <div class='err_msg'>{this.state.username_error}</div>
              </p>
              <p>
                <label htmlFor="password">Foursquare Password</label>
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

export default FourSquareLogin;
