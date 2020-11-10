import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
// import InstagramLogin from "react-instagram-login";
import GoogleLogin from "react-google-login";
import Axios from "axios";
import {
  all_connection_of_one_location,
  add_social_account,
  remove_social_account
} from "./apis/social_platforms";
import {
  location_by_id,
  business_categories,
  business_states
} from "./apis/location";
// import qs from "querystring";
import qs from "qs";
import Spinner from "./common/Spinner";
import ReactPDF, {
  Image,
  Font,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink
} from "@react-pdf/renderer";
import { LinkedIn } from "react-linkedin-login-oauth2";
import { google_listing_detail } from "./apis/social_media";

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

const LinkedinConfig = {
  headers: { "Content-Type": "application/x-www-form-urlencoded" }
};

const Yelpconfig = {
  headers: {
    Authorization:
      "bearer _1cVnrrkqmG_dwNUdtorVxarkzItJM7AWM700rkRxM7aPdDfxJECcdaN00ADjSkrStF1pX4sdGCspYeSjU7VGkpjWYoMsC2_filBf5d5J5GMRTgXws_W6qusNMhYX3Yx",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost"
  }
};

let total_listings = 14;

// Create styles

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf"
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    backgroundColor: "#E4E4E4"
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald"
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald"
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman"
  },
  image: {
    marginVertical: 30,
    // marginHorizontal: 100,
    textAlign: "center",
    width: 125,
    height: 125
  },
  image2: {
    marginVertical: 20,
    // marginHorizontal: 100,
    textAlign: "center",
    width: 80,
    height: 80
  },
  emphasis: {
    margin: 12,
    fontSize: 24,
    color: "#F22300",
    fontFamily: "Oswald"
  }
});

// Create Document Component

export default class ViewListing extends Component {
  state = {
    fbName: "",
    instaName: "",
    googleName: "",
    linkedinName: "",
    yelpName: "",
    foursquareName: "",
    dnbName: "",
    appleName: "",
    citysearchName: "",
    hereName: "",
    zillowName: "",
    tomtomName: "",
    zomatoName: "",
    avvoName: "",

    fbToken: "",
    // instaToken: "",

    fbIsLoggedIn: false,
    instaIsLoggedIn: false,
    yelpIsLoggedIn: false,
    googleIsLoggedIn: false,
    linkedinIsLoggedIn: false,
    foursquareIsLoggedIn: false,
    dnbIsLoggedIn: false,
    appleIsLoggedIn: false,
    citysearchIsLoggedIn: false,
    hereIsLoggedIn: false,
    zillowIsLoggedIn: false,
    tomtomIsLoggedIn: false,
    zomatoIsLoggedIn: false,
    avvoIsLoggedIn: false,
    allListings: [],
    yelpId: "",
    fbId: "",
    instaId: "",
    googleId: "",
    linkedinId: "",
    foursquareId: "",
    dnbId: "",
    appleId: "",
    citysearchId: "",
    hereId: "",
    zillowId: "",
    tomtomId: "",
    zomatoId: "",
    avvoId: "",
    otherImage: [],
    loader: true,
    all_connections: [],
    pdf_data: [],
    today: "",

    linkedin_code: "",
    // linkedin_errorMessage: "",
    googleLocationDetail: "",
    googleReviewsPresent: false,
    yelpDetails: "",
    citysearchDetails: ""
  };

