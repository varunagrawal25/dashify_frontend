import React, { Component } from "react";
import Loader from "react-loader-spinner";
import Axios from "axios";

const DjangoConfig = {
  headers: {
    Authorization: "Token " + localStorage.getItem("UserToken")
  }
};

export default class CampaignPart2 extends Component {
  state = {
    email_sendto_error: {},
    contact_sendto_error: {},
    fname_sendto_error: {},
    sendto_fname: { 0: "" },
    sendto_lname: { 0: "" },
    sendto_email: { 0: "" },
    sendto_contact: { 0: "" },
    add_customer: 1,
    wrong: "",
    loading: false
  };

  componentDidMount = () => {
    console.log("promotional data", this.props.location.state);
  };

  submitHandler = event => {
    event.preventDefault();

    var {
      email_sendto_error,
      contact_sendto_error,
      fname_sendto_error,
      sendto_fname,
      sendto_lname,
      sendto_email,
      sendto_contact
    } = this.state;

    this.setState({ wrong: "" });

    let isError = false;

    if (JSON.stringify(email_sendto_error).includes("Invalid Email")) {
      isError = true;
    } else if (
      JSON.stringify(contact_sendto_error).includes("Invalid Phone No.")
    ) {
      isError = true;
    }

    if (!isError) {
      var emails,
        names,
        contact,
        send_limit = 0;

      Object.values(sendto_email).map((value, i) => {
        if (value) {
          emails = { ...emails, [i]: value };
        } else {
          this.setState(prevState => ({
            email_sendto_error: {
              ...prevState.email_sendto_error,
              [i]: "Email can not be empty"
            }
          }));
          isError = true;
        }
      });
      Object.values(sendto_fname).map((value, i) => {
        if (value) {
          names = { ...names, [i]: value + " " + sendto_lname[i] };
          send_limit = i + 1;
        } else {
          this.setState(prevState => ({
            fname_sendto_error: {
              ...prevState.fname_sendto_error,
              [i]: "First name can not be empty"
            }
          }));
          isError = true;
        }
      });

      Object.values(sendto_contact).map((value, i) => {
        if (value) {
          contact = { ...contact, [i]: value };
        } else {
          this.setState(prevState => ({
            contact_sendto_error: {
              ...prevState.contact_sendto_error,
              [i]: "Phone No. can not be empty"
            }
          }));
          isError = true;
        }
      });

      if (!isError) {
        const email_adding_data = {
          camp_id: this.props.match.params.campaign_id,
          emails,
          names,
          contact
        };
        this.setState({ loading: true });

        Axios.post(
          "https://cors-anywhere.herokuapp.com/http://dashify.biz/api/campaign/add-emails-in-campaign",
          email_adding_data,
          DjangoConfig
        )
          .then(resp => {
            if (resp.data.messgae == "Email add in database successfully.") {
              const data = {
                camp_id: this.props.match.params.campaign_id,
                send_limit
              };
              Axios.post(
                "https://cors-anywhere.herokuapp.com/http://dashify.biz/api/campaign/send-emaills",
                data,
                DjangoConfig
              )
                .then(resp => {
                  if (resp.data.messgae == "Send All Email.") {
                    alert("Sent succesfully");
                  } else {
                    alert("Server error");
                  }
                  this.setState({ loading: false });
                })
                .catch(resp => {
                  console.log("email sending error", resp);
                  alert("Server error");
                  this.setState({ loading: false });
                });
            } else {
              alert("Server error");
              this.setState({ loading: false });
            }
          })
          .catch(resp => {
            console.log("email adding error", resp);
            alert("Server error");
            this.setState({ loading: false });
          });
      } else {
        this.setState({ wrong: "Remove above errors" });
      }
    } else {
      this.setState({ wrong: "Remove above errors" });
    }
  };

  changeHandler = event => {
    console.log("states", this.state);
    this.setState({ [event.target.name]: event.target.value });
  };

  // check_email_or_phone = event => {
  //   let email_error = false;
  //   let phone_error = false;

  //   this.setState({ email_replyto_error: "" });

  //   this.setState({ [event.target.name]: event.target.value });

  //   var email = event.target.value,
  //     emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  //   if (!emailReg.test(email) || email == "") {
  //     email_error = true;
  //   }

