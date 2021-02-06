import React, { Component } from "react";

import { all_connection_of_one_location } from "./apis/social_platforms";
import {review_analytics_by_location} from "./apis/review"
import Chart from "react-google-charts";
import Spinner from "./common/Spinner";
import Column_chart from "./charts/Column_chart";
import { Divider } from "@material-ui/core";
import { MDBCol, MDBRow } from "mdbreact";
import DonutChart from "react-donut-chart";
import MaterialTable from 'material-table';
import ReactApexChart from 'react-apexcharts'
import { secure_pin } from "../config";
const Yelpconfig = {
  headers: {
    Authorization:
      "bearer _1cVnrrkqmG_dwNUdtorVxarkzItJM7AWM700rkRxM7aPdDfxJECcdaN00ADjSkrStF1pX4sdGCspYeSjU7VGkpjWYoMsC2_filBf5d5J5GMRTgXws_W6qusNMhYX3Yx",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost",
  },
};

const Zomatoconfig = {
  headers: {
    "user-key": "0850988704eeed5da2f4d38fdfc582c1",
    Accept: "application/json",
  },
};

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") },
};

export default class ReviewAnalytics extends Component {
  state = {
    fbAccounts: [],
    fbToken: "",
    locationIdGoogle: "",
    loader: true,
    all_connections: [],

    yelpReviews: [],
    yelpDetails: [],
    googleReviews: [],
    foursquareReviews: [],
    foursquareDetails: [],
    foursquareReviewCount: "-",
    today: "",
    fb_new_reviews: "-",
    google_new_reviews: "-",
    yelp_new_reviews: "-",
    foursquare_new_reviews: "-",

    citysearchNewReviews: "-",
    citysearchRating: "-",
    citysearchReviewCount: "-",

    appleRating: "-",
    appleReviewCount: "-",

    hereRating: "-",
    hereReviews: "-",

    zillowRating: "-",
    zillowReviews: "-",

    tomtomRating: "-",
    tomtomReviews: "-",
    tomtomNewReviews: "-",

    avvoRating: "-",
    avvoReviews: "-",

    zomatoRating: "-",
    zomatoReviews: "-",
  };


