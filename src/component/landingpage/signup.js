import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Axios from "axios";
import { signup, get_all_user, send_varification_link ,get_all_country} from "../apis/user";
import { MDBCol, MDBRow, MDBContainer, MDBBtn } from "mdbreact";
import { Checkbox } from "@material-ui/core";
import {
  email_regex,
  password_regex,
  phone_regex
} from "../utils/regularexpressions";
import swal from "sweetalert";
import { secure_pin } from "../../config";

export default class Signup extends Component {
  state = {
    all_users: [],
    username: "",
    password: "",
    fname: "",
    lname: "",
    bname: "",
    country: [],
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
    isSignup: false,
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
    const data = {secure_pin}
    get_all_user(data)
      .then(res => {
        if(res.data.status == "1"){
          this.setState({
            all_users: res.data.users_array
          }) 
        }
        
        
        console.log("all users", res.data.users_array);
      })
      .catch(res => {
        console.log("error in loading all users");
      });
      get_all_country(data)
      .then(res => {
          this.setState({
            country: res.data.country_array
          }) 
        
        
          console.log("all country00", this.state.country)
        console.log("all country", res.data.country_array);
      })
      .catch(res => {
        console.log("error in loading all country");
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
      Business_name: this.state.bname,
      country: 'India',
      phone_no: this.state.phone,
      Zip: "123",
      secure_pin
    };

    await this.errorValue(data);

    if (this.state.any_error == false && this.state.terms_condition == true) {
      this.setState({ loading: true });
      signup(data)
        .then(resp => {
          this.setState({ loading: false });
          console.log("resp", resp);
          if (resp.data.status == "1") {
            this.setState({ show_signup_button: false,email_sent: 1 });
            swal(resp.data.message)
          } else {
            this.setState({
              error: resp,
              isRegister: false
            });
            if (
              resp.data.message == "Email Id exist"
            ) {
              this.setState({ username_error: resp.data.message });
            } else {
              swal(resp.data.message)
            }
            console.log("error1", resp);
          }
        })
        .catch(error => {
          this.setState({ error: error, isRegister: false, loading: false });
          console.log("error2", error);
          swal("Registration failed")
        });
    }
  };

  resendLink = () => {
    this.setState({ email_sent: "", loading_activate: true });

    const data = {
      secure_pin,
      email_id: this.state.username
    };

    send_varification_link(data)
      .then(res => {
        this.setState({ loading_activate: false, email_sent: 1 });
        swal("sent succesfully");
      })
      .catch(res => {
        this.setState({ loading_activate: false, email_sent: 0 });
        swal("sent failed");
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

  changeHandler1 = event => {
    // this.setState({ [event.target.name]: event.target.value });
    // if (event.target.name == "confirm_password") {
    //   this.is_password_match(event.target.value);
    // }
    // if (event.target.name == "username") {
    //   this.is_username_present(event.target.value);
    // }
    console.log(event.target.value)
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
    } else {
      const result = email_regex(data.username);
      if (result === false) {
        this.setState({
          username_error: "Not a valid email"
        });
        any_error = true;
      }
    }
    if (data.Business_name == "") {
      this.setState({ bname_error: "*Enter your Company name" });
      any_error = true;
    }
    if (data.country == "") {
      this.setState({ city_error: "*Enter your Country name" });
      any_error = true;
    }
    if (data.phone_no == "") {
      this.setState({ phone_error: "*Enter your Phone No." });
      any_error = true;
    } else {
      const result = phone_regex(data.phone_no);
      if (result === false) {
        this.setState({
          phone_error: "Not a valid Phone no."
        });
        any_error = true;
      }
    }
    if (data.password == "") {
      this.setState({ password_error: "*password can not be empty" });
      any_error = true;
    } else {
      const result = password_regex(data.password);
      console.log("password result", result);
      if (result !== true) {
        this.setState({
          password_error: result
        });
        any_error = true;
      }
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
  onSignup = () => {
    this.setState({
      isSignup: !this.state.isSignup
    });
  };
  render() {
    // if (this.state.isRegister) {
    //   return <Redirect to={"/email-confirmation/" + this.state.username} />;
    // }
    console.log("this.state", this.state.country);
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
                        <div className="warning">{this.state.fname_error}</div>
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
                        <div className="warning">{this.state.bname_error}</div>
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
                        <div className="warning">{this.state.lname_error}</div>
                      </div>
                    </MDBCol>

                    <MDBCol md="6">
                      <div className="modal_body_subheading">Country</div>
                      <div>
                        <select
                           // value={this.state.country}
                          onChange={this.changeHandler1}
                          className="modal_inputbox modal_inputbox_new"
                         name="country"
                          required
                        >
                          <option>select country</option>
                          {this.state.country.map(value=>{
                            return(
                              <option value={value.id}>{value.name}</option>
                            )
                          }) }
                          </select>
                        <div className="warning">
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
                        <div className="warning">
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
                        <div className="warning">{this.state.phone_error}</div>
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
                        <div className="warning">
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
                        <div className="warning">
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
                  {/* {this.state.show_signup_button ? ( */}

                  {this.state.show_signup_button ? (
                    <div>
                      <button
                        type="submit"
                        className="signup_btn"
                        onClick={this.onSignup}
                      >
                        Sign up
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button type="submit" className="signup_btn" disabled>
                        Sign up
                      </button>
                    </div>
                  )}

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
                    ) : !this.state.terms_condition && this.state.isSignup ? (
                      <div className="warning">
                        Please accept terms and conditions.
                      </div>
                    ) : this.state.email_sent == 1 ? (
                      <div>
                        <div className="fine">
                          Email verification link has been sent successfully.
                        </div>
                        <div className="message_normal">
                          Didn't get link?
                          <a
                            onClick={() => this.resendLink()}
                            className="for-color"
                          >
                            {" "}
                            Send again
                          </a>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
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