
import React, { Component } from 'react'
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import ProfileSettingSidebar from "./setting-sidebar";
import { Checkbox } from '@material-ui/core';
export default class Notification_setting extends Component {
    state={
        isReviewNotification:false,
        isRankingReport:false,
        isReviewResponse:false,
        isprofileCompletion:false,
        isInsightsReport:false,
        sendToEmail:"",
        isAddEmail:false,
        isCancel:true
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    addEmail = () =>{
        this.setState({
            isAddEmail:true
        })
    }

    cancelEmail=()=>{
        this.setState({
            isCancel:true,
            isAddEmail:true
        })
    }
    render() {
       
        return (
            <div>
               <MDBContainer>
          <div className="setting-10">
            <h3> Notification Setting</h3>
          </div>

          <MDBRow>
            <MDBCol md="3">
              <ProfileSettingSidebar />
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
                            <Checkbox onChange={this.changeHandler} name="isReviewNotification" checked={this.state.isReviewNotification}/>
                            </div>
                      </MDBCol>
                      <MDBCol md="10"  className='ns_title'>
                      Review Notification
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="2">
                        <div className="profile3">
                            <Checkbox onChange={this.changeHandler} name="isRankingReport" checked={this.state.isRankingReport}/>
                            </div>
                      </MDBCol>
                      <MDBCol md="10" className='ns_title'>
                      Ranking Report
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="2">
                        <div className="profile3"><Checkbox onChange={this.changeHandler} name="isReviewResponse" checked={this.state.isReviewResponse}/></div>
                      </MDBCol>
                      <MDBCol md="10" className='ns_title'>
                      Review Response
                      </MDBCol>
                    </MDBRow>
                    
                    <MDBRow>
                      <MDBCol md="2">
                        <div className="profile3"><Checkbox onChange={this.changeHandler} name="isprofileCompletion" checked={this.state.isprofileCompletion}/></div>
                      </MDBCol>
                      <MDBCol md="10" className='ns_title'>
                      Profile Completion
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="2">
                        <div className="profile3"><Checkbox onChange={this.changeHandler} name="isInsightsReport" checked={this.state.isInsightsReport}/></div>
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
                    {this.state.isAddEmail?
                <MDBRow>
                    <MDBCol md='12'>
                    <input style={{margin:'0px',marginTop:'15px',width:'100%'}}
                          type='email'
                          className="profile4"
                          placeholder="Email Address"
                          name="sendToEmail"
                          onChange={this.changeHandler}
                        />
                    </MDBCol>

                    <MDBCol md='12'>
                        <MDBRow style={{marginTop:'15px'}}>
                            <MDBCol className='offset-md-5' md='4'>
                                <MDBBtn className="last_btn" >Add</MDBBtn>
                            </MDBCol>
                            <MDBCol md='3' style={{paddingLeft:'5px' }}> 
                                <MDBBtn className='last_btn_white' onClick={this.cancelEmail}>Cancel</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
                       :<MDBRow>
                           <MDBCol>
                               <MDBBtn className='last_btn_white' onClick={this.addEmail}>Add Email</MDBBtn>
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
