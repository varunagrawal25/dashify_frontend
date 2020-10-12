import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { all_connection_of_one_location } from "./apis/social_platforms";
import {
  location_by_id,
  business_categories,
  business_states,
} from "./apis/location";

import {
  faqs_by_id,
  edit_faq,
  all_faq_by_location_id,
  delete_faq,
  all_faq,
  add_faq,
} from "./apis/voice";
import GoogleLogin from "react-google-login";
import Spinner from "./common/Spinner";
import { MDBRow, MDBCol, MDBBtn, MDBCard, MDBContainer } from "mdbreact";
import vl_img1 from "./assets/vl_img1.png";
import vl_img2 from "./assets/vl_img2.png";
import vl_img3 from "./assets/vl_img3.png";
import vl_img4 from "./assets/vl_img4.png";
import vl_img5 from "./assets/vl_img5.png";
import vl_img6 from "./assets/vl_img6.png";
import vl_img7 from "./assets/vl_img7.png";
import vl_img8 from "./assets/vl_img8.png";
import vl_img9 from "./assets/vl_img9.png";
import vl_img10 from "./assets/vl_img10.png";
import vl_img11 from "./assets/vl_img11.png";
import attachment from "./assets/attachment.png";

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") },
};

class NewFaq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      que: "",
      ans: "",
    };
  }

  handler = (event) => {
    console.log("states", this.state);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="conntend">
        <div className="row d-flex ">
          <div className="col-md-8">
            <div className="faq-title">
              <h4>
                Question :{" "}
                <input
                  type="text"
                  className="form-group"
                  name="que"
                  onChange={this.handler}
                />
              </h4>
            </div>
            <div className="faq-title">
              <h4>
                Answer :{" "}
                <input
                  type="text"
                  name="ans"
                  className="form-group"
                  onChange={this.handler}
                />
              </h4>
            </div>
          </div>

          <div className="col-md-2">
            <button
              onClick={this.props.submit(this.state.que, this.state.ans)}
              className="btn"
            >
              Save
            </button>
          </div>
          <div className="col-md-2">
            <button onClick={this.props.cancel} className="btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class UpdateFaq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      que: "",
      ans: "",
    };
  }

  handler = (event) => {
    console.log("states", this.state);
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    console.log("update");
    var data = {
      faq_id: this.props.faqid,
    };

    // Axios.post(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/voice-faq/get-faqs-by-id",
    //   data,
    //   DjangoConfig
    // )
    faqs_by_id(data, DjangoConfig).then((resp) => {
      console.log(resp);
      this.setState({
        que: resp.data.all_faqs.question,
        ans: resp.data.all_faqs.answer,
      });
    });

    console.log(this.props.faqid);
  }

  render() {
    return (
      <div className="conntend">
        <div className="row d-flex ">
          <div className="col-md-8">
            <div className="faq-title">
              <h4>
                Question :{" "}
                <input
                  type="text"
                  className="form-group"
                  name="que"
                  value={this.state.que}
                  onChange={this.handler}
                />
              </h4>
              <div style={{ color: "red" }}>{this.props.error.que_error}</div>
            </div>
            <div className="faq-title">
              <h4>
                Answer :{" "}
                <input
                  type="text"
                  name="ans"
                  className="form-group"
                  value={this.state.ans}
                  onChange={this.handler}
                />
              </h4>
              <div style={{ color: "red" }}>{this.props.error.ans_error}</div>
            </div>
          </div>

          <div className="col-md-2">
            <button
              onClick={this.props.update(
                this.state.que,
                this.state.ans,
                this.props.faqid
              )}
              className="btn"
            >
              update
            </button>
          </div>
          <div className="col-md-2">
            <button onClick={this.props.cancel} className="btn">
              cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default class VoiceListing extends Component {
  state = {
    loader: true,
    logo: "",
    state: "",
    category: "",
    name: "",
    address: "",
    phone: "",
    about: "",
    city: "",
    postalCode: "",

    new: false,
    allFaq: [],

    update: false,
    faqid: "",

    htmlc: "",
    javac: "",
    allListings: [],
    googleLoggedIn: false,
    yelpIsLoggedIn: false,
    foursquareIsLoggedIn: false,
    appleIsLoggedIn: false,
    yelpAlexa: false,
    fourBixby: false,
    googleOptimized: false,
    appleOptimized: false,

    que_error: "",
    ans_error: "",
  };

  updateFaq = (que, ans, id) => (event) => {
    event.preventDefault();
    console.log("update but");

    console.log("he");
    console.log(que);
    var data = {
      Location_id: this.props.match.params.locationId,
      question: que,
      answer: ans,
      faq_id: id,
    };
    console.log(data);
    console.log(this.state.allFaq);

    this.setState({ que_error: "", ans_error: "" });

    let is_que = false,
      is_ans = false;

    if (que) {
      is_que = true;
    } else {
      this.setState({ que_error: "Question can not be empty" });
    }

    if (ans) {
      is_ans = true;
    } else {
      this.setState({ ans_error: "Answer can not be empty" });
    }

    if (is_ans && is_que) {
      // Axios.post(
      //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/voice-faq/edit-faq",
      //   data,
      //   DjangoConfig
      // )
      edit_faq(data, DjangoConfig).then((resp) => {
        console.log(resp);
        // Axios.get(
        //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/voice-faq/get-all-faqs",
        //   DjangoConfig
        // )
        all_faq(DjangoConfig).then((resp) => {
          console.log(resp);
          this.setState({ allFaq: resp.data.all_faqs, update: false });
        });
      });
    }
  };

  editFaq = (id) => {
    console.log("edit");

    this.setState({ faqid: id, update: true });
  };

  deleteFaq = (nameid) => {
    alert("You are going to delete this FAQ");

    console.log(" delete");

    var data = {
      faq_id: nameid,
    };

    // Axios.post(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/voice-faq/delete-faq",
    //   data,
    //   DjangoConfig
    // )
    delete_faq(data, DjangoConfig).then((resp) => {
      console.log(resp);
      // Axios.get(
      //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/voice-faq/get-all-faqs",
      //   DjangoConfig
      // )
      all_faq(DjangoConfig).then((resp) => {
        console.log(resp);
        this.setState({ allFaq: resp.data.all_faqs });
      });
    });
  };

  submitFaq = (que, ans) => (event) => {
    event.preventDefault();

    this.setState({ new: false });
    var data = {
      Location: this.props.match.params.locationId,
      question: que,
      answer: ans,
    };
    add_faq(data, DjangoConfig).then((resp) => {
      all_faq(DjangoConfig).then((resp) => {
        console.log(resp);
        this.setState({ allFaq: resp.data.all_faqs });
      });
    });
  };

  submitCancel = (e) => {
    this.setState({ new: false });
  };
  updateCancel = (e) => {
    this.setState({ update: false });
  };

  addFaq = (e) => {
    this.setState({ new: true });
    console.log("add");
  };
  installWedget = (e) => {
    var dynadiv = "";
    var dynaJs = "";
    if (this.state.allFaq.length > 0) {
      this.state.allFaq.map((r) => {
        dynadiv +=
          "<div class='faq'> <div class='faq-question'> <span class='faq-question-label'>Q.</span> <span class='faq-value'>" +
          r.question +
          "</span> </div><div> <span class='faq-answer-label'>A.</span> <span class='faq-value'>" +
          r.answer +
          "</span> </div></div>";
        dynaJs +=
          '{"@type":"Question","name":"' +
          r.question +
          '","acceptedAnswer":{"@type":"Answer","text":"' +
          r.answer +
          '"}},';
      });

      this.setState({
        htmlc:
          "<style>body{background: #e9ecee; padding: 2%;}​ .faq{margin-top: 2%;}.faq-question{background: whitesmoke font-weight: bold;}​ .faq-question-label{font-size: large;}​ .faq-answer-label{font-size: large;}.faq-value{font-size: large; margin-left: 1%;}</style> " +
          dynadiv,

        javac:
          '<script type="application/ld+json">{"@context":"http://schema.org","@type":"FAQPage","mainEntity":[' +
          dynaJs +
          "]]}</script>",
      });
    }
  };

  componentDidMount() {
    const data = {
      location_id: this.props.match.params.locationId,
    };

    location_by_id(data, DjangoConfig).then((resp) => {
      console.log("hi");
      this.setState({ state: "Loading....", category: "Loading...." });
      business_states(DjangoConfig).then((resp1) => {
        resp1.data.status.map((s, i) =>
          s.id == resp.data.location.State
            ? this.setState({ state: s.State_name })
            : ""
        );
      });

      business_categories(DjangoConfig).then((resp1) => {
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

        loader: false,
      });
    });

    var datal = {
      location_id: this.props.match.params.locationId,
    };

    all_faq_by_location_id(datal, DjangoConfig).then((resp) => {
      console.log("all faq", resp);
      this.setState({ allFaq: resp.data.all_faqs });
    });

    const Yelpconfig = {
      headers: {
        Authorization:
          "bearer _1cVnrrkqmG_dwNUdtorVxarkzItJM7AWM700rkRxM7aPdDfxJECcdaN00ADjSkrStF1pX4sdGCspYeSjU7VGkpjWYoMsC2_filBf5d5J5GMRTgXws_W6qusNMhYX3Yx",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost",
      },
    };

    all_connection_of_one_location(data, DjangoConfig)
      .then((resp) => {
        console.log("get all connections", resp);
        this.setState({ allListings: resp.data.data });

        if (this.state.allListings) {
          this.state.allListings.map((l) => {
            if (l.Social_Platform.Platform == "Google") {
              const GoogleConfig = {
                headers: { Authorization: "Bearer " + l.Social_Platform.Token },
              };

              let locationIdGoogle = l.Social_Platform.Other_info;

              Axios.get(
                "https://mybusiness.googleapis.com/v4/" + locationIdGoogle,
                GoogleConfig
              ).then((res) => {
                console.log("google location details", res.data);
                this.setState({ googleLoggedIn: true });

                if (
                  res.data.primaryCategory &&
                  res.data.regularHours &&
                  res.data.regularHours.periods &&
                  res.data.websiteUrl &&
                  res.data.locationName &&
                  res.data.address &&
                  res.data.primaryPhone
                ) {
                  if (
                    res.data.primaryCategory.categoryId &&
                    res.data.regularHours.periods.length > 0 &&
                    res.data.address.regionCode &&
                    res.data.address.postalCode &&
                    res.data.address.locality &&
                    res.data.address.administrativeArea
                  ) {
                    this.setState({
                      googleOptimized: true,
                    });
                  }
                }
              });
            }

            if (l.Social_Platform.Platform == "Foursquare") {
              console.log("yes four");
              var fourUrl = l.Social_Platform.Other_info.split(",")[0]
                .slice(7)
                .split("/")[5];
              Axios.get(
                "https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v2/venues/" +
                  fourUrl +
                  "?client_id=44RU2431YG02H4E00RQTLKEUKIKINQSFO2JBHII2WHH32PXZ&client_secret=FWV2WOL40MQ5M1YZ5E2TKUWIQ4WYZ1QUJXOQ24VGRSXFA3IY&v=20180323"
              ).then((res) => {
                console.log("foursquare data", res.data.response.venue);
                var fouro = res.data.response.venue;
                if (
                  fouro.categories &&
                  fouro.hours &&
                  fouro.hours.dayData &&
                  fouro.name &&
                  fouro.location.city &&
                  fouro.location.country &&
                  fouro.location.state
                ) {
                  if (
                    fouro.categories.length > 0 &&
                    fouro.hours.dayData.length > 0
                  ) {
                    this.setState({
                      fourBixby: true,
                    });
                  }
                }
              });
              this.setState({
                foursquareIsLoggedIn: true,
              });
            }

            if (l.Social_Platform.Platform == "Yelp") {
              console.log("yes yelp");
              var yelpUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);

              Axios.get(
                "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
                  yelpUrl.slice(25),
                Yelpconfig
              ).then((resp) => {
                console.log("hii");
                console.log("yelpDetails", resp.data);

                if (
                  resp.data.categories &&
                  resp.data.alias &&
                  resp.data.display_phone &&
                  resp.data.hours[0].open &&
                  resp.data.location.address1 &&
                  resp.data.location.city &&
                  resp.data.location.country
                ) {
                  if (
                    resp.data.categories.length > 0 &&
                    resp.data.hours[0].open.length > 0
                  ) {
                    this.setState({
                      yelpAlexa: true,
                    });
                  }
                }
              });
              this.setState({
                yelpIsLoggedIn: true,
              });
            }

            if (l.Social_Platform.Platform == "Apple") {
              console.log("yes Apple");
              var appleUrl = l.Social_Platform.Other_info.split(",")[0]
                .slice(7)
                .split("/")[6]
                .slice(2);

              Axios.get(
                "https://itunes.apple.com/in/rss/customerreviews/id=" +
                  appleUrl +
                  "/sortBy=mostRecent/json"
              ).then((res) => {
                console.log("apple data in json", res.data);
              });
              this.setState({
                appleIsLoggedIn: true,
              });
            }
          });
        }
        this.setState({ loader: false });
      })
      .catch((res) => {
        console.log("error in voice listing", res);
        this.setState({ loader: false });
      });
  }

  htmlcopy = (e) => {
    e.preventDefault();
    document.querySelector("#htmlcode").select();
    document.execCommand("copy");
  };

  javacopy = (e) => {
    e.preventDefault();
    document.querySelector("#javascriptcode").select();
    document.execCommand("copy");
  };

  responseErrorGoogle = (response) => {
    console.log(response);
    alert("try again");
  };

  responseGoogle = async (response) => {
    console.log("google response", response);

    let state = {
      Token: response.accessToken,
      Username: response.profileObj.name,
      Email: response.profileObj.email,
      location_id: this.props.match.params.locationId,
      redirect_to: "/voice-listing",
    };
    this.props.history.push({
      pathname: `/google-connectedaccounts/${encodeURIComponent(
        JSON.stringify(state)
      )}`,
    });
  };

  render() {
    if (this.state.otherImage) {
      var otherIma = this.state.otherImage.map((img, i) => (
        <img src={img.Image} className="vl_img" />
      ));
    }

    if (this.state.allFaq.map) {
      var AllFaq = this.state.allFaq.map((r) => {
        var nameid = r.id;

        return (
          <div>
            <MDBRow>
              <MDBCol md="7" className="offset-md-1">
                <div className="vl_c3_subhead"> {r.question}</div>
                <div className="vl_contant">{r.answer}</div>
              </MDBCol>
              {/* <MDBCol className=" col-md-2 col-md-offset-2">
              <MDBBtn onClick={() => this.deleteFaq(nameid)} className="vl_btn_c3_edit">Delete</MDBBtn>
            </MDBCol> */}
              <MDBCol md="2" className="offset-md-2">
                <MDBBtn
                  onClick={() => this.editFaq(nameid)}
                  className="vl_btn_c3_edit"
                >
                  Edit
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <hr className="voice_hr" />
          </div>
        );
      });
    }
    return (
      <div>
        {this.props.match.params.locationId != "null" ? (
          <div>
            <MDBContainer>
              <div className="setting-10">
                <h3>Voice Listing</h3>
              </div>
              <MDBRow className="voice_container">
                <MDBCol sm="12" md="5" lg="5">
                  <MDBRow>
                    <MDBCol sm="5" md="5" lg="5">
                      <img
                        // src={vl_img1}
                        // alt="vl_img1"
                        src={
                          this.state.logo
                            ? this.state.logo
                            : require("../images/Logo2.png")
                        }
                        className="responsive"
                        id="vl_img1"
                      />
                    </MDBCol>
                    <MDBCol sm="7" md="7" lg="7">
                      <div id="vl_heading">{this.state.name}</div>
                      <div className="vl_contant">{this.state.category}</div>
                      <div className="vl_subhead" style={{ marginTop: "10%" }}>
                        ADDRESS AND CONTACT
                      </div>
                      <div className="vl_contant">
                        {this.state.address}, {this.state.state} ,
                        {this.state.postalCode}
                        <br />
                        {this.state.phone ? `P : ${this.state.phone}` : ""}
                      </div>
                      <MDBBtn
                        id="vl_btn_edit"
                        href={`/dashboard#/locations/${localStorage.getItem(
                          "locationId"
                        )}/view-location`}
                      >
                        Edit
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol xs="12" md="7" lg="7">
                  <div className="vl_subhead" id="buss_desc">
                    BUSINESS DESCRIPTION
                  </div>
                  <div className="vl_contant">{this.state.about}</div>
                  <MDBRow>
                    {this.state.otherImage
                      ? this.state.otherImage.map((img, i) => (
                          <img src={img.Image} className="vl_img" />
                        ))
                      : ""}
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <MDBContainer className="voice_container">
              <MDBRow>
                <div className="col-md-12">
                  <ul className="main-listfive">
                    <li>
                      <div className="img-iconbox col-md-4 ">
                        <img
                          src={vl_img7}
                          alt="vl_img"
                          className="vl_c2_icon"
                        />
                      </div>
                      <div className="text-iconbox">
                        <div className="vl_card_head">Google Assistant</div>
                        {/* <MDBBtn id="vl_btn_optimize">Optimize</MDBBtn> */}
                        {this.state.googleLoggedIn ? (
                          this.state.googleOptimized ? (
                            <a className="progressb">
                              <i className="zmdi zmdi-check-circle"></i>
                              Optimization in progress
                            </a>
                          ) : (
                            <p style={{ color: "red" }}>can't optimise</p>
                          )
                        ) : (
                          <GoogleLogin
                            //for localhost
                            clientId="759599444436-po5k7rhkaqdu55toirpt5c8osaqln6ul.apps.googleusercontent.com"
                            //for server
                            // clientId="759599444436-5litbq8gav4ku8sj01o00uh6lsk8ebr0.apps.googleusercontent.com"
                            // buttonText="Optimize"
                            scope="https://www.googleapis.com/auth/business.manage"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseErrorGoogle}
                            cookiePolicy={"single_host_origin"}
                            className="vl_google_btn"
                          >
                            login
                          </GoogleLogin>
                        )}
                      </div>
                    </li>

                    <li>
                      <div className="img-iconbox col-md-4">
                        <img
                          src={vl_img8}
                          alt="vl_img"
                          className="vl_c2_icon"
                        />
                      </div>
                      <div className="text-iconbox">
                        <div className="vl_card_head">Amazon Alexa</div>
                        {this.state.yelpIsLoggedIn ? (
                          this.state.yelpAlexa ? (
                            <div className="vl_link">
                              <img
                                src={attachment}
                                alt="attachment_icon"
                                className="attachment"
                              />
                              Optimizacion in progress
                            </div>
                          ) : (
                            <p style={{ color: "red" }}>can't optimise</p>
                          )
                        ) : (
                          <MDBBtn id="vl_btn_optimize" href="/yelplogin">
                            Optimize
                          </MDBBtn>
                        )}
                      </div>
                    </li>

                    <li>
                      <div className="img-iconbox col-md-4">
                        <img
                          src={vl_img9}
                          alt="vl_img"
                          className="vl_c2_icon"
                        />
                      </div>
                      <div className="text-iconbox">
                        <div className="vl_card_head">Apple Siri</div>
                        {this.state.appleIsLoggedIn ? (
                          this.state.appleOptimized ? (
                            <div className="vl_link">
                              <img
                                src={attachment}
                                alt="attachment_icon"
                                className="attachment"
                              />
                              Optimizacion in progress
                            </div>
                          ) : (
                            <p style={{ color: "red" }}>can't optimise</p>
                          )
                        ) : (
                          <MDBBtn id="vl_btn_optimize" href="/applelogin">
                            Optimize
                          </MDBBtn>
                        )}
                      </div>
                    </li>

                    <li>
                      <div className="img-iconbox col-md-4">
                        <img
                          src={vl_img10}
                          alt="vl_img"
                          className="vl_c2_icon"
                        />
                      </div>
                      <div className="text-iconbox">
                        <div className="vl_card_head">Microsoft Cortana</div>
                        <MDBBtn id="vl_btn_optimize">Optimize</MDBBtn>
                      </div>
                    </li>

                    <li>
                      <div className="img-iconbox col-md-4">
                        <img
                          src={vl_img11}
                          alt="vl_img"
                          className="vl_c2_icon"
                        />
                      </div>
                      <div className="text-iconbox">
                        <div className="vl_card_head">Samsung Bixby</div>
                        {this.state.foursquareIsLoggedIn ? (
                          this.state.fourBixby ? (
                            <div className="vl_link">
                              <img
                                src={attachment}
                                alt="attachment_icon"
                                className="attachment"
                              />
                              Optimizacion in progress
                            </div>
                          ) : (
                            <p style={{ color: "red" }}>can't optimize</p>
                          )
                        ) : (
                          <MDBBtn id="vl_btn_optimize" href="/foursquarelogin">
                            Optimize
                          </MDBBtn>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </MDBRow>
            </MDBContainer>

            <MDBContainer className="voice_container">
              <MDBRow>
                <MDBCol className="col-md-7">
                  <div id="vl_c3_head">Voice FAQs</div>
                  <div id="vl_c3_contant">
                    Add FAQs that will help you to customize your location to
                    appear in voice search{" "}
                  </div>
                </MDBCol>
                <MDBCol className="col-md-5">
                  <MDBBtn onClick={this.addFaq} id="vl_btn_FAQ">
                    + Add FAQs
                  </MDBBtn>
                  <MDBBtn
                    onClick={this.installWedget}
                    data-toggle="modal"
                    data-target="#myModal"
                    id="vl_btn_wedgets"
                  >
                    Install Wedgets
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
              <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form className="needs-validation" noValidate>
                      <div className="modal-header">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
                          <i className="zmdi zmdi-close"></i>
                        </button>
                        <h4
                          className="modal-title"
                          style={{ textAlign: "center" }}
                        >
                          Add FAQs to your website
                        </h4>
                        <p>
                          Follow the steps below to optimize your website for
                          voice search
                        </p>
                      </div>
                      <div className="modal-body" style={{ paddingTop: "0px" }}>
                        <div className="form-group enterpost">
                          <p>Step 01 </p>
                          <br />
                          <div>
                            Copy the generated html below and paste it into any
                            section of any page on your website. Feel free to
                            modify the CSS if you wish to.
                          </div>
                          <br />
                          <textarea
                            className="codearea"
                            name="htmlcode"
                            id="htmlcode"
                            value={this.state.htmlc}
                            readOnly
                          ></textarea>
                          <br />

                          <button onClick={this.htmlcopy}>Copy Code</button>

                          <br />
                          <br />
                          <br />

                          <p>Step 02 </p>
                          <br />
                          <div>
                            Copy the Javascript snippet below and paste it into
                            the head tag of your website.
                          </div>
                          <br />
                          <textarea
                            className="codearea"
                            name="javascriptcode"
                            id="javascriptcode"
                            value={this.state.javac}
                            readOnly
                          ></textarea>
                          <br />

                          <button onClick={this.javacopy}>Copy Code</button>
                          <br />
                          <br />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <hr className="voice_hr" />

              <div className="connect-box">
                {this.state.new ? (
                  <NewFaq submit={this.submitFaq} cancel={this.submitCancel} />
                ) : (
                  ""
                )}

                {this.state.update ? (
                  <UpdateFaq
                    update={this.updateFaq}
                    faqid={this.state.faqid}
                    cancel={this.updateCancel}
                    error={{
                      ans_error: this.state.ans_error,
                      que_error: this.state.que_error,
                    }}
                  />
                ) : (
                  ""
                )}

                {AllFaq}
              </div>
            </MDBContainer>
          </div>
        ) : (
          <MDBContainer>
            <div className="setting-10">
              <h3>Voice Listing</h3>
            </div>
            <div className="analytics-whice">
              <div className="box-space2">
                <h4>Connect Location first</h4>
              </div>
            </div>
          </MDBContainer>
        )}
      </div>
    );
  }
}
