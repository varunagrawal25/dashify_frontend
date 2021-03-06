import React, { Component, PropTypes } from "react";
import { Link, Redirect } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import Axios from "axios";
import { all_connection_of_one_location } from "./apis/social_platforms";
import { profile_analytics } from "./apis/social_media";
import {
  location_by_id,
  business_categories,
  business_states
} from "./apis/location";
import styled, { css } from "styled-components";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import TwitterLogin from "react-twitter-auth";
import Spinner from "./common/Spinner";
import Loader2 from "react-loader-spinner";
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
import fb1 from "./assets/fb.png";
import fb2 from "./assets/fb1.png";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { MDBCol, MDBRow } from "mdbreact";
import { profile_analytics_json } from "./json/social_media";
import swal from 'sweetalert';
import { secure_pin } from "../config";

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

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

export default class ProfileAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      loading: false,
  
      gviews: "-",
      gWeb: "-",
      gcalls: "-",
      gdirection: "-",
      gclicks:"-",
  
      gviews_per: "-",
      gWeb_per: "-",
      gcalls_per: "-",
      gdirection_per: "-",
      gclicks_per:"-",
  
      fViews: "-",
      fWeb: "-",
      fcalls: "-",
      fdirection: "-",
      fclicks: "-",
  
      fViews_per: "-",
      fWeb_per: "-",
      fcalls_per: "-",
      fdirection_per: "-",
      fclicks_per: "-",
  
      conViews: "-",
      conWeb: "-",
      concalls: "-",
      condirection: "-",
      conclicks: "-",
  
      conViews_per: "-",
      conWeb_per: "-",
      concalls_per: "-",
      condirection_per: "-",
      conclicks_per: "-",
  
  
      fbIsLoggedIn: false,
      googleIsLoggedIn: false,
  
      google_token: "",
      locationIdGoogle: "",
  
      show_states: "",
      range_name: "week",
      today_date: "",
      last_week: "",
      last_month: "",
      last_3_month: "",
      last_6_month: "",
      last_year: "",
  
  
      fbtoken: "",
      fbPageId: "",
  
      name: "",
      address: "",
      phone: "",
      city: "",
      postalCode: "",
      category: "",
      state: ""
    };
  }
 

  componentClicked = e => {
    console.log("clicked");
    // e.preventDefault();
  };

  responseFacebook = async response => {
    try{
    console.log("facebook response", response);

    if(response.accessToken){
      const fb_data = {
        location_id: this.props.match.params.locationId,
        Username: response.name,
        Email: response.email
      };
      await localStorage.setItem("fb_token", response.accessToken);
      await localStorage.setItem("fb_data", JSON.stringify(fb_data));
      this.props.history.push({
        pathname: `/connectedaccounts/profile-analytics`
      });
    } else {
      swal("Facebook connection failed!");
    }

}catch(e){}};

  responseErrorGoogle = response => {
    try{
    console.log(response);
    // swal("try again");
    swal("Google connection failed!");
  }catch(e){}};

  responseGoogle = response => {
    try{
    console.log("google response", response);
    
  

    let state = {
      Token: response.accessToken,
      Username: response.profileObj.name,
      Email: response.profileObj.email,
      location_id: this.props.match.params.locationId,
      googleImgUrl:response.profileObj.imageUrl,
      googleIdf:response.profileObj.googleId,
      redirect_to: "/profile-analytics"
    };
    this.props.history.push({
      pathname: `/google-connectedaccounts/${encodeURIComponent(
        JSON.stringify(state)
      )}`
    });
  }catch(e){}};


  filterAnalytics (data){
try{
    Axios.post( 
      "https://dashify.biz/Api/admin/socialmedia_api/get_profile_analytics_by_filter",
      data
    ).then(resp => {
      console.log("digi",resp);

      this.setState({
        googleAnalytics:resp.data,
        c_buttons_clicks: resp.data.c_buttons_clicks,
c_direct_request: resp.data.c_direct_request,
c_phone_calls: resp.data.c_phone_calls,
c_total_profile_views:resp.data.c_total_profile_views,
c_website_visit:resp.data.c_website_visit,
f_buttons_clicks: resp.data.f_buttons_clicks,
f_direct_request: resp.data.f_direct_request,
f_phone_calls: resp.data.f_phone_calls,
f_total_profile_views: resp.data.f_total_profile_views,
f_website_visit: resp.data.f_website_visit,
g_buttons_clicks: resp.data.g_buttons_clicks,
g_direct_request: resp.data.g_direct_request,
g_phone_calls: resp.data.g_phone_calls,
g_total_profile_views: resp.data.g_total_profile_views,
g_website_visit: resp.data.g_website_visit,
loader:false
      })
    });


  }catch(e){}}

  fliterUpdate=e=>{
    try{
    console.log(e.target.value)
    const data2={
      secure_pin,"user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId")

      ,"filter_type":e.target.value
    }
    console.log(data2,"data2")
    this.filterAnalytics(data2);
  }catch(e){}}

  componentDidMount() {
    try{
    var yelpUrl, fourUrl, fbtoken, fbPageId, googleToken;
    this.setState({locId:this.props.match.params.locationId})
    const data2={
      secure_pin,"user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId")

      ,"filter_type":"last week"
    }
    console.log(data2,"data2")
    this.filterAnalytics(data2);



   

    var today = new Date();
    today =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    this.setState({ today });

    const dat2 = {
      secure_pin,"user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId")
    };
    

    all_connection_of_one_location(dat2, DjangoConfig)
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

             
            }

          })
        }
        });

      

   

    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

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

    var last2ndWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 14
    );

    var last_2nd_week =
      last2ndWeek.getFullYear() +
      "-" +
      (last2ndWeek.getMonth() + 1) +
      "-" +
      last2ndWeek.getDate();

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

    var last2ndMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 60
    );

    var last_2nd_Month =
      last2ndMonth.getFullYear() +
      "-" +
      (last2ndMonth.getMonth() + 1) +
      "-" +
      last2ndMonth.getDate();

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

    var last2ndYear = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 730
    );

    var last_2nd_year =
      last2ndYear.getFullYear() +
      "-" +
      (last2ndYear.getMonth() + 1) +
      "-" +
      last2ndYear.getDate();

    this.setState({
      today_date: date,
      last_week: last_week,
      last_2nd_week: last_2nd_week,
      last_month: last_month,
      last_2nd_Month: last_2nd_Month,
      last_3_month: last_3_month,
      last_6_month: last_6_month,
      last_year: last_year,
      last_2nd_year: last_2nd_year,
      show_states: last_week
    });


    // this.profile_analytics_function();

    const data = {
secure_pin,
      location_id: this.props.match.params.locationId
    };
  
   
    location_by_id(data).then(resp => {
      if(this.props.match.params.locationId !=="null"){
        const data1={secure_pin,countryid:resp.data.location_details[0].country}
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
  
        this.setState({
          name: resp.data.location_details[0].location_name,
  
          address: resp.data.location_details[0].address1,
          phone: resp.data.location.phone_no,
          city: resp.data.location.city,
          postalCode: resp.data.location.zipcode,
          loader:false
        });
      
      }
     
    }).catch(err => {
      this.setState({loader:false})
    })
  }catch(e){} }

  Quixote = pdf_data => (
    <Document>
      {console.log("pdf data", pdf_data)}
      <Page style={styles.body} wrap>
        <Text style={styles.title}>PROFILE ANALYTICS REPORT</Text>
        <Text style={styles.author}>
          DATE:{" "}
          {this.state.show_states
            .split("-")
            .reverse()
            .join("-")}{" "}
          -{" "}
          {this.state.today_date
            .split("-")
            .reverse()
            .join("-")}
        </Text>
        <View>
          <Image style={styles.image} src={require("../images/alexa.png")} />
          <Text style={styles.subtitle}>Location Name : {this.state.name}</Text>
          <Text style={styles.subtitle}>
            Address : {this.state.category},{this.state.address},{" "}
            {this.state.city},{this.state.state} ,{this.state.postalCode},
            {this.state.phone}
          </Text>
        </View>
        {/* <View>
          <Text style={styles.text}>Profile</Text>
          <Text style={styles.text}>Profile Views</Text>
          <Text style={styles.text}>Website Visits</Text>
          <Text style={styles.text}>Phone Calls</Text>
          <Text style={styles.text}>Direction Request</Text>
          <Text style={styles.text}>Button Clicks</Text>
        </View> */}
        {pdf_data.map((data, i) => (
          <View>
            <Text style={styles.subtitle}>{data.name}</Text>
            {data.loggedin ? (
              <View>
                <Text style={styles.text}>Views : {data.view}</Text>
                <Text style={styles.text}>Visits : {data.visit}</Text>
                <Text style={styles.text}>Calls : {data.call}</Text>
                <Text style={styles.text}>Request : {data.direction}</Text>
                <Text style={styles.text}>Clicks : {data.click}</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.text}>Connect {data.name} listing</Text>
              </View>
            )}
          </View>
        ))}
      </Page>
    </Document>
  );

  // profile_analytics_function = () => {
  //   let date_range = this.state.range_name;
  //   console.log(this.state.range_name)
  //   // let { range_name } = this.state;
  //   this.setState({ loading: true });
    // if (range_name == "week") {
    //   date_range = "week";
    // } else if (range_name == "month") {
    //   date_range = "month";
    // } else if (range_name == "3 months") {
    //   date_range = "month";
    // } else if (range_name == "6 months") {
    //   date_range = "month";
    // } else if (range_name == "year") {
    //   date_range = "month";
    // }
  //   const data = {
  //     location_id: this.props.match.params.locationId,
  //     duration: date_range
  //   };

  //   profile_analytics(data,DjangoConfig)
  //     .then(resp => {
  //       if (resp.data && resp.data.facebook) {
  //         this.setState({
  //           fViews: resp.data.facebook.views,
  //           fWeb: resp.data.facebook.web,
  //           fcalls: resp.data.facebook.calls,
  //           fdirection: resp.data.facebook.direction,
  //           fclicks: resp.data.facebook.clicks,

  //           fViews_per: resp.data.facebook_percentage.views,
  //           fWeb_per: resp.data.facebook_percentage.web,
  //           fcalls_per: resp.data.facebook_percentage.calls,
  //           fdirection_per: resp.data.facebook_percentage.direction,
  //           fclicks_per: resp.data.facebook_percentage.clicks,

  //             gviews:resp.data.google.views,
  //             gWeb: resp.data.google.web,
  //             gcalls:resp.data.google.calls,
  //             gdirection:resp.data.google.direction,
  //             gclicks: resp.data.google.clicks,

  //             gviews_per:resp.data.google_percentage.views,
  //             gWeb_per: resp.data.google_percentage.web,
  //             gcalls_per:resp.data.google_percentage.calls,
  //             gdirection_per:resp.data.google_percentage.direction,
  //             gclicks_per: resp.data.google_percentage.clicks,

  //           conViews: resp.data.consolidated.views,
  //           conWeb: resp.data.consolidated.web,
  //           concalls: resp.data.consolidated.calls,
  //           condirection: resp.data.consolidated.direction,
  //           conclicks: resp.data.consolidated.clicks,

  //           conViews_per: resp.data.consolidated_percentage.views,
  //           conWeb_per: resp.data.consolidated_percentage.web,
  //           concalls_per: resp.data.consolidated_percentage.calls,
  //           condirection_per: resp.data.consolidated_percentage.direction,
  //           conclicks_per: resp.data.consolidated_percentage.clicks,

  //             fbIsLoggedIn: resp.data.fbIsLoggedIn,
  //             googleIsLoggedIn:resp.data.googleIsLoggedIn,
  //             loading: false

  //         });
  //       } else {
  //         let prof_data = profile_analytics_json(data)
  //         this.setState({
  //           fViews: prof_data.facebook.views,
  //           fWeb: prof_data.facebook.web,
  //           fcalls: prof_data.facebook.calls,
  //           fdirection: prof_data.facebook.direction,
  //           fclicks: prof_data.facebook.clicks,

  //           fViews_per: prof_data.facebook_percentage.views,
  //           fWeb_per: prof_data.facebook_percentage.web,
  //           fcalls_per: prof_data.facebook_percentage.calls,
  //           fdirection_per: prof_data.facebook_percentage.direction,
  //           fclicks_per: prof_data.facebook_percentage.clicks,

  //             gviews:prof_data.google.views,
  //             gWeb: prof_data.google.web,
  //             gcalls:prof_data.google.calls,
  //             gdirection:prof_data.google.direction,
  //             gclicks: prof_data.google.clicks,

  //             gviews_per:prof_data.google_percentage.views,
  //             gWeb_per: prof_data.google_percentage.web,
  //             gcalls_per:prof_data.google_percentage.calls,
  //             gdirection_per:prof_data.google_percentage.direction,
  //             gclicks_per: prof_data.google_percentage.clicks,

  //           conViews: prof_data.consolidated.views,
  //           conWeb: prof_data.consolidated.web,
  //           concalls: prof_data.consolidated.calls,
  //           condirection: prof_data.consolidated.direction,
  //           conclicks: prof_data.consolidated.clicks,prof_data,

  //           conViews_per: prof_data.consolidated_percentage.views,
  //           conWeb_per: prof_data.consolidated_percentage.web,
  //           concalls_per: prof_data.consolidated_percentage.calls,
  //           condirection_per: prof_data.consolidated_percentage.direction,
  //           conclicks_per: prof_data.consolidated_percentage.clicks,

  //           fbIsLoggedIn: prof_data.fbIsLoggedIn,
  //           googleIsLoggedIn:prof_data.googleIsLoggedIn,
  //             loading: false

  //         });
  //       }
  //     })
  //     .catch(err => {
  //       console.log("profile analytics err", err);
  //       let prof_data = profile_analytics_json(data.duration)
  //       console.log("profile analytics json  err", prof_data,data);
  //         this.setState({
  //           fViews: prof_data.facebook.views,
  //           fWeb: prof_data.facebook.web,
  //           fcalls: prof_data.facebook.calls,
  //           fdirection: prof_data.facebook.direction,
  //           fclicks: prof_data.facebook.clicks,

  //           fViews_per: prof_data.facebook_percentage.views,
  //           fWeb_per: prof_data.facebook_percentage.web,
  //           fcalls_per: prof_data.facebook_percentage.calls,
  //           fdirection_per: prof_data.facebook_percentage.direction,
  //           fclicks_per: prof_data.facebook_percentage.clicks,

  //             gviews:prof_data.google.views,
  //             gWeb: prof_data.google.web,
  //             gcalls:prof_data.google.calls,
  //             gdirection:prof_data.google.direction,
  //             gclicks: prof_data.google.clicks,

  //             gviews_per:prof_data.google_percentage.views,
  //             gWeb_per: prof_data.google_percentage.web,
  //             gcalls_per:prof_data.google_percentage.calls,
  //             gdirection_per:prof_data.google_percentage.direction,
  //             gclicks_per: prof_data.google_percentage.clicks,

  //           conViews: prof_data.consolidated.views,
  //           conWeb: prof_data.consolidated.web,
  //           concalls: prof_data.consolidated.calls,
  //           condirection: prof_data.consolidated.direction,
  //           conclicks: prof_data.consolidated.clicks,prof_data,

  //           conViews_per: prof_data.consolidated_percentage.views,
  //           conWeb_per: prof_data.consolidated_percentage.web,
  //           concalls_per: prof_data.consolidated_percentage.calls,
  //           condirection_per: prof_data.consolidated_percentage.direction,
  //           conclicks_per: prof_data.consolidated_percentage.clicks,

  //           fbIsLoggedIn: prof_data.fbIsLoggedIn,
  //           googleIsLoggedIn:prof_data.googleIsLoggedIn,
  //             loading: false

  //         });
   
  //     });
  // };

  // printDocument() {
  //   const input = document.getElementById("divToPrint");
  //   html2canvas(input).then(canvas => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF();
  //     pdf.addImage(imgData, "PNG", 0, 0);
  //     // pdf.output('dataurlnewwindow');
  //     pdf.save("download.pdf");
  //   });
  // }

  change_states = async e => {
    let {last_week,last_month,last_3_month,last_6_month,last_year} = this.state
    let show_states = ""
    let range_name = e.target.value
    if(range_name == "week"){
      show_states = last_week
    } else if(range_name == "month"){
      show_states = last_month
    } else if(range_name == "3 months"){
      show_states = last_3_month
    } else if(range_name == "6 months"){
      show_states = last_6_month
    } else if(range_name == "year"){
      show_states = last_year
    }

    await this.setState({ show_states, range_name });
    this.profile_analytics_function()
  };

  render() {
    var showAnaly= this.state.fbIsLoggedIn || this.state.googleIsLoggedIn;
    let {
      today_date,
      last_week,
      last_month,
      last_3_month,
      last_6_month,
      last_year,
      show_states,

      gviews,
      gWeb,
      gcalls,
      gdirection,
      gclicks,

      gviews_per,
      gWeb_per,
      gcalls_per,
      gdirection_per,
      gclicks_per,

      fViews,
      fWeb,
      fcalls,
      fdirection,
      fclicks,

      fViews_per,
      fWeb_per,
      fcalls_per,
      fdirection_per,
      fclicks_per,

      conViews,
      conWeb,
      concalls,
      condirection,
      conclicks,

      conViews_per,
      conWeb_per,
      concalls_per,
      condirection_per,
      conclicks_per,

      fbIsLoggedIn,
      googleIsLoggedIn,

      c_buttons_clicks,
c_direct_request,
c_phone_calls,
c_total_profile_views,
c_website_visit,
f_buttons_clicks,
f_direct_request,
f_phone_calls,
f_total_profile_views,
f_website_visit,
g_buttons_clicks,
g_direct_request,
g_phone_calls,
g_total_profile_views,
g_website_visit
    } = this.state;

    var googleAnalytics=this.state.googleAnalytics;
    console.log("this.state", this.state);

    let pdf_data = [
      {
        name: "Consolidated",
        loggedin: true,
        view: parseInt(conViews),
        visit: parseInt(conWeb),
        call: parseInt(concalls),
        direction: parseInt(condirection),
        click:
        parseInt(conclicks)
      },
      {
        name: "Google",
        loggedin: googleIsLoggedIn,
        view: parseInt(gviews),
        visit: parseInt(gWeb),
        call: parseInt(gcalls),
        direction: parseInt(gdirection),
        click: parseInt(gclicks)
      },
      {
        name: "Facebook",
        loggedin: fbIsLoggedIn,
        view: parseInt(fViews),
        visit: parseInt(fWeb),
        call: parseInt(fcalls),
        direction: parseInt(fdirection),
        click: parseInt(fclicks)
      }
    ];
    return (
      <>
        {/* <div className="left-side-menu"></div>
        <div className="content-page"> */}
        {this.state.loader ? (
          <div className="container " id="overview-10">
          <div className="profanalytic">
            <h3>Profile Analytics</h3>
          </div>
          <Spinner />
          </div>
          
        ) : (
          <div className="container " id="overview-10">
            <div className="profanalytic">
              <h3>Profile Analytics</h3>
            </div>

            <MDBRow>
              <MDBCol md="4" style={{ padding: "0px 20px" }}>
                {this.state.fbIsLoggedIn ? (
                  ""
                ) : (
                  <MDBRow className="anacard">
                    <MDBCol md="2">
                      <div className="profile-new-img">
                        <img
                          src={require("../images/profilefacebook.png")}
                          alt="facebook"
                        />
                      </div>
                    </MDBCol>

                    <MDBCol md="6" className="profile_ana_contant1">
                      Connect your facebook profile to get profile analytics for
                      your facebook listing
                    </MDBCol>
                    <MDBCol md="4">
                      <FacebookLogin
                        appId="187396122554776"
                        // appId="3044182972316291"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook}
                        textButton="Connect"
                        cssClass="pa_connect_btn"
                      />
                    </MDBCol>
                  </MDBRow>
                )}
              </MDBCol>

              {/* <MDBCol md="4" style={{ padding: "0px 20px" }}>
                {this.state.fbIsLoggedIn ? (
                  ""
                ) : (
                  <MDBRow className="anacard">
                    <MDBCol md="2">
                      <div className="profile-new-img">
                        <img
                          src={require("../images/profiletwitter.png")}
                          alt="twitter"
                        />
                      </div>
                    </MDBCol>

                    <MDBCol md="6" className="profile_ana_contant1">
                      Connect your Twitter profile to get profile analytics for
                      your Facebook listing
                    </MDBCol>
                    <MDBCol md="4">
                      <TwitterLogin
                        loginUrl="http://localhost:4000/api/v1/auth/twitter"
                        onFailure={this.onFailed}
                        onSuccess={this.onSuccess}
                        requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
                        text="Connect"
                        showIcon={false}
                        className="pa_connect_btn"
                      />
                    </MDBCol>
                  </MDBRow>
                )}
              </MDBCol> */}


              <MDBCol md="4" style={{ padding: "0px 20px" }}>
                {this.state.googleIsLoggedIn ? (
                  ""
                ) : (
                  <MDBRow className="anacard">
                    <MDBCol md="2">
                      <div className="profile-new-img">
                        <img
                          src={require("../images/google2.png")}
                          alt="twitter"
                        />
                      </div>
                    </MDBCol>

                    <MDBCol md="6" className="profile_ana_contant1">
                      Connect your google profile to get profile analytics for
                      your google listing
                    </MDBCol>
                    <MDBCol md="4">
                      <GoogleLogin
                        //for localhost
                        clientId="759599444436-po5k7rhkaqdu55toirpt5c8osaqln6ul.apps.googleusercontent.com"
                        //for server
                        //clientId="759599444436-5litbq8gav4ku8sj01o00uh6lsk8ebr0.apps.googleusercontent.com"
                        buttonText="Connect "
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
                    </MDBCol>
                  </MDBRow>
                )}
              </MDBCol>
            </MDBRow>


                  {showAnaly?
            <div className="container analytic-11 ">
              <div className="">
                {this.state.loading ? (
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
                  <div className="row ">
                    <div className="col-md-4 Pa_container0 ">
                      <div className="Pa_container1 ">
                        <div className="row ">
                          <div className="col-md-5 this_week ">
                            <select  onChange={this.fliterUpdate} className="review_select_btn">
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
                            </select>
                          </div>

                          <div className="col-md-7">
                            {/* <PDFDownloadLink
                              document={this.Quixote(pdf_data)}
                              fileName="profile_analytics_report.pdf"
                            >
                              {({ blob, url, loading, error }) =>
                                loading ? (
                                  <a className="btn btn-analytic-13">
                                    Loading...
                                  </a>
                                ) : (
                                  <a className="btn btn-analytic-13">
                                    Download Report
                                  </a>
                                )
                              }
                            </PDFDownloadLink> */}

                            <a className="btn btn-analytic-13"  href={`https://dashify.biz/Api/admin/pdf-api/pdf_analytic/`+this.state.locId} target="_blank" rel="noopener noreferrer"  download>
                                    Download Report
                                  </a>
                            {/* { this.state.loader ? (
                          "Loading document..."
                        ) : (
                          <a className="download-report" href={`https://dashify.biz/Api/admin/pdf-api/pdf_report/`+this.state.locId} target="_blank" rel="noopener noreferrer"  download >Download Report</a>
                        )
  } */}
                          </div>
                        </div>
                        <div className="row total_top ">
                          <div className="col-md-3  pa_icon">
                            <img
                              src={require("../images/a.png")}
                              alt="facebook"
                            />
                          </div>
                          <div className="col-md-6" style={{ lineHeight: 0 }}>
                            <p className="analytic-16">
                            {
                            c_total_profile_views?c_total_profile_views:"0"}
                            </p>
                            <p className="analytic-17">Total Profile View</p>
                          </div>
                          <div className="col-md-3 ">
                            {parseInt(gviews_per)  >
                            0 ? (
                              <div style={{ color: "green" }}>
                                {parseInt(gviews_per).toString()
                                    .slice(0, 4) +
                                  " %"}
                              </div>
                            ) : parseInt(gviews_per) <
                              0 ? (
                              <div class='err_msg'>
                                {parseInt(gviews_per).toString()
                                    .slice(0, 5) +
                                  " %"}
                              </div>
                            ) : parseInt(gviews_per)==
                              0 ? (
                              "0%"
                            ) : (
                              "-"
                            )}
                          </div>
                        </div>
                        <div className="row total_top">
                          <div className="col-md-3 pa_icon ">
                            <img
                              src={require("../images/b.png")}
                              alt="facebook"
                            />
                          </div>
                          <div className="col-md-6" style={{ lineHeight: 0 }}>
                            <p className="analytic-16">
                              {" "}
                             {c_website_visit?c_website_visit:"0"}
                            </p>
                            <p className="analytic-17">Website Visit</p>
                          </div>
                          <div className="col-md-3  ">
                            {parseInt(gWeb_per)  >
                            0 ? (
                              <div style={{ color: "green" }}>
                                {parseInt(gWeb_per).toString()
                                    .slice(0, 4) +
                                  " %"}
                              </div>
                            ) : parseInt(gWeb_per) <
                              0 ? (
                              <div class='err_msg'>
                                {parseInt(gviews_per).toString()
                                    .slice(0, 5) +
                                  " %"}
                              </div>
                            ) : parseInt(gWeb_per)==
                              0 ? (
                              "0%"
                            ) : (
                              "-"
                            )}
                          </div>
                        </div>
                        <div className="row total_top">
                          <div className="col-md-3 pa_icon ">
                            <img
                              src={require("../images/c.png")}
                              alt="facebook"
                            />
                          </div>
                          <div className="col-md-6" style={{ lineHeight: 0 }}>
                            <p className="analytic-16">
                              {" "}
                              {c_phone_calls?c_phone_calls:"0"}
                            </p>
                            <p className="analytic-17">Phone Calls</p>
                          </div>
                          <div className="col-md-3  ">
                          {parseInt(gcalls_per)  >
                            0 ? (
                              <div style={{ color: "green" }}>
                                {parseInt(gcalls_per).toString()
                                    .slice(0, 4) +
                                  " %"}
                              </div>
                            ) : parseInt(gcalls_per) <
                              0 ? (
                              <div class='err_msg'>
                                {parseInt(gcalls_per).toString()
                                    .slice(0, 5) +
                                  " %"}
                              </div>
                            ) : parseInt(gcalls_per)==
                              0 ? (
                              "0%"
                            ) : (
                              "-"
                            )}
                          </div>
                        </div>
                        <div className="row total_top">
                          <div className="col-md-3  pa_icon">
                            <img
                              src={require("../images/d.png")}
                              alt="facebook"
                            />
                          </div>
                          <div className="col-md-6" style={{ lineHeight: 0 }}>
                            <p className="analytic-16">
                              {" "}
                              {c_direct_request?c_direct_request:"0"}
                            </p>
                            <p className="analytic-17">Direction Request</p>
                          </div>
                          <div className="col-md-3  ">
                          {parseInt(condirection_per)  >
                            0 ? (
                              <div style={{ color: "green" }}>
                                {parseInt(condirection_per).toString()
                                    .slice(0, 4) +
                                  " %"}
                              </div>
                            ) : parseInt(condirection_per) <
                              0 ? (
                              <div class='err_msg'>
                                {parseInt(condirection_per).toString()
                                    .slice(0, 5) +
                                  " %"}
                              </div>
                            ) : parseInt(condirection_per)==
                              0 ? (
                              "0%"
                            ) : (
                              "-"
                            )}
                          </div>
                        </div>
                        <div className="row total_top">
                          <div className="col-md-3  pa_icon">
                            <img
                              src={require("../images/eanaly.png")}
                              alt="facebook"
                            />
                          </div>
                          <div className="col-md-6" style={{ lineHeight: 0 }}>
                            <p className="analytic-16">
                              {" "}
                              {c_buttons_clicks?c_buttons_clicks:"0"}
                            </p>
                            <p className="analytic-17">Button Clicks</p>
                          </div>
                          <div className="col-md-3  ">
                          {parseInt(conclicks_per)  >
                            0 ? (
                              <div style={{ color: "green" }}>
                                {parseInt(conclicks_per).toString()
                                    .slice(0, 4) +
                                  " %"}
                              </div>
                            ) : parseInt(conclicks_per) <
                              0 ? (
                              <div class='err_msg'>
                                {parseInt(conclicks_per).toString()
                                    .slice(0, 5) +
                                  " %"}
                              </div>
                            ) : parseInt(conclicks_per)==
                              0 ? (
                              "0%"
                            ) : (
                              "-"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8  Pa_container0">
                      <div className="Pa_container1">
                        <table class="table table-hover">
                          <thead className="head_font">
                            <tr>
                              <th scope="col">Profiles 02</th>
                              <th scope="col">Profiles Views</th>
                              <th scope="col">Website Views</th>
                              <th scope="col">Phone Calls</th>
                              <th scope="col">Direction Request</th>
                              <th scope="col">Button Clicks</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td scope="row" className="analytics-17">
                                Consolidated
                              </td>
                              <td>{c_total_profile_views?c_total_profile_views:"0"}</td>
                              <td>{c_website_visit?c_website_visit:"0"}</td>
                              <td>{c_phone_calls?c_phone_calls:"0"} </td>
                              <td>{c_direct_request?c_direct_request:"0"}</td>
                              <td>{c_buttons_clicks?c_buttons_clicks:"0"}</td>
                            </tr>
                            <tr>
                              <td scope="row" className="analytics-17">
                                Google
                              </td>
                              <td>{g_total_profile_views?g_total_profile_views:"0"}</td>
                              <td>{g_website_visit?g_website_visit:"0"}</td>
                              <td>{g_phone_calls?g_phone_calls:"0"} </td>
                              <td>{g_direct_request?g_direct_request:"0"}</td>
                              <td>{g_buttons_clicks?g_buttons_clicks:"0"}</td>
                            </tr>
                            <tr>
                              <td scope="row" className="analytics-17">
                                Facebook
                              </td>
                              <td>{f_total_profile_views?f_total_profile_views:"0"}</td>
                              <td>{f_website_visit?f_website_visit:"0"}</td>
                              <td>{f_phone_calls?f_phone_calls:"0"} </td>
                              <td>{f_direct_request?f_direct_request:"0"}</td>
                              <td>{f_buttons_clicks?f_buttons_clicks:"0"}</td>
                            </tr>
                            {/* <tr>
                            <th scope="row" className="analytics-17">
                              Bing
                            </th>
                            <td> - </td>
                            <td> - </td>
                            <td> - </td>
                            <td> - </td>
                            <td> - </td>
                          </tr>
                          <tr>
                            <th scope="row" className="analytics-17">
                              Google
                            </th>
                            <td>65</td>
                            <td>60</td>
                            <td>112</td>
                            <td>453</td>
                            <td>54</td>
                          </tr> */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>:
            <div >
              <h4 className='connect_msg'>Connect Google Or Facebook To See Listing</h4>
            </div>}
          </div>
        )}
        {/* </div> */}
      </>
    );
  }
}
