import React, { Component } from 'react'
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";

export default class AgencyDashboard extends Component {
    render() {
        return (
            <div >
            <MDBRow className="setting-14" style={{padding:'3% 6%'}}>
              <MDBCol md="12" className="profileSpacing">
                <MDBRow>
                  <MDBCol md="6">
                    <div className="agencycontant1">Custom Domain:</div>
                  </MDBCol>
                  <MDBCol md="6">
                    <input
                      className="profile4"
                      placeholder="info@oasismedia.co"
                      name="address"
                      onChange={this.changeHandler}
                      style={{width:'100%'}}
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCol>

              <MDBCol md="12" className="profileSpacing">
                <MDBRow>
                  <MDBCol md="6">
                    <div className="agencycontant1">Google Tag Manager Container ID:</div>
                  </MDBCol>
                  <MDBCol md="6">
                    <input className="profile4" style={{width:'100%'}} placeholder="GTM-PV9NZ657GH"  name="city"
                            onChange={this.changeHandler} />
                  </MDBCol>
                </MDBRow>
              </MDBCol>

              
                  <MDBCol md='12'>
                      <MDBRow className='agency_dashboard1'>
                          <MDBCol md='8' className="agencycontant1" style={{paddingTop:'15px'}}>
                          Enable white label dashboard access to all clients
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
                  </MDBCol>
                  <div style={{margin:'auto',marginTop:'30px'}}><MDBBtn className="pay_last_btn">Save</MDBBtn></div>
                        </MDBRow>
           
        </div>
    
        )
    }
}
