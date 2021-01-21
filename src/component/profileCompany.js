import React, { Component } from 'react'
import Cropper from "./utils/cropper";
import Loader from "react-loader-spinner";
import edit from "./assets/edit.png";
import avtar_img from "./assets/img_avatar.png";
import { get_login_user_info ,update_user_image} from "./apis/user";
import swal from "sweetalert";
import {secure_pin} from '../config'
import { MDBCol, MDBRow ,MDBBtn} from 'mdbreact';
import { AssessmentTwoTone } from '@material-ui/icons';
import file_icon from './assets/file_icon.png'
export default class profileCompany extends Component {
    state = {
        user_info: {},
        company_name :"",
        user_image: "",
        email: "",
        show_crop_function: false,
        loading_image: true,
      };
      componentDidMount = () => {
        let data = {secure_pin, user_id: localStorage.getItem("UserId") };
        get_login_user_info(data)
          .then(res => {
            console.log("user info", res.data);
            if (res.data ) {
              this.setState({
                user_info: res.data.users_login,
                company_name:res.data.users_login[0].company,
                email: res.data.users_login[0].email_id,
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
        let userEmail = localStorage.getItem("UserEmail");
        return (
          <div >
            
          <MDBRow className="setting-14" style={{padding:'3% 6%'}}>
          <div className="agencycontant2">Voice Search Assistant:</div>
          
            <MDBCol md="12" className="profileSpacing">
              <MDBRow>
                <MDBCol md="6">
                  <div className="profile3">Email:</div>
                </MDBCol>
                <MDBCol md="6">
               
                  <input
                  type="email"
                    className="profile4"
                    placeholder="info@oasismedia.co"
                    value={this.state.email}
                    readOnly
                    name="address"
                    onChange={this.changeHandler}
                    style={{width:'100%'}}
                  />
                </MDBCol>
              </MDBRow>
            </MDBCol>

            <MDBCol md="12" className="profileSpacing">
              <MDBRow>
                <MDBCol md="6">
                  <div className="profile3">Support Email:</div>
                </MDBCol>
                <MDBCol md="6">
                  <input type="email"
                    className="profile4"
                    placeholder="info@oasismedia.co" 
                    style={{width:'100%'}}
                      name="city"
                          onChange={this.changeHandler} />
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <div className="agencycontant2">Company Assets:</div>
            
<MDBRow >
  <MDBCol md='2' ><img style={{width:'85px',height:'85px'}} src={file_icon}/> </MDBCol>
  <MDBCol md='8' className="profile3">
  Logo represens company’s branding on the Platform. Please upload your business logo here.
  </MDBCol>
  <MDBCol md='2'></MDBCol>
</MDBRow>
<MDBRow>
  <MDBCol md='2' style={{textAlign:'center' ,marginTop:'10px'}}><img style={{width:'45px',height:'45px',}} src={file_icon}/> </MDBCol>
  <MDBCol md='8' className="profile3">
  Fav Icon denotes company’s branding on the Web. Please upload a 64x64px (.ico / .jpeg / .png) 
  </MDBCol>
  <MDBCol md='2'></MDBCol>
</MDBRow>
            
<div className="agencycontant2">Workspace:</div>
            <MDBRow >
            <MDBCol md='6'  className="profile3" style={{marginTop:'45px',marginLeft:'-98px'}} >voicesearchassistant.synup.com </MDBCol>
  
            </MDBRow>
            <div >
              <MDBBtn className="pay_last_btn agency_save">Save</MDBBtn>
              </div>  
                      </MDBRow>
                   
              
      </div>
  
            // <div>
            //      <div className="row setting-14">
            //     <div class="col-md-4 avatar  ">

            //     {this.state.loading_image ? (
            //     <div style={{ textAlign: "center" }}>
            //       <Loader
            //         type="Oval"
            //         color="#00BFFF"
            //         height={30}
            //         width={30}
            //         // timeout={3000} //3 secs
            //       />
            //     </div>
            //   ) : this.state.show_crop_function ? (
            //     <Cropper uploadUserImage={this.uploadUserImage} />
            //   ) : (
            //     <div>
            //         <img
            //         src={
            //           this.state.user_info && this.state.user_info.user_image
            //             ? "https://digimonk.net/dashify-ci/assets/upload/images/profile-type-image/" +
            //               this.state.user_info.user_image
            //             : avtar_img
            //         }
            //         alt=""
            //       />
                  
            //       <div className="get-image">
            //         <img
            //           src={edit}
            //           alt=""
            //           style={{ height: "20px", width: "20px" }}
            //           onClick={this.show_crop_function}
            //         />
            //         {/* <input type="file" onChange={this.show_crop_function} /> */}
            //       </div>
            //     </div>
            //   )}
                  
            //       {/* <img src={avtar_img} alt="" /> */}

            //       <p>
            //         {this.state.company_name} 
            //       </p>
            //     </div>

            //     <div className="col-md-8 ">
            //       <div class="form-group row form_gap">
            //         <label for="inputEmail3" class="col-sm-4 col-form-label">
            //           Email:
            //         </label>
            //         <div class="col-sm-8">
            //           <input
            //             type="email"
            //             class="form-control"
            //             id="inputEmail3"
            //             value={this.state.email}
            //             readOnly
            //           />
            //         </div>
            //       </div>

                  
            //       <div class="form-group row">
            //         <label for="inputPassword3" class="col-sm-4 col-form-label">
            //           Support Email:
            //         </label>
            //         <div class="col-sm-8">
            //         <input
            //             type="email"
            //             class="form-control"
            //             id="inputEmail3"
            //             value={this.state.email}
            //             readOnly
            //           />
            //         </div>
            //       </div>
                 
            //       <div className="save_gap">
            //         <button type="submit" class="user_save0">
            //           Save
            //         </button>
            //       </div>
            //     </div>
            //   </div>
           
            // </div>
       
       )
    }
}
