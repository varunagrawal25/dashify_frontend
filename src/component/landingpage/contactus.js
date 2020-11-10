import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import { add_query } from "../apis/outside_pages";
import Axios from "axios";
import email_icon from "../assets/email_icon.png";
import call_icon from "../assets/call_icon.png";
import address_icon from "../assets/address_icon.png";
import contact_fb_icon from "../assets/contact_fb_icon.png";
import contact_instagram_icon from "../assets/contact_instagram_icon.png";
import contact_linkedin_icon from "../assets/contact_linkedin_icon.png";
import contact_twitter_icon from "../assets/contact_twitter_icon.png";
import map from "../assets/map.png";
import { Button } from "reactstrap";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import Footer from "./footer";
import Navbar from "./navbar";

class ContactUs extends Component {
  state = {
    full_name: "",
    email: "",
    message: "",
    full_name_error: "",
    email_error: "",
    message_error: "",
    loading: false
  };

  componentDidMount() {
    window.scrollTo(0, 0)
}

  onSubmit = e => {
    e.preventDefault();

    let { full_name, email, message } = this.state;
    let isError = false;

    // for checking email
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    this.setState({
      full_name_error: "",
      email_error: "",
      message_error: ""
    });

    if (full_name == "") {
      this.setState({
        full_name_error: "Enter your full name"
      });
      isError = true;
    }
    if (email == "") {
      this.setState({ email_error: "Enter your email" });
      isError = true;
    } else if (reg.test(email) == false) {
      this.setState({ email_error: "Invalid email" });
      isError = true;
    }
    if (message == "") {
      this.setState({ message_error: "Enter your message" });
      isError = true;
    }

    if (!isError) {
      this.setState({ loading: true });

      const data = {
        Name: full_name,
        Your_Email: email,
        Message: message,
        Other_Data: ""
      };

      add_query(data)
        .then(res => {
          this.setState({ loading: false });
          alert("Submitted succesfully");
          console.log("contact us response", res.data);
        })
        .catch(res => {
          alert("Something went wrong");
          this.setState({ loading: false });
          console.log("contact us error", res);
        });
    }
  };
  render() {
    return (
      <div className='bluish_background'>
        <Navbar />
          <MDBContainer >
            <div className="contact_heading">Contacts us</div>
            <div id="contact_contant1_width">
              <div id="contact_contant1" className="contact_contant">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>
            </div>
            <MDBRow>
              <MDBCol md="4">
                <MDBRow>
                  <MDBCol md="4">
                    <img src={call_icon} alt="" className="contactus_icon" />
                  </MDBCol>
                  <MDBCol md="8">
                    <div className="contact_heading2">Call</div>
                    <div id="contact_contant2" className="contact_contant">
                      <div>+1 445 554 445 </div>
                      <div>+1 835 538 945</div>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCol>

              <MDBCol md="4">
                <MDBRow>
                  <MDBCol md="4">
                    <img src={email_icon} alt="" className="contactus_icon" />
                  </MDBCol>
                  <MDBCol md="8">
                    <div className="contact_heading2">Email</div>
                    <div id="contact_contant2" className="contact_contant">
                      <div>dashify@gmail.com </div>
                      <div>info-dashify@gmail.com</div>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCol>

              <MDBCol md="4">
                <MDBRow>
                  <MDBCol md="4">
                    <img src={address_icon} alt="" className="contactus_icon" />
                  </MDBCol>
                  <MDBCol md="8">
                    <div className="contact_heading2">Address</div>
                    <div id="contact_contant2" className="contact_contant">
                      455 Larkspur Dr. California Springs, CA 92926 USA
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
            <div id="contact_subhead">Reach out to us for any inquiry</div>
            <MDBRow>
              <MDBCol md="5">
                <form onSubmit={this.onSubmit}>
                  {this.state.loading ? (
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={25}
                      width={25}
                    />
                  ) : (
                    ""
                  )}
                  <div>
                    <div className="contact_heading3">Full Name</div>
                    <div>
                      <input
                        type="text"
                        className="contactus_input"
                        id="full_name"
                        value={this.state.full_name}
                        onChange={e =>
                          this.setState({ full_name: e.target.value })
                        }
                      />
                      <div className='input_error'>
                        {this.state.full_name_error}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="contact_heading3">Your email</div>
                    <div>
                      <input
                        type="text"
                        className="contactus_input"
                        id="email"
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                      />
                      <div className='input_error'>
                        {this.state.email_error}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="contact_heading3">Message</div>
                    <div>
                      <textarea
                        id="contactus_textbox"
                        value={this.state.message}
                        onChange={e =>
                          this.setState({ message: e.target.value })
                        }
                      />
                      <div className='input_error'>
                        {this.state.message_error}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Button id="contact_submit" type="submit">
                      Sumbit
                    </Button>
                  </div>
                </form>
              </MDBCol>

              <MDBCol md="7">
                <img src={map} alt="map" id="contact_map" />
              </MDBCol>
            </MDBRow>

            <div id="contact_social">
              <div>Social network</div>
              <div>
                <img
                  src={contact_linkedin_icon}
                  alt=""
                  className="social_icon"
                />
                <img
                  src={contact_twitter_icon}
                  alt=""
                  className="social_icon"
                />
                <img
                  src={contact_instagram_icon}
                  alt=""
                  className="social_icon"
                />
                <img src={contact_fb_icon} alt="" className="social_icon" />
              </div>
            </div>
          </MDBContainer>
      
        <Footer />
      </div>
    );
  }
}
export default ContactUs;
