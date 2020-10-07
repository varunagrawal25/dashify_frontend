import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import { get_link_of_forget_password } from "./apis/user";
import ProfileSettingSidebar from "./setting-sidebar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import avtar_img from "./assets/img_avatar.png";

export default class SettingAccounts extends Component {
  changePassword = () => {
    let userEmail = localStorage.getItem("UserEmail");
    const data = {
      email_id: userEmail
    };

    if (userEmail) {
      // Axios.post(
      //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/account/get-link-of-forget-password",
      //   data
      // )
      get_link_of_forget_password(data)
        .then(res => {
          console.log(res);
          alert("Reset Password link sent to your Mail");
        })
        .catch(res => {
          console.log("error in forgot", res);
          alert("something went wront");
        });
    }
  };
  render() {
    let userEmail = localStorage.getItem("UserEmail");
    return (
      <>
        {/* <div className="left-side-menu"></div>
        <div className="content-page"> */}
        <div className="container profile_margin " id="overview-10">
          <div className="setting-10">
            <h3>Profile Setting</h3>
          </div>
          <div className="row acct_gap">
            <MDBCol md="3">
              <ProfileSettingSidebar />
            </MDBCol>
            <div className="col-md-8  ">
              <div className="row ">
                <div className=" setting-12">
                  <h3>My Profile</h3>
                </div>
                <div className=" setting-13">
                  <h3>Company Profile</h3>
                </div>
              </div>
              <div className="row setting-14">
                <div class="col-md-4 avatar  ">
                  <img src={avtar_img} alt="" />

                  <p>Will Newman</p>
                </div>

                <div className="col-md-8 ">
                  <div class="form-group row form_gap">
                    <label for="inputEmail3" class="col-sm-3 col-form-label">
                      Email:
                    </label>
                    <div class="col-sm-9">
                      <input
                        type="email"
                        class="form-control"
                        id="inputEmail3"
                        value={userEmail}
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-3 col-form-label">
                      Password:
                    </label>
                    <div class="col-sm-9">
                      <div className="changes-style">
                        <a onClick={this.changePassword}>Change</a>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-3 col-form-label">
                      Role:
                    </label>
                    <div class="col-sm-9">
                      <div
                        data-toggle="dropdown"
                        className="changes-style"
                      >
                        Admin
                        <ArrowDropDownIcon />
                      </div>
                      
                        <ul className="dropdown-menu adm">
                          <li>Admin</li>
                          <li>User</li>
                        </ul>
                     
                    </div>
                  </div>
                  <div className="save_gap">
                    <button type="submit" class="btn btn-profile-10 ">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </>
    );
  }
}
