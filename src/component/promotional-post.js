import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React, { Component } from 'react'
import es_img1 from "./assets/es_img1.png";
import edit from "./assets/edit.png";
import delete_icon from "./assets/delete_icon.png";
import { Checkbox } from '@material-ui/core';
import {
  location_by_id,
  add_other_images_by_location_id,
  delete_other_images_by_location_id
} from "./apis/location";
import { secure_pin } from "../config";
import cross_img from "./assets/cross_img.png";
import attach from "./assets/attach.png"
import swal from "sweetalert";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import Axios from "axios";
export default class promotional_post extends Component {

state={
  otherImages: [],
  otherImagesLoading: false,
  offer_title:'',
  promo_start_date:'',
  promo_end_date:'',
  promo_start_time:'',
  promo_end_time:'',
  event_start_date:'',
  event_end_date:'',
  event_start_time:'',
  event_end_time:'',
  offer_details:'',
  redeem_offer:'',
  coupon_code:'',
  terms:'',
  event_title:'',
  event_details:'',
  cta_post:'',
  expiry_post:'',
  cta_drop:'',
  cta_url:'',
  type:"promo_post"
}
draftClicked = (draft) => {
  const data = {
    otherImages: this.state.otherImages,
    offer_title:this.state.offer_title,
    promo_start_date:this.state.promo_start_date,
    promo_end_date:this.state.promo_end_date,
    promo_start_time:this.state.promo_start_time,
    promo_end_time:this.state.promo_end_time,
    event_start_date:this.state.event_start_date,
    event_end_date:this.state.event_end_date,
    event_start_time:this.state.event_start_time,
    event_end_time:this.state.event_end_time,
    offer_details:this.state.offer_details,
    redeem_offer:this.state.redeem_offer,
    coupon_code:this.state.coupon_code,
    terms:this.state.terms,
    event_title:this.state.event_title,
    event_details:this.state.event_details,
    cta_post:this.state.cta_post,
    expiry_post:this.state.expiry_post,
    cta_drop:this.state.cta_drop,
    cta_url:this.state.cta_url,
    type:this.state.type
  }
Axios.post(
      "https://cors-anywhere.herokuapp.com/https://dashify.biz/locations/get-all-connection-of-one-location",
      data,draft
    )
    console.log(data)
}
confirmPost = (active) => {
  const data = {
    otherImages: this.state.otherImages,
    offer_title:this.state.offer_title,
    promo_start_date:this.state.promo_start_date,
    promo_end_date:this.state.promo_end_date,
    promo_start_time:this.state.promo_start_time,
    promo_end_time:this.state.promo_end_time,
    event_start_date:this.state.event_start_date,
    event_end_date:this.state.event_end_date,
    event_start_time:this.state.event_start_time,
    event_end_time:this.state.event_end_time,
    offer_details:this.state.offer_details,
    redeem_offer:this.state.redeem_offer,
    coupon_code:this.state.coupon_code,
    terms:this.state.terms,
    event_title:this.state.event_title,
    event_details:this.state.event_details,
    cta_post:this.state.cta_post,
    expiry_post:this.state.expiry_post,
    cta_drop:this.state.cta_drop,
    cta_url:this.state.cta_url,
    type:this.state.type
  }
Axios.post(
      "https://cors-anywhere.herokuapp.com/https://dashify.biz/locations/get-all-connection-of-one-location",
      data,active
    )
console.log(data)
}
changeHandler = event => {
  this.setState({ [event.target.name]: event.target.value });
  if (event.target.name == "offer_title") {
    this.setState({
      offer_title:event.target.value
    })
  }
  if (event.target.name == "start_date") {
    this.setState({
      start_date:event.target.value
    })
  }
  if (event.target.name == "offer_details") {
    this.setState({
      offer_details:event.target.value
    })
  }
  if (event.target.name == "end_date") {
    this.setState({
      end_date:event.target.value
    })
  }
  if (event.target.name == "redeem_offer") {
    this.setState({
      redeem_offer:event.target.value
    })
  }
  if (event.target.name == "coupon_code") {
    this.setState({
      coupon_code:event.target.value
    })
  }

  if (event.target.name == "terms") {
    this.setState({
      terms:event.target.value
    })
  }
};
  onUploadOtherImage = event => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
        console.log(e.target.result);
        this.setState({ otherImages: e.target.result });

