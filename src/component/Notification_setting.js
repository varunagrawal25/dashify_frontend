
import React, { Component } from 'react'
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import ProfileSettingSidebar from "./setting-sidebar";
import { Checkbox } from '@material-ui/core';
export default class Notification_setting extends Component {
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
                        <div className="profile3"><Checkbox/></div>
                      </MDBCol>
                      <MDBCol md="10"  className='ns_title'>
                      Review Notification
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="2">
                        <div className="profile3"><Checkbox/></div>
                      </MDBCol>
                      <MDBCol md="10" className='ns_title'>
                      Ranking Report
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="2">
                        <div className="profile3"><Checkbox/></div>
                      </MDBCol>
                      <MDBCol md="10" className='ns_title'>
                      Review Response
                      </MDBCol>
                    </MDBRow>
                    
                    <MDBRow>
                      <MDBCol md="2">
                        <div className="profile3"><Checkbox/></div>
                      </MDBCol>
                      <MDBCol md="10" className='ns_title'>
                      Profile Completion
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="2">
                        <div className="profile3"><Checkbox/></div>
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
                    
                <MDBRow>
                    <MDBCol md='12'>
                    <input style={{margin:'0px',marginTop:'15px',width:'100%'}}
                          type='email'
                          className="profile4"
                          placeholder="Email Address"
                          name="notification_email"
                          onChange={this.changeHandler}
                        />
                    </MDBCol>

                    <MDBCol md='12'>
                        <MDBRow style={{marginTop:'15px'}}>
                            <MDBCol className='offset-md-4' md='4'>
                                <MDBBtn className="last_btn">Add</MDBBtn>
                            </MDBCol>
                            <MDBCol md='4' style={{paddingLeft:'8px' }}> 
                                <MDBBtn className='last_btn_white'>Cancel</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCol> 
                </MDBRow>
                </MDBContainer> 
            </div>
        )
    }
}
