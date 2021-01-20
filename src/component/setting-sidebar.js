import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {  MDBCol } from "mdbreact";

export default class ProfileSettingSidebar extends Component {
  
  render() {
    let SplitUrl = window.location.href.split("/");
    let lastNameOfUrl = SplitUrl[SplitUrl.length - 1];
    return (
      <MDBCol className="profile_container">
        <div className="profile1">
            <NavLink to="/setting-main/setting-accounts/my-profile" className="active">
              Account
            </NavLink>

            <NavLink to="/b">Notification Setting</NavLink>
         
            <NavLink to="/setting-main/setting-email">Email Setting</NavLink>
            <NavLink to="/setting-main/setting-people">People</NavLink>
            <NavLink  to="/setting-main/setting-billing">Billing </NavLink>
            
            <NavLink to="/c">Integrations</NavLink>
            
            <NavLink  to="/setting-main/setting-agency/dashboard">Agency Setting</NavLink>
         
         
        </div>
      </MDBCol>
    );
  }
}
