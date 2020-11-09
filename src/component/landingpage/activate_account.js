import React, { Component } from "react";
import { MDBCol, MDBRow, MDBContainer, MDBBtn } from "mdbreact";
import Loader from "react-loader-spinner";
import { send_varification_link } from "../apis/user";

export default class Login extends Component {
  state = {
    Email: "",
    Email_error: "",
    email_sent: "",
    loading_activate: false
  };

  componentDidMount = async () => {
    window.scrollTo(0, 0)
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

  render() {
    return (
      //   <div className="modal fade" id="activate_acount" role="dialog">
      <div className="modal-dialog " id="login_width">
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
      //   </div>
    );
  }
}