  async componentDidMount() {
    if (this.props.match.params.locationId != "null") {
      const data = {
        location_id: this.props.match.params.locationId
      };
      var googleToken,
        linkedinToken,
        fbtoken,
        fbPageId,
        fbData,
        googleData,
        linkedinData,
        linkedin_page_id;

      let { pdf_data } = this.state;

      var today = new Date();
      today =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      this.setState({ today });

      all_connection_of_one_location(data, DjangoConfig)
        .then(resp => {
          console.log("get all connections", resp);
          this.setState({ allListings: resp.data.data });

          if (this.state.allListings) {
            this.state.allListings.map(l => {
              if (l.Social_Platform.Platform == "Facebook") {
                fbtoken = l.Social_Platform.Token;
                fbPageId = l.Social_Platform.Other_info;
                fbData = l;

                this.setState({
                  fbIsLoggedIn: true,
                  pdf_data: [
                    ...this.state.pdf_data,
                    {
                      listing: "Facebook",
                      image: require("../images/facebook.png"),
                      username: fbData.Social_Platform.Username,
                      status: true,
                      link: "https://www.facebook.com/" + fbPageId,
                      date: fbData.Social_Platform.Update_Date.split("T")[0]
                    }
                  ],
                  fbId: fbData.id,
                  fbName: fbData.Social_Platform.Username,
                  all_connections: [
                    ...this.state.all_connections,
                    { name: "Facebook" }
                  ]
                });
              }

              if (l.Social_Platform.Platform == "Google") {
                googleToken = l.Social_Platform.Token;
                googleData = l;
                this.setState({
                  googleIsLoggedIn: true,
                  pdf_data: [
                    ...this.state.pdf_data,
                    {
                      listing: "Google",
                      image: require("../images/google.png"),
                      username: googleData.Social_Platform.Username,
                      status: true,
                      date: googleData.Social_Platform.Update_Date.split("T")[0]
                    }
                  ],
                  googleId: googleData.id,
                  googleName: googleData.Social_Platform.Username,
                  all_connections: [
                    ...this.state.all_connections,
                    { name: "Google" }
                  ]
                });

                google_listing_detail(data).then(res => {
                  this.setState({
                    googleLocationDetail: res.other_info,
                    googleReviewsPresent: res.google_Reviews_Present
                  });
                });
              }

              if (l.Social_Platform.Platform == "Linkedin") {
                linkedinToken = l.Social_Platform.Token;
                linkedinData = l;
                linkedin_page_id = l.Social_Platform.Other_info;

                this.setState({
                  linkedinIsLoggedIn: true,
                  pdf_data: [
                    ...this.state.pdf_data,
                    {
                      listing: "Linkedin",
                      image: require("../images/linkedin.png"),
                      username: linkedinData.Social_Platform.Username,
                      status: true,
                      date: linkedinData.Social_Platform.Update_Date.split(
                        "T"
                      )[0]
                    }
                  ],
                  linkedinId: linkedinData.id,
                  linkedinName: linkedinData.Social_Platform.Username,
                  all_connections: [
                    ...this.state.all_connections,
                    { name: "Linkedin" }
                  ]
                });
              }

              if (l.Social_Platform.Platform == "Foursquare") {
                console.log("yes four");
                this.setState({
                  foursquareIsLoggedIn: true,
                  pdf_data: [
                    ...this.state.pdf_data,
                    {
                      listing: "Foursquare",
                      image: require("../images/foursquare.png"),
                      username: l.Social_Platform.Username,
                      status: true,
                      link: l.Social_Platform.Other_info.split(",")[0].slice(7),
                      date: l.Social_Platform.Update_Date.split("T")[0]
                    }
                  ],
                  foursquareId: l.id,
                  foursquareName: l.Social_Platform.Username,
                  all_connections: [
                    ...this.state.all_connections,
                    { name: "Foursquare" }
                  ]
                });
              }

              if (l.Social_Platform.Platform == "Dnb") {
                console.log("yes DNB");
                this.setState({
                  dnbIsLoggedIn: true,
                  pdf_data: [
                    ...this.state.pdf_data,
                    {
                      listing: "Dnb",
                      image: require("../images/dnb.jpg"),
                      username: l.Social_Platform.Username,
                      status: true,
                      // link: l.Social_Platform.Other_info.split(",")[0].slice(7),
                      date: l.Social_Platform.Update_Date.split("T")[0]
                    }
                  ],
                  dnbId: l.id,
                  dnbName: l.Social_Platform.Username,
                  all_connections: [
                    ...this.state.all_connections,
                    { name: "Dnb" }
                  ]
                });
              }

              if (l.Social_Platform.Platform == "Instagram") {
                console.log("yes Instagram");
                this.setState({
                  instaIsLoggedIn: true,
                  pdf_data: [
                    ...this.state.pdf_data,
                    {
                      listing: "Instagram",
                      image: require("../images/instagram.png"),
                      username: l.Social_Platform.Username,
                      status: true,
                      link:
                        "https://www.instagram.com/" +
                        l.Social_Platform.Other_info.split(",")[0].slice(7) +
                        "/",
                      date: l.Social_Platform.Update_Date.split("T")[0]
                    }
                  ],
                  instaId: l.id,
                  instaName: l.Social_Platform.Username,
                  all_connections: [
                    ...this.state.all_connections,
                    { name: "Instagram" }
                  ]
                });
              }

              if (l.Social_Platform.Platform == "Yelp") {
                console.log("yes yelp");
                this.setState({
                  yelpIsLoggedIn: true,
                  pdf_data: [
                    ...this.state.pdf_data,
                    {
                      listing: "Yelp",
                      image: require("../images/yelp.png"),
                      username: l.Social_Platform.Username,
                      status: true,
                      link: l.Social_Platform.Other_info.split(",")[0].slice(7),
                      date: l.Social_Platform.Update_Date.split("T")[0]
                    }
                  ],
                  yelpId: l.id,
                  yelpName: l.Social_Platform.Username,
                  all_connections: [
                    ...this.state.all_connections,
                    { name: "Yelp" }
                  ]
                });
                Axios.get(
                  "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
                    l.Social_Platform.Other_info.split(",")[0]
                      .slice(7)
                      .slice(25),
                  Yelpconfig
                ).then(resp => {
                  console.log("yelpDetails", resp.data);
                  this.setState({ yelpDetails: resp.data });
                });
              }

              if (l.Social_Platform.Platform == "Apple") {
                console.log("yes Apple");
                this.setState({
                  appleIsLoggedIn: true,
                  pdf_data: [
                    ...this.state.pdf_data,
                    {
                      listing: "Apple",
                      image: require("../images/apple.png"),
                      username: l.Social_Platform.Username,
                      status: true,
                      link: l.Social_Platform.Other_info.split(",")[0].slice(7),
                      date: l.Social_Platform.Update_Date.split("T")[0]
                    }
                  ],
                  appleId: l.id,
                  appleName: l.Social_Platform.Username,
                  all_connections: [
                    ...this.state.all_connections,
                    { name: "Apple" }
                  ]
                });
              }

              if (l.Social_Platform.Platform == "Citysearch") {
                console.log("Citysearch data", l);
                this.setState({
                  citysearchIsLoggedIn: true,
                  pdf_data: [
                    ...this.state.pdf_data,
                    {
                      listing: "Citysearch",
                      image: require("../images/citysearch.jpg"),
                      username: l.Social_Platform.Username,
                      status: true,
                      link: l.Social_Platform.Other_info.split(",")[0].slice(7),
                      date: l.Social_Platform.Update_Date.split("T")[0]
                    }
                  ],
                  citysearchId: l.id,
                  citysearchName: l.Social_Platform.Username,
                  all_connections: [
                    ...this.state.all_connections,
                    { name: "Citysearch" }
                  ]
                });
                let citysearchId = l.Social_Platform.Other_info.split(",")[0]
                  .slice(7)
                  .split("/")[4];
                Axios.get(
                  `https://cors-anywhere.herokuapp.com/https://api.citygridmedia.com/content/places/v2/detail?id=${citysearchId}&id_type=cs&client_ip=123.4.56.78&publisher=test&format=json`
                ).then(res => {
                  // console.log("citysearchDetails",res.data.locations[0])
                  if (res.data.locations)
                    this.setState({ citysearchDetails: res.data.locations[0] });
                });
              }

              if (l.Social_Platform.Platform == "Zillow") {
                console.log("Zillow data", l);
                this.setState({
                  zillowIsLoggedIn: true,
                  pdf_data: [
                    ...this.state.pdf_data,
                    {
                      listing: "Zillow",
                      image: require("../images/zillow.png"),
                      username: l.Social_Platform.Username,
                      status: true,
                      // link: l.Social_Platform.Other_info.split(",")[0].slice(7),
                      date: l.Social_Platform.Update_Date.split("T")[0]
                    }
                  ],
                  zillowId: l.id,
                  zillowName: l.Social_Platform.Username,
                  all_connections: [
                    ...this.state.all_connections,
                    { name: "Zillow" }
                  ]
                });
              }

              if (l.Social_Platform.Platform == "Tomtom") {
                console.log("Tomtom data", l);
                this.setState({
                  tomtomIsLoggedIn: true,
                  pdf_data: [
                    ...this.state.pdf_data,
                    {
                      listing: "Tomtom",
                      image: require("../images/tomtom.png"),
                      username: l.Social_Platform.Username,
                      status: true
                      // link: l.Social_Platform.Other_info.split(",")[0].slice(7),
                      // date: l.Social_Platform.Update_Date.split("T")[0]
                    }
                  ],
                  tomtomId: l.id,
                  tomtomName: l.Social_Platform.Username,
                  all_connections: [
                    ...this.state.all_connections,
                    { name: "Tomtom" }
                  ]
                });
              }

              if (l.Social_Platform.Platform == "Zomato") {
                console.log("Zomato data", l);
                this.setState({
                  zomatoIsLoggedIn: true,
                  pdf_data: [
                    ...this.state.pdf_data,
                    {
                      listing: "Zomato",
                      image: require("../images/zomato.png"),
                      username: l.Social_Platform.Username,
                      status: true
                      // link: l.Social_Platform.Other_info.split(",")[0].slice(7),
                      // date: l.Social_Platform.Update_Date.split("T")[0]
                    }
                  ],
                  zomatoId: l.id,
                  zomatoName: l.Social_Platform.Username,
                  all_connections: [
                    ...this.state.all_connections,
                    { name: "Zomato" }
                  ]
                });
              }

              if (l.Social_Platform.Platform == "Avvo") {
                console.log("Avvo data", l);
                this.setState({
                  avvoIsLoggedIn: true,
                  pdf_data: [
                    ...this.state.pdf_data,
                    {
                      listing: "Avvo",
                      image: require("../images/avvo.png"),
                      username: l.Social_Platform.Username,
                      status: true
                      // link: l.Social_Platform.Other_info.split(",")[0].slice(7),
                      // date: l.Social_Platform.Update_Date.split("T")[0]
                    }
                  ],
                  avvoId: l.id,
                  avvoName: l.Social_Platform.Username,
                  all_connections: [
                    ...this.state.all_connections,
                    { name: "Avvo" }
                  ]
                });
              }

              if (l.Social_Platform.Platform == "Here") {
                console.log("yes here");
                this.setState({
                  hereIsLoggedIn: true,
                  pdf_data: [
                    ...this.state.pdf_data,
                    {
                      listing: "Here",
                      image: require("../images/here.png"),
                      username: l.Social_Platform.Username,
                      status: true
                      // link: l.Social_Platform.Other_info.split(",")[0].slice(7),
                      // date: l.Social_Platform.Update_Date.split("T")[0]
                    }
                  ],
                  hereId: l.id,
                  hereName: l.Social_Platform.Username,
                  all_connections: [
                    ...this.state.all_connections,
                    { name: "Here" }
                  ]
                });
              }
            });
          }
        })
        .catch(resp => {
          console.log(resp);
        });

      location_by_id(data, DjangoConfig)
        .then(resp => {
          this.setState({ state: "Loading....", category: "Loading...." });

          business_states(DjangoConfig).then(resp1 => {
            resp1.data.status.map((s, i) =>
              s.id == resp.data.location.State
                ? this.setState({ state: s.State_name })
                : ""
            );
          });

          business_categories(DjangoConfig).then(resp1 => {
            resp1.data.BusinessCategory.map((b, i) =>
              b.id == resp.data.location.Business_category
                ? this.setState({ category: b.Category_Name })
                : ""
            );
          });

          console.log(resp.data);
          this.setState({
            location: resp.data.location,
            name: resp.data.location.Location_name,

            address: resp.data.location.Address_1,

            phone: resp.data.location.Phone_no,

            about: resp.data.location.About_Business,

            city: resp.data.location.City,
            postalCode: resp.data.location.Zipcode,
            logo: resp.data.location.Business_Logo,
            cover: resp.data.location.Business_Cover_Image,
            otherImage: resp.data.location.Df_location_image,

            loader: false
          });
        })
        .catch(res => {
          console.log("error in view listing", res);
          this.setState({ loader: false });
        });
    } else {
      this.setState({ loader: false });
    }
  }

