import React, { Component } from "react";
import Axios from "axios";
import { all_connection_of_one_location } from "./apis/social_platforms";
import Spinner from "./common/Spinner";
import { PieChart } from "react-minimal-pie-chart";
import Chart from "react-google-charts";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import rev_gen_img1 from "./assets/rev_gen_img1.png";
import rev_gen_img2 from "./assets/rev_gen_img2.png";
import rev_gen_img3 from "./assets/rev_gen_img3.png";
import rev_gen_img4 from "./assets/rev_gen_img4.png";
import { secure_pin } from "../config";
import { Review_Generation_Stats } from "./apis/review";
import DonutChart from "react-donut-chart";
 import PromotionalPostSorry from "./promotional-post-sorry";


export default class ReviewGenerationStats extends Component {
  state = {
    loader: true,

    fb_reviews: "",
    google_reviews: "",

    google_average_rating: 0,
    google_all_reviews: 0,
    fb_average_rating: 0,
    fb_all_reviews: 0,
    yelp_average_rating: 0,
    yelp_all_reviews: 0,
    foursquare_average_rating: 0,
    foursquare_all_reviews: 0,

    isGoogleLoggedIn: false,
    isFbLoggedIn: false,

    today: "",
    days: [],
    months: [],
    years: [],

    all_connections: [],
    google_fb_dataPoints: [],
    dailyClicked: false,
    monthlyClicked: true,
    yearlyClicked: false,
    campaign_count: "-",
    AtleastOne:true,
    TotalCampaign:0
  };

  componentDidMount = () => {


    // const data = {
    //   secure_pin,"user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId")
    // };
   
    // all_connection_of_one_location(data, {})
    //   .then(resp => {
    //     console.log("get all connections by id s", resp);
    //     this.setState({ all_connections: resp.data.social_media_list });

    //     this.state.all_connections.map(l => {
    //     if (l.connect_type == "Facebook") {
               

    //       this.setState({
    //         fbIsLoggedIn: true,
            
    //       });
    //     }

    //     if (l.connect_type === "Google") {
         
    //       this.setState({
    //         googleIsLoggedIn: true,
           
    //       });
    //     }
    //   })
    const data2={
      secure_pin,"user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId")

      ,"filter_type":"last week"
    }

    Review_Generation_Stats(data2).then(resp=>{
      console.log("lo",resp); 

      if(resp.data.status === '1')
      this.setState({loader:false, 
        TotalCampaign:resp.data.campaign_list[0].total_campaign,
        OverallRating:resp.data.campaign_list[0].Overall_rating,
        NumberOfReviews:resp.data.campaign_list[0].total_reviewer,
        InvitesSent:resp.data.campaign_list[0].invites_sent,

        TrafficChart:resp.data.traffic_chart,
        GraphChart:resp.data.graph_data1,
        GraphChartCampaign:resp.data.graph_data2

      
      })
      else{
        this.setState({loader:false})
      }


      })
    .catch(resp=>{
      console.log(resp);
      this.setState({loader:false})
    })


  // }).catch(resp=>{

  // })
    var today = new Date();

    // var day0 = today;
    // var day1 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 1
    // );

    // var day2 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 2
    // );

    // var day3 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 3
    // );

    // var day4 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 4
    // );

    // var day5 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 5
    // );

    // var day6 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 6
    // );

    // var day7 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 7
    // );

    // var day8 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 8
    // );

    // var day9 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 9
    // );

    // var month0 = today;

    // var month1 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 30
    // );

    // var month2 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 60
    // );

    // var month3 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 90
    // );

    // var month4 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 120
    // );

    // var month5 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 150
    // );

    // var month6 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 180
    // );

    // var month7 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 210
    // );

    // var month8 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 240
    // );

    // var month9 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 270
    // );

    // var month10 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 300
    // );

    // var month11 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 330
    // );

    // var month12 = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 360
    // );

    // this.setState({
    //   today,
    //   days: [day0, day1, day2, day3, day4, day5, day6, day7, day8, day9]
    // });

