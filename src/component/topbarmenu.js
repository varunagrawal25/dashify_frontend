import React, { Component } from "react";
import Axios from "axios";
import { logout } from "./apis/user";
import { all_location } from "./apis/location";
import { all_connection_of_one_location } from "./apis/social_platforms";
import { Link } from "react-router-dom";
import ViewLocations from "./location-manager";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Loader from "react-loader-spinner";
import { get_login_user_info } from "./apis/user";
import { secure_pin } from "../config";
import SelectSearch from 'react-select-search';
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
      first_name: "",
      last_name: "",
      user_image: "",
      loading_info: true,

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

  change = (id, name) => e => {
    // console.log("event target value", e.target.value);
    console.log(this.state);

    // this.setState({ changev: true, locationid: e });

    // this.setState({ changev: true, locationid: e.target.value });

    localStorage.setItem("locationId", id);
    localStorage.setItem("locationName", name);

    // console.log(window.location.href);

    window.location.assign("dashboard#/locations/" + id + "/overview");
    window.location.reload(false);
  };

  logout = () => {
    localStorage.clear();

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
      user_id: localStorage.getItem("UserId"),
      // user_id:"11",
      secure_pin
    };
console.log("user_id",data.user_id)
    // for getting user details
    let data3 = { user_id: localStorage.getItem("UserId"),secure_pin };
    get_login_user_info(data3)
      .then(res => {
        console.log("user info", res.data);
        if (res.data && res.data.users_login) {
          this.setState({
            first_name: res.data.users_login[0].first_name,
            last_name: res.data.users_login[0].last_name,
            user_image: res.data.users_login[0].profile_image,
            loading_info: false
          });
        } else {
          this.setState({ loading_info: false });
        }
      })
      .catch(err => {
        console.log("user info err", err);
        this.setState({ loading_info: false });
      });

    //for notifications
    all_location(data)
      .then(res => {
        console.log(res);
        console.log("963",res.data.all_location);

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
      input = e.target.value.substr(0, e.target.value.length - 1);
    } else {
      input = e.target.value + String.fromCharCode(e.keyCode);
    }
  }

  render() {
    let {
      first_name,
      last_name,
      user_image,
      loading_info,
      fb_notification,
      fbReviews,
      googleReviews,
      citysearchReviews,
      yelpReviews,
      view_notification_type1
    } = this.state;

    var locations = [];
    if (this.state.AllLocations) {
      this.state.AllLocations.map(loc => {
        if (location_id == loc.id.toString()) {
          localStorage.setItem("locationName", loc.location_name);
        }
        locations.push({ name: loc.location_name, value: loc.id.toString() });
      });
    }

    let courses = [];

    if (this.state.AllLocations.length != 0) {
      this.state.AllLocations.map(data => {
        courses = [...courses, data.location_name];
        // if (location_id == data.id.toString()) {
        //   localStorage.setItem("locationName", data.location_name);
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
          if (data1 == data2.location_name) {
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
      <div className='maindiv'>
          <MDBRow className='topdash '>
        <MDBCol md='3' style={{marginTop:'5px'}}>
        <img src={require("./assets/LOGO 4.png")} alt="" />
        </MDBCol>

        
        <MDBCol md='6' style={{marginTop:'12px'}}>
          <MDBRow>
            <MDBCol md='6' >
          
<div className="md-form vertically_center">
{/* <SelectSearch options={locations} value={this.state.search} className="searcdd" name="language" 
placeholder={loc_name ? loc_name : "Search"} onChange={e =>
                            this.setState({ search: e.target.value.split(" ") })
                          }/> */}
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
                            <div class="scrollbar">
                                       <div class="overflow">
                            <ul name="language" id="language" required>
                              {filtered_posts.length != 0
                                ? filtered_posts.map((f, i) => (
                                    <li
                                      onKeyDown={this.onKeyDown}
                                      key={`location-${i}`}
                                      onClick={this.change(
                                        f.id.toString(),
                                        f.location_name
                                      )}
                                    >
                                      {f.location_name}
                                    </li>
                                  ))
                                : "No Result"}
                            </ul>
                          </div>
                          </div>
                          </div>
                        )}
                      </div>
            </MDBCol>
            <MDBCol md='6' style={{marginTop:'4px'}}>
            <MDBBtn className="add_location "
                        href="/dashboard#/add-location"
                      >
                        <i className="zmdi zmdi-plus"></i> Add Location
                      </MDBBtn>
            </MDBCol>
          </MDBRow>
        
        </MDBCol>

        <MDBCol md='3'>
         
         {loading_info ? (
                        <Loader
                          className="loaderbox"
                          type="Oval"
                          color="#00BFFF"
                          height={25}
                          width={25}
                          // timeout={3000} //3 secs
                        />
                      ) : (
                        <MDBRow>
                        <MDBCol md='5' className="namedash rightdah" style={{marginTop:'8px'}}>
                              {first_name} {last_name}
                          </MDBCol> 
                          <MDBCol md='3' style={{marginTop:'8px'}}>
{user_image ? (
                            <img
                              src={"https://digimonk.net/dashify-ci/assets/upload/images/profile-type-image/" + user_image}
                              alt="user"
                              className='navbar_pic'
                              
                            />
                          ) : (
                            <AccountCircleIcon fontSize="large" style={{marginTop:'9px'}}/>
                            )}
                          
                          </MDBCol>
                          <MDBCol md='2' style={{marginTop:'18px'}}>
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
                          </MDBCol>
                          <MDBCol   style={{marginTop:'21px'}}>
                            <a  className="rightdah  dropleft" data-toggle="dropdown"><MoreVertIcon/></a>
                     
                     <div class="dropdown-menu drop_contant0">
                     <div className='drop_contant1'>Profile Settings</div>
                <div  onClick={this.logout}>
                  <Link to="/" className='drop_contant1'>Log Out</Link>
                  </div>
</div>
                          </MDBCol>
                          </MDBRow>
                          )}      
         </MDBCol>
       </MDBRow>
        
      </div>
    );
  }
}