  componentClicked = e => {
    console.log("clicked");
    // e.preventDefault();
  };

  responseFacebook = async response => {
    console.log("facebook response", response);

    const fb_data = {
      location_id: this.props.match.params.locationId,
      Username: response.name,
      Email: response.email
    };

    // Axios.get("https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=187396122554776&client_secret=bad0dbb6029a3530ca46048415abe95e&fb_exchange_token="+response.accessToken).then(async res => {
    //   console.log("google refresh token response",res)

    //   await localStorage.setItem("fb_token", res.data.access_token);
    //   await localStorage.setItem("fb_data", JSON.stringify(fb_data));

    //   // this.setState({ redirect_to_connectedaccounts: true });
    // }).catch(res => {
    //   console.log("google refresh token error",res)
    //   alert("something went wrong")
    // })

    await localStorage.setItem("fb_token", response.accessToken);
    await localStorage.setItem("fb_data", JSON.stringify(fb_data));

    this.props.history.push({
      pathname: `/connectedaccounts/view-listing`
    });
  };

  responseErrorGoogle = response => {
    console.log("google error", response);
  };

  responseGoogle = async response => {
    console.log("google response", response, response.code);

    let state = {
      Token: response.accessToken,
      Username: response.profileObj.name,
      Email: response.profileObj.email,
      location_id: this.props.match.params.locationId,
      redirect_to: "/view-listing"
    };

    this.props.history.push({
      pathname: `/google-connectedaccounts/${encodeURIComponent(
        JSON.stringify(state)
      )}`
    });

    //refresh token

    // Axios.post('https://www.googleapis.com/oauth2/v4/token',
    //       { //the headers passed in the request
    //         'code' : response.code,
    //         'client_id' : '759599444436-po5k7rhkaqdu55toirpt5c8osaqln6ul.apps.googleusercontent.com',
    //         'client_secret' : 'zHMBPdDuAx_JMq7bOIo4fqXD',
    //         'redirect_uri' : 'http://localhost:3000',
    //         'grant_type' : 'authorization_code',
    //         'prompt' : "consent"
    //       }).then(res => {
    //         console.log("google offline response",res);
    //       }).catch(res => {
    //         console.log("google offline error",res);
    // })
  };

  linkedin_handleSuccess = data => {
    console.log("linkedin login data", data);
    this.setState({
      linkedin_code: data.code
      // linkedin_errorMessage: ""
    });

    const data1 = {
      code: data.code,
      redirect_uri: "http://localhost:3000/linkedin",
      client_id: "861qygnjkytfwe",
      client_secret: "Q1VjP43psBokYjI0",
      grant_type: "authorization_code"
    };

    Axios({
      method: "post",
      url:
        "https://cors-anywhere.herokuapp.com/https://www.linkedin.com/oauth/v2/accessToken",
      data: qs.stringify(data1),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    })
      .then(resp => {
        // console.log("linkedin token response", resp.data);
        this.props.history.push({
          pathname: `/linkedin-connectedaccounts/${resp.data.access_token}/view-listing/${this.props.match.params.locationId}`
        });

        // const data = {
        //   location_id: this.props.match.params.locationId,
        //   Platform: "Linkedin",
        //   Token: resp.data.access_token,
        //   Username: "Linkedin User",
        //   Email: "Linkedin Email",
        //   Password: "",
        //   Connect_status: "Connect",
        //   Other_info: "861qygnjkytfwe"
        // };

        // add_social_account(data, DjangoConfig)
        //   .then(resp => {
        //     console.log("linkedin location response", resp.data);

        //     const data2 = {
        //       location_id: this.props.match.params.locationId
        //     };

        //     all_connection_of_one_location(data2, DjangoConfig).then(resp => {
        //       console.log("get all connections", resp);
        //       this.setState({ allListings: resp.data.data });

        //       if (this.state.allListings) {
        //         this.state.allListings.map(l => {
        //           if (l.Social_Platform.Platform == "Linkedin") {
        //             this.setState({ loading: false });
        //             this.setState({
        //               linkedinIsLoggedIn: true,
        //               pdf_data: [
        //                 ...this.state.pdf_data,
        //                 {
        //                   listing: "Linkedin",
        //                   image: require("../images/linkedin.png"),
        //                   username: l.Social_Platform.Username,
        //                   status: true,
        //                   date: l.Social_Platform.Update_Date.split("T")[0]
        //                 }
        //               ],
        //               linkedinId: l.id,
        //               linkedinName: l.Social_Platform.Username,
        //               all_connections: [
        //                 ...this.state.all_connections,
        //                 { name: "Linkedin" }
        //               ]
        //             });
        //           }
        //         });
        //       }
        //     });
        //   })
        //   .catch(resp => {
        //     console.log(resp);
        //     this.setState({ loading: false });
        //   });
      })
      .catch(resp => {
        console.log(resp);
        this.setState({ loading: false });
      });
  };

  linkedin_handleFailure = error => {
    this.setState({
      linkedin_code: ""
      // linkedin_errorMessage: error.errorMessage
    });
    alert("Linkedin : ", error.errorMessage);
  };

  disconnectAccount = e => {
    console.log(e.target.name);
    var name = e.target.name;
    const data = { location_connect_social_id: e.target.id };

    remove_social_account(data, DjangoConfig)
      .then(resp => {
        console.log(resp);

        this.setState({ [name]: false });
      })
      .catch(resp => {
        console.log(resp);
      });
  };

