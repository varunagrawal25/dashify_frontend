import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Axios from "axios";
import { signup, get_all_user, send_varification_link } from "../apis/user";
import { MDBCol, MDBRow, MDBContainer, MDBBtn } from "mdbreact";
import { Checkbox } from "@material-ui/core";

export default class Signup extends Component {
  state = {
    all_users: [],
    username: "",
    password: "",
    fname: "",
    lname: "",
    bname: "",
    country: "",
    phone: "",
    confirm_password: "",
    username_error: "",
    fname_error: "",
    lname_error: "",
    bname_error: "",
    password_error: "",
    country_error: "",
    phone_error: "",
    confirm_password_error: "",
    isRegister: false,
    terms_condition: false,
    error: "",

    email_sent: "",
    show_signup_button: true,
    loading_activate: false,
    loading: false,
    any_error: false
  };

  componentDidMount = () => {
    // Axios.get(
    //   "https://cors-anywhere.herokuapp.com/http://dashify.biz/api/account/get-all-user"
    // )

    get_all_user()
      .then(res => {
        this.setState({
          all_users: res.data.user_info
        });
        console.log("all users", res.data.user_info);
      })
      .catch(res => {
        console.log("error in loading all users");
      });
  };

  submitHandler = async event => {
    event.preventDefault();
    // event.target.className += ' was-validated';
    // localStorage.setItem('username',this.state.username);
    // localStorage.setItem("password",this.state.password);

    const data = {
      first_name: this.state.fname,
      last_name: this.state.lname,
      username: this.state.username,
      password: this.state.password,
      Company_name: this.state.bname,
      Country: this.state.country,
      Phone: this.state.phone,
      Zip: "123"
    };

    await this.errorValue(data);

    if (this.state.any_error == false && this.state.terms_condition == true) {
      this.setState({ loading: true });
      signup(data)
        .then(resp => {
          this.setState({ loading: false });
          console.log("resp", resp);
          if (resp.data.response == "Account create successfuly") {
            this.activateHandler();
            this.setState({ show_signup_button: false });
          } else {
            this.setState({
              error: resp,
              isRegister: false
            });
            if (
              resp.data.username == "A user with that username already exists."
            ) {
              this.setState({ username_error: resp.data.username });
            } else {
              alert("something went wrong");
            }
            console.log("error1", resp);
          }
        })
        .catch(error => {
          this.setState({ error: error, isRegister: false, loading: false });
          console.log("error2", error);
        });
    }
  };

