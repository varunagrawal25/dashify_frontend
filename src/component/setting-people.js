import React, { Component } from 'react'
import { MDBRow, MDBCol,  MDBContainer  ,MDBBtn} from 'mdbreact';
import Datatable from './Datatable'

export default class Profile_setting extends Component {
    render() {
        return (
            <div>
                            
                <MDBContainer>
                <div className='setting-10'>
                            <h3>Profile Setting</h3>
                            </div>
                <MDBRow>
                  <MDBCol md="3">
                      <MDBRow>
                      <MDBCol className='profile_container'>
                        <div className='profile1'>Account</div>
                        <div className='profile1'>Notification Setting</div>
                        <div className='profile1'>People</div>
                        <div className='profile1'>Biling</div>
                        <div className='profile1'>Integrations</div>
                        <div className='profile1'>Agency Setting</div>
                    </MDBCol>
                      </MDBRow>

                      <MDBRow>
                      <MDBCol className='profile_container' style={{textAlign:'center'}}>
                      <div className='exclamation'>!</div>
                        <div className='profile1'>People</div>
                        <div className='profile2'>Learn more about managing users</div>
                        <div><MDBBtn id='profile_here_btn'>Here</MDBBtn></div>
                    </MDBCol>
                      </MDBRow>
                  </MDBCol>

                  <MDBCol md="9" >
                      <MDBRow>
                      <MDBCol className='profile1' md='4'>People</MDBCol>
                  <MDBCol md='4'><MDBBtn id='profile_new_btn'>+ Invite New User</MDBBtn></MDBCol>
                  <MDBCol md='4'><MDBBtn id='profile_add_btn'>Add Using CSV</MDBBtn></MDBCol>
                      </MDBRow>

                      <MDBRow>
                      <MDBCol >
                        <div className='profile_container'>
                        <Datatable/>
                        </div>
                      
                    </MDBCol>
                      </MDBRow>
                  </MDBCol> 
                </MDBRow>
                </MDBContainer>
                
            </div>
        )
    }
}