  googleLocationDetailFunction = googleLocationDetail => {
    let googleScore = 1;
    let maxScore = 9;
    let { googleReviewsPresent } = this.state;

    if (googleLocationDetail.websiteUrl) {
      googleScore = googleScore + 2;
    }
    if (googleLocationDetail.locationName) {
      googleScore++;
    }
    if (googleLocationDetail.address) {
      googleScore++;
    }
    if (googleLocationDetail.primaryPhone) {
      googleScore++;
    }
    if (
      googleLocationDetail.primaryCategory &&
      googleLocationDetail.primaryCategory.categoryId
    ) {
      googleScore++;
    }
    if (
      googleLocationDetail.regularHours &&
      googleLocationDetail.regularHours.periods.length != 0
    ) {
      googleScore++;
    }
    if (googleReviewsPresent) {
      googleScore++;
    }

    let scorePercentage = ~~((googleScore / maxScore) * 100);
    return (
      <div className="bing-box">
        <div className="google-top">
          <img src={require("../images/google-new.png")} alt="" />

          <div className="progress" data-percentage={scorePercentage}>
            <span className="progress-left">
              <span className="progress-bar"></span>
            </span>
            <span className="progress-right">
              <span className="progress-bar"></span>
            </span>
            <div className="progress-value">
              <div>
                {scorePercentage}%
                <br />
                <span>score</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bing-detils">
          <ul>
            <li>
              <span>Link:</span>
              <div className="bing-detail-text">
                {googleLocationDetail.websiteUrl ? (
                  <input type="checkbox" id="html" defaultChecked />
                ) : (
                  <input type="checkbox" id="html" />
                )}
                <label htmlFor="html"></label>
              </div>
            </li>

            <li>
              <span>Name:</span>
              <div className="bing-detail-text">
                {googleLocationDetail.locationName
                  ? googleLocationDetail.locationName
                  : "-"}
              </div>
            </li>
            <li>
              <span>Address:</span>
              <div className="bing-detail-text">
                {googleLocationDetail.address ? (
                  <div>
                    {googleLocationDetail.address.addressLines.map(
                      data => data
                    )}
                    ,{googleLocationDetail.address.locality},
                    {googleLocationDetail.address.administrativeArea},
                    {googleLocationDetail.address.postalCode}
                  </div>
                ) : (
                  "-"
                )}
              </div>
            </li>
            <li>
              <span>Phone:</span>
              <div className="bing-detail-text">
                {googleLocationDetail.primaryPhone
                  ? googleLocationDetail.primaryPhone
                  : "-"}
              </div>
            </li>
            <h3>Detailed breakdown</h3>
            <ul className="breack-bing">
              <li>
                <span>Categories</span>
                <div className="bing-cat">
                  {googleLocationDetail.primaryCategory &&
                  googleLocationDetail.primaryCategory.categoryId ? (
                    <a className="bing-yes">Yes</a>
                  ) : (
                    <a className="bing-no">No</a>
                  )}
                </div>
              </li>
              <li>
                <span>Website URL Present</span>
                <div className="bing-cat">
                  {googleLocationDetail.websiteUrl ? (
                    <a className="bing-yes">Yes</a>
                  ) : (
                    <a className="bing-no">No</a>
                  )}
                </div>
              </li>
              <li>
                <span>Hours of operation</span>
                <div className="bing-cat">
                  {googleLocationDetail.regularHours &&
                  googleLocationDetail.regularHours.periods.length != 0 ? (
                    <a className="bing-yes">Yes</a>
                  ) : (
                    <a className="bing-no">No</a>
                  )}
                </div>
              </li>
              <li>
                <span>Photos present</span>
                <div className="bing-cat">
                  <a className="bing-yes">Yes</a>
                </div>
              </li>
              <li>
                <span>Reviews</span>
                <div className="bing-cat">
                  {googleReviewsPresent ? (
                    <a className="bing-yes">Yes</a>
                  ) : (
                    <a className="bing-no">No</a>
                  )}
                </div>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    );
  };

  citysearchDetailsFunction = data => {
    let citysearchScore = 0;
    let maxScore = 9;

    if (data.urls && data.urls.profile_url) {
      citysearchScore++;
    }
    if (data.urls && data.urls.website_url) {
      citysearchScore++;
    }
    if (data.name) {
      citysearchScore++;
    }
    if (data.address && data.address.street) {
      citysearchScore++;
    }
    if (data.contact_info && data.contact_info.display_phone) {
      citysearchScore++;
    }
    if (data.categories && data.categories.length != 0) {
      citysearchScore++;
    }
    if (data.business_hours) {
      citysearchScore++;
    }
    if (data.review_info && data.review_info.total_user_reviews != 0) {
      citysearchScore++;
    }
    if (data.images && data.images.length != 0) {
      citysearchScore++;
    }

    let scorePercentage = ~~((citysearchScore / maxScore) * 100);

    return (
      <div className="bing-box">
        <div className="google-top">
          <div className="col-md-6">
            <img
              src={require("../images/citysearch-big.png")}
              alt="citysearch"
            />
          </div>

          <div className="progress" data-percentage={scorePercentage}>
            <span className="progress-left">
              <span className="progress-bar"></span>
            </span>
            <span className="progress-right">
              <span className="progress-bar"></span>
            </span>
            <div className="progress-value">
              <div>
                {scorePercentage}%
                <br />
                <span>score</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bing-detils">
          <ul>
            <li>
              <span>Link:</span>
              <div className="bing-detail-text">
                {data.urls && data.urls.profile_url ? (
                  <input type="checkbox" id="html2" defaultChecked />
                ) : (
                  <input type="checkbox" id="html2" />
                )}
                <label htmlFor="html2"></label>
              </div>
            </li>

            <li>
              <span>Name:</span>
              <div className="bing-detail-text">
                {data.name ? data.name : "-"}
              </div>
            </li>
            <li>
              <span>Address:</span>
              <div className="bing-detail-text">
                {data.address && data.address.street ? (
                  <div>
                    {data.address.street},{data.address.city},
                    {data.address.state},{data.address.postal_code}
                  </div>
                ) : (
                  "-"
                )}
              </div>
            </li>
            <li>
              <span>Phone:</span>
              <div className="bing-detail-text">
                {data.contact_info && data.contact_info.display_phone
                  ? data.contact_info.display_phone
                  : "-"}
              </div>
            </li>
            <h3>Detailed breakdown</h3>
            <ul className="breack-bing">
              <li>
                <span>Categories</span>
                <div className="bing-cat">
                  {data.categories && data.categories.length != 0 ? (
                    <a className="bing-yes">Yes</a>
                  ) : (
                    <a className="bing-no">No</a>
                  )}
                </div>
              </li>
              <li>
                <span>Website URL Present</span>
                <div className="bing-cat">
                  {data.urls && data.urls.website_url ? (
                    <a className="bing-yes">Yes</a>
                  ) : (
                    <a className="bing-no">No</a>
                  )}
                </div>
              </li>
              <li>
                <span>Hours of operation</span>
                <div className="bing-cat">
                  {data.business_hours ? (
                    <a className="bing-yes">Yes</a>
                  ) : (
                    <a className="bing-no">No</a>
                  )}
                </div>
              </li>
              <li>
                <span>Photos present</span>
                <div className="bing-cat">
                  {data.images && data.images.length != 0 ? (
                    <a className="bing-yes">Yes</a>
                  ) : (
                    <a className="bing-no">No</a>
                  )}
                </div>
              </li>
              <li>
                <span>Reviews</span>
                <div className="bing-cat">
                  {data.review_info &&
                  data.review_info.total_user_reviews != 0 ? (
                    <a className="bing-yes">Yes</a>
                  ) : (
                    <a className="bing-no">No</a>
                  )}
                </div>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    );
  };