      var locationId = this.props.match.params.locationId;
      // {"secure_pin":"digimonk","user_id":"10","location_id":"38",
      // "more_bussiness_images_array":[{"bussiness_image":"base64image1"},{"bussiness_image":"base64image2"}]}
      // const data = {
      //   secure_pin,
      //   user_id: localStorage.getItem("UserId"),
      //   location_id: locationId,
        
      //   more_bussiness_images_array: [{ bussiness_image: e.target.result }]
      // };
// console.log("kkl",data)
      this.setState({ otherImagesLoading: true });

      // add_other_images_by_location_id(data)
      //   .then(resp => {
      //     const data1 = {
      //       location_id: locationId,
      //       secure_pin
      //     };
      //     location_by_id(data1)
      //       .then(resp1 => {
      //         this.setState({
      //           otherImages: resp1.data.location_images,
      //           otherImagesLoading: false
      //         });
      //       })
      //       .catch(resp1 => {
      //         console.log(resp1);
      //         swal("uploading image failed");
      //         this.setState({ otherImagesLoading: false });
      //       });
      //   })
      //   .catch(resp => {
      //     console.log(resp);
      //     swal("uploading image failed");
      //     this.setState({ otherImagesLoading: false });
      //   });
    };
  };

  // delete_other_image = image_id => {
  //   var locationId = this.props.match.params.locationId;
  //   const data = {
  //     secure_pin,
  //     location_id:locationId,
  //     image_id: image_id
  //   };
  //   console.log("image_id", image_id);
  //   this.setState({ otherImagesLoading: true });
  //   delete_other_images_by_location_id(data)
  //     .then(res => {
  //       const data1 = {
  //         location_id: locationId,
  //         secure_pin
  //       };
  //       location_by_id(data1)
  //         .then(resp1 => {
  //           this.setState({
  //             otherImages: resp1.data.location_images,
  //             otherImagesLoading: false
  //           });
  //         })
  //         .catch(resp1 => {
  //           console.log(resp1);
  //           swal("deleting image failed");
  //           this.setState({ otherImagesLoading: false });
  //         });
  //     })
  //     .catch(res => {
  //       swal("deleting image failed");
  //       this.setState({ otherImagesLoading: false });
  //       console.log(res);
  //     });
  // };
  render() {
    console.log("kkk",this.state.type)
    return (
      <div>
        <MDBContainer id="overview-10" style={{marginBottom:'60px'}}>
            <div className="profanalytic">
              <h3>Promotional Posts</h3>
            </div>

            <MDBRow>
              <MDBCol md='4' className='review_container'>
<div style={{textAlign:'center',marginBottom:'25px'}}> 
<img src={require("./assets/calender.png")}  alt="" className='calender_icon' />
<select  className="review_select_btn" >
                              <option selected
                                value= "week"
                              >
                                Last week
                              </option>
                              <option
                              value = "month"
                              >
                                Last month
                              </option>

                              <option
                              value= "3 months"
                              >
                                Last 3 month
                              </option>

                              <option
                              value= "6 months"
                              >
                                Last 6 month
                              </option>
                              <option
                              value = "year"
                              >
                                Last year
                              </option>
                            </select>
</div>
<MDBRow className='pp_margin1' >
  <MDBCol md='2' style={{paddingRight:'0px'}}>
  <img src={require("../images/promo1.png")}  alt="" className='pp_icon' />
  </MDBCol>

  <MDBCol md='7' style={{paddingRight:'0px'}}>
<div className='pp_contant1'>15</div>
<div className='pp_contant2'>Total active post</div>
  </MDBCol>

  <MDBCol md='3'>
<div className='pp_contant_green'>+01.03%</div>
  </MDBCol>
</MDBRow>

<MDBRow className='pp_margin1' >
  <MDBCol md='2' style={{paddingRight:'0px'}}>
  <img src={require("../images/promo2.png")}  alt="" className='pp_icon' />
  </MDBCol>

  <MDBCol md='7' style={{paddingRight:'0px'}}>
<div className='pp_contant1'>21</div>
<div className='pp_contant2'>Total post views</div>
  </MDBCol>

  <MDBCol md='3'>
<div className='pp_contant_green'>+01.03%</div>
  </MDBCol>
</MDBRow>

<MDBRow className='pp_margin1' >
  <MDBCol md='2' style={{paddingRight:'0px'}}>
  <img src={require("../images/promo3.png")}  alt="" className='pp_icon' />
  </MDBCol>

  <MDBCol md='7' style={{paddingRight:'0px'}}>
<div className='pp_contant1'>06</div>
<div className='pp_contant2'>Total post clicks</div>
  </MDBCol>

  <MDBCol md='3'>
<div className='pp_contant_red'>-01.03%</div>
  </MDBCol>
</MDBRow>

<MDBRow className='pp_margin1' >
  <MDBCol md='2' style={{paddingRight:'0px'}}>
  <img src={require("../images/promo4.png")}  alt="" className='pp_icon' />
  </MDBCol>

  <MDBCol md='7' style={{paddingRight:'0px'}}>
<div className='pp_contant1'>12</div>
<div className='pp_contant2'>Scheduled posts</div>
  </MDBCol>

  <MDBCol md='3'>
{/* <div className='pp_contant_green'>+01.03%</div> */}
  </MDBCol>
</MDBRow>

<MDBRow className='pp_margin1' >
  <MDBCol md='2' style={{paddingRight:'0px'}}>
  <img src={require("../images/promo5.png")}  alt="" className='pp_icon' />
  </MDBCol>

  <MDBCol md='7' style={{paddingRight:'0px'}}>
<div className='pp_contant1'>09</div>
<div className='pp_contant2'>Expirit posts</div>
  </MDBCol>

  <MDBCol md='3'>
{/* <div className='pp_contant_green'>+01.03%</div> */}
  </MDBCol>
</MDBRow>
              </MDBCol>

              <MDBCol md='8'>
                <div className='review_container'> 
<MDBRow>
  <MDBCol md='7' >
  <input className="searchbox-div"
                             type="text"
                             onChange={e =>
                               this.setState({
                                 search: e.target.value.split(" ")
                               })
                            }
                            placeholder="Search Google Posts"
                           />
  </MDBCol>
  <MDBCol md='5' >
    
  <MDBRow className='pp_contant4'>
  <MDBCol md='3' style={{paddingLeft:'0px'}}>
Views
</MDBCol>

<MDBCol md='3' style={{paddingLeft:'0px'}}>
Clicks
</MDBCol>

<MDBCol md='6' >
Status
</MDBCol>
    </MDBRow>
  </MDBCol>

</MDBRow>
<hr/>
<div class="scrollbar">
<MDBRow>
  <MDBCol md='7'>
  <MDBRow>
                <MDBCol md="3" style={{padding:'0px'}}>
                  <img
                    src={es_img1}
                    alt="es_img1"
                    className="pp_img"
                    
                  />
                </MDBCol>
                <MDBCol md="9">
                <div className="pp_contant2">2nd March</div>
                  <div className="pp_contant3">Jazz Today By Whitney Ballett</div>
                  <div className="pp_contant2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt ut labore et dolore </div>
                  
                  <div className="pp_contant2">
                    <img src={edit} alt="" className="es_icon" data-toggle="modal" data-target="#myModal"/>
                    <img src={delete_icon} alt="" className="es_icon" />
                  </div>
                </MDBCol>
               
              </MDBRow>
  </MDBCol>
  <MDBCol md='5' >
  <MDBRow className='pp_contant5' >
  <MDBCol md='3'>
N/A
</MDBCol>

<MDBCol md='3'>
N/A
</MDBCol>

<MDBCol md='6' >
<MDBBtn className='pp_status_active'>Active</MDBBtn>
</MDBCol>
    </MDBRow>
  </MDBCol>

</MDBRow>

<hr/>
<MDBRow>
  <MDBCol md='7'>
  <MDBRow>
                <MDBCol md="3" style={{padding:'0px'}}>
                  <img
                    src={es_img1}
                    alt="es_img1"
                    className="pp_img"
                    
                  />
                </MDBCol>
                <MDBCol md="9">
                <div className="pp_contant2">2nd March</div>
                  <div className="pp_contant3">Jazz Today By Whitney Ballett</div>
                  <div className="pp_contant2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt ut labore et dolore </div>
                  
                  <div className="pp_contant2">
                    <img src={edit} alt="" className="es_icon" data-toggle="modal" data-target="#myModal"/>
                    <img src={delete_icon} alt="" className="es_icon" />
                  </div>
                </MDBCol>
               
              </MDBRow>
  </MDBCol>
  <MDBCol md='5' >
  <MDBRow className='pp_contant5' >
  <MDBCol md='3'>
N/A
</MDBCol>

<MDBCol md='3'>
N/A
</MDBCol>

<MDBCol md='6' >
<MDBBtn className='pp_status_active'>Active</MDBBtn>
</MDBCol>
    </MDBRow>
  </MDBCol>

</MDBRow>

</div>
                </div>
              </MDBCol>
              <MDBCol md='4' className='review_container'>
                <MDBBtn className='pp_create_np' data-toggle="modal" data-target="#myModal">Create a new post</MDBBtn>
                <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          {/* <button type="button" class="close" data-dismiss="modal">&times;</button> */}
         <div className="ap_heading">Additional Promotional Posts</div>
         <button
										type="button"
										className="modal_header_icon"
                    data-dismiss="modal"
                    style={{color:'#5d80e2',fontSize:'25px', padding:'0px'}}
									>
										&times;
									</button>
        </div>
        <div class="modal-body" >
          <div className="breadcrumb-menu" style={{margin:'0px' ,marginBottom:'30px'}}>
          <ul class="nav nav-tabs nav-justified ">
    <li ><a data-toggle="tab" href="#promo_post" className='active' onClick={ () => {this.setState({type:"promo_post"})}}> Promotional post</a></li>
    <li ><a data-toggle="tab" href="#post_event" onClick={ () => {this.setState({type:"post_event"})}}>Post an event</a></li>
    <li><a data-toggle="tab" href="#add_cta" onClick={ () => {this.setState({type:"add_cta"})}}>Add a CTA</a></li>
    <li><a data-toggle="tab" href="#expiry" onClick={ () => {this.setState({type:"expiry"})}}>Report this post after expairy</a></li>
  </ul>
          </div>
    

  <div class="tab-content">
    <div id="promo_post" class="tab-pane fade  active" style={{opacity:'1'}}>
    {/* <MDBRow>
           <MDBCol md='8' className='ap_subhead1'>
           Write your post
           </MDBCol>
           <MDBCol md='4' className='ap_subhead2'>
           100-150 Characters
           </MDBCol>
         </MDBRow> */}

         <MDBRow style={{marginTop:'15px'}}> 
           <MDBCol md='8'>
           <MDBRow >
                            <MDBCol md="2" className="ap_image">
                              <span>
                                <i className="zmdi zmdi-plus"></i>
                                <input
                                  type="file"
                                  name="otherImages"
                                  onChange={this.onUploadOtherImage}
                                />
                              </span>
                            </MDBCol>
                            {/* {this.state.otherImages.map((n, i) => ( */}
                              <MDBCol md="2" className="ap_image">
                                <img src={this.state.otherImages}
                                  alt=""
                                  style={{
                                    height: "60px",
                                    width: "60px",
                                    borderRadius: "10px"
                                  }}
                                />

                                {/* <div className="get-image1">
                                  <img
                                    src={cross_img}
                                    alt=""
                                    style={{
                                      height: "10px",
                                      width: "10px",
                                      backgroundColor: "red",
                                      borderRadius: "50%",
                                      padding: "2px",
                                      marginTop: "-3px"
                                    }}
                                    onClick={() =>
                                      this.delete_other_image(n.id)
                                    }
                                  />
                                </div> */}
                              </MDBCol>
                            {/* ))} */}
                          </MDBRow>
                         
           </MDBCol>
           <MDBCol md='4' className='ap_contant1'>
             <span><img src={attach} /></span>
           Attatch a document
           </MDBCol>
         </MDBRow>
         <MDBRow>
           
         <input   className="promo_input"  placeholder="Offer title " type='text' 
          value={this.state.offer_title}  name="offer_title"  onChange={this.changeHandler}/>
         </MDBRow>
         <MDBRow>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="Start date " type='date' 
         value={this.state.promo_start_date}  name="promo_start_date"  onChange={this.changeHandler}/>
         </MDBCol>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="Start time " type='time' 
         value={this.state.promo_start_time}  name="promo_start_time"  onChange={this.changeHandler}/>
         </MDBCol>
         </MDBRow>

         <MDBRow>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="End date " type='date' 
         value={this.state.promo_end_date}  name="promo_end_date"  onChange={this.changeHandler}/>
         </MDBCol>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="End time " type='time' 
         value={this.state.promo_end_time}  name="promo_end_time"  onChange={this.changeHandler}/>
         </MDBCol>
         </MDBRow>
        <div className='ap_subhead1'>Add more details (optional)</div>

         <MDBRow>
         <textarea rows="3"   className="promo_input"  placeholder="Offer details " type='text'
         value={this.state.offer_details}  name="offer_details"  onChange={this.changeHandler} />
         </MDBRow>

         <MDBRow>
         <input   className="promo_input"  placeholder="Coupon code (optional) " type='text' 
         value={this.state.coupon_code}  name="coupon_code"  onChange={this.changeHandler}/>
         </MDBRow>
         <MDBRow>
         <input   className="promo_input"  placeholder="Link to redeem offer (optional) " type='text' 
         value={this.state.redeem_offer}  name="redeem_offer"  onChange={this.changeHandler}/>
         </MDBRow>

         <MDBRow>
         <input   className="promo_input"  placeholder="Terms & Conditions  (optional) " type='text' 
         value={this.state.terms}  name="terms"  onChange={this.changeHandler}/>
         </MDBRow>
    </div>
   
    <div id="post_event" class="tab-pane fade">
    {/* <MDBRow>
           <MDBCol md='8' className='ap_subhead1'>
           Write your post
           </MDBCol>
           <MDBCol md='4' className='ap_subhead2'>
           100-150 Characters
           </MDBCol>
         </MDBRow>
 */}

         <MDBRow style={{marginTop:'15px'}}> 
           <MDBCol md='8'>
           <MDBRow >
                            <MDBCol md="2" className="ap_image">
                              <span>
                                <i className="zmdi zmdi-plus"></i>
                                <input
                                  type="file"
                                  name="otherImages"
                                  onChange={this.onUploadOtherImage}
                                />
                              </span>
                            </MDBCol>
                            {/* {this.state.otherImages.map((n, i) => ( */}
                              <MDBCol md="2" className="ap_image">
                                <img src={this.state.otherImages}
                                  alt=""
                                  style={{
                                    height: "60px",
                                    width: "60px",
                                    borderRadius: "10px"
                                  }}
                                />

                                {/* <div className="get-image1">
                                  <img
                                    src={cross_img}
                                    alt=""
                                    style={{
                                      height: "10px",
                                      width: "10px",
                                      backgroundColor: "red",
                                      borderRadius: "50%",
                                      padding: "2px",
                                      marginTop: "-3px"
                                    }}
                                    onClick={() =>
                                      this.delete_other_image(n.id)
                                    }
                                  />
                                </div>
                              */}
                              </MDBCol>
                            {/* ))} */}
                          </MDBRow>
                         
           </MDBCol>
           <MDBCol md='4' className='ap_contant1'>
             <span><img src={attach} /></span>
           Attatch a document
           </MDBCol>
         </MDBRow>
         <MDBRow>
           
         <input   className="promo_input"  placeholder="Event title " type='text' 
          value={this.state.event_title}  name="event_title"  onChange={this.changeHandler}/>
         </MDBRow>
         <MDBRow>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="Start date " type='date' 
         value={this.state.event_start_date}  name="event_start_date"  onChange={this.changeHandler}/>
         </MDBCol>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="Start time " type='time' 
         value={this.state.event_start_time}  name="event_start_time"  onChange={this.changeHandler}/>
         </MDBCol>
         </MDBRow>

         <MDBRow>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="End date " type='date' 
         value={this.state.event_end_date}  name="event_end_date"  onChange={this.changeHandler}/>
         </MDBCol>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="End time " type='time' 
         value={this.state.event_end_time}  name="event_end_time"  onChange={this.changeHandler}/>
         </MDBCol>
         </MDBRow>
        <div className='ap_subhead1'>Add more details (optional)</div>

         <MDBRow>
         <textarea rows="3"   className="promo_input"  placeholder="Event details " type='text'
         value={this.state.event_details}  name="event_details"  onChange={this.changeHandler} />
         </MDBRow>

         
    </div>
   
    <div id="add_cta" class="tab-pane fade">
    <MDBRow>
           <MDBCol md='8' className='ap_subhead1'>
           Write your post
           </MDBCol>
           <MDBCol md='4' className='ap_subhead2'>
           100-150 Characters
           </MDBCol>
         </MDBRow>
         <MDBRow>
         <textarea rows="6"   className="promo_input"  placeholder='Enter your post content here...' type='text'
         value={this.state.cta_post}  name="cta_post"  onChange={this.changeHandler} />
         </MDBRow>
         <MDBRow style={{marginTop:'15px'}}> 
           <MDBCol md='8'>
           <MDBRow >
                            <MDBCol md="2" className="ap_image">
                              <span>
                                <i className="zmdi zmdi-plus"></i>
                                <input
                                  type="file"
                                  name="otherImages"
                                  onChange={this.onUploadOtherImage}
                                />
                              </span>
                            </MDBCol>
                            {/* {this.state.otherImages.map((n, i) => ( */}
                              <MDBCol md="2" className="ap_image">
                                <img src={this.state.otherImages}
                                  alt=""
                                  style={{
                                    height: "60px",
                                    width: "60px",
                                    borderRadius: "10px"
                                  }}
                                />

                                {/* <div className="get-image1">
                                  <img
                                    src={cross_img}
                                    alt=""
                                    style={{
                                      height: "10px",
                                      width: "10px",
                                      backgroundColor: "red",
                                      borderRadius: "50%",
                                      padding: "2px",
                                      marginTop: "-3px"
                                    }}
                                    onClick={() =>
                                      this.delete_other_image(nid)
                                    }
                                  />
                                </div>
                             */}
                             </MDBCol>
                            {/* ))} */}
                          </MDBRow>
                         
           </MDBCol>
           <MDBCol md='4' className='ap_contant1'>
             <span><img src={attach} /></span>
           Attatch a document
           </MDBCol>
         </MDBRow>
           
      <MDBRow>
        <MDBCol md='4'>
        <select className="promo_input" value={this.state.cta_drop}  name="cta_drop"  onChange={this.changeHandler}>
         <option>Choose CTA</option>
         <option>Book</option>
         <option>Order</option>
         <option>Shop</option>
         <option>Learn More</option>
         <option>Sign Up</option>
         <option>Get Offer</option>
       </select>
        </MDBCol>
        <MDBCol md='8'>
        <input   className="promo_input"  placeholder="https://www.example.com" type='url' 
         value={this.state.cta_url}  name="cta_url"  onChange={this.changeHandler}
         />
        </MDBCol>
      </MDBRow>

         
    </div>
   
    <div id="expiry" class="tab-pane fade">
    <MDBRow>
           <MDBCol md='8' className='ap_subhead1'>
           Write your post
           </MDBCol>
           <MDBCol md='4' className='ap_subhead2'>
           100-150 Characters
           </MDBCol>
         </MDBRow>
         <MDBRow>
           
         <textarea rows="6"   className="promo_input"  placeholder='Enter your post content here...' type='text'
         value={this.state.expiry_post}  name="expiry_post"  onChange={this.changeHandler} />
         </MDBRow>
         <MDBRow style={{marginTop:'15px'}}> 
           <MDBCol md='8'>
           <MDBRow >
                            <MDBCol md="2" className="ap_image">
                              <span>
                                <i className="zmdi zmdi-plus"></i>
                                <input
                                  type="file"
                                  name="otherImages"
                                  onChange={this.onUploadOtherImage}
                                />
                              </span>
                            </MDBCol>
                            {/* {this.state.otherImages.map((n, i) => ( */}
                              <MDBCol md="2" className="ap_image">
                                <img src={this.state.otherImages}
                                  alt=""
                                  style={{
                                    height: "60px",
                                    width: "60px",
                                    borderRadius: "10px"
                                  }}
                                />

                                {/* <div className="get-image1">
                                  <img
                                    src={cross_img}
                                    alt=""
                                    style={{
                                      height: "10px",
                                      width: "10px",
                                      backgroundColor: "red",
                                      borderRadius: "50%",
                                      padding: "2px",
                                      marginTop: "-3px"
                                    }}
                                    onClick={() =>
                                      this.delete_other_image(n.id)
                                    }
                                  />
                                </div>
                              */}
                              </MDBCol>
                            {/* ))} */}
                          </MDBRow>
                         
           </MDBCol>
           <MDBCol md='4' className='ap_contant1'>
             <span><img src={attach} /></span>
           Attatch a document
           </MDBCol>
         </MDBRow>
        
    </div>
   
  </div>
         
         {/* <MDBRow>
           <MDBCol md='12'>
           <textarea rows='6' className='ap_textarea' placeholder='Enter your post content here...'/>
           </MDBCol>
         </MDBRow>
         <MDBRow style={{marginTop:'15px'}}>
           <MDBCol md='1' className='ap_check'>
             <Checkbox />
           </MDBCol>
           <MDBCol md='5' className='ap_contant2'>
           Add a CTA
           </MDBCol>
           <MDBCol md='1' className='ap_check'>
             <Checkbox/>
           </MDBCol>
           <MDBCol md='5' className='ap_contant2'>
           Post an event
           </MDBCol>
         </MDBRow>
         <MDBRow style={{marginTop:'15px'}}>
           <MDBCol md='1' className='ap_check'>
             <Checkbox/>
           </MDBCol>
           <MDBCol md='5' className='ap_contant2'>
           Make this post a promoyional post
           </MDBCol>
           <MDBCol md='1' className='ap_check'>
             <Checkbox/>
           </MDBCol>
           <MDBCol md='5' className='ap_contant2'>
           Report this post after expairy 
           </MDBCol>
         </MDBRow>
         */}
         <MDBRow style={{marginTop:'15px'}}>
          <MDBCol md='6'>
            <MDBBtn className="draft_btn"  onClick={this.draftClicked}>
            Save as Draft
            </MDBBtn>
          </MDBCol>

          <MDBCol md='6'>
            <MDBBtn className="cp_btn" onClick={this.confirmPost}> 
            Confirm Post
            </MDBBtn>
          </MDBCol>
        </MDBRow>
   
        </div>
        
        
     </div>
      
    </div>
  </div>
  


                </MDBCol>
                <MDBCol md='8' >
                  {/* <div className='pp_contant6'>Your post will be published</div> */}
                </MDBCol>
            </MDBRow>
            </MDBContainer>
      </div>
    )
  }
}
