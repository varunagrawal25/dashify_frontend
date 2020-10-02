import React, { Component, PropTypes } from "react";
import { Link, Redirect } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import Axios from "axios";
import { all_connection_of_one_location } from "./apis/social_platforms";
import {
  location_by_id,
  business_categories,
  business_states
} from "./apis/location";
import styled, { css } from "styled-components";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
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
  }
  state = {
    in: [],
    loader: true,
    loading: false,
    profileViews: "-",
    gWeb: "-",
    gcalls: "-",
    gdirection: "-",
    gbutton: "-",
    profileViews1: "0",
    gWeb1: "0",
    gcalls1: "0",
    gdirection1: "0",
    gbutton1: "0",
    profileViews2: "0",
    gWeb2: "0",
    gcalls2: "0",
    gdirection2: "0",
    gbutton2: "0",

    fbAccounts: [],
    fViews: "-",
    fWeb: "-",
    fcalls: "-",
    fdirection: "-",
    fclicks: "-",
    fViews1: "0",
    fWeb1: "0",
    fcalls1: "0",
    fdirection1: "0",
    fclicks1: "0",

    fbIsLoggedIn: false,
    googleIsLoggedIn: false,

    google_token: "",
    locationIdGoogle: "",

    show_states: "",
    range_name: "Last week",
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
    await localStorage.setItem("fb_token", response.accessToken);
    await localStorage.setItem("fb_data", JSON.stringify(fb_data));
    this.props.history.push({
      pathname: `/connectedaccounts/profile-analytics`
    });
  };

  responseErrorGoogle = response => {
    console.log(response);
    alert("try again");
  };

  responseGoogle = response => {
    console.log("google response", response);

    let state = {
      Token: response.accessToken,
      Username: response.profileObj.name,
      Email: response.profileObj.email,
      location_id: this.props.match.params.locationId,
      redirect_to: "/profile-analytics"
    };
    this.props.history.push({
      pathname: `/google-connectedaccounts/${encodeURIComponent(
        JSON.stringify(state)
      )}`
    });
  };

  componentDidMount() {
    var yelpUrl, fourUrl, fbtoken, fbPageId, googleToken;

    const data = {
      location_id: this.props.match.params.locationId
    };

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

    // Axios.post(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/locations/get-all-connection-of-one-location",
    //   data,
    //   DjangoConfig
    // )
    all_connection_of_one_location(data, DjangoConfig)
      .then(response => {
        console.log(response);

        this.setState({ loader: false });
        response.data.data.map(l => {
          if (l.Social_Platform.Platform == "Facebook") {
            fbtoken = l.Social_Platform.Token;
            fbPageId = l.Social_Platform.Other_info;
            this.setState({
              fbtoken,
              fbPageId
            });
          }

          if (l.Social_Platform.Platform == "Google") {
            console.log("yes goo");
            googleToken = l.Social_Platform.Token;
            this.setState({
              google_token: googleToken,
              locationIdGoogle: l.Social_Platform.Other_info
            });
          }

          if (l.Social_Platform.Platform == "Foursquare") {
            console.log("yes four");

            fourUrl = l.Social_Platform.Other_info.split(",")[0]
              .slice(7)
              .split("/")[5];
          }

          if (l.Social_Platform.Platform == "Yelp") {
            console.log("yes yelp");

            yelpUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);
          }
        });

        // for google

        const GoogleConfig = {
          headers: { Authorization: "Bearer " + googleToken }
        };

        if (googleToken) {
          Axios.get(
            "https://mybusiness.googleapis.com/v4/accounts/",
            GoogleConfig
          ).then(res => {
            console.log(res.data);
            localStorage.setItem("accountId", res.data.accounts[0].name);
            this.setState({ googleIsLoggedIn: true });
            this.google_report_insight();
          });
        }

        console.log(fbtoken);

        // for facebook
        if (fbtoken) {
          this.fb_report_insight();
        }
      })
      .catch(res => {
        console.log("error in profile analytics", res);
        this.setState({
          loader: false
        });
      });

    // getting business address
    // Axios.post(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/locations/get-location-by-id",
    //   data,
    //   DjangoConfig
    // )
    location_by_id(data, DjangoConfig).then(resp => {
      // this.setState({ state: "Loading....", category: "Loading...." });
      // Axios.get(
      //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/dropdown-values/states",
      //   DjangoConfig
      // )
      business_states(DjangoConfig).then(resp1 => {
        resp1.data.status.map((s, i) =>
          s.id == resp.data.location.State
            ? this.setState({ state: s.State_name })
            : ""
        );
      });

      // Axios.get(
      //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/dropdown-values/business-categoryes",
      //   DjangoConfig
      // )
      business_categories(DjangoConfig).then(resp1 => {
        resp1.data.BusinessCategory.map((b, i) =>
          b.id == resp.data.location.Business_category
            ? this.setState({ category: b.Category_Name })
            : ""
        );
      });

      this.setState({
        name: resp.data.location.Location_name,
        address: resp.data.location.Address_1,
        phone: resp.data.location.Phone_no,
        city: resp.data.location.City,
        postalCode: resp.data.location.Zipcode
      });
    });
  }

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

  fb_report_insight = () => {
    let date_range = "week";
    let { fbtoken, fbPageId, range_name } = this.state;
    if (range_name == "Last week") {
      date_range = "week";
    } else if (range_name == "Last month") {
      date_range = "month";
    } else if (range_name == "Last 3 months") {
      date_range = "month";
    } else if (range_name == "Last 6 months") {
      date_range = "month";
    } else if (range_name == "Last year") {
      date_range = "month";
    }

    if (fbtoken) {
      Axios.get(
        "https://graph.facebook.com/me/accounts/?access_token=" + fbtoken
      ).then(res => {
        console.log(res.data);
        this.setState({ fbAccounts: res.data.data });
        var fbPageAccessToken;
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].id == fbPageId) {
            fbPageAccessToken = res.data.data[i].access_token;
          }
        }
        Axios.get(
          "https://graph.facebook.com/" +
            fbPageId +
            "/insights/page_engaged_users,page_impressions,page_views_total,page_call_phone_clicks_logged_in_unique,page_get_directions_clicks_logged_in_unique,page_website_clicks_logged_in_unique?period=" +
            date_range +
            "&access_token=" +
            fbPageAccessToken
        ).then(resp => {
          console.log(resp.data);
          this.setState({
            fViews:
              resp.data.data[2] && resp.data.data[2].values[1]
                ? resp.data.data[2].values[1].value
                : "-",
            fWeb:
              resp.data.data[5] && resp.data.data[5].values[1]
                ? resp.data.data[5].values[1].value
                : "-",
            fcalls:
              resp.data.data[3] && resp.data.data[3].values[1]
                ? resp.data.data[3].values[1].value
                : "-",
            fdirection:
              resp.data.data[4] && resp.data.data[4].values[1]
                ? resp.data.data[4].values[1].value
                : "-",
            fclicks:
              resp.data.data[0] && resp.data.data[0].values[1]
                ? resp.data.data[0].values[1].value
                : "-",

            fViews1:
              resp.data.data[2] && resp.data.data[2].values[1]
                ? resp.data.data[2].values[1].value
                : "0",
            fWeb1:
              resp.data.data[5] && resp.data.data[5].values[1]
                ? resp.data.data[5].values[1].value
                : "0",
            fcalls1:
              resp.data.data[3] && resp.data.data[3].values[1]
                ? resp.data.data[3].values[1].value
                : "0",
            fdirection1:
              resp.data.data[4] && resp.data.data[4].values[1]
                ? resp.data.data[4].values[1].value
                : "0",
            fclicks1:
              resp.data.data[0] && resp.data.data[0].values[1]
                ? resp.data.data[0].values[1].value
                : "0",

            fbIsLoggedIn: true
          });
        });
      });
    }
  };

  google_report_insight = () => {
    this.setState({ loading: true });
    const GoogleConfig = {
      headers: { Authorization: "Bearer " + this.state.google_token }
    };

    let {
      range_name,
      last_2nd_week,
      last_2nd_Month,
      last_6_month,
      last_year,
      last_2nd_year
    } = this.state;
    let show_states2 = "";
    if (range_name == "Last week") {
      show_states2 = last_2nd_week;
    } else if (range_name == "Last month") {
      show_states2 = last_2nd_Month;
    } else if (range_name == "Last 3 months") {
      show_states2 = last_6_month;
    } else if (range_name == "Last 6 months") {
      show_states2 = last_year;
    } else if (range_name == "Last year") {
      show_states2 = last_2nd_year;
    }

    // Axios.get(
    //   "https://mybusiness.googleapis.com/v4/" +
    //     localStorage.getItem("accountId") +
    //     "/locations",
    //   GoogleConfig
    // )
    //   .then(resp => {
    //     console.log(resp.data);

    //     localStorage.setItem("locationIdAna", resp.data.locations[0].name);
    Axios.post(
      "https://mybusiness.googleapis.com/v4/" +
        localStorage.getItem("accountId") +
        "/locations:reportInsights",
      {
        // locationNames: [localStorage.getItem("locationIdAna")],
        locationNames: [this.state.locationIdGoogle],
        basicRequest: {
          metricRequests: [
            {
              metric: "ALL"
            }
          ],
          timeRange: {
            startTime: this.state.show_states + "T01:01:23.045123456Z",
            endTime: this.state.today_date + "T23:59:59.045123456Z"
          }
        }
      },
      GoogleConfig
    )
      .then(res => {
        if (
          res.data.locationMetrics[0] &&
          res.data.locationMetrics[0].metricValues[0] &&
          res.data.locationMetrics[0].metricValues[1] &&
          res.data.locationMetrics[0].metricValues[5] &&
          res.data.locationMetrics[0].metricValues[6] &&
          res.data.locationMetrics[0].metricValues[7]
        ) {
          this.setState({
            in: res.data.locationMetrics[0].metricValues,
            profileViews:
              parseInt(
                res.data.locationMetrics[0].metricValues[0].totalValue.value
              ) +
              parseInt(
                res.data.locationMetrics[0].metricValues[1].totalValue.value
              ),
            gWeb: res.data.locationMetrics[0].metricValues[5].totalValue.value,
            gcalls:
              res.data.locationMetrics[0].metricValues[6].totalValue.value,
            gdirection:
              res.data.locationMetrics[0].metricValues[7].totalValue.value,
            profileViews1:
              parseInt(
                res.data.locationMetrics[0].metricValues[0].totalValue.value
              ) +
              parseInt(
                res.data.locationMetrics[0].metricValues[1].totalValue.value
              ),
            gWeb1: res.data.locationMetrics[0].metricValues[5].totalValue.value,
            gcalls1:
              res.data.locationMetrics[0].metricValues[6].totalValue.value,
            gdirection1:
              res.data.locationMetrics[0].metricValues[7].totalValue.value,
            loading: false
          });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch(res => {
        console.log(res);
        this.setState({ loading: false });
      });

    Axios.post(
      "https://mybusiness.googleapis.com/v4/" +
        localStorage.getItem("accountId") +
        "/locations:reportInsights",
      {
        // locationNames: [localStorage.getItem("locationIdAna")],
        locationNames: [this.state.locationIdGoogle],
        basicRequest: {
          metricRequests: [
            {
              metric: "ALL"
            }
          ],
          timeRange: {
            startTime: show_states2 + "T01:01:23.045123456Z",
            endTime: this.state.show_states + "T23:59:59.045123456Z"
          }
        }
      },

      GoogleConfig
    )
      .then(res => {
        console.log(res.data.locationMetrics[0]);

        this.setState({
          profileViews2:
            parseInt(
              res.data.locationMetrics[0].metricValues[0].totalValue.value
            ) +
            parseInt(
              res.data.locationMetrics[0].metricValues[1].totalValue.value
            ),
          gWeb2: res.data.locationMetrics[0].metricValues[5].totalValue.value,
          gcalls2: res.data.locationMetrics[0].metricValues[6].totalValue.value,
          gdirection2:
            res.data.locationMetrics[0].metricValues[7].totalValue.value
        });
      })
      .catch(res => {
        console.log(res);
      });

    // })
    // .catch(res => {
    //   console.log(res);
    //   this.setState({ loading: false });
    // });
  };

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

  change_states = (states, range) => async e => {
    console.log("e.target.name", states, range);
    await this.setState({ show_states: states, range_name: range });
    this.google_report_insight();
    this.fb_report_insight();
  };

  render() {
    let {
      today_date,
      last_week,
      last_month,
      last_3_month,
      last_6_month,
      last_year,
      show_states
    } = this.state;
    console.log("this.state", this.state);

    let {
      profileViews,
      gWeb,
      gcalls,
      gdirection,
      gbutton,
      profileViews1,
      gWeb1,
      gcalls1,
      gdirection1,
      gbutton1,
      profileViews2,
      gWeb2,
      gcalls2,
      gdirection2,
      gbutton2,
      fViews,
      fWeb,
      fcalls,
      fdirection,
      fclicks,
      fViews1,
      fWeb1,
      fcalls1,
      fdirection1,
      fclicks1,
      fbIsLoggedIn,
      googleIsLoggedIn
    } = this.state;

    let pdf_data = [
      {
        name: "Consolidated",
        loggedin: true,
        view: parseInt(fViews1) + parseInt(profileViews1),
        visit: parseInt(fWeb1) + parseInt(gWeb1),
        call: parseInt(fcalls1) + parseInt(gcalls1),
        direction: parseInt(gdirection1) + parseInt(fdirection1),
        click:
          parseInt(gcalls1) +
          parseInt(gdirection1) +
          parseInt(gWeb1) +
          parseInt(fclicks1)
      },
      {
        name: "Google",
        loggedin: googleIsLoggedIn,
        view: parseInt(profileViews),
        visit: parseInt(gWeb),
        call: parseInt(gcalls),
        direction: parseInt(gdirection),
        click: parseInt(gcalls) + parseInt(gdirection) + parseInt(gWeb)
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
          <div className="rightside_title">
            <Spinner />
          </div>
        ) : (
          <div className="container " id="overview-10">
            <div className="profanalytic">
              <h3>Profile Analytics</h3>
            </div>
            <div className="col-12">
              <div className="row ">
                {this.state.fbIsLoggedIn ? (
                  ""
                ) : (
                  <div className="col-md-5 anacard  ">
                    <div className="row">
                      <div className="col-md-2">
                        <img src={fb2} />
                      </div>
                      <div className="col-md-6  ana-10 ">
                        <h5>
                          Connect your Facebook profile to get profile analytics
                          for your Facebook listing
                        </h5>
                      </div>
                      {/* <div className="col-md-4 button_connect ">
                        <a href="#" className="btn btn-analy  ">
                          <h6>Connect</h6>
                        </a>
                      </div> */}
                      <div className="google_btnb col-md-4">
                        <FacebookLogin
                          appId="187396122554776"
                          // appId="3044182972316291"
                          autoLoad={false}
                          fields="name,email,picture"
                          onClick={this.componentClicked}
                          callback={this.responseFacebook}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {this.state.googleIsLoggedIn ? (
                  ""
                ) : (
                  <div className="col-md-5 anacard ">
                    <div className="row">
                      <div className="col-md-2">
                        <img src={fb1} />
                      </div>
                      <div className="col-md-6  ana-10">
                        <h5>
                          Connect your Google account to get profile analytics
                          for your google listing
                        </h5>
                      </div>
                      {/* <div className="col-md-4 button_connect">
                      <a href="#" className="btn btn-analy  ">
                        <h6>Connect</h6>
                      </a>
                    </div> */}
                      <div className="col-md-4 button_connect">
                        <GoogleLogin
                          //for localhost
                          clientId="759599444436-po5k7rhkaqdu55toirpt5c8osaqln6ul.apps.googleusercontent.com"
                          //for server
                          // clientId="759599444436-5litbq8gav4ku8sj01o00uh6lsk8ebr0.apps.googleusercontent.com"
                          buttonText="Login"
                          scope="https://www.googleapis.com/auth/business.manage"
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseErrorGoogle}
                          cookiePolicy={"single_host_origin"}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="container analytic-11 ">
              <div className="col-md-12 ">
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
                    <div className="col-md-4 analytic-14">
                      <div className="row ">
                        <div className="col-md-6 this_week ">
                          <a data-toggle="dropdown">
                            {this.state.range_name} <ArrowDropDownIcon />
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

                        <div className="col-md-6">
                          <PDFDownloadLink
                            document={this.Quixote(pdf_data)}
                            fileName="profile_analytics_report.pdf"
                          >
                            {({ blob, url, loading, error }) =>
                              loading ? (
                                <a className="btn btn-analytic-13">
                                  <h6>Loading...</h6>
                                </a>
                              ) : (
                                <a className="btn btn-analytic-13">
                                  <h6>Download Report</h6>
                                </a>
                              )
                            }
                          </PDFDownloadLink>
                        </div>
                      </div>
                      <div className="row total_top ">
                        <div className="col-md-3  ">
                          <img src={fb2} />
                        </div>
                        <div className="col-md-6" style={{ lineHeight: 0 }}>
                          <p className="analytic-16">
                            {parseInt(fViews1) + parseInt(profileViews1)}
                          </p>
                          <p className="analytic-17">Total profile view</p>
                        </div>
                        <div className="col-md-3 ">
                          {parseInt(profileViews1) - parseInt(profileViews2) >
                          0 ? (
                            <div style={{ color: "green" }}>
                              {"+" +
                                (
                                  ((parseInt(profileViews1) -
                                    parseInt(profileViews2)) *
                                    100) /
                                  (parseInt(fViews1) + parseInt(profileViews1))
                                )
                                  .toString()
                                  .slice(0, 4) +
                                " %"}
                            </div>
                          ) : parseInt(profileViews1) -
                              parseInt(profileViews2) <
                            0 ? (
                            <div style={{ color: "red" }}>
                              {(
                                ((parseInt(profileViews1) -
                                  parseInt(profileViews2)) *
                                  100) /
                                (parseInt(fViews1) + parseInt(profileViews1))
                              )
                                .toString()
                                .slice(0, 5) + " %"}
                            </div>
                          ) : parseInt(profileViews1) -
                              parseInt(profileViews2) ==
                            0 ? (
                            "0%"
                          ) : (
                            "-"
                          )}
                        </div>
                      </div>
                      <div className="row total_top">
                        <div className="col-md-3  ">
                          <img src={fb2} />
                        </div>
                        <div className="col-md-6" style={{ lineHeight: 0 }}>
                          <p className="analytic-16">
                            {" "}
                            {parseInt(fWeb1) + parseInt(gWeb1)}
                          </p>
                          <p className="analytic-17">Website Visit</p>
                        </div>
                        <div className="col-md-3  ">
                          {parseInt(gWeb1) - parseInt(gWeb2) > 0 ? (
                            <div style={{ color: "green" }}>
                              {"+" +
                                (
                                  ((parseInt(gWeb1) - parseInt(gWeb2)) * 100) /
                                  (parseInt(fWeb1) + parseInt(gWeb1))
                                )
                                  .toString()
                                  .slice(0, 4) +
                                " %"}
                            </div>
                          ) : parseInt(gWeb1) - parseInt(gWeb2) < 0 ? (
                            <div style={{ color: "red" }}>
                              {(
                                ((parseInt(gWeb1) - parseInt(gWeb2)) * 100) /
                                (parseInt(fWeb1) + parseInt(gWeb1))
                              )
                                .toString()
                                .slice(0, 5) + " %"}
                            </div>
                          ) : parseInt(gWeb1) - parseInt(gWeb2) == 0 ? (
                            "0%"
                          ) : (
                            "-"
                          )}
                        </div>
                      </div>
                      <div className="row total_top">
                        <div className="col-md-3  ">
                          <img src={fb2} />
                        </div>
                        <div className="col-md-6" style={{ lineHeight: 0 }}>
                          <p className="analytic-16">
                            {" "}
                            {parseInt(fcalls1) + parseInt(gcalls1)}
                          </p>
                          <p className="analytic-17">Phone calls</p>
                        </div>
                        <div className="col-md-3  ">
                          {parseInt(gcalls1) - parseInt(gcalls2) > 0 ? (
                            <div style={{ color: "green" }}>
                              {"+" +
                                (
                                  ((parseInt(gcalls1) - parseInt(gcalls2)) *
                                    100) /
                                  (parseInt(fcalls1) + parseInt(gcalls1))
                                )
                                  .toString()
                                  .slice(0, 4) +
                                " %"}
                            </div>
                          ) : parseInt(gcalls1) - parseInt(gcalls2) < 0 ? (
                            <div style={{ color: "red" }}>
                              {(
                                ((parseInt(gcalls1) - parseInt(gcalls2)) *
                                  100) /
                                (parseInt(fcalls1) + parseInt(gcalls1))
                              )
                                .toString()
                                .slice(0, 5) + " %"}
                            </div>
                          ) : parseInt(gcalls1) - parseInt(gcalls2) == 0 ? (
                            "0%"
                          ) : (
                            "-"
                          )}
                        </div>
                      </div>
                      <div className="row total_top">
                        <div className="col-md-3  ">
                          <img src={fb2} />
                        </div>
                        <div className="col-md-6" style={{ lineHeight: 0 }}>
                          <p className="analytic-16">
                            {" "}
                            {parseInt(fdirection1) + parseInt(gdirection1)}
                          </p>
                          <p className="analytic-17">Direction request</p>
                        </div>
                        <div className="col-md-3  ">
                          {parseInt(gdirection1) - parseInt(gdirection2) > 0 ? (
                            <div style={{ color: "green" }}>
                              {"+" +
                                (
                                  ((parseInt(gdirection1) -
                                    parseInt(gdirection2)) *
                                    100) /
                                  (parseInt(fdirection1) +
                                    parseInt(gdirection1))
                                )
                                  .toString()
                                  .slice(0, 4) +
                                " %"}
                            </div>
                          ) : parseInt(gdirection1) - parseInt(gdirection2) <
                            0 ? (
                            <div style={{ color: "red" }}>
                              {(
                                ((parseInt(gdirection1) -
                                  parseInt(gdirection2)) *
                                  100) /
                                (parseInt(fdirection1) + parseInt(gdirection1))
                              )
                                .toString()
                                .slice(0, 5) + " %"}
                            </div>
                          ) : parseInt(gdirection1) - parseInt(gdirection2) ==
                            0 ? (
                            "0%"
                          ) : (
                            "-"
                          )}
                        </div>
                      </div>
                      <div className="row total_top">
                        <div className="col-md-3  ">
                          <img src={fb2} />
                        </div>
                        <div className="col-md-6" style={{ lineHeight: 0 }}>
                          <p className="analytic-16">
                            {" "}
                            {parseInt(gcalls1) +
                              parseInt(gdirection1) +
                              parseInt(gWeb1) +
                              parseInt(fclicks1)}
                          </p>
                          <p className="analytic-17">Button clicks</p>
                        </div>
                        <div className="col-md-3  ">
                          {parseInt(gdirection1) +
                            parseInt(gcalls1) +
                            parseInt(gWeb1) -
                            parseInt(gdirection2) -
                            parseInt(gcalls2) -
                            parseInt(gWeb2) >
                          0 ? (
                            <div style={{ color: "green" }}>
                              {"+" +
                                (
                                  ((parseInt(gdirection1) +
                                    parseInt(gcalls1) +
                                    parseInt(gWeb1) -
                                    parseInt(gdirection2) -
                                    parseInt(gcalls2) -
                                    parseInt(gWeb2)) *
                                    100) /
                                  (parseInt(gcalls1) +
                                    parseInt(gdirection1) +
                                    parseInt(gWeb1) +
                                    parseInt(fclicks1))
                                )
                                  .toString()
                                  .slice(0, 4) +
                                " %"}
                            </div>
                          ) : parseInt(gdirection1) +
                              parseInt(gcalls1) +
                              parseInt(gWeb1) -
                              parseInt(gdirection2) -
                              parseInt(gcalls2) -
                              parseInt(gWeb2) <
                            0 ? (
                            <div style={{ color: "red" }}>
                              {(
                                ((parseInt(gdirection1) +
                                  parseInt(gcalls1) +
                                  parseInt(gWeb1) -
                                  parseInt(gdirection2) -
                                  parseInt(gcalls2) -
                                  parseInt(gWeb2)) *
                                  100) /
                                (parseInt(gcalls1) +
                                  parseInt(gdirection1) +
                                  parseInt(gWeb1) +
                                  parseInt(fclicks1))
                              )
                                .toString()
                                .slice(0, 5) + " %"}
                            </div>
                          ) : parseInt(gdirection1) +
                              parseInt(gcalls1) +
                              parseInt(gWeb1) -
                              parseInt(gdirection2) -
                              parseInt(gcalls2) -
                              parseInt(gWeb2) ==
                            0 ? (
                            "0%"
                          ) : (
                            "-"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-7  analytic-14">
                      <table class="table table-hover">
                        <thead className="head_font">
                          <tr>
                            <th scope="col">Profiles 02</th>
                            <th scope="col">Profiles views</th>
                            <th scope="col">Website views</th>
                            <th scope="col">Phone calls</th>
                            <th scope="col">Direction Request</th>
                            <th scope="col">Button clicks</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row" className="analytics-17">
                              Consolidated
                            </th>
                            <td>
                              {parseInt(this.state.fViews1) +
                                parseInt(this.state.profileViews1)}
                            </td>
                            <td>
                              {parseInt(this.state.fWeb1) +
                                parseInt(this.state.gWeb1)}
                            </td>
                            <td>
                              {parseInt(this.state.fcalls1) +
                                parseInt(this.state.gcalls1)}
                            </td>
                            <td>
                              {parseInt(this.state.gdirection1) +
                                parseInt(this.state.fdirection1)}
                            </td>
                            <td>
                              {parseInt(this.state.gcalls1) +
                                parseInt(this.state.gdirection1) +
                                parseInt(this.state.gWeb1) +
                                parseInt(this.state.fclicks1)}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row" className="analytics-17">
                              Google
                            </th>
                            <td>{this.state.profileViews}</td>
                            <td>{this.state.gWeb}</td>
                            <td>{this.state.gcalls} </td>
                            <td>{this.state.gdirection}</td>
                            <td>
                              {this.state.gcalls == "-"
                                ? "-"
                                : parseInt(this.state.gcalls) +
                                  parseInt(this.state.gdirection) +
                                  parseInt(this.state.gWeb)}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row" className="analytics-17">
                              Facebook
                            </th>
                            <td>{this.state.fViews}</td>
                            <td>{this.state.fWeb}</td>
                            <td>{this.state.fcalls} </td>
                            <td>{this.state.fdirection}</td>
                            <td>{this.state.fclicks}</td>
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
                )}
              </div>
            </div>
          </div>
        )}
        {/* </div> */}
      </>
    );
  }
}
