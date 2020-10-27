import React, { Component } from "react";
import Axios from "axios";
import { all_connection_of_one_location } from "./apis/social_platforms";
import { social_review_url_json } from "./json/review";
import { NavLink } from "react-router-dom";
import Loader from "react-loader-spinner";

const DjangoConfig = {
  headers: {
    Authorization: "Token " + localStorage.getItem("UserToken")
  }
};

export default class ReviewGenerationCampaign extends Component {
  state = {
    campaign_name: "",
    email_from: "",
    email_replyto: "",
    all_site_name: {},
    all_site_url: {},
    email_subject: "your feedback is important to us",
    email_heading:
      "Thank you for trusting us, we hope our service will help you",
    email_content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gallery",
    sms_content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gallery",
    review_by_google: false,
    review_by_apple: false,
    active_social_platform: 0,
    add_customWebsite: 0,
    add_customer: 2,
    google_placeid: "",
    appleId: "",
    campaign_name_error: "",
    email_from_error: "",
    email_replyto_error: "",
    email_content_error: "",
    sms_content_error: "",
    wrong: "",
    loading: false,

    social_review_url: [],
    social_review_url_want: ""
  };

  componentDidMount = async () => {
    const data = {
      location_id: this.props.match.params.locationId
    };
    const review_url_header = {
      location_id: this.props.match.params.locationId
    };
    await this.setState({ social_review_url: social_review_url_json });
    all_connection_of_one_location(data, DjangoConfig).then(response => {
      var googleToken, appleUrl;
      response.data.data.map(l => {
        if (l.Social_Platform.Platform == "Google") {
          googleToken = l.Social_Platform.Token;
        }
        if (l.Social_Platform.Platform == "Apple") {
          appleUrl = l.Social_Platform.Other_info.split(",")[0]
            .slice(7)
            .split("/")[6]
            .slice(2);
          this.setState({
            appleId: appleUrl
          });
        }
      });

      const GoogleConfig = {
        headers: { Authorization: "Bearer " + googleToken }
      };

      if (googleToken) {
        Axios.get(
          "https://mybusiness.googleapis.com/v4/accounts/",
          GoogleConfig
        ).then(res => {
          localStorage.setItem("accountId", res.data.accounts[0].name);
          Axios.get(
            "https://mybusiness.googleapis.com/v4/" +
              localStorage.getItem("accountId") +
              "/locations",
            GoogleConfig
          ).then(async resp => {
            localStorage.setItem(
              "locationIdGoogle",
              resp.data.locations[0].name
            );
            this.setState({
              google_placeid: resp.data.locations[0].locationKey.placeId
            });
          });
        });
      }
    });
  };

