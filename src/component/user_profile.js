import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import {
  get_login_user_info,
  update_user_info,
  update_user_image
} from "./apis/user";
import { all_location } from "./apis/location";
import Loader from "react-loader-spinner";
import user_img_def from "./assets/user_img.png";
import insta from "./assets/instagram.png";
import fb from "./assets/fb.png";
import twitter from "./assets/tw.png";
import snap from "./assets/snap.png";
import paypal from "./assets/paypal.png";
import mastercard from "./assets/mastercard.png";
import edit from "./assets/edit.png";
import Map from "./Map";
import Cropper from "./utils/cropper1";
import { url_regex, phone_regex } from "./utils/regularexpressions";
import { secure_pin } from "../config";
import swal from "sweetalert";

const DjangoConfig = {
  headers: {
    Authorization: "Token " + localStorage.getItem("UserToken")
  }
};

export default class User_profile extends Component {
  state = {
    users_login: {},
    edit_details: false,
    first_name: "",
    last_name: "",
    Company_name: "",
    address: "",
    phone_no: "",
    website: "",
    user_image: "",
    show_crop_function: false,
    loading_info: true,
    loading_image: true,

    //error
    first_name_error: "",
    Company_name_error: "",
    address_error: "",
    phone_no_error: "",
    website_error: "",

    // cropper
    src: null,
    crop: {
      unit: "%",
      width: 30,
      aspect: 1 / 1
    }
  };

  componentDidMount = () => {
    let data = { user_id: localStorage.getItem("UserId") ,secure_pin};
    get_login_user_info(data)
      .then(res => {
        console.log("user info0", res.data);
        console.log("user info img", res.data.users_login[0].profile_image);
        if (res.data &&  res.data.users_login) {
          this.setState({
            users_login: res.data.users_login,
            first_name: res.data.users_login[0].first_name,
            last_name: res.data.users_login[0].last_name,
            Company_name: res.data.users_login[0].company,
            address: res.data.users_login[0].address,
            phone_no: res.data.users_login[0].phone_no,
            website: res.data.users_login[0].website,
            user_image: res.data.users_login[0].profile_image,
            loading_info: false,
            loading_image: false
            
          });
          console.log("statr value",this.state)
        } else {
          this.setState({ loading_info: false, loading_image: false });
        }
      })
      .catch(err => {
        console.log("user info err", err);
        this.setState({ loading_info: false, loading_image: false });
      });
  };

  changeHandler = event => {
    console.log("states", this.state);
    this.setState({ [event.target.name]: event.target.value });
  };

  submitUserDetails = async event => {
    console.log("this.state", this.state);
    event.preventDefault();

    var {
      users_login,
      first_name,
      last_name,
      Company_name,
      address,
      phone_no,
      website
    } = this.state;
    // {"secure_pin":"digimonk","user_id":"10","first_name":"ramggh222222","last_name":"gautam ram",
    // "phone_no":"111231231","website":"digimonk.in","address":"Gwalior India"}
    const data = {
      // username: users_login[0].user ? users_login[0].user.username : "",
      user_id:localStorage.getItem("UserId") ,
      first_name,
      last_name,
      // Company_name,
      address,
      phone_no,
      website,
      secure_pin
    };
console.log("data888",data)
    let error_present = await this.errorValue(data);

    if (!error_present) {
      this.setState({ loading_info: true });
      update_user_info(data)
        .then(response => {
          console.log("response78",response)
          let data2 = { user_id: localStorage.getItem("UserId") ,secure_pin};

          get_login_user_info(data2)
            .then(res => {
              console.log("user info", res.data);
              if (res.data && res.data.users_login) {
                this.setState({
                  users_login: res.data.users_login,
                  edit_details: false,
                  loading_info: false
                });
              } else {
                console.log("err78")
                this.setState({ edit_details: false, loading_info: false });
                swal("try again");
              }
            })
            .catch(err => {
              this.setState({ edit_details: false, loading_info: false });
              swal("try again");
            });
          // window.location.reload(false);
        })
        .catch(res => {
          this.setState({ edit_details: false, loading_info: false });
          swal("try again");
        });
    }
  };