  fliterUpdate=e=>{
    try{
    const data2={
      secure_pin,"user_id":localStorage.getItem("UserId") ,
      "location_id":localStorage.getItem("locationId"),
      "filter_type":e.target.value
    };

    review_analytics_by_location(data2).then((response) => {
      console.log("ana",response);

      this.setState({

        TotalReview:response.data.analytics_data[0].total_reviews,
        NewReview:response.data.analytics_data[0].new_reviews,
        AvgRating:response.data.analytics_data[0].average_rating,
        ReviewResponseRate:response.data.analytics_data[0].review_response_rate,

       AllAnalytics:response.data.reviews_data,
       Consolidate:response.data.consolidated_data

      })
    })
    .catch((error)=>console.log(error))
  }catch(e){}}
  componentDidMount() {
    try{
    var today = new Date();
    this.setState({ today });
    var yelpUrl,
      fourUrl,
      fbtoken,
      fbPageId,
      googleToken,
      appleUrl,
      citysearchUrl,
      hereUrl,
      zillowUrl,
      tomtomUrl,
      avvoUrl,
      avvoToken,
      zomatoUrl;

    const data = {
      secure_pin,"user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId")
    };

    // Axios.post(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/locations/get-all-connection-of-one-location",
    //   data,
    //   DjangoConfig
    // )
    all_connection_of_one_location(data, DjangoConfig)
      .then((response) => {
        console.log(response);

        this.setState({ loader: false,all_connections:response.data.social_media_list });
        response.data.social_media_list.map((l) => {
          if (l.connect_type == "Facebook") {
            // fbtoken = l.Social_Platform.Token;
            // console.log(fbtoken);
            // fbPageId = l.Social_Platform.Other_info;
          }

          if (l.connect_type == "Google") {
            console.log("yes goo");
            // googleToken = l.Social_Platform.Token;
            // console.log(googleToken);
            // this.setState({ locationIdGoogle: l.Social_Platform.Other_info });
          }

          if (l.connect_type== "Foursquare") {
            console.log("yes four");

            // fourUrl = l.Social_Platform.Other_info.split(",")[0]
            //   .slice(7)
            //   .split("/")[5];
          }

          if (l.connect_type == "Yelp") {
            console.log("yes yelp");

            // yelpUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);
          }

          if (l.connect_type == "Apple") {
            // appleUrl = l.Social_Platform.Other_info.split(",")[0]
            //   .slice(7)
            //   .split("/")[6]
            //   .slice(2);
          }

          if (l.connect_type == "Citysearch") {
            // citysearchUrl = l.Social_Platform.Other_info.split(",")[0]
            //   .slice(7)
            //   .split("/")[4];
          }
          if (l.connect_type == "Here") {
            // hereUrl = l.Social_Platform.Other_info;
          }
          if (l.connect_type == "Zillow") {
            // zillowUrl = l.Social_Platform.Other_info;
          }
          if (l.connect_type == "Tomtom") {
            // tomtomUrl = l.Social_Platform.Other_info;
          }
          if (l.connect_type == "Avvo") {
            // avvoUrl = l.Social_Platform.Other_info;
            // avvoToken = l.Social_Platform.Token;
          }
          if (l.connect_type == "Zomato") {
            // zomatoUrl = l.Social_Platform.Other_info;
          }
        });

        const data2={
          secure_pin,"user_id":localStorage.getItem("UserId") ,
          "location_id":localStorage.getItem("locationId"),
          "filter_type":"last week"
        };

        review_analytics_by_location(data2).then((response) => {
          console.log("ana",response);

          this.setState({

            TotalReview:response.data.analytics_data[0].total_reviews,
            NewReview:response.data.analytics_data[0].new_reviews,
            AvgRating:response.data.analytics_data[0].average_rating,
            ReviewResponseRate:response.data.analytics_data[0].review_response_rate,

           AllAnalytics:response.data.reviews_data,
           Consolidate:response.data.consolidated_data

          })
        })
        .catch((error)=>console.log(error))

  //       // for facebook
  //       if (fbtoken) {
  //         Axios.get(
  //           "https://graph.facebook.com/me/accounts?fields=access_token,id,name,overall_star_rating,category,category_list,tasks&access_token=" +
  //             fbtoken
  //         ).then((resp) => {
  //           this.setState({ fbAccounts: resp.data.data });
  //           var fbPageAccessToken, index;
  //           for (let i = 0; i < resp.data.data.length; i++) {
  //             if (resp.data.data[i].id == fbPageId) {
  //               fbPageAccessToken = resp.data.data[i].access_token;
  //               index = i;
  //             }
  //           }
  //           Axios.get(
  //             "https://graph.facebook.com/" +
  //               fbPageId +
  //               "/ratings?fields=has_rating,review_text,created_time,has_review,rating,recommendation_type&access_token=" +
  //               fbPageAccessToken
  //           ).then((res) => {
  //             console.log("facebook reviews", res.data.data);
  //             this.setState({
  //               fbReviews: res.data.data.length,
  //               fb_average_rating: resp.data.data[index].overall_star_rating,
  //             });
  //             let fb_new_reviews = 0;
  //             for (let j = 0; j < res.data.data.length; j++) {
  //               let create_time1 = res.data.data[j].created_time;
  //               if (parseInt(create_time1.slice(0, 4)) == today.getFullYear()) {
  //                 if (
  //                   parseInt(create_time1.slice(5, 7)) ==
  //                   today.getMonth() + 1
  //                 ) {
  //                   if (
  //                     parseInt(create_time1.slice(8, 10)) == today.getDate()
  //                   ) {
  //                     fb_new_reviews++;
  //                   }
  //                 }
  //               }
  //             }
  //             this.setState({ fb_new_reviews });
  //             this.setState({
  //               all_connections: [
  //                 ...this.state.all_connections,
  //                 { name: "Facebook" },
  //               ],
  //             });
  //           });
  //         });
  //       }

  //       //for yelp

  //       if (yelpUrl) {
  //         Axios.get(
  //           "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
  //             yelpUrl.slice(25) +
  //             "/reviews",
  //           Yelpconfig
  //         ).then((resp) => {
  //           console.log("yelp reviews", resp.data);
  //           this.setState({ yelpReviews: resp.data.reviews });

  //           let yelp_new_reviews = 0;
  //           for (let j = 0; j < resp.data.reviews.length; j++) {
  //             let create_time1 = resp.data.reviews[j].time_created;
  //             if (parseInt(create_time1.slice(0, 4)) == today.getFullYear()) {
  //               if (
  //                 parseInt(create_time1.slice(5, 7)) ==
  //                 today.getMonth() + 1
  //               ) {
  //                 if (parseInt(create_time1.slice(8, 10)) == today.getDate()) {
  //                   yelp_new_reviews++;
  //                 }
  //               }
  //             }
  //           }
  //           this.setState({ yelp_new_reviews });
  //           this.setState({
  //             all_connections: [
  //               ...this.state.all_connections,
  //               { name: "Yelp" },
  //             ],
  //           });
  //         });

  //         Axios.get(
  //           "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
  //             yelpUrl.slice(25),
  //           Yelpconfig
  //         ).then((resp) => {
  //           console.log("hii");
  //           console.log("yelp details", resp.data);
  //           this.setState({ yelpDetails: resp.data });
  //         });
  //       }

  //       // for google

  //       const GoogleConfig = {
  //         headers: { Authorization: "Bearer " + googleToken },
  //       };

  //       if (googleToken) {
  //         Axios.get(
  //           "https://mybusiness.googleapis.com/v4/accounts/",
  //           GoogleConfig
  //         ).then((res) => {
  //           console.log(res.data);
  //           localStorage.setItem("accountId", res.data.accounts[0].name);

         
  //           Axios.get(
  //             "https://mybusiness.googleapis.com/v4/" +
  //               this.state.locationIdGoogle +
  //               "/reviews",
  //             GoogleConfig
  //           ).then((respo) => {
  //             console.log("google reviews", respo.data);
  //             this.setState({ googleReviews: respo.data });
  //             let google_new_reviews = 0;
  //             if (respo.data.reviews) {
  //               for (let j = 0; j < respo.data.reviews.length; j++) {
  //                 let create_time1 = respo.data.reviews[j].updateTime;
  //                 if (
  //                   parseInt(create_time1.slice(0, 4)) == today.getFullYear()
  //                 ) {
  //                   if (
  //                     parseInt(create_time1.slice(5, 7)) ==
  //                     today.getMonth() + 1
  //                   ) {
  //                     if (
  //                       parseInt(create_time1.slice(8, 10)) == today.getDate()
  //                     ) {
  //                       google_new_reviews++;
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //             this.setState({ google_new_reviews });
  //             this.setState({
  //               all_connections: [
  //                 ...this.state.all_connections,
  //                 { name: "Google" },
  //               ],
  //             });
  //           });
  //           // });
  //         });
  //       }

  //       // For foursquare

  //       //   var fourUrl=localStorage.getItem('fourUrl');

  //       if (fourUrl) {
  //         Axios.get(
  //           "https://api.foursquare.com/v2/venues/" +
  //             fourUrl +
  //             "?client_id=44RU2431YG02H4E00RQTLKEUKIKINQSFO2JBHII2WHH32PXZ&client_secret=FWV2WOL40MQ5M1YZ5E2TKUWIQ4WYZ1QUJXOQ24VGRSXFA3IY&v=20180323"
  //         ).then((res) => {
  //           console.log("foursquare data", res.data.response.venue);
  //           this.setState({
  //             foursquareReviews: res.data.response.venue.tips.groups[0]
  //               ? res.data.response.venue.tips.groups[0].items
  //               : [],
  //             foursquareDetails: res.data.response.venue,
  //             foursquareReviewCount: res.data.response.venue.tips.count,
  //           });
  //           this.setState({
  //             all_connections: [
  //               ...this.state.all_connections,
  //               { name: "Foursquare" },
  //             ],
  //           });
  //         });
  //       }

  //       if (appleUrl) {
  //         Axios.get(
  //           "https://itunes.apple.com/in/rss/customerreviews/id=" +
  //             appleUrl +
  //             "/sortBy=mostRecent/json"
  //         ).then((res) => {
  //           console.log("apple data", res.data);

  //           let appleRating = 0;
  //           let appleReviews = res.data.feed.entry;

  //           for (let i = 0; i < appleReviews.length; i++) {
  //             appleRating += parseInt(appleReviews[i]["im:rating"].label);
  //           }
  //           appleRating = parseInt(
  //             (appleRating / appleReviews.length).toString().slice(0, 3)
  //           );
  //           this.setState({
  //             appleRating,
  //             appleReviewCount: res.data.feed.entry.length,
  //           });
  //           this.setState({
  //             all_connections: [
  //               ...this.state.all_connections,
  //               { name: "Apple" },
  //             ],
  //           });
  //         });
  //       }

  //       if (citysearchUrl) {
  //         Axios.get(
  //           "https://cors-anywhere.herokuapp.com/https://api.citygridmedia.com/content/reviews/v2/search/where?listing_id=" +
  //             citysearchUrl +
  //             "&publisher=test"
  //         ).then((res) => {
  //           var XMLParser = require("react-xml-parser");
  //           var xml = new XMLParser().parseFromString(res.data); // Assume xmlText contains the example XML
  //           console.log("citysearch details", xml);
  //           console.log(
  //             "citysearch reviews",
  //             xml.getElementsByTagName("review")
  //           );

  //           let citysearchReviews = xml.getElementsByTagName("review");
  //           var citysearchRating = 0;
  //           var citysearchNewReviews = 0;
  //           for (let i = 0; i < citysearchReviews.length; i++) {
  //             citysearchRating +=
  //               parseInt(citysearchReviews[i].children[5].value) / 2;

  //             let create_time1 = citysearchReviews[i].children[6].value;
  //             if (parseInt(create_time1.slice(0, 4)) == today.getFullYear()) {
  //               if (
  //                 parseInt(create_time1.slice(5, 7)) ==
  //                 today.getMonth() + 1
  //               ) {
  //                 if (parseInt(create_time1.slice(8, 10)) == today.getDate()) {
  //                   citysearchNewReviews++;
  //                 }
  //               }
  //             }
  //           }
  //           citysearchRating = parseInt(
  //             (citysearchRating / citysearchReviews.length)
  //               .toString()
  //               .slice(0, 3)
  //           );
  //           this.setState({
  //             citysearchNewReviews,
  //             citysearchRating,
  //             citysearchReviewCount: xml.getElementsByTagName("review").length,
  //           });
  //           this.setState({
  //             all_connections: [
  //               ...this.state.all_connections,
  //               { name: "Citysearch" },
  //             ],
  //           });
  //         });
  //       }

  //       //Here

  //       if (hereUrl) {
  //         Axios.get(hereUrl).then((res) => {
  //           console.log("Here data", res.data);

  //           let hereRating =
  //             res.data.media.ratings.items.length >= 1
  //               ? res.data.media.ratings.items[0].average
  //               : "-";
  //           let hereReviews =
  //             res.data.media.ratings.items.length >= 1
  //               ? res.data.media.ratings.items[0].count
  //               : "-";
  //           this.setState({
  //             hereRating,
  //             hereReviews: hereReviews,
  //           });
  //           this.setState({
  //             all_connections: [
  //               ...this.state.all_connections,
  //               { name: "Here" },
  //             ],
  //           });
  //         });
  //       }

  //       // zillow

  //       if (zillowUrl) {
  //         Axios.get(
  //           "https://www.zillow.com/webservice/ProReviews.htm?zws-id=X1-ZWz170sf100mbv_7lwvq&email=" +
  //             zillowUrl +
  //             "&count=10&output=json"
  //         ).then((res) => {
  //           console.log("zillow data", res.data);

  //           let zillowRating = res.data.response.results.proInfo.avgRating
  //             ? parseFloat(res.data.response.results.proInfo.avgRating)
  //             : 0;
  //           let zillowReviews = parseInt(
  //             res.data.response.results.proInfo.reviewCount
  //           );
  //           this.setState({
  //             zillowRating,
  //             zillowReviews,
  //           });
  //           this.setState({
  //             all_connections: [
  //               ...this.state.all_connections,
  //               { name: "Zillow" },
  //             ],
  //           });
  //         });
  //       }

  //       // tomtom

  //       if (tomtomUrl) {
  //         if (tomtomUrl == "-") {
  //           this.setState({
  //             tomtomRating: 0,
  //             tomtomReviews: 0,
  //             tomtomNewReviews: 0,
  //           });
  //         } else {
  //           Axios.get(
  //             "https://api.tomtom.com/search/2/poiDetails.json?key=IRUplE1TqUPstrlMA2N51xASusnsDsEd&id=" +
  //               tomtomUrl
  //           ).then((res) => {
  //             console.log("tomtom data", res.data);

  //             let tomtomRating = res.data.result.rating
  //               ? parseFloat(res.data.result.rating.value) / 2
  //               : 0;

  //             let tomtomReviews = parseInt(res.data.result.rating.totalRatings);

  //             var tomtomNewReviews = 0;
  //             for (let i = 0; i < res.data.result.reviews.length; i++) {
  //               let create_time1 = res.data.result.reviews[i];
  //               if (parseInt(create_time1.slice(0, 4)) == today.getFullYear()) {
  //                 if (
  //                   parseInt(create_time1.slice(5, 7)) ==
  //                   today.getMonth() + 1
  //                 ) {
  //                   if (
  //                     parseInt(create_time1.slice(8, 10)) == today.getDate()
  //                   ) {
  //                     tomtomNewReviews++;
  //                   }
  //                 }
  //               }
  //             }
  //             this.setState({
  //               tomtomRating,
  //               tomtomReviews,
  //               tomtomNewReviews,
  //             });
  //             this.setState({
  //               all_connections: [
  //                 ...this.state.all_connections,
  //                 { name: "Tomtom" },
  //               ],
  //             });
  //           });
  //         }
  //       }

  //       // avvo

  //       if (avvoUrl && avvoToken) {
  //         const AvvoConfig = {
  //           headers: {
  //             Authorization: "Bearer " + avvoToken,
  //           },
  //         };
  //         Axios.get(
  //           "https://cors-anywhere.herokuapp.com/https://api.avvo.com/api/4/lawyers.json?id[]=" +
  //             avvoUrl,
  //           AvvoConfig
  //         ).then((res) => {
  //           console.log("avvo lawyer data in json", res.data);

  //           let avvoRating = parseFloat(
  //             res.data.lawyers[0].client_review_score
  //           );
  //           let avvoReviews = parseInt(res.data.lawyers[0].client_review_count);
  //           this.setState({
  //             avvoRating,
  //             avvoReviews,
  //           });
  //           this.setState({
  //             all_connections: [
  //               ...this.state.all_connections,
  //               { name: "Avvo" },
  //             ],
  //           });
  //         });
  //       }

  //       // zomato

  //       if (zomatoUrl) {
  //         Axios.get(
  //           "https://developers.zomato.com/api/v2.1/restaurant?res_id=" +
  //             zomatoUrl,
  //           Zomatoconfig
  //         ).then((res) => {
  //           console.log("zomato data", res.data);

  //           let zomatoRating = res.data.user_rating.aggregate_rating
  //             ? parseFloat(res.data.user_rating.aggregate_rating)
  //             : 0;
  //           let zomatoReviews = parseInt(res.data.all_reviews_count);
  //           this.setState({
  //             zomatoRating,
  //             zomatoReviews,
  //           });
  //           this.setState({
  //             all_connections: [
  //               ...this.state.all_connections,
  //               { name: "Zomato" },
  //             ],
  //           });
  //         });
  //       }
  //     })
  //     .catch((res) => {
  //       console.log("error in review analytics", res);
  //       this.setState({
  //         loader: false,
  //       });
      });
    }catch(e){} }

  render() {
    console.log("states", this.state);

    let { all_connections, TotalReview,NewReview,AvgRating,ReviewResponseRate,AllAnalytics, Consolidate } = this.state;
    
    if(AllAnalytics)
    AllAnalytics.push(Consolidate[0])
    
    // var total_new_reviews =
    //   (this.state.fb_new_reviews == "-" ? 0 : this.state.fb_new_reviews) +
    //   (this.state.google_new_reviews == "-"
    //     ? 0
    //     : this.state.google_new_reviews) +
    //   (this.state.yelp_new_reviews == "-" ? 0 : this.state.yelp_new_reviews) +
    //   (this.state.citysearchNewReviews == "-"
    //     ? 0
    //     : this.state.citysearchNewReviews) +
    //   (this.state.tomtomNewReviews == "-" ? 0 : this.state.tomtomNewReviews);

    //rating calculation
    // var overAllRating = 0,
    //   overAllReviewCount = 0;

    // let a = 0;
    // a =
    //   a +
    //   (this.state.yelpDetails.rating > 0 ? 1 : 0) +
    //   (this.state.googleReviews.averageRating > 0 ? 1 : 0) +
    //   (this.state.foursquareDetails.rating > 0 ? 1 : 0) +
    //   (this.state.fb_average_rating > 0 ? 1 : 0) +
    //   (this.state.appleRating > 0 ? 1 : 0) +
    //   (this.state.citysearchRating > 0 ? 1 : 0) +
    //   (this.state.hereRating > 0 ? 1 : 0) +
    //   (this.state.zillowRating > 0 ? 1 : 0) +
    //   (this.state.tomtomRating > 0 ? 1 : 0) +
    //   (this.state.avvoRating > 0 ? 1 : 0) +
    //   (this.state.zomatoRating > 0 ? 1 : 0);

    // overAllRating =
    //   (this.state.yelpDetails.rating ? this.state.yelpDetails.rating : 0) +
    //   (this.state.googleReviews.averageRating
    //     ? this.state.googleReviews.averageRating
    //     : 0) +
    //   (this.state.foursquareDetails.rating
    //     ? this.state.foursquareDetails.rating / 2
    //     : 0) +
    //   (this.state.fb_average_rating ? this.state.fb_average_rating : 0) +
    //   (this.state.appleRating && this.state.appleRating != "-"
    //     ? this.state.appleRating
    //     : 0) +
    //   (this.state.citysearchRating && this.state.citysearchRating != "-"
    //     ? this.state.citysearchRating
    //     : 0) +
    //   (this.state.hereRating != "-" ? this.state.hereRating : 0) +
    //   (this.state.zillowRating != "-" ? this.state.zillowRating : 0) +
    //   (this.state.tomtomRating != "-" ? this.state.tomtomRating : 0) +
    //   (this.state.avvoRating != "-" ? this.state.avvoRating : 0) +
    //   (this.state.zomatoRating != "-" ? this.state.zomatoRating : 0);

    // // console.log("all rating",this.state.yelpDetails.rating,this.state.googleReviews.averageRating,this.state.foursquareDetails.rating,this.state.fb_average_rating,this.state.appleRating,this.state.citysearchRating,this.state.hereRating,this.state.zillowRating,this.state.tomtomRating,this.state.avvoRating,this.state.zomatoRating)

    // overAllRating = a == 0 ? "-" : overAllRating / a;

    // overAllReviewCount =
    //   (this.state.fbReviews ? this.state.fbReviews : 0) +
    //   (this.state.yelpDetails.review_count
    //     ? this.state.yelpDetails.review_count
    //     : 0) +
    //   (this.state.googleReviews.totalReviewCount
    //     ? this.state.googleReviews.totalReviewCount
    //     : 0) +
    //   (this.state.foursquareReviewCount == "-"
    //     ? 0
    //     : this.state.foursquareReviewCount) +
    //   (this.state.appleReviewCount == "-" ? 0 : this.state.appleReviewCount) +
    //   (this.state.citysearchReviewCount == "-"
    //     ? 0
    //     : this.state.citysearchReviewCount) +
    //   (this.state.hereReviews == "-" ? 0 : this.state.hereReviews) +
    //   (this.state.zillowReviews == "-" ? 0 : this.state.zillowReviews) +
    //   (this.state.tomtomReviews == "-" ? 0 : this.state.tomtomReviews) +
    //   (this.state.avvoReviews == "-" ? 0 : this.state.avvoReviews) +
    //   (this.state.zomatoReviews == "-" ? 0 : this.state.zomatoReviews);

    // console.log(overAllReviewCount);

    // if (this.state.foursquareReviewCount) {
      var columnDataGraph=[ 
        [
        "Site",
        "Average Rating",
        { role: "style" },
        {
          sourceColumn: 0,
          role: "annotation",
          type: "string",
          calc: "stringify",
        },
      ],
     
    ]

    var pieGraphData=[];
    if(AllAnalytics){
      
      AllAnalytics.map(a=>{
        var temp={
           value: a.total_reviews, label:a.connect_type 
        };
        var temp2=  [
          a.connect_type,
         a.avg_rating,
          "#085bff",
          null,
        ]
        pieGraphData.push(temp);
        columnDataGraph.push(temp2);
      })
    }
    console.log(pieGraphData)
      var pieData  = [
        { value: this.state.googleReviews.totalReviewCount, label:"Google" },
        { value:this.state.fbReviews, label:"Facebook" },
        { value: this.state.yelpDetails.review_count, label:"Yelp" },
        { value:  this.state.foursquareReviewCount == "-"
        ? 0
        : this.state.foursquareReviewCount, label: "Foursquare" },
        { value:this.state.appleReviewCount == "-" ? 0 : this.state.appleReviewCount, label:"Apple" },
        { value:this.state.citysearchReviewCount == "-"
               ? 0
               : this.state.citysearchReviewCount ,label:"Citysearch"},
        { value: this.state.hereReviews == "-" ? 0 : this.state.hereReviews, label:"Here" },
        { value: this.state.zillowReviews == "-" ? 0 : this.state.zillowReviews, label: "Zillow" },
        { value:this.state.tomtomReviews == "-" ? 0 : this.state.tomtomReviews, label:"Tomtom" },
        { value:  this.state.avvoReviews == "-" ? 0 : this.state.avvoReviews, label:"Avvo" },
        { value: this.state.zomatoReviews == "-" ? 0 : this.state.zomatoReviews, label: "Zomato" }
      ];
    // var pieData = [
    //   ["Site", "Total Reviews"],
    //   ["Google", this.state.googleReviews.totalReviewCount],
    //   ["Facebook", this.state.fbReviews],
    //   ["Yelp", this.state.yelpDetails.review_count],
    //   [
    //     "Foursquare",
    //     this.state.foursquareReviewCount == "-"
    //       ? 0
    //       : this.state.foursquareReviewCount,
    //   ]
    //   ,
    //   [
    //     "Apple",
    //     this.state.appleReviewCount == "-" ? 0 : this.state.appleReviewCount,
    //   ],
    //   [
    //     "Citysearch",
    //     this.state.citysearchReviewCount == "-"
    //       ? 0
    //       : this.state.citysearchReviewCount,
    //   ],
    //   ["Here", this.state.hereReviews == "-" ? 0 : this.state.hereReviews],
    //   [
    //     "Zillow",
    //     this.state.zillowReviews == "-" ? 0 : this.state.zillowReviews,
    //   ],
    //   [
    //     "Tomtom",
    //     this.state.tomtomReviews == "-" ? 0 : this.state.tomtomReviews,
    //   ],
    //   ["Avvo", this.state.avvoReviews == "-" ? 0 : this.state.avvoReviews],
    //   [
    //     "Zomato",
    //     this.state.zomatoReviews == "-" ? 0 : this.state.zomatoReviews,
    //   ],
    // ];
    // }

console.log('vc',pieData)


    var columnData = [
      [
        "Site",
        "Average Rating",
        { role: "style" },
        {
          sourceColumn: 0,
          role: "annotation",
          type: "string",
          calc: "stringify",
        },
      ],
      [
        "Google",
        this.state.googleReviews.averageRating  
          ? this.state.googleReviews.averageRating
          : 0,
        "#085bff",
        null,
      ],
      [
        "Facebook",
        this.state.fbAccounts[0] ? this.state.fb_average_rating : 0,
        "#085bff",
        null,
      ],
      [
        "Yelp",
        this.state.yelpDetails.rating ? this.state.yelpDetails.rating : 0,
        "#085bff",
        null,
      ],
      [
        "Apple",
        this.state.appleRating ? this.state.appleRating : 0,
        "#085bff",
        null,
      ],
      [
        "Citysearch",
        this.state.citysearchRating ? this.state.citysearchRating : 0,
        "#085bff",
        null,
      ],
      [
        "Foursquare",
        this.state.foursquareDetails.rating
          ? this.state.foursquareDetails.rating / 2
          : 0,
        "#085bff",
        null,
      ],
      [
        "Here",
        this.state.hereRating != "-" ? this.state.hereRating : 0,
        "#085bff",
        null,
      ],
      [
        "Zillow",
        this.state.zillowRating != "-" ? this.state.zillowRating : 0,
        "#085bff",
        null,
      ],
      [
        "Tomtom",
        this.state.tomtomRating != "-" ? this.state.tomtomRating : 0,
        "#085bff",
        null,
      ],
      [
        "Avvo",
        this.state.avvoRating != "-" ? this.state.avvoRating : 0,
        "#085bff",
        null,
      ],
      [
        "Zomato",
        this.state.zomatoRating != "-" ? this.state.zomatoRating : 0,
        "#085bff",
        null,
      ],
    ];
    var dataCol = [
      this.state.googleReviews.averageRating ? this.state.googleReviews.averageRating: 0
  ,
    this.state.fbAccounts0 ? this.state.fb_average_rating : 0
  ,
    this.state.yelpDetails.rating ? this.state.yelpDetails.rating : 0
  ,
    this.state.appleRating ? this.state.appleRating : 0
  ,
    this.state.citysearchRating ? this.state.citysearchRating : 0
  ,
    this.state.foursquareDetails.rating ? this.state.foursquareDetails.rating / 2: 0
  ,
    this.state.hereRating != "-" ? this.state.hereRating : 0
  ,
    this.state.zillowRating != "-" ? this.state.zillowRating : 0
  ,
    this.state.tomtomRating != "-" ? this.state.tomtomRating : 0
  ,
    this.state.avvoRating != "-" ? this.state.avvoRating : 0
  ,
    this.state.zomatoRating != "-" ? this.state.zomatoRating : 0
    ];
console.log("colcheck",columnData)
    return (
      <div>
        {/* <div className="content-page"> */}

        {this.state.loader ? (
          <div className="rightside_title">
            <h1>Review Analytics</h1>
            <Spinner />
          </div>
        ) : (
          <div className="main_content">
            <div className="rightside_title">
              <h1>Review Analytics</h1>
            </div>

            <MDBRow>
              <MDBCol md="8">
                
                {all_connections.length != 0 ? (
                  <div>
                    <div className="analytics_btnx">
                  Sitewise Distribution Of Ratings
                </div>
                  <div  className="whitechart">
                    {/* <Column_chart /> */}
                  {/* <ReactApexChart 
                  chartType="ColumnChart"
                  loader={<div>Loading Chart</div>}
                  options={{
                      // title: "Sitewise Distribution Of Ratings",
                      bar: { groupWidth: "40%" },
                      legend: {
                        show:false
                      },
                    }}
                    // For tests
                    rootProps={{ "data-testid": "6" }} 
                    series={dataCol} type="bar" height={300} /> */}
                
                  <Chart
                    className="whitechart"
                    height={"300px"}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={columnDataGraph}
                    options={{
                      // title: "Sitewise Distribution Of Ratings",
                      bar: { groupWidth: "40%" },
                      legend: {
                        position: "none",
                        textStyle: { color: "black", fontSize: 6 },
                      },
                    }}
                    // For tests
                    rootProps={{ "data-testid": "6" }}
                  />
                  </div>
                </div>
                ) : (
                  ""
                )}
              </MDBCol>

              <MDBCol md="4">
                
                {all_connections.length != 0 ? (
                  <div>
                  <div className="analytics_btnx">
                  Sitewise Distribution Reviews
                </div>
                  <div className="whitechart" style={{padding:'28px 45px'}}>
                    <DonutChart
                      legend={false}
                      height={250}
                      width={250}
                      loader={<div>Loading Chart</div>}
                      outerRadius={0.95}
                      innerRadius={0.6}
                      // clickToggle={false}
                      formatValues={(values, total) =>
                        `${parseInt((values / total) * 100)}%`
                      }
                      colors={["#8264C6", "#634A9B", "#EB05B8", "#3380cc","red","blue","green","orange"]}
                      strokeColor={"false"}
                      data={pieGraphData}
                      rootProps={{ "data-testid": "1" }}
                    />
                    {/* <Chart
                      height={"300px"}
                      chartType="PieChart"
                      loader={<div>Loading Chart</div>}
                      data={pieData}
                      options={{
                        // title: "Sitewise Distribution Reviews",
                        pieSliceText: "label",
                        legend: "none",
                        pieHole: 0.4,
                      }}
                      rootProps={{ "data-testid": "1" }}
                    /> */}
                  </div>
                  </div>
                   ) : (
                  ""
                )}
              </MDBCol>
            </MDBRow>
            <div className="row">
              <div className="col-md-8">
                {/* <img src={require('../images/pie-1.jpg')}/> */}

                {/* <Column_chart data={columnData} /> */}
              </div>
              <div className="col-md-4">
                {/* <img src={require('../images/pie.jpg')}/> */}
              </div>
            </div>

            {all_connections.length != 0 ? (
              <div>
                <div className=" mb-20">
                  <div className="antbox">
                    <div className="box-space row">
                      <div className="col-md-10 analytics_btnx">Analytics</div>
                      <div className="col-md-2  ">
                      <select className='review_select_btn ra_drop' onChange={this.fliterUpdate} >
                    
                              <option selected
                                value= "last week"
                              >
                                Last Week
                              </option>
                              <option
                              value = "last month"
                              >
                                Last Month
                              </option>

                              <option
                              value= "last 3 months"
                              >
                                Last 3 Month
                              </option>

                              <option
                              value= "last 6 months"
                              >
                                Last 6 Month
                              </option>
                              <option
                              value = "last year"
                              >
                                Last Year
                              </option>

                              <option
                              value = "all"
                              >
                                Lifetime
                              </option>
                         </select>
                        
                      </div>
                    </div>

                    <div className="total_ant">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="totl-listing">
                            <h3>Total Review</h3>
                            <div className="icon">
                              <div className="icon-comment">
                                <i className="zmdi zmdi-comment-outline"></i>
                              </div>
                            </div>
                            <div className="icon-text">
                              {TotalReview ? TotalReview : "0"}
                              <div className="dropdown parsent">
                                <a
                                  href="#"
                                  className="dropdown-toggle"
                                  data-toggle="dropdown"
                                >
                                  {/* 160% */}-
                                  {/* <span className="zmdi zmdi-caret-down"></span> */}
                                </a>
                                {/* <div className="dropdown-menu">
                            <ul>
                              <li>-</li>
                              <li>-</li>
                            </ul>
                          </div> */}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="totl-listing">
                            <h3>New Review</h3>
                            <div className="icon">
                              <div className="icon-comment">
                                <i className="zmdi zmdi-comments"></i>
                              </div>
                            </div>
                            <div className="icon-text">
                              {NewReview ? NewReview:0}
                              <div className="dropdown parsent">
                                <a
                                  href="#"
                                  className="dropdown-toggle"
                                  data-toggle="dropdown"
                                >
                                  {/* 160% */}-
                                  {/* <span className="zmdi zmdi-caret-down"></span> */}
                                </a>
                                {/* <div className="dropdown-menu">
                            <ul>
                              <li>-</li>
                              <li>-</li>
                            </ul>
                          </div> */}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="totl-listing">
                            <h3>Average Rating</h3>
                            <div className="icon">
                              <div className="icon-comment">
                                <i className="zmdi zmdi-trending-up"></i>
                              </div>
                            </div>
                            <div className="icon-text">
                              {AvgRating
                                ? AvgRating
                                : "0"}
                              <div className="dropdown parsent">
                                <a
                                  href="#"
                                  className="dropdown-toggle"
                                  data-toggle="dropdown"
                                >
                                  {/* 160% */}-
                                  {/* <span className="zmdi zmdi-caret-down"></span> */}
                                </a>
                                {/* <div className="dropdown-menu">
                            <ul>
                              <li>-</li>
                              <li>-</li>
                            </ul>
                          </div> */}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="totl-listing">
                            <h3>Review Response Rate</h3>
                            <div className="icon">
                              <div className="icon-comment">
                                <i className="zmdi zmdi-share"></i>
                              </div>
                            </div>
                            <div className="icon-text">
                              {/* 84 */} {ReviewResponseRate?ReviewResponseRate:0}
                              <div className="dropdown parsent">
                                <a
                                  href="#"
                                  className="dropdown-toggle"
                                  data-toggle="dropdown"
                                >
                                  {/* 160% */}-
                                  {/* <span className="zmdi zmdi-caret-down"></span> */}
                                </a>
                                {/* <div className="dropdown-menu">
                            <ul>
                              <li>-</li>
                              <li>-</li>
                            </ul>
                          </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className=" mb-30">
                  <div className="analytics-whice">
                    <div className="box-space2"> */}
                    <div style={{margin:'30px 0px'}}>
                    <MaterialTable 
                    
      columns={[
        {
          title: 'Review Sites (5)', field: 'connect_type',
          cellStyle: {
            backgroundColor: '#E4F2FF',
            border:'none',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '16px',
            color: '#000000',
            opacity: '0.6',
           
          }
        },
        { title: 'Avg. Rating', field: 'avg_rating' },
        { title: 'Total Reviews', field: 'total_reviews' },
        { title: 'New Reviews', field: 'new_reviews'},
        { title: 'Recency', field: 'rencency' },
        { title: 'Base Rating', field: 'base_rating' },
      ]}
      data={AllAnalytics}
        
        
      //   [
      //   { review_sites: 'Consolidated',
      //    avg_rating: overAllRating != 0? (overAllRating.toString().slice(0, 4) + " " + " "+ 66): "-", 
      //    total_reviews: overAllReviewCount ? overAllReviewCount : "-", 
      //    new_reviews: total_new_reviews == 0 ? "-" : total_new_reviews ,
      //     rencency:1 + "  " +'day',
      //     base_rating:'nmb jhg'},
      //   { review_sites: 'Google',
      //    avg_rating: this.state.googleReviews.averageRating? this.state.googleReviews.averageRating: "-", 
      //     total_reviews: this.state.googleReviews.totalReviewCount ? this.state.googleReviews.totalReviewCount : "-",
      //     total_reviews_percentage:this.state.googleReviews.totalReviewCount? this.state.googleReviews.totalReviewCount: "-",
      //      new_reviews: this.state.google_new_reviews ,
      //      rencency:1 + 'hkgh',
      //      base_rating:'nmb jhg'},
      //   { review_sites: 'Facebook',
      //    avg_rating: this.state.fbAccounts[0]? this.state.fb_average_rating: "-",
      //     total_reviews:this.state.fbReviews? this.state.fbReviews : "-", 
      //     new_reviews: this.state.fb_new_reviews ,
      //     rencency:1 + 'hkgh',
      //     base_rating:'nmb jhg'},
        
       
      // ]}
      options={{
        disableGutters:true,
        varient:false,
        search:false,
        paging:false,
        sorting:true,
        showTitle:false,
        headerStyle: {
          backgroundColor: '#73B6E5',
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '14px',
          lineHeight: '16px',
          textAlign:'center',
          color: '#ffffff',
        },
        cellStyle: {
          fontFamily: 'Roboto',
fontStyle: 'normal',
fontWeight: '500',
fontSize: '14px',
lineHeight: '16px',
border:'none',
color: '#000000',
textAlign:'center',
opacity: '0.6',
        }
      }}
    />
      </div>               
                    {/* </div>
                  </div>
                </div> */}
              </div>
            ) : (
              <div className=" mt-30">
                
                    <h4 className='connect_msg'>Connect Some Listings To See Review Analytics</h4>
                
              </div>
            )}
          </div>
        )}

        {/* </div> */}
      </div>
    );
  }
}
