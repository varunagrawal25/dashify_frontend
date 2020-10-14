import React, { Component } from "react";
import { MDBCol, MDBRow, MDBContainer, MDBBtn } from "mdbreact";
import { Checkbox } from "@material-ui/core";
import Logo from "./img/Logo.png";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import {
  login,
  account_activate,
  send_varification_link,
  logout
} from "../apis/user";
// import sendVerificationLink from "./activate_account";

export default class Login extends Component {
  state = {
    Password: "",
    isSuccessLogin: false,
    isAlreadyLoginRememberme: false,
    RememberMe: false,
    Password_error: "",
    wrong: "",
    isPasswordShown: false,
    loading: false,

    Email: "",
    Email_error: "",
    email_sent: "",
    loading_activate: false
  };

  componentDidMount = async () => {
    await this.isAlreadyLoginRememberme();

    await this.notLogout();
  };

  isAlreadyLoginRememberme = () => {
    console.log(
      "remember_me and user_token",
      localStorage.getItem("RememberMe") == "true",
      localStorage.getItem("UserToken") != null
    );
    localStorage.getItem("UserToken") != null &&
    localStorage.getItem("RememberMe") == "true"
      ? this.setState({ isAlreadyLoginRememberme: true })
      : this.setState({ isAlreadyLoginRememberme: false });
  };

  notLogout = () => {
    if (
      localStorage.getItem("UserToken") != null &&
      localStorage.getItem("RememberMe") != "true"
    ) {
      this.logout();
    }
  };

  logout = () => {
    // localStorage.clear();
    // logout()
    //   .then(res => {
    //     console.log("sucess");
    //     console.log(res);
    //   })
    //   .catch(res => {
    //     console.log("error in Logout");
    //   });
  };

  loginHandler = event => {
    event.preventDefault();
    // event.target.className += ' was-validated';

    // if (
    //   (localStorage.getItem("username")==this.state.Email)
    //    &&
    //     (localStorage.getItem("password")==this.state.Password)
    //     &&
    //     (this.state.Email!=''))
    //     {
    //   this.setState({isSuccessLogin:true})
    // }
    this.setState({ Email_error: "", Password_error: "", wrong: "" });

    var cal = false;
    if (this.state.Email == "" && this.state.Password == "") {
      this.setState({
        Email_error: "Enter Email",
        Password_error: "Enter Password"
      });
    } else if (this.state.Email == "") {
      this.setState({ Email_error: "Enter Email" });
    } else if (this.state.Password == "") {
      this.setState({ Password_error: "Enter Password" });
    } else {
      cal = true;
    }

    if (cal) {
      const data = {
        username: this.state.Email,
        password: this.state.Password
      };

      this.setState({ loading: true });

      login(data)
        .then(async res => {
          console.log("login success", res.data);
          await localStorage.setItem("RememberMe", this.state.RememberMe);
          await localStorage.setItem("UserToken", res.data.Token);
          await localStorage.setItem("UserId", res.data.user_info[0].id);
          await localStorage.setItem("UserEmail", this.state.Email);
          await localStorage.setItem(
            "UserName",
            res.data.user_info[0].first_name +
              " " +
              res.data.user_info[0].last_name
          );
          // setAuthToken(res.data.Token)
          await this.setState({ isSuccessLogin: true, loading: false });
        })
        .catch(err => {
          console.log("login error", err.response);
          console.log("login error", err.message);
          if (err.response && err.response.status == 403) {
            window.location.assign("/dashboard");
          } else if (err.response && err.response.status == 400) {
            if (err.response.data && err.response.data.non_field_errors) {
              this.setState({
                wrong: err.response.data.non_field_errors[0],
                loading: false
              });
            } else {
              this.setState({
                wrong: "Server error",
                loading: false
              });
            }
          } else {
            this.setState({ wrong: "Server error", loading: false });
          }
        });
    }
  };

  activateHandler = event => {
    event.preventDefault();

    this.setState({ Email_error: "", email_sent: "" });

    var cal = false;
    if (this.state.Email == "") {
      this.setState({
        Email_error: "Enter Email"
      });
    } else {
      const data = {
        email_id: this.state.Email
      };

      this.setState({ loading_activate: true });

      send_varification_link(data)
        .then(res => {
          console.log(res);
          this.setState({ loading_activate: false, email_sent: 1 });
        })
        .catch(res => {
          console.log("not send");
          this.setState({ loading_activate: false, email_sent: 0 });
        });
    }
  };

