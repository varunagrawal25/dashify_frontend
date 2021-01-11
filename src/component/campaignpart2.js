import React, { Component } from "react";
import Loader from "react-loader-spinner";
import Axios from "axios";
import swal from "sweetalert";

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
    loading: false,
    CustomerLoop:[1],

    FinalCustomers:[{}]
  };

  componentDidMount = () => {
    //console.log("promotional data", this.props.location.state);
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
                    swal("Sent succesfully");
                  } else {
                    swal("Server error");
                  }
                  this.setState({ loading: false });
                })
                .catch(resp => {
                  console.log("email sending error", resp);
                  swal("Server error");
                  this.setState({ loading: false });
                });
            } else {
              swal("Server error");
              this.setState({ loading: false });
            }
          })
          .catch(resp => {
            console.log("email adding error", resp);
            swal("Server error");
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
            <div class='err_msg'>
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
            {/* <div class='err_msg'>
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
    this.setState({FinalCustomers:this.state.FinalCustomers.concat({})})


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

  removeCustomer =(i)=>e=>{
    console.log(i);
    var a= this.state.FinalCustomers;
    delete a[i]
    this.setState({FinalCustomers:a})

  }

  AddCustomer =(index,type)=>e=>{
    console.log(index, e.target.value);

    var old = this.state.FinalCustomers;
    var newd={}
    if(type === "first"){

      var middle={
        "fname":e.target.value
     
    }
    console.log(newd)

    Object.assign(newd, old[index], middle);
    console.log(newd)
    old[index]=newd;
    console.log("old",old)

   
   

  }
  else if(type === "last"){

    var middle={
      "lname":e.target.value
   
  }
  console.log(newd)

  Object.assign(newd, old[index], middle);
  console.log(newd)
  old[index]=newd;
  console.log("old",old)

  }

  else if (type=== "email"){

    var middle={
      "email":e.target.value
   
  }
  console.log(newd)

  Object.assign(newd, old[index], middle);
  console.log(newd)
  old[index]=newd;
  console.log("old",old)

  }
  else if (type=== "phone"){

    var middle={
      "phone":e.target.value
   
  }
  console.log(newd)

  Object.assign(newd, old[index], middle);
  console.log(newd)
  old[index]=newd;
  console.log("old",old)

  }
  


  this.setState({FinalCustomers:old})
   
   

   

  }
  

  render() {
    console.log(this.state)
    console.log("props",this.props);
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
      loading,
      CustomerLoop,
      FinalCustomers
    } = this.state;


    var l;
    l=FinalCustomers.map( (r,index)=>{

      return  <div style={{background:'#fff' , marginBottom:'20px'}}>
        <div className="formbox"> 
       <button onClick={this.removeCustomer(index)} className='campaignClose'> x</button>
                    <div className="row">
                   
                        <div className="col-md-6 camp_margin1">
                          <div >
                          <div className='camp_subhead1'>Customer First Name</div>
                          <input
                            type="text"
                            className="form-control"
                           placeholder="Enter first name"
                            onChange={this.AddCustomer(index,"first")}
                          />
                          </div>
                        </div>
                        <div className="col-md-6 camp_margin1">
                          <div >
                          <div className='camp_subhead1'>Customer Last Name</div>
                          <input
                            type="text"
                            className="form-control"
                            
                            onChange={this.AddCustomer(index,"last")}
                          />
                          </div>
                        </div>
                    
                        <div className="col-md-6 camp_margin2">
                          <div>
                          <div className='camp_subhead1'>Customer Email </div>
                          <input
                            type="text"
                            className="form-control"
                           
                            onChange={this.AddCustomer(index,"email")}
                          />
                          </div>
                        </div>
                        <div className="col-md-6 camp_margin2">
                          <div>
                          <div className='camp_subhead1'> Phone Number</div>
                          <input
                            type="text"
                            className="form-control"
                           
                            onChange={this.AddCustomer(index,"phone")}
                          />
                          </div>
                        </div>
                      
                    </div>
                  </div>
</div>
})

    return (
      <div>
        <div className="main_content">
          <form
            className="needs-validation"
            onSubmit={this.submitHandler}
            noValidate
          >
            <div className="rightside_title">
              <h1>Enter Campaign Details</h1>
            </div>
            <div className="row" >
              <div className="col-md-8">
                <div className="step2"  style={{borderRadius:'15px 15px 0px 0px',boxShadow:'none'}}>
                  <ul>
                    <li>
                      <div className="step-sms">
                        <a href="#">Step 02</a>
                        <span>Rating Email And SMS Template</span>
                      </div>
                      <div className="closebox" onClick ={this.props.step_2_1}>
                        <i className="zmdi zmdi-close"></i> Close Section
                      </div>
                    </li>
                  </ul>
                  </div>
                  <div>
                  <div > 
{l}
<div className='add_another_back'>
<div className="col-md-5 offset-md-7 " style={{marginTop:'30px',paddingRight:'0px',paddingLeft:'47px'}}>
                          <button onClick={this.add_customer_function} className="add_button">
                            Add Another Customer
                          </button>
                      </div>
</div>

</div>
  </div>

                    <div className="row" style={{marginTop:'40px'}}>
                   
                      <div className="col-md-6 ">
                        <button className="gen_btn" >
                          Create A New Review Generation
                        </button>
                      </div>
                      <div className="col-md-5" style={{ textAlign: "center" ,paddingRight:'8px'}}>
                        {loading ? (
                          <Loader
                            type="Oval"
                            color="#00BFFF"
                            height={25}
                            width={25}
                            // timeout={3000} //3 secs
                          />
                        ) : (
                          <div class='err_msg'>{wrong}</div>
                        )}
                        <button type="submit" className="lunch_btn">
                          Launch Campaign
                        </button>
                      </div>
                    </div>
                  
              </div>
              <div className="col-md-4">
                <div className="step2 ">
                  <div className="formbox">
                    <div className="design-ui">
                        Upload Your CSV containing Customer Email / Phone
                        Numbers
                      <div className="camp_csv">
                        <img src={require("./assets/csv.png")} alt="csv" />
                      </div>
                      <div >
                        <button className="download_btn">
                          Download Simple
                        </button>
                      </div>
                      <div className="uploadbox">
                          <button className="upload_btn">Upload CSV</button>
                          <input type="file" />
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