  //   //validate phone
  //   var phone = event.target.value,
  //     intRegex = /[0-9 -()+]+$/;
  //   if (phone.length < 6 || !intRegex.test(phone)) {
  //     phone_error = true;
  //   }
  //   if (phone_error && email_error) {
  //     this.setState({ email_replyto_error: "Invalid email / Phone No." });
  //   }

  //   console.log(
  //     "email_error phone_error email_replyto",
  //     email_error,
  //     phone_error,
  //     event.target.value
  //   );
  // };

  add_fname = () => {
    var fname = [];
    for (let i = 0; i < this.state.add_customer; i++) {
      fname.push(
        <div>
          <div className="col-md-12 mb-30">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name={i}
              onChange={this.customer_fname_function}
              value={this.state.sendto_fname[i]}
              required
            />
            <div style={{ color: "red" }}>
              {this.state.fname_sendto_error[i]}
            </div>
          </div>
          {/* <div className="col-md-2">
            <button onClick="" className="btn">
              Cancel
            </button>
          </div> */}
        </div>
      );
    }
    console.log(fname);
    return fname;
  };

  add_lname = () => {
    var lname = [];
    for (let i = 0; i < this.state.add_customer; i++) {
      lname.push(
        <div>
          <div className="col-md-12 mb-30">
            <input
              type="text"
              className="form-control"
              placeholder="Enter last name"
              name={i}
              onChange={this.customer_lname_function}
              value={this.state.sendto_lname[i]}
              required
            />
            {/* <div style={{ color: "red" }}>
              {this.state.lname_sendto_error[i]}
            </div> */}
          </div>
          {/* <div className="col-md-2">
            <button onClick="" className="btn">
              Cancel
            </button>
          </div> */}
        </div>
      );
    }
    console.log(lname);
    return lname;
  };

  add_phone = () => {
    var phone = [];
    for (let i = 0; i < this.state.add_customer; i++) {
      phone.push(
        <div>
          <div className="col-md-12 mb-30">
            <input
              type="number"
              className="form-control"
              placeholder="Enter mobile no."
              name={i}
              onChange={this.customer_contact_function}
              value={this.state.sendto_contact[i]}
              required
            />
            <div style={{ color: "red" }}>
              {this.state.contact_sendto_error[i]}
            </div>
          </div>
          {/* <div className="col-md-2">
            <button onClick="" className="btn">
              Cancel
            </button>
          </div> */}
        </div>
      );
    }

    console.log(phone);
    return phone;
  };

  add_email = () => {
    var email = [];
    for (let i = 0; i < this.state.add_customer; i++) {
      email.push(
        <div>
          <div className="col-md-12 mb-30">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email Address"
              name={i}
              onChange={this.customer_email_function}
              value={this.state.sendto_email[i]}
              required
            />
            <div style={{ color: "red" }}>
              {this.state.email_sendto_error[i]}
            </div>
          </div>
          {/* <div className="col-md-2">
            <button onClick="" className="btn">
              Cancel
            </button>
          </div> */}
        </div>
      );
    }
    console.log(email);
    return email;
  };

