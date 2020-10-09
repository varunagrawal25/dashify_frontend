import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import {
  get_login_user_info,
  update_user_info,
  update_user_image,
} from "./apis/user";
import user_img_def from "./assets/user_img.png";
import insta from "./assets/instagram.png";
import fb from "./assets/fb.png";
import twitter from "./assets/tw.png";
import snap from "./assets/snap.png";
import paypal from "./assets/paypal.png";
import mastercard from "./assets/mastercard.png";
import map from "./assets/map_user.png";
import edit from "./assets/edit.png";
import Map from "./Map";
const DjangoConfig = {
  headers: {
    Authorization: "Token " + localStorage.getItem("UserToken"),
  },
};

export default class User_profile extends Component {
  state = {
    user_info: {},
    edit_details: false,
    edit_image: false,
    first_name: "",
    last_name: "",
    Company_name: "",
    address: "",
    Phone: "",
    website: "",
    user_image: "",
    loading: false,
  };

  componentDidMount = () => {
    console.log("112", localStorage.getItem("UserId"));
    let data2 = { user_id: localStorage.getItem("UserId") };
    get_login_user_info(data2)
      .then((res) => {
        console.log("user info", res);
        if (res.data && res.data.user_info) {
          this.setState({ user_info: res.data.user_info });

          console.log("varun12", this.state.user_info);
        }
      })
      .catch((err) => {
        console.log("user info err", err);
      });
  };

  changeHandler = (event) => {
    console.log("states", this.state);
    this.setState({ [event.target.name]: event.target.value });
  };

  submitUserDetails = (event) => {
    console.log("this.state", this.state);
    event.preventDefault();
    this.setState({ loading: true });

    var {
      user_info,
      first_name,
      last_name,
      Company_name,
      address,
      Phone,
      website,
    } = this.state;

    const data = {
      username: user_info.user ? user_info.user.username : "",
      first_name,
      last_name,
      Company_name,
      address,
      Phone,
      website,
    };

    update_user_info(data, DjangoConfig)
      .then((response) => {
        let data2 = { user_id: localStorage.getItem("UserId") };
        get_login_user_info(data2)
          .then((res) => {
            console.log("user info", res.data);
            if (res.data && res.data.user_info) {
              this.setState({ user_info: res.data.user_info, loading: false });
            }
          })
          .catch((err) => {
            this.setState({ loading: false });
          });
      })
      .catch((res) => {
        this.setState({ loading: false });
      });
  };

  onUploadUserImage = (event) => {
    event.preventDefault();
    let { user_info } = this.state;
    this.setState({ loading: true });
    let user_img = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(user_img[0]);
    reader.onload = (e) => {
      const data = {
        username: user_info.user.username,
        user_image: e.target.result,
      };
      update_user_image(data, DjangoConfig)
        .then((response) => {
          let data2 = { user_id: localStorage.getItem("UserId") };
          get_login_user_info(data2)
            .then((res) => {
              console.log("user info image", res.data);
              if (res.data && res.data.user_image) {
                this.setState({
                  user_image: res.data.user_image,
                  loading: false,
                });
              }
            })
            .catch((err) => {
              this.setState({ loading: false });
            });
        })
        .catch((res) => {
          this.setState({ loading: false });
        });
    };
  };

  render() {
    const {
      user_info,
      edit_details,
      edit_image,
      first_name,
      last_name,
      Company_name,
      address,
      Phone,
      website,
      user_image,
      loading,
    } = this.state;
    return (
      <div>
        <MDBContainer>
          <div className="setting-10">
            <h3>User Profile</h3>
          </div>
          <MDBRow className="user_container">
            <MDBCol md="3">
              <img
                src={
                  user_info && user_info.user_image
                    ? user_info.user_image
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
                />
                <input
                  type="file"
                  onChange={
                    user_info && user_info.username
                      ? this.onUploadUserImage
                      : user_img_def
                  }
                />
              </div>
            </MDBCol>
            <MDBCol md="6">
              {edit_details ? (
                <div>
                  <div className="user1">
                    {" "}
                    <input
                      type="text"
                      name="first_name"
                      value={first_name}
                      onChange={this.changeHandler}
                    />
                    <input
                      type="text"
                      name="last_name"
                      value={last_name}
                      onChange={this.changeHandler}
                    />
                  </div>
                  <MDBRow>
                    <MDBCol md="4">
                      <div className="user2">Company name</div>
                      <div className="user2">Address</div>
                      <div className="user2">Phone</div>
                      <div className="user2">Website</div>
                    </MDBCol>
                    <MDBCol md="8">
                      <form
                        className="needs-validation"
                        onSubmit={this.submitUserDetails}
                        noValidate
                      >
                        <div className="user3">
                          <input
                            type="text"
                            name="Company_name"
                            value={Company_name}
                            onChange={this.changeHandler}
                          />
                        </div>
                        <div className="user3">
                          <input
                            type="text"
                            name="address"
                            value={address}
                            onChange={this.changeHandler}
                          />
                        </div>
                        <div className="user3">
                          <input
                            type="text"
                            name="Phone"
                            value={Phone}
                            onChange={this.changeHandler}
                          />
                        </div>
                        <div className="user3">
                          <input
                            type="text"
                            name="website"
                            value={website}
                            onChange={this.changeHandler}
                          />
                        </div>
                        <button type="submit">Submit</button>
                        <button
                          onClick={() => this.setState({ edit_details: false })}
                        >
                          {" "}
                          Cancel
                        </button>
                      </form>
                    </MDBCol>
                  </MDBRow>
                </div>
              ) : (
                <div>
                  <div className="user1">
                    {user_info.first_name} {user_info.last_name}
                  </div>
                  <MDBRow>
                    <MDBCol md="4">
                      <div className="user2">Company name</div>
                      <div className="user2">Address</div>
                      <div className="user2">Phone</div>
                      <div className="user2">Website</div>
                    </MDBCol>
                    <MDBCol md="8">
                      <div className="user3">{user_info.Company_name}</div>
                      <div className="user3">{user_info.address}</div>
                      <div className="user3">{user_info.Phone}</div>
                      <div className="user3">{user_info.website}</div>
                      <img
                        src={edit}
                        alt="edit"
                        onClick={() => this.setState({ edit_details: true })}
                        style={{ height: "20px", width: "20px" }}
                      />
                    </MDBCol>
                  </MDBRow>
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
