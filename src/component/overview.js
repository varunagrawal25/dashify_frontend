import React, { Component } from "react";
import fb from "./assets/fb.png";
import { Doughnut, Bar } from "react-chartjs-2";
import ApexCharts from "apexcharts";
import DonutChart from "react-donut-chart";
import add from "./assets/tw.png";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowDownIcon from "@material-ui/icons/ArrowDropDown";
import Axios from "axios";
import { all_connection_of_one_location, all_listing_overview } from "./apis/social_platforms";
import {
  all_connected_icons,
  all_social_media_notifications,
  all_social_media_overview,
  graph_google_customer_actions
} from "./apis/social_media";
import {
  all_social_media_notifications_json,
  all_social_media_overview_json,
  graph_google_customer_actions_json
} from "./json/social_media";
import { all_connection_of_one_location_json } from "./json/location";

import Spinner from "./common/Spinner";
import Loader2 from "react-loader-spinner";
import Rating from "react-rating";
import { MDBBtn, MDBCol, MDBRow } from "mdbreact";
import { secure_pin } from "../config";
let total_listing = 14;

const Yelpconfig = {
  headers: {
    Authorization:
      "bearer _1cVnrrkqmG_dwNUdtorVxarkzItJM7AWM700rkRxM7aPdDfxJECcdaN00ADjSkrStF1pX4sdGCspYeSjU7VGkpjWYoMsC2_filBf5d5J5GMRTgXws_W6qusNMhYX3Yx",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost"
  }
};

