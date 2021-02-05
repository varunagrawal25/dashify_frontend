import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {  MDBCol } from "mdbreact";

export default class ProfileSettingSidebar extends Component {
  state={role:''}

  componentDidMount = () => {

    this.setState({role:this.props.role})
  }

  componentDidUpdate(){
    if(this.state.role !== this.props.role)
    this.setState({role:this.props.role});
  }
  
  render() {
    let SplitUrl = window.location.href.split("/");
    let lastNameOfUrl = SplitUrl[SplitUrl.length - 1];
    console.log("side",this.state.role)
    return (
      <MDBCol className="profile_container">
        <div className="profile1">
            <NavLink to="/setting-main/setting-accounts/my-profile" className="active">
              Account
            </NavLink>

            {this.state.role === "admin" || this.state.role === "owner"?  <NavLink to="/setting-main/setting-notification">Notification Setting</NavLink>:""}
         
            {/* {this.state.role === "admin" || this.state.role === "owner"?   <NavLink to="/setting-main/setting-email">Email Setting</NavLink>:""} */}
         {this.state.role === "admin" || this.state.role === "owner"?   <NavLink to="/setting-main/setting-people">People</NavLink> :""}
         {( (this.state.role === "admin") ||  (this.state.role === "manager" ) || (this.state.role === "owner") ) ?   <NavLink  to="/setting-main/setting-billing">Billing </NavLink>:""}
            
            {/* <NavLink to="/c">Integrations</NavLink>
             */}
            {this.state.role === "admin"  || this.state.role === "owner"?  <NavLink  to="/setting-main/setting-agency">Agency Setting</NavLink> :""}
         
         
        </div>
      </MDBCol>
    );
  }
}
