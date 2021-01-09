import React, { Component } from "react";
import Axios from "axios";
import { all_connection_of_one_location } from "./apis/social_platforms";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { MDBBtn, MDBCol, MDBRow } from "mdbreact";
import { secure_pin } from "../config";
import CampaignPart2 from "./campaignpart2";
import { Add_Campaign,List_Connected_Url } from "./apis/review";
import { Checkbox } from "@material-ui/core";

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
    Step:1,
    isEmail:true,
    isSms:false
  };

  componentDidMount = () => {
    const data = {
      secure_pin,"user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId"),


      // "campaign_type_email":"email","campaign_type_sms":"sms","sender_email":"sender@email.com",
      // "reply_email":"reply_email@email.com","subject":"testing subject",
      // "heading":"testing heading","email_content":"email content testing adkd ",
      // "sms_content":"sms content testing",
      // "recipient_array":[
      //   {"name":"name 1","email":"respiemail@recipient.com","phone":"1231231231"},{"name":"name 2","email":"respiemail2@recipient.com","phone":"2233114433"}
      // ],
      //   "email_social_array":[{"name":"Foursquare","connect_url":"www.yelp.com"},{"name":"Google","connect_url":"www.yelp.com"}],
      //   "sms_social_array":[{"name":"Foursquare","connect_url":"www.yelp.com"},{"name":"Google","connect_url":"www.yelp.com"}]
    };
    // Axios.post(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/locations/get-all-connection-of-one-location",
    //   data,
    //   DjangoConfig
    // )
    // all_connection_of_one_location(data, DjangoConfig).then(response => {
    //   var googleToken, appleUrl;
    //   this.setState({})
      
    // });

    List_Connected_Url(data).then(resp => {
      console.log("list",resp)

    }).catch(resp => {

    })

    Add_Campaign (data).then(resp => {
      console.log(resp)

    }).catch(resp => {

    })
  };
  step_2_1 =e=>{
    this.setState({
      Step: 1
    })
  }

  submitHandler = event => {
    event.preventDefault();
    this.setState({ Step: 2 });

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
      appleId,

      ReplyTo,
      email_subject,
      EmailHeading
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

    // if (!campaign_name) {
    //   this.setState({
    //     campaign_name_error: "Enter your Campaign name",
    //     wrong: "Above fields are empty or invalid"
    //   });
    //   isError = true;
    // }

    // if (!emailReg.test(email_from) || email_from == "") {
    //   this.setState({
    //     email_from_error: "Enter valid email",
    //     wrong: "Above fields are empty or invalid"
    //   });
    //   isError = true;
    // }

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

  closePopUP=e=>{
    this.props.history.push({
      pathname: `/locations/`+localStorage.getItem('locationId')+`/review-generation-stats`
    });
  }

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
      loading,

      Step,
      isEmail,
      isSms
    } = this.state;
    console.log(this.state)

    return (
      <div>
        {/* <div className="content-page"> */}
        {/* <div className="container " id="overview-10">
            <div className="profanalytic">
              <h3>Enter Campaign Details </h3>
            </div>
            <MDBRow>
              <MDBCol md='8' className='review_container'>
<MDBRow>
  <MDBCol md='1' className='step'>
  Step 01
  </MDBCol>
  <MDBCol md='8' className='camp_heading'>
  Ralting Email And SMS templete
  </MDBCol>
  <MDBCol md='3' className="closebox">
    <i className="zmdi zmdi-close"></i> Close section
  </MDBCol>
</MDBRow>
<MDBRow>
  <MDBCol md='6'>
    <div className='camp_subhead1'>
    From Email
    </div>
    <div>
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
  </MDBCol>
  <MDBCol md='6'>
    <div className='camp_subhead1'>
    Customer first name
    </div>
    <div>
    <input
                            type="email"
                            className="form-control"
                            placeholder="david"
                            name="email_from"
                            onChange={this.changeHandler}
                            value={email_from}
                            required
                          />
                          <div style={{ color: "red" }}>{email_from_error}</div>
    </div>
  </MDBCol>
</MDBRow>
              </MDBCol>

              <MDBCol md='4'>
<div className='review_container'>

</div>
              </MDBCol>
            </MDBRow>
            </div> */}

{/* <MDBRow style={{marginTop:'15px'}}>
           
           <MDBCol md='1' className='ap_contant2' style={{marginLeft:'4px',padding:'0px'}}>
           <Checkbox  name="isEmail" checked={isEmail}   onChange={this.checkBoxHandler} />
           Email 
           </MDBCol>
          
           
           <MDBCol md='2' className='ap_contant2'>
           <Checkbox  name="isSms" checked={isSms}   onChange={this.checkBoxHandler}/>
           Sms 
           </MDBCol>
         </MDBRow> */}
{/* <input type="checkbox"  name="isEmail" checked={isEmail}   onChange={this.checkBoxHandler}
            /> Email 

            
<input type="checkbox"  name="isSms" checked={isSms}   onChange={this.checkBoxHandler}
            /> Sms  */}

{ (Step === 1) ?
        <div className="main_content">
          <form
            className="needs-validation"
            onSubmit={this.submitHandler}
            noValidate
          >



            <div className="rightside_title">
              <h1>Enter Campaign Details </h1>
            </div>
            <MDBRow >
           
           <MDBCol md='1' className='ap_contant2' style={{marginLeft:'4px',padding:'0px'}}>
           <Checkbox  name="isEmail" checked={isEmail}   onChange={this.checkBoxHandler} />
           Email 
           </MDBCol>
          
           
           <MDBCol md='2' className='ap_contant2'>
           <Checkbox  name="isSms" checked={isSms}   onChange={this.checkBoxHandler}/>
           Sms 
           </MDBCol>
         </MDBRow>
       {isEmail || isSms ?  <div className="row">
              <div className="col-md-8">
               <div>
                <div className="step2" style={{borderRadius:'15px 15px 0px 0px',boxShadow:'none'}}>
                   
         <ul>
                    <li>
                      <div className="step-sms">
                        <a>Step 01</a>
                        <span>Ratings Email And SMS</span>
                      </div>
                      <div className="closebox" onClick={this.closePopUP}>
                        <i className="zmdi zmdi-close"></i> Close Section
                      </div>
                    </li>
                  </ul> 
                  </div>
                  </div>
                  </div>
                  </div>:null}
         {isEmail?
            <div className="row">
              <div className="col-md-8">
               <div>
                <div className="step2"   style={{borderRadius:'0px 0px 15px 15px',boxShadow:'none'}}>
                   
                  <div className="formbox">

                    <div className="row">
                      <div className="col-md-6 camp_margin1">
                        <div >
                          <div className='camp_subhead1'>From Email</div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Compaing name"
                            name="FromEmail"
                            //onChange={this.changeHandler}
                            // value={campaign_name}
                            value="reviews@dashify.biz"
                            readOnly
                          />
                          <div style={{ color: "red" }}>
                            {campaign_name_error}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 camp_margin1">
                        <div >
                          <div className='camp_subhead1'>Reply To</div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="David"
                            name="ReplyTo"
                            onChange={this.changeHandler}
                            // value={campaign_name}
                            required
                          />
                          <div style={{ color: "red" }}>
                            {campaign_name_error}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 camp_margin2">
                        <div >
                          <div className='camp_subhead1'>Email Subject</div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Your Experiece matters"
                            name="EmailSubject"
                            onChange={this.changeHandler}
                            value={email_subject}
                            required
                          />
                          <div style={{ color: "red" }}>
                            {campaign_name_error}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 camp_margin2">
                        <div >
                          <div className='camp_subhead1'>Email Heading</div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="You visited last time"
                            name="email_heading"
                            onChange={this.changeHandler}
                            // value={campaign_name}
                            required
                          />
                          <div style={{ color: "red" }}>
                            {campaign_name_error}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-30 ">
                  <div className="camp_subhead2">
                  Email Content
                  </div>
                    <textarea
                      className="camp_textarea " rows="4" 
                      // placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
                      name="email_content"
                      onChange={this.changeHandler}
                      value={email_content}
                      required
                    ></textarea>
                    <div style={{ color: "red" }}>{email_content_error}</div>
                  </div>
                  </div>
                </div>

                <MDBRow className='blue_container'>
                  <MDBCol md='12' className='camp_heading'>
                  Choose Review Sites
                  </MDBCol>
                  <MDBCol md='12' className='camp_contant1'>
                  the vocabulary, and the questions
                  </MDBCol>
                 
                  <MDBCol md='5' style={{marginLeft:'-15px'}}>
    <div className='review_sites_container ' >
                          <input
                                type="checkbox"
                                // onChange={this.checkBoxHandler}
                                value="true"
                                id="myCheckbox1"
                              /> 
                              <label for="myCheckbox1">
<MDBRow > 
<MDBCol md='4' className='no_right_padding'>
<img src={require("./assets/google_map.png")} className='camp_icon' />
</MDBCol>
<MDBCol md='8' className='review_sites_contant'>
Google Map
</MDBCol>
 </MDBRow>
 </label>
 </div>
 </MDBCol>

 <MDBCol md='5' >
    <div className='review_sites_container ' >
                          <input
                                type="checkbox"
                                // onChange={}
                                value="true"
                                id="myCheckbox2"
                              /> 
                              <label for="myCheckbox2">
<MDBRow > 
<MDBCol md='4'  className='no_right_padding'>
<img src={require("./assets/apple_appstore.png")} className='camp_icon' />
</MDBCol>
<MDBCol md='8' className='review_sites_contant' style={{paddingLeft:'6px'}}>
Apple AppStore
</MDBCol>
 </MDBRow>
 </label>
 </div>
 </MDBCol>
 
  <MDBCol md='2'>
    <MDBBtn className="camp_add_btn ">
                                <i
                                  className="zmdi zmdi-plus"
                                  onClick={this.add_customWebsite_function}
                                ></i>
                             </MDBBtn>
  </MDBCol>
</MDBRow>
               
</div>
               
              </div>
              <div className="col-md-4" style={{marginTop:'-66px'}}>
               <div className="step2 ">
                  <div className="formbox">
                    <div className="raitingemail">
                      <h3>Raiting Email And SMS Template</h3>
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
                      <div className="raitingcolor">
                      <MDBRow > 
<MDBCol md='3'>
<img src={require("./assets/apple_appstore.png")} className='camp_icon' />
</MDBCol>
<MDBCol md='5' className='review_sites_contant'>
Apple AppStore
</MDBCol>
<MDBCol md='4' style={{padding:'0px'}}>
  <MDBBtn className='write_review_btn'>
    Write A Review
  </MDBBtn>
</MDBCol>
 </MDBRow>
                        </div>

                        <div className="raitingcolor">
                      <MDBRow > 
<MDBCol md='3'>
<img src={require("./assets/google_map.png")} className='camp_icon' />
</MDBCol>
<MDBCol md='5' className='review_sites_contant'>
Google Map
</MDBCol>
<MDBCol md='4' style={{padding:'0px'}}>
  <MDBBtn className='write_review_btn'>
    Write A Review
  </MDBBtn>
</MDBCol>
 </MDBRow>
                        </div>
                    </div>
                  </div>
                </div>
             
              </div>
            </div>
  :null}
            {isSms ? 
            <div className="row">
             <div className="col-md-8">
              <div className=" review_sites_container2"  style={{borderRadius:'0px 0px 15px 15px',boxShadow:'none'}}>
                 <div className="camp_subhead2">
                 SMS Content
                 </div>
                   <textarea
                     className="camp_textarea " rows="4" 
                     // placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
                     name="sms_content"
                     onChange={this.changeHandler}
                     value={sms_content}
                     required
                   ></textarea>
                   <div style={{ color: "red" }}>{sms_content_error}</div>
                 </div>

             </div>
             
             <div className="col-md-4" style={{marginTop:'-66px'}}>
              <div className="step2 ">
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
 :null}

 <div className="row">
   <div className="col-md-8">
   {!isEmail && !isSms?
<div >
<h4 className='connect_msg'>Please Select Email Or Sms </h4>
</div>:null}
   <MDBRow>
                 <MDBCol md='2' className='offset-md-10'>
                 {/* <Link to="/locations/:locationId/campaignpart2/:campaign_id"> */}

          {(isEmail || isSms )?       
                 <MDBBtn className='next_btn' onClick={this.submitHandler}>
                 Next
              </MDBBtn>

              :""}
 
                 </MDBCol>
               </MDBRow>
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

                 {/* <button type="submit" className="continue">
                   Continue
                 </button> */}
               </div>
            
     </div>
   <div className="col-md-4">
   <div className="step2" style={{marginTop:'20px'}}>
                 {/*<div className="ratingemail">
                   <h2>Rating Email And SMS Template</h2>
                 </div>*/}
                  <div className="formbox">
                   <div className="exclamation">!</div>
                   <div className='camp_contant2'>
                   Business vocabulary and commonly used phrases 
                   are also detailed in the texts, and all this information ?
                   </div>

                     {/* <p>
                       <h3>Hi (name)</h3>
                       <b>{email_heading}</b>
                     </p> */}
                   <div className="sms-newtext">
                     <p>Business vocabulary and commonly used 
                       phrases are also detailed in the texts, 
                       and all this information - including.</p>
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
  
   </div>
  
 </div>
            {/* For email and phone no */}
          </form>
        </div>

        :""}


        { (Step === 2) ?

        <CampaignPart2  step_2_1={this.step_2_1} />
        :""}

        {/* </div> */}
      </div>
    );
  }
}
