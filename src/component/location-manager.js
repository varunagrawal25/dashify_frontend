import React, { Component } from "react";
import Axios from "axios";
import Spinner from "./common/Spinner";
import { all_location } from "./apis/location";

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

export default class ViewLocations extends Component {
  state = {
    loader: true,
    AllLocations: [],
    currentPage: 1,
    LocationsPerPage: 3
  };

  componentDidMount() {
    const DjangoConfig1 = {
      headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
    };
    const data = {
      user_id: localStorage.getItem("UserId")
    };

    // Axios.post(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/locations/get-all-locations",
    //   data,
    //   DjangoConfig1
    // )
    all_location(data, DjangoConfig1)
      .then(res => {
        console.log(res);
        console.log(res.data.all_location);

        this.setState({ AllLocations: res.data.all_location, loader: false });
      })
      .catch(res => {
        console.log("error in LocationManager", res);
        this.setState({ loader: false });
      });
  }

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  };

  changeItemsPerPage = event => {
    console.log("items", event.target.value);
  };

  render() {
    var link;

    const { AllLocations, currentPage, LocationsPerPage } = this.state;

    // Logic for displaying Locations
    const indexOfLastLocation = currentPage * LocationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - LocationsPerPage;
    const currentLocations = AllLocations.slice(
      indexOfFirstLocation,
      indexOfLastLocation
    );

    const renderLocations = currentLocations.map((loc, index) => {
      return (
        <div className="listdata" key={loc.id}>
          <div className="row d-flex">
            <div className="col-md-3">
              <div className="authordata ">
                <img
                  src={
                    loc.Business_Logo
                      ? "https://dashify.biz" + loc.Business_Logo
                      : require("../images/Logo2.png")
                  }
                  height="100"
                  width="100"
                />
                <div className="authordatatext">
                  <h4>{loc.Location_name}</h4>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="text-center address">
                <h4>{loc.Address_1}</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center phonenumber">
                <h4>{loc.Phone_no}</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center action">
                <div style={{ display: "none" }}>
                  {(link = "dashboard#/locations/" + loc.id + "/view-location")}
                </div>
                <a
                  href={link}
                  onClick={() => {
                    localStorage.setItem("locationId", loc.id.toString());
                    localStorage.setItem("locationName", loc.Location_name);
                  }}
                >
                  View listing
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(AllLocations.length / LocationsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li>
          <a key={number} id={number} onClick={this.handleClick}>
            {number}
          </a>
        </li>
      );
    });

    return (
      <div>
        {this.state.loader ? (
          <div className="rightside_title">
            <Spinner />
          </div>
        ) : (
          <div>
            {/* <div className="content-page"> */}

            <div className="rightside_title">
              <h1>Location Manager</h1>
            </div>

            <div className="tablediv">
              <div className="border-bottom">
                <div className="dataview nametop">
                  <div className="titledivb">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="company-name text-left">
                          Company Name
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="company-name text-center">Address</div>
                      </div>
                      <div className="col-md-3">
                        <div className="company-name text-center">
                          Phone Number
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="company-name text-center">Action</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {this.state.AllLocations.length == 0 ? (
                // <Spinner />
                <h4>No Location added, Please add some loaction</h4>
              ) : (
                <div>
                  {renderLocations}
                  <div className="pagination-main">
                    <div className="pagination">
                      <ul>
                        <li className="prev">
                          <a href="#">Previous</a>
                        </li>
                        {renderPageNumbers}
                        <li className="next">
                          <a href="#">Next</a>
                        </li>

                        <li className="itempage dropdown">
                          <a className="dropdown-select" data-toggle="dropdown">
                            {this.state.LocationsPerPage == 999999
                              ? "All"
                              : this.state.LocationsPerPage}{" "}
                            Items/page{" "}
                          </a>
                          <ul className="dropdown-menu">
                            <li
                              onClick={() =>
                                this.setState({ LocationsPerPage: 3 })
                              }
                            >
                              3 Items/page
                            </li>
                            <li
                              onClick={() =>
                                this.setState({ LocationsPerPage: 10 })
                              }
                            >
                              10 Items/page
                            </li>
                            <li
                              onClick={() =>
                                this.setState({ LocationsPerPage: 20 })
                              }
                            >
                              20 Items/page
                            </li>
                            <li
                              onClick={() =>
                                this.setState({ LocationsPerPage: 50 })
                              }
                            >
                              50 Items/page
                            </li>
                            <li
                              onClick={() =>
                                this.setState({ LocationsPerPage: 99 })
                              }
                            >
                              99 Items/page
                            </li>
                            <li
                              onClick={() =>
                                this.setState({ LocationsPerPage: 999999 })
                              }
                            >
                              All Items/page
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