    // this.setState({
    //   months: [
    //     month0,
    //     month1,
    //     month2,
    //     month3,
    //     month4,
    //     month5,
    //     month6,
    //     month7,
    //     month8,
    //     month9,
    //     month10,
    //     month11
    //   ]
    // });

    // var year0 = today.getFullYear();

    // this.setState({
    //   years: [
    //     year0,
    //     year0 - 1,
    //     year0 - 2,
    //     year0 - 3,
    //     year0 - 4,
    //     year0 - 5,
    //     year0 - 6,
    //     year0 - 7,
    //     year0 - 8,
    //     year0 - 9,
    //     year0 - 10
    //   ]
    // });

    // var yelpUrl,
    //   fourUrl,
    //   appleUrl,
    //   citysearchUrl,
    //   fbtoken,
    //   fbPageId,
    //   googleToken,
    //   locationIdGoogle;
    //   const data = {
    //     secure_pin,"user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId")
    //   };
  

    // // Axios.post(
    // //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/locations/get-all-connection-of-one-location",
    // //   data,
    // //   DjangoConfig
    // // )
    // all_connection_of_one_location(data, DjangoConfig)
    //   .then(response => {
    //     console.log(response);

    //     response.data.social_media_list.map((l) => {
    //       if (l.connect_type == "Facebook") {
    //         fbtoken = l.Social_Platform.Token;
    //         console.log(fbtoken);
    //         fbPageId = l.Social_Platform.Other_info;
    //       }

    //       if (l.connect_type == "Google") {
    //         console.log("yes goo");
    //         this.setState({google_reviews:55})
    //         // googleToken = l.Social_Platform.Token;
    //         // console.log(googleToken);
    //         // this.setState({ locationIdGoogle: l.Social_Platform.Other_info });
    //       }
    //       if (l.connect_type == "Facebook") {
    //         console.log("yes goo");
    //         this.setState({fb_reviews:55})
    //         // googleToken = l.Social_Platform.Token;
    //         // console.log(googleToken);
    //         // this.setState({ locationIdGoogle: l.Social_Platform.Other_info });
    //       }

    //       if (l.connect_type== "Foursquare") {
    //         console.log("yes four");

    //         fourUrl = l.Social_Platform.Other_info.split(",")[0]
    //           .slice(7)
    //           .split("/")[5];
    //       }

    //       if (l.connect_type == "Yelp") {
    //         console.log("yes yelp");

    //         // yelpUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);
    //       }

    //     });
    //     const GoogleConfig = {
    //       headers: { Authorization: "Bearer " + googleToken }
    //     };

    //     // for facebook
    //     if (fbtoken) {
    //       Axios.get(
    //         "https://graph.facebook.com/me/accounts?fields=access_token,id,name,overall_star_rating,category,category_list,tasks&access_token=" +
    //           fbtoken
    //       ).then(res => {
    //         console.log("facebook data", res.data);
    //         var fbPageAccessToken, index;
    //         for (let i = 0; i < res.data.data.length; i++) {
    //           if (res.data.data[i].id == fbPageId) {
    //             fbPageAccessToken = res.data.data[i].access_token;
    //             index = i;
    //           }
    //         }
    //         Axios.get(
    //           "https://graph.facebook.com/" +
    //             fbPageId +
    //             "/ratings?fields=has_rating,review_text,created_time,has_review,rating,recommendation_type&access_token=" +
    //             fbPageAccessToken
    //         ).then(resp => {
    //           console.log("facebook page data", resp.data.data);
    //           this.setState({
    //             fb_reviews: resp.data.data,
    //             fb_all_reviews: resp.data.data.length,
    //             fb_average_rating: res.data.data[index].overall_star_rating,
    //             isFbLoggedIn: true
    //           });
    //           this.setState({
    //             all_connections: [
    //               ...this.state.all_connections,
    //               { name: "Facebook" }
    //             ]
    //           });

    //           this.monthlyLineGraph();
    //         });
    //       });
    //     }

