import React, { Component } from "react";
import SelectSearch from "react-select-search";
import Axios from "axios";
import { logout } from "./apis/user";
import { all_location } from "./apis/location";
import { all_connection_of_one_location } from "./apis/social_platforms";
import { Link, Redirect, NavLink } from "react-router-dom";
import ViewLocations from "./location-manager";

import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

const Yelpconfig = {
  headers: {
    Authorization:
      "bearer _1cVnrrkqmG_dwNUdtorVxarkzItJM7AWM700rkRxM7aPdDfxJECcdaN00ADjSkrStF1pX4sdGCspYeSjU7VGkpjWYoMsC2_filBf5d5J5GMRTgXws_W6qusNMhYX3Yx",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost"
  }
};

let location_id = localStorage.getItem("locationId");

export default class Topbarmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllLocations: [],
      changev: false,
      locationid: "",
      defa: "",
      fb_notification: "",
      fbReviews: [],
      googleReviews: [],
      citysearchReviews: [],
      yelpReviews: [],
      view_notification_type1: false,
      search: []
    };
    this.change = this.change.bind(this);
  }

  change = (id ,name)=> e => {
    
    // console.log("event target value", e.target.value);
    console.log(this.state);

    // this.setState({ changev: true, locationid: e });

    // this.setState({ changev: true, locationid: e.target.value });

    localStorage.setItem("locationId", id);
    localStorage.setItem("locationName", name);

    // console.log(window.location.href);

    window.location.assign(
      "dashboard#/locations/" + id + "/overview"
    );
    window.location.reload(false);
  };

  logout = () => {
    localStorage.clear();

    // Axios.post(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/account/logout"
    // )
    logout()
      .then(res => {
        console.log("sucess");
        console.log(res);
      })
      .catch(res => {
        console.log("error in Logout");
      });
  };

  componentDidMount() {
    console.log("tool");

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

        this.setState({ AllLocations: res.data.all_location });
      })
      .catch(res => {
        console.log("error in LocationManager");
      });

    // fetching reviews from database

    var yelpUrl, citysearchUrl, fbtoken, fbPageId, googleToken;

    const data2 = {
      location_id
    };

    // Axios.post(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/locations/get-all-connection-of-one-location",
    //   data2,
    //   DjangoConfig
    // )
    all_connection_of_one_location(data2, DjangoConfig).then(response => {
      response.data.data.map(l => {
        if (l.Social_Platform.Platform == "Facebook") {
          fbtoken = l.Social_Platform.Token;
          fbPageId = l.Social_Platform.Other_info;
        }
        if (l.Social_Platform.Platform == "Google") {
          googleToken = l.Social_Platform.Token;
        }
        if (l.Social_Platform.Platform == "Yelp") {
          yelpUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);
        }

        if (l.Social_Platform.Platform == "Citysearch") {
          citysearchUrl = l.Social_Platform.Other_info.split(",")[0]
            .slice(7)
            .split("/")[4];
        }
      });

      const GoogleConfig = {
        headers: { Authorization: "Bearer " + googleToken }
      };

      // for facebook
      if (fbtoken) {
        Axios.get(
          "https://graph.facebook.com/me/accounts/?access_token=" + fbtoken
        ).then(res => {
          var fbPageAccessToken;
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].id == fbPageId) {
              fbPageAccessToken = res.data.data[i].access_token;
            }
          }
          Axios.get(
            "https://graph.facebook.com/" +
              fbPageId +
              "/ratings?fields=has_rating,review_text,created_time,has_review,rating,recommendation_type&access_token=" +
              fbPageAccessToken
          ).then(res => {
            this.setState({ fbReviews: res.data.data });
          });
          Axios.get(
            "https://graph.facebook.com/" +
              fbPageId +
              "?fields=new_like_count,talking_about_count,unread_message_count,unread_notif_count,unseen_message_count&access_token=" +
              fbPageAccessToken
          ).then(resp => {
            this.setState({ fb_notification: resp.data });
          });
        });
      }

      // Google
      if (googleToken) {
        Axios.get(
          "https://mybusiness.googleapis.com/v4/accounts/",
          GoogleConfig
        ).then(res => {
          localStorage.setItem("accountId", res.data.accounts[0].name);

          Axios.get(
            "https://mybusiness.googleapis.com/v4/" +
              localStorage.getItem("accountId") +
              "/locations",
            GoogleConfig
          ).then(resp => {
            localStorage.setItem(
              "locationIdGoogle",
              resp.data.locations[0].name
            );

            Axios.get(
              "https://mybusiness.googleapis.com/v4/" +
                localStorage.getItem("locationIdGoogle") +
                "/reviews",
              GoogleConfig
            ).then(respo => {
              this.setState({ googleReviews: respo.data.reviews });
            });
          });
        });
      }

      // for yelp
      if (yelpUrl) {
        Axios.get(
          "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
            yelpUrl.slice(25) +
            "/reviews",
          Yelpconfig
        ).then(resp => {
          this.setState({ yelpReviews: resp.data.reviews });
        });
      }

      // citysearch

      if (citysearchUrl) {
        Axios.get(
          "https://cors-anywhere.herokuapp.com/https://api.citygridmedia.com/content/reviews/v2/search/where?listing_id=" +
            citysearchUrl +
            "&publisher=test"
        ).then(res => {
          var XMLParser = require("react-xml-parser");
          var xml = new XMLParser().parseFromString(res.data); // Assume xmlText contains the example XML
          this.setState({
            citysearchReviews: xml.getElementsByTagName("review")
          });
        });
      }
    });
  }

  onKeyDown(e) {
    var input = "";
    if (e.keyCode === 8) {
      // backspace/delete has been hit
      input = e.target.value.substr(0, e.target.value.length-1);
    }
    else {
      input = e.target.value + String.fromCharCode(e.keyCode);
    }
  }

  render() {
    let {
      fb_notification,
      fbReviews,
      googleReviews,
      citysearchReviews,
      yelpReviews,
      view_notification_type1
    } = this.state;

    // var options = [];
    // if (this.state.AllLocations) {
    //   this.state.AllLocations.map(loc => {
    //     if (location_id == loc.id.toString()) {
    //       localStorage.setItem("locationName", loc.Location_name);
    //     }
    //     options.push({ name: loc.Location_name, value: loc.id.toString() });
    //   });
    // }

    let courses = [];

    if (this.state.AllLocations.length != 0) {
      this.state.AllLocations.map(data => {
        courses = [...courses, data.Location_name];
        // if (location_id == data.id.toString()) {
        //   localStorage.setItem("locationName", data.Location_name);
        // }
      });
    }

    let options;
    if (this.state.search.length) {
      const searchPattern = new RegExp(
        this.state.search.map(term => `(?=.*${term})`).join(""),
        "i"
      );
      options = courses.filter(option => option.match(searchPattern));
    } else {
      options = courses;
    }

    let filtered_posts = [];
    if (options.length != 0) {
      options.map((data1, i) => {
        this.state.AllLocations.map((data2, j) => {
          if (data1 == data2.Location_name) {
            filtered_posts = [...filtered_posts, data2];
          }
        });
      });
    }

    let loc_name = localStorage.getItem("locationName");
    // var defaultSelected=(this.state.AllLocations)?this.state.AllLocations.id:0;

    console.log("options", options);

    // if(this.state.changev){
    //    return <Redirect to={"dashboard#/locations/"+this.state.locationid+"/view-location"} />
    // }

    // notification

    let total_notifications = [];

    if (fb_notification.unseen_message_count > 0) {
      total_notifications = [
        ...total_notifications,
        <a
          href={"https://www.facebook.com/" + fb_notification.id + "/inbox"}
          className="dropdown-item notify-item"
        >
          <div className="notify-icon bg-success">
            <img src={require("../images/facebook.png")} alt="facebook" />
          </div>
          <p className="notify-details">
            You have {fb_notification.unseen_message_count} unread messages on
            your facebook page
          </p>
        </a>
      ];
    }

    if (fb_notification.unread_notif_count > 0) {
      total_notifications = [
        ...total_notifications,
        <a
          href={"https://www.facebook.com/" + fb_notification.id}
          className="dropdown-item notify-item"
        >
          <div className="notify-icon bg-success">
            <img src={require("../images/facebook.png")} alt="facebook" />
          </div>
          <p className="notify-details">
            You have {fb_notification.unread_notif_count} unread notifications
            on your facebook page
          </p>
        </a>
      ];
    }

    var today_date = new Date();
    var today_time =
      today_date.getHours() +
      ":" +
      (today_date.getMinutes() + 1) +
      ":" +
      today_date.getSeconds();

    for (let i = 0; i < fbReviews.length; i++) {
      if (fbReviews[i].created_time.slice(0, 10) == today_date) {
        total_notifications = [
          ...total_notifications,
          <a
            href={"https://www.facebook.com/" + fb_notification.id + "/reviews"}
            className="dropdown-item notify-item"
          >
            <div className="notify-icon bg-success">
              <img src={require("../images/facebook.png")} alt="facebook" />
            </div>
            <p className="notify-details">
              Someone give a {fbReviews[i].rating} star review
              <small className="text-muted">
                {fbReviews[i].review_text
                  ? fbReviews[i].review_text.slice(0, 20) + "..."
                  : ""}
              </small>
            </p>
          </a>
        ];
      } else {
        break;
      }
    }

    // let google_show_review_notification = [];

    if (googleReviews) {
      for (let i = 0; i < googleReviews.length; i++) {
        if (googleReviews[i].createTime.slice(0, 10) == today_date) {
          total_notifications = [
            ...total_notifications,
            <a className="dropdown-item notify-item">
              <div className="notify-icon bg-success">
                <img src={require("../images/google.png")} alt="google" />
              </div>
              <p className="notify-details">
                {googleReviews[i].reviewer.displayName}
                leaves {googleReviews[i].starRating} star review
                <small className="text-muted">
                  {googleReviews[i].comment
                    ? googleReviews[i].comment.slice(0, 30) + "..."
                    : ""}
                </small>
                <small className="text-muted">
                  {parseInt(today_time.slice(0, 2)) -
                    parseInt(googleReviews[i].createTime.slice(11, 13)) ==
                  0
                    ? parseInt(today_time.slice(3, 5)) -
                      parseInt(googleReviews[i].createTime.slice(14, 16)) +
                      "minutes ago"
                    : parseInt(today_time.slice(0, 2)) -
                      parseInt(googleReviews[i].createTime.slice(11, 13)) +
                      "hours ago"}
                </small>
              </p>
            </a>
          ];
        } else {
          break;
        }
      }
    }

    // let yelp_show_review_notification = [];

    for (let i = 0; i < yelpReviews.length; i++) {
      if (yelpReviews[i].time_created.slice(0, 10) == today_date) {
        total_notifications = [
          ...total_notifications,
          <a href={yelpReviews[i].url} className="dropdown-item notify-item">
            <div className="notify-icon bg-success">
              <img src={require("../images/yelp.png")} alt="yelp" />
            </div>
            <p className="notify-details">
              {yelpReviews[i].user.name} give a {yelpReviews[i].rating} star
              review
              <small className="text-muted">
                {yelpReviews[i].text
                  ? yelpReviews[i].text.slice(0, 20) + "..."
                  : ""}
              </small>
              <small className="text-muted">
                {parseInt(today_time.slice(0, 2)) -
                  parseInt(yelpReviews[i].time_created.slice(11, 13)) ==
                0
                  ? parseInt(today_time.slice(3, 5)) -
                    parseInt(yelpReviews[i].time_created.slice(14, 16)) +
                    "minutes ago"
                  : parseInt(today_time.slice(0, 2)) -
                    parseInt(yelpReviews[i].time_created.slice(11, 13)) +
                    "hours ago"}
              </small>
            </p>
          </a>
        ];
      } else {
        break;
      }
    }

    // let citysearch_show_review_notification = [];

    for (let i = 0; i < citysearchReviews.length; i++) {
      if (citysearchReviews[i].children[6].value.slice(0, 10) == "2006-04-01") {
        total_notifications = [
          ...total_notifications,
          <a
            href={citysearchReviews[i].children[21].value}
            className="dropdown-item notify-item"
          >
            <div className="notify-icon bg-success">
              <img src={require("../images/citysearch.jpg")} alt="citysearch" />
            </div>
            <p className="notify-details">
              {citysearchReviews[i].children[7].value} leaves{" "}
              {citysearchReviews[i].children[5].value} star review
              <small className="text-muted">
                {citysearchReviews[i].children[2].value
                  ? citysearchReviews[i].children[2].value.slice(0, 30) + "..."
                  : ""}
              </small>
              <small className="text-muted">
                {parseInt(
                  today_time.slice(0, 2) -
                    parseInt(
                      citysearchReviews[i].children[6].value.slice(11, 13)
                    )
                ) == 0
                  ? parseInt(
                      today_time.slice(3, 5) -
                        parseInt(
                          citysearchReviews[i].children[6].value.slice(14, 16)
                        )
                    ) + "minutes ago"
                  : parseInt(
                      today_time.slice(0, 2) -
                        parseInt(
                          citysearchReviews[i].children[6].value.slice(11, 13)
                        )
                    ) + "hours ago"}{" "}
              </small>
            </p>
          </a>
        ];
      } else {
        break;
      }
    }

    //notification

    console.log("this.state in topbarmenu", this.state);

    return (
      <>
        <div className="maindiv">
          <div className="navbar-custom">
            <div className="container-fluid topdash">
              <div className="row leftdah">
                <div className="col-md-3">
                  <img src={require("./assets/LOGO 4.png")} alt="" />
                </div>
                <div className="col-md-6 ">
                  <div className="row searchdah">
                    <div className="col-md-6 ">
                      <div className="md-form ">
                        <input
                          type="text"
                          name=""
                          onChange={e =>
                            this.setState({ search: e.target.value.split(" ") })
                          }
                          className="form-control searcdd "
                          placeholder={loc_name ? loc_name : "Search"}
                          aria-label="Search"
                          
                        />
                        {this.state.search.length == 0 ||
                        this.state.search[0] == "" ? (
                          ""
                        ) : (
                          <div className="searchtrans">
                            <ul name="language"
                              id="language"
                              required  >
                             
                              {filtered_posts.length != 0
                                ? filtered_posts.map((f, i) => (
                                    <li
                                    onKeyDown={this.onKeyDown}
                                      key={`location-${i}`}
                                      onClick={this.change(f.id.toString(),f.Location_name)}
                                    >
                                      {f.Location_name}
                                    </li>
                                  ))
                                : "No Result"}
                              
                            </ul>
                            
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <a
                        className="add-location last_btn"
                        href="/dashboard#/add-location"
                      >
                        <i className="zmdi zmdi-plus"></i> Add Location
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="row ">
                    <div className="col-md-5 namedash rightdah">
                      <h3> {localStorage.getItem("UserName")} </h3>
                    </div>
                    <div className="col-md-2 ">
                      <div className="row imgaligng">
                      <AccountCircleIcon fontSize="large"/>
                      </div>
                    </div>

                    <ul className="dropdown-menu loginboxds">
                      <li>
                        <a href="#">Profile Settings</a>
                      </li>
                      <li>
                        <Link to="/">
                          <button class="pay_last_btn1" onClick={this.logout}>
                            Log Out
                          </button>
                        </Link>
                      </li>
                    </ul>

                    {/* <div className="col-md-2 rightdah"></div> */}
                    <div className="col-md-2 rightdah">
                      <ul className="rightmenu-top nav navbar-nav navbar-right">
                        <li className="dropdown notification-list">
                          <a
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            href="#"
                          >
                            <i className="flaticon-notification"></i>
                            <span className="count-not">
                              {total_notifications.length}
                            </span>
                          </a>

                          <div className="dropdown-menu dropdown-lg dropdown-menu-right">
                            <div className="dropdown-header noti-title">
                              <h5 className="text-overflow m-0">
                                <span className="float-right">
                                  <span className="badge badge-danger float-right">
                                    {total_notifications.length}
                                  </span>
                                </span>
                                Notification
                              </h5>
                            </div>

                            <div className="slimscroll noti-scroll scroll-me">
                              {view_notification_type1 == false ? (
                                total_notifications.length > 5 ? (
                                  <div>
                                    {total_notifications[0]}
                                    {total_notifications[1]}
                                    {total_notifications[2]}
                                    {total_notifications[3]}
                                    {total_notifications[4]}
                                  </div>
                                ) : (
                                  total_notifications
                                )
                              ) : (
                                total_notifications
                              )}
                            </div>

                            <a
                              onClick={() =>
                                view_notification_type1 == true
                                  ? this.setState({
                                      view_notification_type1: false
                                    })
                                  : this.setState({
                                      view_notification_type1: true
                                    })
                              }
                              className="dropdown-item text-center text-primary notify-item notify-all"
                            >
                              {view_notification_type1 == false
                                ? "View all"
                                : "View less"}
                              <i className="fi-arrow-right"></i>
                            </a>
                            {/* <button
                        onClick={() =>
                          view_notification_type1 == true
                            ? this.setState({ view_notification_type1: false })
                            : this.setState({ view_notification_type1: true })
                        }
                        className="viewall"
                      >
                        {view_notification_type1 == false
                          ? "View all"
                          : "View less"}
                        <i className="zmdi zmdi-caret-down"></i>
                      </button> */}
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-2 rightdah" data-toggle="dropdown">
                      <MoreVertIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
