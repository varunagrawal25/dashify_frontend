import React, { Component } from 'react'
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import { Checkbox } from '@material-ui/core';

export default class AgencyScanTool extends Component {
    render() {
        return (
            <div>
                <MDBRow className="setting-14" style={{padding:'3% 6%'}}>
                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Agency Name:</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input
                          className="profile4" style={{width:'100%'}}
                          placeholder="Enter agency name"
                          name="address"
                          onChange={this.changeHandler}
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Agency Email:</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input className="profile4" style={{width:'100%'}} placeholder="Enter agency email"  name="city"
                                onChange={this.changeHandler} />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Custom Domain:</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input
                          className="profile4" style={{width:'100%'}}
                          placeholder="Enter custom domain"
                          name="country"
                          onChange={this.changeHandler}
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Link to Fix Listing:</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input className="profile4" style={{width:'100%'}} placeholder="Enter link to fix listings"  name="zipCode"
                                onChange={this.changeHandler}/>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                
                  
                
                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Page Title:</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input className="profile4" style={{width:'100%'}} placeholder="Enter page title"  name="zipCode"
                                onChange={this.changeHandler}/>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                
                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Page Description:</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input className="profile4" style={{width:'100%'}} placeholder="Enter page description:"  name="zipCode"
                                onChange={this.changeHandler}/>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Google Tag Manager Container ID:</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input className="profile4" style={{width:'100%'}} placeholder="Enter google tag id"  name="zipCode"
                                onChange={this.changeHandler}/>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Show Errors</div>
                      </MDBCol>
                      <MDBCol md="6" style={{marginLeft:'-25px'}}>
                        <Checkbox/>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <div style={{margin:'auto',marginTop:'30px'}}>
                  <MDBBtn className="pay_last_btn" style={{margin:'0px 5px'}}>Save</MDBBtn>
                  <MDBBtn className="pay_last_btn" style={{margin:'0px 5px',background:'#00C27A'}}>Upload Custom CSS</MDBBtn>
                      
                      </div>
                  
                </MDBRow>
               
            </div>
        )
    }
}