  changeHandler = event => {
    console.log("states", this.state);
    this.setState({ [event.target.name]: event.target.value });
  };

  togglePasswordVisibilty = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };
  render() {
    const { isPasswordShown } = this.state;

    if (this.state.isSuccessLogin) {
      // return <Redirect to="/dashboard" />;
      window.location.assign("/dashboard");
    }
    if (this.state.isAlreadyLoginRememberme) {
      // return <Redirect to="/dashboard" />;
      window.location.assign("/dashboard");
    }

    return (
      // <div>
      //   <div className="container">
      <div>
        <div className="modal fade" id="myModalSignin" role="dialog">
          <div className="modal-dialog " id="login_width">
            <form onSubmit={this.loginHandler} noValidate>
              <div className="modal-content ">
                <div className="modal-header modal_header">
                  <h4 className="modal-title modal_header_heading">Log in</h4>
                  <button
                    type="button"
                    className="modal_header_icon"
                    data-dismiss="modal"
                  >
                    &times;
                  </button>
                </div>

                <div className="modal-body modal_body">
                  <div style={{ padding: "0px 10%" }}>
                    {this.state.loading ? (
                      <Loader
                        type="Oval"
                        color="#00BFFF"
                        height={25}
                        width={25}
                        // timeout={3000} //3 secs
                      />
                    ) : (
                      <div style={{ color: "red" }}>
                        {this.state.wrong == "User is not activate." ? (
                          <div>
                            Your account is not activate, Activate your account
                            by{" "}
                            <a
                              data-toggle="modal"
                              data-target="#activate_acount"
                              style={{ color: "green" }}
                            >
                              clicking here
                            </a>{" "}
                          </div>
                        ) : (
                          this.state.wrong
                        )}
                      </div>
                    )}
                    <MDBRow>
                      <MDBCol>
                        <div className="modal_body_subheading">Email</div>

                        <div>
                          <input
                            value={this.state.Email}
                            name="Email"
                            onChange={this.changeHandler}
                            type="text"
                            className="modal_inputbox modal_inputbox_new"
                            required
                          />
                          <div style={{ color: "red" }}>
                            {this.state.Email_error}
                          </div>
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol>
                        <div className="modal_body_subheading">Password</div>
                        <div>
                          <input
                            value={this.state.Password}
                            name="Password"
                            onChange={this.changeHandler}
                            type={isPasswordShown ? "text" : "Password"}
                            className="modal_inputbox modal_inputbox_new"
                            required
                          />
                          <div style={{ color: "red" }}>
                            {this.state.Password_error}
                          </div>
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol md="2" className="modal_checkbox">
                        <Checkbox
                          onClick={() =>
                            this.setState({
                              RememberMe: !this.state.RememberMe
                            })
                          }
                        />
                      </MDBCol>
                      <MDBCol md="10" className="modal_body_contant1">
                        Remember me
                      </MDBCol>
                    </MDBRow>

                    <div>
                      <button type="submit" className="login_btn">
                        Log in
                      </button>
                      <div className="for-color">
                        <Link to="Forgot">Forgot Password ? </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* activate account */}
        <div className="modal fade" id="activate_acount" role="dialog">
          <form onSubmit={this.activateHandler} noValidate>
            <div className="modal-content ">
              <div className="modal-header modal_header">
                <h4 className="modal-title modal_header_heading">
                  Activate account
                </h4>
                <button
                  type="button"
                  className="modal_header_icon"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>

              <div className="modal-body modal_body">
                <div style={{ padding: "0px 10%" }}>
                  {this.state.loading_activate ? (
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={25}
                      width={25}
                      // timeout={3000} //3 secs
                    />
                  ) : this.state.email_sent == 0 ? (
                    <div style={{ color: "red" }}>someting went wrong</div>
                  ) : this.state.email_sent == 1 ? (
                    <div style={{ color: "green" }}>
                      Email verification link has been sent to your inbox
                      successfully
                    </div>
                  ) : (
                    ""
                  )}
                  <MDBRow>
                    <MDBCol>
                      <div className="modal_body_subheading">Email</div>

                      <div>
                        <input
                          value={this.state.Email}
                          name="Email"
                          onChange={this.changeHandler}
                          type="text"
                          className="modal_inputbox modal_inputbox_new"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.Email_error}
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>

                  <div>
                    <button type="submit" className="login_btn">
                      Send email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      // </div>
      // </div>
    );
  }
}
