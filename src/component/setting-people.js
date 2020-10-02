import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import Datatable from "./Datatable";
import ProfileSettingSidebar from "./setting-sidebar";

export default class SettingPeople extends Component {
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
                <ProfileSettingSidebar />
              </MDBRow>

              <MDBRow>
                <MDBCol
                  className="profile_container"
                  style={{ textAlign: "center" }}
                >
                  <div></div>
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

            <MDBCol md="8" className="offset-md-1">
              <MDBRow>
                <MDBCol className="profile1" md="4">
                  People
                </MDBCol>
                <MDBCol md="4">
                  <MDBBtn id="profile_new_btn">+ Invite New User</MDBBtn>
                </MDBCol>
                <MDBCol md="4">
                  <MDBBtn id="profile_add_btn">Add Using CSV</MDBBtn>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol className="profile_container">
                  <Datatable />
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