    //     // for yelp
    //     if (yelpUrl) {
    //       Axios.get(
    //         "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
    //           yelpUrl.slice(25),
    //         Yelpconfig
    //       ).then(resp => {
    //         console.log("yelpDetails", resp.data);
    //         this.setState({
    //           yelp_all_reviews: resp.data.review_count,
    //           yelp_average_rating: resp.data.rating
    //         });
    //         this.setState({
    //           all_connections: [...this.state.all_connections, { name: "Yelp" }]
    //         });
    //       });
    //     }

    //     // for google
    //     if (googleToken) {
    //       Axios.get(
    //         "https://mybusiness.googleapis.com/v4/accounts/",
    //         GoogleConfig
    //       ).then(res => {
    //         console.log(res.data);
    //         localStorage.setItem("accountId", res.data.accounts[0].name);

    //         Axios.get(
    //           "https://mybusiness.googleapis.com/v4/" +
    //             locationIdGoogle +
    //             "/reviews",
    //           GoogleConfig
    //         ).then(respo => {
    //           console.log("google reviews", respo.data);
    //           this.setState({
    //             google_reviews: respo.data.reviews ? respo.data.reviews : "",
    //             google_all_reviews: respo.data.reviews
    //               ? respo.data.reviews.length
    //               : 0,
    //             google_average_rating: respo.data.averageRating
    //               ? respo.data.averageRating
    //               : 0,
    //             isGoogleLoggedIn: true
    //           });
    //           this.monthlyLineGraph();
    //           this.setState({
    //             all_connections: [
    //               ...this.state.all_connections,
    //               { name: "Google" }
    //             ]
    //           });
    //         });
    //       });
    //     }

    //     // For foursquare
    //     if (fourUrl) {
    //       Axios.get(
    //         "https://api.foursquare.com/v2/venues/" +
    //           fourUrl +
    //           "?client_id=TEUSFAUY42IR0HGTPSWO1GFLC5WHX3PIBKVICAQRZQA0MTD1&client_secret=CYBQFK0YRBPFE54NARAEJCG2NLBARIU2OOIJNE0AZOHWZTXU&v=20180323"
    //       ).then(res => {
    //         console.log("foursquare", res.data);
    //         if (res.data && res.data.response && res.data.response.venue) {
    //           this.setState({
    //             foursquare_average_rating: res.data.response.venue.rating
    //               ? res.data.response.venue.rating / 2
    //               : 0,
    //             foursquare_all_reviews: res.data.response.venue.tips.count
    //           });
    //         }
    //         this.setState({
    //           all_connections: [
    //             ...this.state.all_connections,
    //             { name: "Foursquare" }
    //           ]
    //         });
    //       });
    //     }

    //     // apple
    //     // if (appleUrl) {
    //     //   Axios.get(
    //     //     "https://itunes.apple.com/in/rss/customerreviews/id=" +
    //     //       appleUrl +
    //     //       "/sortBy=mostRecent/json"
    //     //   ).then(res => {
    //     //     console.log("apple data in json", res);

    //     //     this.setState({
    //     //       appleReviews: res.data.feed.entry,
    //     //       appleDetails: res,
    //     //       appleReviewCount: res.data.feed.entry.length
    //     //     });
    //     //     this.setState({
    //     //      all_connections: [...this.state.all_connections, { name: "Apple" }]
    //     //      });
    //     //   });
    //     // }

    //     // citysearch
    //     // if (citysearchUrl) {
    //     //   console.log("inside citysearchUrl");
    //     //   Axios.get(
    //     //     "https://cors-anywhere.herokuapp.com/https://api.citygridmedia.com/content/reviews/v2/search/where?listing_id=" +
    //     //       citysearchUrl +
    //     //       "&publisher=test"
    //     //   ).then(res => {
    //     //     console.log("citysearchUrl response", res);

    //     //     var XMLParser = require("react-xml-parser");
    //     //     var xml = new XMLParser().parseFromString(res.data); // Assume xmlText contains the example XML
    //     //     console.log(xml);
    //     //     console.log(xml.getElementsByTagName("review"));
    //     //     this.setState({
    //     //       citysearchReviews: xml.getElementsByTagName("review"),
    //     //       citysearchDetails: xml,
    //     //       citysearchReviewCount: xml.getElementsByTagName("review").length
    //     //     });
    //     //     this.setState({
    //     //        all_connections: [...this.state.all_connections, { name: "Citysearch" }]
    //     //      });
    //     //     this.citysearch_star_counting(xml.getElementsByTagName("review"));
    //     //   });
    //     // }

