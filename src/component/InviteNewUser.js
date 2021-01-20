import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { add_social_account } from "./apis/social_platforms";
import swal from "sweetalert";
import {secure_pin} from "../config"
import { Add_Invite_User } from "./apis/invite";
import { MDBBtn, MDBCol, MDBRow } from "mdbreact";

class InviteNewUser extends Component {
  state = {
    url: "",
    username: "",
    password: "",
    log: false,
    isUrl: false,
    username_error: "",
    password_error: "",
    url_error: "",
    wrong: "",
    loading: false
  };

  onSubmit = e => {
    e.preventDefault();

  
      const data = {
        secure_pin,
        "user_id":localStorage.getItem("UserId"),
        "first_name":this.state.firstName,
        "last_name":this.state.lastName,
        "email_id":this.state.userEmail,
        "internal_agency_user":this.state.userType,
        "role":this.state.userRole,
        "location_array":[{"id":"87"},{"id":"86"}],
        "import_csv":false,"csv_file":"base64"
       
      
      };



console.log("instadata",data)
    

      Add_Invite_User(data)
      .then(resp => {
        console.log(resp);
        //this.setState({ isUrl: true, loading: false });
      })
      .catch(resp => {
        console.log(resp);
       
      });
   
   
  };

  render() {
    if (this.state.isUrl) {
      return (
        <Redirect
        to={
          "/locations/" +
          localStorage.getItem("locationId") +
          "/view-listing"
        }
      />
      );
    }

    console.log(this.state)

    return (
      <div>
       <div className="profile_container" style={{color:'#4f4f4f',marginTop:'60px'}}>
        
          <form onSubmit={this.onSubmit}>
            <fieldset className="login_fieldset">
            <MDBRow>
          <MDBCol md='11'  className='form-group invite_head'>
          Login
          </MDBCol>
          <MDBCol md='1'>
          <Link to="/setting-main/setting-people/" style={{paddingLeft:'52px',textDecoration:'none'}}>x</Link>
          </MDBCol>
        </MDBRow>

              {this.state.loading ? (
                <Loader
                  type="Oval"
                  color="#00BFFF"
                  height={25}
                  width={25}
                  // timeout={3000} //3 secs
                />
              ) : (
                <div class='err_msg'>{this.state.wrong}</div>
              )}
  <MDBRow>
          <MDBCol md='4' className='form-group invite_subHead'>
            <div>First Name <span className="red">*</span></div>
            <input
                  type="text"
                  value={this.state.firstName}
                  placeholder="teamdigimonk"
                  className="form-control"
                  onChange={e => this.setState({ firstName: e.target.value })}
                />
                <div class='err_msg'>{this.state.url_error}</div>
          </MDBCol>

          <MDBCol md='4' className='form-group invite_subHead'>
            <div>Last Name</div>
            <input
                  type="text"
                 name="lastName"
                 className="form-control"
                  onChange={e => this.setState({ lastName: e.target.value })}
                />
                <div class='err_msg'>{this.state.username_error}</div>
          </MDBCol>

          <MDBCol md='4' className='form-group invite_subHead'>
            <div>User Email <span className="red">*</span></div>
            <input
                  type="password"
                  name="userEmail"
                  className="form-control"
                  onChange={e => this.setState({ userEmail: e.target.value })}
                />
                <div class='err_msg'>{this.state.password_error}</div>
          </MDBCol>
        </MDBRow>
       
             
              {/* <p>
                <label htmlFor="url">First Name</label>
                <input
                  type="text"
                  value={this.state.firstName}
                  placeholder="teamdigimonk"
                  onChange={e => this.setState({ firstName: e.target.value })}
                />
                <div class='err_msg'>{this.state.url_error}</div>
              </p>

              <p>
                <label htmlFor="username">Last Name</label>
                <input
                  type="text"
                 name="lastName"
                  onChange={e => this.setState({ lastName: e.target.value })}
                />
                <div class='err_msg'>{this.state.username_error}</div>
              </p>
              <p>
                <label htmlFor="password">User Email</label>
                <input
                  type="password"
                  name="userEmail"
                  onChange={e => this.setState({ userEmail: e.target.value })}
                />
                <div class='err_msg'>{this.state.password_error}</div>
              </p> */}
<MDBRow>
          <MDBCol md='2' className='form-group invite_subHead'>
          Internal User
          </MDBCol>
          <MDBCol md='2' className='form-group invite_subHead'>
          <input
                  type="radio"
                  name="userType"
                  onChange={e => this.setState({ userType: "internal" })}
                />
          </MDBCol>
          <MDBCol md='2' className='form-group invite_subHead'>
          Agency's Client
          </MDBCol>
          <MDBCol md='2' className='form-group invite_subHead'>
          <input
                  type="radio"
                  name="userType"
                  onChange={e => this.setState({ userType: "agency" })}
                />
          </MDBCol>
        </MDBRow>
<MDBRow>
  <MDBCol md='3' className='form-group invite_subHead'>
  Select User Role Below <span className="red">*</span>
  <div>
  <select
                //   type="password"
                //   name="userEmail"
                className="review_select_btn"
                  onChange={e => this.setState({ userRole: e.target.value })}
                >
                     <option >
                   Select
                </option>

                <option value="clientWrite">
                    Client (Write)
                </option>
                
                <option  value="admin" >
                    Admin
                </option>
                
                <option value="manager">
                  Manager
                </option>
                
                <option value="clientRead">
                    Client (Read only)
                </option>
                    </select>
 
 
  </div>
  </MDBCol>
  
</MDBRow>
<MDBRow  className='form-group'>
  <MDBCol className="offset-md-10">
  <MDBBtn type="submit" className="last_btn" style={{marginLeft:'40px'}}>Invite User</MDBBtn>
  </MDBCol>
</MDBRow>
          
            </fieldset>
          </form>
        </div>
     
      </div>
    );
  }
}

export default InviteNewUser;
