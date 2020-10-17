import React, { Component } from "react";
import fb from "./assets/fb.png";
import { Doughnut, Bar } from "react-chartjs-2";
import ApexCharts from "apexcharts";
import DonutChart from "react-donut-chart";
import add from "./assets/tw.png";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Axios from "axios";
import { all_connection_of_one_location } from "./apis/social_platforms";
import Spinner from "./common/Spinner";
import Loader2 from "react-loader-spinner";
import Rating from "react-rating";
import { MDBBtn, MDBCol, MDBRow } from "mdbreact";

const Yelpconfig = {
  headers: {
    Authorization:
      "bearer _1cVnrrkqmG_dwNUdtorVxarkzItJM7AWM700rkRxM7aPdDfxJECcdaN00ADjSkrStF1pX4sdGCspYeSjU7VGkpjWYoMsC2_filBf5d5J5GMRTgXws_W6qusNMhYX3Yx",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost",
  },
};

let total_listings = 14;

const DnbConfig = {
  headers: {
    "x-dnb-user": "P200000D5647887A34E4067B86A78E31",
    "x-dnb-pwd": "digimonk@123",
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

export default class Overview extends Component {
  state = {
    metric: [],
    loader: true,
    loading: false,

    google_token: "",
    locationIdGoogle: "",

    show_states: "",
    range_name: "Last week",
    today_date: "",
    today_time: "",
    last_week: "",
    last_month: "",
    last_3_month: "",
    last_6_month: "",
    last_year: "",

    all_connections: [],

    google_views: "-",
    google_searched: "-",
    google_clicks: "-",
    google_phone: "-",
    google_direction: "-",
    isGoogleLoggedIn: false,

    yelpDetails: "",
    instaDetails: "",
    zillowDetails: "",
    instaFollowers: "-",
    instaFollowing: "-",
    instaPosts: "-",
    fViews: "-",
    fWebClicks: "-",
    fcalls: "-",
    fdirection: "-",
    fengaged: "-",
    fimpressions: "-",

    hereDetails: "",
    hereRating: "-",
    hereReviews: "-",

    avvoDetails: "",
    avvoRating: "-",
    avvoReviews: "-",

    zomatoDetails: "",
    zomatoRating: "-",
    zomatoReviews: "-",

    tomtomDetails: "",
    tomtomRating: "-",
    tomtomReviews: "-",
    tomtomNewReviews: "-",

    fb_notification: "",
    fbReviews: [],
    googleReviews: [],
    is_google_reply: false,
    google_reply_to_id: "",
    google_reply: "",

    foursquareReviews: [],
    foursquareDetails: "",
    foursquareReviewlength: "-",

    linkedin_clicks: "-",
    linkedin_likes: "-",
    linkedin_impressions: "-",
    linkedin_comments: "-",
    linkedin_share: "-",
    linkedin_followers: "-",

    dnbFinancialConditionText: "-",
    dnbHistoryRatingText: "-",
    dnbRiskLevelDescription: "-",
    dnbRiskScore: "-",
    dnbStandardRating: "-",

    appleReviews: [],
    appleRating: "-",

    citysearchReviews: [],
    citysearchNewReviews: "-",
    citysearchRating: "-",

    yelpReviews: [],
    yelp_new_reviews: "-",

    zillowReviews: [],
    view_notification_type1: false,
    view_notification_type2: false,
    view_notification_type3: false,
  };
  componentDidMount() {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1 < 10
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1) +
      "-" +
      (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());

    var time =
      today.getHours() +
      ":" +
      (today.getMinutes() + 1) +
      ":" +
      today.getSeconds();

    var lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );

    var last_week =
      lastWeek.getFullYear() +
      "-" +
      (lastWeek.getMonth() + 1) +
      "-" +
      lastWeek.getDate();

    var lastMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 30
    );

    var last_month =
      lastMonth.getFullYear() +
      "-" +
      (lastMonth.getMonth() + 1) +
      "-" +
      lastMonth.getDate();

    var last3Month = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 91
    );

    var last_3_month =
      last3Month.getFullYear() +
      "-" +
      (last3Month.getMonth() + 1) +
      "-" +
      last3Month.getDate();

    var last6Month = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 182
    );

    var last_6_month =
      last6Month.getFullYear() +
      "-" +
      (last6Month.getMonth() + 1) +
      "-" +
      last6Month.getDate();

    var lastYear = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 365
    );

    var last_year =
      lastYear.getFullYear() +
      "-" +
      (lastYear.getMonth() + 1) +
      "-" +
      lastYear.getDate();

    this.setState({
      today_date: date,
      today_time: time,
      last_week: last_week,
      last_month: last_month,
      last_3_month: last_3_month,
      last_6_month: last_6_month,
      last_year: last_year,
      show_states: last_week,
    });

    var yelpUrl,
      fourUrl,
      dnbUrl,
      appleUrl,
      citysearchUrl,
      instaUrl,
      zillowUrl,
      avvoUrl,
      zomatoUrl,
      hereUrl,
      tomtomUrl,
      linkedinUrl,
      linkedinId,
      avvoToken,
      fbtoken,
      fbPageId,
      googleToken;

    const data = {
      location_id: this.props.match.params.locationId,
    };

    // Axios.post(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/locations/get-all-connection-of-one-location",
    //   data,
    //   DjangoConfig
    // )
    all_connection_of_one_location(data, DjangoConfig)
      .then((response) => {
        console.log("all connections", response);
        response.data.data.map((l) => {
          if (l.Social_Platform.Platform == "Facebook") {
            fbtoken = l.Social_Platform.Token;
            fbPageId = l.Social_Platform.Other_info;
          }
          if (l.Social_Platform.Platform == "Google") {
            googleToken = l.Social_Platform.Token;
            this.setState({
              google_token: googleToken,
              locationIdGoogle: l.Social_Platform.Other_info,
            });
          }
          if (l.Social_Platform.Platform == "Yelp") {
            yelpUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);
          }

          if (l.Social_Platform.Platform == "Foursquare") {
            fourUrl = l.Social_Platform.Other_info.split(",")[0]
              .slice(7)
              .split("/")[5];
          }

          if (l.Social_Platform.Platform == "Dnb") {
            dnbUrl = l.Social_Platform.Other_info;
          }

          if (l.Social_Platform.Platform == "Apple") {
            appleUrl = l.Social_Platform.Other_info.split(",")[0]
              .slice(7)
              .split("/")[6]
              .slice(2);
          }

          if (l.Social_Platform.Platform == "Instagram") {
            console.log(
              "instagram id",
              l.Social_Platform.Other_info.split(",")[0].slice(7)
            );
            instaUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);
          }

          if (l.Social_Platform.Platform == "Citysearch") {
            citysearchUrl = l.Social_Platform.Other_info.split(",")[0]
              .slice(7)
              .split("/")[4];
          }
          if (l.Social_Platform.Platform == "Here") {
            hereUrl = l.Social_Platform.Other_info;
          }
          if (l.Social_Platform.Platform == "Zillow") {
            zillowUrl = l.Social_Platform.Other_info;
          }

          if (l.Social_Platform.Platform == "Avvo") {
            avvoUrl = l.Social_Platform.Other_info;
            avvoToken = l.Social_Platform.Token;
          }
          if (l.Social_Platform.Platform == "Zomato") {
            zomatoUrl = l.Social_Platform.Other_info;
          }
          if (l.Social_Platform.Platform == "Tomtom") {
            tomtomUrl = l.Social_Platform.Other_info;
          }
          if (l.Social_Platform.Platform == "Linkedin") {
            linkedinUrl = l.Social_Platform.Token;
            linkedinId = l.Social_Platform.Other_info;
          }
        });

        const GoogleConfig = {
          headers: { Authorization: "Bearer " + googleToken },
        };

        // for instagram
        // if (fbtoken) {
        //   Axios.get(
        //     "https://www.instagram.com/oauth/authorize?client_id=708019883077720&redirect_uri=https://digimonk.com/auth/&scope=user_profile,user_media&response_type=code"
        //   ).then(resp => {
        //     console.log("instagram data", resp);
        //   });
        // }

        // for facebook
        if (fbtoken) {
          Axios.get(
            "https://graph.facebook.com/me/accounts/?access_token=" + fbtoken
          ).then((res) => {
            console.log("facebook data1", res.data);
            this.setState({
              fbAccounts: res.data.data,
              all_connections: [
                ...this.state.all_connections,
                { name: "Facebook" },
              ],
            });
            var fbPageAccessToken;
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].id == fbPageId) {
                fbPageAccessToken = res.data.data[i].access_token;
              }
            }
            Axios.get(
              "https://graph.facebook.com/" +
                fbPageId +
                "/insights/page_engaged_users,page_impressions,page_views_total,page_call_phone_clicks_logged_in_unique,page_get_directions_clicks_logged_in_unique,page_website_clicks_logged_in_unique?period=month&access_token=" +
                fbPageAccessToken
            ).then((resp) => {
              console.log("facebook data2", resp.data);
              this.setState({
                fViews:
                  resp.data.data[2] && resp.data.data[2].values[0]
                    ? resp.data.data[2].values[0].value
                    : "-",
                fWebClicks:
                  resp.data.data[5] && resp.data.data[5].values[0]
                    ? resp.data.data[5].values[0].value
                    : "-",
                fcalls:
                  resp.data.data[3] && resp.data.data[3].values[0]
                    ? resp.data.data[3].values[0].value
                    : "-",
                fdirection:
                  resp.data.data[4] && resp.data.data[4].values[0]
                    ? resp.data.data[4].values[0].value
                    : "-",
                fengaged:
                  resp.data.data[0] && resp.data.data[0].values[0]
                    ? resp.data.data[0].values[0].value
                    : "-",
                fimpressions:
                  resp.data.data[1] && resp.data.data[1].values[0]
                    ? resp.data.data[1].values[0].value
                    : "-",
              });
            });
            Axios.get(
              "https://graph.facebook.com/" +
                fbPageId +
                "/ratings?fields=has_rating,review_text,created_time,has_review,rating,recommendation_type&access_token=" +
                fbPageAccessToken
            ).then((res) => {
              console.log("fb reviews", res.data);
              this.setState({ fbReviews: res.data.data ? res.data.data : [] });
            });
            Axios.get(
              "https://graph.facebook.com/" +
                fbPageId +
                "?fields=new_like_count,talking_about_count,unread_message_count,unread_notif_count,unseen_message_count&access_token=" +
                fbPageAccessToken
            ).then((resp) => {
              console.log("facebook notifications", resp.data);
              this.setState({ fb_notification: resp.data });
            });
          });
        }

        // Google
        if (googleToken) {
          Axios.get(
            "https://mybusiness.googleapis.com/v4/accounts/",
            GoogleConfig
          ).then((res) => {
            console.log("google account", res.data);
            localStorage.setItem("accountId", res.data.accounts[0].name);
            this.setState({
              loader: false,
              all_connections: [
                ...this.state.all_connections,
                { name: "Google" },
              ],
              isGoogleLoggedIn: true,
            });
            this.business_report_insight();

            // Axios.get(
            //   "https://mybusiness.googleapis.com/v4/" +
            //     localStorage.getItem("accountId") +
            //     "/locations",
            //   GoogleConfig
            // ).then(resp => {
            //   console.log("google location", resp.data);

            //   localStorage.setItem(
            //     "locationIdGoogle",
            //     resp.data.locations[0].name
            //   );

            const google_data = {
              // locationNames: [localStorage.getItem("locationIdGoogle")],
              locationNames: [this.state.locationIdGoogle],
              basicRequest: {
                metricRequests: [{ metric: "ALL" }],
                timeRange: {
                  startTime: "2019-10-12T01:01:23.045123456Z",
                  endTime: "2020-05-10T23:59:59.045123456Z",
                },
              },
            };
            Axios.post(
              "https://mybusiness.googleapis.com/v4/" +
                localStorage.getItem("accountId") +
                "/locations:reportInsights",
              google_data,
              GoogleConfig
            ).then((respo) => {
              console.log("google location insight", respo.data);

              if (respo.data.locationMetrics) {
                const data = respo.data.locationMetrics[0].metricValues;
                const google_views = (
                  parseInt(data[0].totalValue.value) +
                  parseInt(data[1].totalValue.value)
                ).toString();
                const google_searched = data[4].totalValue.value;
                const google_clicks = data[5].totalValue.value;
                const google_phone = data[6].totalValue.value;
                const google_direction = data[7].totalValue.value;
                this.setState({
                  google_views,
                  google_searched,
                  google_clicks,
                  google_phone,
                  google_direction,
                });
              }
            });

            Axios.get(
              "https://mybusiness.googleapis.com/v4/" +
                this.state.locationIdGoogle +
                "/reviews",
              GoogleConfig
            ).then((respo) => {
              console.log("google reviews", respo.data);
              this.setState({ googleReviews: respo.data.reviews });
            });
            // });
          });
        }
        var today = new Date();
        // here
        if (hereUrl) {
          Axios.get(hereUrl).then((res) => {
            console.log("Here data", res.data);
            this.setState({ hereDetails: res.data });

            if (res.data.media) {
              let hereRating =
                res.data.media.ratings.items.length >= 1
                  ? res.data.media.ratings.items[0].average
                  : "-";
              let hereReviews =
                res.data.media.ratings.items.length >= 1
                  ? res.data.media.ratings.items[0].count
                  : "-";
              this.setState({
                hereRating,
                hereReviews: hereReviews,
                all_connections: [
                  ...this.state.all_connections,
                  { name: "Here" },
                ],
              });
            } else {
              this.setState({
                all_connections: [
                  ...this.state.all_connections,
                  { name: "Here" },
                ],
              });
            }
          });
        }

        //for instagram
        if (instaUrl) {
          Axios.get("https://www.instagram.com/" + instaUrl + "/?__a=1").then(
            (res) => {
              console.log("instagram data in json", res.data);
              console.log(
                "instagram data in json",
                res.data.graphql.user.edge_owner_to_timeline_media.edges[0].node
                  .shortcode
              );
              const instaDetails = res.data.graphql.user;
              const instaFollowers =
                res.data.graphql.user.edge_followed_by.count;
              const instaFollowing = res.data.graphql.user.edge_follow.count;
              const instaPosts =
                res.data.graphql.user.edge_owner_to_timeline_media.count;
              this.setState({
                instaDetails,
                instaFollowers,
                instaFollowing,
                instaPosts,
              });
            }
          );
          this.setState({
            all_connections: [
              ...this.state.all_connections,
              { name: "Instagram" },
            ],
          });
        }

        // for yelp
        if (yelpUrl) {
          Axios.get(
            "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
              yelpUrl.slice(25) +
              "/reviews",
            Yelpconfig
          ).then((resp) => {
            console.log("yelp reviews", resp.data.reviews);

            let yelp_new_reviews = 0;
            for (let j = 0; j < resp.data.reviews.length; j++) {
              let create_time1 = resp.data.reviews[j].time_created;
              if (parseInt(create_time1.slice(0, 4)) == today.getFullYear()) {
                if (
                  parseInt(create_time1.slice(5, 7)) ==
                  today.getMonth() + 1
                ) {
                  if (parseInt(create_time1.slice(8, 10)) == today.getDate()) {
                    yelp_new_reviews++;
                  }
                }
              }
            }
            this.setState({ yelpReviews: resp.data.reviews, yelp_new_reviews });
            Axios.get(
              "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
                yelpUrl.slice(25),
              Yelpconfig
            ).then((resp) => {
              console.log("hii");
              console.log("yelp details", resp.data);
              this.setState({ yelpDetails: resp.data });
            });
          });
          this.setState({
            all_connections: [...this.state.all_connections, { name: "Yelp" }],
          });
        }

        // for zillow
        if (zillowUrl) {
          Axios.get(
            "https://www.zillow.com/webservice/ProReviews.htm?zws-id=X1-ZWz170sf100mbv_7lwvq&email=" +
              zillowUrl +
              "&count=10&output=json"
          ).then((resp) => {
            console.log("zillow data", resp.data);
            this.setState({
              zillowReviews: resp.data.response.results.proReviews.review,
              zillowDetails: resp.data.response.results.proInfo,
            });
          });
          this.setState({
            all_connections: [
              ...this.state.all_connections,
              { name: "Zillow" },
            ],
          });
        }

        if (avvoUrl && avvoToken) {
          const AvvoConfig = {
            headers: {
              Authorization: "Bearer " + avvoToken,
            },
          };
          Axios.get(
            "https://cors-anywhere.herokuapp.com/https://api.avvo.com/api/4/lawyers.json?id[]=" +
              avvoUrl,
            AvvoConfig
          ).then((res) => {
            console.log("avvo lawyer data in json", res.data);
            let avvoRating = parseFloat(
              res.data.lawyers[0].client_review_score
            );
            let avvoReviews = parseInt(res.data.lawyers[0].client_review_count);
            this.setState({
              avvoDetails: res.data,
              avvoRating,
              avvoReviews,
            });
            this.setState({
              all_connections: [
                ...this.state.all_connections,
                { name: "Avvo" },
              ],
            });
          });
        }

        if (zomatoUrl) {
          Axios.get(
            "https://developers.zomato.com/api/v2.1/restaurant?res_id=" +
              zomatoUrl,
            Zomatoconfig
          ).then((res) => {
            console.log("zomato data", res.data);

            let zomatoRating = res.data.user_rating.aggregate_rating
              ? parseFloat(res.data.user_rating.aggregate_rating)
              : 0;
            let zomatoReviews = parseInt(res.data.all_reviews_count);
            this.setState({
              zomatoDetails: res.data,
              zomatoRating,
              zomatoReviews,
            });
            this.setState({
              all_connections: [
                ...this.state.all_connections,
                { name: "Zomato" },
              ],
            });
          });
        }

        if (tomtomUrl) {
          if (tomtomUrl != "-") {
            Axios.get(
              "https://api.tomtom.com/search/2/poiDetails.json?key=IRUplE1TqUPstrlMA2N51xASusnsDsEd&id=" +
                tomtomUrl
            ).then((res) => {
              console.log("tomtom data", res.data);

              let tomtomRating = res.data.result.rating
                ? parseFloat(res.data.result.rating.value) / 2
                : 0;

              let tomtomReviews = parseInt(res.data.result.rating.totalRatings);

              var tomtomNewReviews = 0;
              for (let i = 0; i < res.data.result.reviews.length; i++) {
                let create_time1 = res.data.result.reviews[i];
                if (parseInt(create_time1.slice(0, 4)) == today.getFullYear()) {
                  if (
                    parseInt(create_time1.slice(5, 7)) ==
                    today.getMonth() + 1
                  ) {
                    if (
                      parseInt(create_time1.slice(8, 10)) == today.getDate()
                    ) {
                      tomtomNewReviews++;
                    }
                  }
                }
              }
              this.setState({
                tomtomDetails: res.data,
                tomtomRating,
                tomtomReviews,
                tomtomNewReviews,
              });
            });
          }

          this.setState({
            all_connections: [
              ...this.state.all_connections,
              { name: "Tomtom" },
            ],
          });
        }

        // For foursquare
        if (fourUrl) {
          Axios.get(
            "https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v2/venues/" +
              fourUrl +
              "?client_id=44RU2431YG02H4E00RQTLKEUKIKINQSFO2JBHII2WHH32PXZ&client_secret=FWV2WOL40MQ5M1YZ5E2TKUWIQ4WYZ1QUJXOQ24VGRSXFA3IY&v=20180323"
          ).then((res) => {
            console.log("foursquare data", res.data);
            this.setState({
              foursquareReviews: res.data.response.venue.tips.groups[0]
                ? res.data.response.venue.tips.groups[0].items
                : [],
              foursquareDetails: res.data.response.venue,
              foursquareReviewlength: res.data.response.venue.tips.count,
            });
          });
          this.setState({
            all_connections: [
              ...this.state.all_connections,
              { name: "Foursquare" },
            ],
          });
        }

        // For linkedin
        if (linkedinUrl && linkedinId) {
          const LinkedinConfig = {
            headers: {
              Authorization: "Bearer " + linkedinUrl,
            },
          };
          Axios.get(
            `https://cors-anywhere.herokuapp.com/https://api.linkedin.com/v2/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=${linkedinId}`,
            LinkedinConfig
          ).then((res) => {
            // console.log("linkedin data", res.data);
            if (
              res.data &&
              res.data.elements &&
              res.data.elements[0].totalShareStatistics
            ) {
              let lin_data = res.data.elements[0].totalShareStatistics;
              this.setState({
                linkedin_clicks: lin_data.clickCount,
                linkedin_likes: lin_data.likeCount,
                linkedin_impressions: lin_data.impressionCount,
                linkedin_comments: lin_data.commentCount,
                linkedin_share: lin_data.shareCount,
              });
            }
            this.setState({
              all_connections: [
                ...this.state.all_connections,
                { name: "Linkedin" },
              ],
            });
          });
          Axios.get(
            `https://cors-anywhere.herokuapp.com/https://api.linkedin.com/v2/networkSizes/${linkedinId}?edgeType=CompanyFollowedByMember`,
            LinkedinConfig
          ).then((res) => {
            // console.log("linkedin data", res.data);
            if (res.data && res.data.firstDegreeSize) {
              this.setState({
                linkedin_followers: res.data.firstDegreeSize,
              });
            }
          });
        }

        // For Dnb
        if (dnbUrl) {
          // var today = new Date();
          var date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate() +
            "T" +
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();

          const data = {
            ApplicationTransactionID: "1234",
            ServiceTransactionID: "5678",
            //    TransactionTimestamp: "2001-12-17T09:30:47Z"
            TransactionTimestamp: date,
          };

          Axios.post(
            "https://cors-anywhere.herokuapp.com/https://direct.dnb.com/Authentication/V2.0/",
            data,
            DnbConfig
          )
            .then((resp) => {
              console.log("DNB authentication", resp.data);
              // this.setState({ token: resp.data.AuthenticationDetail.Token });
              const DnbAuthorization = {
                headers: {
                  Authorization: resp.data.AuthenticationDetail.Token,
                },
              };

              Axios.get(
                "https://cors-anywhere.herokuapp.com/https://direct.dnb.com/V5.0/organizations/" +
                  dnbUrl +
                  "/products/RTNG_TRND",
                DnbAuthorization
              ).then((res) => {
                console.log("DNB data1", res.data);
                this.setState({
                  dnbStandardRating:
                    res.data.OrderProductResponse.OrderProductResponseDetail
                      .Product.Organization.Assessment.DNBStandardRating
                      .DNBStandardRating,
                  dnbHistoryRatingText:
                    res.data.OrderProductResponse.OrderProductResponseDetail
                      .Product.Organization.Assessment.HistoryRatingText.$,
                  dnbFinancialConditionText:
                    res.data.OrderProductResponse.OrderProductResponseDetail
                      .Product.Organization.Assessment.FinancialConditionText.$,
                });
              });

              Axios.get(
                "https://cors-anywhere.herokuapp.com/https://direct.dnb.com/V5.0/organizations/" +
                  dnbUrl +
                  "/products/SER",
                DnbAuthorization
              ).then((res) => {
                console.log("DNB data2", res.data);
                this.setState({
                  dnbRiskScore:
                    res.data.OrderProductResponse.OrderProductResponseDetail
                      .Product.Organization.Assessment
                      .SupplierEvaluationRiskScore[0].RiskScore,
                });
              });

              Axios.get(
                "https://cors-anywhere.herokuapp.com/https://direct.dnb.com/V5.0/organizations/" +
                  dnbUrl +
                  "/products/VIAB_RAT",
                DnbAuthorization
              ).then((res) => {
                console.log("DNB data3", res.data);
                this.setState({
                  dnbRiskLevelDescription:
                    res.data.OrderProductResponse.OrderProductResponseDetail
                      .Product.Organization.Assessment.DNBViabilityRating
                      .ViabilityScore.RiskLevelDescription.$,
                });
              });
            })
            .catch((resp) => {
              console.log("DNB authentication error", resp.data);
            });

          this.setState({
            all_connections: [...this.state.all_connections, { name: "Dnb" }],
          });
        }

        // for apple
        if (appleUrl) {
          Axios.get(
            "https://itunes.apple.com/in/rss/customerreviews/id=" +
              appleUrl +
              "/sortBy=mostRecent/json"
          ).then((res) => {
            console.log("apple reviews", res.data.feed.entry);

            let appleRating = 0;
            let appleReviews = res.data.feed.entry;

            for (let i = 0; i < appleReviews.length; i++) {
              appleRating += parseInt(appleReviews[i]["im:rating"].label);
            }
            appleRating = parseInt(
              (appleRating / appleReviews.length).toString().slice(0, 3)
            );
            this.setState({
              appleRating,
              appleReviews: res.data.feed.entry,
            });
          });
          this.setState({
            all_connections: [...this.state.all_connections, { name: "Apple" }],
          });
        }

        if (citysearchUrl) {
          Axios.get(
            "https://cors-anywhere.herokuapp.com/https://api.citygridmedia.com/content/reviews/v2/search/where?listing_id=" +
              citysearchUrl +
              "&publisher=test"
          ).then((res) => {
            console.log("citysearchUrl response", res);

            var XMLParser = require("react-xml-parser");
            var xml = new XMLParser().parseFromString(res.data); // Assume xmlText contains the example XML
            console.log(xml);
            console.log(
              "citysearch review",
              xml.getElementsByTagName("review")
            );

            let citysearchReviews = xml.getElementsByTagName("review");
            var citysearchRating = 0;
            var citysearchNewReviews = 0;
            for (let i = 0; i < citysearchReviews.length; i++) {
              citysearchRating +=
                parseInt(citysearchReviews[i].children[5].value) / 2;

              let create_time1 = citysearchReviews[i].children[6].value;
              if (parseInt(create_time1.slice(0, 4)) == today.getFullYear()) {
                if (
                  parseInt(create_time1.slice(5, 7)) ==
                  today.getMonth() + 1
                ) {
                  if (parseInt(create_time1.slice(8, 10)) == today.getDate()) {
                    citysearchNewReviews++;
                  }
                }
              }
            }
            citysearchRating = parseInt(
              (citysearchRating / citysearchReviews.length)
                .toString()
                .slice(0, 3)
            );
            this.setState({
              citysearchNewReviews,
              citysearchRating,
              citysearchReviews: xml.getElementsByTagName("review"),
            });
          });

          this.setState({
            all_connections: [
              ...this.state.all_connections,
              { name: "Citysearch" },
            ],
          });
        }

        this.setState({ loader: false });
      })
      .catch((res) => {
        console.log("error in overview", res);
        this.setState({
          loader: false,
        });
      });
  }

  business_report_insight = () => {
    this.setState({ loading: true });
    const GoogleConfig = {
      headers: { Authorization: "Bearer " + this.state.google_token },
    };
    // Axios.get(
    //   `https://mybusiness.googleapis.com/v4/${localStorage.getItem("accountId")}/locations`,
    //   GoogleConfig
    // ).then(resp => {
    //   console.log(resp.data);

    // localStorage.setItem("locationIdover", resp.data.locations[0].name);

    const reportInsights = {
      // locationNames: [localStorage.getItem("locationIdover")],
      locationNames: [this.state.locationIdGoogle],
      basicRequest: {
        metricRequests: [
          {
            metric: "VIEWS_MAPS",
            options: "AGGREGATED_DAILY",
          },
          {
            metric: "ACTIONS_WEBSITE",
            options: "AGGREGATED_DAILY",
          },
          {
            metric: "ACTIONS_PHONE",
            options: "AGGREGATED_DAILY",
          },
        ],

        timeRange: {
          startTime: this.state.show_states + "T01:01:23.045123456Z",
          endTime: this.state.today_date + "T23:59:59.045123456Z",
        },
      },
    };
    Axios.post(
      `https://mybusiness.googleapis.com/v4/${localStorage.getItem(
        "accountId"
      )}/locations:reportInsights`,
      reportInsights,
      GoogleConfig
    )
      .then((res) => {
        console.log("google report insight", res.data);
        if (res.data.locationMetrics[0]) {
          this.setState({
            metric: res.data.locationMetrics[0].metricValues,
            loading: false,
          });
        }
      })
      .catch((res) => {
        console.log("error in overview");
        this.setState({
          loading: false,
        });
      });
    // });
  };

  google_reply_submit = () => {
    let { google_reply_to_id, google_reply, google_token } = this.state;

    const GoogleConfig = {
      headers: { Authorization: "Bearer " + google_token },
    };

    const data = {
      comment: google_reply,
    };

    Axios.put(
      "https://mybusiness.googleapis.com/v4/" +
        this.state.locationIdGoogle +
        "/reviews/" +
        google_reply_to_id +
        "/reply",
      data,
      GoogleConfig
    )
      .then((respo) => {
        console.log("google reply response", respo.data);
        this.setState({ is_google_reply: false });
      })
      .catch((respo) => {
        console.log("google reply response", respo.data);
      });
  };

  dataDoughnut = (total_listings, all_connections) => {
    return [
      { value: total_listings - all_connections.length, label: "Opted out" },
      { value: all_connections.length, label: "Live Listing" },
      { value: 0, label: "Processing" },
      { value: 0, label: "Unavailable" },
    ];
  };

  dataBar = (date, phone, direction, website) => {
    return {
      labels: date,
      datasets: [
        {
          label: "phone call",
          data: phone,
          backgroundColor: "#8760D0",
          barThickness: 10,
        },
        {
          label: "get direction",
          data: direction,
          backgroundColor: "#528AF7",
          barThickness: 10,
        },
        {
          label: "website visited",
          data: website,
          backgroundColor: "#58C8F9",
          barThickness: 10,
        },
      ],
    };
  };


  barChartOptions = (phone, direction, website) => {
    let a1 = phone.filter(Boolean);
    let a2 = direction.filter(Boolean);
    let a3 = website.filter(Boolean);

    a1 = a1.length == 0 ? 0 : Math.max(...a1);
    a2 = a2.length == 0 ? 0 : Math.max(...a2);
    a3 = a3.length == 0 ? 0 : Math.max(...a3);
    let max_value = Math.max(a1, a2, a3);

    return {
      responsive: true,
      maintainAspectRatio: false,

      legend: {
        position: "bottom",
        align: "start",
      },

      scales: {
        xAxes: [
          {
            barPercentage: 1,

            gridLines: {
              display: false,
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              beginAtZero: true,
              stepSize: 25,
              max: max_value,
            },
          },
        ],
      },
    };
  };

  // getBarChart = (date, phone,direction,website) => {
  //   var options = {
  //     chart: {
  //       height: 380,
  //       type: "line",

  //     },
  //     colors: ["#8760D0", "#528AF7", "#58C8F9"
  //                 ],
  //     series: [
  //       {
  //         name: "Phone Cell",
  //         type: "column",
  //         data: phone
  //       },
  //    {
  //         name: "Get Derection",
  //         type: "column",
  //         data: direction
  //       },

  //       {
  //         name: "Website visited",
  //         type: "column",
  //         data: website
  //       }
  //     ],
  //     stroke: {
  //       width: [0, 2],
  //       curve: 'smooth'
  //     },

  //     title: {
  //       text: "Average Google customer Actions"
  //     },
  //      labels: date,

  //    };

  //    var chart = new ApexCharts(document.querySelector("#chart"), options);

  //    return chart.render();
  //   // return ApexCharts.render(document.querySelector("#chart"), options);
  // }

  change_states = (states, range) => async (e) => {
    console.log("e.target.name", states, range);
    await this.setState({ show_states: states, range_name: range });
    this.business_report_insight();
  };

  changeHandler = (event) => {
    console.log("states", this.state);
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    let {
      today_date,
      today_time,
      last_week,
      last_month,
      last_3_month,
      last_6_month,
      last_year,
      show_states,
      all_connections,
      isGoogleLoggedIn,
      google_views,
      google_searched,
      google_clicks,
      google_phone,
      google_direction,
      yelpDetails,
      instaDetails,
      zillowDetails,
      instaFollowers,
      instaFollowing,
      instaPosts,
      fViews,
      fWebClicks,
      fcalls,
      fdirection,
      fengaged,
      fimpressions,
      fb_notification,
      fbReviews,
      googleReviews,
      is_google_reply,
      google_reply_to_id,

      foursquareReviews,
      foursquareReviewlength,
      foursquareDetails,

      linkedin_clicks,
      linkedin_likes,
      linkedin_comments,
      linkedin_impressions,
      linkedin_followers,
      linkedin_share,

      dnbFinancialConditionText,
      dnbHistoryRatingText,
      dnbRiskLevelDescription,
      dnbRiskScore,
      dnbStandardRating,

      appleReviews,
      appleRating,

      citysearchReviews,
      citysearchNewReviews,
      citysearchRating,

      yelpReviews,
      yelp_new_reviews,

      zillowReviews,

      avvoDetails,
      avvoRating,
      avvoReviews,

      hereDetails,
      hereRating,
      hereReviews,

      zomatoDetails,
      zomatoRating,
      zomatoReviews,

      tomtomDetails,
      tomtomRating,
      tomtomReviews,
      tomtomNewReviews,

      view_notification_type1,
      view_notification_type2,
      view_notification_type3,

      range_name,
    } = this.state;

    console.log("this.state", this.state);
    var date = [],
      phone = [],
      website = [],
      direction = [];

    if (this.state.metric.length > 0) {
      let variance = 7;
      if (range_name == "Last week") {
        variance = 1;
      } else if (range_name == "Last month") {
        variance = 7;
      } else if (range_name == "Last 3 months") {
        variance = 7;
      } else if (range_name == "Last 6 months") {
        variance = 30;
      } else if (range_name == "Last year") {
        variance = 30;
      }

      this.state.metric.map((da, i) => {
        if (da.metric == "VIEWS_MAPS") {
          da.dimensionalValues.map((m, i2) => {
            if (i2 == 0 || (i2 + 1) % variance == 0) {
              direction.push(parseInt(m.value));
            }
          });
        }

        if (da.metric == "ACTIONS_WEBSITE") {
          da.dimensionalValues.map((m, i2) => {
            if (i2 == 0 || (i2 + 1) % variance == 0) {
              website.push(parseInt(m.value));
            }
          });
        }

        if (da.metric == "ACTIONS_PHONE") {
          da.dimensionalValues.map((m, i2) => {
            if (i2 == 0 || (i2 + 1) % variance == 0) {
              phone.push(parseInt(m.value));
            }
          });
        }
      });

      this.state.metric[0].dimensionalValues.map((d, i) => {
        if (i == 0 || (i + 1) % variance == 0) {
          date.push(
            d.timeDimension.timeRange.startTime
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("-")
          );
        }
      });
    }

    // let fb_show_count_unseen1;
    // let fb_show_count_unseen2;
    // let fb_show_review_notification = [];
    let total_notifications = [];

    if (fb_notification && fb_notification.unseen_message_count > 0) {
      total_notifications = [
        ...total_notifications,
        <div>
          <MDBRow>
            <MDBCol md="8">
              <div className="recent-title">
                <img
                  src={require("../images/facebook.png")}
                  alt="facebook"
                  height="25"
                  width="25"
                />
                Message
              </div>
            </MDBCol>
            <MDBCol md="4" style={{ marginTop: "5px" }}>
              <MDBRow>
                <MDBCol md="6" style={{ padding: "0px" }}>
                  <a
                    href={
                      "https://www.facebook.com/" +
                      fb_notification.id +
                      "/inbox"
                    }
                    className="btn btn-primary "
                  >
                    See message
                  </a>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <p className="recent-text">
                You have {fb_notification.unseen_message_count} unread messages
                on your facebook page
              </p>
            </MDBCol>
          </MDBRow>
          {/* <div className="col-md-7">
            <h5 className="recent-title">
              <img
                src={require("../images/facebook.png")}
                alt="facebook"
                height="65"
                width="65"
              />
              <br />
              Message
            </h5>
            <p className="recent-text">
              You have {fb_notification.unseen_message_count} unread messages on
              your facebook page
            </p>
          </div>

          <div className="col-md-2 ">
            <a
              href={"https://www.facebook.com/" + fb_notification.id + "/inbox"}
              className="btn btn-primary "
            >
              <h6>See message</h6>
            </a>
          </div> */}
        </div>,
      ];
    }

    if (fb_notification && fb_notification.unread_notif_count > 0) {
      total_notifications = [
        ...total_notifications,
        <div>
          <MDBRow>
            <MDBCol md="8">
              <div className="recent-title">
                <img
                  src={require("../images/facebook.png")}
                  alt="facebook"
                  height="40"
                  width="40"
                />
                Notification
              </div>
            </MDBCol>
            <MDBCol md="4" style={{ marginTop: "5px" }}>
              <MDBRow>
                <MDBCol md="6" style={{ padding: "0px" }}>
                  <a
                    href={"https://www.facebook.com/" + fb_notification.id}
                    className="btn btn-primary "
                  >
                    Go to page
                  </a>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <p className="recent-text">
                You have {fb_notification.unread_notif_count} unread
                notifications on your facebook page
              </p>
            </MDBCol>
          </MDBRow>

          {/* <div className="col-md-7">
            <h5 className="recent-title">
              <img
                src={require("../images/facebook.png")}
                alt="facebook"
                height="65"
                width="65"
              />
              <br />
              Notification
            </h5>
            <p className="recent-text">
              You have {fb_notification.unread_notif_count} unread notifications
              on your facebook page
            </p>
          </div>

          <div className="col-md-2 ">
            <a
              href={"https://www.facebook.com/" + fb_notification.id}
              className="btn btn-primary "
            >
              <h6>Go to page</h6>
            </a>
          </div> */}
        </div>,
      ];
    }

    for (let i = 0; i < fbReviews.length; i++) {
      if (fbReviews[i].created_time.slice(0, 10) == today_date) {
        total_notifications = [
          ...total_notifications,
          <div>
            <MDBRow>
              <MDBCol md="8">
                <div className="recent-title">
                  <img
                    src={require("../images/facebook.png")}
                    alt="facebook"
                    height="40"
                    width="40"
                  />
                  Someone give a {fbReviews[i].recommendation_type} review
                </div>
              </MDBCol>
              <MDBCol md="4" style={{ marginTop: "5px" }}>
                <MDBRow>
                  <MDBCol md="6" style={{ padding: "0px" }}>
                    <a
                      href={
                        "https://www.facebook.com/" +
                        fb_notification.id +
                        "/reviews"
                      }
                      className="btn btn-primary "
                    >
                      Comment
                    </a>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <p className="recent-text">
                  {fbReviews[i].review_text
                    ? fbReviews[i].review_text.length > 160
                      ? fbReviews[i].review_text.slice(0, 160) + "..."
                      : fbReviews[i].review_text
                    : ""}
                </p>
              </MDBCol>
            </MDBRow>
            {/* <div className="col-md-7">
              <h5 className="recent-title">
                <img
                  src={require("../images/facebook.png")}
                  alt="facebook"
                  height="65"
                  width="65"
                />
                <br />
                Someone give a {fbReviews[i].recommendation_type} review
              </h5>
              <p className="recent-text">
                {fbReviews[i].review_text
                  ? fbReviews[i].review_text.length > 160
                    ? fbReviews[i].review_text.slice(0, 160) + "..."
                    : fbReviews[i].review_text
                  : ""}
              </p>
            </div>

            <div className="col-md-2 ">
              <a
                href={
                  "https://www.facebook.com/" + fb_notification.id + "/reviews"
                }
                className="btn btn-primary "
              >
                <h6>Comment</h6>
              </a>
            </div> */}
          </div>,
        ];
      } else {
        break;
      }
    }

    console.log("this.state", this.state);

    // let google_show_review_notification = [];

    if (googleReviews) {
      for (let i = 0; i < googleReviews.length; i++) {
        if (googleReviews[i].createTime.slice(0, 10) == today_date) {
          total_notifications = [
            ...total_notifications,
            <div>
              <MDBRow>
                <MDBCol md="8">
                  <div className="recent-title">
                    <span>
                      <img
                        src={require("../images/google.png")}
                        alt="google"
                        height="40"
                        width="40"
                        marginRight="10px"
                      />
                    </span>
                    <span style={{}}>
                      {googleReviews[i].reviewer.displayName}
                    </span>
                  </div>
                </MDBCol>
                <MDBCol md="4" style={{ marginTop: "5px" }}>
                  <MDBRow>
                    <MDBCol md="6" style={{ padding: "0px" }}>
                      <MDBBtn
                        onClick={() =>
                          this.setState({
                            is_google_reply:
                              is_google_reply == true ? false : true,
                            google_reply_to_id: googleReviews[i].reviewId,
                          })
                        }
                        className="btn btn-primary "
                      >
                        Comment
                      </MDBBtn>
                    </MDBCol>

                    <MDBCol md="6" style={{ padding: "0px" }}>
                      <div className="recent-hour">
                        {parseInt(today_time.slice(0, 2)) -
                          parseInt(googleReviews[i].createTime.slice(11, 13)) ==
                        0
                          ? parseInt(today_time.slice(3, 5)) -
                            parseInt(
                              googleReviews[i].createTime.slice(14, 16)
                            ) +
                            "minutes ago"
                          : parseInt(today_time.slice(0, 2)) -
                            parseInt(
                              googleReviews[i].createTime.slice(11, 13)
                            ) +
                            "hours ago"}
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <p className="recent-text">
                    {googleReviews[i].comment
                      ? googleReviews[i].comment.length > 160
                        ? googleReviews[i].comment.slice(0, 160) + "..."
                        : googleReviews[i].comment
                      : ""}
                  </p>
                </MDBCol>
              </MDBRow>
              {is_google_reply == true &&
              google_reply_to_id == googleReviews[i].reviewId ? (
                <div className="notification-box">
                  <input
                    type="text"
                    placeholder="Enter your reply"
                    className="form-control"
                    name="google_reply"
                    onChange={this.changeHandler}
                    value={this.state.google_reply}
                    required
                  />
                  <br />
                  <a
                    className="notification_btn"
                    onClick={this.google_reply_submit}
                  >
                    Reply
                  </a>
                </div>
              ) : (
                ""
              )}
            </div>,
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
          <div>
            <MDBRow>
              <MDBCol md="8">
                <div className="recent-title">
                  <img
                    src={require("../images/yelp.png")}
                    alt="yelp"
                    height="40"
                    width="40"
                  />
                  {yelpReviews[i].user.name} leaves
                  {yelpReviews[i].rating} star review
                </div>
              </MDBCol>
              <MDBCol md="4" style={{ marginTop: "5px" }}>
                <MDBRow>
                  <MDBCol md="6" style={{ padding: "0px" }}>
                    <a href={yelpReviews[i].url} className="btn btn-primary ">
                      Comment
                    </a>
                  </MDBCol>

                  <MDBCol md="6" style={{ padding: "0px" }}>
                    <div className="recent-hour">
                      {parseInt(today_time.slice(0, 2)) -
                        parseInt(yelpReviews[i].time_created.slice(11, 13)) ==
                      0
                        ? parseInt(today_time.slice(3, 5)) -
                          parseInt(yelpReviews[i].time_created.slice(14, 16)) +
                          "minutes ago"
                        : parseInt(today_time.slice(0, 2)) -
                          parseInt(yelpReviews[i].time_created.slice(11, 13)) +
                          "hours ago"}
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <p className="recent-text">
                  {yelpReviews[i].text
                    ? yelpReviews[i].text.length > 160
                      ? yelpReviews[i].text.slice(0, 160) + "..."
                      : yelpReviews[i].text
                    : ""}
                </p>
              </MDBCol>
            </MDBRow>
            {/* <div className="col-md-7">
              <h5 className="recent-title">
                <img
                  src={require("../images/yelp.png")}
                  alt="yelp"
                  height="65"
                  width="65"
                />
                 {yelpReviews[i].user.name} leaves
                 {yelpReviews[i].rating} star review
              </h5>
              <p className="recent-text">
                {yelpReviews[i].text
                  ? yelpReviews[i].text.length > 160
                    ? yelpReviews[i].text.slice(0, 160) + "..."
                    : yelpReviews[i].text
                  : ""}
              </p>
            </div>

            <div className="col-md-2 ">
              <a href={yelpReviews[i].url} className="btn btn-primary ">
                <h6>Comment</h6>
              </a>
            </div>
            <div className="col-md-3  recent-hour">
              <h6>
                {parseInt(today_time.slice(0, 2)) -
                  parseInt(yelpReviews[i].time_created.slice(11, 13)) ==
                0
                  ? parseInt(today_time.slice(3, 5)) -
                    parseInt(yelpReviews[i].time_created.slice(14, 16)) +
                    "minutes ago"
                  : parseInt(today_time.slice(0, 2)) -
                    parseInt(yelpReviews[i].time_created.slice(11, 13)) +
                    "hours ago"}
              </h6>
            </div> */}
          </div>,
        ];
      } else {
        break;
      }
    }

    // let citysearch_show_review_notification = [];

    for (let i = 0; i < citysearchReviews.length; i++) {
      if (citysearchReviews[i].children[6].value.slice(0, 10) == today_date) {
        total_notifications = [
          ...total_notifications,
          <div>
            <MDBRow>
              <MDBCol md="8">
                <div className="recent-title">
                  <img
                    src={require("../images/citysearch.jpg")}
                    alt="citysearch"
                    height="40"
                    width="40"
                  />
                  {citysearchReviews[i].children[7].value} leaves
                  {citysearchReviews[i].children[5].value} star review
                </div>
              </MDBCol>
              <MDBCol md="4" style={{ marginTop: "5px" }}>
                <MDBRow>
                  <MDBCol md="6" style={{ padding: "0px" }}>
                    <a
                      href={citysearchReviews[i].children[21].value}
                      className="btn btn-primary "
                    >
                      Comment
                    </a>
                  </MDBCol>

                  <MDBCol md="6" style={{ padding: "0px" }}>
                    <div className="recent-hour">
                      {parseInt(
                        today_time.slice(0, 2) -
                          parseInt(
                            citysearchReviews[i].children[6].value.slice(11, 13)
                          )
                      ) == 0
                        ? parseInt(
                            today_time.slice(3, 5) -
                              parseInt(
                                citysearchReviews[i].children[6].value.slice(
                                  14,
                                  16
                                )
                              )
                          ) + "minutes ago"
                        : parseInt(
                            today_time.slice(0, 2) -
                              parseInt(
                                citysearchReviews[i].children[6].value.slice(
                                  11,
                                  13
                                )
                              )
                          ) + "hours ago"}
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <p className="recent-text">
                  {citysearchReviews[i].children[2].value
                    ? citysearchReviews[i].children[2].value.length > 160
                      ? citysearchReviews[i].children[2].value.slice(0, 160) +
                        "..."
                      : citysearchReviews[i].children[2].value
                    : ""}
                </p>
              </MDBCol>
            </MDBRow>
            {/* <div className="col-md-7">
              <h5 className="recent-title">
                <img
                  src={require("../images/citysearch.jpg")}
                  alt="citysearch"
                  height="65"
                  width="65"
                />
                <br />
                {citysearchReviews[i].children[7].value} leaves
                {citysearchReviews[i].children[5].value} star review
              </h5>
              <p className="recent-text">
                {citysearchReviews[i].children[2].value
                  ? citysearchReviews[i].children[2].value.length > 160
                    ? citysearchReviews[i].children[2].value.slice(0, 160) +
                      "..."
                    : citysearchReviews[i].children[2].value
                  : ""}
              </p>
            </div>

            <div className="col-md-2 ">
              <a
                href={citysearchReviews[i].children[21].value}
                className="btn btn-primary "
              >
                <h6>Comment</h6>
              </a>
            </div>
            <div className="col-md-3  recent-hour">
              <h6>
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
                    ) + "hours ago"}
              </h6>
            </div> */}
          </div>,
        ];
      } else {
        break;
      }
    }

    let total_social_overview = [];

    total_social_overview[0] = (
      <div class=" col-md-6 ">
        <div class="card social-10 ">
          <div className="fb-socails">
            <img src={require("../images/facebook.png")} alt="" />
          </div>

          <div className="row card_jump">
            <div className="col-sm-4 social-11">
              <h6>-</h6>
              {/* <p>+10,03% </p>  */}
              <a class="link-social" role="button">
                Views
              </a>
            </div>
            <div className="col-sm-4 social-11">
              <h6>-</h6>
              {/* <p>+10,03% </p>  */}
              <a class="link-social" role="button">
                Direction
              </a>
            </div>
            <div className="col-sm-4 social-11">
              <h6>-</h6>
              {/* <p>+10,03% </p>  */}
              <a class="link-social" role="button">
                Calls
              </a>
            </div>
          </div>
        </div>
      </div>
    );

    total_social_overview[1] = (
      <div class=" col-md-6 ">
        <div class="card social-10 ">
          <div className="fb-socails">
            <img src={require("../images/google.png")} alt="" />
          </div>

          <div className="row card_jump">
            <div className="col-sm-4 social-11">
              <h6>-</h6>
              {/* <p>+10,03% </p>  */}
              <a class="link-social" role="button">
                Views
              </a>
            </div>
            <div className="col-sm-4 social-11">
              <h6>-</h6>
              {/* <p>+10,03% </p> */}
              <a class="link-social" role="button">
                Calls
              </a>
            </div>
            <div className="col-sm-4 social-11">
              <h6>-</h6>
              {/* <p>+10,03% </p> */}
              <a class="link-social" role="button">
                Direction
              </a>
            </div>
          </div>
        </div>
      </div>
    );

    total_social_overview[2] = (
      <div class=" col-md-6 ">
        <div class="card social-10 ">
          <div className="fb-socails">
            <img src={require("../images/linkedin.png")} alt="Linkedin" />
          </div>

          <div className="row card_jump">
            <div className="col-sm-4 social-11">
              <h6>-</h6>
              {/* <p>+10,03% </p>  */}
              <a class="link-social" role="button">
                Likes
              </a>
            </div>
            <div className="col-sm-4 social-11">
              <h6>-</h6>
              {/* <p>+10,03% </p> */}
              <a class="link-social" role="button">
                Followers
              </a>
            </div>
            <div className="col-sm-4 social-11">
              <h6>-</h6>
              {/* <p>+10,03% </p> */}
              <a class="link-social" role="button">
                Impressions
              </a>
            </div>
            {/* <div className="liks">
  <span>Comments</span>
  <h4>{linkedin_comments}</h4>
</div>
<div className="liks">
  <span>share</span>
  <h4>{linkedin_share}</h4>
</div>
<div className="liks">
  <span>Clicks</span>
  <h4>{linkedin_clicks}</h4>
</div> */}
          </div>
        </div>
      </div>
    );

    total_social_overview[3] = (
      <div class=" col-md-6 ">
        <div class="card social-10 ">
          <div className="fb-socails">
            <img src={require("../images/yelp.png")} alt="Yelp" />
          </div>
          <div className="row card_jump">
            <div className="col-sm-4 social-11">
              <h6>-</h6>
              {/* <p>+10,03% </p> */}
              <a class="link-social" role="button">
                Rating
              </a>
            </div>
            <div className="col-sm-4 social-11">
              <h6>-</h6>
              {/* <p>+10,03% </p> */}
              <a class="link-social" role="button">
                Reviews
              </a>
            </div>
            {/* <div className="col-sm-4 social-11">
      <h6>-</h6>
      <a class="link-social" role="button">
        New Reviews
      </a>
    </div> */}
          </div>
        </div>
      </div>
    );

    {
      all_connections.map((data) => (
        <li>
          {data.name == "Facebook"
            ? (total_social_overview[0] = (
                <div class=" col-md-6 ">
                  <div class="card social-10 ">
                    <div className="fb-socails">
                      <img src={require("../images/facebook.png")} alt="" />
                    </div>

                    <div className="row card_jump">
                      <div className="col-sm-4 social-11">
                        <h6>{fViews}</h6>
                        {/* <p>+10,03% </p>  */}
                        <span class="link-social" role="button">
                          Views
                        </span>
                      </div>
                      <div className="col-sm-4 social-11">
                        <h6>{fdirection}</h6>
                        {/* <p>+10,03% </p>  */}
                        <span class="link-social" role="button">
                          Direction
                        </span>
                      </div>
                      <div className="col-sm-4 social-11">
                        <h6>{fcalls}</h6>
                        {/* <p>+10,03% </p>  */}
                        <span class="link-social" role="button">
                          Calls
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : ""}

          {data.name == "Google"
            ? (total_social_overview[1] = (
                <div class=" col-md-6 ">
                  <div class="card social-10 ">
                    <div className="fb-socails">
                      <img src={require("../images/google.png")} alt="" />
                    </div>

                    <div className="row card_jump">
                      <div className="col-sm-4 social-11">
                        <h6>{google_views}</h6>
                        {/* <p>+10,03% </p>  */}
                        <span class="link-social" role="button">
                          Views
                        </span>
                      </div>
                      <div className="col-sm-4 social-11">
                        <h6>{google_phone}</h6>
                        {/* <p>+10,03% </p> */}
                        <span class="link-social" role="button">
                          Calls
                        </span>
                      </div>
                      <div className="col-sm-4 social-11">
                        <h6>{google_direction}</h6>
                        {/* <p>+10,03% </p> */}
                        <span class="link-social" role="button">
                          Direction
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : ""}

          {data.name == "Linkedin"
            ? (total_social_overview[2] = (
                <div class=" col-md-6 ">
                  <div class="card social-10 ">
                    <div className="fb-socails">
                      <img
                        src={require("../images/linkedin.png")}
                        alt="Linkedin"
                      />
                    </div>

                    <div className="row card_jump">
                      <div className="col-sm-4 social-11">
                        <h6>{linkedin_likes}</h6>
                        {/* <p>+10,03% </p>  */}
                        <span class="link-social" role="button">
                          Likes
                        </span>
                      </div>
                      <div className="col-sm-4 social-11">
                        <h6>{linkedin_followers}</h6>
                        {/* <p>+10,03% </p> */}
                        <span class="link-social" role="button">
                          Followers
                        </span>
                      </div>
                      <div className="col-sm-4 social-11">
                        <h6>{linkedin_impressions}</h6>
                        {/* <p>+10,03% </p> */}
                        <span class="link-social" role="button">
                          Impressions
                        </span>
                      </div>
                      {/* <div className="liks">
                    <span>Comments</span>
                    <h4>{linkedin_comments}</h4>
                  </div>
                  <div className="liks">
                    <span>share</span>
                    <h4>{linkedin_share}</h4>
                  </div>
                  <div className="liks">
                    <span>Clicks</span>
                    <h4>{linkedin_clicks}</h4>
                  </div> */}
                    </div>
                  </div>
                </div>
              ))
            : ""}

          {data.name == "Yelp"
            ? (total_social_overview[3] = (
                <div class=" col-md-6 ">
                  <div class="card social-10 ">
                    <div className="fb-socails">
                      <img src={require("../images/yelp.png")} alt="Yelp" />
                    </div>
                    <div className="row card_jump">
                      <div className="col-sm-4 social-11">
                        <h6>{yelpDetails.rating}</h6>
                        {/* <p>+10,03% </p> */}
                        <span class="link-social" role="button">
                          Rating
                        </span>
                      </div>
                      <div className="col-sm-4 social-11">
                        <h6>{yelpReviews.length}</h6>
                        {/* <p>+10,03% </p> */}
                        <span class="link-social" role="button">
                          Reviews
                        </span>
                      </div>
                      {/* <div className="col-sm-4 social-11">
                        <h6>{yelp_new_reviews}</h6>
                        <a class="link-social" role="button">
                          New Reviews
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </li>
      ));
    }

    let total_listing_images = [];

    {
      all_connections.map((data) => (
        <li>
          {data.name == "Google"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <div className="google-mapd">
                    <img
                      src={require("../images/google.png")}
                      alt="google"
                      height="65"
                      width="65"
                    />
                  </div>
                </li>,
              ])
            : ""}

          {data.name == "Instagram"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <a data-toggle="modal" data-target="#myModal">
                    <div className="google-mapd">
                      <img
                        src={require("../images/instagram.png")}
                        alt="instagram"
                        height="65"
                        width="65"
                      />
                    </div>
                  </a>
                </li>,
              ])
            : ""}

          {data.name == "Yelp"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <div className="google-mapd">
                    <img src={require("../images/yelp.png")} alt="yelp" />
                  </div>
                </li>,
              ])
            : ""}

          {data.name == "Facebook"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <div className="google-mapd">
                    <img
                      src={require("../images/facebook.png")}
                      alt="facebook"
                    />
                  </div>
                </li>,
              ])
            : ""}

          {data.name == "Foursquare"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <div className="google-mapd">
                    <img
                      src={require("../images/foursquare.png")}
                      alt="foursquare"
                      height="65"
                      width="65"
                    />
                  </div>
                </li>,
              ])
            : ""}

          {data.name == "Dnb"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <div className="google-mapd">
                    <img
                      src={require("../images/dnb.jpg")}
                      alt="DandB"
                      height="65"
                      width="65"
                    />
                  </div>
                </li>,
              ])
            : ""}

          {data.name == "Apple"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <div className="google-mapd">
                    <img
                      src={require("../images/apple.png")}
                      alt="apple"
                      height="65"
                      width="65"
                    />
                  </div>
                </li>,
              ])
            : ""}

          {data.name == "Citysearch"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <div className="google-mapd">
                    <img
                      src={require("../images/citysearch.jpg")}
                      alt="citysearch"
                      height="65"
                      width="65"
                    />
                  </div>
                </li>,
              ])
            : ""}

          {data.name == "Here"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <div className="google-mapd">
                    <img
                      src={require("../images/here.png")}
                      alt="Here"
                      height="65"
                      width="65"
                    />
                  </div>
                </li>,
              ])
            : ""}

          {data.name == "Zillow"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <div className="google-mapd">
                    <img
                      src={require("../images/zillow.png")}
                      alt="Zillow"
                      height="65"
                      width="65"
                    />
                  </div>
                </li>,
              ])
            : ""}

          {data.name == "Avvo"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <div className="google-mapd">
                    <img
                      src={require("../images/avvo.png")}
                      alt="Avvo"
                      height="65"
                      width="65"
                    />
                  </div>
                </li>,
              ])
            : ""}

          {data.name == "Linkedin"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <div className="google-mapd">
                    <img
                      src={require("../images/linkedin.png")}
                      alt="Linkedin"
                      height="65"
                      width="65"
                    />
                  </div>
                </li>,
              ])
            : ""}

          {data.name == "Zomato"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <div className="google-mapd">
                    <img
                      src={require("../images/zomato.png")}
                      alt="Zomato"
                      height="65"
                      width="65"
                    />
                  </div>
                </li>,
              ])
            : ""}

          {data.name == "Tomtom"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <div className="google-mapd">
                    <img
                      src={require("../images/tomtom.png")}
                      alt="Tomtom"
                      height="65"
                      width="65"
                    />
                  </div>
                </li>,
              ])
            : ""}
        </li>
      ));
    }

    // let foursquare_show_review_notification = [];

    // for (let i = 0; i < foursquareReviews.length; i++) {
    //   if (foursquareReviews[i].time_created.slice(0, 10) == "2020-06-23") {
    //     foursquare_show_review_notification = [
    //       ...foursquare_show_review_notification,
    //       <div className="notification-box">
    //         <img
    //           src={require("../images/foursquare.png")}
    //           alt="foursquare"
    //           height="65"
    //           width="65"
    //         />
    //         <br />
    //         <br />
    //         <div className="autor_name">
    //           <h4>
    //             {foursquareReviews[i].user.firstName}{" "}
    //             {foursquareReviews[i].user.lastName} leave a review
    //           </h4>
    //         </div>
    //         <p>
    //           {" "}
    //           {foursquareReviews[i].text
    //             ? foursquareReviews[i].text.length > 160
    //               ? foursquareReviews[i].text.slice(0, 160) + "..."
    //               : foursquareReviews[i].text
    //             : ""}
    //         </p>

    //         <a href={yelpReviews[i].canonicalUrl} className="notification_btn">
    //           Reply
    //         </a>
    //       </div>
    //     ];
    //   } else {
    //     break;
    //   }
    // }

    return (
      <div>
        {this.state.loader ? (
          <div className="rightside_title">
            <Spinner />
          </div>
        ) : (
          <>
            {/* <div className="left-side-menu"></div> */}
            {/* <div className="content-page"> */}
            <div className="container " id="overview-10">
              <div className="row">
                <div className="col-md-6 recent_noti">
                  <div className="recent-9">
                    <h3>Recent Notification</h3>
                    <div className="viewall-div">
                      <a
                        onClick={() =>
                          view_notification_type1 == true
                            ? this.setState({
                                view_notification_type1: false,
                              })
                            : this.setState({
                                view_notification_type1: true,
                              })
                        }
                      >
                        {view_notification_type1 == false
                          ? "View All"
                          : "View Less"}
                      </a>
                      <ArrowRightIcon />
                    </div>
                  </div>
                  <div className="card7">
                    {total_notifications.length != 0 ? (
                      <div className="notifc">
                        {view_notification_type1 == false ? (
                          total_notifications.length > 3 ? (
                            <div>
                              {total_notifications[0]}
                              {total_notifications[1]}
                              {total_notifications[2]}
                            </div>
                          ) : (
                            total_notifications
                          )
                        ) : (
                          total_notifications
                        )}
                      </div>
                    ) : (
                      <div className="col-md-12">
                        <h3>No new notification</h3>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-6  recent_noti">
                  <div className="recent-9">
                    <h3>Social Overview</h3>
                    <div className="viewall-div">
                      <div className="camgianbox">
                        <div className="dropdown">
                          <a
                            href="#"
                            className="dropdown-toggle"
                            id="dropdownmenu"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            This Week
                          </a>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownmenu"
                          >
                            <ul>
                              <li>Last week</li>
                              <li>Last week</li>
                              <li>Last week</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    {/* <div class=" col-md-6 ">
                  <div class="card social-10 ">
                    <img src={fb} />

                    <div className="row card_jump">
                      <div className="col-sm-4 social-11">
                        <h6>310,125 </h6>
                        <p>+10,03% </p>
                        <a href="#" class="link-social" role="button">
                          Likes
                        </a>
                      </div>
                      <div className="col-sm-4 social-11">
                        <h6>310,125 </h6>
                        <p>+10,03% </p>
                        <a href="#" class="link-social" role="button">
                          Chek ins
                        </a>
                      </div>
                      <div className="col-sm-4 social-11">
                        <h6>310,125 </h6>
                        <p>+10,03% </p>
                        <a href="#" class="link-social" role="button">
                          Chek ins
                        </a>
                      </div>
                    </div>
                  </div>
                </div> */}

                    {total_social_overview.length != 0 ? (
                      total_social_overview
                    ) : (
                      <div className="col-md-12">
                        <h4>Please connect some listing</h4>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row hawaipatti ">
                <div className="col-md-9 ">
                  <div className="recent-card">
                    <ul className="outped">
                      <li>
                        <img src={require("../images/j.png")} alt="Zomato" />
                        <div className="socialdiv">
                          <h3>{total_listings}</h3>
                          <span>All Listing</span>
                        </div>
                      </li>

                      <li>
                        <img src={require("../images/k.png")} alt="Zomato" />
                        <div className="socialdiv">
                          <h3>
                            {" "}
                            {all_connections ? all_connections.length : "-"}
                          </h3>
                          <span>Live Listing</span>
                        </div>
                      </li>
                      <li>
                        <img src={require("../images/l.png")} alt="Zomato" />
                        <div className="socialdiv">
                          <h3>-</h3>
                          <span>Processing</span>
                        </div>
                      </li>

                      <li>
                        <img src={require("../images/m.png")} alt="Zomato" />
                        <div className="socialdiv">
                          <h3>-</h3>
                          <span>Unavailable</span>
                        </div>
                      </li>
                      <li>
                        <img src={require("../images/n.png")} alt="Zomato" />
                        <div className="socialdiv">
                          <h3>
                            {all_connections
                              ? total_listings - all_connections.length
                              : "-"}
                          </h3>
                          <span>Opted Out</span>
                        </div>
                      </li>
                    </ul>

                    {/*<div class="row">

                  <div className="col-sm-2 icon_margin  ">
                    <div className="row ">
                      <img src={add} alt="add" />

                      <div className="icon_margin ">
                        <div className="row  ">
                          <span>{total_listings}</span>
                        </div>
                        <div className="row">
                          <span>All Listing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-2 icon_margin  ">
                    <div className="row ">
                      <img src={add} alt="add" />

                      <div className="icon_margin ">
                        <div className="row  ">
                          <span>
                            {all_connections ? all_connections.length : "-"}
                          </span>
                        </div>
                        <div className="row">
                          <span>Live Listing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-2 icon_margin  ">
                    <div className="row ">
                      <img src={add} alt="add" />

                      <div className="icon_margin ">
                        <div className="row  ">
                          <span>-</span>
                        </div>
                        <div className="row">
                          <span>Processing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-2 icon_margin  ">
                    <div className="row ">
                      <img src={add} alt="add" />

                      <div className="icon_margin ">
                        <div className="row  ">
                          <span>-</span>
                        </div>
                        <div className="row">
                          <span>Unavailable</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-2 icon_margin  ">
                    <div className="row ">
                      <img src={add} alt="add" />

                      <div className="icon_margin ">
                        <div className="row  ">
                          <span>
                            {all_connections
                              ? total_listings - all_connections.length
                              : "-"}
                          </span>
                        </div>
                        <div className="row">
                          <span>Opted out</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              */}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="recent-card">
                    <div className="right_icons">
                      {/* <div className="col-md-1">
                    <img src={fb1} />
                  </div> */}
                      {view_notification_type2 == false ? (
                        total_listing_images.length > 5 ? (
                          <div className="sou">
                            <ul>
                              {total_listing_images[0]}
                              {total_listing_images[1]}
                              {total_listing_images[2]}
                              {total_listing_images[3]}
                              {total_listing_images[4]}
                            </ul>
                          </div>
                        ) : (
                          <div className="sou">
                            <ul>{total_listing_images}</ul>
                          </div>
                        )
                      ) : (
                        <div className="sou">
                          <ul>{total_listing_images}</ul>
                        </div>
                      )}

                      <div className="viewall-div">
                        <a
                          onClick={() =>
                            view_notification_type2 == true
                              ? this.setState({
                                  view_notification_type2: false,
                                })
                              : this.setState({
                                  view_notification_type2: true,
                                })
                          }
                        >
                          {view_notification_type2 == false
                            ? "View All"
                            : "View Less"}
                        </a>
                        <ArrowRightIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row chart_10">
                <div class="col-md-4 pt-2">
                  <div className="recent-9">
                    <h3>Listing Status</h3>
                  </div>
                  <div class="card4">
                    <DonutChart
                      legend={false}
                      height={250}
                      width={250}
                      outerRadius={0.95}
                      innerRadius={0.5}
                      clickToggle={false}
                      formatValues={(values, total) =>
                        `${parseInt((values / total) * 100)}%`
                      }
                      colors={["#8264C6", "#634A9B", "#EB05B8", "#3380cc"]}
                      strokeColor={"	false"}
                      data={this.dataDoughnut(total_listings, all_connections)}
                    />
                  </div>
                </div>
                <div class="col-md-8">
                  <div className="recent-9">
                    <h3>Average Google customer Actions</h3>

                    <div className="camgianbox">
                      <div className="dropdown">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          {range_name}
                        </a>
                        <div className="dropdown-menu">
                          <ul>
                            <li
                              onClick={this.change_states(
                                last_week,
                                "Last week"
                              )}
                            >
                              Last week
                            </li>
                            <li
                              onClick={this.change_states(
                                last_month,
                                "Last month"
                              )}
                            >
                              Last month
                            </li>
                            <li
                              onClick={this.change_states(
                                last_3_month,
                                "Last 3 months"
                              )}
                            >
                              Last 3 months
                            </li>
                            <li
                              onClick={this.change_states(
                                last_6_month,
                                "Last 6 months"
                              )}
                            >
                              Last 6 months
                            </li>
                            <li
                              onClick={this.change_states(
                                last_year,
                                "Last year"
                              )}
                            >
                              Last year
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card4">
                    {isGoogleLoggedIn ? (
                      this.state.metric.length > 0 ? (
                        this.state.loading ? (
                          <div style={{ textAlign: "center" }}>
                            <Loader2
                              type="Oval"
                              color="#00BFFF"
                              height={25}
                              width={25}
                              // timeout={3000} //3 secs
                            />
                          </div>
                        ) : (
                          <Bar
                            data={this.dataBar(date, phone, direction, website)}
                            options={this.barChartOptions(
                              phone,
                              direction,
                              website
                            )}
                          />
                          // this.getBarChart(date, phone,direction,website)
                        )
                      ) : (
                        <h4>No analytics of this Google account</h4>
                      )
                    ) : (
                      <h4>Please connect Google to see graph</h4>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </>
        )}
      </div>
    );
  }
}
