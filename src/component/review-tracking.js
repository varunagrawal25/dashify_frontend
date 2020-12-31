import React, { Component } from "react";
import Axios from "axios";
import { all_connection_of_one_location } from "./apis/social_platforms";
import {overall_rating_review} from "./apis/review";
import { location_by_id,business_categories,business_states } from "./apis/location";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import LinearProgress from '@material-ui/core/LinearProgress';
import Spinner from "./common/Spinner";
import { breakStatement } from "@babel/types";
import star_img from './assets/star.png'
import review_img1 from './assets/review_img1.png'
import review_img2 from './assets/review_img2.png'
import clock from './assets/clock.png'
import rev_track_twitter from './assets/rev_track_twitter.png'
import rev_track_fb from './assets/rev_track_fb.png'
import rev_track_snap from './assets/rev_track_snap.png'
import rev_track_insta from './assets/rev_track_insta.png'
import yelp from '../images/yelp.png'
import google from '../images/google2.png'
import foursquare from '../images/foursquare222.png'
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
import { MDBCol, MDBContainer ,MDBRow} from "mdbreact";
// import { display } from "html2canvas/dist/types/css/property-descriptors/display";
import { secure_pin } from "../config";

const BorderLinearProgress5 = withStyles((theme) => ({
  root: {
    marginTop:4,
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#00C27A',
  },
}))(LinearProgress);

const BorderLinearProgress4 = withStyles((theme) => ({
  root: {
    marginTop:4,
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#2F80ED',
  },
}))(LinearProgress);

const BorderLinearProgress3 = withStyles((theme) => ({
  root: {
    marginTop:4,
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#56CCF2',
  },
}))(LinearProgress);

const BorderLinearProgress2 = withStyles((theme) => ({
  root: {
    marginTop:4,
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#FCDE00',
  },
}))(LinearProgress);

const BorderLinearProgress1 = withStyles((theme) => ({
  root: {
    marginTop:4,
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#EB0558',
  },
}))(LinearProgress);
const Yelpconfig = {
  headers: {
    Authorization:
      "bearer _1cVnrrkqmG_dwNUdtorVxarkzItJM7AWM700rkRxM7aPdDfxJECcdaN00ADjSkrStF1pX4sdGCspYeSjU7VGkpjWYoMsC2_filBf5d5J5GMRTgXws_W6qusNMhYX3Yx",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost"
  }
};

const Zomatoconfig = {
  headers: {
    "user-key": "0850988704eeed5da2f4d38fdfc582c1",
    Accept: "application/json"
  }
};

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

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

export default class ReviewTracking extends Component {
  state = {
    fbAccounts: [],



    AvgRating:0,
            TotalReviews:0,
            RatingTotalReviews:0,
            FiveStar:0,
            FourStar:0,
            ThreeStar:0,
            TwoStar:0,
            OneStar:0,
            HelpfulReview:'',

    fbReviews: [],
    fb_overallrating: 0,
    zillowAvgRating: "",
    tomtomAvgRating: "",
    avvoAvgRating: "",
    zomatoAvgRating: "",

    fbToken: "",
    yelpReviews: [],
    yelpDetails: [],
    googleReviews: [],
    foursquareReviews: [],
    appleReviews: [],
    citysearchReviews: [],
    zillowReviews: [],
    tomtomReviews: [],
    avvoReviews: [],
    zomatoReviews: [],
    instaComments: [],
    foursquareDetails: [],
    appleDetails: [],
    citysearchDetails: [],
    zillowDetails: [],
    tomtomDetails: [],
    avvoDetails: [],
    zomatoDetails: [],
    foursquareReviewCount: 0,
    appleReviewCount: 0,
    citysearchReviewCount: 0,
    zillowReviewCount: 0,
    tomtomReviewCount: 0,
    avvoReviewCount: 0,
    zomatoReviewCount: 0,
    apple_star_sum: 0,
    citysearch_star_sum: 0,
    star_5: 0,
    star_4: 0,
    star_3: 0,
    star_2: 0,
    star_1: 0,
    most_helpful_review: "",
    loader: true,

    name: "",
    address: "",
    phone: "",
    city: "",
    postalCode: "",
    category: "",
    state: "",
    today: "",

    active_listing: [],
    pdf_data1: [],
    pdf_data2: []
  };

  componentDidMount = () => {
    var yelpUrl,
      instaUrl,
      fourUrl,
      appleUrl,
      citysearchUrl,
      zillowUrl,
      tomtomUrl,
      avvoUrl,
      avvoToken,
      zomatoUrl,
      fbtoken,
      fbPageId,
      googleToken,
      googleData;

    let { active_listing } = this.state;

    var today = new Date();
    today =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    this.setState({ today });

    const data = {
      "secure_pin":"digimonk","user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId")
    };


    // Axios.post(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/locations/get-all-connection-of-one-location",
    //   data,
    //   DjangoConfig
    // )
    all_connection_of_one_location(data, DjangoConfig).then(response => {
        console.log(response);

        // response.data.social_media_list.map(l => {
        //   if (l.connect_type == "Facebook") {
        //     fbtoken = l.Social_Platform.Token;
        //     console.log(fbtoken);
        //     fbPageId = l.Social_Platform.Other_info;
        //   }

        //   if (l.connect_type == "Google") {
        //     console.log("yes goo");
        //     googleToken = l.Social_Platform.Token;
        //     googleData = l;
        //     console.log(googleToken);
        //   }

        //   if (l.connect_type == "Foursquare") {
        //     console.log("yes four");
        //     console.log("foursquare platform", l.Social_Platform.Other_info);

        //     fourUrl = l.Social_Platform.Other_info.split(",")[0]
        //       .slice(7)
        //       .split("/")[5];
        //   }

        //   if (l.connect_type == "Instagram") {
        //     console.log("yes instagram");
        //     console.log(
        //       "instagram id",
        //       l.Social_Platform.Other_info.split(",")[0].slice(7)
        //     );
        //     instaUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);
        //   }

        //   if (l.connect_type == "Yelp") {
        //     console.log("yes yelp");
        //     console.log(l.Social_Platform.Other_info.split(",")[0].slice(7));
        //     yelpUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);
        //   }

        //   if (l.connect_type == "Apple") {
        //     console.log("yes apple");
        //     console.log(
        //       "apple platform",
        //       l.Social_Platform.Other_info.split(",")[0]
        //         .slice(7)
        //         .split("/")[6]
        //         .slice(2)
        //     );

        //     appleUrl = l.Social_Platform.Other_info.split(",")[0]
        //       .slice(7)
        //       .split("/")[6]
        //       .slice(2);
        //   }

        //   if (l.connect_type== "Citysearch") {
        //     console.log("yes Citysearch");
        //     console.log("Citysearch platform", l.Social_Platform.Other_info);

        //     citysearchUrl = l.Social_Platform.Other_info.split(",")[0]
        //       .slice(7)
        //       .split("/")[4];
        //   }

        //   if (l.connect_type == "Zillow") {
        //     console.log("yes Zillow");
        //     console.log("Zillow platform", l.Social_Platform.Other_info);

        //     zillowUrl = l.Social_Platform.Other_info;
        //   }

        //   if (l.connect_type == "Tomtom") {
        //     console.log("yes Tomtom");
        //     console.log("Tomtom platform", l.Social_Platform.Other_info);

        //     tomtomUrl = l.Social_Platform.Other_info;
        //   }

        //   if (l.connect_type == "Avvo") {
        //     console.log("yes Avvo");
        //     console.log("Avvo platform", l.Social_Platform.Other_info);

        //     avvoUrl = l.Social_Platform.Other_info;
        //     avvoToken = l.Social_Platform.Token;
        //   }

        //   if (l.connect_type == "Zomato") {
        //     console.log("yes Zomato");
        //     console.log("Zomato platform", l.Social_Platform.Other_info);

        //     zomatoUrl = l.Social_Platform.Other_info;
        //   }
        // });
        const data2={
          "secure_pin":"digimonk","user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId"),

          "filter_type":"last week"
        }
        console.log(data2,"data2")

        Axios.post(
          "https://digimonk.net/dashify-ci/admin/socialmedia_api/get_all_reviews_by_locationid",
          data2
        ).then(resp => {
          console.log("digi",resp);
          this.setState({AllReviews:resp.data.reviews_array});
        })
        .catch(res=>{

        });


        const data3={
          "secure_pin":"digimonk","user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId"),
         "type":"all","filter_type":"last week"
        }

        overall_rating_review(data3).then(response => {
          console.log("over",response);

          this.setState({
            AvgRating:response.data.overall_rating_array[0].Average_rating,
            TotalReviews:response.data.overall_rating_array[0].Total_reviews,
            RatingTotalReviews:response.data.rating_breakdown_array[0].Total_reviews,
            FiveStar:response.data.rating_breakdown_array[0].five_star,
            FourStar:response.data.rating_breakdown_array[0].four_star,
            ThreeStar:response.data.rating_breakdown_array[0].three_star,
            TwoStar:response.data.rating_breakdown_array[0].two_star,
            OneStar:response.data.rating_breakdown_array[0].one_star,
            HelpfulReview:response.data.most_helpful_reviews[0]
          })

        })
        .catch(res=>{
          
        });

  

        const GoogleConfig = {
          headers: { Authorization: "Bearer " + googleToken }
        };

        // for facebook
        // if (fbtoken) {
        //   Axios.get(
        //     "https://graph.facebook.com/me/accounts?fields=access_token,id,name,overall_star_rating,category,category_list,tasks&access_token=" +
        //       fbtoken
        //   ).then(res => {
        //     console.log("facebook data", res.data);
            