  errorValue = data => {
    this.setState({
      first_name_error: "",
      Company_name_error: "",
      address_error: "",
      phone_no_error: "",
      website_error: ""
    });

    let error_present = false;

    if (data.first_name == "") {
      this.setState({ first_name_error: "*First name can not be empty" });
      error_present = true;
    }
    if (data.Company_name == "") {
      this.setState({ Company_name_error: "*Company name can not be empty" });
      error_present = true;
    }
    if (data.address == "") {
      this.setState({ address_error: "*Address can not be empty" });
      error_present = true;
    }
    if (data.phone_no) {
      const result = phone_regex(data.phone_no);
      if (result === false) {
        this.setState({
          phone_no_error: "Not a valid phone_no No."
        });
        error_present = true;
      }
    }
    if (data.website) {
      const result = url_regex(data.website);
      if (result == null) {
        this.setState({
          website_error: "Not a valid website"
        });
        error_present = true;
      }
    }
    return error_present;
  };

  uploadUserImage = image => {
    let { users_login } = this.state;

    console.log("image", image);

    this.setState({ loading_image: true });
    const data = {
      // username: users_login[0].user ? users_login[0].user.username : "",
      secure_pin,
      user_id: localStorage.getItem("UserId") ,
      profile_image: image
    };
console.log("imgdata",data)
    update_user_image(data)
      .then(response => {
        console.log("getting image0", response)
        let data2 = { user_id: localStorage.getItem("UserId") ,secure_pin};
        get_login_user_info(data2)
          .then(res => {
            console.log("ll88",res)
            if (res.data) {
              console.log("getting image", res.data.users_login[0].profile_image);
              this.setState({
                user_image: res.data.users_login[0].profile_image,
                loading_image: false,
                show_crop_function: false
              });
              console.log("getting image1", this.state.user_image)
              // window.location.reload(false)
            } else {
              this.setState({
                loading_image: false,
                show_crop_function: false
              });
              swal("try again0");
            }
          })
          .catch(err => {
            this.setState({ loading_image: false, show_crop_function: false });
            swal("try again1");
          });
      })
      .catch(res => {
        this.setState({ loading_image: false, show_crop_function: false });
        swal("try again2");
      });
  };

  show_crop_function = () => {
    this.setState({
      show_crop_function: true
    });
  };

