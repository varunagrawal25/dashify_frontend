import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { add_social_account } from "./apis/social_platforms";

class CitySearchLogin extends Component {
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

      const citysearchUrl = this.state.url.split("/")[4];
      localStorage.setItem("citysearchUrl", citysearchUrl);

      Axios.get(
        "https://cors-anywhere.herokuapp.com/https://api.citygridmedia.com/content/places/v2/detail?id=" +
          this.state.url.split("/")[4] +
          "&id_type=cs&client_ip=123.4.56.78&publisher=test&format=json"
      )
        .then(res => {
          if (res.data) {
            console.log("citysearch response", res.data);
            const data = {
              location_id: localStorage.getItem("locationId"),
              Platform: "Citysearch",
              Token: "",
              Username: res.data.locations
                ? res.data.locations[0].name
                : this.state.username,
              Email: this.state.username,
              Password: "",
              Connect_status: "Connect",
              Other_info: "{'URL':" + this.state.url + ",'data':''}"
            };

            // Axios.post(
            //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/social-platforms/add-account",
            //   data,
            //   DjangoConfig
            // )
            add_social_account(data, DjangoConfig)
              .then(resp => {
                console.log("citysearch resp", resp);
                this.setState({ isUrl: true, loading: false });
              })
              .catch(resp => {
                alert("Invalid username or password");
                console.log("citysearch resp", resp);
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
        .catch(res => {
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
          <img src={require("../images/citysearch.png")} alt="citysearch" />
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
                <label htmlFor="url">Citysearch Listing Url</label>
                <input
                  type="text"
                  id="url"
                  value={this.state.url}
                  placeholder="http://www.citysearch.com/profile/656716190/midland_tx/rogers_ford_sales_inc.html"
                  onChange={e => this.setState({ url: e.target.value })}
                />
                <div class='err_msg'>{this.state.url_error}</div>
              </p>

              <p>
                <label htmlFor="username">Citysearch Email</label>
                <input
                  type="text"
                  id="username"
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <div class='err_msg'>{this.state.username_error}</div>
              </p>
              <p>
                <label htmlFor="password">Citysearch Password</label>
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

export default CitySearchLogin;
