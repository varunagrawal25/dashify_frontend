import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { add_social_account } from "./apis/social_platforms";
import swal from "sweetalert";
import {secure_pin} from "../config"

class AvvoLogin extends Component {
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
    // code: "",
    // access_token: ""
  };

  // componentDidMount = () => {
  //   // console.log("avvo props", this.props);
  //   this.setState({
  //     code: this.props.location.search.split("?code=")[1],
  //     acces_token: this.props.location.hash.split("#access_token=")[1]
  //   });
  // };

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
      this.setState({ url_error: "Enter Avvo's Lawyer Id" });
      console.log("i am in console");
      isError = true;
    }

    const DjangoConfig = {
      headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
    };

    if (isError == false) {
      this.setState({ loading: true });
      const AvvoConfig = {
        headers: {
          Authorization:
            "Bearer " + this.props.location.hash.split("#access_token=")[1]
        }
      };
      Axios.get(
        "https://cors-anywhere.herokuapp.com/https://api.avvo.com/api/4/lawyers.json?id[]=" +
          this.state.url,
        AvvoConfig
      )
        .then(res => {
          console.log("Avvo checking data", res.data);
          if (res.data.lawyers.length != 0) {
            let resp_data = res.data.lawyers[0];
            const data = {
              // location_id: localStorage.getItem("locationId"),
              // Platform: "Avvo",
              // Token: this.props.location.hash.split("#access_token=")[1],
              // Username: resp_data.firstname + " " + resp_data.lastname,
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
              "connect_type":"Avvo",
            };

            add_social_account(data, DjangoConfig)
              .then(resp => {
                console.log("Avvo resp", resp.data);
                this.setState({ isUrl: true, loading: false });
              })
              .catch(resp => {
                swal("Invalid Avvo's Lawyer Id");
                console.log("Avvo resp", resp.data);
                this.setState({
                  // wrong: "Invalid Avvo's Lawyer Id",
                  loading: false
                });
              });
          } else {
            swal("Invalid Avvo's Lawyer Id");
            this.setState({
              loading: false
            });
          }
        })
        .catch(res => {
          swal("Invalid Avvo's Lawyer Id");
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
          <img src={require("../images/avvo.png")} alt="Avvo" />
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
                <label htmlFor="url">Avvo's Lawyer Id</label>
                <input
                  type="url"
                  id="url"
                  value={this.state.url}
                  placeholder="1441968"
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

export default AvvoLogin;