  render() {
    console.log("image done",this.state.user_image)
    const {
      users_login,
      edit_details,
      first_name,
      last_name,
      Company_name,
      address,
      phone_no,
      website,
      user_image,

      //error
      first_name_error,
      Company_name_error,
      address_error,
      phone_no_error,
      website_error,

      loading_info,
      loading_image
    } = this.state;
    return (
      <div>
        <MDBContainer>
          <div className="setting-10">
            <h3>User Profile</h3>
          </div>
          <MDBRow className="user_container">
            <MDBCol md="3">
              {loading_image ? (
                <div style={{ textAlign: "center" }}>
                  <Loader
                    type="Oval"
                    color="#00BFFF"
                    height={30}
                    width={30}
                    // timeout={3000} //3 secs
                  />
                </div>
              ) : this.state.show_crop_function ? (
                <i class="fas fa-upload" style={{fontSize:'30px',color: '#4f4f4f'}}>
                <Cropper uploadUserImage={this.uploadUserImage} />
                </i>
              ) : (
                <div>
                  <img
                    src={
                      user_image
                        ? "https://dashify.biz/Api/assets/upload/images/profile-type-image/" + user_image
                        : user_img_def
                    }
                    alt="user"
                    id="user_img"
                  />
                  <div className="get-image">
                    <img
                      src={edit}
                      alt=""
                      style={{ height: "20px", width: "20px" }}
                      onClick={this.show_crop_function}
                    />
                    {/* <input type="file" onChange={this.show_crop_function} /> */}
                  </div>
                </div>
              )}
            </MDBCol>
            <MDBCol md="6">
              {loading_info ? (
                <div style={{ textAlign: "center" }}>
                  <Loader
                    type="Oval"
                    color="#00BFFF"
                    height={30}
                    width={30}
                    // timeout={3000} //3 secs
                  />
                </div>
              ) : edit_details ? (
                
                <div>
               <MDBRow>
                  <MDBCol md='6'>
                  <div className="user1">
                    {" "}
                    <input
                      type="text"
                      name="first_name"
                      value={first_name}
                      onChange={this.changeHandler}
                      placeholder="First name"
                      className="user_edit_input_name"
                    />
                    <div className="error" class='err_msg_user'>
                      {first_name_error}
                    </div>
                    </div>
                    
                  </MDBCol>
                  <MDBCol md='6'>
                  <div className="user1">
                    <input
                      type="text"
                      name="last_name"
                      value={last_name}
                      onChange={this.changeHandler}
                      placeholder="Last name"
                      className="user_edit_input_name"
                    />
                  </div>
                  </MDBCol>
                </MDBRow>
                 
                  <form
                        className="needs-validation"
                        onSubmit={this.submitUserDetails}
                        noValidate
                      >
                  <MDBRow className='user_rowspace'>
                    <MDBCol md="4">
                      <div className="user2">Company Name</div>
                      </MDBCol>
                      <MDBCol md="8">
                    
                    <div className="user3">
                      <input
                        type="text"
                        name="Company_name"
                        value={Company_name}
                        onChange={this.changeHandler}
                        className="user_edit_input"
                        placeholder="Edit company name"
                      />
                      
                    </div>

                    <div className="error" class='err_msg_user'>
                        {Company_name_error}
                      </div>
                </MDBCol>
                      </MDBRow>
                      <MDBRow className='user_rowspace'>
                      <MDBCol md="4">
                      <div className="user2">Phone No.</div>
                      </MDBCol>
                      <MDBCol md="8">
                   
                    <div className="user3">
                      <input
                        type="text"
                        name="phone_no"
                        value={phone_no}
                        onChange={this.changeHandler}
                        className="user_edit_input"
                        placeholder="Edit phone no."
                      />
                      
                    </div>
                    <div className="error" class='err_msg_user'>
                        {phone_no_error}
                      </div>
                </MDBCol>
                      </MDBRow>
                      <MDBRow className='user_rowspace'>
                      <MDBCol md="4">
                      <div className="user2">Website</div>
                      </MDBCol>
                      <MDBCol md="8">
                    <div className="user3">
                      <input
                        type="text"
                        name="website"
                        value={website}
                        onChange={this.changeHandler}
                        className="user_edit_input"
                        placeholder="Edit website"
                      />
                     
                    </div>
                    <div className="error" class='err_msg_user'>
                        {website_error}
                      </div>
                </MDBCol>
                      </MDBRow>
                      <MDBRow className='user_rowspace'>
                      <MDBCol md="4">
                      <div className="user2">Address</div>
                    </MDBCol>
                    <MDBCol md="8">
                    <div className="user3">
                      <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={this.changeHandler}
                        className="user_edit_input"
                        placeholder="Edit address"
                      />
                      
                    </div>
                    <div className="error" class='err_msg_user'>
                        {address_error}
                      </div>
                  
                </MDBCol>
                   
                  </MDBRow>
                  <div style={{marginLeft:'54%'}}>
                  <button type="submit" className="user_btn">
                      Submit
                    </button>
                    <button
                      className="user_btn"
                      onClick={() => this.setState({ edit_details: false })}
                     
                    >
                      {" "}
                      Cancel
                    </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  <div className="user1">
                    {first_name} {last_name}
                  </div>
                  <MDBRow>
                    <MDBCol md="4" >
                      <div className="user2">Company Name</div>
                    </MDBCol>
                    <MDBCol md="8">
                      {Company_name ? (
                        <div className="user3_new">{Company_name}</div>
                      ) : (
                        <div className="user_blank"></div>
                      )}    
                    </MDBCol>
                    </MDBRow>
                    <MDBRow>                   
                     <MDBCol md="4">
                      <div className="user2">Phone No.</div>
                    </MDBCol>
                    <MDBCol md="8">
                      {phone_no ? (
                        <div className="user3_new">{phone_no}</div>
                      ) : (
                        <div className="user_blank"></div>
                      )}      
                    </MDBCol>
                    </MDBRow>
                    <MDBRow>
                    <MDBCol md="4">
                      <div className="user2">Website</div>
                    </MDBCol>
                    <MDBCol md="8">
                      {website ? (
                        <div className="user3_new">{website}</div>
                      ) : (
                        <div className="user_blank"></div>
                      )}      
                    </MDBCol>
                    </MDBRow>
                    <MDBRow>
                    <MDBCol md="4">
                      <div className="user2">Address</div>
                    </MDBCol>
                    <MDBCol md="8">
                      {address ? (
                        <div className="user3_new">{address}</div>
                      ) : (
                        <div className="user_blank"></div>
                      )}      
                    </MDBCol>
                  </MDBRow>
                  <div className="get-image">
                    <img
                      src={edit}
                      alt="edit"
                      onClick={() => this.setState({ edit_details: true })}
                      style={{ height: "20px", width: "20px" }}
                    />
                  </div>
                </div>
              )}
            </MDBCol>
            <MDBCol md="3">
              {/* <img src={map} alt="user" id="user_map" /> */}
              <Map />
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol md="3" className="user_container1">
              <MDBRow>
                <MDBCol className="user2" md="7">
                  Social Network
                </MDBCol>
                <MDBCol md="5">
                  <MDBBtn id="user_add">+ Add</MDBBtn>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="4">
                  <img src={twitter} alt="icon" className="user_profile_icon" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBBtn className="user_connected_btn">Connected</MDBBtn>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="4">
                  <img src={fb} alt="icon" className="user_profile_icon" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBBtn className="user_disconnected_btn">
                    Disconnected
                  </MDBBtn>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="4">
                  <img src={insta} alt="icon" className="user_profile_icon" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBBtn className="user_connected_btn">Connected</MDBBtn>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="4">
                  <img src={snap} alt="icon" className="user_profile_icon" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBBtn className="user_connected_btn">Connected</MDBBtn>
                </MDBCol>
              </MDBRow>
              <div id="user11">
                By clicking any on this social icon you will directly redirect
                to his/her social Profile
              </div>
            </MDBCol>

            <MDBCol md="9">
              <div
                className="user_container1 "
                style={{ marginRight: "-10px" }}
              >
                <MDBRow>
                  <MDBCol md="3" id="user7">
                    Subscription
                  </MDBCol>
                  <MDBCol md="6" className="user12">
                    Premium Monthly
                  </MDBCol>
                  <MDBCol md="3">
                    <MDBBtn id="user_save">Save</MDBBtn>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="3" id="user_payment_container">
                    <div id="user6">$8</div>
                    <div className="user8">Month</div>
                    <div className="user9">Per Location</div>
                    <div className="user9">Billed Monthly</div>
                  </MDBCol>
                  <MDBCol md="7" id="user10">
                    <div>
                      <span className="user4">Start Date: </span>
                      <span className="user5">30 Jan 2020</span>
                    </div>

                    <div>
                      <span className="user4">Valid Till: </span>
                      <span className="user5">30 Jan 2020</span>
                    </div>

                    <div>
                      <span className="user4">Min. Commitemnt:</span>
                      <span className="user5"> 60 Loсation / Monthly </span>
                    </div>

                    <div>
                      <span className="user4">Currently added: </span>
                      <span className="user5">637 Locations </span>
                    </div>

                    <div>
                      <span className="user4">Next Billing amount: </span>
                      <span className="user5">$5103. 94 On 29 Feb 2020 </span>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="5">
                    <img src={mastercard} />{" "}
                  </MDBCol>
                  <MDBCol md="5">
                    <img src={paypal} />
                  </MDBCol>
                  <MDBCol md="2">
                    <MDBBtn className="add_more">+</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
