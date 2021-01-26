import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import ProfileSettingSidebar from "./setting-sidebar";

export default class SettingUpdateCard extends Component {
  componentDidMount ()  {

    this.setState({role:this.props.role})
  }
  componentDidUpdate(){
    if(this.state.role !== this.props.role)
    this.setState({role:this.props.role});
  }
  render() {
    return (
      <div>
        <MDBContainer>
          <div className="setting-10">
            <h3>Profile Setting</h3>
          </div>
          <MDBRow>
            <MDBCol md="3">
              <MDBRow>
                <ProfileSettingSidebar role={this.state.role} />
              </MDBRow>

              <MDBRow>
                <MDBCol
                  className="profile_container"
                  style={{ textAlign: "center" }}
                >
                  <div className="exclamation">!</div>
                  <div className="profile1">People</div>
                  <div className="profile2">
                    Learn more about managing users
                  </div>
                  <div>
                    <MDBBtn id="profile_here_btn">Here</MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCol>

            <MDBCol md="9">
              <div className="profile_container">
                <div className="profile1"> Update your card</div>
                <MDBRow>
                  <MDBCol md="6" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="5">
                        <div className="profile3">Card Number</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input
                          className="profile4"
                          placeholder="9999 9999 9999 9999 "
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="6 " className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="5">
                        <div className="profile3">Expiry date</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input className="profile5" placeholder="MM/YY" />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="6" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="5">
                        <div className="profile3">Name of card</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input className="profile4" placeholder="Jhon Doe" />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="6 " className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="5">
                        <div className="profile3">Security code</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input className="profile5" placeholder="CVV" />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <div className="profile1">Billing Address</div>
                <MDBRow>
                  <MDBCol md="10" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="3">
                        <div className="profile3">Address</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input
                          className="profile4"
                          placeholder="123 St. Jones street"
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="10" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="3">
                        <div className="profile3">City</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input className="profile4" placeholder="Denver" />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="10" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="3">
                        <div className="profile3">Country</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input
                          className="profile4"
                          placeholder="United States Of America"
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="10" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="3">
                        <div className="profile3">ZipCode</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input className="profile4" placeholder="1323123" />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <MDBBtn id="profile_update_card">Update Card</MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