const DnbConfig = {
  headers: {
    "x-dnb-user": "P200000D5647887A34E4067B86A78E31",
    "x-dnb-pwd": "digimonk@123"
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

export default class Overview extends Component {
  state = {
    metric: [],
    // loader: true,
    loader: false,
    loading: false,

    google_token: "",
    locationIdGoogle: "",

    show_states: "",
    today_date: "",
    today_time: "",
    last_week: "",
    last_month: "",
    last_3_month: "",
    last_6_month: "",
    last_year: "",
    AllConnectedIcons:[],

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

    notification_data: "",
    db_social_range: "week",
    social_range: "Last week",
    google_range: "Last week",
    db_google_range: "week",
    social_overview_data: "",
    graph_google_customer_data: "",
    all_listing: "-",
    live_listing: "-",
    processing: "-",
    unavailable: "-",
    opted_out: "-",
    social_media_overview_loader: false,
    duration:"last month"
  };
  componentDidMount() {


    this.get_all_icons_function()
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
      show_states: last_week
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
      const data = {"secure_pin":"digimonk","user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId")};


      all_connection_of_one_location(data, DjangoConfig)
      .then(resp => {
        console.log("get all connections by id s", resp);
        this.setState({ allListings: resp.data.social_media_list });

        if (this.state.allListings) {
          this.state.allListings.map(l => {
            console.log("loop all")
            if (l.connect_type == "Facebook") {
              
              this.setState({
                fbIsLoggedIn: true,
               
              });
            }

            if (l.connect_type === "Google") {
              
              this.setState({
                googleIsLoggedIn: true,
               
              });
              this.graph_google_customer_actions_function();

             
            }


    const data = {"secure_pin":"digimonk","user_id":localStorage.getItem("UserId") ,
    "location_id":localStorage.getItem("locationId")};

    const notification_query_data = {
      location_id: this.props.match.params.locationId
    };

    all_social_media_notifications(notification_query_data)
      .then(res => {
        if (res.data) {
          this.setState({ notification_data: res.data });
        } else {
          this.setState({
            notification_data: all_social_media_notifications_json
          });
        }
      })
      .catch(err => {
        console.log("all notifiactionerr", err);
        this.setState({
          notification_data: all_social_media_notifications_json
        });
      });

    this.social_media_overview_function();

   

    all_listing_overview(data)
      .then(response => {
        console.log("all connections", response);
        this.all_connection_of_one_location_function(response.data);
      })
      .catch(res => {
        console.log("error in overview", res);
        this.setState({
          loader: false
        });
        // this.all_connection_of_one_location_function(
        //   all_connection_of_one_location_json
        // );
      });
  })


}
      
    })
  }


 get_all_icons_function =e=>{

    const data={
    secure_pin,

    "user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId")}

    console.log(data)

    all_connected_icons(data) .then(res => {
      console.log("graph",res)
      var l=res.data.con_social_array.length /2;
      this.setState({AllConnectedIcons: res.data.con_social_array.slice(0,l),
      TempAllIcons:res.data.con_social_array
    })


    }).catch=(res)=>{

    }
  }

  graph_google_customer_actions_function = e => 
  {

    var filter='';
    if(e){
      filter=e.target.value;
      this.setState({duration:filter})
    }
    const graph_google_query_data = 
    {
    "secure_pin":"digimonk",
    "user_id":localStorage.getItem("UserId") ,
    "location_id":localStorage.getItem("locationId"),
    "filter_type":filter?filter:"last month"
  };



    this.setState({ loading: true });
    graph_google_customer_actions(graph_google_query_data)
      .then(res => {
        console.log("graph",res)
        if (res.data) {
          this.setState({
            graph_google_customer_data: res.data,
            isGoogleLoggedIn: true,
            loading: false
          });
        } else {
          this.setState({
            graph_google_customer_data: graph_google_customer_actions_json(
              this.state.db_google_range
            ),
            isGoogleLoggedIn: true,
            loading: false
          });
        }
      })
      .catch(err => {
        console.log("graph google err", err);
        this.setState({
          graph_google_customer_data: graph_google_customer_actions_json(
            this.state.db_google_range
          ),
          isGoogleLoggedIn: true,
          loading: false
        });
      });
  };
  all_connection_of_one_location_function = response => {
    if (response.overviews_analytics_data) {
      this.setState({
        all_listing: response.overviews_analytics_data[0].All_listing,
        live_listing: response.overviews_analytics_data[0].Live_listing,
        processing: response.overviews_analytics_data[0].Processing,
        unavailable: response.overviews_analytics_data[0].Unavilable,
        opted_out: response.overviews_analytics_data[0].Opted_out
      });
    }

  

    this.setState({ loader: false });
  };

  business_report_insight = () => {
    this.setState({ loading: true });
    const GoogleConfig = {
      headers: { Authorization: "Bearer " + this.state.google_token }
    };
   
    const reportInsights = {
    
      locationNames: [this.state.locationIdGoogle],
      basicRequest: {
        metricRequests: [
          {
            metric: "VIEWS_MAPS",
            options: "AGGREGATED_DAILY"
          },
          {
            metric: "ACTIONS_WEBSITE",
            options: "AGGREGATED_DAILY"
          },
          {
            metric: "ACTIONS_PHONE",
            options: "AGGREGATED_DAILY"
          }
        ],

        timeRange: {
          startTime: this.state.show_states + "T01:01:23.045123456Z",
          endTime: this.state.today_date + "T23:59:59.045123456Z"
        }
      }
    };
    Axios.post(
      `https://mybusiness.googleapis.com/v4/${localStorage.getItem(
        "accountId"
      )}/locations:reportInsights`,
      reportInsights,
      GoogleConfig
    )
      .then(res => {
        console.log("google report insight", res.data);
        if (res.data.locationMetrics[0]) {
          this.setState({
            metric: res.data.locationMetrics[0].metricValues,
            loading: false
          });
        }
      })
      .catch(res => {
        console.log("error in overview");
        this.setState({
          loading: false
        });
      });
    // });
  };

  google_reply_submit = () => {
    let { google_reply_to_id, google_reply, google_token } = this.state;

    const GoogleConfig = {
      headers: { Authorization: "Bearer " + google_token }
    };

    const data = {
      comment: google_reply
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
      .then(respo => {
        console.log("google reply response", respo.data);
        this.setState({ is_google_reply: false });
      })
      .catch(respo => {
        console.log("google reply response", respo.data);
      });
  };

  dataDoughnut = (
    all_listing,
    live_listing,
    processing,
    unavailable,
    opted_out
  ) => {
    let data;
    if (all_listing != "-") {
      data = [
        { value: parseInt(all_listing), label: "All Listing" },
        { value: parseInt(live_listing), label: "Live Listing" },
        { value: parseInt(processing), label: "Processing" },
        { value: parseInt(unavailable), label: "Unavailable" },
        { value: parseInt(opted_out), label: "Opted out" },
      ];
    } else {
      data = [{ value: total_listing, label: "All listing" }];
    }
    return data;
  };

  dataBar = (date, phone, direction, website) => {
    return {
      labels: date,
      datasets: [
        {
          label: "phone call",
          data: phone,
          backgroundColor: "#8760D0",
          barThickness: 10
        },
        {
          label: "get direction",
          data: direction,
          backgroundColor: "#528AF7",
          barThickness: 10
        },
        {
          label: "website visited",
          data: website,
          backgroundColor: "#58C8F9",
          barThickness: 10
        }
      ]
    };
  };

  barChartOptions = (phone, direction, website) => {
    try{
  
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
        align: "start"
      },

      scales: {
        xAxes: [
          {
            barPercentage: 1,

            gridLines: {
              display: false,
              color: "rgba(0, 0, 0, 0.1)"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              beginAtZero: true,
              stepSize: parseInt(max_value / 10),
              max: parseInt(max_value / 10) * 12
            }
          }
        ]
      }
    };
  }catch(e){

  }
  };

  change_states = (name, db_range, range) => async e => {
    if (name == "Google customer Actions") {
      await this.setState({ db_google_range: db_range, google_range: range });
      // this.business_report_insight();
      this.graph_google_customer_actions_function();
    } else if (name == "Social Overview") {
      await this.setState({
        db_social_range: db_range,
        social_range: range
      });
      this.social_media_overview_function();
    }
  };

  social_media_overview_function = e => {
    this.setState({ social_media_overview_loader: true });
    var filter='';
if(e){
  filter=e.target.value;
}
    const overview_query_data = {
      "secure_pin":"digimonk","user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId"),
      "filter_type":filter?filter:"last week"
    };

    all_social_media_overview(overview_query_data)
      .then(res => {
        console.log(res)
        if (res.data) {
          this.setState({
            social_overview_data: res.data,
            social_media_overview_loader: false
          });
        } else {
          this.setState({
            // social_overview_data: all_social_media_overview_json(
            //   overview_query_data            ),
            social_media_overview_loader: false
          });
        }
      })
      .catch(err => {
        console.log("social overview err", err);
        this.setState({
          // social_overview_data: all_social_media_overview_json(
          //   overview_query_data          ),
          social_media_overview_loader: false
        });
      });
  };

  changeHandler = event => {
    console.log("states", this.state);
    this.setState({ [event.target.name]: event.target.value });
  };

  IconsAllLess=type=>e=>{
    console.log("ooo",type)
    if(type==="All")
    this.setState({AllConnectedIcons:this.state.TempAllIcons})
    else if(type === "Less")
    this.setState({AllConnectedIcons:this.state.AllConnectedIcons.slice(0, (this.state.TempAllIcons.length /2 ) )})
  }
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

      google_range,
      social_range,

      notification_data,
      social_overview_data,
      graph_google_customer_data,
      all_listing,
      live_listing,
      processing,
      unavailable,
      opted_out,
      social_media_overview_loader,
      AllConnectedIcons
    } = this.state;

    console.log("this.state", this.state);
    var AllIcons;

    if(AllConnectedIcons){

      AllIcons=AllConnectedIcons.map(i=>{
        return(
          <div className="google-mapd">
            <img
              src={i.icon}
              alt="google"
              height="65"
              width="65"
            />
          </div>
        )
      })

    }

    if (graph_google_customer_data) {
      var date = graph_google_customer_data.date;
       var phone = graph_google_customer_data.phone;
        var website = graph_google_customer_data.website;
        var direction = graph_google_customer_data.direction;

        var dura= this.state.duration;

        if(dura && date)

        if(dura === 'last week')
        {
          date=date.slice(0,7);
        }
        else if(dura === "last month"){
          date=date.slice(0,30);
        }
        else if(dura === "last 3 months"){
          date=date.slice(0,90);
        }
        else if(dura === "last 6 months"){
          date=date.slice(0,180);
        }
        else if(dura === "last year"){
          date=date.slice(0,365);
        }

        console.log("gra",phone);
        console.log("gra",website)
    }

    let total_notifications =
      notification_data &&
      notification_data.Notification.map(data => (
        <div>
          <MDBRow>
            <MDBCol md="1" style={{padding:'0px'}}>
                <img
                  src={"https://dashify.biz" + data.media_image}
                  alt=""
                  className='overview_icon'
                />
            </MDBCol>

            <MDBCol md="7" >
              <div className="recent-title">
                
                {data.head}
              </div>
            </MDBCol>
            <MDBCol md="4" style={{ marginTop: "2px" }}>
              <MDBRow>
                <MDBCol md="6" style={{ padding: "0px" }}>
                  <a href={data.link} className="btn-primary ">
                    Comment
                  </a>
                </MDBCol>

                <MDBCol md="6" style={{ padding: "0px" }}>
                  <div className="recent-hour">{data.time}</div>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <p className="recent-text">
                {data.description
                  ? data.description.length > 160
                    ? data.description.slice(0, 160) + "..."
                    : data.description
                  : ""}
              </p>
            </MDBCol>
          </MDBRow>
        </div>
      ));

    let total_social_overview = [];
    let index = 0;

    if(social_overview_data.social_overviews_analytics_data)
    social_overview_data &&
      social_overview_data.social_overviews_analytics_data.map((data, i) => {
        if (i <= 3) {
          total_social_overview[i] = (
            <div class=" col-md-6 ">
              <div class="card social-10 ">
                <div className="fb-socails">
                  <img src={data.icon} alt="" />
                </div>

                <div className="row card_jump">
                  {data.parameters.map((data2, i2) => (
                    <div className="col-sm-4 social-11">
                      <h6>{data.values[i2]}</h6>
                      {/* <p>+10,03% </p>  */}
                      <a class="link-social" role="button">
                        {data2}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }
      });

    // total_social_overview[0] = (
    //   <div class=" col-md-6 ">
    //     <div class="card social-10 ">
    //       <div className="fb-socails">
    //         <img src={require("../images/facebook.png")} alt="" />
    //       </div>

    //       <div className="row card_jump">
    //         <div className="col-sm-4 social-11">
    //           <h6>-</h6>
    //           {/* <p>+10,03% </p>  */}
    //           <a class="link-social" role="button">
    //             Views
    //           </a>
    //         </div>
    //         <div className="col-sm-4 social-11">
    //           <h6>-</h6>
    //           {/* <p>+10,03% </p>  */}
    //           <a class="link-social" role="button">
    //             Direction
    //           </a>
    //         </div>
    //         <div className="col-sm-4 social-11">
    //           <h6>-</h6>
    //           {/* <p>+10,03% </p>  */}
    //           <a class="link-social" role="button">
    //             Calls
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );

    let total_listing_images = [];

    {
      all_connections.map(data => (
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
                </li>
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
                </li>
              ])
            : ""}

          {data.name == "Yelp"
            ? (total_listing_images = [
                ...total_listing_images,
                <li>
                  <div className="google-mapd">
                    <img src={require("../images/yelp.png")} alt="yelp" />
                  </div>
                </li>
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
                </li>
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
                </li>
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
                </li>
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
                </li>
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
                </li>
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
                </li>
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
                </li>
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
                </li>
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
                </li>
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
                </li>
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
                </li>
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
                     
                        {view_notification_type1 == false
                          ? (<div >View All <ArrowRightIcon /></div>)
                          : (<div >View Less <ArrowDownIcon /></div>)}
                      
                      
                    </div>
                  </div>
                  <div className="card7">
                
                    {total_notifications.length != 0 ? (
                      <div className="notifc">
                          <div class="scrollbar">
    <div class="overflow">
                        {view_notification_type1 == false ? (
                          total_notifications.length > 3 ? (
                            <div>
                              {total_notifications[0]}
                              {total_notifications[1]}
                              {total_notifications[2]}
                              {total_notifications[3]}
                            </div>
                          ) : (
                          {total_notifications}
                            
                          )
                        ) : (
                          total_notifications
                        )}
                      </div>
                      </div>
                </div> ) : (
                      <div className="col-md-12" >
                        <h4 className='connect_msg'>No New Notification</h4>
                      </div>
                    )}
                    </div>
  </div>
                 

                <div className="col-md-6  recent_noti">
                  <div className="recent-9">
                    <h3>Social Overview</h3>

                    <div className="camgianbox">
                    <select  className="review_select_btn"  onChange={this.social_media_overview_function}>
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
                                Last 3 Months
                              </option>

                              <option
                              value= "last 6 months"
                              >
                                Last 6 Months
                              </option>
                              <option
                              value = "last year"
                              >
                                Last Year
                              </option>
                            </select>
                     
                    </div>
                  </div>
                  <div class="row">
                   

                    {this.state.social_media_overview_loader ? (
                      <div style={{ textAlign: "center" }}>
                        <Loader2
                          type="Oval"
                          color="#00BFFF"
                          height={25}
                          width={25}
                          // timeout={3000} //3 secs
                        />
                      </div>
                    ) : total_social_overview.length != 0 ? (
                      total_social_overview
                    ) : (
                      <div className="col-md-12">
                        <h4 className='connect_msg'>Please Connect Some Listing</h4>
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
                        <img src={require("../images/j.png")} alt="" />
                        <div className="socialdiv">
                          <h3>
                            {all_listing != "-" ? all_listing : total_listing}
                          </h3>
                          <span>All Listing</span>
                        </div>
                      </li>

                      <li>
                        <img src={require("../images/k.png")} alt="" />
                        <div className="socialdiv">
                          <h3> {live_listing}</h3>
                          <span>Live Listing</span>
                        </div>
                      </li>
                      <li>
                        <img src={require("../images/l.png")} alt="" />
                        <div className="socialdiv">
                          <h3>{processing}</h3>
                          <span>Processing</span>
                        </div>
                      </li>

                      <li>
                        <img src={require("../images/m.png")} alt="" />
                        <div className="socialdiv">
                          <h3>{unavailable}</h3>
                          <span>Unavailable</span>
                        </div>
                      </li>
                      <li>
                        <img src={require("../images/n.png")} alt="" />
                        <div className="socialdiv">
                          <h3>{opted_out}</h3>
                          <span>Opted Out</span>
                        </div>
                      </li>
                    </ul>
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
                            
                              {total_listing_images[0]}
                              {total_listing_images[1]}
                              {total_listing_images[2]}
                              {total_listing_images[3]}
                              {total_listing_images[4]}
                            
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
                                  view_notification_type2: false
                                })
                              : this.setState({
                                  view_notification_type2: true
                                })
                          }
                          className='view_less_all2'
                        ><MDBRow>
                          <MDBCol md='8' style={{display:'flex'}}>
                          {AllIcons}
                          </MDBCol>
                          <MDBCol md='4' style={{padding:'0px'}}>
                          {view_notification_type2 == false
                            ? (<div onClick={this.IconsAllLess("All")} style={{textDecoration:'none'}}>View All <ArrowRightIcon /></div>)
                            : (<div onClick={this.IconsAllLess("Less")} style={{textDecoration:'none'}}>View Less <ArrowDownIcon /></div>)}
                          </MDBCol>
                        </MDBRow>
                          
                          
                        </a>
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
                      innerRadius={0.6}
                      clickToggle={false}
                      formatValues={(values, total) =>
                        `${parseInt((values / total) * 100)}%`
                      }
                      colors={["#8264C6", "#634A9B", "#EB05B8", "#3380cc"]}
                      strokeColor={"	false"}
                      data={this.dataDoughnut(
                        all_listing,
                        live_listing,
                        processing,
                        unavailable,
                        opted_out
                      )}
                    />
                  </div>
                </div>
                <div class="col-md-8">
                  <div className="recent-9">
                    <h3>Average Google Customer Actions</h3>

                    <div className="camgianbox">
                    <select  className="review_select_btn" onChange={this.graph_google_customer_actions_function} >
                              {/* <option selected
                                value= "last week"
                              >
                                Last week
                              </option> */}
                              <option
                              value = "last month"
                              >
                                Last Month
                              </option>

                              <option
                              value= "last 3 months"
                              >
                                Last 3 Months
                              </option>

                              <option
                              value= "last 6 months"
                              >
                                Last 6 Months
                              </option>
                              <option
                              value = "last year"
                              >
                                Last Year
                              </option>
                            </select>
                      {/* <div className="dropdown">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          {google_range}
                        </a>
                        <div className="dropdown-menu">
                          <ul>
                            <li
                              onClick={this.change_states(
                                "Google customer Actions",
                                "week",
                                "Last week"
                              )}
                            >
                              Last week
                            </li>
                            <li
                              onClick={this.change_states(
                                "Google customer Actions",
                                "month",
                                "Last month"
                              )}
                            >
                              Last month
                            </li>
                            <li
                              onClick={this.change_states(
                                "Google customer Actions",
                                "3 months",
                                "Last 3 months"
                              )}
                            >
                              Last 3 months
                            </li>
                            <li
                              onClick={this.change_states(
                                "Google customer Actions",
                                "6 months",
                                "Last 6 months"
                              )}
                            >
                              Last 6 months
                            </li>
                            <li
                              onClick={this.change_states(
                                "Google customer Actions",
                                "year",
                                "Last year"
                              )}
                            >
                              Last year
                            </li>
                          </ul>
                        </div>
                      </div>
                    */}
                    </div>
                  </div>
                  <div class="card4">
                    {isGoogleLoggedIn ? (
                      // this.state.metric.length > 0 ? (
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
                      // ) : (
                      //   <h4>No analytics of this Google account</h4>
                      // )
                      <h4 className='connect_msg'>Please Connect Google To See Graph</h4>
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