  yelpDetailsFunction = data => {
    let yelpScore = 0;
    let maxScore = 9;

    if (data.url) {
      yelpScore = yelpScore + 2;
    }
    if (data.name) {
      yelpScore++;
    }
    if (data.location && data.location.address1) {
      yelpScore++;
    }
    if (data.phone) {
      yelpScore++;
    }
    if (data.categories && data.categories.length != 0) {
      yelpScore++;
    }
    if (data.hours && data.hours.length != 0) {
      yelpScore++;
    }
    if (data.review_count != 0) {
      yelpScore++;
    }
    if (data.image_url) {
      yelpScore++;
    }

    let scorePercentage = ~~((yelpScore / maxScore) * 100);

    return (
      <div className="bing-box">
        <div className="google-top">
          <img src={require("../images/yelp-new.png")} alt="" />

          <div className="progress" data-percentage={scorePercentage}>
            <span className="progress-left">
              <span className="progress-bar"></span>
            </span>
            <span className="progress-right">
              <span className="progress-bar"></span>
            </span>
            <div className="progress-value">
              <div>
                {scorePercentage}%
                <br />
                <span>score</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bing-detils">
          <ul>
            <li>
              <span>Link:</span>
              <div className="bing-detail-text">
                {data.url ? (
                  <input type="checkbox" id="html2" defaultChecked />
                ) : (
                  <input type="checkbox" id="html2" />
                )}
                <label htmlFor="html2"></label>
              </div>
            </li>

            <li>
              <span>Name:</span>
              <div className="bing-detail-text">
                {data.name ? data.name : "-"}
              </div>
            </li>
            <li>
              <span>Address:</span>
              <div className="bing-detail-text">
                {data.location && data.location.address1 ? (
                  <div>
                    {data.location.address1},{data.location.city},
                    {data.location.country}
                  </div>
                ) : (
                  "-"
                )}
              </div>
            </li>
            <li>
              <span>Phone:</span>
              <div className="bing-detail-text">
                {data.phone ? data.phone : "-"}
              </div>
            </li>
            <h3>Detailed breakdown</h3>
            <ul className="breack-bing">
              <li>
                <span>Categories</span>
                <div className="bing-cat">
                  {data.categories && data.categories.length != 0 ? (
                    <a className="bing-yes">Yes</a>
                  ) : (
                    <a className="bing-no">No</a>
                  )}
                </div>
              </li>
              <li>
                <span>Website URL Present</span>
                <div className="bing-cat">
                  {data.url ? (
                    <a className="bing-yes">Yes</a>
                  ) : (
                    <a className="bing-no">No</a>
                  )}
                </div>
              </li>
              <li>
                <span>Hours of operation</span>
                <div className="bing-cat">
                  {data.hours && data.hours.length != 0 ? (
                    <a className="bing-yes">Yes</a>
                  ) : (
                    <a className="bing-no">No</a>
                  )}
                </div>
              </li>
              <li>
                <span>Photos present</span>
                <div className="bing-cat">
                  {data.image_url ? (
                    <a className="bing-yes">Yes</a>
                  ) : (
                    <a className="bing-no">No</a>
                  )}
                </div>
              </li>
              <li>
                <span>Reviews</span>
                <div className="bing-cat">
                  {data.review_count != 0 ? (
                    <a className="bing-yes">Yes</a>
                  ) : (
                    <a className="bing-no">No</a>
                  )}
                </div>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    );
  };

  Quixote = pdf_data => (
    <Document>
      {console.log("pdf data", pdf_data)}
      <Page style={styles.body} wrap>
        <Text style={styles.title}>LOCAL LISTINGS REPORT</Text>
        <Text style={styles.author}>REPORT DATE: {this.state.today}</Text>
        <View>
          <Image style={styles.image} src={require("../images/alexa.png")} />

          <Text style={styles.subtitle}>Location Name : {this.state.name}</Text>
          <Text style={styles.subtitle}>
            Address : {this.state.category},{this.state.address},{" "}
            {this.state.city}
            {this.state.state} ,{this.state.postalCode},{this.state.phone}
          </Text>
        </View>
        <View>
          {/* <Text style={styles.text}>LISTING SITE</Text>
          <Text style={styles.text}>LISTING STATUS</Text>
          <Text style={styles.text}>LIVE LINK</Text>
          <Text style={styles.text}>UPDATE DATE</Text> */}

          <Text style={styles.subtitle}>Connected listing details :</Text>
        </View>
        {pdf_data.map((data, i) =>
          data.status ? (
            <View>
              <Image style={styles.image2} src={data.image} />
              {/* <Text style={styles.text}>{data.listing}</Text> */}
              <Text style={styles.text}>NAME : {data.username}</Text>
              <Text style={styles.text}>STATUS : synced</Text>
              <ReactPDF.Link style={styles.text} src={data.link}>
                View listing
              </ReactPDF.Link>
              <Text style={styles.text}>
                UPDATE DATE :{" "}
                {data.date
                  ? data.date
                      .split("-")
                      .reverse()
                      .join("-")
                  : "-"}
              </Text>
            </View>
          ) : (
            <View>
              <Image style={styles.image} src={require(data.image)} />
              {/* <Text style={styles.text}>{data.listing}</Text> */}
              <Text style={styles.text}>STATUS : not synced</Text>
            </View>
          )
        )}
      </Page>
    </Document>
  );

