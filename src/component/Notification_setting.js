
import React, { Component } from 'react'
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import ProfileSettingSidebar from "./setting-sidebar";
import { Checkbox } from '@material-ui/core';
import {add_notification,delete_email,get_notification} from './apis/notification'
import { data } from 'jquery';
import { secure_pin } from "../config";
import swal from "sweetalert";
import {email_regex} from "./utils/regularexpressions";
export default class Notification_setting extends Component {
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

    deleteEmail = (id) =>{
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


    }
    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log("kk",event.target.name)
        // if(event.target.value=='isReviewNotification' && this.state.isReviewNotification=="0"){

        //   this.setState({
        //     isReviewNotification:"1"
        //   })
        // }
        
        // if(event.target.value=='isReviewNotification' && this.state.isReviewNotification=="1"){
        
        //   this.setState({
        //     isReviewNotification:"0"
        //   })
        // }
if(event.target.name=='isReviewNotification'){

  this.setState({
    isReviewNotification:!this.state.isReviewNotification
  })
}

if(event.target.name=='isRankingReport'){

  this.setState({
    isRankingReport:!this.state.isRankingReport
  })
}

if(event.target.name=='isReviewResponse'){

  this.setState({
    isReviewResponse:!this.state.isReviewResponse
  })
}

if(event.target.name=='isprofileCompletion'){

  this.setState({
    isprofileCompletion:!this.state.isprofileCompletion
  })
}

if(event.target.name=='isInsightsReport'){

  this.setState({
    isInsightsReport:!this.state.isInsightsReport
  })
  console.log("fd0",this.state.isInsightsReport)
}

    }
    addEmail = () =>{
        this.setState({
            isAddEmail:true
        })
    }

    cancelEmail=()=>{
        this.setState({
            isAddEmail:false
        })
    }
    // {"secure_pin":"digimonk","user_id":"10","review_notification":"1","ranking_report":"1","review_response":"1",
    // "profile_completion":"1","insights_report":"1","email_array":[{"email_id":"ram22@digmonk.in"},
    // {"email_id":"ram221@digmonk.in"}]}

     addEmailConfirm = () =>{
      // if(this.state.isInsightsReport){
      //   this.setState({
      //     isInsightsReport:"1"
      //   })
      //   console.log("insi",this.state.isInsightsReport)
      // }
      let result = email_regex(this.state.sendToEmail);
    if (result === false) {
      this.setState({
        email_error: "Not a valid email",
        anyError:true
      });}   
      else{
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
          getEmail:resp.data.email_array
  })
        })
      }
     
    }
    componentDidMount = () =>{

      this.setState({role:this.props.role})
      const data={
        
        secure_pin,
        user_id: localStorage.getItem("UserId"),

      }
      console.log("data",data)
      get_notification(data)
      .then(resp =>{
console.log("get notification",resp)

this.setState({
  isReviewNotification:parseInt(resp.data.review_notification),
        isRankingReport:parseInt(resp.data.ranking_report),
        isReviewResponse:parseInt(resp.data.review_response),
        isprofileCompletion:parseInt(resp.data.profile_completion),
        isInsightsReport:parseInt(resp.data.insights_report),
        sendToEmail:'',
        anyError:false,
        getEmail:resp.data.email_array
})

console.log("this.state.getEmail",this.state.getEmail)
      })
    }
    componentDidUpdate(){
      if(this.state.role !== this.props.role)
      this.setState({role:this.props.role});
    }
    render() {
       console.log("state",this.state)
        return (
            <div>
               <MDBContainer>
          <div className="setting-10">
            <h3> Notification Setting</h3>
          </div>

          <MDBRow>
            <MDBCol md="3">
              <ProfileSettingSidebar role={this.state.role} />
            </MDBCol>

            <MDBCol md='9'  className="profile_container">
            
            <MDBRow>
               
                  <MDBCol md="6" className="profileSpacing">
                  <MDBRow>
                            <MDBCol className='profile1'>
                            Send Email Notification For
                            </MDBCol>
                        </MDBRow>
                        <div style={{marginLeft:'-15px'}}>
                    <MDBRow>
                      <MDBCol md="2">
                        <div className="profile3">
                            <Checkbox onChange={this.changeHandler} name="isReviewNotification" checked={this.state.isReviewNotification} />
                            </div>
                      </MDBCol>
                      <MDBCol md="10"  className='ns_title'>
                      Review Notification
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="2">
                        <div className="profile3">
                            <Checkbox onChange={this.changeHandler} name="isRankingReport" checked={this.state.isRankingReport} />
                            </div>
                      </MDBCol>
                      <MDBCol md="10" className='ns_title'>
                      Ranking Report
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="2">
                        <div className="profile3"><Checkbox onChange={this.changeHandler} name="isReviewResponse"
                         checked={this.state.isReviewResponse} /></div>
                      </MDBCol>
                      <MDBCol md="10" className='ns_title'>
                      Review Response
                      </MDBCol>
                    </MDBRow>
                    
                    <MDBRow>
                      <MDBCol md="2">
                        <div className="profile3"><Checkbox onChange={this.changeHandler} name="isprofileCompletion"
                        checked={this.state.isprofileCompletion} /></div>
                      </MDBCol>
                      <MDBCol md="10" className='ns_title'>
                      Profile Completion
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="2">
                        <div className="profile3"><Checkbox onChange={this.changeHandler} name="isInsightsReport"
                        checked={this.state.isInsightsReport} /></div>
                      </MDBCol>
                      <MDBCol md="10" className='ns_title'>
                      Insights Report
                      </MDBCol>
                    </MDBRow>
                    </div>
                    </MDBCol>
                   
                    <MDBCol md="6" className="profileSpacing">
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
                    </MDBRow>
                </MDBCol> 
                </MDBRow>
                </MDBContainer> 
            </div>
        )
    }
}