    //     this.setState({ loader: false });
    //   })
    //   .catch(res => {
    //     console.log("error in review generation stats", res);
    //     this.setState({ loader: false });
    //   });

    // Axios.get(
    //   "https://cors-anywhere.herokuapp.com/http://dashify.biz/api/campaign/get-all-campaign",
    //   DjangoConfig
    // ).then(res => {
    //   let all_campaign = res.data.all_campaign;
    //   let campaign_count = 0;
    //   all_campaign.map(data => {
    //     if (data.BusinessLocation == this.props.match.params.locationId) {
    //       campaign_count++;
    //     }
    //   });
    //   this.setState({ campaign_count });
    // });
  };

  dailyLineGraph = () => {
    console.log("clicked dailyLineGraph");
    let {
      fb_reviews,
      google_reviews,

      today,
      days
    } = this.state;

    this.setState({
      yearlyClicked: false,
      monthlyClicked: false,
      dailyClicked: false
    });

    // 2nd chart
    let create_time1 = "",
      create_time2 = "";
    // let dataPoints1 = [],
    //   dataPoints2 = [];
    let google_fb_dataPoints = [["x", "Google", "Facebook"]];
    for (let i = 0; i < days.length; i++) {
      let a1 = 0,
        a2 = 0;
      for (let j = 0; j < google_reviews.length; j++) {
        create_time1 = google_reviews[j].createTime;
        if (parseInt(create_time1.slice(0, 4)) == days[i].getFullYear()) {
          if (parseInt(create_time1.slice(5, 7)) == days[i].getMonth() + 1) {
            if (parseInt(create_time1.slice(8, 10)) == days[i].getDate()) {
              a1++;
            }
          }
        }
      }

      for (let j = 0; j < fb_reviews.length; j++) {
        create_time2 = fb_reviews[j].created_time;
        if (parseInt(create_time2.slice(0, 4)) == days[i].getFullYear()) {
          if (parseInt(create_time2.slice(5, 7)) == days[i].getMonth() + 1) {
            if (parseInt(create_time2.slice(8, 10)) == days[i].getDate()) {
              a2++;
            }
          }
        }
      }
      // dataPoints1.push({ y: a1, label: (days[i] + "").slice(0, 15) });
      // dataPoints2.push({ y: a2, label: (days[i] + "").slice(0, 15) });
      google_fb_dataPoints.push([(days[i] + "").slice(0, 15), a1, a2]);
    }
    // 2nd chart end
    // this.setState({ dataPoints1, dataPoints2, dailyClicked: true });
    this.setState({
      google_fb_dataPoints,
      dailyClicked: true
    });
  };

  monthlyLineGraph = () => {
    console.log("clicked monthlyLineGraph");
    let {
      fb_reviews,
      google_reviews,

      today,
      months
    } = this.state;

    this.setState({
      yearlyClicked: false,
      monthlyClicked: false,
      dailyClicked: false
    });

    // 2nd chart
    let create_time1 = "",
      create_time2 = "";
    // let dataPoints1 = [],
    //   dataPoints2 = [];
    let google_fb_dataPoints = [["x", "Google", "Facebook"]];
    for (let i = 0; i < months.length; i++) {
      let a1 = 0,
        a2 = 0;
      for (let j = 0; j < google_reviews.length; j++) {
        create_time1 = google_reviews[j].createTime;
        if (parseInt(create_time1.slice(0, 4)) == months[i].getFullYear()) {
          if (parseInt(create_time1.slice(5, 7)) == months[i].getMonth() + 1) {
            a1++;
          }
        }
      }
      for (let j = 0; j < fb_reviews.length; j++) {
        create_time2 = fb_reviews[j].created_time;
        if (parseInt(create_time2.slice(0, 4)) == months[i].getFullYear()) {
          if (parseInt(create_time2.slice(5, 7)) == months[i].getMonth() + 1) {
            a2++;
          }
        }
      }
      // dataPoints1.push({ y: a1, label: (months[i] + "").slice(0, 15) });
      // dataPoints2.push({ y: a2, label: (months[i] + "").slice(0, 15) });
      google_fb_dataPoints.push([(months[i] + "").slice(0, 15), a1, a2]);
    }

    // 2nd chart end
    // this.setState({ dataPoints1, dataPoints2, monthlyClicked: true });
    this.setState({
      google_fb_dataPoints,
      monthlyClicked: true
    });
  };

  yearlyLineGraph = () => {
    console.log("clicked yearlyLineGraph");
    let {
      fb_reviews,
      google_reviews,

      today,
      years
    } = this.state;

    this.setState({ yearlyClicked: false, monthlyClicked: false });

    // 2nd chart
    let create_time1 = "",
      create_time2 = "";
    // let dataPoints1 = [],
    //   dataPoints2 = [];
    let google_fb_dataPoints = [["x", "Google", "Facebook"]];
    for (let i = 0; i < years.length; i++) {
      let a1 = 0,
        a2 = 0;
      for (let j = 0; j < google_reviews.length; j++) {
        create_time1 = google_reviews[j].createTime;
        if (parseInt(create_time1.slice(0, 4)) == years[i]) {
          a1++;
        }
      }
      for (let j = 0; j < fb_reviews.length; j++) {
        create_time2 = fb_reviews[j].created_time;
        if (parseInt(create_time2.slice(0, 4)) == years[i]) {
          a2++;
        }
      }
      // dataPoints1.push({ y: a1, label: (years[i] + "").slice(0, 4) });
      // dataPoints2.push({ y: a2, label: (years[i] + "").slice(0, 4) });
      google_fb_dataPoints.push([(years[i] + "").slice(0, 15), a1, a2]);
    }

    // 2nd chart end
    this.setState({
      google_fb_dataPoints,
      yearlyClicked: true
    });
  };

  filterUpdate=e=>{
    this.setState({loader:true})
    const data2={
      secure_pin,"user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId")

      ,"filter_type":e.target.value
    }

    Review_Generation_Stats(data2).then(resp=>{
      console.log("lo",resp);
      if(resp.data.status === "1")
      this.setState({loader:false, 
        TotalCampaign:resp.data.campaign_list[0].total_campaign,
        OverallRating:resp.data.campaign_list[0].Overall_rating,
        NumberOfReviews:resp.data.campaign_list[0].total_reviewer,
        InvitesSent:resp.data.campaign_list[0].invites_sent,

        TrafficChart:resp.data.traffic_chart,
        GraphChart:resp.data.graph_data1,
        GraphChartCampaign:resp.data.graph_data2

      
      })
      else
      this.setState({loader:false, 
        TotalCampaign:0,
      })



      })
    .catch(resp=>{
      console.log(resp);
      this.setState({loader:false})
    })


  }

  
  render() {
    let {
      fb_reviews,
      google_reviews,

      google_all_reviews,
      google_average_rating,
      fb_all_reviews,
      fb_average_rating,
      yelp_all_reviews,
      yelp_average_rating,
      foursquare_all_reviews,
      foursquare_average_rating,

      // dataPoints1,
      // dataPoints2,
      google_fb_dataPoints,
      dailyClicked,
      monthlyClicked,
      yearlyClicked,

      all_connections,
      fbIsLoggedIn,
      googleIsLoggedIn,
      campaign_count,

      TotalCampaign,
        OverallRating,
        NumberOfReviews,
        InvitesSent,

        TrafficChart,
        GraphChart,
        GraphChartCampaign,
        AtleastOne
    } = this.state;

    console.log("this.state", this.state);

    var GraphData=  [
      
     
    
    
      ]

      if(GraphChart || GraphChartCampaign){
        if(GraphChart.length>GraphChartCampaign.length){

          GraphChart.map(g=>{
            GraphData.push(["x", "Reviews", "Compaign"])

            GraphChartCampaign.map(c=>{
              
              (g.filter_date === c.filter_date) ? 

              GraphData.push([g.filter_date, parseInt(g.total),parseInt(c.total)])
              :
              GraphData.push([g.filter_date, parseInt(g.total),0])


            })

            
          })

        }

        else{

          GraphChartCampaign.map(g=>{
            GraphData.push(["x",  "Compaign","Reviews"])

            GraphChart.map(c=>{
              
              (g.filter_date === c.filter_date) ? 

              GraphData.push([g.filter_date, parseInt(g.total),parseInt(c.total)])
              :
              GraphData.push([g.filter_date, parseInt(g.total),0])


            })

            
          })

        }
       
      }

      console.log("dada",GraphData)

    let a = 0;
    a =
      a +
      (google_average_rating != 0 ? 1 : 0) +
      (fb_average_rating != 0 ? 1 : 0) +
      (yelp_average_rating != 0 ? 1 : 0) +
      (foursquare_average_rating != 0 ? 1 : 0);

    const all_reviews =
      google_all_reviews +
      fb_all_reviews +
      yelp_all_reviews +
      foursquare_all_reviews;

    const average_rating =
      a == 0
        ? "-"
        : (google_average_rating +
            fb_average_rating +
            yelp_average_rating +
            foursquare_average_rating) /
          a;


          var pieGraphData=[], TrafficData;
          if(TrafficChart){
            
          TrafficData=  TrafficChart.map(a=>{
              var temp={
                title: a.social_name, value: a.percent
                // , color: "#ffb92d"
                 //value: a.total_reviews, label:a.connect_type 
              };
             
              pieGraphData.push(temp);

              return(<div>
                <div className="pie_contant">{a.social_name}</div>
                <div id="fb_perc">
                  {a.percent
                    ? a.percent
                    : "-"}
                </div>
              </div>)
              
            })
          }
          console.log(pieGraphData)
          var finalData={
            datasets:pieGraphData
          }
    // const dataMock = [
    //   { title: "Google", value: 55, color: "#ffb92d" },
    //   { title: "Facebook", value: 24, color: "#0460ea" },
    //   {
    //     title: "Other sites",
    //     value: 11,
    //     color: "#04e38a"
    //   }
    //   // { title: "Foursquare", value: foursquare_all_reviews, color: "#04e38a" }
    // ];
    return (
      <div>
       
          
          <MDBContainer>
            <MDBRow>
              <MDBCol md="7" className="setting-10">
                <h3> Review Generation Stats</h3>
              </MDBCol>

              <MDBCol md="2">
                <select
                  className="review_select_btn"
                  style={{ marginTop: "35px" }}
                  onChange={this.filterUpdate}
                >
                 <option value="last week">Last Week</option>
  <option value="last month">Last Month</option>
  <option value="last 3 months">Last 3 Months</option>
  <option value="last 6 months">Last 6 Months</option>
  <option value="last year">Last Year</option>
  <option value="all">Lifetime</option>
                </select>
              </MDBCol>
              <MDBCol md="3" style={{ marginTop: "25px" }}>
                <MDBBtn
                  onClick={() =>
                    this.props.history.push({
                      pathname: `review-generation-campaign`
                    })
                  }
                  id="btn_review_gen"
                >
                  Create A New Campaign
                </MDBBtn>
              </MDBCol>
            </MDBRow>

            {this.state.loader ? (
          <div className="rightside_title">
            <Spinner />
          </div>
        ) : (
          
            ( parseInt( TotalCampaign) === 0)?
          <PromotionalPostSorry />
          :<div>
            <MDBRow>
              <MDBCol md="4" className="review_container">
                
                  <MDBRow>
                    <div id="traffic_chart">Traffic Chart</div>
                  </MDBRow>
                  {pieGraphData ? (
                    <MDBRow>
                      <MDBCol md="8">
                        {/* {all_reviews != 0 ? ( */}
                          <div className="text-center mt-30">
                            {/* <img src={require("../images/pie-chart-2.jpg")} /> */}
                            {/* pie chart */}
                            {/* <PieChart
                              data={dataMock}
                              lineWidth={23}
                              rounded
                              //   style={{ height: "220px" }}
                            /> */}
                            {/* pie chart */}

                            <div className="whitechart" style={{padding:'28px 45px'}}>
                            <DonutChart
                      legend={false}
                     responsive={true}
                      height={200}
                      width={200}
                      loader={<div>Loading Chart</div>}
                      outerRadius={0.95}
                      innerRadius={0.6}
                      clickToggle={false}
                      formatValues={(values) =>
                        `${parseInt((values))}%`
                      }
                     // colors={["#8264C6", "#634A9B", "#EB05B8", "#3380cc","red","blue","green","orange"]}
                      strokeColor={"false"}
                      data={pieGraphData}
                      rootProps={{ "data-testid": "1" }}
                    />
                    </div>
                          </div>
                         
                        {/* ) : (
                          ""
                        )} */}
                      </MDBCol>

                      <MDBCol md="4">

                        {TrafficData}
                        {/* <div>
                          <div className="pie_contant">Facebook</div>
                          <div id="fb_perc">
                            {all_reviews == 0
                              ? "-"
                              : ((fb_all_reviews / all_reviews) * 100)
                                  .toString()
                                  .slice(0, 4) + "%"}
                          </div>
                        </div>

                        <div>
                          <div className="pie_contant">Google</div>
                          <div id="google_perc">
                            {all_reviews == 0
                              ? "-"
                              : ((google_all_reviews / all_reviews) * 100)
                                  .toString()
                                  .slice(0, 4) + "%"}
                          </div>
                        </div>

                        <div>
                          <div className="pie_contant">Yelp</div>
                          <div id="twitter_perc">
                            {all_reviews == 0
                              ? "-"
                              : ((yelp_all_reviews / all_reviews) * 100)
                                  .toString()
                                  .slice(0, 4) + "%"}
                          </div>
                        </div>

                        <div>
                          <div className="pie_contant">Foursquare</div>
                          <div id="dribble_perc">
                            {all_reviews == 0
                              ? "-"
                              : ((foursquare_all_reviews / all_reviews) * 100)
                                  .toString()
                                  .slice(0, 4) + "%"}
                          </div>
                        </div> */}
                      </MDBCol>
                    </MDBRow>
                  ) : (
                    <h4 className='connect_msg1'>No data available</h4>
                  )}
              </MDBCol>
              <MDBCol md="8">
                <div className="review_container">
                  {/* <MDBRow>
                    <MDBCol md='1'>
                    <a onClick={this.dailyLineGraph}
    className={dailyClicked ? "review_period_active" : "review_period"}>Daily</a>
                      </MDBCol>

                      <MDBCol md='1'>
                    <a onClick={this.dailyLineGraph}
    className={dailyClicked ? "review_period_active" : "review_period"}>Weekly</a>
                      </MDBCol>

                      <MDBCol md='1'>
                    <a onClick={this.monthlyLineGraph}
    className={monthlyClicked ? "review_period_active" : "review_period"}>Monthly</a>
                      </MDBCol>

                      <MDBCol md='1'>
                    <a  onClick={this.yearlyLineGraph}
    className={yearlyClicked ? "review_period_active" : "review_period"}>Yearly</a>
                      </MDBCol>
                  </MDBRow>  */}
                      <div>
                        {GraphData  ? (
                          <Chart
                            width={"600px"}
                            height={"400px"}
                            chartType="LineChart"
                            loader={<div>Loading Chart...</div>}
                            data= {GraphData
                            }
                            options={{
                              hAxis: {
                                title: "Day"
                              },
                              vAxis: {
                                title: "Reviews"
                              },
                              // series: {
                              //   0: { curveType: "function" },
                              //   1: { curveType: "function" }
                              // }
                            }}
                            rootProps={{ "data-testid": "2" }}
                          />
                        ) : (
                          <div className="viewallreview traffic-chartbox">
                            <h4 className='connect_msg1'>
                              No data Available
                            </h4>
                          </div>
                        )}
                      </div>

                      {/* line chart */}
                    
                </div>
              </MDBCol>
            </MDBRow>
            <div style={{ paddingRight: "13px" }}>
              <MDBRow className="review_container">
                <MDBCol md="2" className="rev_gen_contant4">
                  Campaign List
                </MDBCol>
                <MDBCol md="10">
                  <MDBRow>
                    <MDBCol md="3">
                      <div className="rev_gen_cards">
                        <MDBRow>
                          <MDBCol md="3">
                            <img
                              src={rev_gen_img1}
                              alt=""
                              className="rev_gen_icon"
                            />
                          </MDBCol>

                          <MDBCol md="9">
                            <MDBRow>
                              <MDBCol md="5" className="rev_gen_contant1">
                                {TotalCampaign?TotalCampaign:"-"}
                              </MDBCol>
                              {/* <MDBCol md="6" className="rev_gen_contant3">
                                <span>+</span>
                                <span>01.03%</span>
                              </MDBCol> */}
                            </MDBRow>
                            <MDBRow className="rev_gen_contant2">
                              Total Campaign
                            </MDBRow>
                          </MDBCol>
                        </MDBRow>
                      </div>
                    </MDBCol>

                    <MDBCol md="3">
                      <div className="rev_gen_cards">
                        <MDBRow>
                          <MDBCol md="3">
                            <img
                              src={rev_gen_img2}
                              alt=""
                              className="rev_gen_icon"
                            />
                          </MDBCol>

                          <MDBCol md="9">
                            <MDBRow>
                              <MDBCol md="5" className="rev_gen_contant1">
                                {OverallRating
                                  ? OverallRating
                                    
                                  : "-"}
                              </MDBCol>
                              {/* <MDBCol md="6" className="rev_gen_contant3">
                                <span>+</span>
                                <span>01.03%</span>
                              </MDBCol> */}
                            </MDBRow>
                            <MDBRow className="rev_gen_contant2">
                              Overall Rating
                            </MDBRow>
                          </MDBCol>
                        </MDBRow>
                      </div>
                    </MDBCol>

                    <MDBCol md="3">
                      <div className="rev_gen_cards">
                        <MDBRow>
                          <MDBCol md="3">
                            <img
                              src={rev_gen_img3}
                              alt=""
                              className="rev_gen_icon"
                            />
                          </MDBCol>

                          <MDBCol md="9">
                            <MDBRow>
                              <MDBCol md="5" className="rev_gen_contant1">
                                {NumberOfReviews
                                  ? NumberOfReviews
                                  : "-"}
                              </MDBCol>
                              {/* <MDBCol md="6" className="rev_gen_contant3">
                                <span>+</span>
                                <span>01.03%</span>
                              </MDBCol> */}
                            </MDBRow>
                            <MDBRow className="rev_gen_contant2">
                              Number Of Reviews
                            </MDBRow>
                          </MDBCol>
                        </MDBRow>
                      </div>
                    </MDBCol>

                    <MDBCol md="3">
                      <div className="rev_gen_cards">
                        <MDBRow>
                          <MDBCol md="3">
                            <img
                              src={rev_gen_img4}
                              alt=""
                              className="rev_gen_icon"
                            />
                          </MDBCol>

                          <MDBCol md="9">
                            <MDBRow>
                              <MDBCol md="5" className="rev_gen_contant1">
                                {InvitesSent?InvitesSent:"-"}
                                {/* <span>
                                  <i className="zmdi zmdi-email"></i>
                                </span> */}
                              </MDBCol>
                              {/* <MDBCol md="5" className="rev_gen_contant1">
                                -{" "}
                                <span>
                                  <i className="zmdi zmdi-comment-more"></i>
                                </span>
                              </MDBCol> */}
                              {/* <MDBCol md="6" className="rev_gen_contant3">
                                <span>+</span>
                                <span>01.03%</span>
                              </MDBCol> */}
                            </MDBRow>
                            <MDBRow className="rev_gen_contant2">
                              Invite Sent
                            </MDBRow>
                          </MDBCol>
                        </MDBRow>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </div>
          
            </div>)}
          </MDBContainer>
        
        
        
        
      </div>
    );
  }
}