  submitHandler = event => {
    event.preventDefault();

    var {
      campaign_name,
      email_from,
      email_replyto,
      all_site_name,
      all_site_url,
      email_subject,
      email_heading,
      email_content,
      sms_content,
      review_by_google,
      review_by_apple,
      google_placeid,
      appleId
    } = this.state;

    var isError = false;

    this.setState({
      campaign_name_error: "",
      email_from_error: "",
      email_replyto_error: "",
      email_content_error: "",
      sms_content_error: "",
      wrong: ""
    });

    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if (!campaign_name) {
      this.setState({
        campaign_name_error: "Enter your Campaign name",
        wrong: "Above fields are empty or invalid"
      });
      isError = true;
    }

    if (!emailReg.test(email_from) || email_from == "") {
      this.setState({
        email_from_error: "Enter valid email",
        wrong: "Above fields are empty or invalid"
      });
      isError = true;
    }

    if (!emailReg.test(email_replyto) || email_replyto == "") {
      this.setState({
        email_replyto_error: "Enter valid email",
        wrong: "Above fields are empty or invalid"
      });
      isError = true;
    }

    if (!email_content) {
      this.setState({
        email_content_error: "Email content can not be empty",
        wrong: "Above fields are empty or invalid"
      });
      isError = true;
    }
    if (!sms_content) {
      this.setState({
        sms_content_error: "SMS content can not be empty",
        wrong: "Above fields are empty or invalid"
      });
      isError = true;
    }

    if (!isError) {
      var additional_link_image1 = "",
        additional_link_image2 = "";

      this.setState({ loading: true });

      Object.values(all_site_url).map((value, i) => {
        if (i == 0) {
          additional_link_image1 =
            '<br /><img src="https://img.techpowerup.org/200624/t-logo.jpg" alt="Review" height=100 width=100 /><p>' +
            all_site_name[i] +
            "</p><br /><button><a href=" +
            all_site_url[i] +
            ">Review</a></button>";
        }
        if (i == 1) {
          additional_link_image2 =
            "<br /><h1>" +
            all_site_name[i] +
            "</h1><br /><button><a href=" +
            all_site_url[i] +
            ">Review</a></button>";
        }
      });

      var message_content;

      const google_link =
        "https://search.google.com/local/writereview?placeid=" + google_placeid;
      const apple_link =
        "https://apps.apple.com/us/app/appname/id" +
        appleId +
        "?action=write-review";
      console.log("google_link", google_link);
      const google_link_image =
        '<br /><img src="https://img.techpowerup.org/200617/googlemap.png" alt="Google Map" height=100 width=100 /><p>Google</p><br /><button><a href=' +
        google_link +
        ">Review</a></button>";

      const apple_link_image =
        '<br /><img src="https://img.techpowerup.org/200623/apple.png" alt="Apple" height=100 width=100 /><p>Apple</p><br /><button><a href=' +
        apple_link +
        ">Review</a></button>";

      message_content =
        '<div style="background-color: lightgrey;padding: 25px;margin: 20px;"><div style="background-color: white;padding: 25px;margin: 20px;"><p>Hi,</p><b>' +
        email_heading +
        "</b></div><br /><div background-color: white;padding: 25px;margin: 20px;><p>" +
        email_content +
        "</p>";

      if (review_by_google) {
        message_content += google_link_image;
      }
      if (review_by_apple) {
        message_content += apple_link_image;
      }
      message_content +=
        additional_link_image1 + additional_link_image2 + "</div></div>";

      const campaign_data = {
        Title: campaign_name,
        Sent_from: email_from,
        replay_to: email_replyto,
        message: message_content,
        sms_message: sms_content,
        location_id: this.props.match.params.locationId,
        Image: "",
        Extera_data: "",
        Head: email_heading,
        Subject: email_subject
      };

      Axios.post(
        "https://cors-anywhere.herokuapp.com/http://dashify.biz/api/campaign/add-campaign",
        campaign_data,
        DjangoConfig
      )
        .then(resp => {
          console.log("Campaign added", resp.data);
          if (resp.data.message == "Campaign create successfully.") {
            this.setState({ loading: false });
            this.props.history.push({
              pathname: `campaignpart2/${resp.data.campain_id}`
            });
          } else {
            console.log("Campaign adding error", resp);
            this.setState({ wrong: "Something went wrong", loading: false });
          }
        })
        .catch(resp => {
          console.log("Campaign adding error", resp);
          this.setState({ wrong: "Server error", loading: false });
        });
    }
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  checkBoxHandler = event => {
    // console.log("checkbox event", event.target.checked);
    if (event.target.checked) {
      this.setState({ [event.target.name]: true });
      this.setState({
        active_social_platform: this.state.active_social_platform + 1
      });
    } else {
      this.setState({ [event.target.name]: false });
      this.setState({
        active_social_platform: this.state.active_social_platform - 1
      });
    }
  };

  changeSiteName_function = event => {
    event.persist();
    this.setState(prevState => ({
      all_site_name: {
        ...prevState.all_site_name,
        [event.target.name]: event.target.value
      }
    }));
  };

  changeSiteUrl_function = event => {
    event.persist();
    this.setState(prevState => ({
      all_site_url: {
        ...prevState.all_site_url,
        [event.target.name]: event.target.value
      }
    }));
  };

  customer_email_function = event => {
    event.persist();
    this.setState(prevState => ({
      email_sendto_email: {
        ...prevState.email_sendto_email,
        [event.target.name]: event.target.value
      }
    }));
    console.log("state", this.state);
  };

  add_customWebsiteName = () => {
    var webName = [];
    for (let i = 0; i < this.state.add_customWebsite; i++) {
      webName.push(
        <input
          type="text"
          className="form-control mt-30"
          placeholder="Enter custom site name"
          name={i}
          onChange={this.changeSiteName_function}
          value={this.state.all_site_name[i]}
          required
        />
      );
    }
    console.log(webName);
    return webName;
  };

  add_customWebsiteUrl = () => {
    var webUrl = [];
    for (let i = 0; i < this.state.add_customWebsite; i++) {
      webUrl.push(
        <input
          type="text"
          className="form-control mt-30"
          placeholder="Enter custom site url"
          name={i}
          onChange={this.changeSiteUrl_function}
          value={this.state.all_site_url[i]}
          required
        />
      );
    }
    console.log(webUrl);
    return webUrl;
  };

  add_name = () => {
    var name = [];
    for (let i = 0; i < this.state.add_customer; i++) {
      name.push(
        <input
          type="text"
          className="form-control mt-30"
          placeholder="Enter First Name"
        />
      );
    }
    console.log(name);
    return name;
  };

  add_phone = () => {
    var phone = [];
    for (let i = 0; i < this.state.add_customer; i++) {
      phone.push(
        <input
          type="email"
          className="form-control mt-30"
          placeholder="Enter Phone No."
          readonly
        />
      );
    }

    console.log(phone);
    return phone;
  };

  add_customWebsite_function = event => {
    event.preventDefault();
    console.log("add custom website button clicked");
    if (this.state.active_social_platform < 2) {
      this.setState({
        add_customWebsite: this.state.add_customWebsite + 1
      });
    }
  };

  social_review_checkBoxHandler = id => e => {
    let { social_review_url_want } = this.state;
    social_review_url_want[id] = e.target.checked;

    this.setState({
      social_review_url_want
    });
  };

  social_review_urls_present = () => {
    let { social_review_url } = this.state;

    console.log("social_review_url", social_review_url);

    let return_data = social_review_url.Response
      ? social_review_url.Response.map(data => (
          <div className="col-md-5">
            <div className="google">
              <img src={require(data.image)} />
              <h3>{data.name}</h3>
              <label className="container-checkbox">
                <input
                  name="review_by_google"
                  type="checkbox"
                  onChange={this.social_review_checkBoxHandler(data.id)}
                />
                <span className="checkmark zmdi"></span>
              </label>
            </div>
          </div>
        ))
      : "";

    return return_data;
  };

  render() {
    const {
      campaign_name,
      email_from,
      email_replyto,
      all_site_name,
      all_site_url,
      email_subject,
      email_heading,
      email_content,
      sms_content,
      review_by_google,
      review_by_apple,
      active_social_platform,
      add_customWebsite,
      google_placeid,
      appleId,
      campaign_name_error,
      email_from_error,
      email_replyto_error,
      email_content_error,
      sms_content_error,
      wrong,
      loading
    } = this.state;

    return (
      <div>
        {/* <div className="content-page"> */}

        <div className="main_content">
          <form
            className="needs-validation"
            onSubmit={this.submitHandler}
            noValidate
          >
            <div className="rightside_title">
              <h1>Enter Campaign Details </h1>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="step2">
                  <ul>
                    <li>
                      <div className="step-sms">
                        <a href="#">Step 01</a>
                        <span>Ratings Email And SMS</span>
                      </div>
                      <div className="closebox">
                        <i className="zmdi zmdi-close"></i> Close section
                      </div>
                    </li>
                  </ul>
                  <div className="formbox">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Campaign Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Campaign Name"
                            name="campaign_name"
                            onChange={this.changeHandler}
                            value={campaign_name}
                            required
                          />
                          <div style={{ color: "red" }}>
                            {campaign_name_error}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>From Email</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="mohit.chack@digimonk.in"
                            name="email_from"
                            onChange={this.changeHandler}
                            value={email_from}
                            required
                          />
                          <div style={{ color: "red" }}>{email_from_error}</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Reply To</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter a reply email"
                            name="email_replyto"
                            onChange={this.changeHandler}
                            value={email_replyto}
                            required
                          />
                          <div style={{ color: "red" }}>
                            {email_replyto_error}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Email Subject</label>
                          <input
                            type="text"
                            className="form-control"
                            // placeholder="your feedback is important to us"
                            name="email_subject"
                            onChange={this.changeHandler}
                            value={email_subject}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Email Heading</label>
                          <input
                            type="text"
                            className="form-control"
                            // placeholder="Thank you for trusting us, we hope our service will help you"
                            name="email_heading"
                            onChange={this.changeHandler}
                            value={email_heading}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="">
                          <label>Email Content</label>
                          <textarea
                            className="form-control"
                            rows="4"
                            cols="50"
                            // placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
                            name="email_content"
                            onChange={this.changeHandler}
                            value={email_content}
                            required
                          ></textarea>
                          <div style={{ color: "red" }}>
                            {email_content_error}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" mt-30">
                  <div className="light-blue">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="text-style">
                          <h3>Choose Review Sites</h3>
                          <p>the vocabulary, and the questions</p>

                          <div className="googlebox">
                            <div className="row">
                              {this.social_review_urls_present()}

                              {google_placeid ? (
                                <div className="col-md-5">
                                  <div className="google">
                                    <img
                                      src={require("../images/google.png")}
                                    />
                                    <h3>Google Map</h3>
                                    <label className="container-checkbox">
                                      <input
                                        name="review_by_google"
                                        type="checkbox"
                                        onChange={this.checkBoxHandler}
                                      />
                                      <span className="checkmark zmdi"></span>
                                    </label>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}

                              {appleId ? (
                                <div className="col-md-5">
                                  <div className="google">
                                    <img src={require("../images/apple.png")} />
                                    <h3>Apple AppStore</h3>
                                    <label className="container-checkbox">
                                      <input
                                        name="review_by_apple"
                                        type="checkbox"
                                        onChange={this.checkBoxHandler}
                                      />
                                      <span className="checkmark zmdi"></span>
                                    </label>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              <div className="col-md-2">
                                <a className="add_btn add_bt">
                                  <i
                                    className="zmdi zmdi-plus"
                                    onClick={this.add_customWebsite_function}
                                  ></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="" style={{ marginTop: 20 }}>
                            <div className="col-md-6">
                              <div className="form-group">
                                {this.add_customWebsiteName()}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                {this.add_customWebsiteUrl()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-30 step2">
                  <div className="customer-phone">
                    <h3>SMS Content</h3>
                    <textarea
                      className="form-control "
                      rows="4"
                      cols="50"
                      // placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
                      name="sms_content"
                      onChange={this.changeHandler}
                      value={sms_content}
                      required
                    ></textarea>
                    <div style={{ color: "red" }}>{sms_content_error}</div>
                  </div>
                </div>
                <div className="btnbox_button mt-30">
                  {loading ? (
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={25}
                      width={25}
                      // timeout={3000} //3 secs
                    />
                  ) : (
                    <div style={{ color: "red" }}>{wrong}</div>
                  )}

                  <button type="submit" className="continue">
                    Continue
                  </button>
                </div>
              </div>

              <div className="col-md-4">
                <div className="step2">
                  {/*<div className="ratingemail">
                    <h2>Rating Email And SMS Template</h2>
                  </div>*/}

                  <div className="formbox">
                    <div className="text-center newclass">
                      <div className="help-icon">
                        <span>
                          <i className="fa fa-info"></i>
                        </span>
                      </div>

                      <p>
                        <h3>Hi (name)</h3>
                        <b>{email_heading}</b>
                      </p>
                    </div>
                    <div className="sms-newtext">
                      <p>{email_content}</p>
                      {review_by_google ? (
                        <div className="apibox">
                          <img
                            src={require("../images/googlemap.png")}
                            alt="Google Map"
                            height={100}
                            width={100}
                          />
                          <p>Google</p>

                          <button>Review</button>
                        </div>
                      ) : (
                        ""
                      )}
                      {review_by_apple ? (
                        <div className="apibox">
                          <img
                            src={require("../images/apple.png")}
                            alt="Apple"
                            height={100}
                            width={100}
                          />
                          <p>Apple</p>

                          <button>Review</button>
                        </div>
                      ) : (
                        ""
                      )}
                      {all_site_name[0] && all_site_url[0] ? (
                        <div className="apibox">
                          <img
                            src={require("../images/t-logo.jpg")}
                            alt="Review"
                            height={100}
                            width={100}
                          />
                          <p>{all_site_name[0]}</p>

                          <button>Review</button>
                        </div>
                      ) : (
                        ""
                      )}
                      {all_site_name[1] && all_site_url[1] ? (
                        <div className="apibox">
                          <img
                            src={require("../images/t-logo.jpg")}
                            alt="Review"
                            height={100}
                            width={100}
                          />
                          <p>{all_site_name[1]}</p>

                          <button>Review</button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="toggle-switch">
                      <label className="switch">
                        <input type="checkbox" className="switch-input" />
                        <span
                          className="switch-label"
                          data-on="On"
                          data-off="Off"
                        ></span>
                        <span className="switch-handle"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="step2 mt-30">
                  <div className="formbox">
                    <div className="raitingemail">
                      <h3>Raiting Email And SMS templete</h3>
                      <div className="raitingcolor">
                        <p>
                          Hi (name) <br />
                          {email_heading}
                        </p>
                      </div>

                      <div className="raitingcolor">
                        <p>{email_content}</p>
                        {review_by_google ? (
                          <div>
                            <br />
                            <img
                              src={require("../images/googlemap.png")}
                              alt="Google Map"
                              height={100}
                              width={100}
                            />
                            <p>Google</p>
                            <br />
                            <button>Review</button>
                          </div>
                        ) : (
                          ""
                        )}
                        {review_by_apple ? (
                          <div>
                            <br />
                            <img
                              src={require("../images/apple.png")}
                              alt="Apple"
                              height={100}
                              width={100}
                            />
                            <p>Apple</p>
                            <br />
                            <button>Review</button>
                          </div>
                        ) : (
                          ""
                        )}
                        {all_site_name[0] && all_site_url[0] ? (
                          <div>
                            <br />
                            <img
                              src={require("../images/t-logo.jpg")}
                              alt="Review"
                              height={100}
                              width={100}
                            />
                            <p>{all_site_name[0]}</p>
                            <br />
                            <button>Review</button>
                          </div>
                        ) : (
                          ""
                        )}
                        {all_site_name[1] && all_site_url[1] ? (
                          <div>
                            <br />
                            <img
                              src={require("../images/t-logo.jpg")}
                              alt="Review"
                              height={100}
                              width={100}
                            />
                            <p>{all_site_name[1]}</p>
                            <br />
                            <button>Review</button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="step2 mt-30">
                  <div className="formbox">
                    <div className="raitingemail">
                      <div className="raitingcolor">
                        Hi (Customer Name) <br />
                        <p>{sms_content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* For email and phone no */}
          </form>
        </div>

        {/* </div> */}
      </div>
    );
  }
}