        //     if(res.data.data){
        //       var fbPageAccessToken;
        //       this.setState({ fbAccounts: res.data.data });
        //     for (let i = 0; i < res.data.data.length; i++) {
        //       if (res.data.data[i].id == fbPageId) {
        //         fbPageAccessToken = res.data.data[i].access_token;
        //       }
        //     }
        //     Axios.get(
        //       "https://graph.facebook.com/" +
        //         fbPageId +
        //         "/ratings?fields=has_rating,review_text,created_time,has_review,rating,recommendation_type&access_token=" +
        //         fbPageAccessToken
        //     ).then(res => {
        //       console.log("fb page data", res.data);
        //       if(res.data.data){
                
        //       this.setState({
        //         fbReviews: res.data.data,
        //         active_listing: [...this.state.active_listing, "Facebook"]
        //       });
        //       this.fb_star_counting(res.data.data);

        //       if (this.state.fbReviews.length != 0) {
        //         this.setState({
        //           pdf_data1: [
        //             ...this.state.pdf_data1,
        //             {
        //               name: "Facebook",
        //               image: require("../images/facebook.png"),
        //               data: this.state.fbReviews
        //             }
        //           ]
        //         });
        //       }
        //       }
        //     });
        //     }
        //   });
        // }

        // //for yelp
        // if (yelpUrl) {
        //   Axios.get(
        //     "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
        //       yelpUrl.slice(25) +
        //       "/reviews",
        //     Yelpconfig
        //   ).then(resp => {
        //     console.log("yelp reviews",resp.data.reviews);
        //     if(resp.data.reviews){
        //       this.setState({
        //         yelpReviews: resp.data.reviews, 
        //         active_listing: [...this.state.active_listing, "Yelp"]
        //       });
        //       this.yelp_star_counting(resp.data.reviews);
  
        //       if (this.state.yelpReviews.length != 0) {
        //         this.setState({
        //           pdf_data1: [
        //             ...this.state.pdf_data1,
        //             {
        //               name: "Yelp",
        //               image: require("../images/yelp.png"),
        //               data: this.state.yelpReviews
        //             }
        //           ]
        //         });
        //       }
        //     } else {
        //       this.setState({
        //         active_listing: [...this.state.active_listing, "Yelp"]
        //       });
        //     }
        //   });

        //   Axios.get(
        //     "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
        //       yelpUrl.slice(25),
        //     Yelpconfig
        //   ).then(resp => {
        //     console.log("yelp data",resp.data);
        //     this.setState({ yelpDetails: resp.data });
        //     if (resp.data.rating) {
        //       this.setState({
        //         pdf_data2: [
        //           ...this.state.pdf_data2,
        //           {
        //             name: "Yelp",
        //             image: require("../images/yelp.png"),
        //             data: resp.data.rating
        //           }
        //         ]
        //       });
        //     }
        //   });
        // }
        // // for google

        // if (googleToken) {
        //   Axios.get(
        //     "https://mybusiness.googleapis.com/v4/accounts/",
        //     GoogleConfig
        //   ).then(res => {
        //     console.log("google account data",res.data);

        //     if(res.data.accounts[0]){
        //   //     Axios.get(
        //   //       "https://mybusiness.googleapis.com/v4/" +
        //   //       res.data.accounts[0].name +
        //   //         "/locations",
        //   //       GoogleConfig
        //   //     ).then(resp => {
        //   //       console.log("google location data",resp.data);
  
        //   //       if(resp.data.locations[0]){
        //           Axios.get(`https://mybusiness.googleapis.com/v4/${googleData.Social_Platform.Other_info}/reviews`,
        //             GoogleConfig
        //           ).then(respo => {
        //             console.log("google reviews", respo.data);
                    
        //             if(respo.data){
        //               this.setState({
        //                 active_listing: [...this.state.active_listing, "Google"],
        //                 googleReviews: respo.data
        //               });
        //               if (respo.data.averageRating) {
        //                 this.setState({
        //                   pdf_data2: [
        //                     ...this.state.pdf_data2,
        //                     {
        //                       name: "Google",
        //                       image: require("../images/google.png"),
        //                       data: respo.data.averageRating
        //                     }
        //                   ]
        //                 });
        //               }
      
        //                 if (
        //                   this.state.googleReviews && this.state.googleReviews.reviews &&
        //                   this.state.googleReviews.reviews.length != 0
        //                 ) {
        //                   this.setState({
        //                     pdf_data1: [
        //                       ...this.state.pdf_data1,
        //                       {
        //                         name: "Google",
        //                         image: require("../images/google.png"),
        //                         data: this.state.googleReviews.reviews
        //                       }
        //                     ]
        //                   });
        //                 }
               
        //               this.google_star_counting(respo.data);
        //             } else {
        //               this.setState({
        //                 active_listing: [...this.state.active_listing, "Google"]
        //               });
        //             }
        //           });
        //   //       }
        //   //     });
        //     }
        //   });
        // }

        // // For foursquare

        // if (fourUrl) {
        //   Axios.get(
        //     "https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v2/venues/" +
        //       fourUrl +
        //       "?client_id=44RU2431YG02H4E00RQTLKEUKIKINQSFO2JBHII2WHH32PXZ&client_secret=FWV2WOL40MQ5M1YZ5E2TKUWIQ4WYZ1QUJXOQ24VGRSXFA3IY&v=20180323"
        //   ).then(res => {
        //     console.log("foursquare data",res.data);
        //     this.setState({
        //       foursquareReviews: res.data.response.venue.tips.groups[0]?res.data.response.venue.tips.groups[0].items:[],
        //       foursquareDetails: res.data.response.venue,
        //       foursquareReviewCount: res.data.response.venue.tips.count,
        //       active_listing: [...this.state.active_listing, "Foursquare"]
        //     });

        //     if (res.data.response.venue.rating) {
        //       this.setState({
        //         pdf_data2: [
        //           ...this.state.pdf_data2,
        //           {
        //             name: "Foursquare",
        //             image: require("../images/foursquare.png"),
        //             data: res.data.response.venue.rating
        //           }
        //         ]
        //       });
        //     }

        //     if (this.state.foursquareReviews.length != 0) {
        //       this.setState({
        //         pdf_data1: [
        //           ...this.state.pdf_data1,
        //           {
        //             name: "Foursquare",
        //             image: require("../images/foursquare.png"),
        //             data: this.state.foursquareReviews
        //           }
        //         ]
        //       });
        //     }

        //     this.foursquare_star_counting(
        //       res.data.response.venue.rating,
        //       res.data.response.venue.tips.count
        //     );
        //   });
        // }

        // // instagram

        // if (instaUrl) {
        //   Axios.get("https://www.instagram.com/" + instaUrl + "/?__a=1").then(
        //     res => {
        //       console.log("instagram data in json", res.data);
        //       // console.log(
        //       //   "instagram data in json",
        //       //   res.data.graphql.user.edge_owner_to_timeline_media.edges[0].node
        //       //     .shortcode
        //       // );

        //       res.data.graphql.user.edge_owner_to_timeline_media.edges.map(
        //         (post, i) => {
        //           Axios.get(
        //             "https://www.instagram.com/p/" +
        //               post.node.shortcode +
        //               "/?__a=1"
        //           ).then(resp => {
        //             console.log(
        //               "instagram comment in json",
        //               resp.data.graphql.shortcode_media
        //                 .edge_media_to_parent_comment
        //             );
        //             // console.log(
        //             //   "instagram comment in json",
        //             //   resp.data.graphql.shortcode_media
        //             //     .edge_media_to_parent_comment.edges[0].node.text
        //             // );

        //             let a =
        //               resp.data.graphql.shortcode_media
        //                 .edge_media_to_parent_comment.edges;

        //             for (let i = 0; i < a.length; i++) {
        //               if (i < 6) {
        //                 this.setState({
        //                   instaComments: [
        //                     ...this.state.instaComments,
        //                     a[i].node
        //                   ],
        //                   active_listing: [
        //                     ...this.state.active_listing,
        //                     "Instagram"
        //                   ]
        //                 });
        //               } else {
        //                 break;
        //               }
        //             }
        //           });
        //         }
        //       );
        //     }
        //   );
        // }

        // if (appleUrl) {
        //   Axios.get(
        //     "https://itunes.apple.com/in/rss/customerreviews/id=" +
        //       appleUrl +
        //       "/sortBy=mostRecent/json"
        //   ).then(res => {
        //     console.log("apple data in json", res.data.feed.entry);

        //     if(res.data.feed.entry){
        //       this.setState({
        //         appleReviews: res.data.feed.entry,
        //         appleDetails: res,
        //         appleReviewCount: res.data.feed.entry.length,
        //         active_listing: [...this.state.active_listing, "Apple"]
        //       });
        //       this.apple_star_counting(res.data.feed.entry);
  
        //       if (this.state.appleReviews.length != 0) {
        //         this.setState({
        //           pdf_data1: [
        //             ...this.state.pdf_data1,
        //             {
        //               name: "Apple",
        //               image: require("../images/apple.png"),
        //               data: this.state.appleReviews
        //             }
        //           ]
        //         });
        //       }
        //     }
        //   });
        // }

        // if (zillowUrl) {
        //   Axios.get(
        //     "https://www.zillow.com/webservice/ProReviews.htm?zws-id=X1-ZWz170sf100mbv_7lwvq&email=" +
        //       zillowUrl +
        //       "&count=10&output=json"
        //   ).then(res => {
        //     console.log("zillow data in json", res.data);

