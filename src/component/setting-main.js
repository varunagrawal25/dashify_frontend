import React, { Component } from "react";
import { HashRouter, Route, NavLink } from "react-router-dom";
import ProfileSettingSidebar from "./setting-sidebar";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import SettingBilling from "./setting-billing";
import SettingAccounts from "./setting-accounts";

export default class SettingMain extends Component {
  render() {
    return (
      <div className="main_content">
        <div className="rightside_title">
          <h1>Profile Settings</h1>
        </div>
        <div className="tablediv mb-30">
          <MDBCol md="3">
            <MDBRow>
              <ProfileSettingSidebar />
            </MDBRow>
          </MDBCol>

          <div className="col-md-9">
            <div className="content"></div>
          </div>
        </div>
      </div>
    );
  }
}
