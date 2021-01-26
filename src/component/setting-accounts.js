import React, { Component } from "react";
import { NavLink ,Switch,Route} from "react-router-dom";
import Axios from "axios";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import { get_link_of_forget_password } from "./apis/user";
import ProfileSettingSidebar from "./setting-sidebar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import avtar_img from "./assets/img_avatar.png";
import { get_login_user_info } from "./apis/user";
import swal from "sweetalert";
import profileUser from "./profileUser";
import profileCompany from "./profileCompany";

const DjangoConfig = {
  headers: {
    Authorization: "Token " + localStorage.getItem("UserToken")
  }
};
export default class SettingAccounts extends Component {
  state = {
    user_info: {},
    first_name: "",
    last_name: "",
    user_image: "",
    email: "",
    role:''
  };
  componentDidMount ()  {

    this.setState({role:this.props.role})
    let data = { user_id: localStorage.getItem("UserId") };
    get_login_user_info(data, DjangoConfig)
      .then(res => {
        console.log("user info", res.data);
        if (res.data && res.data.user_info) {
          this.setState({
            user_info: res.data.user_info,
            first_name: res.data.user_info.first_name,
            last_name: res.data.user_info.last_name,
            email: res.data.user_info.user.email,
            user_image: "",
            loading_info: false,
            loading_image: false
          });
        } else {
          this.setState({ loading_info: false, loading_image: false });
        }
      })
      .catch(err => {
        console.log("user info err", err);
        this.setState({ loading_info: false, loading_image: false });
      });
  };
  componentDidUpdate(){
    if(this.state.role !== this.props.role)
    this.setState({role:this.props.role});
  }
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
    console.log("props acc",this.props)
    return (
      <>
        {/* <div className="left-side-menu"></div>
        <div className="content-page"> */}
         <MDBContainer>
          <div className="setting-10">
            <h3> Profile Setting</h3>
          </div>

          <MDBRow>
            <MDBCol md="3">
              <ProfileSettingSidebar role={this.state.role} />
            </MDBCol>
            <div className="col-md-9  ">
              <div className="breadcrumb-menu" style={{margin:'0px -15px'}}>
                    <ul>
                      <li>
                        <NavLink
                          to={
                            "/setting-main/setting-accounts/my-profile" 
                          }
                          className="underline-from-left"
                        >
                          My Profile
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to={
                            "/setting-main/setting-accounts/company-profile" 
                          }
                          className="underline-from-left"
                        >
                          Company Profile
                        </NavLink>
                      </li>
                      </ul>
                
              </div>
              <Switch>
           <Route path="/setting-main/setting-accounts/my-profile" component={profileUser} />
           <Route path="/setting-main/setting-accounts/company-profile" component={profileCompany} />
          </Switch>
           </div>
         </MDBRow>
        
        </MDBContainer>
        {/* </div> */}
      </>
    );
  }
}
