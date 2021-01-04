import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React, { Component } from 'react'
import es_img1 from "./assets/es_img1.png";
import edit from "./assets/edit.png";
import delete_icon from "./assets/delete_icon.png";
import { Checkbox } from '@material-ui/core';
import {Add_Promotional ,All_Promotional_list, Delete_Promotional_by_id, Promotional_by_id} from "./apis/location";
import { secure_pin } from "../config";
import cross_img from "./assets/cross_img.png";
import attach from "./assets/attach.png"
import swal from "sweetalert";
import Moment from 'moment';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
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
  type:"promotional",
  show_date:'',
  show_details:'',
  show_title:'',
  show_active_status:'',
  promo_list:[]
}
componentDidMount = () =>{
 
  const data = {
    secure_pin,
    user_id: localStorage.getItem("UserId"),
    location_id: this.props.match.params.locationId
  }
  All_Promotional_list(data)
  .then(resp => {
    console.log(resp)
     this.setState({
      promo_list: resp.data.promotional_details,
    })
console.log("ppk",this.state.promo_list)
  })
}
draftClicked = () => {
  if(this.state.type=="promotional"){
    // this.setState({
    //   promo_start_date: Moment(this.state.promo_start_date).format('DD-MM-YYYY'),
      
    // })
    console.log("kkoo",this.state.promo_start_date)
    const data = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.match.params.locationId,
      submit_type:this.state.type,
      title:this.state.offer_title,
      start_date:this.state.promo_start_date + "T" + this.state.promo_start_time,
      end_date:this.state.promo_end_date + "T" + this.state.promo_end_time,
      details:this.state.offer_details,
      redeem_offer:this.state.redeem_offer,
      coupon_code:this.state.coupon_code,
      terms_condi:this.state.terms,
      save_status:"draft",
      attached_images: this.state.otherImages,
    }
    Add_Promotional(data)
    .then(resp => {
      console.log(resp)
      
    })
      console.log(data)
  }

  if(this.state.type=="event"){
    const data = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.match.params.locationId,
      submit_type:this.state.type,
      save_status:"draft",
      attached_images: this.state.otherImages,
      start_date:this.state.event_start_date + "T" + this.state.event_start_time,
      end_date:this.state.event_end_date + "T" + this.state.event_end_time,
      title:this.state.event_title,
      details:this.state.event_details,
      
    }
    Add_Promotional(data)
    .then(resp => {
      console.log(resp)
      
    })
      console.log(data)
  }
  if(this.state.type=="cta"){
    const data = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.match.params.locationId,
      submit_type:this.state.type,
      save_status:"draft",
      attached_images: this.state.otherImages,
      details:this.state.cta_post,
      category:this.state.cta_drop,
      link:this.state.cta_url,
      
    }
    Add_Promotional(data)
    .then(resp => {
      console.log(resp)
      
    })
      console.log(data)
  }

  if(this.state.type=="report"){
    const data = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.match.params.locationId,
      submit_type:this.state.type,
      save_status:"draft",
      attached_images: this.state.otherImages,
      details:this.state.expiry_post,
      
    }
    Add_Promotional(data)
    .then(resp => {
      console.log(resp)
      
    })
      console.log(data)
  }
 
}
// {"secure_pin":"digimonk","user_id":"10","location_id":"45","submit_type":"promotional","title":"test promotional",
// "start_date":"11-12-2020 13:25","end_date":"11-12-2020 13:25","details":"this is testing promotional........",
// "coupon_code":"CDFE1123","redeem_offer":"24","terms_condi":"testing terms conditionsssssss....","save_status":"draft",
// "attached_images":[{"promotional_image":"data:image/png;base64"},{"promotional_image":"data:image/png;base64"}]}
confirmPost = () => {
  if(this.state.type=="promotional"){
    const data = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.match.params.locationId,
      submit_type:this.state.type,
      title:this.state.offer_title,
      start_date:this.state.promo_start_date + "T" + this.state.promo_start_time,
      end_date:this.state.promo_end_date + "T" + this.state.promo_end_time,
      details:this.state.offer_details,
      redeem_offer:this.state.redeem_offer,
      coupon_code:this.state.coupon_code,
      terms_condi:this.state.terms,
      save_status:"active",
      attached_images: this.state.otherImages,
    }
    Add_Promotional(data)
    .then(resp => {
      console.log(resp)
      
    })
      console.log(data)
  }

  if(this.state.type=="event"){
    const data = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.match.params.locationId,
      submit_type:this.state.type,
      save_status:"active",
      attached_images: this.state.otherImages,
      start_date:this.state.event_start_date + "T" + this.state.event_start_time,
      end_date:this.state.event_end_date + "T" + this.state.event_end_time,
      title:this.state.event_title,
      details:this.state.event_details,
      
    }
    Add_Promotional(data)
    .then(resp => {
      console.log(resp)
      
    })
      console.log(data)
  }
  if(this.state.type=="cta"){
    const data = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.match.params.locationId,
      submit_type:this.state.type,
      save_status:"active",
      attached_images: this.state.otherImages,
      details:this.state.cta_post,
      category:this.state.cta_drop,
      link:this.state.cta_url,
      
    }
    Add_Promotional(data)
    .then(resp => {
      console.log(resp)
      
    })
      console.log(data)
  }

  if(this.state.type=="report"){
    const data = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.match.params.locationId,
      submit_type:this.state.type,
      save_status:"active",
      attached_images: this.state.otherImages,
      details:this.state.expiry_post,
      
    }
    Add_Promotional(data)
    .then(resp => {
      console.log(resp)
      
    })
      console.log(data)
  }
 
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

        var ob={"promotional_image":e.target.result}
        this.setState({ otherImages: this.state.otherImages.concat(ob) });

      var locationId = this.props.match.params.locationId;
    
      this.setState({ otherImagesLoading: true });
    

     
    };
  };

  delete_other_images= image_id => {

console.log(image_id);

if(image_id){

// var a=this.state.otherImages;
// a.splice(image_id,1);


//          this.setState({otherImages:a});

}
  }

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
  EditPost = (id)=>e=>{
console.log(id);
const data={
  "secure_pin":"digimonk",
  "user_id":localStorage.getItem("UserId"),
  "promotional_id":id}

Promotional_by_id(data)

.then(resp => {
  console.log(resp)
  
})

.catch(resp=>{

})
  }

  DeletePost= (id)=>e=>{
    console.log(id);
    const data={
      "secure_pin":"digimonk",
      "user_id":localStorage.getItem("UserId"),
      "promotional_id":id}


    Delete_Promotional_by_id(data)

    .then(resp => {
      console.log(resp)
      
    })

    .catch(resp=>{

    })
      }


  render() {
    console.log("state",this.state);
    var OtherImages=this.state.otherImages;

    var AllImg;
    if(OtherImages){
      var ii=-1;
     AllImg= OtherImages.map(o=>{

      ii=ii+1;
       return( <MDBCol md="2" className="ap_image">
       <img src={o.promotional_image}
         alt=""
         style={{
           height: "60px",
           width: "60px",
           borderRadius: "10px"
         }}
       />
{/*        
       <div className="get-image1"
        onClick={console.log(ii) }
        
        >
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
                                    
                                  />
                                </div> */}
                                
                                </MDBCol>)
     })
    }
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
                                Last Week
                              </option>
                              <option
                              value = "month"
                              >
                                Last Month
                              </option>

                              <option
                              value= "3 months"
                              >
                                Last 3 Months
                              </option>

                              <option
                              value= "6 months"
                              >
                                Last 6 Months
                              </option>
                              <option
                              value = "year"
                              >
                                Last Year
                              </option>
                            </select>
</div>
<MDBRow className='pp_margin1' >
  <MDBCol md='2' style={{paddingRight:'0px'}}>
  <img src={require("../images/promo1.png")}  alt="" className='pp_icon' />
  </MDBCol>

  <MDBCol md='7' style={{paddingRight:'0px'}}>
<div className='pp_contant1'>15</div>
<div className='pp_contant2'>Total Active Post</div>
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
<div className='pp_contant2'>Total Post Views</div>
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
<div className='pp_contant2'>Total Post Clicks</div>
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
<div className='pp_contant2'>Scheduled Posts</div>
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
<div className='pp_contant2'>Expiry Posts</div>
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
{this.state.promo_list.length>0?
<div class="scrollbar">
  {this.state.promo_list.map(d =>(
    <div>
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
                <div className="pp_contant2">{d.date}</div>
                  <div className="pp_contant3">{d.title}</div>
                  <div className="pp_contant2">{d.details}</div>
                  
                  <div className="pp_contant2">
                    <img src={edit} onClick={this.EditPost(d.id)} alt="" className="es_icon" data-toggle="modal" data-target="#myModal"/>
                    <img src={delete_icon} onClick={this.DeletePost(d.id)} alt="" className="es_icon" />
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
  {d.save_status=="active"?<MDBBtn className='pp_status_active'>Active</MDBBtn>:null}
  {d.save_status=="draft"?<MDBBtn className='pp_status_active'>Draft</MDBBtn>:null}
</MDBCol>
    </MDBRow>
  </MDBCol>

</MDBRow>
 <hr/>
 </div>
  ))}

{/* <hr/>
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

</MDBRow> */}

</div>
               :<div className='no_faq' style={{marginTop:'40px',marginBottom:'40px'}}>No Promotional Post To Show</div>}
                </div>
              </MDBCol>
              <MDBCol md='4' className='review_container'>
                <MDBBtn className='pp_create_np' data-toggle="modal" data-target="#myModal">Create A New Post</MDBBtn>
                
                
                
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
    <li ><a data-toggle="tab" href="#promo_post" className='active' onClick={ () => {this.setState({type:"promotional"})}}> Promotional Post</a></li>
    <li ><a data-toggle="tab" href="#post_event" onClick={ () => {this.setState({type:"event"})}}>Post An Event</a></li>
    <li><a data-toggle="tab" href="#add_cta" onClick={ () => {this.setState({type:"cta"})}}>Add A CTA</a></li>
    <li><a data-toggle="tab" href="#expiry" onClick={ () => {this.setState({type:"report"})}}>Report This Post After Expiry</a></li>
  </ul>
          </div>
    

  <div class="tab-content">
    <div id="promo_post" class="tab-pane fade  active" style={{opacity:'1'}}>
    {/* <MDBRow>
           <MDBCol md='8' className='ap_subhead1'>
           Write Your Post
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
                            {/* {this.state.otherImages.map(n => ( */}
                              {/* <MDBCol md="2" className="ap_image">
                                <img src={this.state.otherImages}
                                  alt=""
                                  style={{
                                    height: "60px",
                                    width: "60px",
                                    borderRadius: "10px"
                                  }}
                                />
                                </MDBCol> */}
                                {AllImg}

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
                              
                            {/* ))} */}
                          </MDBRow>
                         
           </MDBCol>
           {/* <MDBCol md='4' className='ap_contant1'>
             <span><img src={attach} /></span>
           Attach A Document
           </MDBCol> */}
         </MDBRow>
         <MDBRow>
           
         <input   className="promo_input"  placeholder="Offer Title " type='text' 
          value={this.state.offer_title}  name="offer_title"  onChange={this.changeHandler}/>
         </MDBRow>
         <MDBRow>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="Start Date " type='date'  style={{marginLeft:'0px'}} 
         value={this.state.promo_start_date}  name="promo_start_date"  onChange={this.changeHandler} />
         </MDBCol>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="Start Time " type='time'  style={{ marginRight:'0px'}}
         value={this.state.promo_start_time}  name="promo_start_time"  onChange={this.changeHandler}/>
         </MDBCol>
         </MDBRow>

         <MDBRow>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="End Date " type='date'  style={{marginLeft:'0px'}} 
         value={this.state.promo_end_date}  name="promo_end_date"  onChange={this.changeHandler}/>
         </MDBCol>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="End Time " type='time'  style={{ marginRight:'0px'}}
         value={this.state.promo_end_time}  name="promo_end_time"  onChange={this.changeHandler}/>
         </MDBCol>
         </MDBRow>
        <div className='ap_subhead1'>Add More Details (Optional)</div>

         <MDBRow>
         <textarea rows="3"   className="promo_input"  placeholder="Offer Details " type='text'
         value={this.state.offer_details}  name="offer_details"  onChange={this.changeHandler} />
         </MDBRow>

         <MDBRow>
         <input   className="promo_input"  placeholder="Coupon Code (Optional) " type='text' 
         value={this.state.coupon_code}  name="coupon_code"  onChange={this.changeHandler}/>
         </MDBRow>
         <MDBRow>
         <input   className="promo_input"  placeholder="Link To Redeem Offer (Optional) " type='text' 
         value={this.state.redeem_offer}  name="redeem_offer"  onChange={this.changeHandler}/>
         </MDBRow>

         <MDBRow>
         <input   className="promo_input"  placeholder="Terms & Conditions  (Optional) " type='text' 
         value={this.state.terms}  name="terms"  onChange={this.changeHandler}/>
         </MDBRow>
    </div>
   
    <div id="post_event" class="tab-pane fade">
    {/* <MDBRow>
           <MDBCol md='8' className='ap_subhead1'>
           Write Your Post
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
                            {/* {this.state.otherImages.map(n => ( */}
                              {/* <MDBCol md="2" className="ap_image">
                                <img src={this.state.otherImages}
                                  alt=""
                                  style={{
                                    height: "60px",
                                    width: "60px",
                                    borderRadius: "10px"
                                  }}
                                /> </MDBCol> */}

                                {AllImg} 

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
                             
                            {/* ))} */}
                          </MDBRow>
                         
           </MDBCol>
           {/* <MDBCol md='4' className='ap_contant1'>
             <span><img src={attach} /></span>
           Attach a document
           </MDBCol> */}
         </MDBRow>
         <MDBRow>
           
         <input   className="promo_input"  placeholder="Event Title " type='text' 
          value={this.state.event_title}  name="event_title"  onChange={this.changeHandler}/>
         </MDBRow>
         <MDBRow>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="Start Date " type='date'  style={{marginLeft:'0px'}} 
         value={this.state.event_start_date}  name="event_start_date"  onChange={this.changeHandler}/>
         </MDBCol>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="Start time " type='time'  style={{ marginRight:'0px'}}
         value={this.state.event_start_time}  name="event_start_time"  onChange={this.changeHandler}/>
         </MDBCol>
         </MDBRow>

         <MDBRow>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="End Date " type='date'  style={{marginLeft:'0px'}} 
         value={this.state.event_end_date}  name="event_end_date"  onChange={this.changeHandler}/>
         </MDBCol>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="End Time " type='time'  style={{ marginRight:'0px'}}
         value={this.state.event_end_time}  name="event_end_time"  onChange={this.changeHandler}/>
         </MDBCol>
         </MDBRow>
        <div className='ap_subhead1'>Add More Details (Optional)</div>

         <MDBRow>
         <textarea rows="3"   className="promo_input"  placeholder="Event Details " type='text'
         value={this.state.event_details}  name="event_details"  onChange={this.changeHandler} />
         </MDBRow>

         
    </div>
   
    <div id="add_cta" class="tab-pane fade">
    <MDBRow>
           <MDBCol md='8' className='ap_subhead1'>
           Write Your Post
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
                            {/* {this.state.otherImages.map(n => ( */}
                              {/* <MDBCol md="2" className="ap_image">
                                <img src={this.state.otherImages}
                                  alt=""
                                  style={{
                                    height: "60px",
                                    width: "60px",
                                    borderRadius: "10px"
                                  }}
                                />
 </MDBCol> */}
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

                             {AllImg}
                            
                            {/* ))} */}
                          </MDBRow>
                         
           </MDBCol>
           {/* <MDBCol md='4' className='ap_contant1'>
             <span><img src={attach} /></span>
           Attach A Document
           </MDBCol> */}
         </MDBRow>
           
      <MDBRow>
        <MDBCol md='5'>
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
        <MDBCol md='7'>
        <input   className="promo_input"  placeholder="https://www.example.com" type='url' 
         value={this.state.cta_url}  name="cta_url"  onChange={this.changeHandler}
         />
        </MDBCol>
      </MDBRow>

         
    </div>
   
    <div id="expiry" class="tab-pane fade">
    <MDBRow>
           <MDBCol md='8' className='ap_subhead1'>
           Write Your Post
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
                            {/* {this.state.otherImages.map(n => ( */}
                              {/* <MDBCol md="2" className="ap_image">
                                <img src={this.state.otherImages}
                                  alt=""
                                  style={{
                                    height: "60px",
                                    width: "60px",
                                    borderRadius: "10px"
                                  }}
                                />
                                </MDBCol> */}

                                {AllImg}

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
                              
                            {/* ))} */}
                          </MDBRow>
                         
           </MDBCol>
           {/* <MDBCol md='4' className='ap_contant1'>
             <span><img src={attach} /></span>
           Attach A Document
           </MDBCol> */}
         </MDBRow>
        
    </div>
   
  </div>
         
         {/* <MDBRow>
           <MDBCol md='8'>
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
            Save As Draft
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
