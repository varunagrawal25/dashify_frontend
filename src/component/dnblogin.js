import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { add_social_account } from "./apis/social_platforms";
import swal from "sweetalert";
import {secure_pin} from "../config"
const DnbConfig = {
  headers: {
    "x-dnb-user": "P200000D5647887A34E4067B86A78E31",
    "x-dnb-pwd": "digimonk@123"
  }
};

class DnbLogin extends Component {
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
    loading: false,
    token: ""
  };

  componentDidMount = () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "T" +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

    const data = {
      ApplicationTransactionID: "1234",
      ServiceTransactionID: "5678",
      //    TransactionTimestamp: "2001-12-17T09:30:47Z"
      TransactionTimestamp: date
    };

    Axios.post(
      "https://cors-anywhere.herokuapp.com/https://direct.dnb.com/Authentication/V2.0/",
      data,
      DnbConfig
    )
      .then(resp => {
        console.log("DNB authentication", resp.data);
        this.setState({ token: resp.data.AuthenticationDetail.Token });
      })
      .catch(resp => {
        console.log("DNB authentication error", resp.data);
        swal("Admin side error");
      });
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
      this.setState({ url_error: "Enter Company DUNS Number" });
      isError = true;
    }

    if (!isError) {
      this.setState({ loading: true });

      const DjangoConfig = {
        headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
      };

      const DnbAuthorization = {
        headers: { Authorization: this.state.token }
      };

      Axios.get(
        "https://cors-anywhere.herokuapp.com/https://direct.dnb.com/V6.0/organizations?match=true&MatchTypeText=Basic&DUNSNumber=" +
          this.state.url,
        DnbAuthorization
      )
        .then(resp => {
          console.log("DNB result", resp.data);

          if (
            resp.data.MatchResponse &&
            resp.data.MatchResponse.TransactionResult &&
            resp.data.MatchResponse.TransactionResult.ResultText == "Success"
          ) {
            const data = {
              // location_id: localStorage.getItem("locationId"),
              // Platform: "Dnb",
              // Token: this.state.token,
              // Username:
              //   resp.data.MatchResponse.MatchResponseDetail.MatchCandidate[0]
              //     .OrganizationPrimaryName.OrganizationName.$,
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
              "connect_type":"Dnb",
            };
            add_social_account(data, DjangoConfig)
              .then(resp => {
                console.log("add social account", resp.data);
                this.setState({ isUrl: true, loading: false });
              })
              .catch(resp => {
                console.log("add social account error", resp);
                this.setState({
                  wrong: "Something went wrong",
                  loading: false
                });
              });
          } else {
            this.setState({
              wrong: "No match found for the requested Duns number.",
              loading: false
            });
          }
        })
        .catch(resp => {
          console.log("DNB error", resp);
          this.setState({
            wrong: "No match found for the requested Duns number.",
            loading: false
          });
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
          <img src={require("../images/dnb.jpg")} alt="DandB" />
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
                <label htmlFor="url">Company DUNS Number</label>
                <input
                  type="url"
                  id="url"
                  value={this.state.url}
                  placeholder="804735132"
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

export default DnbLogin;
