import React, { Component } from "react";
import Axios from "axios";
import { all_connection_of_one_location } from "./apis/social_platforms";
import { NavLink } from "react-router-dom";

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
    wrong: ""
  };

  componentDidMount = () => {
    const data = {
      location_id: this.props.match.params.locationId
    };
    // Axios.post(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/locations/get-all-connection-of-one-location",
    //   data,
    //   DjangoConfig
    // )
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
        campaign_name_error: "Enter your Campaign name"
      });
      isError = true;
    }

    if (!emailReg.test(email_from) || email_from == "") {
      this.setState({
        email_from_error: "Enter valid email"
      });
      isError = true;
    }

    if (!emailReg.test(email_replyto) || email_replyto == "") {
      this.setState({
        email_replyto_error: "Enter valid email"
      });
      isError = true;
    }

    if (!email_content) {
      this.setState({
        email_content_error: "Email content can not be empty"
      });
      isError = true;
    }
    if (!sms_content) {
      this.setState({
        sms_content_error: "SMS content can not be empty"
      });
      isError = true;
    }

    if (!isError) {
      var additional_link_image1 = "",
        additional_link_image2 = "";

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
            this.props.history.push({
              pathname: `campaignpart2/${resp.data.campain_id}`
            });
          } else {
            console.log("Campaign adding error", resp);
            this.setState({ wrong: "Something went wrong" });
          }
        })
        .catch(resp => {
          console.log("Campaign adding error", resp);
          this.setState({ wrong: "Server error" });
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
      wrong
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
              <h1>Create Review Generation Campaign</h1>
            </div>
            <div className="tablediv mb-30">
              <div className="row">
                <div className="col-md-9">
                  <div className="review-generation">
                    <div className="icon">
                      <img src={require("../images/review-campaign.png")} />
                    </div>

                    <div className="campaign-text">
                      <h3>
                        Do you want to pre-screen your customers via an Internal
                        Rating questtion, before requesting them to write public
                        reviews?
                      </h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div id="switch">
                    <label className="toggle-label">
                      <input type="checkbox" />
                      <span className="back">
                        <span className="toggle"></span>
                        <span className="label on">ON</span>
                        <span className="label off">OFF</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div className="step2">
                  <ul>
                    <li>
                      <a href="#">Step 01</a>
                    </li>
                  </ul>
                  <div className="ratingemail">
                    <h2>
                      Ratings Email And SMS
                      <a className="close-section">
                        <i className="zmdi zmdi-close"></i>Close Section
                      </a>
                    </h2>
                  </div>

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
                        <div className="form-group">
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
                      <div className="col-md-12">
                        <div className="text-style">
                          <h3>Choose Review Sites</h3>
                          {/* <p>
                            You can only select maximum of 2 review sites in the
                            review email
                          </p> */}

                          <div className="googlebox">
                            {google_placeid ? (
                              <div className="col-md-5">
                                <div className="google">
                                  <img src={require("../images/google.png")} />
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
                      </div>
                      <div className="col-md-12" style={{ marginTop: 20 }}>
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
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>SMS Content</label>
                          <textarea
                            className="form-control"
                            rows="4"
                            cols="50"
                            // placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
                            name="sms_content"
                            onChange={this.changeHandler}
                            value={sms_content}
                            required
                          ></textarea>
                          <div style={{ color: "red" }}>
                            {sms_content_error}
                          </div>
                          <div style={{ color: "red" }}>{wrong}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="step2">
                  <div className="ratingemail">
                    <h2>Rating Email And SMS Template</h2>
                  </div>

                  <div className="formbox">
                    <div className="sms_template">
                      <h3>Hi (name)</h3>
                      <b>{email_heading}</b>
                    </div>
                    <div className="sms_template">
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

                <div className="step2 mt-30">
                  <div className="formbox">
                    <div className="sms_template blue">
                      <h3>Hi (Customer Name) </h3>
                      <p>{sms_content}</p>
                    </div>
                    <p className="text-right sent">Sent as text message</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="btnbox_button mt-30">
              {/* <NavLink
                to={{
                  pathname: "campaignpart2",
                  state: {
                    promotional_data: {
                      email_from,
                      all_site_name,
                      all_site_url,
                      email_replyto,
                      email_subject,
                      email_heading,
                      email_content,
                      sms_content,
                      review_by_google,
                      review_by_apple,
                      google_placeid,
                      appleId
                    }
                  }
                }}
                className="continue"
              >
                Continue
              </NavLink> */}
              <button type="submit" className="continue">
                Continue
              </button>
            </div>
          </form>
        </div>

        {/* </div> */}
      </div>
    );
  }
}
