import React, { Component } from "react";
import { HashRouter, NavLink } from "react-router-dom";

export default class SideBar extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          {/* <div className="left-side-menu">
            <div className="sidebar-scrollbar">
              <ul>
                <li>
                  <NavLink to="/" className="active">
                    <i className="flaticon-dashboard"></i>{" "}
                    <span className="nonebox">dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/user-profile">
                    <i className="flaticon-user"></i>{" "}
                    <span className="nonebox">User Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/activity">
                    <i className="flaticon-agenda"></i>{" "}
                    <span className="nonebox">Activity</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/report">
                    <i className="flaticon-signal"></i>{" "}
                    <span className="nonebox">Report</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/support">
                    <i className="flaticon-support"></i>{" "}
                    <span className="nonebox">Support</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/notification">
                    <i className="flaticon-support"></i>{" "}
                    <span className="nonebox">Notification</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/setting-main">
                    <i className="flaticon-gear"></i>{" "}
                    <span className="nonebox">Settings</span>
                  </NavLink>
                </li>
              </ul>
              <div className="sidebar-img">
                <div className="invite">
                  <img src={require("../images/sidebarimg.png")} />
                  <p>Invite your team and start collaborating!</p>
                  <a href="invite">Invite to Dashify</a>
                </div>
              </div>
            </div>
          </div> */}

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

                <li>
                  <NavLink to="/report">
                    <img src={require("./assets/filefind.png")} alt="" />
                    <span>Report</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/support">
                    <img src={require("./assets/uservoice.png")} alt="" />
                    <span>Suport</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/notification">
                    <img src={require("./assets/uservoice.png")} alt="" />
                    <span>Notification</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/setting-main">
                    <img src={require("./assets/settingsfuture.png")} alt="" />
                    <span>Settings</span>
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-md-12 invite_text">
              <p>Invite your team and start collaborating</p>

              <div className="invite_box">
                <div className="dash_fry ">
                  <img src={require("./assets/logo_4.png")} alt="" />

                  <div className="invity ">
                    <p>Invite to Dashify</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}
