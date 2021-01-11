import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { add_social_account } from "./apis/social_platforms";
import swal from "sweetalert";
import {secure_pin} from "../config"

class TomtomLogin extends Component {
  state = {
    businessName: "",
    city: "",
    state: "",
    country: "",
    username: "",
    password: "",
    log: false,
    isUrl: false,
    isId: false,
    username_error: "",
    password_error: "",
    city_error: "",
    state_error: "",
    country_error: "",
    wrong: "",
    loading: false
  };

  onSubmit = e => {
    e.preventDefault();

    let isError = false;
    this.setState({
      username_error: "",
      password_error: "",
      businessName_error: "",
      city_error: "",
      state_error: "",
      country_error: "",
      wrong: ""
    });

    if (this.state.username == "") {
      this.setState({
        username_error: "Enter Your Email"
      });
      isError = true;
    }
    if (this.state.password == "") {
      this.setState({ password_error: "Enter Your Password" });
      isError = true;
    }
    if (this.state.businessName == "") {
      this.setState({ businessName_error: "Enter Your Business Name" });
      console.log("i am in console");
      isError = true;
    }
    if (this.state.city == "") {
      this.setState({ city_error: "Enter Your City" });
      console.log("i am in console");
      isError = true;
    }
    if (this.state.state == "") {
      this.setState({ state_error: "Enter Your State" });
      console.log("i am in console");
      isError = true;
    }
    if (this.state.country == "") {
      this.setState({ country_error: "Enter Your Country" });
      console.log("i am in console");
      isError = true;
    }
const data={ secure_pin,
  "user_id":localStorage.getItem("UserId"),
  "location_id":localStorage.getItem("locationId"),
  "connect_unique_id":"",
  "token":"",
  "username":"",
  "password":this.state.password,
  "first_name":"",
  "last_name":"",
  "email_id":this.state.Username,
  "connect_url": "",
  "connect_type":"Tomtom",
};

// Axios.post(
//   "https://cors-anywhere.herokuapp.com/https://dashify.biz/social-platforms/add-account",
//   data2,
//   DjangoConfig
// )
add_social_account(data)
.then(resp => {
console.log("Tomtom register response", resp.data);
this.setState({ isUrl: true, loading: false });
swal("Successfully Connected");
})
.catch(resp => {
swal("Something went wrong");
console.log("Tomtom error response", resp.data);
this.setState({ loading: false });
});
   

    if (isError == false) {
      this.setState({ loading: true });
      const search_address =
        this.state.businessName +
        "," +
        this.state.city +
        "," +
        this.state.state +
        "," +
        this.state.country;
      Axios.get(
        "https://api.tomtom.com/search/2/search/" +
          search_address +
          ".json?key=IRUplE1TqUPstrlMA2N51xASusnsDsEd"
      )
        .then(async res => {
          console.log("tomtom response data", res.data);


          if (res.data.results.length >= 1) {
            await localStorage.setItem(
              "tomtom_locations",
              JSON.stringify(res.data)
            );
           
            this.setState({ isId: true, loading: false });
          } else {
            swal("No result found");
            this.setState({
              loading: false
            });
          }
        })
        .catch(res => {
          this.setState({ loading: false });
        });
    }
  };

  render() {
    if (this.state.isId) {
      return   <Redirect
      to={
        "/locations/" +
        localStorage.getItem("locationId") +
        "/view-listing"
      }
    />;
    }

    return (
      <div>
        <div className="foursquer-logo">
          <img src={require("../images/tomtom.png")} alt="Tomtom" />
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
                <label htmlFor="url">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  value={this.state.businessName}
                  placeholder="Javed Habib Saloon"
                  onChange={e =>
                    this.setState({ businessName: e.target.value })
                  }
                />
                <div class='err_msg'>
                  {this.state.businessName_error}
                </div>
              </p>
              <p>
                <label htmlFor="url">City</label>
                <input
                  type="text"
                  id="city"
                  value={this.state.city}
                  placeholder="Gwalior"
                  onChange={e => this.setState({ city: e.target.value })}
                />
                <div class='err_msg'>{this.state.city_error}</div>
              </p>
              <p>
                <label htmlFor="url">State</label>
                <input
                  type="text"
                  id="state"
                  value={this.state.state}
                  placeholder="Madhya Pradesh"
                  onChange={e => this.setState({ state: e.target.value })}
                />
                <div class='err_msg'>{this.state.state_error}</div>
              </p>
              <p>
                <label htmlFor="url">Country</label>
                <input
                  type="text"
                  id="country"
                  value={this.state.country}
                  placeholder="India"
                  onChange={e => this.setState({ country: e.target.value })}
                />
                <div class='err_msg'>{this.state.country_error}</div>
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

export default TomtomLogin;
