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
    name_sendto_error: {},
    sendto_name: { 0: "" },
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
      name_sendto_error,
      sendto_name,
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
      Object.values(sendto_name).map((value, i) => {
        if (value) {
          names = { ...names, [i]: value };
          send_limit = i + 1;
        } else {
          this.setState(prevState => ({
            name_sendto_error: {
              ...prevState.name_sendto_error,
              [i]: "Name can not be empty"
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
              onChange={this.customer_name_function}
              value={this.state.sendto_name[i]}
              required
            />
            <div class='err_msg'>
              {this.state.name_sendto_error[i]}
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

  // add_lname = () => {
  //   var lname = [];
  //   for (let i = 0; i < this.state.add_customer; i++) {
  //     lname.push(
  //       <input
  //           type="text"
  //           className="form-control mt-30"
  //           placeholder="Enter last name"
  //           name={i}
  //           onChange={this.customer_phone_function}
  //           value={this.state.sendto_contact[i]}
  //           required
  //         />
  //     );
  //   }
  //   console.log(lname);
  //   return lname;
  // };

  add_phone = () => {
    var phone = [];
    for (let i = 0; i < this.state.add_customer; i++) {
      phone.push(
        <div>
          <div className="col-md-12 mb-30">
            <input
              type="number"
              className="form-control"
              placeholder="8102232456"
              name={i}
              onChange={this.customer_contact_function}
              value={this.state.sendto_contact[i]}
              required
            />
            <div class='err_msg'>
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
            <div class='err_msg'>
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

  customer_name_function = event => {
    event.persist();

    this.setState(prevState => ({
      name_sendto_error: {
        ...prevState.name_sendto_error,
        [event.target.name]: ""
      }
    }));

    this.setState(prevState => ({
      sendto_name: {
        ...prevState.sendto_name,
        [event.target.name]: event.target.value
      }
    }));
    console.log("state", this.state);
  };

  add_customer_function = event => {
    event.preventDefault();
    console.log("add customer button clicked");

    this.setState(prevState => ({
      sendto_name: {
        ...prevState.sendto_name,
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
      name_sendto_error,
      sendto_name,
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
                      <a href="#">Step 02</a>
                    </li>
                  </ul>
                  <div className="ratingemail">
                    <h2>
                      Ratings Email And SMS
                      <a className="close-section">
                        <i className="zmdi zmdi-close"></i>Close Section
                      </a>
                    </h2>
                  </div>

                  <div className="formbox">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>From Email</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="mohit.chack@digimonk.in"
                            readonly
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Customer Name</label>
                          {this.add_fname()}
                        </div>
                      </div>

                      {/* <div className="col-md-6">
                        <div className="form-group">
                          <label>Customer last name</label>
                          {this.add_lname()}
                        </div>
                      </div> */}

                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Customer Email</label>
                          {this.add_email()}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Customer Phone number</label>
                          {this.add_phone()}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <button
                            onClick={this.add_customer_function}
                            className="add_btn"
                          >
                            <img src={require("../images/plus.png")} /> Add
                            another Customer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="step2 topspace">
                  <div className="formbox">
                    <div className="d-flex">
                      <div className="csv">
                        <img src={require("../images/csv.png")} alt="csv" />
                      </div>
                      <div className="csv-text">
                        <h3>
                          Uploading Your CSV containing Customer Email/ Phone
                          Numbers
                        </h3>

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

                <div className="step2 mt-30">
                  <div className="formbox">
                    <div className="row">
                      {loading ? (
                        <div style={{ textAlign: "center" }}>
                          <Loader
                            type="Oval"
                            color="#00BFFF"
                            height={25}
                            width={25}
                            // timeout={3000} //3 secs
                          />
                        </div>
                      ) : (
                        <div style={{ color: "red", textAlign: "center" }}>
                          {wrong}
                        </div>
                      )}
                      <div className="col-md-6">
                        <button className="gen_btn">
                          Create a new review generation
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button type="submit" className="lunch_btn">
                          Launch Campaign
                        </button>
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
