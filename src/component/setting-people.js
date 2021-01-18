import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import ProfileSettingSidebar from "./setting-sidebar";
import { Link } from "react-router-dom";
// import Datatable from './Datatable'

export default class Profile_setting extends Component {
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
                  <MDBBtn id="profile_add_btn">Add Using CSV</MDBBtn>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol>
                  <div className="profile_container">
                    <MDBTable Hover className="peopel-table">
                      <MDBTableHead>
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              class="input-check"
                              id="defaultUnchecked"
                            />
                          </th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              class="input-check"
                              id="defaultUnchecked2"
                            />
                          </td>
                          <td>
                            <img
                              className="people-img"
                              src={require("../component/assets/img_avatar.png")}
                              alt=""
                            />{" "}
                            Dennis Brinn
                          </td>
                          <td>info@oasismedia.com</td>
                          <td>Admin</td>
                          <td>
                            <span class="active-b">Active</span>{" "}
                          </td>
                          <td align="center">
                            <div class="dropdown">
                              <button
                                class="doted"
                                type="button"
                                data-toggle="dropdown"
                              >
                                <i className="fa fa-ellipsis-h"></i>
                              </button>
                              <ul class="dropdown-menu">
                                <li>
                                  <a href="#">
                                    <i className="fa fa-edit"></i> Edit
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="fa fa-trash"></i> Delect
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              class="input-check"
                              id="defaultUnchecked3"
                            />
                          </td>
                          <td>
                            <img
                              className="people-img"
                              src={require("../component/assets/img_avatar.png")}
                              alt=""
                            />{" "}
                            Dennis Brinn
                          </td>
                          <td>info@oasismedia.com</td>
                          <td>Admin</td>
                          <td>
                            <span class="disable-b">Disable</span>{" "}
                          </td>
                          <td align="center">
                            <div class="dropdown">
                              <button
                                class="doted"
                                type="button"
                                data-toggle="dropdown"
                              >
                                <i className="fa fa-ellipsis-h"></i>
                              </button>
                              <ul class="dropdown-menu">
                                <li>
                                  <a href="#">
                                    <i className="fa fa-edit"></i> Edit
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="fa fa-trash"></i> Delect
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      </MDBTableBody>
                    </MDBTable>
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
