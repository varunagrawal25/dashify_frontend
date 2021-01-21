import React, { Component } from 'react'
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";

export default class agencyScanTool extends Component {
    render() {
        return (
            <div>
                <MDBRow>
                  <MDBCol md="10" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="3">
                        <div className="profile3">Agency Name:</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input
                          className="profile4"
                          placeholder="Enter agency name"
                          name="address"
                          onChange={this.changeHandler}
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="10" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="3">
                        <div className="profile3">Agency Email:</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input className="profile4" placeholder="Enter agency email"  name="city"
                                onChange={this.changeHandler} />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="10" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="3">
                        <div className="profile3">Custom Domain:</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input
                          className="profile4"
                          placeholder="Enter custom domain"
                          name="country"
                          onChange={this.changeHandler}
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="10" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="3">
                        <div className="profile3">Link to Fix Listing:</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input className="profile4" placeholder="Enter link to fix listings"  name="zipCode"
                                onChange={this.changeHandler}/>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                
                  
                
                  <MDBCol md="10" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="3">
                        <div className="profile3">Page Title:</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input className="profile4" placeholder="Enter page title"  name="zipCode"
                                onChange={this.changeHandler}/>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                
                  <MDBCol md="10" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="3">
                        <div className="profile3">Page Description:</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input className="profile4" placeholder="Enter page description:"  name="zipCode"
                                onChange={this.changeHandler}/>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol md="10" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="3">
                        <div className="profile3">Google Tag Manager Container ID:</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input className="profile4" placeholder="Enter google tag id"  name="zipCode"
                                onChange={this.changeHandler}/>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
               
            </div>
        )
    }
}