  activateHandler = () => {
    this.setState({ email_sent: "", loading_activate: true });

    const data = {
      email_id: this.state.username
    };

    send_varification_link(data)
      .then(res => {
        this.setState({ loading_activate: false, email_sent: 1 });
      })
      .catch(res => {
        this.setState({ loading_activate: false, email_sent: 0 });
      });
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name == "confirm_password") {
      this.is_password_match(event.target.value);
    }
    if (event.target.name == "username") {
      this.is_username_present(event.target.value);
    }
  };

  errorValue = data => {
    let {
      username_error,
      fname_error,
      lname_error,
      bname_error,
      country_error,
      password_error,
      phone_error,
      confirm_password_error
    } = this.state;

    this.setState({
      username_error: "",
      fname_error: "",
      lname_error: "",
      bname_error: "",
      country_error: "",
      password_error: "",
      phone_error: "",
      confirm_password_error: "",
      any_error: false
    });

    let any_error = false;

    if (data.first_name == "") {
      this.setState({ fname_error: "*Enter your first name" });
      any_error = true;
    }
    if (data.last_name == "") {
      this.setState({ lname_error: "*Enter your last name" });
      any_error = true;
    }
    if (data.username == "") {
      this.setState({ username_error: "*Enter username" });
      any_error = true;
    }
    if (data.Company_name == "") {
      this.setState({ bname_error: "*Enter your Company name" });
      any_error = true;
    }
    if (data.Country == "") {
      this.setState({ city_error: "*Enter your Country name" });
      any_error = true;
    }
    if (data.Phone == "") {
      this.setState({ state_error: "*Enter your Phone No." });
      any_error = true;
    }
    if (data.password == "") {
      this.setState({ password_error: "*password can not be empty" });
      any_error = true;
    }
    if (data.password != this.state.confirm_password) {
      this.setState({ confirm_password_error: "*Not matched" });
      any_error = true;
    }
    this.setState({ any_error });
  };

  is_password_match = data => {
    let { password } = this.state;
    this.setState({ confirm_password_error: "" });

    if (password != data) {
      this.setState({ confirm_password_error: "*Not matched" });
    }
  };

  is_username_present = data => {
    this.setState({ username_error: "" });
    if (this.state.all_users.includes(data)) {
      this.setState({ username_error: "*Email already registered" });
    }
  };
  render() {
    // if (this.state.isRegister) {
    //   return <Redirect to={"/email-confirmation/" + this.state.username} />;
    // }
    console.log("this.state", this.state);
    return (
      //   <div>
      //     <div className="container">
      //       <button
      //         type="button"
      //         className="btn btn-info btn-lg"
      //         data-toggle="modal"
      //         data-target="#myModal"
      //       >
      //         sign up
      //       </button>
      <div className="modal fade" id="myModalSignup" role="dialog">
        <div className="modal-dialog modal-lg">
          <form
            className="needs-validation"
            onSubmit={this.submitHandler}
            noValidate
          >
            <div className="modal-content ">
              <div className="modal-header modal_header">
                <h4 className="modal-title modal_header_heading">Sign up</h4>
                <button
                  type="button"
                  className="modal_header_icon"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>

              <div className="modal-body modal_body">
                <div className="signup_box">
                  <div className="modal_body_heading">
                    It’s free and always will be
                  </div>
                  <MDBRow>
                    <MDBCol md="6">
                      <div className="modal_body_subheading">First name</div>

                      <div>
                        <input
                          value={this.state.fname}
                          name="fname"
                          onChange={this.changeHandler}
                          type="text"
                          className="modal_inputbox modal_inputbox_new"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.fname_error}
                        </div>
                      </div>
                    </MDBCol>

                    <MDBCol md="6">
                      <div className="modal_body_subheading">Company name</div>
                      <div>
                        <input
                          value={this.state.bname}
                          onChange={this.changeHandler}
                          type="text"
                          className="modal_inputbox modal_inputbox_new"
                          name="bname"
                        />
                        <div style={{ color: "red" }}>
                          {this.state.bname_error}
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="6">
                      <div className="modal_body_subheading">Last name</div>

                      <div>
                        <input
                          value={this.state.lname}
                          name="lname"
                          onChange={this.changeHandler}
                          type="text"
                          className="modal_inputbox modal_inputbox_new"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.lname_error}
                        </div>
                      </div>
                    </MDBCol>

                    <MDBCol md="6">
                      <div className="modal_body_subheading">Country</div>
                      <div>
                        <input
                          value={this.state.country}
                          onChange={this.changeHandler}
                          type="text"
                          className="modal_inputbox modal_inputbox_new"
                          name="country"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.country_error}
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="6">
                      <div className="modal_body_subheading">Email</div>

                      <div>
                        <input
                          value={this.state.username}
                          name="username"
                          onChange={this.changeHandler}
                          type="text"
                          className="modal_inputbox modal_inputbox_new"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.username_error}
                        </div>
                      </div>
                    </MDBCol>

                    <MDBCol md="6">
                      <div className="modal_body_subheading">Phone</div>
                      <div>
                        <input
                          value={this.state.phone}
                          onChange={this.changeHandler}
                          type="text"
                          className="modal_inputbox modal_inputbox_new"
                          name="phone"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.phone_error}
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="6">
                      <div className="modal_body_subheading">Password</div>

                      <div>
                        <input
                          value={this.state.password}
                          name="password"
                          onChange={this.changeHandler}
                          type="password"
                          className="modal_inputbox modal_inputbox_new"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.password_error}
                        </div>
                      </div>
                    </MDBCol>

                    <MDBCol md="6">
                      <div className="modal_body_subheading">
                        Confirm password
                      </div>
                      <div>
                        <input
                          value={this.state.confirm_password}
                          onChange={this.changeHandler}
                          type="password"
                          className="modal_inputbox modal_inputbox_new"
                          name="confirm_password"
                          required
                        />
                        <div style={{ color: "red" }}>
                          {this.state.confirm_password_error}
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>

                  {/* <MDBRow>
                      <MDBCol md="1">
                        <Checkbox />
                      </MDBCol>
                      <MDBCol md="11" className="modal_body_contant1">
                        Remember me
                      </MDBCol>
                    </MDBRow> */}

                  <MDBRow>
                    <MDBCol md="1">
                      <Checkbox
                        onClick={() =>
                          this.setState({
                            terms_condition: !this.state.terms_condition
                          })
                        }
                      />
                    </MDBCol>
                    <MDBCol md="11" className="modal_body_contant1">
                      By clicking Sign Up,you agree to our <b>Terms</b> and that
                      you have read and understand our <b>Data Use Policy</b>,
                      including our <b>Cookie Use</b>
                    </MDBCol>
                  </MDBRow>
                  <div className="signup-text">
                    {this.state.loading ? (
                      <Loader
                        type="Oval"
                        color="#00BFFF"
                        height={30}
                        width={30}
                        // timeout={3000} //3 secs
                      />
                    ) : (
                      ""
                    )}

                    {this.state.loading_activate ? (
                      <Loader
                        type="Oval"
                        color="#00BFFF"
                        height={25}
                        width={25}
                        // timeout={3000} //3 secs
                      />
                    ) : this.state.email_sent == 1 ? (
                      <div style={{ color: "green" }}>
                        Email verification link has been sent to your inbox
                        successfully
                        <button onClick={() => this.activateHandler}>
                          send again
                        </button>
                      </div>
                    ) : (
                      // this.state.email_sent == 0 ? (
                      //   <div style={{ color: "red" }}>someting went wrong</div>
                      // ) :
                      ""
                    )}
                  </div>
                  {this.state.show_signup_button ? (
                    <div>
                      <button type="submit" className="signup_btn">
                        Sign up
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      //     </div>
      //   </div>
    );
  }
}
