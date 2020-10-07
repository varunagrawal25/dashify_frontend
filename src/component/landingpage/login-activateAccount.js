import React, { Component } from "react";
import { MDBCol, MDBRow, MDBContainer, MDBBtn } from "mdbreact";
import { Checkbox } from "@material-ui/core";
import Logo from "./img/Logo.png";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Axios from "axios";
import { login, account_activate, logout } from "../apis/user";

export default class Login extends Component {
  state = {
    Email: "",
    Password: "",
    isSuccessLogin: false,
    isAlreadyLoginRememberme: false,
    RememberMe: false,
    Email_error: "",
    Password_error: "",
    wrong: "",
    isPasswordShown: false,
    loading: false
  };

  componentDidMount = async () => {
    await this.isAlreadyLoginRememberme();

    await this.notLogout();

    if (
      this.props &&
      this.props.match.params &&
      this.props.match.params.param1
    ) {
      console.log("props and param", this.props.match.params.param1);
      var { param1, param2 } = this.props.match.params;
      const data = {
        pera_1: param1,
        pera_2: param2
      };

      account_activate(data)
        .then(res => {
          console.log("account activation", res);
          alert(res.data.messgae);

          // setAuthToken(res.data.Token)

          // this.setState({isSuccessLogin:true})
        })
        .catch(res => console.log("not active"));
    }
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

  submitHandler = event => {
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
          if (err.response.status == 403) {
            window.location.assign("/dashboard");
          } else if (err.response.status == 400) {
            this.setState({
              wrong:
                "Username and pasword is incorrect & may be your account is not activate",
              loading: false
            });
          } else {
            this.setState({ wrong: "Server error", loading: false });
          }
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
      <div>
        <div className="container">
          {/* <div className="modal fade" id="myModalSignin" role="dialog"> */}
          <div className="modal-dialog " id="login_width">
            <form onSubmit={this.submitHandler} noValidate>
              <div className="modal-content ">
                <div className="modal-header modal_header">
                  <MDBRow>
                    <MDBCol className="modal-title  " md="10">
                      <div className="modal_header_heading">Log In</div>
                    </MDBCol>
                    <MDBCol md="2">
                      {/* <button
                        type="button"
                        className=" modal_header_icon"
                        data-dismiss="modal"
                      >
                        &times;
                      </button> */}
                      <button
                        type="button"
                        className=" modal_header_icon"
                        onClick={() =>
                          this.props.history.push({ pathname: `/` })
                        }
                      >
                        &times;
                      </button>
                    </MDBCol>
                  </MDBRow>
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
                      <div style={{ color: "red" }}>{this.state.wrong}</div>
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
          {/* </div> */}
        </div>
      </div>
    );
  }
}
