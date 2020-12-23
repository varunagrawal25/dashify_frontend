import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { all_connection_of_one_location } from "../apis/social_platforms";
import {
  location_by_id,
  business_categories,
  business_states
} from "../apis/location";

import {
  faqs_by_id,
  edit_faq,
  all_faq_by_location_id,
  delete_faq,
  all_faq,
  add_faq
} from "../apis/voice";
import GoogleLogin from "react-google-login";
import Spinner from "../common/Spinner";
import { MDBRow, MDBCol, MDBBtn, MDBCard, MDBContainer } from "mdbreact";
import vl_img1 from "../assets/vl_img1.png";
import vl_img2 from "../assets/vl_img2.png";
import vl_img3 from "../assets/vl_img3.png";
import vl_img4 from "../assets/vl_img4.png";
import vl_img5 from "../assets/vl_img5.png";
import vl_img6 from "../assets/vl_img6.png";
import vl_img7 from "../assets/vl_img7.png";
import vl_img8 from "../assets/vl_img8.png";
import vl_img9 from "../assets/vl_img9.png";
import vl_img10 from "../assets/vl_img10.png";
import vl_img11 from "../assets/vl_img11.png";
import attachment from "../assets/attachment.png";

import NewFaq from "./newFaq";
import UpdateFaq from "./updateFaq";
import { secure_pin } from "../../config";
const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

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
    appleOptimized: false
  };

  editFaq = id => {
    this.setState({ faqid: id, update: true });
  };

  deleteFaq = nameid => {
    alert("You are going to delete this FAQ");

    console.log(" delete");

    var data = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      faqid: nameid
    };

    // Axios.post(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/voice-faq/delete-faq",
    //   data,
    //   DjangoConfig
    // )
    delete_faq(data).then(resp => {
      console.log(resp);
      // Axios.get(
      //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/voice-faq/get-all-faqs",
      //   DjangoConfig
      // )
      // all_faq(DjangoConfig).then(resp => {
      //   console.log(resp);
      //   this.setState({ allFaq: resp.data.all_faqs });
      // });
    });
    var datal = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.match.params.locationId
    };

    all_faq_by_location_id(datal)
      .then(resp => {
        console.log("all faq0", resp);
        console.log("all faq1", resp.data);
        this.setState({ allFaq: resp.data.faq_list });
      })
      .catch(err => {
        console.log("err in getallFaq", err);
      });
  };

  submitCancel = e => {
    this.setState({ new: false });
  };
  updateCancel = e => {
    this.setState({ update: false });
  };
  getNewAllFaq = () => {
    // all_faq(DjangoConfig)
    //   .then(resp => {
    //     console.log("AllFaq", resp.data.all_faqs);
    //     this.setState({
    //       allFaq: resp.data.all_faqs
    //     });
    //   })
    //   .catch(err => {
    //     console.log("err in getallFaq", err);
    //   });

    var datal = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.match.params.locationId
    };

    all_faq_by_location_id(datal)
      .then(resp => {
        console.log("all faq0", resp);
        console.log("all faq1", resp.data);
        this.setState({ allFaq: resp.data.faq_list });
      })
      .catch(err => {
        console.log("err in getallFaq", err);
      });
  };

  addFaq = e => {
    this.setState({ new: true });
    console.log("add");
  };
  installWedget = e => {
    var dynadiv = "";
    var dynaJs = "";
    if (this.state.allFaq.length > 0) {
      this.state.allFaq.map(r => {
        dynadiv +=
          "<div class='faq'> <div class='faq-question'> <span class='faq-question-label'>Q.</span> <span class='faq-value'>" +
          r.que +
          "</span> </div><div> <span class='faq-answer-label'>A.</span> <span class='faq-value'>" +
          r.ans +
          "</span> </div></div>";
        dynaJs +=
          '{"@type":"Question","name":"' +
          r.que +
          '","acceptedAnswer":{"@type":"Answer","text":"' +
          r.ans +
          '"}},';
      });

      this.setState({
        htmlc:
          "<style>body{background: #e9ecee; padding: 2%;}​ .faq{margin-top: 2%;}.faq-question{background: whitesmoke font-weight: bold;}​ .faq-question-label{font-size: large;}​ .faq-answer-label{font-size: large;}.faq-value{font-size: large; margin-left: 1%;}</style> " +
          dynadiv,

        javac:
          '<script type="application/ld+json">{"@context":"http://schema.org","@type":"FAQPage","mainEntity":[' +
          dynaJs +
          "]]}</script>"
      });
    }
  };

  componentDidMount() {
    const data = {
      secure_pin,
      location_id: this.props.match.params.locationId
    };
    
console.log("location44",data)
    if(this.props.match.params.locationId !=="null"){
    location_by_id(data).then(resp => {
      console.log("hi");
      this.setState({ state: "Loading....", category: "Loading...." });
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

      console.log("bbb",resp.data);
      this.setState({
        location: resp.data.location_details[0],
        name: resp.data.location_details[0].location_name,

        address: resp.data.location_details[0].address1,

        phone: resp.data.location_details[0].phone_no,

        about: resp.data.location_details[0].about_bussiness,

        city: resp.data.location_details[0].city,
        postalCode: resp.data.location_details[0].zipcode,
        logo: resp.data.location_details[0].bussiness_logo,
        cover: resp.data.location_details[0].bussiness_cover_image,
        otherImage: resp.data.location_images,

        loader: false
      });
    });
  }
    var datal = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.match.params.locationId
    };

    all_faq_by_location_id(datal).then(resp => {
      console.log("all faq", resp);
      this.setState({ allFaq: resp.data.faq_list });
    });

    const Yelpconfig = {
      headers: {
        Authorization:
          "bearer _1cVnrrkqmG_dwNUdtorVxarkzItJM7AWM700rkRxM7aPdDfxJECcdaN00ADjSkrStF1pX4sdGCspYeSjU7VGkpjWYoMsC2_filBf5d5J5GMRTgXws_W6qusNMhYX3Yx",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost"
      }
    };

    all_connection_of_one_location(data, DjangoConfig)
      .then(resp => {
        console.log("get all connections", resp);
        this.setState({ allListings: resp.data.data });

        if (this.state.allListings) {
          this.state.allListings.map(l => {
            if (l.Social_Platform.Platform == "Google") {
              const GoogleConfig = {
                headers: { Authorization: "Bearer " + l.Social_Platform.Token }
              };

              let locationIdGoogle = l.Social_Platform.Other_info;

              Axios.get(
                "https://mybusiness.googleapis.com/v4/" + locationIdGoogle,
                GoogleConfig
              ).then(res => {
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
                      googleOptimized: true
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
              ).then(res => {
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
                      fourBixby: true
                    });
                  }
                }
              });
              this.setState({
                foursquareIsLoggedIn: true
              });
            }

            if (l.Social_Platform.Platform == "Yelp") {
              console.log("yes yelp");
              var yelpUrl = l.Social_Platform.Other_info.split(",")[0].slice(7);

              Axios.get(
                "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" +
                  yelpUrl.slice(25),
                Yelpconfig
              ).then(resp => {
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
                      yelpAlexa: true
                    });
                  }
                }
              });
              this.setState({
                yelpIsLoggedIn: true
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
              ).then(res => {
                console.log("apple data in json", res.data);
              });
              this.setState({
                appleIsLoggedIn: true
              });
            }
          });
        }
        this.setState({ loader: false });
      })
      .catch(res => {
        console.log("error in voice listing", res);
        this.setState({ loader: false });
      });
  }

  htmlcopy = e => {
    e.preventDefault();
    document.querySelector("#htmlcode").select();
    document.execCommand("copy");
  };

  javacopy = e => {
    e.preventDefault();
    document.querySelector("#javascriptcode").select();
    document.execCommand("copy");
  };

  responseErrorGoogle = response => {
    console.log(response);
    alert("try again");
  };

  responseGoogle = async response => {
    console.log("google response", response);

    let state = {
      Token: response.accessToken,
      Username: response.profileObj.name,
      Email: response.profileObj.email,
      location_id: this.props.match.params.locationId,
      redirect_to: "/voice-listing"
    };
    this.props.history.push({
      pathname: `/google-connectedaccounts/${encodeURIComponent(
        JSON.stringify(state)
      )}`
    });
  };

  render() {
    if (this.state.otherImage) {
      var otherIma = this.state.otherImage.map((img, i) => (
        <img src={"https://digimonk.net/dashify-ci/assets/upload/images/business-type-image/" +
        img.image
      } className="vl_img" />
      ));
    }
console.log("this.state.allFaq",this.state.allFaq)
    if (this.state.allFaq) {
      var AllFaq = this.state.allFaq.map(r => {
        var nameid = r.id;

        return (
          <div>
            {this.state.update?(
              null
  //           <MDBRow>
              
  //           <MDBCol md='8'  >
  // <MDBRow className='vl_gap1'>
  //   <MDBCol md='3' className="vl_input_head">
  //   Question :
  //   </MDBCol>
  //   <MDBCol md='9' >
  //                    <input
  //                   type="text"
  //                   className="vl_input"
  //                   name="que"
  //                   value={this.state.que}
  //                   onChange={this.handler}
  //                 />
  //                 <div style={{ color: "red" }}>{this.state.que_error}</div>
  //   </MDBCol>
  // </MDBRow>
  // <MDBRow className='vl_gap1'>
  //   <MDBCol md='3' className="vl_input_head ">
  //   Answer :
  //   </MDBCol>
  //   <MDBCol md='9' >
  //   <textarea
  //                    type="text"
  //                    name="ans"
  //                    className="vl_input"
  //                    value={this.state.ans}
  //                    onChange={this.handler}
  //                  />
  //                 <div style={{ color: "red" }}>{this.state.ans_error}</div>
  //   </MDBCol>
  // </MDBRow>
  //           </MDBCol>
           
  //             <MDBCol md="4" className='vl_gap2' >
  //                         <button
  //               // onClick={this.updateFaq(
  //               //   this.state.que,
  //               //   this.state.ans,
  //               //   this.props.faqid
  //               // )}
  //               className="user_btn"
  //             >
  //               Update
  //             </button>
  //             <button onClick={this.updateCancel} className="user_btn">
  //               Cancel
  //             </button>
  //           {/* <div className="warning">{show_err_updatefaq}</div> */}
  //           </MDBCol>
  //           </MDBRow>
           
           ):(<>
              <MDBRow>
              <MDBCol md="7" className="offset-md-1">
                <div className="vl_c3_subhead"> {r.que}</div>
                <div className="vl_contant">{r.ans}</div>
              </MDBCol>
              <MDBCol md="1" >
                <MDBBtn
                  onClick={() => this.editFaq(nameid)}
                  className="vl_btn_c3_edit"
                  style={{marginLeft:'70px'}}
                >
                  Edit
                </MDBBtn>
              </MDBCol>
              <MDBCol md="1" className="offset-md-1">
                <MDBBtn
                  onClick={() => this.deleteFaq(nameid)}
                  className="vl_btn_c3_delete"
                >
                  Delete
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <hr className="voice_hr" />
            </>
            )}
           
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
                            ? "https://digimonk.net/dashify-ci/assets/upload/images/business-type-image/" + this.state.logo
                            : require("../../images/Logo2.png")
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
                        {this.state.address} {this.state.state}{" "}
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
                        <img src={"https://digimonk.net/dashify-ci/assets/upload/images/business-type-image/" +
                        img.image
                      } className="vl_img" />
                        ))
                      : ""}
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <MDBContainer className="voice_container">
              <MDBRow>
                <div className="col-md-12 vl_c2">
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
                        {/* <MDBBtn className="vl_btn_optimize">Optimize</MDBBtn> */}
                        {this.state.googleLoggedIn ? (
                          this.state.googleOptimized ? (
                            <a className="progressb">
                              <i className="zmdi zmdi-check-circle"></i>
                              Optimization in progress
                            </a>
                          ) : (
                            <p className="vl_link" style={{ color: "red" }}>can't optimise</p>
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
                            className="vl_btn_optimize"
                            buttonText="Optimize"
                            icon={false}
                          />
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
                            <p className="vl_link" style={{ color: "red" }}>can't optimise</p>
                          )
                        ) : (
                          <MDBBtn className="vl_btn_optimize" href="/yelplogin">
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
                            <p className="vl_link" style={{ color: "red" }}>can't optimise</p>
                          )
                        ) : (
                          <MDBBtn
                            className="vl_btn_optimize"
                            href="/applelogin"
                          >
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
                        <MDBBtn className="vl_btn_optimize">Optimize</MDBBtn>
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
                            <p className="vl_link" style={{ color: "red" }}>can't optimize</p>
                          )
                        ) : (
                          <MDBBtn
                            className="vl_btn_optimize"
                            href="/foursquarelogin"
                          >
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
                      <div className="modal-header modal_header">
                        <span
                          className="vl_modal_head"
                          style={{ width: "75%" }}
                        >
                          Add FAQs to your website
                        </span>
                        <span>
                          <button
                            type="button"
                            className="close_icon"
                            data-dismiss="modal"
                          >
                            &times;
                          </button>
                        </span>
                        {/* <MDBRow style={{ background: "green" }}>
                          <MDBCol
                            md="10"
                            className="vl_modal_head"
                            style={{ background: "red" }}
                          >
                            Add FAQs to your website
                          </MDBCol>
                          <MDBCol md="2" style={{ background: "yellow" }}>
                            <button
                              type="button"
                              className="close_icon"
                              data-dismiss="modal"
                            >
                              &times;
                            </button>
                          </MDBCol>
                        </MDBRow> */}
                      </div>
                      <div className="vl_modal_contant0">
                        Follow the steps below to optimize your website for
                        voice search.
                      </div>
                      <div style={{ padding: "0px 6%" }}>
                        <div className="modal-body">
                          <div className="form-group enterpost">
                            <div className="vl_modal_subhead">Step 01 </div>
                            <div className="vl_modal_contant">
                              Copy the generated html below and paste it into
                              any section of any page on your website. Feel free
                              to modify the CSS if you wish to.
                            </div>
                            <textarea
                              className="codearea"
                              name="htmlcode"
                              id="htmlcode"
                              value={this.state.htmlc}
                              readOnly
                              className="vl_modal_contant"
                            />
                            <button
                              onClick={this.htmlcopy}
                              className="vl_modal_btn"
                            >
                              Copy Code
                            </button>
                            <hr id="vl_hr" />
                            <div className="vl_modal_subhead">Step 02 </div>
                            <div className="vl_modal_contant">
                              Copy the Javascript snippet below and paste it
                              into the head tag of your website.
                            </div>
                            <textarea
                              className="codearea"
                              name="javascriptcode"
                              id="javascriptcode"
                              value={this.state.javac}
                              readOnly
                              className="vl_modal_contant"
                            />

                            <button
                              onClick={this.javacopy}
                              className="vl_modal_btn"
                            >
                              Copy Code
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <hr className="voice_hr" />

              <div className="connect-box">
                {this.state.new ? (
                  <NewFaq
                    locationId={this.props.match.params.locationId}
                    cancel={this.submitCancel}
                    getNewAllFaq={this.getNewAllFaq}
                  />
                ) : (
                  ""
                )}

                {this.state.update ? (
                  <UpdateFaq
                    locationId={this.props.match.params.locationId}
                    faqid={this.state.faqid}
                    cancel={this.updateCancel}
                    allfaq={this.state.allFaq}
                    getNewAllFaq={this.getNewAllFaq}
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
            <div >
              <h4 className='connect_msg'>Connect Location first</h4>
            </div>
          </MDBContainer>
        )}
      </div>
    );
  }
}
