import React, { Component } from "react";
import { HashRouter, NavLink } from "react-router-dom";

export default class SideBar extends Component {
  render() {
    return (
      <div>
        <HashRouter>
        
          <div className="left-side-menu">
            <div className="left_nav">
              <ul className="left_content">
                <li>
                  <NavLink 
                    selected
                    to={
                      "/locations/" +
                      localStorage.getItem("locationId") +
                      "/overview"
                    }
                  >
                    <img src={require("./assets/Color.png")} alt="" />
                    <span>Dashboard</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/user-profile">
                    <img src={require("./assets/user.png")} alt="" />
                    <span>User Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/activity">
                    <img src={require("./assets/linechartup.png")} alt="" />
                    <span>Activity</span>
                  </NavLink>
                </li>

                {/* <li>
                  <NavLink to="/report">
                    <img src={require("./assets/filefind.png")} alt="" />
                    <span>Report</span>
                  </NavLink>
                </li> */}

                {/* <li>
                  <NavLink to="/support">
                    <img src={require("./assets/uservoice.png")} alt="" />
                    <span>Support</span>
                  </NavLink>
                </li> */}
                {/* <li>
                  <NavLink to="/notification">
                    <img src={require("./assets/uservoice.png")} alt="" />
                    <span>Notification</span>
                  </NavLink>
                </li> */}
                <li>
                  <NavLink to="/setting-main/setting-accounts/my-profile">
                    <img src={require("./assets/settingsfuture.png")} alt="" />
                    <span>Settings</span>
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-md-12 invite_text">
              <p>Invite your team and start collaborating</p>
              <NavLink to="/setting-main/setting-people/invite-new-user">
              <div className="invite_box">
                <div className="dash_fry ">
                  <img src={require("./assets/logo_4.png")} alt="" />
                  
                  <div className="invity">
                    <p>Invite to Dashify</p>
                  </div>
                 
                </div>
              </div>
              </NavLink>
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}
