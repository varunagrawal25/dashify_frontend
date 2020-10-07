import React, { Component } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
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
        <div key={loc.id}>
          <hr className="linecard"></hr>
          <div className="row card-12">
            <div className="col-md-3 textchange-10">
              <img
                src={
                  loc.Business_Logo
                    ? loc.Business_Logo
                    : require("../images/Logo2.png")
                }
                height="100"
                width="100"
              />
              <span className="el_dorado">{loc.Location_name}</span>
            </div>
            <div className="col-md-3 textchange-10 res-list">
              <p>{loc.Address_1}</p>
            </div>
            <div className="col-md-3 res-list textchange-10">
              {loc.Phone_no}
            </div>
            <div className="col-md-3">
              <div className=" col-md-10 textchange-10 listingsbt-10 ">
                <div className="rest-list">
                  <div style={{ display: "none" }}>
                    {
                      (link =
                        "dashboard#/locations/" + loc.id + "/view-location")
                    }
                  </div>
                  <a
                    href={link}
                    onClick={() => {
                      localStorage.setItem("locationId", loc.id.toString());
                      localStorage.setItem("locationName", loc.Location_name);
                    }}
                  >
                    View listing
                  </a>{" "}
                </div>
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
        <div className="col-md-1">
          <a key={number} id={number} onClick={this.handleClick}>
            {number}
          </a>
        </div>
      );
    });
    return (
      <>
        {/* <div className="left-side-menu"></div>
        <div className="content-page"> */}
        {this.state.loader ? (
          <div className="rightside_title">
            <Spinner />
          </div>
        ) : (
          <div className="container" id="overview-10">
            <div className="col-12 ">
              <div className="list-head">Listing</div>
              <div className="card_list">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row card-12 gap-10 textchange-10">
                      <div className="col-md-3">Company name</div>
                      <div className="col-md-3">Address</div>
                      <div className="col-md-3"> Phone number</div>
                      <div className="col-md-3"> Action</div>
                    </div>
                    {this.state.AllLocations.length == 0 ? (
                      <h4>No Location added, Please add some loaction</h4>
                    ) : (
                      { renderLocations }
                    )}
                  </div>
                </div>
              </div>

              {this.state.AllLocations.length == 0 ? (
                ""
              ) : (
                <div className="row card-12 page-align">
                  <div className="col-md-2  ">
                    <div className="bt-page-10">Next</div>
                  </div>
                  <div className="col-md-5">
                    <div className="row ">{renderPageNumbers}</div>
                  </div>
                  <div className="col-md-2">
                    <div className="bt-page-10">Next</div>
                  </div>
                  <div className="col-md-3">
                    <div className="iteams-page" data-toggle="dropdown">
                      {this.state.LocationsPerPage == 999999
                        ? "All"
                        : this.state.LocationsPerPage}{" "}
                      Items/page
                      <ArrowDropDownIcon />
                    </div>
                    <ul className="dropdown-menu">
                      <li
                        onClick={() => this.setState({ LocationsPerPage: 3 })}
                      >
                        3 Items/page
                      </li>
                      <li
                        onClick={() => this.setState({ LocationsPerPage: 10 })}
                      >
                        10 Items/page
                      </li>
                      <li
                        onClick={() => this.setState({ LocationsPerPage: 20 })}
                      >
                        20 Items/page
                      </li>
                      <li
                        onClick={() => this.setState({ LocationsPerPage: 50 })}
                      >
                        50 Items/page
                      </li>
                      <li
                        onClick={() => this.setState({ LocationsPerPage: 99 })}
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
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* </div> */}
      </>
    );
  }
}