  render() {
    console.log(this.state);

    let {
      all_connections,
      pdf_data,
      googleLocationDetail,
      citysearchDetails,
      yelpDetails
    } = this.state;

    const {
      linkedin_code
      //  linkedin_errorMessage
    } = this.state;
    let googleScore = 0;
    let maxScore = 9;

    return (
      <div className="main_content">
        {this.state.loader ? (
          <div className="rightside_title">
            <Spinner />
          </div>
        ) : (
          <div>
            {/* <div className="content-page"> */}

            <div className="rightside_title">
              <h1>Listing Overview</h1>
            </div>
            {this.props.match.params.locationId != "null" ? (
              <div>
                <div className="row">
                  <div className="col-md-8">
                    <div className="listing-dolce">
                      <div className="dolce-title">
                        <h2>
                          {this.state.name}
                          <br />
                          <span>{this.state.address}</span>
                        </h2>
                        <button
                          onClick={() =>
                            this.props.history.push({
                              pathname: `/locations/${localStorage.getItem(
                                "locationId"
                              )}/view-location`
                            })
                          }
                          className="pay_last_btn"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="dolcebox">
                        <div className="dolce-profile">
                          {/* <img src={require("../images/dolce.png")} alt="" /> */}
                          <img
                            src={
                              this.state.logo
                                ? "https://dashify.biz" + this.state.logo
                                : require("../images/Logo2.png")
                            }
                            height="150"
                            width="150"
                          />
                        </div>
                        <div className="dolce-text">
                          <h4>ADDRESS AND CONTACT</h4>
                          <p>
                            {this.state.address}
                            <br />
                            {this.state.state},{this.state.postalCode} <br />Р{" "}
                            {this.state.phone}
                          </p>
                        </div>
                      </div>

                      <div className="dolce-profile-user">
                        <ul>
                          {this.state.otherImage.map((img, i) => (
                            <li>
                              <img
                                src={"https://dashify.biz" + img.Image}
                                height="115"
                                width="115"
                              />
                            </li>
                          ))}
                        </ul>

                        <h3>Business  Description</h3>
                        <p className='business_description'>{this.state.about}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="dolce-list">
                      <div className="lightblue-list">
                        <div className="dolce-icon">
                          <i className="zmdi zmdi-play-circle-outline"></i>
                        </div>
                        <div className="dolce-textbox">
                          <h4>{total_listings}</h4>
                          <strong>Total Listing</strong>
                          <p>Keyword that have moved up in the rank</p>
                        </div>
                      </div>

                      <div className="lightblue-list">
                        <div className="dolce-icon">
                          <i className="zmdi zmdi-refresh-alt"></i>
                        </div>
                        <div className="dolce-textbox">
                          <h4>
                            {all_connections ? all_connections.length : "-"}
                          </h4>
                          <strong>Sync Listing</strong>
                          <p>Keyword that have moved up in the rank</p>
                        </div>
                      </div>

                      <div className="lightblue-list">
                        <div className="dolce-icon">
                          <i className="zmdi zmdi-sign-in"></i>
                        </div>
                        <div className="dolce-textbox">
                          <h4>
                            {all_connections
                              ? total_listings - all_connections.length
                              : "-"}
                          </h4>
                          <strong>Requiring Action</strong>
                          <p>Keyword that have moved up in the rank</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-30">
                  <div className="row">
                    <div className="col-md-4">
                      {googleLocationDetail ? (
                        this.googleLocationDetailFunction(googleLocationDetail)
                      ) : (
                        <div className="bing-box">
                          <div className="google-top">
                            <img
                              src={require("../images/google-new.png")}
                              alt="google"
                            />

                            <div className="progress" data-percentage="0">
                              <span className="progress-left">
                                <span className="progress-bar"></span>
                              </span>
                              <span className="progress-right">
                                <span className="progress-bar"></span>
                              </span>
                              <div className="progress-value">
                                <div>
                                  0%
                                  <br />
                                  <span>score</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bing-detils">
                            <span>Connect google</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {/*citysearch start*/}
                    <div className="col-md-4">
                      {citysearchDetails ? (
                        this.citysearchDetailsFunction(citysearchDetails)
                      ) : (
                        <div className="bing-box">
                          <div className="google-top">
                            <div className="col-md-6">
                              <img
                                src={require("../images/citysearch-big.png")}
                                alt="citysearch"
                              />
                            </div>

                            <div className="progress" data-percentage="0">
                              <span className="progress-left">
                                <span className="progress-bar"></span>
                              </span>
                              <span className="progress-right">
                                <span className="progress-bar"></span>
                              </span>
                              <div className="progress-value">
                                <div>
                                  0%
                                  <br />
                                  <span>score</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bing-detils">
                            <span>Connect citysearch</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {/*citysearch end*/}

                    {/*yelp start*/}
                    <div className="col-md-4">
                      {yelpDetails ? (
                        this.yelpDetailsFunction(yelpDetails)
                      ) : (
                        <div className="bing-box">
                          <div className="google-top">
                            <img
                              src={require("../images/yelp-new.png")}
                              alt="yelp"
                            />

                            <div className="progress" data-percentage="0">
                              <span className="progress-left">
                                <span className="progress-bar"></span>
                              </span>
                              <span className="progress-right">
                                <span className="progress-bar"></span>
                              </span>
                              <div className="progress-value">
                                <div>
                                  0%
                                  <br />
                                  <span>score</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bing-detils">
                            <span>Connect yelp</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {/*yelp end*/}
                  </div>
                </div>

                <div className="mt-30">
                  <h2 className="account-listing">Account</h2>

                  {/* yelp */}
                  <div className="account-api">
                    <div className="row d-flex">
                      <div className="col-md-3">
                        <div className="f-connect">
                          <div className="yelp-icon">
                            <img
                              src={require("../images/yelp.png")}
                              alt="Yelp"
                            />
                          </div>
                          <div className="yelp-text">
                            {this.state.yelpIsLoggedIn ? (
                              <div>
                                <p>Connected</p>
                                <h4>{this.state.yelpName} </h4>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {this.state.yelpIsLoggedIn ? (
                          <a
                            className="disconnect_btn"
                            id={this.state.yelpId}
                            name="yelpIsLoggedIn"
                            onClick={this.disconnectAccount}
                          >
                            Disconnect
                          </a>
                        ) : (
                          <a href="/yelplogin" className="connect_btn">
                            Connect a account
                          </a>
                        )}
                      </div>

                      <div className="col-md-6">
                        {this.state.yelpIsLoggedIn ? (
                          <div className="refres_box enble_refresh">
                            <i className="fa fa-link"></i>
                            <span>Syncing</span>
                          </div>
                        ) : (
                          <div className="refres_box disble_refresh">
                            <i className="zmdi zmdi-close"></i>
                            <span>
                              Connect your account to sync the listing
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* instagram */}

                  <div className="account-api">
                    <div className="row d-flex">
                      <div className="col-md-3">
                        <div className="f-connect">
                          <div className="yelp-icon">
                            <img
                              src={require("../images/instagram.png")}
                              alt="Instagram"
                            />
                          </div>
                          <div className="yelp-text">
                            {this.state.instaIsLoggedIn ? (
                              <div>
                                <p>Connected</p>
                                <h4>{this.state.instaName} </h4>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {this.state.instaIsLoggedIn ? (
                          <a
                            className="disconnect_btn"
                            id={this.state.instaId}
                            name="instaIsLoggedIn"
                            onClick={this.disconnectAccount}
                          >
                            Disconnect
                          </a>
                        ) : (
                          <a href="/instagramlogin" className="connect_btn">
                            Connect a account
                          </a>
                        )}
                      </div>

                      <div className="col-md-6">
                        {this.state.instaIsLoggedIn ? (
                          <div className="refres_box enble_refresh">
                            <i className="fa fa-link"></i>
                            <span>Syncing</span>
                          </div>
                        ) : (
                          <div className="refres_box disble_refresh">
                            <i className="zmdi zmdi-close"></i>
                            <span>
                              Connect your account to sync the listing
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* fb */}
                  <div className="account-api">
                    <div className="row d-flex">
                      <div className="col-md-3">
                        <div className="f-connect">
                          <div className="yelp-icon">
                            <img
                              src={require("../images/facebook.png")}
                              alt="Facebook"
                            />
                          </div>
                          <div className="yelp-text">
                            {this.state.fbIsLoggedIn ? (
                              <div>
                                <p>Connected</p>
                                <h4>{this.state.fbName} </h4>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {this.state.fbIsLoggedIn ? (
                          <a
                            className="disconnect_btn"
                            id={this.state.fbId}
                            name="fbIsLoggedIn"
                            onClick={this.disconnectAccount}
                          >
                            Disconnect
                          </a>
                        ) : (
                          <FacebookLogin
                            // for server
                            // appId="3550574924973433"
                            // for localhost
                            appId="187396122554776"
                            // appId="3044182972316291"
                            autoLoad={false}
                            fields="name,email,picture"
                            // fields="name,email,picture,pages_read_engagement,pages_read_user_content,Page Public Metadata Access"
                            onClick={this.componentClicked}
                            callback={this.responseFacebook}
                            textButton="Connect a account"
                            cssClass="connect_btn"
                          />
                        )}
                      </div>

                      <div className="col-md-6">
                        {this.state.fbIsLoggedIn ? (
                          <div className="refres_box enble_refresh">
                            <i className="fa fa-link"></i>
                            <span>Syncing</span>
                          </div>
                        ) : (
                          <div className="refres_box disble_refresh">
                            <i className="zmdi zmdi-close"></i>
                            <span>
                              Connect your account to sync the listing
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* linkedin */}
                  <div className="account-api">
                    <div className="row d-flex">
                      <div className="col-md-3">
                        <div className="f-connect">
                          <div className="yelp-icon">
                            <img
                              src={require("../images/linkedin.png")}
                              alt="Linkedin"
                            />
                          </div>
                          <div className="yelp-text">
                            {this.state.linkedinIsLoggedIn ? (
                              <div>
                                <p>Connected</p>
                                <h4>{this.state.linkedinName} </h4>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {this.state.linkedinIsLoggedIn ? (
                          <a
                            className="disconnect_btn"
                            id={this.state.linkedinId}
                            name="linkedinIsLoggedIn"
                            onClick={this.disconnectAccount}
                          >
                            Disconnect
                          </a>
                        ) : (
                          <div>
                            <LinkedIn
                              clientId="788d28i85q45cz"
                              onFailure={this.linkedin_handleFailure}
                              onSuccess={this.linkedin_handleSuccess}
                              scope="r_liteprofile r_emailaddress w_member_social r_organization_social w_organization_social rw_organization_admin rw_ads r_ads_reporting"
                              redirectUri="http://localhost:3000/linkedin"
                              redirectPath="/linkedin"
                              className="connect_btn"
                              children="Connect a account"
                            ></LinkedIn>
                            {/* <a className="connect_btn">Connect a account</a> */}
                            {/* {!linkedin_code && <div>No code</div>}
                      {linkedin_code && <div>Code: {linkedin_code}</div>}
                      {linkedin_errorMessage && (
                        <div>{linkedin_errorMessage}</div>
                      )} */}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        {this.state.linkedinIsLoggedIn ? (
                          <div className="refres_box enble_refresh">
                            <i className="fa fa-link"></i>
                            <span>Syncing</span>
                          </div>
                        ) : (
                          <div className="refres_box disble_refresh">
                            <i className="zmdi zmdi-close"></i>
                            <span>
                              Connect your account to sync the listing
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* avvo */}

                  <div className="account-api">
                    <div className="row d-flex">
                      <div className="col-md-3">
                        <div className="f-connect">
                          <div className="yelp-icon">
                            <img
                              src={require("../images/avvo.png")}
                              alt="Avvo"
                            />
                          </div>
                          <div className="yelp-text">
                            {this.state.avvoIsLoggedIn ? (
                              <div>
                                <p>Connected</p>
                                <h4>{this.state.avvoName} </h4>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {this.state.avvoIsLoggedIn ? (
                          <a
                            className="disconnect_btn"
                            id={this.state.avvoId}
                            name="avvoIsLoggedIn"
                            onClick={this.disconnectAccount}
                          >
                            Disconnect
                          </a>
                        ) : (
                          <a
                            href="http://www.avvo.com/oauth2/sessions/new?client_id=5qnw8y28j4m1ey1s29wprg668&client_secret=8dou5mll9h4z0k2i4ow752e8b&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Favvologin&response_type=code_and_token"
                            className="connect_btn"
                          >
                            Connect a account
                          </a>
                        )}
                      </div>

                      <div className="col-md-6">
                        {this.state.avvoIsLoggedIn ? (
                          <div className="refres_box enble_refresh">
                            <i className="fa fa-link"></i>
                            <span>Syncing</span>
                          </div>
                        ) : (
                          <div className="refres_box disble_refresh">
                            <i className="zmdi zmdi-close"></i>
                            <span>
                              Connect your account to sync the listing
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* foursquare */}
                  <div className="account-api">
                    <div className="row d-flex">
                      <div className="col-md-3">
                        <div className="f-connect">
                          <div className="yelp-icon">
                            <img
                              src={require("../images/foursquare.png")}
                              alt="Foursquare"
                            />
                          </div>
                          <div className="yelp-text">
                            {this.state.foursquareIsLoggedIn ? (
                              <div>
                                <p>Connected</p>
                                <h4>{this.state.foursquareName} </h4>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {this.state.foursquareIsLoggedIn ? (
                          <a
                            className="disconnect_btn"
                            id={this.state.foursquareId}
                            name="foursquareIsLoggedIn"
                            onClick={this.disconnectAccount}
                          >
                            Disconnect
                          </a>
                        ) : (
                          <a href="/foursquarelogin" className="connect_btn">
                            Connect a account
                          </a>
                        )}
                      </div>

                      <div className="col-md-6">
                        {this.state.foursquareIsLoggedIn ? (
                          <div className="refres_box enble_refresh">
                            <i className="fa fa-link"></i>
                            <span>Syncing</span>
                          </div>
                        ) : (
                          <div className="refres_box disble_refresh">
                            <i className="zmdi zmdi-close"></i>
                            <span>
                              Connect your account to sync the listing
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* DNB */}
                  <div className="account-api">
                    <div className="row d-flex">
                      <div className="col-md-3">
                        <div className="f-connect">
                          <div className="yelp-icon">
                            <img
                              src={require("../images/dnb.jpg")}
                              alt="DandB"
                            />
                          </div>
                          <div className="yelp-text">
                            {this.state.dnbIsLoggedIn ? (
                              <div>
                                <p>Connected</p>
                                <h4>{this.state.dnbName} </h4>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {this.state.dnbIsLoggedIn ? (
                          <a
                            className="disconnect_btn"
                            id={this.state.dnbId}
                            name="dnbIsLoggedIn"
                            onClick={this.disconnectAccount}
                          >
                            Disconnect
                          </a>
                        ) : (
                          <a href="/dnblogin" className="connect_btn">
                            Connect a account
                          </a>
                        )}
                      </div>

                      <div className="col-md-6">
                        {this.state.dnbIsLoggedIn ? (
                          <div className="refres_box enble_refresh">
                            <i className="fa fa-link"></i>
                            <span>Syncing</span>
                          </div>
                        ) : (
                          <div className="refres_box disble_refresh">
                            <i className="zmdi zmdi-close"></i>
                            <span>
                              Connect your account to sync the listing
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* google */}
                  <div className="account-api">
                    <div className="row d-flex">
                      <div className="col-md-3">
                        <div className="f-connect">
                          <div className="yelp-icon">
                            <img
                              src={require("../images/google.png")}
                              alt="Google"
                            />
                          </div>
                          <div className="yelp-text">
                            {this.state.googleIsLoggedIn ? (
                              <div>
                                <p>Connected</p>
                                <h4>{this.state.googleName} </h4>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {this.state.googleIsLoggedIn ? (
                          <a
                            className="disconnect_btn"
                            id={this.state.googleId}
                            name="googleIsLoggedIn"
                            onClick={this.disconnectAccount}
                          >
                            Disconnect
                          </a>
                        ) : (
                          <div className="google_btnb">
                            <GoogleLogin
                              //for localhost
                              //clientId="759599444436-po5k7rhkaqdu55toirpt5c8osaqln6ul.apps.googleusercontent.com"
                              //for server
                              clientId="759599444436-5litbq8gav4ku8sj01o00uh6lsk8ebr0.apps.googleusercontent.com"
                              buttonText="Connect a account"
                              class="connect_btn"
                              scope="https://www.googleapis.com/auth/business.manage"
                              onSuccess={this.responseGoogle}
                              onFailure={this.responseErrorGoogle}
                              cookiePolicy={"single_host_origin"}
                              icon={false}

                              //for refresh token
                              // accessType="offline"
                              // responseType="code"
                              // pompt="consent"
                            />
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        {this.state.googleIsLoggedIn ? (
                          <div className="refres_box enble_refresh">
                            <i className="fa fa-link"></i>
                            <span>Syncing</span>
                          </div>
                        ) : (
                          <div className="refres_box disble_refresh">
                            <i className="zmdi zmdi-close"></i>
                            <span>
                              Connect your account to sync the listing
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* apple */}
                  <div className="account-api">
                    <div className="row d-flex">
                      <div className="col-md-3">
                        <div className="f-connect">
                          <div className="yelp-icon">
                            <img
                              src={require("../images/apple.png")}
                              alt="Apple"
                            />
                          </div>
                          <div className="yelp-text">
                            {this.state.appleIsLoggedIn ? (
                              <div>
                                <p>Connected</p>
                                <h4>{this.state.appleName} </h4>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {this.state.appleIsLoggedIn ? (
                          <a
                            className="disconnect_btn"
                            id={this.state.appleId}
                            name="appleIsLoggedIn"
                            onClick={this.disconnectAccount}
                          >
                            Disconnect
                          </a>
                        ) : (
                          <a href="/applelogin" className="connect_btn">
                            Connect a account
                          </a>
                        )}
                      </div>

                      <div className="col-md-6">
                        {this.state.appleIsLoggedIn ? (
                          <div className="refres_box enble_refresh">
                            <i className="fa fa-link"></i>
                            <span>Syncing</span>
                          </div>
                        ) : (
                          <div className="refres_box disble_refresh">
                            <i className="zmdi zmdi-close"></i>
                            <span>
                              Connect your account to sync the listing
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* citysearch */}
                  <div className="account-api">
                    <div className="row d-flex">
                      <div className="col-md-3">
                        <div className="f-connect">
                          <div className="yelp-icon">
                            <img
                              src={require("../images/citysearch.png")}
                              alt="Citysearch"
                            />
                          </div>
                          <div className="yelp-text">
                            {this.state.citysearchIsLoggedIn ? (
                              <div>
                                <p>Connected</p>
                                <h4>{this.state.citysearchName} </h4>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {this.state.citysearchIsLoggedIn ? (
                          <a
                            className="disconnect_btn"
                            id={this.state.citysearchId}
                            name="citysearchIsLoggedIn"
                            onClick={this.disconnectAccount}
                          >
                            Disconnect
                          </a>
                        ) : (
                          <a href="/citysearchlogin" className="connect_btn">
                            Connect a account
                          </a>
                        )}
                      </div>

                      <div className="col-md-6">
                        {this.state.citysearchIsLoggedIn ? (
                          <div className="refres_box enble_refresh">
                            <i className="fa fa-link"></i>
                            <span>Syncing</span>
                          </div>
                        ) : (
                          <div className="refres_box disble_refresh">
                            <i className="zmdi zmdi-close"></i>
                            <span>
                              Connect your account to sync the listing
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* zillow */}
                  <div className="account-api">
                    <div className="row d-flex">
                      <div className="col-md-3">
                        <div className="f-connect">
                          <div className="yelp-icon">
                            <img
                              src={require("../images/zillow.png")}
                              alt="Zillow"
                            />
                          </div>
                          <div className="yelp-text">
                            {this.state.zillowIsLoggedIn ? (
                              <div>
                                <p>Connected</p>
                                <h4>{this.state.zillowName} </h4>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {this.state.zillowIsLoggedIn ? (
                          <a
                            className="disconnect_btn"
                            id={this.state.yelpId}
                            name="zillowIsLoggedIn"
                            onClick={this.disconnectAccount}
                          >
                            Disconnect
                          </a>
                        ) : (
                          <a href="/zillowlogin" className="connect_btn">
                            Connect a account
                          </a>
                        )}
                      </div>

                      <div className="col-md-6">
                        {this.state.zillowIsLoggedIn ? (
                          <div className="refres_box enble_refresh">
                            <i className="fa fa-link"></i>
                            <span>Syncing</span>
                          </div>
                        ) : (
                          <div className="refres_box disble_refresh">
                            <i className="zmdi zmdi-close"></i>
                            <span>
                              Connect your account to sync the listing
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* tomtom */}
                  <div className="account-api">
                    <div className="row d-flex">
                      <div className="col-md-3">
                        <div className="f-connect">
                          <div className="yelp-icon">
                            <img
                              src={require("../images/tomtom.png")}
                              alt="Tomtom"
                            />
                          </div>
                          <div className="yelp-text">
                            {this.state.tomtomIsLoggedIn ? (
                              <div>
                                <p>Connected</p>
                                <h4>{this.state.tomtomName} </h4>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {this.state.tomtomIsLoggedIn ? (
                          <a
                            className="disconnect_btn"
                            id={this.state.tomtomId}
                            name="tomtomIsLoggedIn"
                            onClick={this.disconnectAccount}
                          >
                            Disconnect
                          </a>
                        ) : (
                          <a href="/tomtomlogin" className="connect_btn">
                            Connect a account
                          </a>
                        )}
                      </div>

                      <div className="col-md-6">
                        {this.state.tomtomIsLoggedIn ? (
                          <div className="refres_box enble_refresh">
                            <i className="fa fa-link"></i>
                            <span>Syncing</span>
                          </div>
                        ) : (
                          <div className="refres_box disble_refresh">
                            <i className="zmdi zmdi-close"></i>
                            <span>
                              Connect your account to sync the listing
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* zomato */}
                  <div className="account-api">
                    <div className="row d-flex">
                      <div className="col-md-3">
                        <div className="f-connect">
                          <div className="yelp-icon">
                            <img
                              src={require("../images/zomato.png")}
                              alt="Zomato"
                            />
                          </div>
                          <div className="yelp-text">
                            {this.state.zomatoIsLoggedIn ? (
                              <div>
                                <p>Connected</p>
                                <h4>{this.state.zomatoName} </h4>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {this.state.zomatoIsLoggedIn ? (
                          <a
                            className="disconnect_btn"
                            id={this.state.zomatoId}
                            name="zomatoIsLoggedIn"
                            onClick={this.disconnectAccount}
                          >
                            Disconnect
                          </a>
                        ) : (
                          <a href="/zomatologin" className="connect_btn">
                            Connect a account
                          </a>
                        )}
                      </div>

                      <div className="col-md-6">
                        {this.state.zomatoIsLoggedIn ? (
                          <div className="refres_box enble_refresh">
                            <i className="fa fa-link"></i>
                            <span>Syncing</span>
                          </div>
                        ) : (
                          <div className="refres_box disble_refresh">
                            <i className="zmdi zmdi-close"></i>
                            <span>
                              Connect your account to sync the listing
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* here */}
                  <div className="account-api">
                    <div className="row d-flex">
                      <div className="col-md-3">
                        <div className="f-connect">
                          <div className="yelp-icon">
                            <img
                              src={require("../images/here.png")}
                              alt="Here"
                            />
                          </div>
                          <div className="yelp-text">
                            {this.state.hereIsLoggedIn ? (
                              <div>
                                <p>Connected</p>
                                <h4>{this.state.hereName} </h4>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {this.state.hereIsLoggedIn ? (
                          <a
                            className="disconnect_btn"
                            id={this.state.hereId}
                            name="hereIsLoggedIn"
                            onClick={this.disconnectAccount}
                          >
                            Disconnect
                          </a>
                        ) : (
                          <a href="/herelogin" className="connect_btn">
                            Connect a account
                          </a>
                        )}
                      </div>

                      <div className="col-md-6">
                        {this.state.hereIsLoggedIn ? (
                          <div className="refres_box enble_refresh">
                            <i className="fa fa-link"></i>
                            <span>Syncing</span>
                          </div>
                        ) : (
                          <div className="refres_box disble_refresh">
                            <i className="zmdi zmdi-close"></i>
                            <span>
                              Connect your account to sync the listing
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="listing-lastupdate">
                    <p>Last Update Yesterday at 13:10 PM</p>
                    <PDFDownloadLink
                      document={this.Quixote(pdf_data)}
                      fileName="connected_listing_report.pdf"
                    >
                      {({ blob, url, loading, error }) =>
                        this.state.loader ||
                        this.state.category == "Loading...." ? (
                          "Loading document..."
                        ) : (
                          <a className="download-report">Download Report</a>
                        )
                      }
                    </PDFDownloadLink>
                  </div>
                </div>
              </div>
            ) : (
              <div >
              <h4 className='connect_msg'>Connect Location first</h4>
            </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
