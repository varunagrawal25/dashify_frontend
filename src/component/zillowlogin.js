import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { add_social_account } from "./apis/social_platforms";
import swal from "sweetalert";
import {secure_pin} from "../config"

class ZillowLogin extends Component {
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
      console.log("i am in console");
      isError = true;
    }

    const DjangoConfig = {
      headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
    };

    if (isError == false) {
      this.setState({ loading: true });
      Axios.get(
        "https://www.zillow.com/webservice/ProReviews.htm?zws-id=X1-ZWz170sf100mbv_7lwvq&email=" +
          this.state.url +
          "&count=10&output=json"
      )
        .then(res => {
          console.log("zillow checking data", res.data);
          if (
            res.data.message &&
            res.data.message.text == "Request successfully processed"
          ) {
            const data = {
              // location_id: localStorage.getItem("locationId"),
              // Platform: "Zillow",
              // Token: "",
              // Username:
              //   res.data.response &&
              //   res.data.response.results &&
              //   res.data.response.results.proInfo &&
              //   res.data.response.results.proInfo.businessName
              //     ? res.data.response.results.proInfo.businessName
              //     : this.state.username,
              // Email: this.state.username,
              // Password: this.state.password,
              // Connect_status: "Connect",
              // Other_info: this.state.url

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
              "connect_type":"Zillow",
            };

            // Axios.post(
            //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/social-platforms/add-account",
            //   data,
            //   DjangoConfig
            // )
            add_social_account(data, DjangoConfig)
              .then(resp => {
                console.log("zillow resp", resp.data);
                this.setState({ isUrl: true, loading: false });
              })
              .catch(resp => {
                swal("Invalid Zillow Email");
                console.log("zillow resp", resp.data);
                this.setState({
                  // wrong: "Invalid Zillow Email",
                  loading: false
                });
              });
          } else {
            swal("Invalid Zillow Email");
            this.setState({
              loading: false
            });
          }
        })
        .catch(res => {
          swal("Invalid Zillow Email");
          this.setState({ loading: false });
        });
    }
  };

  render() {
    if (this.state.isUrl) {
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
          <img src={require("../images/zillow.png")} alt="Zillow" />
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
                <label htmlFor="url">Zillow Email</label>
                <input
                  type="url"
                  id="url"
                  value={this.state.url}
                  placeholder="example@gmail.com"
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

export default ZillowLogin;