        //     if(res.data.response.results){
        //       this.setState({
        //         zillowReviews: res.data.response.results.proReviews.review,
        //         zillowDetails: res.data,
        //         zillowReviewCount: parseInt(
        //           res.data.response.results.proInfo.reviewCount
        //         ),
        //         zillowAvgRating: parseFloat(
        //           res.data.response.results.proInfo.avgRating
        //         ),
        //         active_listing: [...this.state.active_listing, "Zillow"]
        //       });
  
        //       if (res.data.response.results.proInfo.avgRating) {
        //         this.setState({
        //           pdf_data2: [
        //             ...this.state.pdf_data2,
        //             {
        //               name: "Zillow",
        //               image: require("../images/zillow.png"),
        //               data: parseFloat(
        //                 res.data.response.results.proInfo.avgRating
        //               )
        //             }
        //           ]
        //         });
        //       }
  
        //       if (this.state.zillowReviews.length != 0) {
        //         this.setState({
        //           pdf_data1: [
        //             ...this.state.pdf_data1,
        //             {
        //               name: "Zillow",
        //               image: require("../images/zillow.png"),
        //               data: this.state.zillowReviews
        //             }
        //           ]
        //         });
        //       }
        //     }
        //   });
        // }

        // if (tomtomUrl && tomtomUrl != "-") {
        //   Axios.get(
        //     "https://api.tomtom.com/search/2/poiDetails.json?key=IRUplE1TqUPstrlMA2N51xASusnsDsEd&id=" +
        //       tomtomUrl
        //   ).then(res => {
        //     console.log("tomtom data in json", res.data);

        //     if(res.data.result){
        //       this.setState({
        //         tomtomReviews: res.data.result.reviews,
        //         tomtomDetails: res.data,
        //         tomtomReviewCount: res.data.result.rating
        //           ? parseInt(res.data.result.rating.totalRatings)
        //           : 0,
        //         tomtomAvgRating: res.data.result.rating
        //           ? parseFloat(res.data.result.rating.value) / 2
        //           : res.data.result.rating,
        //         active_listing: [...this.state.active_listing, "Tomtom"]
        //       });
  
        //       if (this.state.tomtomAvgRating) {
        //         this.setState({
        //           pdf_data2: [
        //             ...this.state.pdf_data2,
        //             {
        //               name: "Tomtom",
        //               image: require("../images/tomtom.png"),
        //               data: this.state.tomtomAvgRating
        //             }
        //           ]
        //         });
        //       }
  
        //       if (
        //         this.state.tomtomReviews &&
        //         this.state.tomtomReviews.length != 0
        //       ) {
        //         this.setState({
        //           pdf_data1: [
        //             ...this.state.pdf_data1,
        //             {
        //               name: "Tomtom",
        //               image: require("../images/tomtom.png"),
        //               data: this.state.tomtomReviews
        //             }
        //           ]
        //         });
        //       }
        //     }
        //   });
        // }

        // if (avvoUrl && avvoToken) {
        //   const AvvoConfig = {
        //     headers: {
        //       Authorization: "Bearer " + avvoToken
        //     }
        //   };
        //   Axios.get(
        //     "https://cors-anywhere.herokuapp.com/https://api.avvo.com/api/4/lawyers.json?id[]=" +
        //       avvoUrl,
        //     AvvoConfig
        //   ).then(res => {
        //     console.log("avvo lawyer data in json", res.data);

        //     if(res.data.lawyers[0]){
        //       this.setState({
        //         avvoDetails: res.data.lawyers[0],
        //         avvoReviewCount: parseInt(
        //           res.data.lawyers[0].client_review_count
        //         ),
        //         avvoAvgRating: parseFloat(res.data.lawyers[0].client_review_score)
        //       });
  
        //       if (this.state.avvoAvgRating) {
        //         this.setState({
        //           pdf_data2: [
        //             ...this.state.pdf_data2,
        //             {
        //               name: "Avvo",
        //               image: require("../images/avvo.png"),
        //               data: this.state.avvoAvgRating
        //             }
        //           ]
        //         });
        //       }
        //     }
        //   });
        //   Axios.get(
        //     "https://cors-anywhere.herokuapp.com/https://api.avvo.com/api/4/reviews.json?lawyer_id[]=" +
        //       avvoUrl +
        //       "&per_page=50",
        //     AvvoConfig
        //   ).then(res => {
        //     console.log("avvo reviews data in json", res.data);
        //     if(res.data.reviews){
        //       this.setState({
        //         avvoReviews: res.data.reviews,
        //         active_listing: [...this.state.active_listing, "Avvo"]
        //       });
  
        //       if (this.state.avvoReviews.length != 0) {
        //         this.setState({
        //           pdf_data1: [
        //             ...this.state.pdf_data1,
        //             {
        //               name: "Avvo",
        //               image: require("../images/avvo.png"),
        //               data: this.state.avvoReviews
        //             }
        //           ]
        //         });
        //       }
        //     }
        //   });
        // }

        // if (zomatoUrl) {
        //   Axios.get(
        //     "https://developers.zomato.com/api/v2.1/restaurant?res_id=" +
        //       zomatoUrl,
        //     Zomatoconfig
        //   ).then(res => {
        //     console.log("zomato data in json", res.data);

        //     this.setState({
        //       zomatoDetails: res.data,
        //       zomatoReviewCount: parseInt(res.data.all_reviews_count),
        //       zomatoAvgRating: parseFloat(res.data.user_rating.aggregate_rating)
        //     });

        //     if (this.state.zomatoAvgRating) {
        //       this.setState({
        //         pdf_data2: [
        //           ...this.state.pdf_data2,
        //           {
        //             name: "Zomato",
        //             image: require("../images/zomato.png"),
        //             data: this.state.zomatoAvgRating
        //           }
        //         ]
        //       });
        //     }
        //   });

        //   Axios.get(
        //     "https://developers.zomato.com/api/v2.1/reviews?res_id=" +
        //       zomatoUrl,
        //     Zomatoconfig
        //   ).then(res => {
        //     console.log("zomato reviews in json", res.data);

        //     if(res.data.user_reviews){
        //       this.setState({
        //         zomatoReviews: res.data.user_reviews,
        //         active_listing: [...this.state.active_listing, "Zomato"]
        //       });
  
        //       if (this.state.zomatoReviews.length != 0) {
        //         this.setState({
        //           pdf_data1: [
        //             ...this.state.pdf_data1,
        //             {
        //               name: "Zomato",
        //               image: require("../images/zomato.png"),
        //               data: this.state.zomatoReviews
        //             }
        //           ]
        //         });
        //       }
        //     } else {
        //       this.setState({
        //         active_listing: [...this.state.active_listing, "Zomato"]
        //       });
        //     }
        //   });
        // }

        // if (citysearchUrl) {
        //   Axios.get(
        //     "https://cors-anywhere.herokuapp.com/https://api.citygridmedia.com/content/reviews/v2/search/where?listing_id=" +
        //       citysearchUrl +
        //       "&publisher=test"
        //   ).then(res => {
        //     console.log("citysearchUrl response", res);

        //     var XMLParser = require("react-xml-parser");
        //     var xml = new XMLParser().parseFromString(res.data); // Assume xmlText contains the example XML

        //     if(xml.getElementsByTagName("review")){
              
        //     this.setState({
        //       citysearchReviews: xml.getElementsByTagName("review"),
        //       citysearchDetails: xml,
        //       citysearchReviewCount: xml.getElementsByTagName("review").length,
        //       active_listing: [...this.state.active_listing, "Citysearch"]
        //     });

        //     if (this.state.citysearchReviews.length != 0) {
        //       this.setState({
        //         pdf_data1: [
        //           ...this.state.pdf_data1,
        //           {
        //             name: "Citysearch",
        //             image: require("../images/citysearch.jpg"),
        //             data: this.state.citysearchReviews
        //           }
        //         ]
        //       });
        //     }

