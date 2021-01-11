import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { add_social_account } from "./apis/social_platforms";
import Spinner from "./common/Spinner";
import swal from "sweetalert";
import {secure_pin} from "../config"

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

class TomtomRelatedLocation extends Component {
  state = {
    loading: false,
    isUrl: false
  };

  onSubmit = data => e => {
    e.preventDefault();
    this.setState({ loading: true });

    let tomtom_data = JSON.parse(localStorage.getItem("tomtom_data"));
    console.log("tomtom data0", data);
    console.log("tomtom data1", tomtom_data);
    const data2 = {
      // location_id: localStorage.getItem("locationId"),
      // Platform: "Tomtom",
      // Token: "",
      // Username: data.poi.name,
      // Email: tomtom_data.Username,
      // Password: tomtom_data.password,
      // Connect_status: "Connect",
      // Other_info: data.dataSources ? data.dataSources.poiDetails[0].id : "-"

      secure_pin,
              "user_id":localStorage.getItem("UserId"),
              "location_id":localStorage.getItem("locationId"),
              "connect_unique_id":"",
              "token":"",
              "username":"",
              "password":tomtom_data.password,
              "first_name":"",
              "last_name":"",
              "email_id":tomtom_data.Username,
              "connect_url": this.state.url,
              "connect_type":"Tomtom",
    };

    // Axios.post(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/social-platforms/add-account",
    //   data2,
    //   DjangoConfig
    // )
    add_social_account(data2)
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
  };

  render() {
    if (this.state.isUrl) {
      return (
        <Redirect
          to={
            "/locations/" + localStorage.getItem("locationId") + "/view-listing"
          }
        />
      );
    }

    let all_locations = JSON.parse(localStorage.getItem("tomtom_locations"));

    console.log("tomtom location", all_locations);
    // console.log("tomtom location items", all_locations.results);

    const allLocations = all_locations.results.map((l, i) => {
      if (l.poi) {
        return (
          <form onSubmit={this.onSubmit(l)}>
            <div className="listdata" key={l.id}>
              <div className="row d-flex">
                <div className="col-md-3">
                  <div className="authordata ">
                    <div className="authordatatext">
                      <h3>{l.poi.name}</h3>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="text-center">
                    <h4>{l.address.freeformAddress}</h4>
                    <br />
                    <h4>
                      <b>Call: </b>
                      {l.poi.phone}
                    </h4>
                    <br />
                    <h4>
                      <b>Id: </b>
                      {l.dataSources ? l.dataSources.poiDetails[0].id : "-"}
                    </h4>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="text-center phonenumber">
                    {l.poi.categories
                      ? l.poi.categories.map(data => (
                          <div style={{ marginTop: 10 }}>
                            <h4>
                              <b>{data}</b>
                            </h4>
                          </div>
                        ))
                      : "-"}
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="action">
                    <button type="submit">connect</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        );
      }
    });

    return (
      <div>
        <div className="rightside_title">
          <div className="foursquer-logo">
            <img src={require("../images/tomtom.png")} alt="Tomtom" />
          </div>
          <h1>Tomtom related results</h1>
        </div>
        <div className="tablediv">
          <div className="border-bottom">
            <div className="dataview nametop">
              <div className="titledivb">
                <div className="row">
                  <div className="col-md-3">
                    <div className="company-name text-left">Name</div>
                  </div>
                  <div className="col-md-3">
                    <div className="company-name text-center">Address</div>
                  </div>
                  <div className="col-md-3">
                    <div className="company-name text-center">Categories</div>
                  </div>
                  <div className="col-md-3">
                    <div className="company-name text-center">Action</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {all_locations.results.length == 0 ? (
            <h4>No related result</h4>
          ) : (
            <div>{allLocations}</div>
          )}
        </div>
      </div>
    );
  }
}

export default TomtomRelatedLocation;