  customer_email_function = event => {
    event.persist();

    this.setState(prevState => ({
      email_sendto_error: {
        ...prevState.email_sendto_error,
        [event.target.name]: ""
      }
    }));

    var email = event.target.value,
      emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email) || email == "") {
      this.setState(prevState => ({
        email_sendto_error: {
          ...prevState.email_sendto_error,
          [event.target.name]: "Invalid Email"
        }
      }));
    }

    this.setState(prevState => ({
      sendto_email: {
        ...prevState.sendto_email,
        [event.target.name]: event.target.value
      }
    }));
    console.log("state", this.state);
  };

  customer_contact_function = event => {
    event.persist();

    this.setState(prevState => ({
      contact_sendto_error: {
        ...prevState.contact_sendto_error,
        [event.target.name]: ""
      }
    }));

    var contact = event.target.value;
    // intRegex = /[0-9 -()+]+$/;
    if (contact.length != 10) {
      this.setState(prevState => ({
        contact_sendto_error: {
          ...prevState.contact_sendto_error,
          [event.target.name]: "Invalid Phone No."
        }
      }));
    }

    this.setState(prevState => ({
      sendto_contact: {
        ...prevState.sendto_contact,
        [event.target.name]: event.target.value
      }
    }));
    console.log("state", this.state);
  };

  customer_fname_function = event => {
    event.persist();

    this.setState(prevState => ({
      fname_sendto_error: {
        ...prevState.fname_sendto_error,
        [event.target.name]: ""
      }
    }));

    this.setState(prevState => ({
      sendto_fname: {
        ...prevState.sendto_fname,
        [event.target.name]: event.target.value
      }
    }));
    console.log("state", this.state);
  };

  customer_lname_function = event => {
    event.persist();

    // this.setState(prevState => ({
    //   lname_sendto_error: {
    //     ...prevState.lname_sendto_error,
    //     [event.target.name]: ""
    //   }
    // }));

    this.setState(prevState => ({
      sendto_lname: {
        ...prevState.sendto_lname,
        [event.target.name]: event.target.value
      }
    }));
    console.log("state", this.state);
  };

  add_customer_function = event => {
    event.preventDefault();
    console.log("add customer button clicked");

    this.setState(prevState => ({
      sendto_fname: {
        ...prevState.sendto_fname,
        [this.state.add_customer]: ""
      }
    }));
    this.setState(prevState => ({
      sendto_lname: {
        ...prevState.sendto_lname,
        [this.state.add_customer]: ""
      }
    }));
    this.setState(prevState => ({
      sendto_contact: {
        ...prevState.sendto_contact,
        [this.state.add_customer]: ""
      }
    }));
    this.setState(prevState => ({
      sendto_email: {
        ...prevState.sendto_email,
        [this.state.add_customer]: ""
      }
    }));

    this.setState({ add_customer: this.state.add_customer + 1 });
  };

  render() {
    const {
      campaign_name,
      email_sendto_error,
      contact_sendto_error,
      fname_sendto_error,
      sendto_fname,
      sendto_lname,
      sendto_email,
      add_customer,
      wrong,
      loading
    } = this.state;

    return (
      <div>
        <div className="main_content">
          <form
            className="needs-validation"
            onSubmit={this.submitHandler}
            noValidate
          >
            <div className="rightside_title">
              <h1>Enter campaign details</h1>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="step2">
                  <ul>
                    <li>
                      <div className="step-sms">
                        <a href="#">Step 02</a>
                        <span>Ralting Email And SMS template</span>
                      </div>
                      <div className="closebox">
                        <i className="zmdi zmdi-close"></i> Close section
                      </div>
                    </li>
                  </ul>

                  <div className="formbox">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>From Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value="mohit.chack@digimonk.in"
                            readonly
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Customer first name</label>
                            {this.add_fname()}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Customer last name</label>
                            {this.add_lname()}
                          </div>
                        </div>
                      </div>

                      {/* <div className="col-md-12">
                        <div className="form-group">
                          <label>Customer Email/Phone number</label> */}

                      <div className="col-md-12">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Customer Email</label>
                            {this.add_email()}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Customer Phone number</label>
                            {this.add_phone()}
                          </div>
                        </div>
                      </div>
                      {/* </div>
                      </div> */}
                      <div className="col-md-12">
                        <div className="form-group text-right">
                          <button
                            onClick={this.add_customer_function}
                            className="add_button"
                          >
                            Add another Customer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-30">
                  <div className="">
                    <div className="row">
                      <div className="col-md-5 col-md-offset-1">
                        <button className="gen_btn">
                          Create a new review generation
                        </button>
                      </div>
                      <div className="col-md-5" style={{ textAlign: "center" }}>
                        {loading ? (
                          <Loader
                            type="Oval"
                            color="#00BFFF"
                            height={25}
                            width={25}
                            // timeout={3000} //3 secs
                          />
                        ) : (
                          <div style={{ color: "red" }}>{wrong}</div>
                        )}
                        <button type="submit" className="lunch_btn">
                          Launch Campaign
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="step2 topspace">
                  <div className="formbox">
                    <div className="design-ui">
                      <h3>
                        Upload Your CSV containing Customer Email / Phone
                        Numbers
                      </h3>
                      <div className="csv">
                        <img src={require("../images/csv.png")} alt="csv" />
                      </div>
                      <div className="csv-text">
                        <button className="download_btn">
                          Download Simple
                        </button>
                        <div className="uploadbox">
                          <button className="upload_btn">Upload CSV</button>
                          <input type="file" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
