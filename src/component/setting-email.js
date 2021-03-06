import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import es_img1 from "./assets/es_img1.png";
import edit from "./assets/edit.png";
import delete_icon from "./assets/delete_icon.png";
import { Checkbox } from '@material-ui/core';
import {add_notification,delete_email,get_notification} from './apis/notification'
import { data } from 'jquery';
import { secure_pin } from "../config";
import swal from "sweetalert";
import {email_regex} from "./utils/regularexpressions";
export default class SettingEmail extends Component {

  state={
    isReviewNotification:false,
    isRankingReport:false,
    isReviewResponse:false,
    isprofileCompletion:false,
    isInsightsReport:false,
    sendToEmail:null,
    isAddEmail:false,
    isCancel:true,
    getEmail:[],
    email:'',
    anyError:false,
    email_error:''
}


  addEmail = () =>{
    try{
      this.setState({
          isAddEmail:true
      })
    }catch(e){}
  }

  cancelEmail=()=>{
    try{
      this.setState({
          isAddEmail:false
      })
    }catch(e){}
  }
  // {"secure_pin":"digimonk","user_id":"10","review_notification":"1","ranking_report":"1","review_response":"1",
  // "profile_completion":"1","insights_report":"1","email_array":[{"email_id":"ram22@digmonk.in"},
  // {"email_id":"ram221@digmonk.in"}]}

   addEmailConfirm = () =>{
     try{
    // if(this.state.isInsightsReport){
    //   this.setState({
    //     isInsightsReport:"1"
    //   })
    //   console.log("insi",this.state.isInsightsReport)
    // }
 
   
  if(!this.state.anyError){
      console.log("insi",this.state.isInsightsReport)
      const data={
        
        secure_pin,
        user_id: localStorage.getItem("UserId"),
        review_notification:this.state.isReviewNotification,
        ranking_report:this.state.isRankingReport,
        review_response:this.state.isReviewResponse,
     profile_completion:this.state.isprofileCompletion,
     insights_report:this.state.isInsightsReport,
     email_array:[{email_id:this.state.sendToEmail}],
     email_error:''
      }
      console.log("data",data)
      add_notification(data)
      .then(resp =>{
console.log("emailadded",resp)
swal("Email Added Succcessfully")

this.setState({
  isReviewNotification:parseInt(resp.data.review_notification),
      isRankingReport:parseInt(resp.data.ranking_report),
      isReviewResponse:parseInt(resp.data.review_response),
      isprofileCompletion:parseInt(resp.data.profile_completion),
      isInsightsReport:parseInt(resp.data.insights_report),
        sendToEmail:'',
        anyError:false,
        isAddEmail:false,
        getEmail:resp.data.email_array
})
console.log("this.state",this.state)

      })
    }

    
   
  }catch(e){} }

  deleteEmail = (id) =>{
    try{
    console.log("id1",id)
    const data={
      secure_pin,
        user_id: localStorage.getItem("UserId"),
        id:id }
    
        delete_email(data)
        .then(resp =>{
          swal("Successfully Deleted")
          const data={
      
            secure_pin,
            user_id: localStorage.getItem("UserId"),
    
          }
          get_notification(data)
          .then(resp =>{
    console.log("emaildel",resp)
    
    this.setState({
    
            getEmail:resp.data.email_array
    })
          })
        })


      }catch(e){}}

