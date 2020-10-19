import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import paypal from "./assets/paypal.png";
import mastercard from "./assets/mastercard.png";
import ProfileSettingSidebar from "./setting-sidebar";

export default class SettingBilling extends Component {
  render() {
    return (
      <div>
        <MDBContainer>
          <div className="setting-10">
            <h3> Profile Setting</h3>
          </div>

          <MDBRow>
            <MDBCol md="3">
              <ProfileSettingSidebar />
            </MDBCol>

            <MDBCol md="9">
              <div className="user_container ">
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
