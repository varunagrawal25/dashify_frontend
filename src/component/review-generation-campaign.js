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
    email_subject: "",
    email_heading: "",
    email_content: "",
    sms_content:"",
    review_by_google: false,
    review_by_apple: false,
    active_social_platform: 0,
    add_customWebsite: 0,
    add_customer: 2,
    google_placeid: "",
    appleId: "",
    campaign_name_error: "",
    email_from_error: "",
    reply_to_error: "",
    email_sub_error: "",
    email_head_error:"",
    email_content_error: "",
    sms_content_error: "",
    sms_review_sites_error:"",
    email_review_sites_error:"",
    wrong: "",
    loading: false,
    Step:1,
    isEmail:true,
    isSms:false,
    FinalEmailSocial:[],
    FinalSmsSocial:[],
    hidePlus:true
  };

  componentDidMount = () => {
    const data = {
      secure_pin,"user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId"),
    //   "sms_social_array":[{"name":"Foursquare","connect_url":"www.yelp.com"},{"name":"Google","connect_url":"www.yelp.com"}]
    };
  

    List_Connected_Url(data).then(resp => {
      console.log("list",resp)
      this.setState({AllIcons:resp.data.con_social_array})

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
    

    var {
      campaign_name,
      email_from,
      ReplyTo,
      all_site_name,
      all_site_url,
      EmailSubject,
      email_heading,
      email_content,
      sms_content,
      review_by_google,
      review_by_apple,
      google_placeid,
      appleId,

      ReplyTo,
      
      EmailHeading
    } = this.state;

    var isError = false;

    this.setState({
      campaign_name_error: "",
      email_from_error: "",
      reply_to_error: "",
      email_sub_error: "",
      email_head_error:"",
      email_content_error: "",
      sms_content_error: "",
      sms_review_sites_error:"",
      email_review_sites_error:"",
      wrong: ""
    });

    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

 
    
    if (this.state.FinalSmsSocial.length<1 && this.state.isSms) {
      this.setState({
        sms_review_sites_error: "Please choose any one review site",
        wrong: "Above fields are empty or invalid"
      });
      isError = true;
    }
    if (this.state.FinalEmailSocial.length<1 && this.state.isEmail) {
      this.setState({
        email_review_sites_error: "Please choose atleast one review site",
        wrong: "Above fields are empty or invalid"
      });
      isError = true;
    }
    if (!ReplyTo && this.state.isEmail) {
      this.setState({
        reply_to_error: "Reply to can not be empty",
        wrong: "Above fields are empty or invalid"
      });
      isError = true;
    }

    if (!emailReg.test(ReplyTo) && this.state.isEmail) {
      this.setState({
        reply_to_error: "Enter valid email",
        wrong: "Above fields are empty or invalid"
      });
      isError = true;
    }

    if (!email_content && this.state.isEmail) {
      this.setState({
        email_content_error: "Email content can not be empty",
        wrong: "Above fields are empty or invalid"
      });
      isError = true;
    }
    if (!sms_content && this.state.isSms) {
      this.setState({
        sms_content_error: "SMS content can not be empty",
        wrong: "Above fields are empty or invalid"
      });
      isError = true;
    }

    if (!EmailSubject && this.state.isEmail) {
      this.setState({
        email_sub_error: "Email Subject can not be empty",
        wrong: "Above fields are empty or invalid"
      });
      isError = true;
    }
    if (!email_heading && this.state.isEmail) {
      this.setState({
        email_head_error: "Email Heading can not be empty",
        wrong: "Above fields are empty or invalid"
      });
      isError = true;
    }
if(emailReg.test(ReplyTo) && EmailSubject && email_heading && email_content){
  isError = false
}

    if(!isError){
      // this.setState({  });
      this.setState({FinalEmailSocial : this.state.FinalEmailSocial.concat({
        name:this.state.hideName,
        connect_url:this.state.hideUrl
      
      })
    
    ,Step: 2})
    }

    // if (!isError) {
    //   var additional_link_image1 = "",
    //     additional_link_image2 = "";

    //   this.setState({ loading: true });

   
    // }
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  EmailchangeHandler =async event => {
  
   await this.setState({ [event.target.name]: event.target.value });
    if(!this.state.hideUrl)
    this.setState({
      hideUrlVali:true
    })
    else
    this.setState({
      hideUrlVali:false
    })
    if(!this.state.hideName)
    this.setState({
      hideNameVali:true
    })
    else
    this.setState({
      hideNameVali:false
    })

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

  addSocialEmail =(name, url,icon)=>e=>{

    if(e.target.checked){

    var obj= {
      name:name,
      connect_url:url,
      icon:icon
    }
    var new2;

    this.setState({
      FinalEmailSocial:this.state.FinalEmailSocial.concat(obj)
    })

  }
  else{
    console.log("deleted");
    new2 = this.state.FinalEmailSocial.filter(item => item.name !== name);
   // console.log(new2,this.state.FinalEmailSocial.filter(i=> {return i.name !== name}))

   this.setState({
    FinalEmailSocial:new2
  })
  console.log(this.state.FinalEmailSocial)
  }

  }




  addSocialSms =(name, url)=>e=>{

  

    var obj= {
      name:name,
      connect_url:url,
     
    }
   

    this.setState({
      FinalSmsSocial:[obj]
    })

  
 

  }

  addSocialFunc=e=>{
    this.setState({hidePlus:!this.state.hidePlus});
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
      reply_to_error,
      email_sub_error,
      email_head_error,
      email_from_error,
      email_replyto_error,
      email_content_error,
      sms_content_error,
      email_review_sites_error,
      sms_review_sites_error,
      wrong,
      loading,

      Step,
      isEmail,
      isSms,
      AllIcons,
      FinalEmailSocial,
      FinalSmsSocial,
      EmailSubject,
      ReplyTo,
      hidePlus
    } = this.state;
    console.log(this.state)

    let sms_pre
    if(!isEmail){
      sms_pre={marginTop:'-66px'}
    }
    var ListIcons, CheckedSocial, ListRadio;

    if(AllIcons){
    
      ListIcons=AllIcons.map(l=>{

      return(   
        <MDBCol md='5' style={{margin:'10px 0px', marginLeft:'-15px',marginRight:'10px'}}>
    <div className='review_sites_container ' >
                          <input
                                type="checkbox"
                                onClick ={this.addSocialEmail(l.name, l.connect_url,l.icon)}
                                value="true"
                                id={l.name}
                                style={{display:"none"}}
                              /> 
                              <label for={l.name} style={{display:'block'}}>
<MDBRow > 
<MDBCol md='4'  className='no_right_padding'>
<img src={l.icon} className='camp_icon' />
</MDBCol>
<MDBCol md='8' className='review_sites_contant' style={{paddingLeft:'6px'}}>
{l.name}
</MDBCol>
 </MDBRow>
 </label>
 </div>
 </MDBCol>
   
  )
    
  })

    ListRadio=AllIcons.map(l=>{

      return(  
        <MDBCol md='5' style={{margin:'10px 0px', marginLeft:'-15px',marginRight:'10px'}}>
        <div className='review_sites_container ' >
                              <input
                                    type="radio"
                                    name="sms"
                                    onClick ={this.addSocialSms(l.name, l.connect_url)}
                                     value="true"
                                     id={'sms'+l.name}
                                    style={{display:"none"}}
                                  /> 
                                  <label for={'sms'+l.name} style={{display:'block'}}>
    <MDBRow > 
    <MDBCol md='4'  className='no_right_padding'>
    <img src={l.icon} className='camp_icon' />
    </MDBCol>
    <MDBCol md='8' className='review_sites_contant' style={{paddingLeft:'6px'}}>
    {l.name}
    </MDBCol>
     </MDBRow>
     </label>
     </div>
     </MDBCol>          
 
//      <div className='' >
//                             <input
//                                   type="radio"
//                                  onClick ={this.addSocialSms(l.name, l.connect_url)}
//                                   value="true"
//                                   id={'sms'+l.name}
//                                 /> 
//                                 <label for={'sms'+l.name}>
//                                 {l.name}
//                                 </label>

// <input type="radio" name="sms" value={l.name} />{l.name}
//    </div>
   
   )
    })

  }

  if(FinalEmailSocial){

    CheckedSocial=FinalEmailSocial.map(c=>{

      return(<div className="raitingcolor">
      <MDBRow > 
<MDBCol md='3'>
<img src={c.icon} className='camp_icon' />
</MDBCol>
<MDBCol md='5' className='review_sites_contant'>
{c.name}
</MDBCol>
<MDBCol md='4' style={{padding:'0px'}}>
<MDBBtn className='write_review_btn'>
Write A Review
</MDBBtn>
</MDBCol>
</MDBRow>
        </div>)

    })
  }
    return (
      <div>
      

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
                        {isEmail && !isSms ?<span>Ratings Email</span>:null}
                        {isSms && !isEmail ?<span>Ratings SMS</span>:null}
                        {isEmail && isSms?<span>Ratings Email And SMS</span>:null}
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
                          {/* <div className="err_msg">
                            {campaign_name_error}
                          </div> */}
                        </div>
                      </div>

                      <div className="col-md-6 camp_margin1">
                        <div >
                          <div className='camp_subhead1'>Reply To</div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="abc@dashify.biz"
                            name="ReplyTo"
                            onChange={this.changeHandler}
                           value={ReplyTo}
                            required
                          />
                          <div className="err_msg">
                            {reply_to_error}
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
                            value={EmailSubject}

                            required
                          />
                          <div className="err_msg">
                            {email_sub_error}
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
                            value={email_heading}
                            required
                          />
                          <div className="err_msg">
                            {email_head_error}
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
                      placeholder="Enter here"
                      name="email_content"
                      onChange={this.changeHandler}
                      value={email_content}
                      required
                    ></textarea>
                    <div className="err_msg">{email_content_error}</div>
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
                  <div class="scrollbar" style={{height:'90px',width:'100%',background:'none'}}>
    <MDBRow class="overflow">
                  {ListIcons?ListIcons:<div>NO Listing connected</div>}
                 
   {hidePlus?             
  <MDBCol md='2' style={{margin:'11px 0px'}}>
    <MDBBtn className="camp_add_btn ">
                                <i
                                  className="zmdi zmdi-plus"
                                  onClick={this.addSocialFunc}
                                ></i>
                             </MDBBtn>
  </MDBCol>:""}
</MDBRow>
</div>
<div className="err_msg">{email_review_sites_error}</div>
</MDBRow>
{!hidePlus?     
     <div className='hidePlus_box'>
       <button onClick={this.addSocialFunc} className='campaignClose' style={{marginTop:'-25px'}}>x</button>
 <MDBRow>
   
   <MDBCol md='6' style={{paddingLeft:'0px'}}>
    <input type="text" name="hideName" className='form-control' placeholder="Enter Name" onChange={this.EmailchangeHandler}  /> 
  </MDBCol>
 { this.state.hideNameVali? <div className="err_msg">Name is required</div>:""}
  <MDBCol md='6'>
    <input type="url" name="hideUrl" className='form-control' placeholder="Enter Url" onChange={this.EmailchangeHandler} />
  </MDBCol>
  { this.state.hideUrlVali? <div className="err_msg">Url is required</div>:""}
 </MDBRow>
 </div>   
  :""}          
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
                      
                  {email_content?    <div className="raitingcolor">
                        <p>{email_content}</p>
                        {/* {review_by_google ? (
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
                        )} */}
                      </div>
              :""}
                      {CheckedSocial}
                      {/* <div className="raitingcolor">
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
                        </div> */}
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
                   <div className="err_msg">{sms_content_error}</div>
                 </div>
                 <MDBRow className='blue_container'>
                  <MDBCol md='12' className='camp_heading'>
                  Choose Any One Review Site
                  </MDBCol>
                  <MDBCol md='12' className='camp_contant1'>
                  the vocabulary, and the questions
                  </MDBCol>
                  <div class="scrollbar" style={{height:'90px',width:'100%',background:'none'}}>
    <MDBRow class="overflow">
                 {ListRadio}
                 </MDBRow>
                 </div>
                 <div className="err_msg">{sms_review_sites_error}</div>
                 </MDBRow>

             </div>
             
             <div className="col-md-4" style={sms_pre}>
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
                   <div className="err_msg">{wrong}</div>
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

        <CampaignPart2 
         step_2_1={this.step_2_1}
           isEmail={isEmail}
            isSms={isSms}
            FinalEmailSocial={FinalEmailSocial}
            FinalSmsSocial={FinalSmsSocial}
            ReplyTo ={ReplyTo}
EmailSubject={EmailSubject}
email_heading={email_heading}
email_content={email_content}
sms_content={sms_content}
            />
        :""}

        {/* </div> */}
      </div>
    );
  }
}