  render() {
    return (
      <div>
        <MDBContainer>
          <div className="setting-10">
            <h3>Email Setting</h3>
          </div>
          <MDBRow>
            {/* <MDBCol
              className="profile_container"
              md="8"
              style={{ padding: "35px 25px" }}
            >
              <MDBRow>
                <MDBCol md="2">
                  <img
                    src={es_img1}
                    alt="es_img1"
                    className="es_img1"
                    
                  />
                </MDBCol>
                <MDBCol md="6">
                  <div id="es_heading">Dolce Vita Hair Salon</div>
                  <div className="es_contant">Orlando best styles</div>
                  <div className="es_contant" style={{ marginTop: "2%" }}>
                    Agency Email: Example123@gmail.com
                  </div>
                  <div className="es_contant">Phone: +152 4541 545</div>
                  <div className="es_contant">
                    <img src={edit} alt="" className="es_icon" />
                    <img src={delete_icon} alt="" className="es_icon" />
                  </div>
                </MDBCol>
                <MDBCol md="4">
                  <MDBBtn id="es_btn1">Email Authenticated</MDBBtn>
                  <MDBBtn id="es_btn2">Add Notification Recipients</MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCol> */}
             <MDBCol
              className="profile_container"
              md="8"
              style={{ padding: "35px 25px" }}
            >

{this.state.isAddEmail?
                <MDBRow>
                    <MDBCol md='12'>
                    <input style={{margin:'0px',marginTop:'15px',width:'100%'}}
                          type='email'
                          className="profile4"
                          placeholder="Email Address"
                          name="sendToEmail"
                          value={this.state.sendToEmail}
                          onChange={this.changeHandler}
                        />
                        <div className='err_msg_agency' style={{marginLeft:'0px'}}>{this.state.email_error}</div>
                    </MDBCol>

                    <MDBCol md='12'>
                        <MDBRow style={{marginTop:'15px'}}>
                            <MDBCol className='offset-md-5' md='4'>
                                <MDBBtn className="last_btn" onClick={this.addEmailConfirm} >Add</MDBBtn>
                            </MDBCol>
                            <MDBCol md='3' style={{paddingLeft:'5px' }}> 
                                <MDBBtn className='last_btn_white' onClick={this.cancelEmail}>Cancel</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
                       :<MDBRow>
                           <MDBCol>
                               <MDBBtn style={{marginTop:'15px',marginLeft:'5px'}} className='last_btn_white' onClick={this.addEmail}>Add Email</MDBBtn>
                           </MDBCol>
                        </MDBRow>}

            </MDBCol>

            <MDBCol style={{ textAlign: "center" }} md="4">
            <div className='profile1'>
                            Send Email Notification To
                            </div>
                            {this.state.getEmail?
                            <div className="scrollbar" style={{height:'200px',width:'100%',background:'none'}}>
{this.state.getEmail.map(emails =>{
  return (
  <MDBRow>
    <MDBCol md='10' className='ns_title' >
      {emails.email_id}
    </MDBCol>
    <MDBCol md='2'>
      <MDBBtn onClick={ () =>this.deleteEmail(emails.id)} className='ns_title' style={{color:'blue',marginTop:'15px'}}>X</MDBBtn>
    </MDBCol>
  </MDBRow>)
})}
</div>:null}
            </MDBCol>
          </MDBRow>
          <MDBRow className="profile_container mt-4">
            <MDBCol className="es_table_font1" md="4">
              Notification Email
            </MDBCol>
            <MDBCol className="es_table_font1" md="4">
              Email Frequency
            </MDBCol>
            <MDBCol className="es_table_font1" md="4">
              Action
            </MDBCol>
          </MDBRow>
          <MDBRow className="profile_container mt-3">
            <MDBCol className="es_table_font1" md="4">
            Insights Template Email
            </MDBCol>
            <MDBCol className="es_table_font1" md="4">
              Monthly
            </MDBCol>
            <MDBCol className="es_table_font2" md="4">
              <div>
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
            </MDBCol>
          </MDBRow>

          {/* <MDBRow className="profile_container mt-3">
            <MDBCol className="es_table_font1" md="4">
            Profile Completion Email
            </MDBCol>
            <MDBCol className="es_table_font1" md="4">
            Monthly
            </MDBCol>
            <MDBCol className="es_table_font2" md="4">
              <div>
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
            </MDBCol>
          </MDBRow> */}

          <MDBRow className="profile_container mt-3">
            <MDBCol className="es_table_font1" md="4">
            Ranking Report Email
            </MDBCol>
            <MDBCol className="es_table_font1" md="4">
            Monthly
            </MDBCol>
            <MDBCol className="es_table_font2" md="4">
              <div>
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
            </MDBCol>
          </MDBRow>

          <MDBRow className="profile_container mt-3">
            <MDBCol className="es_table_font1" md="4">
            Review Notifications Email
            </MDBCol>
            <MDBCol className="es_table_font1" md="4">
            Monthly
            </MDBCol>
            <MDBCol className="es_table_font2" md="4">
              <div>
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
            </MDBCol>
          </MDBRow>

          {/* <MDBRow className="profile_container mt-3">
            <MDBCol className="es_table_font1" md="4">
            Listing Completion Email
            </MDBCol>
            <MDBCol className="es_table_font1" md="4">
            Monthly
            </MDBCol>
            <MDBCol className="es_table_font2" md="4">
              <div>
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
            </MDBCol>
          </MDBRow> */}

          
        </MDBContainer>
      </div>
    );
  }
}
