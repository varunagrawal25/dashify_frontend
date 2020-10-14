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
import map from "./assets/map_user.png";
import edit from "./assets/edit.png";
import Map from "./Map";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const DjangoConfig = {
  headers: {
    Authorization: "Token " + localStorage.getItem("UserToken")
  }
};

export default class User_profile extends Component {
  state = {
    user_info: {},
    edit_details: false,
    first_name: "",
    last_name: "",
    Company_name: "",
    address: "",
    Phone: "",
    website: "",
    user_image: "",
    show_crop_function: false,
    loading_info: true,
    loading_image: true,

    // cropper
    src: null,
    crop: {
      unit: "%",
      width: 30,
      aspect: 1 / 1
    }
  };

  componentDidMount = () => {
    let data = { user_id: localStorage.getItem("UserId") };
    get_login_user_info(data, DjangoConfig)
      .then(res => {
        console.log("user info", res.data);
        if (res.data && res.data.user_info) {
          this.setState({
            user_info: res.data.user_info,
            first_name: res.data.user_info.first_name,
            last_name: res.data.user_info.last_name,
            Company_name: res.data.user_info.Company_name,
            address: res.data.user_info.address,
            Phone: res.data.user_info.Phone,
            website: res.data.user_info.website,
            user_image: "",
            loading_info: false,
            loading_image: false
          });
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

  submitUserDetails = event => {
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
      website
    } = this.state;

    const data = {
      username: user_info.user ? user_info.user.username : "",
      first_name,
      last_name,
      Company_name,
      address,
      Phone,
      website
    };

    update_user_info(data, DjangoConfig)
      .then(response => {
        let data2 = { user_id: localStorage.getItem("UserId") };
        this.setState({ loading_info: true });
        get_login_user_info(data2, DjangoConfig)
          .then(res => {
            console.log("user info", res.data);
            if (res.data && res.data.user_info) {
              this.setState({
                user_info: res.data.user_info,
                edit_details: false,
                loading_info: false
              });
            } else {
              this.setState({ edit_details: false, loading_info: false });
              alert("try again");
            }
          })
          .catch(err => {
            this.setState({ edit_details: false, loading_info: false });
            alert("try again");
          });
      })
      .catch(res => {
        this.setState({ edit_details: false, loading_info: false });
        alert("try again");
      });
  };

  uploadUserImage = image => {
    let { user_info } = this.state;

    console.log("image", image);

    let user_img = image;

    this.setState({ loading_image: true });
    const data = {
      username: user_info.user ? user_info.user.username : "",
      user_image: image
    };

    update_user_image(data, DjangoConfig)
      .then(response => {
        let data2 = { user_id: localStorage.getItem("UserId") };
        get_login_user_info(data2, DjangoConfig)
          .then(res => {
            console.log("user info image", res.data);
            if (res.data && res.data.user_info.user_image) {
              this.setState({
                user_image: res.data.user_info.user_image,
                loading_image: false,
                show_crop_function: false
              });
            } else {
              this.setState({
                loading_image: false,
                show_crop_function: false
              });
              alert("try again");
            }
          })
          .catch(err => {
            this.setState({ loading_image: false, show_crop_function: false });
            alert("try again");
          });
      })
      .catch(res => {
        this.setState({ loading_image: false, show_crop_function: false });
        alert("try again");
      });
  };

  show_crop_function = () => {
    this.setState({
      show_crop_function: true
    });
  };

  cropFunction = () => {
    console.log("clicked crop function");
    const { crop, croppedImageUrl, src, image } = this.state;
    let data = (
      <div className="App">
        <div>
          <input type="file" accept="image/*" onChange={this.onSelectFile} />
        </div>
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {croppedImageUrl && (
          <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
        )}
        <button onClick={() => this.uploadUserImage(croppedImageUrl)}>
          crop
        </button>
      </div>
    );
    return data;
  };

  // cropper functions
  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    console.log("onCropComplete");
    this.makeClientCrop(crop);
    // this.uploadUserImage;
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    console.log("makeClientCrop");
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      console.log(croppedImageUrl);

      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    console.log("getCroppedImg");
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    console.log("ctx", ctx);
    // As Base64 string
    const base64Image = canvas.toDataURL("image/jpeg");
    return base64Image;
    // return new Promise((resolve, reject) => {
    //   canvas.toBlob(blob => {
    //     if (!blob) {
    //       //reject(new Error('Canvas is empty'));
    //       console.error("Canvas is empty");
    //       return;
    //     }
    //     console.log("blob", blob);
    //     blob.name = fileName;
    //     window.URL.revokeObjectURL(this.fileUrl);
    //     this.fileUrl = window.URL.createObjectURL(blob);
    //     console.error("this.fileUrl", this.fileUrl);
    //     resolve(this.fileUrl);
    //   }, "image/jpeg");
    // });
  }

  render() {
    const {
      user_info,
      edit_details,
      first_name,
      last_name,
      Company_name,
      address,
      Phone,
      website,
      user_image,
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
                this.cropFunction()
              ) : (
                <div>
                  <img
                    src={
                      user_info && user_info.user_image
                        ? "https://dashify.biz" + user_info.user_image
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
                  <div className="user1">
                    {" "}
                    <input
                      type="text"
                      name="first_name"
                      value={first_name}
                      onChange={this.changeHandler}
                      placeholder="First name"
                      className="user_edit_input"
                    />
                    <input
                      type="text"
                      name="last_name"
                      value={last_name}
                      onChange={this.changeHandler}
                      placeholder="Last name"
                      className="user_edit_input"
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
                            className="user_edit_input"
                            placeholder="Edit company name"
                          />
                        </div>
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
                        <div className="user3">
                          <input
                            type="text"
                            name="Phone"
                            value={Phone}
                            onChange={this.changeHandler}
                            className="user_edit_input"
                            placeholder="Edit phone no."
                          />
                        </div>
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
                      {user_info.Company_name ? (
                        <div className="user3">{user_info.Company_name}</div>
                      ) : (
                        <div className="user_blank"></div>
                      )}

                      {user_info.address ? (
                        <div className="user3">{user_info.address}</div>
                      ) : (
                        <div className="user_blank"></div>
                      )}
                      {user_info.Phone ? (
                        <div className="user3">{user_info.Phone}</div>
                      ) : (
                        <div className="user_blank"></div>
                      )}
                      {user_info.website ? (
                        <div className="user3">{user_info.website}</div>
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

// updated

// import React, { Component } from "react";
// import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
// import Cropper from "react-easy-crop";
// import {
//   get_login_user_info,
//   update_user_info,
//   update_user_image
// } from "./apis/user";
// import { all_location } from "./apis/location";
// import Loader from "react-loader-spinner";
// import user_img_def from "./assets/user_img.png";
// import insta from "./assets/instagram.png";
// import fb from "./assets/fb.png";
// import twitter from "./assets/tw.png";
// import snap from "./assets/snap.png";
// import paypal from "./assets/paypal.png";
// import mastercard from "./assets/mastercard.png";
// import map from "./assets/map_user.png";
// import edit from "./assets/edit.png";
// import Map from "./Map";

// const DjangoConfig = {
//   headers: {
//     Authorization: "Token " + localStorage.getItem("UserToken")
//   }
// };

// export default class User_profile extends Component {
//   state = {
//     user_info: {},
//     edit_details: false,
//     first_name: "",
//     last_name: "",
//     Company_name: "",
//     address: "",
//     Phone: "",
//     website: "",
//     user_image: "",
//     loading_info: true,
//     loading_image: true,
//     image: "",
//     crop: { x: 0, y: 0 },
//     zoom: 1,
//     aspect: 4 / 3
//   };

//   componentDidMount = () => {
//     let data = { user_id: localStorage.getItem("UserId") };
//     get_login_user_info(data, DjangoConfig)
//       .then(res => {
//         console.log("user info", res.data);
//         if (res.data && res.data.user_info) {
//           this.setState({
//             user_info: res.data.user_info,
//             first_name: res.data.user_info.first_name,
//             last_name: res.data.user_info.last_name,
//             Company_name: res.data.user_info.Company_name,
//             address: res.data.user_info.address,
//             Phone: res.data.user_info.Phone,
//             website: res.data.user_info.website,
//             user_image: "",
//             loading_info: false,
//             loading_image: false
//           });
//         } else {
//           this.setState({ loading_info: false, loading_image: false });
//         }
//       })
//       .catch(err => {
//         console.log("user info err", err);
//         this.setState({ loading_info: false, loading_image: false });
//       });
//   };

//   changeHandler = event => {
//     console.log("states", this.state);
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   submitUserDetails = event => {
//     console.log("this.state", this.state);
//     event.preventDefault();
//     this.setState({ loading: true });

//     var {
//       user_info,
//       first_name,
//       last_name,
//       Company_name,
//       address,
//       Phone,
//       website
//     } = this.state;

//     const data = {
//       username: user_info.user ? user_info.user.username : "",
//       first_name,
//       last_name,
//       Company_name,
//       address,
//       Phone,
//       website
//     };

//     update_user_info(data, DjangoConfig)
//       .then(response => {
//         let data2 = { user_id: localStorage.getItem("UserId") };
//         this.setState({ loading_info: true });
//         get_login_user_info(data2, DjangoConfig)
//           .then(res => {
//             console.log("user info", res.data);
//             if (res.data && res.data.user_info) {
//               this.setState({
//                 user_info: res.data.user_info,
//                 edit_details: false,
//                 loading_info: false
//               });
//             } else {
//               this.setState({ edit_details: false, loading_info: false });
//               alert("try again");
//             }
//           })
//           .catch(err => {
//             this.setState({ edit_details: false, loading_info: false });
//             alert("try again");
//           });
//       })
//       .catch(res => {
//         this.setState({ edit_details: false, loading_info: false });
//         alert("try again");
//       });
//   };

//   image2base64 = event => {
//     event.preventDefault();
//     let { user_info } = this.state;
//     let user_img = event.target.files;
//     let reader = new FileReader();
//     reader.readAsDataURL(user_img[0]);
//     reader.onload = e => {
//       this.setState({
//         image: e.target.result
//       });
//     };
//   };

//   uploadImageToDb = () => {
//     const data = {
//       username: user_info.user ? user_info.user.username : "",
//       user_image: this.state.image
//     };
//     this.setState({ loading_image: true });
//     update_user_image(data, DjangoConfig)
//       .then(response => {
//         let data2 = { user_id: localStorage.getItem("UserId") };
//         get_login_user_info(data2, DjangoConfig)
//           .then(res => {
//             console.log("user info image", res.data);
//             if (res.data && res.data.user_info.user_image) {
//               this.setState({
//                 user_image: res.data.user_info.user_image,
//                 loading_image: false
//               });
//             } else {
//               this.setState({ loading_image: false });
//               alert("try again");
//             }
//           })
//           .catch(err => {
//             this.setState({ loading_image: false });
//             alert("try again");
//           });
//       })
//       .catch(res => {
//         this.setState({ loading_image: false });
//         alert("try again");
//       });
//   };

//   onCropChange = crop => {
//     this.setState({ crop });
//     console.log("onCropChange", crop);
//   };

//   onCropComplete = (onCropComplete, croppedAreaPixels) => {
//     console.log("onCropComplete", onCropComplete, croppedAreaPixels);
//     this.uploadImageToDb();
//   };

//   onZoomChange = zoom => {
//     this.setState({ zoom });
//     console.log("onZoomChange", zoom);
//   };

//   render() {
//     const {
//       user_info,
//       edit_details,
//       first_name,
//       last_name,
//       Company_name,
//       address,
//       Phone,
//       website,
//       user_image,
//       loading_info,
//       loading_image
//     } = this.state;
//     return (
//       <div>
//         <MDBContainer>
//           <div className="setting-10">
//             <h3>User Profile</h3>
//           </div>
//           <MDBRow className="user_container">
//             <MDBCol md="3">
//               {loading_image ? (
//                 <div style={{ textAlign: "center" }}>
//                   <Loader
//                     type="Oval"
//                     color="#00BFFF"
//                     height={30}
//                     width={30}
//                     // timeout={3000} //3 secs
//                   />
//                 </div>
//               ) : (
//                 <div>
//                   <Cropper
//                     image={this.state.image}
//                     crop={this.state.crop}
//                     zoom={this.state.zoom}
//                     aspect={this.state.aspect}
//                     onCropChange={this.onCropChange}
//                     // onCropComplete={this.onCropComplete}
//                     onZoomChange={this.onZoomChange}
//                   />
//                   <MDBBtn
//                     className="user_btn"
//                     onClick={() => this.uploadImageToDb}
//                   >
//                     Ok
//                   </MDBBtn>

//                   {/* show and change image */}
//                   <img
//                     src={
//                       user_info && user_info.user_image
//                         ? user_info.user_image
//                         : user_img_def
//                     }
//                     alt="user"
//                     id="user_img"
//                   />
//                   <div className="get-image">
//                     <img
//                       src={edit}
//                       alt=""
//                       style={{ height: "20px", width: "20px" }}
//                     />
//                     <input type="file" onChange={this.image2base64} />
//                   </div>
//                 </div>
//               )}
//             </MDBCol>
//             <MDBCol md="6">
//               {loading_info ? (
//                 <div style={{ textAlign: "center" }}>
//                   <Loader
//                     type="Oval"
//                     color="#00BFFF"
//                     height={30}
//                     width={30}
//                     // timeout={3000} //3 secs
//                   />
//                 </div>
//               ) : edit_details ? (
//                 <div>
//                   <div className="user1">
//                     {" "}
//                     <input
//                       type="text"
//                       name="first_name"
//                       value={first_name}
//                       onChange={this.changeHandler}
//                       placeholder="First name"
//                       className="user_edit_input"
//                     />
//                     <input
//                       type="text"
//                       name="last_name"
//                       value={last_name}
//                       onChange={this.changeHandler}
//                       placeholder="Last name"
//                       className="user_edit_input"
//                     />
//                   </div>
//                   <MDBRow>
//                     <MDBCol md="4">
//                       <div className="user2">Company name</div>
//                       <div className="user2">Address</div>
//                       <div className="user2">Phone</div>
//                       <div className="user2">Website</div>
//                     </MDBCol>
//                     <MDBCol md="8">
//                       <form
//                         className="needs-validation"
//                         onSubmit={this.submitUserDetails}
//                         noValidate
//                       >
//                         <div className="user3">
//                           <input
//                             type="text"
//                             name="Company_name"
//                             value={Company_name}
//                             onChange={this.changeHandler}
//                             className="user_edit_input"
//                             placeholder="Edit company name"
//                           />
//                         </div>
//                         <div className="user3">
//                           <input
//                             type="text"
//                             name="address"
//                             value={address}
//                             onChange={this.changeHandler}
//                             className="user_edit_input"
//                             placeholder="Edit address"
//                           />
//                         </div>
//                         <div className="user3">
//                           <input
//                             type="text"
//                             name="Phone"
//                             value={Phone}
//                             onChange={this.changeHandler}
//                             className="user_edit_input"
//                             placeholder="Edit phone no."
//                           />
//                         </div>
//                         <div className="user3">
//                           <input
//                             type="text"
//                             name="website"
//                             value={website}
//                             onChange={this.changeHandler}
//                             className="user_edit_input"
//                             placeholder="Edit website"
//                           />
//                         </div>
//                         <button type="submit" className="user_btn">
//                           Submit
//                         </button>
//                         <button
//                           className="user_btn"
//                           onClick={() => this.setState({ edit_details: false })}
//                         >
//                           {" "}
//                           Cancel
//                         </button>
//                       </form>
//                     </MDBCol>
//                   </MDBRow>
//                 </div>
//               ) : (
//                 <div>
//                   <div className="user1">
//                     {user_info.first_name} {user_info.last_name}
//                   </div>
//                   <MDBRow>
//                     <MDBCol md="4">
//                       <div className="user2">Company name</div>
//                       <div className="user2">Address</div>
//                       <div className="user2">Phone</div>
//                       <div className="user2">Website</div>
//                     </MDBCol>
//                     <MDBCol md="8">
//                       {user_info.Company_name ? (
//                         <div className="user3">{user_info.Company_name}</div>
//                       ) : (
//                         <div className="user_blank"></div>
//                       )}

//                       {user_info.address ? (
//                         <div className="user3">{user_info.address}</div>
//                       ) : (
//                         <div className="user_blank"></div>
//                       )}
//                       {user_info.Phone ? (
//                         <div className="user3">{user_info.Phone}</div>
//                       ) : (
//                         <div className="user_blank"></div>
//                       )}
//                       {user_info.website ? (
//                         <div className="user3">{user_info.website}</div>
//                       ) : (
//                         <div className="user_blank"></div>
//                       )}
//                     </MDBCol>
//                   </MDBRow>
//                   <div className="get-image">
//                     <img
//                       src={edit}
//                       alt="edit"
//                       onClick={() => this.setState({ edit_details: true })}
//                       style={{ height: "20px", width: "20px" }}
//                     />
//                   </div>
//                 </div>
//               )}
//             </MDBCol>
//             <MDBCol md="3">
//               {/* <img src={map} alt="user" id="user_map" /> */}
//               <Map />
//             </MDBCol>
//           </MDBRow>

//           <MDBRow>
//             <MDBCol md="3" className="user_container1">
//               <MDBRow>
//                 <MDBCol className="user2" md="7">
//                   Social Network
//                 </MDBCol>
//                 <MDBCol md="5">
//                   <MDBBtn id="user_add">+ Add</MDBBtn>
//                 </MDBCol>
//               </MDBRow>
//               <MDBRow>
//                 <MDBCol md="4">
//                   <img src={twitter} alt="icon" className="user_profile_icon" />
//                 </MDBCol>
//                 <MDBCol md="8">
//                   <MDBBtn className="user_connected_btn">Connected</MDBBtn>
//                 </MDBCol>
//               </MDBRow>

//               <MDBRow>
//                 <MDBCol md="4">
//                   <img src={fb} alt="icon" className="user_profile_icon" />
//                 </MDBCol>
//                 <MDBCol md="8">
//                   <MDBBtn className="user_disconnected_btn">
//                     Disconnected
//                   </MDBBtn>
//                 </MDBCol>
//               </MDBRow>

//               <MDBRow>
//                 <MDBCol md="4">
//                   <img src={insta} alt="icon" className="user_profile_icon" />
//                 </MDBCol>
//                 <MDBCol md="8">
//                   <MDBBtn className="user_connected_btn">Connected</MDBBtn>
//                 </MDBCol>
//               </MDBRow>

//               <MDBRow>
//                 <MDBCol md="4">
//                   <img src={snap} alt="icon" className="user_profile_icon" />
//                 </MDBCol>
//                 <MDBCol md="8">
//                   <MDBBtn className="user_connected_btn">Connected</MDBBtn>
//                 </MDBCol>
//               </MDBRow>
//               <div id="user11">
//                 By clicking any on this social icon you will directly redirect
//                 to his/her social Profile
//               </div>
//             </MDBCol>

//             <MDBCol md="9">
//               <div
//                 className="user_container1 "
//                 style={{ marginRight: "-10px" }}
//               >
//                 <MDBRow>
//                   <MDBCol md="3" id="user7">
//                     Subscription
//                   </MDBCol>
//                   <MDBCol md="6" className="user12">
//                     Premium Monthly
//                   </MDBCol>
//                   <MDBCol md="3">
//                     <MDBBtn id="user_save">Save</MDBBtn>
//                   </MDBCol>
//                 </MDBRow>
//                 <MDBRow>
//                   <MDBCol md="3" id="user_payment_container">
//                     <div id="user6">$8</div>
//                     <div className="user8">Month</div>
//                     <div className="user9">Per Location</div>
//                     <div className="user9">Billed Monthly</div>
//                   </MDBCol>
//                   <MDBCol md="7" id="user10">
//                     <div>
//                       <span className="user4">Start Date: </span>
//                       <span className="user5">30 Jan 2020</span>
//                     </div>

//                     <div>
//                       <span className="user4">Valid Till: </span>
//                       <span className="user5">30 Jan 2020</span>
//                     </div>

//                     <div>
//                       <span className="user4">Min. Commitemnt:</span>
//                       <span className="user5"> 60 Loсation / Monthly </span>
//                     </div>

//                     <div>
//                       <span className="user4">Currently added: </span>
//                       <span className="user5">637 Locations </span>
//                     </div>

//                     <div>
//                       <span className="user4">Next Billing amount: </span>
//                       <span className="user5">$5103. 94 On 29 Feb 2020 </span>
//                     </div>
//                   </MDBCol>
//                 </MDBRow>
//                 <MDBRow>
//                   <MDBCol md="5">
//                     <img src={mastercard} />{" "}
//                   </MDBCol>
//                   <MDBCol md="5">
//                     <img src={paypal} />
//                   </MDBCol>
//                   <MDBCol md="2">
//                     <MDBBtn className="add_more">+</MDBBtn>
//                   </MDBCol>
//                 </MDBRow>
//               </div>
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </div>
//     );
//   }
// }
