import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import { get_link_of_forget_password } from "./apis/user";
import ProfileSettingSidebar from "./setting-sidebar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import avtar_img from "./assets/img_avatar.png";
import { get_login_user_info } from "./apis/user";
import swal from "sweetalert";
import {secure_pin} from '../config'

export default class profileUser extends Component {
    state = {
        user_info: {},
        first_name: "",
        last_name: "",
        user_image: "",
        email: ""
      };
      componentDidMount = () => {
         
        let data = {  secure_pin, user_id: localStorage.getItem("UserId") };
        get_login_user_info(data)
          .then(res => {
            console.log("user info", res.data);
            console.log("user info", res.data.users_login[0]);
            console.log("user info", res.data.users_login[0].first_name);
            console.log("user info", res.data);
            if (res.data ) {
              this.setState({
                user_info: res.data.users_login,
                first_name: res.data.users_login[0].first_name,
                last_name: res.data.users_login[0].last_name,
                email: res.data.users_login[0].email_id,
                user_image: res.data.users_login[0].profile_image,
                loading_info: false,
                loading_image: false
              });
              console.log("user info", this.state.user_info);
              console.log("user info", this.state.first_name);
            } else {
              this.setState({ loading_info: false, loading_image: false });
            }
          })
          .catch(err => {
            console.log("user info err", err);
            this.setState({ loading_info: false, loading_image: false });
          });
      };
      changePassword = () => {
        let userEmail = localStorage.getItem("UserEmail");
        const data = {
            secure_pin,
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
              swal("Reset Password link sent to your Mail");
            })
            .catch(res => {
              console.log("error in forgot", res);
              swal("something went wront");
            });
        }
      };
      render() {
        let userEmail = localStorage.getItem("UserEmail");
        return (
            <div>
                 <div className="row setting-14">
                <div class="col-md-4 avatar  ">
                  <img
                    src={
                      this.state.user_info && this.state.user_image
                        ?"https://digimonk.net/dashify-ci/assets/upload/images/profile-type-image/" + this.state.user_image
                        : avtar_img
                    }
                    alt=""
                  />
                  {/* <img src={avtar_img} alt="" /> */}

                  <p>
                    {this.state.first_name} {this.state.last_name}
                  </p>
                </div>

                <div className="col-md-8 ">
                  <div class="form-group row form_gap">
                    <label for="inputEmail3" class="col-sm-4 col-form-label">
                      Email:
                    </label>
                    <div class="col-sm-8">
                      <input
                        type="email"
                        class="form-control"
                        id="inputEmail3"
                        value={this.state.email}
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-4 col-form-label">
                      Password:
                    </label>
                    <div class="col-sm-8">
                      <div className="changes-style">
                        <a onClick={this.changePassword}>Change</a>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-4 col-form-label">
                      Role:
                    </label>
                    <div class="col-sm-8">
                      <select>
                          <option>Admin</option>
                          <option>User</option>
                      </select>
                    </div>
                  </div>
                  <div className="save_gap">
                    <button type="submit" class="user_save0">
                      Save
                    </button>
                  </div>
                </div>
              </div>
           
            </div>
        )
    }
}