        //     this.citysearch_star_counting(xml.getElementsByTagName("review"));
        //     } else {
        //       this.setState({
        //         citysearchDetails: xml,
        //         active_listing: [...this.state.active_listing, "Citysearch"]
        //       });
        //     }
        //   });
        // }
        this.setState({ loader: false });
      })
      .catch(res => {
        console.log("error in review tracking", res);
        this.setState({ loader: false });
      });

    // getting business address
    // Axios.post(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/locations/get-location-by-id",
    //   data,
    //   DjangoConfig
    // )
    const data1={secure_pin,countryid:"1"}
    location_by_id(data).then(resp => {

      business_states(data1).then(resp1 => {
        resp1.data.all_states.map((s, i) =>
        s.id == resp.data.location_details[0].state
            ? this.setState({ state: s.name })
            : ""
        );
      });

      business_categories(data).then(resp1 => {
        resp1.data.bussiness_category_array.map((b, i) =>
          b.id == resp.data.location_details[0].bussiness_cate
            ? this.setState({ category: b.name })
            : ""
        );
      });
    // location_by_id(data, DjangoConfig).then(resp => {
    //   // this.setState({ state: "Loading....", category: "Loading...." });
    //   // Axios.get(
    //   //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/dropdown-values/states",
    //   //   DjangoConfig
    //   // )
    //   business_states(DjangoConfig).then(resp1 => {
    //     resp1.data.status.map((s, i) =>
    //       s.id == resp.data.location.State
    //         ? this.setState({ state: s.State_name })
    //         : ""
    //     );
    //   });

    //   // Axios.get(
    //   //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/dropdown-values/business-categoryes",
    //   //   DjangoConfig
    //   // )
    //   business_categories(data).then(resp1 => {
    //     resp1.data.BusinessCategory.map((b, i) =>
    //       b.id == resp.data.location.Business_category
    //         ? this.setState({ category: b.Category_Name })
    //         : ""
    //     );
    //   });

      this.setState({
        name: resp.data.location_details[0].location_name,

        address: resp.data.location_details[0].address1,
        phone: resp.data.location_details[0].phone_no,
        city: resp.data.location_details[0].city,
        postalCode: resp.data.location_details[0].zipcode
      });
    });
  };

  google_star_counting = data => {
    data.reviews &&
      data.reviews.map(res =>
        res.starRating == "FIVE"
          ? this.setState({ star_5: this.state.star_5 + 1 })
          : res.starRating == "FOUR"
          ? this.setState({ star_4: this.state.star_4 + 1 })
          : res.starRating == "THREE"
          ? this.setState({ star_3: this.state.star_3 + 1 })
          : res.starRating == "TWO"
          ? this.setState({ star_2: this.state.star_2 + 1 })
          : res.starRating == "ONE"
          ? this.setState({ star_1: this.state.star_1 + 1 })
          : ""
      );
  };

  yelp_star_counting = data => {
    data.map(res =>
      res.rating == 5
        ? this.setState({ star_5: this.state.star_5 + 1 })
        : res.rating == 4
        ? this.setState({ star_4: this.state.star_4 + 1 })
        : res.rating == 3
        ? this.setState({ star_3: this.state.star_3 + 1 })
        : res.rating == 2
        ? this.setState({ star_2: this.state.star_2 + 1 })
        : res.rating == 1
        ? this.setState({ star_1: this.state.star_1 + 1 })
        : ""
    );
  };

  apple_star_counting = data => {
    data.map(res =>
      res["im:rating"].label == "5"
        ? this.setState({ star_5: this.state.star_5 + 1 })
        : res["im:rating"].label == "4"
        ? this.setState({ star_4: this.state.star_4 + 1 })
        : res["im:rating"].label == "3"
        ? this.setState({ star_3: this.state.star_3 + 1 })
        : res["im:rating"].label == "2"
        ? this.setState({ star_2: this.state.star_2 + 1 })
        : res["im:rating"].label == "1"
        ? this.setState({ star_1: this.state.star_1 + 1 })
        : ""
    );
    data.map(res =>
      this.setState({
        apple_star_sum:
          parseInt(res["im:rating"].label) + this.state.apple_star_sum
      })
    );

    if (this.state.appleReviewCount) {
      this.setState({
        pdf_data2: [
          ...this.state.pdf_data2,
          {
            name: "Apple",
            image: require("../images/apple.png"),
            // data: apple_star_sum / appleReviewCount
            data: this.state.apple_star_sum / this.state.appleReviewCount
          }
        ]
      });
    }
  };

  citysearch_star_counting = data => {
    var rating;
    data.map(
      res =>
        (rating =
          Math.round(res.children[5].value / 2) == "5"
            ? this.setState({ star_5: this.state.star_5 + 1 })
            : rating == "4"
            ? this.setState({ star_4: this.state.star_4 + 1 })
            : rating == "3"
            ? this.setState({ star_3: this.state.star_3 + 1 })
            : rating == "2"
            ? this.setState({ star_2: this.state.star_2 + 1 })
            : rating == "1"
            ? this.setState({ star_1: this.state.star_1 + 1 })
            : "")
    );

    data.map(res =>
      this.setState({
        citysearch_star_sum:
          Math.round(res.children[5].value / 2) + this.state.citysearch_star_sum
      })
    );

    if (this.state.citysearchReviewCount) {
      this.setState({
        pdf_data2: [
          ...this.state.pdf_data2,
          {
            name: "Citysearch",
            image: require("../images/citysearch.jpg"),
            data:
              this.state.citysearch_star_sum / this.state.citysearchReviewCount
          }
        ]
      });
    }
  };

  Quixote = (pdf_data1, pdf_data2) => (
    <Document>
      {console.log("pdf data1", pdf_data1)}
      {console.log("pdf data2", pdf_data2)}
      <Page style={styles.body} wrap>
        <Text style={styles.title}>LISTINGS REVIEW REPORT</Text>
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
        {pdf_data2.map((data, i) =>
          data.name == "Overallrating" ? (
            <View>
              <Text style={styles.subtitle}>
                Over All Rating : {data.data}/5
              </Text>
            </View>
          ) : (
            <View>
              <Image style={styles.image2} src={data.image} />
              <Text style={styles.subtitle}>Rating : {data.data}</Text>
            </View>
          )
        )}

        {/* {pdf_data2.map((data, i) =>

            <View>
              <Image style={styles.image2} src={data.image} />
              <Text style={styles.subtitle}>Name : {data.name}</Text>
              <Text style={styles.subtitle}>Rating : {data.data}</Text>
            </View>
                    )} */}

        <View>
          <Text style={styles.subtitle}>ALL REVIEWS</Text>
        </View>
        {pdf_data1.map((data1, i) =>
          data1.name == "Yelp" ? (
            <View>
              <Image style={styles.image2} src={data1.image} />
              {data1.data.map((data2, j) => (
                <View>
                  <Text style={styles.subtitle}>{j + 1}.</Text>
                  {/* <Image style={styles.image2} src={data2.user.image_url} /> */}
                  <Text style={styles.subtitle}>Name : {data2.user.name}</Text>
                  <Text style={styles.subtitle}>Rating : {data2.rating}/5</Text>
                  <Text style={styles.subtitle}>Review :</Text>
                  <Text style={styles.text}>{data2.text}</Text>
                </View>
              ))}
            </View>
          ) : data1.name == "Apple" ? (
            <View>
              <Image style={styles.image2} src={data1.image} />
              {data1.data.map((data2, j) => (
                <View>
                  <Text style={styles.subtitle}>{j + 1}.</Text>
                  <Text style={styles.subtitle}>
                    Name : {data2.author.name.label}
                  </Text>
                  <Text style={styles.subtitle}>
                    Rating : {data2["im:rating"].label}/5
                  </Text>
                  <Text style={styles.subtitle}>
                    Review : {data2.title.label}
                  </Text>
                  <Text style={styles.text}>{data2.content.label}</Text>
                </View>
              ))}
            </View>
          ) : data1.name == "Citysearch" ? (
            <View>
              <Image style={styles.image2} src={data1.image} />
              {data1.data.map((data2, j) => (
                <View>
                  <Text style={styles.subtitle}>{j + 1}.</Text>
                  <Text style={styles.subtitle}>
                    Name : {data2.children[7].value}
                  </Text>
                  <Text style={styles.subtitle}>
                    Rating : {data2.children[5].value}/10
                  </Text>
                  <Text style={styles.subtitle}>
                    Date :{" "}
                    {data2.children[6].value
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-")}
                  </Text>
                  <Text style={styles.subtitle}>
                    Review : {data2.children[1].value}
                  </Text>
                  <Text style={styles.text}>{data2.children[2].value}</Text>
                </View>
              ))}
            </View>
          ) : data1.name == "Facebook" ? (
            <View>
              <Image style={styles.image2} src={data1.image} />
              {data1.data.map((data2, j) => (
                <View>
                  <Text style={styles.subtitle}>{j + 1}.</Text>
                  <Text style={styles.subtitle}>Rating : {data2.rating}/5</Text>
                  <Text style={styles.subtitle}>
                    Review : {data2.review_text}
                  </Text>
                  <Text style={styles.text}>{data2.review_text}</Text>
                </View>
              ))}
            </View>
          ) : data1.name == "Google" ? (
            <View>
              <Image style={styles.image2} src={data1.image} />

              {data1.data.map((data2, j) => (
                <View>
                  <Text style={styles.subtitle}>{j + 1}.</Text>
                  {/* <Image
                  style={styles.image2}
                  src={data2.reviewer.profilePhotoUrl}
                /> */}
                  <Text style={styles.subtitle}>
                    Name : {data2.reviewer.displayName}
                  </Text>
                  <Text style={styles.subtitle}>
                    Rating : {data2.starRating}/5
                  </Text>
                  <Text style={styles.subtitle}>Review :</Text>
                  <Text style={styles.text}>{data2.comment}</Text>
                </View>
              ))}
            </View>
          ) : data1.name == "Foursquare" ? (
            <View>
              <Image style={styles.image2} src={data1.image} />
              {data1.data.map((data2, j) => (
                <View>
                  <Text style={styles.subtitle}>{j + 1}.</Text>
                  {/* <Image
                  style={styles.image2}
                  src={
                    data2.user.photo.prefix +
                    "original" +
                    data2.user.photo.suffix
                  }
                /> */}
                  <Text style={styles.subtitle}>
                    Name : {data2.user.firstName}
                  </Text>
                  <Text style={styles.subtitle}>Date : {data2.createdAt}</Text>
                  <Text style={styles.subtitle}>Review : {data2.text}</Text>
                  <Text style={styles.text}>{data2.text}</Text>
                </View>
              ))}
            </View>
          ) : data1.name == "Avvo" ? (
            <View>
              <Image style={styles.image2} src={data1.image} />
              {data1.data.map((data2, j) => (
                <View>
                  <Text style={styles.subtitle}>{j + 1}.</Text>
                  <Text style={styles.subtitle}>Rating : {data2.rating}/5</Text>
                  <Text style={styles.subtitle}>Review : {data2.title}</Text>
                  <Text style={styles.text}>{data2.body}</Text>
                </View>
              ))}
            </View>
          ) : data1.name == "Zomato" ? (
            <View>
              <Image style={styles.image2} src={data1.image} />
              {data1.data.map((data2, j) => (
                <View>
                  <Text style={styles.subtitle}>{j + 1}.</Text>
                  {/* <Image
                  style={styles.image2}
                  src={data2.review.user.profile_image}
                /> */}
                  <Text style={styles.subtitle}>
                    Name : {data2.review.user.name}
                  </Text>
                  <Text style={styles.subtitle}>
                    Rating : {data2.review.rating}/5
                  </Text>
                  <Text style={styles.subtitle}>
                    Date : {data2.review.review_time_friendly}
                  </Text>
                  <Text style={styles.subtitle}>
                    Review : {data2.review.rating_text}
                  </Text>
                  <Text style={styles.text}>{data2.review.review_text}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.subtitle}></Text>
          )
        )}
      </Page>
    </Document>
  );

  foursquare_star_counting = (rating, total_number) => {
    rating = Math.round(rating / 2);
    console.log("foursquare_rating total_no", rating, total_number);

    if (rating == 5) {
      this.setState({ star_5: this.state.star_5 + total_number });
    } else if (rating == 4) {
      this.setState({ star_4: this.state.star_4 + total_number });
    } else if (rating == 3) {
      this.setState({ star_3: this.state.star_3 + total_number });
    } else if (rating == 2) {
      this.setState({ star_2: this.state.star_2 + total_number });
    } else if (rating == 1) {
      this.setState({ star_1: this.state.star_1 + total_number });
    }
  };

  fb_star_counting = data => {
    data.map(res =>
      res.has_rating
        ? res.rating == 5
          ? this.setState({ star_5: this.state.star_5 + 1 })
          : res.rating == 4
          ? this.setState({ star_4: this.state.star_4 + 1 })
          : res.rating == 3
          ? this.setState({ star_3: this.state.star_3 + 1 })
          : res.rating == 2
          ? this.setState({ star_2: this.state.star_2 + 1 })
          : res.rating == 1
          ? this.setState({ star_1: this.state.star_1 + 1 })
          : ""
        : ""
    );
    let fb_overallrating = 0,
      i = 0;
    data.map(res =>
      res.has_rating ? (fb_overallrating += res.rating) && i++ : ""
    );
    fb_overallrating = fb_overallrating / i;
    this.setState({ fb_overallrating });

    if (fb_overallrating != 0) {
      this.setState({
        pdf_data2: [
          ...this.state.pdf_data2,
          {
            name: "Facebook",
            image: require("../images/facebook.png"),
            data: fb_overallrating
          }
        ]
      });
    }
  };
  Update_Overall_Breakdown=type=>e=>{
    var filter=e.target.value;
console.log("upd",filter)
    if(type === "overall_rating" ){
      console.log("overall");
      const data3={
        "secure_pin":"digimonk","user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId"),
       "type":type,"filter_type":filter
      }

      overall_rating_review(data3).then(response => {
        console.log("over",response);

        this.setState({
          AvgRating:response.data.overall_rating_array[0].Average_rating,
          TotalReviews:response.data.overall_rating_array[0].Total_reviews,
          // RatingTotalReviews:response.data.rating_breakdown_array[0].Total_reviews,
          // FiveStar:response.data.rating_breakdown_array[0].five_star,
          // FourStar:response.data.rating_breakdown_array[0].four_star,
          // ThreeStar:response.data.rating_breakdown_array[0].three_star,
          // TwoStar:response.data.rating_breakdown_array[0].two_star,
          // OneStar:response.data.rating_breakdown_array[0].one_star,
          // HelpfulReview:response.data.most_helpful_reviews[0]
        })

      })
    }

    
    if(type === "rating_breakdown" ){
      console.log("breakdown");

      const data3={
        "secure_pin":"digimonk","user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId"),
       "type":type,"filter_type":filter
      }

      overall_rating_review(data3).then(response => {
        console.log("over",response);

        this.setState({
          // AvgRating:response.data.overall_rating_array[0].Average_rating,
          // TotalReviews:response.data.overall_rating_array[0].Total_reviews,
          RatingTotalReviews:response.data.rating_breakdown_array[0].Total_reviews,
          FiveStar:response.data.rating_breakdown_array[0].five_star,
          FourStar:response.data.rating_breakdown_array[0].four_star,
          ThreeStar:response.data.rating_breakdown_array[0].three_star,
          TwoStar:response.data.rating_breakdown_array[0].two_star,
          OneStar:response.data.rating_breakdown_array[0].one_star,
          // HelpfulReview:response.data.most_helpful_reviews[0]
        })

      })


    }
  }

  UpdateReviewsFilter=e=>{
    var filter= e.target.value;
    console.log(filter);
    this.setState({AllReviews:[]})

    const data2={
      "secure_pin":"digimonk","user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId"),

      "filter_type":filter
    }
    console.log(data2,"data2 reviews")

    Axios.post(
      "https://digimonk.net/dashify-ci/admin/socialmedia_api/get_all_reviews_by_locationid",
      data2
    ).then(resp => {
      console.log("digi",resp);
      this.setState({AllReviews:resp.data.reviews_array});
    });


  }

  render() {
    console.log("this.state", this.state);

    var finalFive=   parseInt((this.state.FiveStar/ this.state.RatingTotalReviews)*100); 
    var finalFour= parseInt((this.state.FourStar/ this.state.RatingTotalReviews)*100); 
    var finalThree= parseInt((this.state.ThreeStar/ this.state.RatingTotalReviews)*100); 
    var finalTwo= parseInt((this.state.TwoStar/ this.state.RatingTotalReviews)*100); 
    var finalOne= parseInt((this.state.OneStar/ this.state.RatingTotalReviews)*100); 
    var HelpfulReview=this.state.HelpfulReview;
    var HelpfulReviewName,HelpfulReviewText,HelpfulReviewRating,HelpfulReviewImg;
    if(HelpfulReview){
      HelpfulReviewName= HelpfulReview.name;
      HelpfulReviewText=HelpfulReview.text;
      HelpfulReviewRating=HelpfulReview.rating;
      HelpfulReviewImg=HelpfulReview.url




    }
    var AllReviews=this.state.AllReviews;
    var FinalReviews;
    if (AllReviews){
     FinalReviews= AllReviews.map((r)=>{
      // const star = {
      //   ONE: 1,
      //   TWO: 2,
      //   THREE: 3,
      //   FOUR: 4,
      //   FIVE: 5
      // };
      // console.log(star[r.rating])


        return(<MDBRow  className='review_container' key={r.review_id}>
        <MDBCol md='9'>
          <MDBRow>
          <MDBCol md="2">
                  <img src={r.image_url ?r.image_url : review_img1} alt='review_icon' className='review_img' />
                  </MDBCol>
                  <MDBCol md="10" >
                    <div className='review_heading2'> {r.name} </div>
                    <div style={{marginTop:'5px'}}>
                      
                  
                      <Rating name="size-small" defaultValue={parseInt(r.rating)} size="small" readOnly/></div>
                    
                    <div className='review_contant3'>
                   {r.text}
                    </div>
                  </MDBCol>
          </MDBRow>
        </MDBCol>
                  
                  <MDBCol  >
                    <div style={{marginLeft:'40px'}}>
                    <span ><img src={clock} alt='review_icon' /></span>
                     <span className='review_contant3' style={{marginLeft:'2%'}}> {r.time_created} </span>
                    </div>
                      
                  </MDBCol>
                </MDBRow>)
      })
    }

    let {
      fbAccounts,
      fbReviews,
      fb_overallrating,
      fbToken,
      yelpReviews,
      yelpDetails,
      googleReviews,
      foursquareReviews,
      appleReviews,
      citysearchReviews,
      instaComments,
      foursquareDetails,
      appleDetails,
      citysearchDetails,
      foursquareReviewCount,
      appleReviewCount,
      citysearchReviewCount,
      apple_star_sum,
      citysearch_star_sum,
      star_5,
      star_4,
      star_3,
      star_2,
      star_1,
      zillowAvgRating,
      zillowDetails,
      zillowReviewCount,
      zillowReviews,
      tomtomAvgRating,
      tomtomDetails,
      tomtomReviewCount,
      tomtomReviews,
      avvoAvgRating,
      avvoDetails,
      avvoReviewCount,
      avvoReviews,
      zomatoAvgRating,
      zomatoDetails,
      zomatoReviewCount,
      zomatoReviews,
      active_listing
    } = this.state;

    let total_count = star_5 + star_4 + star_3 + star_2 + star_1;
    var most_helpful_review;
    var google_reviews = this.state.googleReviews.reviews;

    // <div className="whitebox" key={rev.reviewId}>
    //       <div className="view_author">
    //         <img src={rev.reviewer.profilePhotoUrl} width={150} />
    //       </div>
    //       <div className="text_viewahor">
    //         <h4>
    //           {rev.reviewer.displayName} leave a 5 star review{" "}
    //           <span>{rev.createTime.slice(0, 10)}</span>
    //         </h4>
    //         {rev.starRating ? (
    //           <Rating
    //             style={{ color: "#f7c508" }}
    //             emptySymbol={["fa fa-star-o fa-2x high"]}
    //             fullSymbol={["fa fa-star fa-2x high"]}
    //             fractions={3}
    //             initialRating={star[rev.starRating]}
    //             readonly={true}
    //           />
    //         ) : (
    //           <Rating
    //             style={{ color: "#f7c508" }}
    //             emptySymbol={["fa fa-star-o fa-2x high"]}
    //             fullSymbol={["fa fa-star fa-2x high"]}
    //             fractions={3}
    //             initialRating={0}
    //             readonly={true}
    //           />
    //         )}

    //         <p>{rev.comment}</p>
    //       </div>
    //     </div>

    if (google_reviews) {
      let k = 0;
      for (var i = 0; i < google_reviews.length; i++) {
        if (google_reviews[i].starRating == "FIVE") {
          k = i;
          break;
        }
      }
      most_helpful_review = (
        <div className="col-md-4">
          <div className="tablediv autor_namex ">
            <h4>Most helpful Review</h4>
            <div className="helpful-review">
              <div className="autoter">
                <img
                  src={google_reviews[k].reviewer.profilePhotoUrl}
                  width={120}
                />

                <div className="autor_name">
                  <h5>{google_reviews[k].reviewer.displayName}</h5>
                  <ul>
                    {google_reviews[k].starRating == "FIVE"
                      ? [1, 2, 3, 4, 5].map(res => (
                          <li>
                            <span className="glyphicon glyphicon-star"></span>
                          </li>
                        ))
                      : google_reviews[k].starRating == "FOUR"
                      ? [1, 2, 3, 4].map(res => (
                          <li>
                            <span className="glyphicon glyphicon-star"></span>
                          </li>
                        ))
                      : google_reviews[k].starRating == "THREE"
                      ? [1, 2, 3].map(res => (
                          <li>
                            <span className="glyphicon glyphicon-star"></span>
                          </li>
                        ))
                      : google_reviews[k].starRating == "TWO"
                      ? [1, 2].map(res => (
                          <li>
                            <span className="glyphicon glyphicon-star"></span>
                          </li>
                        ))
                      : google_reviews[k].starRating == "ONE"
                      ? [1].map(res => (
                          <li>
                            <span className="glyphicon glyphicon-star"></span>
                          </li>
                        ))
                      : ""}
                  </ul>
                </div>
              </div>
            </div>

            <div className="text_autor">
              <p>{google_reviews[k].comment}</p>
            </div>
          </div>
        </div>
      );
    } else if (yelpReviews.length != 0) {
      console.log("yelpReviews", yelpReviews);
      let k = 0;
      for (var i = 0; i < yelpReviews.length; i++) {
        if (yelpReviews[i].rating == 5) {
          k = i;
          break;
        }
      }
      most_helpful_review = (
        <div className="col-md-4">
          <div className="tablediv autor_namex ">
            <h4>Most helpful Review</h4>
            <div className="helpful-review">
              <div className="autoter">
                <img src={yelpReviews[k].user.image_url} width={120} />
              </div>
              <div className="autor_name">
                <h5>{yelpReviews[k].user.name}</h5>
                <ul>
                  {yelpReviews[k].rating == 5
                    ? [1, 2, 3, 4, 5].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : yelpReviews[k].rating == 4
                    ? [1, 2, 3, 4].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : yelpReviews[k].rating == 3
                    ? [1, 2, 3].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : yelpReviews[k].rating == 2
                    ? [1, 2].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : yelpReviews[k].rating == 1
                    ? [1].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>

            <div className="text_autor">
              <p>{yelpReviews[k].text}</p>
            </div>
          </div>
        </div>
      );
    } else if (fbReviews.length != 0) {
      console.log("fbReviews", fbReviews);
      let k = 0;
      for (var i = 0; i < fbReviews.length; i++) {
        if (fbReviews[i].has_rating && fbReviews[i].has_review) {
          if (fbReviews[i].rating == 5) {
            k = i;
            break;
          }
        }
      }
      most_helpful_review = (
        <div className="col-md-4">
          <div className="tablediv autor_namex ">
            <h4>Most helpful Review</h4>
            <div className="helpful-review">
              <div className="autoter">
                <img
                  // src={fbReviews[k].user.image_url}
                  alt="image"
                  width={120}
                />
              </div>
              <div className="autor_name">
                {/* <h5>{fbReviews[k].user.name}</h5> */}
                <h5>User</h5>
                <ul>
                  {fbReviews[k].rating == 5
                    ? [1, 2, 3, 4, 5].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : fbReviews[k].rating == 4
                    ? [1, 2, 3, 4].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : fbReviews[k].rating == 3
                    ? [1, 2, 3].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : fbReviews[k].rating == 2
                    ? [1, 2].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : fbReviews[k].rating == 1
                    ? [1].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>

            <div className="text_autor">
              <p>{fbReviews[k].review_text}</p>
            </div>
          </div>
        </div>
      );
    } else if (foursquareReviews.length != 0) {
      console.log("foursquareReviews", foursquareReviews);
      let k = 0;
      // for (var i = 0; i < foursquareReviews.length; i++) {
      //   if (foursquareReviews[i].rating == 5) {
      //     k = i;
      //     break;
      //   }
      // }
      most_helpful_review = (
        <div className="col-md-4">
          <div className="tablediv autor_namex ">
            <h4>Most helpful Review</h4>
            <div className="helpful-review">
              <div className="autoter">
                <img
                  src={
                    foursquareReviews[k].user.photo.prefix +
                    "original" +
                    foursquareReviews[k].user.photo.suffix
                  }
                  width={120}
                />
              </div>
              <div className="autor_name">
                <h5>
                  {foursquareReviews[k].user.firstName}{" "}
                  {foursquareReviews[k].user.lastName}
                </h5>
                {/* <ul>
                 {foursquareReviews[k].rating == 5
                    ? [1, 2, 3, 4, 5].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : foursquareReviews[k].rating == 4
                    ? [1, 2, 3, 4].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : foursquareReviews[k].rating == 3
                    ? [1, 2, 3].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : foursquareReviews[k].rating == 2
                    ? [1, 2].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : foursquareReviews[k].rating == 1
                    ? [1].map(res => (
                        <li>
                          <span className="glyphicon glyphicon-star"></span>
                        </li>
                      ))
                    : ""} 
                </ul>*/}
              </div>
            </div>

            <div className="text_autor">
              <p>{foursquareReviews[k].text}</p>
            </div>
          </div>
        </div>
      );
    }

    //rating calculation
    var overAllRating = 0,
      overAllReviewCount = 0;

    // var fbReviewCounter=0,i=0;
    // this.state.fbReviews.map((r)=>{
    //   if (r.has_rating){
    //     i++;
    //     fbReviewCounter+=r.rating;
    //   }
    // console.log("fbReviewCounter");
    // console.log(fbReviewCounter);
    // console.log(i);
    // })

    let a = 0;
    overAllRating =
      (yelpDetails.rating ? yelpDetails.rating : 0) +
      (googleReviews.averageRating ? googleReviews.averageRating : 0) +
      (foursquareDetails.rating ? foursquareDetails.rating / 2 : 0) +
      fb_overallrating +
      (appleReviewCount ? apple_star_sum / appleReviewCount : 0) +
      (citysearchReviewCount
        ? citysearch_star_sum / citysearchReviewCount
        : 0) +
      (zillowAvgRating ? zillowAvgRating : 0) +
      (tomtomAvgRating ? tomtomAvgRating : 0) +
      (avvoAvgRating ? avvoAvgRating : 0) +
      (zomatoAvgRating ? zomatoAvgRating : 0);

    a =
      a +
      (yelpDetails.rating ? 1 : 0) +
      (googleReviews.averageRating ? 1 : 0) +
      (foursquareDetails.rating ? 1 : 0) +
      (fbAccounts[0] ? 1 : 0) +
      (appleReviewCount ? 1 : 0) +
      (citysearchReviewCount ? 1 : 0) +
      (zillowAvgRating ? 1 : 0) +
      (tomtomAvgRating ? 1 : 0) +
      (avvoAvgRating ? 1 : 0) +
      (zomatoAvgRating ? 1 : 0);

    if (a == 0) {
      overAllRating = NaN;
    } else {
      overAllRating = overAllRating / a;
    }

    //pdf data

    let pdf_data2 = [];

    if (overAllRating) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Overallrating",
          image: require("../images/alexa.png"),
          data: overAllRating.toString().slice(0, 3)
        }
      ];
    }

    if (yelpDetails.rating) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Yelp",
          image: require("../images/yelp.png"),
          data: yelpDetails.rating
        }
      ];
    }

    if (googleReviews.averageRating) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Google",
          image: require("../images/google.png"),
          data: googleReviews.averageRating
        }
      ];
    }

    if (foursquareDetails.rating) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Foursquare",
          image: require("../images/foursquare.png"),
          data: foursquareDetails.rating
        }
      ];
    }

    if (fb_overallrating != 0) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Facebook",
          image: require("../images/facebook.png"),
          data: fb_overallrating
        }
      ];
    }

    if (appleReviewCount) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Apple",
          image: require("../images/apple.png"),
          data: apple_star_sum / appleReviewCount
        }
      ];
    }

    if (citysearchReviewCount) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Citysearch",
          image: require("../images/citysearch.jpg"),
          data: citysearch_star_sum / citysearchReviewCount
        }
      ];
    }

    if (zillowAvgRating) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Zillow",
          image: require("../images/zillow.png"),
          data: zillowAvgRating
        }
      ];
    }

    if (tomtomAvgRating) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Tomtom",
          image: require("../images/tomtom.png"),
          data: tomtomAvgRating
        }
      ];
    }

    if (avvoAvgRating) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Avvo",
          image: require("../images/avvo.png"),
          data: avvoAvgRating
        }
      ];
    }

    if (zomatoAvgRating) {
      pdf_data2 = [
        ...pdf_data2,
        {
          name: "Zomato",
          image: require("../images/zomato.png"),
          data: zomatoAvgRating
        }
      ];
    }

    let pdf_data1 = [];

    if (this.state.googleReviews && this.state.googleReviews.length != 0) {
      if (
        this.state.googleReviews.reviews &&
        this.state.googleReviews.reviews.length != 0
      ) {
        pdf_data1 = [
          ...pdf_data1,
          {
            name: "Google",
            image: require("../images/google.png"),
            data: this.state.googleReviews.reviews
          }
        ];
      }
    }

    if (this.state.fbReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Facebook",
          image: require("../images/facebook.png"),
          data: this.state.fbReviews
        }
      ];
    }
    if (this.state.yelpReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Yelp",
          image: require("../images/yelp.png"),
          data: this.state.yelpReviews
        }
      ];
    }
    if (this.state.foursquareReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Foursquare",
          image: require("../images/foursquare.png"),
          data: this.state.foursquareReviews
        }
      ];
    }
    if (this.state.appleReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Apple",
          image: require("../images/apple.png"),
          data: this.state.appleReviews
        }
      ];
    }
    if (this.state.citysearchReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Citysearch",
          image: require("../images/citysearch.jpg"),
          data: this.state.citysearchReviews
        }
      ];
    }
    if (this.state.zillowReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Zillow",
          image: require("../images/zillow.png"),
          data: this.state.zillowReviews
        }
      ];
    }
    if (this.state.tomtomReviews && this.state.tomtomReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Tomtom",
          image: require("../images/tomtom.png"),
          data: this.state.tomtomReviews
        }
      ];
    }
    if (this.state.avvoReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Avvo",
          image: require("../images/avvo.png"),
          data: this.state.avvoReviews
        }
      ];
    }
    if (this.state.zomatoReviews.length != 0) {
      pdf_data1 = [
        ...pdf_data1,
        {
          name: "Zomato",
          image: require("../images/zomato.png"),
          data: this.state.zomatoReviews
        }
      ];
    }

    // this.setState({pdf_data1,pdf_data2})

    //pdf data

    overAllReviewCount =
      fbReviews.length +
      yelpReviews.length +
      (googleReviews.totalReviewCount == undefined
        ? 0
        : googleReviews.totalReviewCount) +
      foursquareReviews.length +
      appleReviewCount +
      foursquareReviewCount +
      zillowReviewCount +
      tomtomReviewCount +
      avvoReviewCount +
      zomatoReviewCount;

    console.log("overAllReviewCount", overAllReviewCount);

    var FbAllReviews = [],
      j = 0;

    // fb
    FbAllReviews = this.state.fbReviews.map(rev => (
      <div className="whitebox" key={++j}>
        <div className="view_author">
          <img src={require("../images/re-1.jpg")} />
        </div>
        <div className="text_viewahor">
          <h4>
            {/* Katrina leave a 5 star review{" "} */}
            <span>{rev.created_time.slice(0, 10)}</span>
          </h4>
          {rev.has_rating ? (
            <Rating
              style={{ color: "#f7c508" }}
              emptySymbol={["fa fa-star-o fa-2x high"]}
              fullSymbol={["fa fa-star fa-2x high"]}
              fractions={3}
              initialRating={rev.rating}
              readonly={true}
            />
          ) : (
            ""
          )}

          <p>{rev.review_text}</p>
        </div>
      </div>
    ));

    // instagram

    var instaAllComments = [];
    var date = new Date();

    instaAllComments = this.state.instaComments.map((rev, i) => (
      <div className="whitebox" key={rev.id}>
        <div className="view_author">
          <img src={rev.owner.profile_pic_url} width={150} />
        </div>
        <div className="text_viewahor">
          <h4>
            {rev.owner.username}
            <span>{rev.created_at}</span>
          </h4>
          <p>{rev.text}</p>
        </div>
      </div>
    ));

    // yelp

    var yelpAllReviews = [];

    yelpAllReviews = this.state.yelpReviews.map(rev => (
      <div className="whitebox" key={rev.id}>
        <div className="view_author">
          <img src={rev.user.image_url} width={150} />
        </div>
        <div className="text_viewahor">
          <h4>
            {rev.rating
              ? rev.user.name + " leave a " + rev.rating + " star review"
              : rev.user.name}
            <span>{rev.time_created.slice(0, 10)}</span>
          </h4>
          {rev.rating ? (
            <Rating
              style={{ color: "#f7c508" }}
              emptySymbol={["fa fa-star-o fa-2x high"]}
              fullSymbol={["fa fa-star fa-2x high"]}
              fractions={3}
              initialRating={rev.rating}
              readonly={true}
            />
          ) : (
            <Rating
              style={{ color: "#f7c508" }}
              emptySymbol={["fa fa-star-o fa-2x high"]}
              fullSymbol={["fa fa-star fa-2x high"]}
              fractions={3}
              initialRating={0}
              readonly={true}
            />
          )}

          <p>{rev.text}</p>
        </div>
      </div>
    ));

    // zillow

    var zillowAllReviews = [];

    zillowAllReviews = this.state.zillowReviews.map((rev, i) => (
      <div className="whitebox" key={i}>
        <div className="view_author">
          <img src={require("../images/zillow.png")} width={150} />
        </div>
        <div className="text_viewahor">
          <h4>
            {rev.rating
              ? rev.reviewer + " leave a " + rev.rating + " star review"
              : rev.reviewer}
            <span>{rev.reviewDate}</span>
          </h4>
          <div className="reviewRating">
            <h4>Rating</h4>
            {rev.rating ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={parseInt(rev.rating)}
                readonly={true}
              />
            ) : (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={0}
                readonly={true}
              />
            )}
          </div>
          <div className="reviewRating">
            <h4>Local Knowledge Rating</h4>
            {rev.localknowledgeRating ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={parseInt(rev.localknowledgeRating)}
                readonly={true}
              />
            ) : (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={0}
                readonly={true}
              />
            )}
          </div>
          <div className="reviewRating">
            <h4>Negotiation Skill Rating</h4>
            {rev.negotiationskillsRating ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={parseInt(rev.negotiationskillsRating)}
                readonly={true}
              />
            ) : (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={0}
                readonly={true}
              />
            )}
          </div>
          <div className="reviewRating">
            <h4>Responsiveness Rating</h4>
            {rev.responsivenessRating ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={parseInt(rev.responsivenessRating)}
                readonly={true}
              />
            ) : (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={0}
                readonly={true}
              />
            )}
          </div>

          <p>{rev.reviewSummary}</p>
          <br />
          <p>{rev.description}</p>
        </div>
      </div>
    ));

    // tomtom

    var tomtomAllReviews = [];

    if (this.state.tomtomReviews) {
      tomtomAllReviews = this.state.tomtomReviews.map(rev => (
        <div className="whitebox" key={rev.id}>
          <div className="view_author">
            <img src={require("../images/tomtom.png")} width={150} />
          </div>
          <div className="text_viewahor">
            <h4>
              <span>{rev.date}</span>
            </h4>

            <p>{rev.text}</p>
          </div>
        </div>
      ));
    }

    console.log("tomtomAllReviews", tomtomAllReviews);

    // avvo

    var avvoAllReviews = [];

    avvoAllReviews = this.state.avvoReviews.map((rev, i) => (
      <div className="whitebox" key={i}>
        <div className="view_author">
          <img src={require("../images/avvo.png")} alt="Avvo" width={150} />
        </div>
        <div className="text_viewahor">
          <h4>
            {/* {rev.rating
              ? rev.review.user.name + " leave a " + rev.review.rating + " star review"
              : rev.review.user.name} */}
            <span>{rev.created_at}</span>
          </h4>
          <div>
            {rev.rating ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={parseInt(rev.rating)}
                readonly={true}
              />
            ) : (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={0}
                readonly={true}
              />
            )}
          </div>
          <p>{rev.title}</p>
          <br />
          <p>{rev.body}</p>
        </div>
      </div>
    ));

    // zomato

    var zomatoAllReviews = [];

    zomatoAllReviews = this.state.zomatoReviews.map((rev, i) => (
      <div className="whitebox" key={i}>
        <div className="view_author">
          <img src={rev.review.user.profile_image} alt="Zomato" width={150} />
        </div>
        <div className="text_viewahor">
          <h4>
            {rev.review.rating
              ? rev.review.user.name +
                " leave a " +
                rev.review.rating +
                " star review"
              : rev.review.user.name}
            <span>{rev.review.review_time_friendly}</span>
          </h4>
          <div>
            {rev.review.rating ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={parseInt(rev.review.rating)}
                readonly={true}
              />
            ) : (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={0}
                readonly={true}
              />
            )}
          </div>
          <p>{rev.review.review_text}</p>
        </div>
      </div>
    ));

    //Google
    const star = {
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5
    };
    console.log(star);
    console.log(star["ONE"]);
    var googleAllReviews = [];
    if (this.state.googleReviews.reviews) {
      googleAllReviews = this.state.googleReviews.reviews.map(rev => (
        <div className="whitebox" key={rev.reviewId}>
          <div className="view_author">
            <img src={rev.reviewer.profilePhotoUrl} width={150} />
          </div>
          <div className="text_viewahor">
            <h4>
              {rev.reviewer.displayName} leave a 5 star review{" "}
              <span>{rev.createTime.slice(0, 10)}</span>
            </h4>
            {rev.starRating ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={star[rev.starRating]}
                readonly={true}
              />
            ) : (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={0}
                readonly={true}
              />
            )}

            <p>{rev.comment}</p>
          </div>
        </div>
      ));
    }

    var foursquareAllReviews = [];

    if (this.state.foursquareReviews) {
      foursquareAllReviews = this.state.foursquareReviews.map(rev => (
        <div className="whitebox" key={rev.reviewId}>
          <div className="view_author">
            <img
              src={rev.user.photo.prefix + "original" + rev.user.photo.suffix}
              width={150}
            />
          </div>
          <div className="text_viewahor">
            <h4>
              {rev.user.firstName} leave a 5 star review{" "}
              <span>{rev.createdAt}</span>
            </h4>
            <ul>
              <li>
                <span className="glyphicon glyphicon-star"></span>
              </li>
              <li>
                <span className="glyphicon glyphicon-star"></span>
              </li>
              <li>
                <span className="glyphicon glyphicon-star"></span>
              </li>
              <li>
                <span className="glyphicon glyphicon-star"></span>
              </li>
              <li>
                <span className="glyphicon glyphicon-star"></span>
              </li>
            </ul>

            <p>{rev.text}</p>
          </div>
        </div>
      ));
    }

    var appleAllReviews = [];
    if (this.state.appleReviews) {
      appleAllReviews = this.state.appleReviews.map(rev => (
        <div className="whitebox" key={rev.id.label}>
          <div className="view_author">
            <img src={require("../images/apple.png")} width={150} />
          </div>
          <div className="text_viewahor">
            <h4>
              {rev.author.name.label} leave a {rev["im:rating"].label} star
              review {/* <span>{rev.createdAt}</span> */}
            </h4>
            {rev["im:rating"].label ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={rev["im:rating"].label}
                readonly={true}
              />
            ) : (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={0}
                readonly={true}
              />
            )}

            <p>
              <b>{rev.title.label}</b>
            </p>
            <p>{rev.content.label}</p>
          </div>
        </div>
      ));
    }

    var citysearchAllReviews = [];
    if (this.state.citysearchReviews) {
      citysearchAllReviews = this.state.citysearchReviews.map(rev => (
        <div className="whitebox" key={rev.children[0].value}>
          <div className="view_author">
            <img src={require("../images/citysearch.jpg")} width={150} />
          </div>
          <div className="text_viewahor">
            <h4>
              {rev.children[7].value} leave a{" "}
              {parseInt(rev.children[5].value) / 2} star review{" "}
              <span>{rev.children[6].value.split("T")[0]}</span>
            </h4>
            {rev.children[5].value ? (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={parseInt(rev.children[5].value) / 2}
                readonly={true}
              />
            ) : (
              <Rating
                style={{ color: "#f7c508" }}
                emptySymbol={["fa fa-star-o fa-2x high"]}
                fullSymbol={["fa fa-star fa-2x high"]}
                fractions={3}
                initialRating={0}
                readonly={true}
              />
            )}

            <p>
              <b>{rev.children[1].value}</b>
            </p>
            <p>{rev.children[2].value}</p>
          </div>
        </div>
      ));
    }

    console.log("active_listing", active_listing);

    return (
      <div>
        
        <MDBContainer>
        <div className="setting-10" style={{marginLeft:'-14px'}}>
            <h3>Review Tracking</h3>
          </div>
          <MDBRow>
            <MDBCol  md='3' className='review_container'>
<MDBRow>
  <MDBCol md='7' className='review_heading1'>
  Overall Rating
  </MDBCol>
  <MDBCol md='5'>
<select className="review_select_btn" onChange={this.Update_Overall_Breakdown("overall_rating")}>
  <option value="last week">This week</option>
  <option value="last year">This year</option>
</select>
  </MDBCol>
</MDBRow>
<div className='review_spacing1'>
    <span id='review_bold_rating'> {this.state.AvgRating} </span>
    <span id='review_normal_rating'>/5</span>
  </div>
  <div className='review_spacing1'>
  <Rating name="half-rating-read" value={parseInt(this.state.AvgRating)}  readOnly />
  </div>
<div className='review_spacing1 review_contant1'>
{this.state.TotalReviews} Reviews
</div>
            </MDBCol>

            <MDBCol  md='5'>
<div className='review_container'>
<MDBRow>
  <MDBCol md='8' className='review_heading1'>
  Rating Breakdown
  </MDBCol>
  <MDBCol md='4'>
<select className="review_select_btn" onChange={this.Update_Overall_Breakdown("rating_breakdown")}>
  <option value="last week">This week</option>
  <option value="last year">This year</option>
</select>
  </MDBCol>
</MDBRow>
 <MDBRow className='review_spacing3'>
   <MDBCol md='2' className='review_contant1'>5 <img src={star_img} alt='' className='review_img_position'/> </MDBCol>
   <MDBCol md='8'><BorderLinearProgress5 variant="determinate" value={finalFive ?finalFive:0} /></MDBCol>
   <MDBCol md='2' className='review_contant1'> {finalFive ? finalFive:0}%</MDBCol>
 </MDBRow>
 <MDBRow className='review_spacing3'>
   <MDBCol md='2' className='review_contant1'>4 <img src={star_img} alt='' className='review_img_position'/> </MDBCol>
   <MDBCol md='8'><BorderLinearProgress4 variant="determinate" value={finalFour ? finalFour :0} /></MDBCol>
    <MDBCol md='2' className='review_contant1'>{finalFour ? finalFour :0}%</MDBCol>
 </MDBRow>
 <MDBRow className='review_spacing3'>
   <MDBCol md='2' className='review_contant1'>3 <img src={star_img} alt='' className='review_img_position'/> </MDBCol>
   <MDBCol md='8'><BorderLinearProgress3 variant="determinate" value={finalThree ? finalThree :0} /></MDBCol>
    <MDBCol md='2' className='review_contant1'>{finalThree ?finalThree:0}%</MDBCol>
 </MDBRow>

 <MDBRow className='review_spacing3'>
   <MDBCol md='2' className='review_contant1'>2 <img src={star_img} alt='' className='review_img_position'/> </MDBCol>
   <MDBCol md='8'><BorderLinearProgress2 variant="determinate" value={finalTwo ?finalTwo:0} /></MDBCol>
    <MDBCol md='2' className='review_contant1'>{finalTwo ? finalTwo:0}%</MDBCol>
 </MDBRow>
 <MDBRow className='review_spacing3'>
   <MDBCol md='2' className='review_contant1'>1 <img src={star_img} alt='' className='review_img_position'/> </MDBCol>
   <MDBCol md='8'><BorderLinearProgress1 variant="determinate" value={finalOne ? finalOne:0} /></MDBCol>
    <MDBCol md='2' className='review_contant1'>{finalOne?finalOne:0}%</MDBCol>
 </MDBRow>
</div>
            </MDBCol>

{this.state.HelpfulReview?
            <MDBCol  md='4' className='review_container'>
  <MDBRow>
  <MDBCol md='12' className='review_heading1'>
  Most helpful Reviews
  </MDBCol>
</MDBRow>
<MDBRow className='review_spacing2'>
  <MDBCol md='3' ><img src={HelpfulReviewImg} alt='' className='review_img1'/> </MDBCol>
  <MDBCol md='9' style={{marginLeft:'-20px'}}>
    <div className='review_heading2'> {HelpfulReviewName} </div>
    <div style={{marginTop:'5px'}}><Rating name="size-small" value={parseInt(HelpfulReviewRating)} size="small" readOnly/></div>
  </MDBCol>
</MDBRow>
<MDBRow className='review_spacing2'>
  <MDBCol md='12' className='review_contant2'>
 {HelpfulReviewText}
  </MDBCol>
</MDBRow>

            </MDBCol>
            :"No helpful review"}
            

          </MDBRow>

          <MDBRow className='review_container'>
            <MDBCol md='3'>
<div className='review_heading3'>View all reviews</div>
            </MDBCol>
            <MDBCol md='5'>
            <img src={google} alt='' className='review_icon'/>
            <img src={rev_track_fb} alt='' className='review_icon'/>
              <img src={yelp} alt='' className='review_icon'/>
              <img src={foursquare} alt='' className='review_icon'/>
              
            <select className="review_select_btn" style={{float:'right'}}>
  <option>See more</option>
  <option>See less</option>
</select>
            </MDBCol>
            <MDBCol md='4' >
            <select className="review_select_btn" style={{float:'right'}}  onChange={this.UpdateReviewsFilter} >
  <option value="last week">This week</option>
  <option value="last month">last month</option>
  <option value="last 3 months">last 3 months</option>
  <option value="last 6 months">last 6 months</option>
  <option value="last year">This year</option>
  <option value="all">Lifetime</option>
</select>
            </MDBCol>
          </MDBRow>

          {FinalReviews}

          {/* <MDBRow  className='review_container'>
            <MDBCol md='9'>
              <MDBRow>
              <MDBCol md="2">
                      <img src={review_img1} alt='review_icon' className='review_img' />
                      </MDBCol>
                      <MDBCol md="10" >
                        <div className='review_heading2'>Dennis Brin</div>
                        <div style={{marginTop:'5px'}}><Rating name="size-small" defaultValue={2} size="small" readOnly/></div>
                        <div className='review_contant3'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation!
                        </div>
                      </MDBCol>
              </MDBRow>
            </MDBCol>
                      
                      <MDBCol  >
                        <div style={{marginLeft:'40px'}}>
                        <span ><img src={clock} alt='review_icon' /></span>
                         <span className='review_contant3' style={{marginLeft:'2%'}}>28 May 2020 at 9:34 AM</span>
                        </div>
                          
                      </MDBCol>
                    </MDBRow>

                    <MDBRow  className='review_container'>
            <MDBCol md='9'>
              <MDBRow>
              <MDBCol md="2">
                      <img src={review_img2} alt='review_icon' className='review_img' />
                      </MDBCol>
                      <MDBCol md="10" >
                        <div className='review_heading2'>Robinson Nik</div>
                        <div style={{marginTop:'5px'}}><Rating name="size-small" defaultValue={2} size="small" readOnly/></div>
                        <div className='review_contant3'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation!
                        </div>
                      </MDBCol>
              </MDBRow>
            </MDBCol>
                      
                      <MDBCol  >
                        <div style={{marginLeft:'40px'}}>
                        <span ><img src={clock} alt='review_icon' /></span>
                         <span className='review_contant3' style={{marginLeft:'2%'}}>28 May 2020 at 9:34 AM</span>
                        </div>
                          
                      </MDBCol>
                    </MDBRow> */}
        </MDBContainer>
      </div>
    );
  }
}
