import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import user_img from "./assets/user_img.png";
import insta from "./assets/insta.png";
import fb from "./assets/fb.png";
import twitter from "./assets/twitter.png";
import snap from "./assets/snap.png";
import paypal from "./assets/paypal.png";
import mastercard from "./assets/mastercard.png";
import map from "./assets/map_user.png";

export default class User_profile extends Component {
  render() {
    return (
      <div>
        <MDBContainer>
          <div className="setting-10">
            <h3>User Profile</h3>
          </div>
          <MDBRow className="user_container">
            <MDBCol md="3">
              <img src={user_img} alt="user" />
            </MDBCol>
            <MDBCol md="6">
              <div className="user1">Abdur Rahim Smarroi</div>
              <MDBRow>
                <MDBCol md="4">
                  <div className="user2">Company name</div>
                  <div className="user2">Address</div>
                  <div className="user2">Phone</div>
                  <div className="user2">Website</div>
                </MDBCol>
                <MDBCol md="8">
                  <div className="user3">New Company name</div>
                  <div className="user3">
                    Satmasjid Road, Mohammadpur, Dhaka 1207
                  </div>
                  <div className="user3">+008 09 76 654 56 56</div>
                  <div className="user3">BrothersLaw.com</div>
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol md="3">
              <img src={map} alt="user" id="user_map" />
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol md="3" className="user_container">
              <MDBRow>
                <MDBCol className="user2" md="7">
                  Social Network
                </MDBCol>
                <MDBCol md="5">
                  <MDBBtn id="user_add">+ Add</MDBBtn>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="4">
                  <img src={twitter} alt="icon" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBBtn className="user_connected_btn">Connected</MDBBtn>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="4">
                  <img src={fb} alt="icon" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBBtn className="user_disconnected_btn">
                    Disconnected
                  </MDBBtn>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="4">
                  <img src={insta} alt="icon" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBBtn className="user_connected_btn">Connected</MDBBtn>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="4">
                  <img src={snap} alt="icon" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBBtn className="user_connected_btn">Connected</MDBBtn>
                </MDBCol>
              </MDBRow>
              <div id="user11">
                By clicking any on this social icon you will directly redirect
                to his/her social Profile
              </div>
            </MDBCol>

            <MDBCol md="9">
              <div className="user_container " style={{ marginRight: "-10px" }}>
                <MDBRow>
                  <MDBCol md="3" id="user7">
                    Subscription
                  </MDBCol>
                  <MDBCol md="6" className="user12">
                    Premium Monthly
                  </MDBCol>
                  <MDBCol md="3">
                    <MDBBtn id="user_save">Save</MDBBtn>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="3" id="user_payment_container">
                    <div id="user6">$8</div>
                    <div className="user8">Month</div>
                    <div className="user9">Per Location</div>
                    <div className="user9">Billed Monthly</div>
                  </MDBCol>
                  <MDBCol md="7" id="user10">
                    <div>
                      <span className="user4">Start Date: </span>
                      <span className="user5">30 Jan 2020</span>
                    </div>

                    <div>
                      <span className="user4">Valid Till: </span>
                      <span className="user5">30 Jan 2020</span>
                    </div>

                    <div>
                      <span className="user4">Min. Commitemnt:</span>
                      <span className="user5"> 60 Loсation / Monthly </span>
                    </div>

                    <div>
                      <span className="user4">Currently added: </span>
                      <span className="user5">637 Locations </span>
                    </div>

                    <div>
                      <span className="user4">Next Billing amount: </span>
                      <span className="user5">$5103. 94 On 29 Feb 2020 </span>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="5">
                    <img src={mastercard} />{" "}
                  </MDBCol>
                  <MDBCol md="5">
                    <img src={paypal} />
                  </MDBCol>
                  <MDBCol md="2">
                    <MDBBtn className="add_more">+</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
