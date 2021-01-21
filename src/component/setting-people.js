import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import ProfileSettingSidebar from "./setting-sidebar";
import { Link } from "react-router-dom";
import { Get_All_Invites_By_User } from "./apis/invite";
// import Datatable from './Datatable'
import { secure_pin } from "../config";
import Datatable from './Datatable'

export default class Profile_setting extends Component {

  componentDidMount(){

    const data ={
      secure_pin,"user_id":localStorage.getItem("UserId") 
    }
    Get_All_Invites_By_User(data).then(res=>{
      console.log(res)

    }).catch(res=>{

    })
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
              <ProfileSettingSidebar />

              <MDBRow className="mt-3">
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
              <MDBRow className="align-items-center mb-3">
                <MDBCol className="profile1" md="4">
                  People
                </MDBCol>
                <MDBCol md="4">
                 <Link to="/setting-main/setting-people/invite-new-user"> <MDBBtn id="profile_new_btn">+ Invite New User</MDBBtn>
                 </Link>
                </MDBCol>
                <MDBCol md="4">
                <Link to="/setting-main/setting-people/bulk-user"> <MDBBtn id="profile_add_btn">Add Using CSV</MDBBtn>
                </Link>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol>
                  <div className="profile_container">
                    <Datatable/>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
