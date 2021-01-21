import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React, { Component } from 'react'
import es_img1 from "./assets/es_img1.png";
import edit from "./assets/edit.png";
import delete_icon from "./assets/delete_icon.png";
import { Checkbox } from '@material-ui/core';
import {Add_Promotional ,All_Promotional_list, Delete_Promotional_by_id, Promotional_Analytics, Promotional_by_id
,Update_Promotional_by_id} from "./apis/location";
import { secure_pin } from "../config";
import cross_img from "./assets/cross_img.png";
import attach from "./assets/attach.png"
import swal from "sweetalert";
import Moment from 'moment';
import Spinner from "./common/Spinner";
import Axios from "axios";
import Cropper from "./utils/cropper";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
export default class promotional_post extends Component {

state={
  loading:false,
  otherImages_event:[],
  otherImages_promo:[],
  otherImages_event_get:[],
  otherImages_promo_get:[],
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
  cta_drop:'',
  post_schedule_drop:"Post Now",
  get_post_schedule_drop:"",
  post_schedule_date:'',
  cta_url:'',
  type:"promotional",
  promo_id:'',
  active_status:'active',
  promo_list:[],
  promo_list_img:[],
  expiry_post:false,
  add_cta:false,
  eshow_err:false,
  pshow_err:false,
  schDate_err:"",
  pt_err:"",
  psd_err:"",
  ped_err:"",
  pd_err:"",
  et_err:"",
  esd_err:"",
  eed_err:"",
  ed_err:"",
  meshow_err:false,
  mpshow_err:false,
  mpt_err:"",
  mpsd_err:"",
  mped_err:"",
  mpd_err:"",
  met_err:"",
  mesd_err:"",
  meed_err:"",
  med_err:"",
  get_expiry_post:false,
  get_add_cta:false,
save_status:null,


  ActivePost:0,
             ExpirePost:0,
            PostClicks: 0,
            PostViews: 0,
            SchedulePosts: 0,
            ActivePostPer:0,
            PostClicksPer:0,
            PostViewsPer:0,
            SchedulePostsPer:0,
            ExpirePostPer:0,
             
}

UpdateFilter =e=>{
  console.log(e.target.value);
  var filter=e.target.value;

  const data2={ secure_pin,
    user_id: localStorage.getItem("UserId"),
location_id: this.props.match.params.locationId,
"filter_type":filter}


  Promotional_Analytics(data2)
  .then(resp => {
    console.log(resp)
     this.setState({
       ActivePost:resp.data.avtive_posts,
       ExpirePost:resp.data.expire_posts,
      PostClicks: resp.data.post_clicks,
      PostViews: resp.data.post_views,
      SchedulePosts: resp.data.schedule_posts,
       
      
    }).
console.log("ppk",this.state)
  }).catch(resp=>{
    console.log(resp)
    
        })
}

componentDidMount = () =>{
 
  const data = {
    secure_pin,
    user_id: localStorage.getItem("UserId"),
    location_id: this.props.match.params.locationId
  }
  All_Promotional_list(data)
  .then(resp => {
    console.log("hh",resp)
     this.setState({
      promo_list: resp.data.promotional_details,
    }).
console.log("ppk",this.state.promo_list)
  }).catch(resp=>{
    console.log(resp)
        })

        const data2={ secure_pin,
          user_id: localStorage.getItem("UserId"),
    location_id: this.props.match.params.locationId,
    "filter_type":"last week"}

        Promotional_Analytics(data2)
        .then(resp => {
          console.log(resp)
          if(resp.data.message !== 'No data ')
           this.setState({
             ActivePost:resp.data.avtive_posts,
             ExpirePost:resp.data.expire_posts,
            PostClicks: resp.data.post_clicks,
            PostViews: resp.data.post_views,
            SchedulePosts: resp.data.schedule_posts,

            ActivePostPer:resp.data.avtive_posts_per,
            ExpirePostPer:resp.data.expire_posts_per,
            PostClicksPer: resp.data.post_clicks_per,
            PostViewsPer: resp.data.post_views_per,
            SchedulePostsPer: resp.data.schedule_posts_per,

             
            
          }).
      console.log("ppk",this.state)
        }).catch(resp=>{
          console.log(resp)
              })
}
changeHandler = event => {
  this.setState({ [event.target.name]: event.target.value });
  console.log(event.target.name)
  console.log(event.target.value)
  if (event.target.name == "post_schedule_drop") {
    this.setState({
      post_schedule_drop:event.target.value
    })
   
  }
  console.log("bhai",this.state.post_schedule_drop)
  console.log("bhai1",this.state.active_status)
  if(event.target.value == "Schedule Post"){
    this.setState({
      active_status:'schedule'
    })
  }
  else if(event.target.value == "Post Now"){
    this.setState({
      active_status:'active'
    })
  }
  if (event.target.name == "expiry_post") {
    this.setState({
      expiry_post:!this.state.expiry_post
    })
  }
  if (event.target.name == "add_cta") {
    this.setState({
      add_cta:!this.state.add_cta
    })
  }
  if (event.target.name == "get_expiry_post") {
    this.setState({
      get_expiry_post:!this.state.get_expiry_post
    })
  }
  if (event.target.name == "get_add_cta") {
    this.setState({
      get_add_cta:!this.state.get_add_cta
    })
  }
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

draftClicked = () => {
  
  if(this.state.offer_title == ''){
    this.setState({
      pshow_err:true,
      pt_err:"Title can not be empty",
    })
  }
  else{
   this.setState({
    pshow_err:false,
    pt_err:""
   })
  }
  if(this.state.promo_start_date  ==  '')
  {
    this.setState({
      pshow_err:true,
      psd_err:"Start date can not be empty",
    })
  }
  else{
    this.setState({
     pshow_err:false,
     psd_err:""
    })
   }
  if( this.state.promo_end_date ==  '')
  {
    this.setState({
      pshow_err:true,
      ped_err:"End date can not be empty",
    })
  }
  else{
    this.setState({
     pshow_err:false,
     ped_err:""
    })
   }
  if( this.state.offer_details ==  '')
  {
    this.setState({
      pshow_err:true,
      pd_err:"Detail can not be empty",
    })
  }
  else{
    this.setState({
     pshow_err:false,
     pd_err:""
    })
   }

  if(this.state.event_title == ''){
    this.setState({
      eshow_err:true,
      et_err:"Title can not be empty",
    })
  }
  else{
    this.setState({
     eshow_err:false,
     et_err:""
    })
   }
  if(this.state.event_start_date  ==  '')
  {
    this.setState({
      eshow_err:true,
      esd_err:"Start date can not be empty",
    })
  }
  else{
    this.setState({
     eshow_err:false,
     esd_err:""
    })
   }
  if( this.state.event_end_date ==  '')
  {
    this.setState({
      eshow_err:true,
      eed_err:"End date can not be empty",
    })
  }
  else{
    this.setState({
     eshow_err:false,
     eed_err:""
    })
   }
  if( this.state.event_details ==  '')
  {
    this.setState({
      eshow_err:true,
      ed_err:"Detail can not be empty",
    })
  }

  else{
    this.setState({
     eshow_err:false,
     ed_err:""
    })
   }
  if(!this.state.pshow_err && (this.state.offer_title != "" || this.state.offer_details != "" || this.state.promo_end_date != ""
  || this.state.promo_start_date != "") ){
  if(this.state.type=="promotional"){
    // this.setState({
    //   promo_start_date: Moment(this.state.promo_start_date).format('DD-MM-YYYY'),
      
    // })
    console.log("332244",this.state.promo_start_time)
    if(!this.state.promo_start_time){
      this.setState({
        promo_start_time :"00:00"
      })
      console.log("hi5")
    }
    console.log("332244",this.state.promo_start_time)
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
      save_status:'draft',
      attached_images: this.state.otherImages_promo,
      category:this.state.cta_drop,
      link:this.state.cta_url,
      report_expire:this.state.expiry_post,
      cta:this.state.add_cta,
    }
    this.setState({
      loading:true
    })
    Add_Promotional(data)
   
    .then(resp => {
      console.log(resp)
      this.setState({
        loading:false
      })

      const data = {
        secure_pin,
        user_id: localStorage.getItem("UserId"),
        location_id: this.props.match.params.locationId
      }
      swal({
        title: "Post Added Successfully",
        // text: "Post added ",
        icon: "success",
        button: "Ok",
      });

this.setState({
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
  otherImages_promo:[]
})

      All_Promotional_list(data)
      .then(resp => {
        console.log(resp)
         this.setState({
          promo_list: resp.data.promotional_details,
        }).
    console.log("ppk",this.state.promo_list)
      }).catch(resp=>{
        console.log(resp)
            })
      
    }).catch(resp=>{
      console.log(resp)
          })
   
      console.log(data)
  }
  }
  if(!this.state.eshow_err  && !(this.state.event_title == "" || this.state.event_details == "" || this.state.event_end_date == ""
  || this.state.event_start_date == "")){
  if(this.state.type=="event"){
    const data = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.match.params.locationId,
      submit_type:this.state.type,
      save_status:'draft',
      attached_images: this.state.otherImages_event,
      start_date:this.state.event_start_date + "T" + this.state.event_start_time,
      end_date:this.state.event_end_date + "T" + this.state.event_end_time,
      title:this.state.event_title,
      details:this.state.event_details,
      category:this.state.cta_drop,
      link:this.state.cta_url,
      report_expire:this.state.expiry_post,
      cta:this.state.add_cta,
    }
    this.setState({
      loading:true
    })
    Add_Promotional(data)
    .then(resp => {
      console.log(resp)
      this.setState({
        loading:false
      })
      const data = {
        secure_pin,
        user_id: localStorage.getItem("UserId"),
        location_id: this.props.match.params.locationId
      }
      swal({
        title: "Post Added Successfully",
        // text: "Post added ",
        icon: "success",
        button: "Ok",
      });
      this.setState({
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
        otherImages_event:[],
      })
      
      All_Promotional_list(data)
      .then(resp => {
        console.log(resp)
         this.setState({
          promo_list: resp.data.promotional_details,
        }).
    console.log("ppk",this.state.promo_list)
      }).catch(resp=>{
        console.log(resp)
            })
    }).catch(resp=>{
      console.log(resp)
          })
   
      console.log(data)
  }}
  
}

confirmPost = () => {
  
  if(this.state.post_schedule_drop=="Schedule Post" && this.state.post_schedule_date == ''){
    
    this.setState({
      pshow_err:true,
      schDate_err:"Scheduled Date can not be empty",
    })
  }
  else{
   this.setState({
    pshow_err:false,
    schDate_err:""
   })
  }
  if(this.state.offer_title == ''){
    this.setState({
      pshow_err:true,
      pt_err:"Title can not be empty",
    })
  }
  else{
   this.setState({
    pshow_err:false,
    pt_err:""
   })
  }
  if(this.state.promo_start_date  ==  '')
  {
    this.setState({
      pshow_err:true,
      psd_err:"Start date can not be empty",
    })
  }
  else{
    this.setState({
     pshow_err:false,
     psd_err:""
    })
   }
  if( this.state.promo_end_date ==  '')
  {
    this.setState({
      pshow_err:true,
      ped_err:"End date can not be empty",
    })
  }
  else{
    this.setState({
     pshow_err:false,
     ped_err:""
    })
   }
  if( this.state.offer_details ==  '')
  {
    this.setState({
      pshow_err:true,
      pd_err:"Detail can not be empty",
    })
  }
  else{
    this.setState({
     pshow_err:false,
     pd_err:""
    })
   }

  if(this.state.event_title == ''){
    this.setState({
      eshow_err:true,
      et_err:"Title can not be empty",
    })
  }
  else{
    this.setState({
     eshow_err:false,
     et_err:""
    })
   }
  if(this.state.event_start_date  ==  '')
  {
    this.setState({
      eshow_err:true,
      esd_err:"Start date can not be empty",
    })
  }
  else{
    this.setState({
     eshow_err:false,
     esd_err:""
    })
   }
  if( this.state.event_end_date ==  '')
  {
    this.setState({
      eshow_err:true,
      eed_err:"End date can not be empty",
    })
  }
  else{
    this.setState({
     eshow_err:false,
     eed_err:""
    })
   }
  if( this.state.event_details ==  '')
  {
    this.setState({
      eshow_err:true,
      ed_err:"Detail can not be empty",
    })
  }

  else{
    this.setState({
     eshow_err:false,
     ed_err:""
    })
   }
   console.log("this.state.otherImages_promo",this.state.otherImages_promo)
   if(!this.state.pshow_err && !(this.state.offer_title == "" || this.state.offer_details == "" || this.state.promo_end_date == ""
  || this.state.promo_start_date == "")){
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
      save_status:this.state.active_status,
      attached_images: this.state.otherImages_promo,
      category:this.state.cta_drop,
      link:this.state.cta_url,
      report_expire:this.state.expiry_post,
      cta:this.state.add_cta,
      schedule_date:this.state.post_schedule_date
    }
    console.log("laa7",this.state.add_cta)
    console.log("laa8",this.state.expiry_post)
    this.setState({
      loading:true
    })
    console.log("datap1",data)
    Add_Promotional(data)
    .then(resp => {
      console.log("redt",resp)
      this.setState({
        loading:false
      })
      const data = {
        secure_pin,
        user_id: localStorage.getItem("UserId"),
        location_id: this.props.match.params.locationId
      }
      swal({
        title: "Post Added Successfully",
        // text: "Post added ",
        icon: "success",
        button: "Ok",
      });
     
      this.setState({
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
        post_schedule_date:'',
        otherImages_promo:[],
      })
      
      All_Promotional_list(data)
      .then(resp => {
        console.log(resp)
         this.setState({
          promo_list: resp.data.promotional_details,
        }).
    console.log("ppk",this.state.promo_list)
      }).catch(resp=>{
        console.log(resp)
            })
    }).catch(resp=>{
      console.log(resp)
          })
  
      console.log(data)
  }}
  if(!this.state.eshow_err  && !(this.state.event_title == "" || this.state.event_details == "" || this.state.event_end_date == ""
  || this.state.event_start_date == "")){
  if(this.state.type=="event"){
    const data = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.match.params.locationId,
      submit_type:this.state.type,
      save_status:this.state.active_status,
      attached_images: this.state.otherImages_event,
      start_date:this.state.event_start_date + "T" + this.state.event_start_time,
      end_date:this.state.event_end_date + "T" + this.state.event_end_time,
      title:this.state.event_title,
      details:this.state.event_details,
      category:this.state.cta_drop,
      link:this.state.cta_url,
      report_expire:this.state.expiry_post,
      cta:this.state.add_cta,
      schedule_date:this.state.post_schedule_date
      
    }
    this.setState({
      loading:true
    })
    Add_Promotional(data)
    .then(resp => {
      console.log(resp)
      this.setState({
        loading:false
      })
      const data = {
        secure_pin,
        user_id: localStorage.getItem("UserId"),
        location_id: this.props.match.params.locationId
      }
      swal({
        title: "Post Added Successfully",
        // text: "Post added ",
        icon: "success",
        button: "Ok",
      });
      this.setState({
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
        post_schedule_date:'',
        otherImages_event:[],
      })
      
      All_Promotional_list(data)
      .then(resp => {
        console.log(resp)
         this.setState({
          promo_list: resp.data.promotional_details,
        }).
    console.log("ppk",this.state.promo_list)
      }).catch(resp=>{
        console.log(resp)
            })
    }).catch(resp=>{
      console.log(resp)
          })
    
      console.log(data)
  }}
 
}

editDraftPost = () => {
  
    this.setState({
      active_status:'draft'
    })
  
  if(this.state.offer_title == ''){
    this.setState({
      mpshow_err:true,
      mpt_err:"Title can not be empty",
    })
  }
  else{
   this.setState({
    mpshow_err:false,
    mpt_err:""
   })
  }
  if(this.state.promo_start_date  ==  '')
  {
    this.setState({
      mpshow_err:true,
      mpsd_err:"Start date can not be empty",
    })
  }
  else{
    this.setState({
     mpshow_err:false,
     mpsd_err:""
    })
   }
  if( this.state.promo_end_date ==  '')
  {
    this.setState({
      mpshow_err:true,
      mped_err:"End date can not be empty",
    })
  }
  else{
    this.setState({
     mpshow_err:false,
     mped_err:""
    })
   }
  if( this.state.offer_details ==  '')
  {
    this.setState({
      mpshow_err:true,
      mpd_err:"Detail can not be empty",
    })
  }
  else{
    this.setState({
     mpshow_err:false,
     mpd_err:""
    })
   }

  if(this.state.event_title == ''){
    this.setState({
      meshow_err:true,
      met_err:"Title can not be empty",
    })
  }
  else{
    this.setState({
     meshow_err:false,
     met_err:""
    })
   }
  if(this.state.event_start_date  ==  '')
  {
    this.setState({
      meshow_err:true,
      mesd_err:"Start date can not be empty",
    })
  }
  else{
    this.setState({
     meshow_err:false,
     mesd_err:""
    })
   }
  if( this.state.event_end_date ==  '')
  {
    this.setState({
      meshow_err:true,
      meed_err:"End date can not be empty",
    })
  }
  else{
    this.setState({
     meshow_err:false,
     meed_err:""
    })
   }
  if( this.state.event_details ==  '')
  {
    this.setState({
      meshow_err:true,
      med_err:"Detail can not be empty",
    })
  }

  else{
    this.setState({
     meshow_err:false,
     med_err:""
    })
   }
   if(!this.state.mpshow_err && !(this.state.offer_title == "" || this.state.offer_details == "" || this.state.promo_end_date == ""
  || this.state.promo_start_date == "")){
  if(this.state.type=="promotional"){
    // {"secure_pin":"digimonk","user_id":"10","promotional_id":"87","location_id":"45",
    // "submit_type":"promotional","title":"test promotional","start_date":"11-12-2020T13:25:55:21",
    // "end_date":"11-12-2020T13:25:45:21","details":"this is testing promotional........","coupon_code":"CDFE1123",
    // "redeem_offer":"24","terms_condi":"testing terms conditionsssssss....","save_status":"draft/active",
    // "attached_images":[{"promotional_image":"data:image/png;base64"},{"promotional_image":"data:image/png;base64"}]}
    const data = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.match.params.locationId,
      promotional_id:this.state.promo_id,
      submit_type:this.state.type,
      title:this.state.offer_title,
      start_date:this.state.promo_start_date + "T" + this.state.promo_start_time,
      end_date:this.state.promo_end_date + "T" + this.state.promo_end_time,
      details:this.state.offer_details,
      redeem_offer:this.state.redeem_offer,
      coupon_code:this.state.coupon_code,
      terms_condi:this.state.terms,
      save_status:this.state.active_status,
      attached_images: this.state.otherImages_promo_get,
      category:this.state.cta_drop,
      link:this.state.cta_url,
      report_expire:this.state.get_expiry_post,
      cta:this.state.get_add_cta,
      schedule_date:this.state.post_schedule_date
    }
    console.log("laa78",this.state.add_cta)
    console.log("laa87",this.state.expiry_post)
    this.setState({
      loading:true
    })
    Update_Promotional_by_id(data)
    .then(resp => {
      console.log(resp)
      this.setState({
        loading:false
      })
      const data = {
        secure_pin,
        user_id: localStorage.getItem("UserId"),
        location_id: this.props.match.params.locationId
      }
      swal({
        title: "Post Updated Successfully",
        // text: "Post added ",
        icon: "success",
        button: "Ok",
      });
      All_Promotional_list(data)
      .then(resp => {
        console.log(resp)
         this.setState({
          promo_list: resp.data.promotional_details,
        }).
    console.log("ppk",this.state.promo_list)
      }).catch(resp=>{
        console.log(resp)
            })
    }).catch(resp=>{
      console.log(resp)
          })
  
      console.log(data)
  }}
  if(!this.state.eshow_err  && !(this.state.event_title == "" || this.state.event_details == "" || this.state.event_end_date == ""
  || this.state.event_start_date == "")){
  if(this.state.type=="event"){
    const data = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.match.params.locationId,
      promotional_id:this.state.promo_id,
      submit_type:this.state.type,
      save_status:this.state.active_status,
      attached_images: this.state.otherImages_event_get,
      start_date:this.state.event_start_date + "T" + this.state.event_start_time,
      end_date:this.state.event_end_date + "T" + this.state.event_end_time,
      title:this.state.event_title,
      details:this.state.event_details,
      category:this.state.cta_drop,
      link:this.state.cta_url,
      report_expire:this.state.get_expiry_post,
      cta:this.state.get_add_cta,
      schedule_date:this.state.post_schedule_date
      
    }
    this.setState({
      loading:true
    })
    Update_Promotional_by_id(data)
    .then(resp => {
      console.log(resp)
      this.setState({
        loading:false
      })
      const data = {
        secure_pin,
        user_id: localStorage.getItem("UserId"),
        location_id: this.props.match.params.locationId
      }
      swal({
        title: "Post Updated Successfully",
        // text: "Post added ",
        icon: "success",
        button: "Ok",
        
      });
      All_Promotional_list(data)
      .then(resp => {
        console.log(resp)
         this.setState({
          promo_list: resp.data.promotional_details,
        }).
    console.log("ppk",this.state.promo_list)
      }).catch(resp=>{
        console.log(resp)
            })
    }).catch(resp=>{
      console.log(resp)
          })
    
      console.log(data)
  }}
 
}

editConfirmPost = () => {

  if(this.state.offer_title == ''){
    this.setState({
      mpshow_err:true,
      mpt_err:"Title can not be empty",
    })
  }
  else{
   this.setState({
    mpshow_err:false,
    mpt_err:""
   })
  }
  if(this.state.promo_start_date  ==  '')
  {
    this.setState({
      mpshow_err:true,
      psd_err:"Start date can not be empty",
    })
  }
  else{
    this.setState({
     mpshow_err:false,
     mpsd_err:""
    })
   }
  if( this.state.promo_end_date ==  '')
  {
    this.setState({
      mpshow_err:true,
      mped_err:"End date can not be empty",
    })
  }
  else{
    this.setState({
     mpshow_err:false,
     mped_err:""
    })
   }
  if( this.state.offer_details ==  '')
  {
    this.setState({
      mpshow_err:true,
      mpd_err:"Detail can not be empty",
    })
  }
  else{
    this.setState({
     mpshow_err:false,
     mpd_err:""
    })
   }

  if(this.state.event_title == ''){
    this.setState({
      meshow_err:true,
      met_err:"Title can not be empty",
    })
  }
  else{
    this.setState({
     meshow_err:false,
     met_err:""
    })
   }
  if(this.state.event_start_date  ==  '')
  {
    this.setState({
      meshow_err:true,
      mesd_err:"Start date can not be empty",
    })
  }
  else{
    this.setState({
     meshow_err:false,
     mesd_err:""
    })
   }
  if( this.state.event_end_date ==  '')
  {
    this.setState({
      meshow_err:true,
      meed_err:"End date can not be empty",
    })
  }
  else{
    this.setState({
     meshow_err:false,
     meed_err:""
    })
   }
  if( this.state.event_details ==  '')
  {
    this.setState({
      meshow_err:true,
      med_err:"Detail can not be empty",
    })
  }

  else{
    this.setState({
     meshow_err:false,
     med_err:""
    })
   }
   if(!this.state.mpshow_err && !(this.state.offer_title == "" || this.state.offer_details == "" || this.state.promo_end_date == ""
  || this.state.promo_start_date == "")){
  if(this.state.type=="promotional"){
    // {"secure_pin":"digimonk","user_id":"10","promotional_id":"87","location_id":"45",
    // "submit_type":"promotional","title":"test promotional","start_date":"11-12-2020T13:25:55:21",
    // "end_date":"11-12-2020T13:25:45:21","details":"this is testing promotional........","coupon_code":"CDFE1123",
    // "redeem_offer":"24","terms_condi":"testing terms conditionsssssss....","save_status":"draft/active",
    // "attached_images":[{"promotional_image":"data:image/png;base64"},{"promotional_image":"data:image/png;base64"}]}
    const data = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.match.params.locationId,
      promotional_id:this.state.promo_id,
      submit_type:this.state.type,
      title:this.state.offer_title,
      start_date:this.state.promo_start_date + "T" + this.state.promo_start_time,
      end_date:this.state.promo_end_date + "T" + this.state.promo_end_time,
      details:this.state.offer_details,
      redeem_offer:this.state.redeem_offer,
      coupon_code:this.state.coupon_code,
      terms_condi:this.state.terms,
      save_status:this.state.active_status,
      attached_images: this.state.otherImages_promo_get,
      category:this.state.cta_drop,
      link:this.state.cta_url,
      report_expire:this.state.get_expiry_post,
      cta:this.state.get_add_cta,
      schedule_date:this.state.post_schedule_date
    }
    console.log("laa78",this.state.add_cta)
    console.log("laa87",this.state.expiry_post)
    this.setState({
      loading:true
    })
    Update_Promotional_by_id(data)
    .then(resp => {
      console.log(resp)
      this.setState({
        loading:false
      })
      const data = {
        secure_pin,
        user_id: localStorage.getItem("UserId"),
        location_id: this.props.match.params.locationId
      }
      swal({
        title: "Post Updated Successfully",
        // text: "Post added ",
        icon: "success",
        button: "Ok",
      });
      All_Promotional_list(data)
      .then(resp => {
        console.log(resp)
         this.setState({
          promo_list: resp.data.promotional_details,
        }).
    console.log("ppk",this.state.promo_list)
      }).catch(resp=>{
        console.log(resp)
            })
    }).catch(resp=>{
      console.log(resp)
          })
  
      console.log(data)
  }}
  if(!this.state.eshow_err  && !(this.state.event_title == "" || this.state.event_details == "" || this.state.event_end_date == ""
  || this.state.event_start_date == "")){
  if(this.state.type=="event"){
    const data = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.match.params.locationId,
      promotional_id:this.state.promo_id,
      submit_type:this.state.type,
      save_status:this.state.active_status,
      attached_images: this.state.otherImages_event_get,
      start_date:this.state.event_start_date + "T" + this.state.event_start_time,
      end_date:this.state.event_end_date + "T" + this.state.event_end_time,
      title:this.state.event_title,
      details:this.state.event_details,
      category:this.state.cta_drop,
      link:this.state.cta_url,
      report_expire:this.state.get_expiry_post,
      cta:this.state.get_add_cta,
      schedule_date:this.state.post_schedule_date
      
    }
    this.setState({
      loading:true
    })
    Update_Promotional_by_id(data)
    .then(resp => {
      console.log(resp)
      this.setState({
        loading:false
      })
      const data = {
        secure_pin,
        user_id: localStorage.getItem("UserId"),
        location_id: this.props.match.params.locationId
      }
      swal({
        title: "Post Updated Successfully",
        // text: "Post added ",
        icon: "success",
        button: "Ok",
        
      });
      All_Promotional_list(data)
      .then(resp => {
        console.log(resp)
         this.setState({
          promo_list: resp.data.promotional_details,
        }).
    console.log("ppk",this.state.promo_list)
      }).catch(resp=>{
        console.log(resp)
            })
    }).catch(resp=>{
      console.log(resp)
          })
    
      console.log(data)
  }}
 
}


//   onUploadOtherImage_promo = event => {
//     let files = event.target.files;
//     console.log("1i",files)
    
//     let reader = new FileReader();
//     reader.readAsDataURL(files[0]);
//     console.log("2i",files[0].name)

//     reader.onload = e => {
//         console.log(e.target.result);
      
//         var ob={"promotional_image":e.target.result}

       
// if(this.state.type="promotional"){
//   this.setState({ otherImages_promo: this.state.otherImages_promo.concat(ob) });
// }
//       var locationId = this.props.match.params.locationId;
    
//       this.setState({ otherImagesLoading: true });
    
//     };
//   };

//   onUploadOtherImage_event = event => {
//     let files = event.target.files;
//     console.log("1i",files)
    
//     let reader = new FileReader();
//     reader.readAsDataURL(files[0]);
//     console.log("2i",files[0].name)

//     reader.onload = e => {
//         console.log(e.target.result);
      
//         var ob={"promotional_image":e.target.result}
// if(this.state.type="event"){
//   this.setState({ otherImages_event: this.state.otherImages_event.concat(ob) });
// }   

//       var locationId = this.props.match.params.locationId;
    
//       this.setState({ otherImagesLoading: true });
    
//     };
//   };

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
  secure_pin,
  "user_id":localStorage.getItem("UserId"),
  "promotional_id":id}

Promotional_by_id(data)

.then(resp => {
  console.log("laa",resp)
  var promodata = resp.data.data[0]
 
  console.log("laa1",promodata.promotional_details[0].start_date)
  if(promodata.promotional_details[0].submit_type == "event"){
    var edts = promodata.promotional_details[0].start_date.split('T')
    var edte = promodata.promotional_details[0].end_date.split('T')
    this.setState({
      type:"event",
      event_start_date:edts[0],
      event_end_date:edte[0],
      event_start_time:edts[1],
      event_end_time:edte[1],
      event_title:promodata.promotional_details[0].title,
      event_details:promodata.promotional_details[0].details,
      save_status:promodata.promotional_details[0].save_status,
      cta_drop:promodata.promotional_details[0].category,
      cta_url:promodata.promotional_details[0].link,
      get_expiry_post:promodata.promotional_details[0].report_expire,
      get_add_cta:promodata.promotional_details[0].cta,
    promo_id:promodata.promotional_details[0].id,
    post_schedule_date:promodata.promotional_details[0].schedule_date,
    otherImages_event_get:promodata.promotional_gallery
    })
    if(promodata.promotional_details[0].schedule_date){
      this.setState({
        get_post_schedule_drop:"Schedule Post"
      })
    }
    console.log("schedule_date" ,this.state.post_schedule_date)
    if(this.state.get_add_cta=="0"){
      this.setState({
        get_add_cta:false
      })
    }
    if(this.state.get_add_cta=="1"){
      this.setState({
        get_add_cta:true
      })
    }
    if(this.state.get_expiry_post=="0"){
      this.setState({
        get_expiry_post:false
      })
    }
    if(this.state.get_expiry_post=="1"){
      this.setState({
        get_expiry_post:true
      })
    }
    console.log("laa2",this.state.event_title)
    console.log("laa3",this.state.add_cta)
  }
  if(promodata.promotional_details[0].submit_type == "promotional"){
    var pdts = promodata.promotional_details[0].start_date.split('T')
    var pdte = promodata.promotional_details[0].end_date.split('T')
    this.setState({
      type:"promotional",
      offer_title:promodata.promotional_details[0].title,
      promo_start_date:pdts[0],
      promo_end_date:pdte[0],
      promo_start_time:pdts[1],
      promo_end_time:pdte[1],
      offer_details:promodata.promotional_details[0].details,
      redeem_offer:promodata.promotional_details[0].redeem_offer,
      coupon_code:promodata.promotional_details[0].coupon_code,
      terms:promodata.promotional_details[0].terms_condi,
      save_status:promodata.promotional_details[0].save_status,
      cta_drop:promodata.promotional_details[0].category,
      cta_url:promodata.promotional_details[0].link,
      get_expiry_post:promodata.promotional_details[0].report_expire,
      get_add_cta:promodata.promotional_details[0].cta,
      promo_id:promodata.promotional_details[0].id,
      post_schedule_date:promodata.promotional_details[0].schedule_date,
      otherImages_promo_get:promodata.promotional_gallery
    
    
    })
    if(promodata.promotional_details[0].schedule_date){
      this.setState({
        get_post_schedule_drop:"Schedule Post"
      })
    }
    if(this.state.get_add_cta=="0"){
      this.setState({
        get_add_cta:false
      })
    }
    if(this.state.get_add_cta=="1"){
      this.setState({
        get_add_cta:true
      })
    }
    if(this.state.get_expiry_post=="0"){
      this.setState({
        get_expiry_post:false
      })
    }
    if(this.state.get_expiry_post=="1"){
      this.setState({
        get_expiry_post:true
      })
    }

    console.log("laa4ep",this.state.get_expiry_post)
    console.log("laa4cd",this.state.cta_drop)
    console.log("laa4cu",this.state.cta_url)
    console.log("laa4gac",this.state.get_add_cta)
    console.log("")
  }
})

.catch(resp=>{
  console.log(resp)
      })
  }

  DeletePost= (id)=>e=>{
    console.log(id);

    swal({
      title: "Are You Sure TO Delete This Post?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const data={
          secure_pin,
          "user_id":localStorage.getItem("UserId"),
          "promotional_id":id}
    
    
        Delete_Promotional_by_id(data)
    
        .then(resp => {
          console.log(resp)
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
            }).
        console.log("ppk",this.state.promo_list)
          }).catch(resp=>{
            console.log(resp)
                })
        })
    
        .catch(resp=>{
    console.log(resp)
        });
      } 
    });
    // swal("Are You Sure TO Delete This Post?", {
    //   buttons: {
        
    //   buttons: "Cancel",
    //   dangerMode: "Delete",
      
    //   },
    // })
    // .then((value) => {
    //   switch (value) {
     
    //     case "dangerMode":
          
    //       break;
     
        
     
    //     default:
          
    //     break;
    //   }
    // });
    // swal("Are You Sure TO Delete This Post?", {
    //   dangerMode: true,
    //   buttons: true,
    // });
   
    }

    filterSearch=e=>{
      console.log(e.target.value)
      var fil =e.target.value;
      var data = {secure_pin,search_content:fil,location_id: this.props.match.params.locationId};
      console.log(data,"data")
      const lowercasedFilter = fil.toLowerCase();
      Axios.post(
        'https://digimonk.net/dashify-ci/admin/promotion_api/get_search_by_name', data).then(resp =>{
          console.log("sr",resp)
     if(resp.data.status=="1"){
          this.setState({
            promo_list:resp.data.all_promotional
          })}
        }).catch(resp=>{
          this.setState({
            promo_list:0
          })
              });
    // const filteredData = data.filter(item => {
      
    //   return Object.keys(item).some(key =>
    //     item[key].toLowerCase().includes(lowercasedFilter)
    //   )})
      // console.log(filteredData)

    }
    uploadUserImage_event=image=>{
      console.log("image", image);
      
      var ob={"promotional_image":image}

      
        this.setState({ otherImages_event: this.state.otherImages_event.concat(ob) });
      
   // var locationId = this.props.match.params.locationId;
  
    this.setState({ otherImagesLoading: true, CropperActive_event:false , CropperActive_promo:false});

    }

    uploadUserImage_promo=image=>{
      console.log("image", image);
      
      var ob={"promotional_image":image}
             
    
        this.setState({ otherImages_promo: this.state.otherImages_promo.concat(ob) });

   // var locationId = this.props.match.params.locationId;
  
    this.setState({ otherImagesLoading: true, CropperActive_event:false , CropperActive_promo:false});

    }

    uploadUserImage_event_get=image=>{
      console.log("image", image);
      
      var ob={"promotional_image":image}

      
        this.setState({ otherImages_event_get: this.state.otherImages_event_get.concat(ob) });
      

   // var locationId = this.props.match.params.locationId;
  
    this.setState({ otherImagesLoading: true, CropperActive_event_get:false , CropperActive_promo_get:false});

    }

    uploadUserImage_promo_get=image=>{
      console.log("image", image);
      
      var ob={"promotional_image":image}
             
    
        this.setState({ otherImages_promo_get: this.state.otherImages_promo_get.concat(ob) });
  
    this.setState({ otherImagesLoading: true, CropperActive_event_get:false , CropperActive_promo_get:false});

    }

    OnImgClick_promo=e=>{this.setState({CropperActive_promo:true})}

    OnImgClick_event=e=>{this.setState({CropperActive_event:true})}

    OnImgClick_promo_get=e=>{this.setState({CropperActive_promo_get:true})}

    OnImgClick_event_get=e=>{this.setState({CropperActive_event_get:true})}

  render() {
   
    console.log("promol",this.state.promo_list)
    console.log("promol",this.state.promo_list[0])
   console.log("promol img",this.state.promo_list[0])
    console.log("state",this.state);
    var pi = this.state.promo_list[0]
    console.log("kk",pi)
    var otherImages_promo=this.state.otherImages_promo;
    var otherImages_event=this.state.otherImages_event;
    var otherImages_promo_get=this.state.otherImages_promo_get;
    var otherImages_event_get=this.state.otherImages_event_get;
    var {
     ActivePost,
     PostClicks,
     PostViews,
     SchedulePosts,
     ExpirePost,
     ActivePostPer,
     PostClicksPer,
     PostViewsPer,
     SchedulePostsPer,
     ExpirePostPer,
     }= this.state


    var AllImg_event;
    var AllImg_promo;
    var AllImg_event_get;
    var AllImg_promo_get;

    if(otherImages_event_get){
      var ii=-1;
     AllImg_event_get= otherImages_event_get.map(o=>{

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
  </MDBCol>)
     })
    }
    if(otherImages_promo_get){
      var ii=-1;
     AllImg_promo_get= otherImages_promo_get.map(o=>{

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
  </MDBCol>)
     })
    }
    if(otherImages_event){
      var ii=-1;
     AllImg_event= otherImages_event.map(o=>{

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
  </MDBCol>)
     })
    }

    if(otherImages_promo){
      var ii=-1;
     AllImg_promo= otherImages_promo.map(o=>{

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
 </MDBCol>)
     })
    }
    console.log("1ll",AllImg_promo)
    console.log("1ll",AllImg_event)
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
<select  className="review_select_btn" onChange={this.UpdateFilter} >
<option value="last week">Last Week</option>
  <option value="last month">Last Month</option>
  <option value="last 3 months">Last 3 Months</option>
  <option value="last 6 months">Last 6 Months</option>
  <option value="last year">Last Year</option>
  <option value="all">Lifetime</option>
                            </select>
</div>
<MDBRow className='pp_margin1' >
  <MDBCol md='2' style={{paddingRight:'0px'}}>
  <img src={require("../images/promo1.png")}  alt="" className='pp_icon' />
  </MDBCol>

  <MDBCol md='7' style={{paddingRight:'0px'}}>
<div className='pp_contant1'>{ActivePost}</div>
<div className='pp_contant2'>Total Active Post</div>
  </MDBCol>

  <MDBCol md='3'>
     {ActivePostPer >=0? <div className='pp_contant_green'>+ {ActivePostPer} %</div>:
     <div className='pp_contant_red'>- {ActivePostPer} %</div>
     }

  </MDBCol>
</MDBRow>

<MDBRow className='pp_margin1' >
  <MDBCol md='2' style={{paddingRight:'0px'}}>
  <img src={require("../images/promo2.png")}  alt="" className='pp_icon' />
  </MDBCol>

  <MDBCol md='7' style={{paddingRight:'0px'}}>
<div className='pp_contant1'>{PostViews}</div>
<div className='pp_contant2'>Total Post Views</div>
  </MDBCol>

  <MDBCol md='3'>
  {PostViewsPer >=0? <div className='pp_contant_green'>+ {PostViewsPer} %</div>:
     <div className='pp_contant_red'>- {PostViewsPer} %</div>
     }

  </MDBCol>
</MDBRow>

<MDBRow className='pp_margin1' >
  <MDBCol md='2' style={{paddingRight:'0px'}}>
  <img src={require("../images/promo3.png")}  alt="" className='pp_icon' />
  </MDBCol>

  <MDBCol md='7' style={{paddingRight:'0px'}}>
<div className='pp_contant1'>{PostClicks}</div>
<div className='pp_contant2'>Total Post Clicks</div>
  </MDBCol>

  <MDBCol md='3'>
  {PostClicksPer >=0? <div className='pp_contant_green'>+ {PostClicksPer} %</div>:
     <div className='pp_contant_red'>- {PostClicksPer} %</div>
     }
  </MDBCol>
</MDBRow>

<MDBRow className='pp_margin1' >
  <MDBCol md='2' style={{paddingRight:'0px'}}>
  <img src={require("../images/promo4.png")}  alt="" className='pp_icon' />
  </MDBCol>

  <MDBCol md='7' style={{paddingRight:'0px'}}>
<div className='pp_contant1'>{SchedulePosts}</div>
<div className='pp_contant2'>Scheduled Posts</div>
  </MDBCol>

  <MDBCol md='3'>
  {SchedulePostsPer >=0? <div className='pp_contant_green'>+ {SchedulePostsPer} %</div>:
     <div className='pp_contant_red'>- {SchedulePostsPer} %</div>
     }
  </MDBCol>
</MDBRow>

<MDBRow className='pp_margin1' >
  <MDBCol md='2' style={{paddingRight:'0px'}}>
  <img src={require("../images/promo5.png")}  alt="" className='pp_icon' />
  </MDBCol>

  <MDBCol md='7' style={{paddingRight:'0px'}}>
<div className='pp_contant1'>{ExpirePost} </div>
<div className='pp_contant2'>Expiry Posts</div>
  </MDBCol>

  <MDBCol md='3'>
  {ExpirePostPer >=0? <div className='pp_contant_green'>+ {ExpirePostPer} %</div>:
     <div className='pp_contant_red'>- {ExpirePostPer} %</div>
     }
  </MDBCol>
</MDBRow>
              </MDBCol>

              <MDBCol md='8'>
                <div className='review_container'> 
<MDBRow>
  <MDBCol md='7' >
  <input className="searchbox-div"
                             type="text"
                             onChange={this.filterSearch }
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
{this.state.promo_list[0]?
<div class="scrollbar">
  {this.state.promo_list.map(d =>(
    
    <div>
    <MDBRow>
  <MDBCol md='7'>
  <MDBRow>
                <MDBCol md="3" style={{padding:'0px'}}>
                  <img
                  // src={"https://digimonk.net/dashify-ci/assets/upload/images/promotional-image/" + d.promotional_gallery[0].image_name}
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
                    <img src={edit} onClick={this.EditPost(d.id)} alt="" className="es_icon" data-toggle="modal" data-target="#myModal2"/>
                    <img src={delete_icon} onClick={this.DeletePost(d.id)} alt="" className="es_icon" />
                  </div>
                </MDBCol>
               
              </MDBRow>
  </MDBCol>
  <MDBCol md='5' >
  <MDBRow className='pp_contant5' >
  <MDBCol md='3'>
  {d.views}
</MDBCol>

<MDBCol md='3'>
{d.clicks}
</MDBCol>

<MDBCol md='6' >
  {d.save_status=="active"?<MDBBtn className='pp_status_active'>Active</MDBBtn>:null}
  {d.save_status=="draft"?<MDBBtn className='pp_status_draft'>Draft</MDBBtn>:null}
  {d.save_status=="schedule"?<MDBBtn className='pp_status_schedule'>Schedule</MDBBtn>:null}
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
                <MDBBtn className='pp_create_np' data-toggle="modal" data-target="#myModal1">Create A New Post</MDBBtn>
                
                
                
                <div class="modal fade" id="myModal1" role="dialog">
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
            {/* <MDBRow className="nav nav-tabs nav-justified">
              <MDBCol md='6' className="underline-from-left">
              <a data-toggle="tab" href="#promo_post" className='active' onClick={ () => {this.setState({type:"promotional"})}}> Promotional Post</a>
              </MDBCol>

              <MDBCol md='6' className="underline-from-left">
              <a data-toggle="tab" href="#post_event" onClick={ () => {this.setState({type:"event"})}}>Post An Event</a>
              </MDBCol>
            </MDBRow> */}
          <ul class="nav nav-tabs nav-justified">
    <li className="underline-from-left" ><a data-toggle="tab" href="#promo_post" className='active' onClick={ () => {this.setState({type:"promotional"})}}> Promotional Post</a></li>
    <li className="underline-from-left" style={{marginLeft:'55px'}}><a data-toggle="tab" href="#post_event" onClick={ () => {this.setState({type:"event"})}}>Post An Event</a></li>
  </ul>
          </div>
    
          <div class="scrollbar" style={{height:'415px'}}>
    <div class="overflow">
  <div class="tab-content">
  {this.state.CropperActive_promo ? <Cropper uploadUserImage={this.uploadUserImage_promo} />
          :
  <div id="promo_post" class="tab-pane fade  active" style={{opacity:'1',minHeight: '350px'}}>
  {this.state.loading?<Spinner/>:
    <div >
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
                              <i className="zmdi zmdi-plus" onClick={this.OnImgClick_promo}></i>
                                {/* <input
                                  type="file"
                                  name="otherImages"
                                  onChange={this.onUploadOtherImage}
                                /> */}
                              </span>
                            </MDBCol>
                                {AllImg_promo}
                          </MDBRow>
                         
           </MDBCol>
           {/* <MDBCol md='4' className='ap_contant1'>
             <span><img src={attach} /></span>
           Attach A Document
           </MDBCol> */}
         </MDBRow>
         <MDBRow>
           
         <input   className="promo_input"  placeholder="Offer Title " type='text' 
           name="offer_title"  onChange={this.changeHandler}/>
           <div class='err_msg_promo'>
                               {this.state.pt_err}
                              </div>
         </MDBRow>
         <MDBRow>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="Start Date " type='date'  style={{marginLeft:'0px'}} 
          name="promo_start_date"  onChange={this.changeHandler} />
          <div class='err_msg_promo' style={{marginLeft:'0px'}}>
                               {this.state.psd_err}
                              </div>
         </MDBCol>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="Start Time " type='time'  style={{ marginRight:'0px'}}
         name="promo_start_time"  onChange={this.changeHandler} defaultValue="00:00"/>
         </MDBCol>
         </MDBRow>

         <MDBRow>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="End Date " type='date'  style={{marginLeft:'0px'}} 
           name="promo_end_date"  onChange={this.changeHandler} />
           <div class='err_msg_promo' style={{marginLeft:'0px'}}>
                               {this.state.ped_err}
                              </div>
         </MDBCol>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="End Time " type='time'  style={{ marginRight:'0px'}}
           name="promo_end_time"  onChange={this.changeHandler} defaultValue="00:00"/>
         </MDBCol>
         </MDBRow>
        <div className='ap_subhead1'>Add More Details (Optional)</div>

         <MDBRow>
         <textarea rows="3"   className="promo_input"  placeholder="Offer Details " type='text'
          name="offer_details"  onChange={this.changeHandler} />
          <div class='err_msg_promo'>
                               {this.state.pd_err}
                              </div>
         </MDBRow>

         <MDBRow>
         <input   className="promo_input"  placeholder="Coupon Code (Optional) " type='text' 
           name="coupon_code"  onChange={this.changeHandler}/>
         </MDBRow>
         <MDBRow>
         <input   className="promo_input"  placeholder="Link To Redeem Offer (Optional) " type='text' 
           name="redeem_offer"  onChange={this.changeHandler}/>
         </MDBRow>

         <MDBRow>
         <input   className="promo_input"  placeholder="Terms & Conditions  (Optional) " type='text' 
           name="terms"  onChange={this.changeHandler}/>
         </MDBRow>
         <MDBRow style={{marginTop:'15px'}}>
           <MDBCol md='1' className='ap_check'  >
             <Checkbox onChange={this.changeHandler} name="add_cta"/>
           </MDBCol>
           <MDBCol md='5' className='ap_contant2'>
           Add A CTA
           </MDBCol>
          
           <MDBCol md='1' className='ap_check' >
             <Checkbox onChange={this.changeHandler} name="expiry_post"/>
           </MDBCol>
           <MDBCol md='5' className='ap_contant2'>
           Report This Post After Expiry 
           </MDBCol>
         </MDBRow>
         {this.state.add_cta?
         <MDBRow>
         <MDBCol md='5'>
         <select className="promo_input"  name="cta_drop"  onChange={this.changeHandler}>
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
            name="cta_url"  onChange={this.changeHandler}
          />
         </MDBCol>
       </MDBRow>
         :null}


<MDBRow>
         <MDBCol md='6'>
        <select className="promo_input"  name="post_schedule_drop"  onChange={this.changeHandler}>
        <option selected>Post Now</option>
        <option>Schedule Post</option>
      </select>
         </MDBCol>
        {this.state.post_schedule_drop == "Schedule Post"?
         <MDBCol md='6'>
         <input type="date"  className="promo_input"  name="post_schedule_date"  onChange={this.changeHandler} />
         <div class='err_msg_promo'>
         {this.state.schDate_err}
        </div>
         </MDBCol>
        :null}
       </MDBRow>
        
          {this.state.offer_title == "" || this.state.offer_details == "" || this.state.promo_end_date == ""
         || this.state.promo_start_date == ""?
          <MDBRow style={{marginTop:'15px'}}>
          <MDBCol md='6'>
            <MDBBtn className="draft_btn" onClick={this.draftClicked}>
            Save As Draft
            </MDBBtn>  
          </MDBCol>

          <MDBCol md='6'>
            <MDBBtn className="cp_btn" onClick={this.confirmPost}> 
            Confirm Post
            </MDBBtn>
          </MDBCol>
        </MDBRow>:
        <MDBRow style={{marginTop:'15px'}}>
        <MDBCol md='6'>
          <MDBBtn className="draft_btn"  onClick={this.draftClicked} data-dismiss="modal">
          Save As Draft
          </MDBBtn>  
        </MDBCol>

        <MDBCol md='6'>
          <MDBBtn className="cp_btn" onClick={this.confirmPost} data-dismiss="modal"> 
          Confirm Post
          </MDBBtn>
        </MDBCol>
      </MDBRow>}
    </div>
   }
   </div>
 
  }
 {this.state.CropperActive_event  ? <Cropper uploadUserImage={this.uploadUserImage_event} />
          :
 <div id="post_event" class="tab-pane fade" style={{opacity:'1',minHeight: '350px'}}>
   {this.state.loading?<Spinner/>:
    <div >
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
                              <i className="zmdi zmdi-plus" onClick={this.OnImgClick_event}></i>
                                {/* <input
                                  type="file"
                                  name="otherImages"
                                  onChange={this.onUploadOtherImage}
                                /> */}
                              </span>
                            </MDBCol>
                            

                                {AllImg_event} 

                          </MDBRow>
                         
           </MDBCol>
           {/* <MDBCol md='4' className='ap_contant1'>
             <span><img src={attach} /></span>
           Attach a document
           </MDBCol> */}
         </MDBRow>
         <MDBRow>
           
         <input   className="promo_input"  placeholder="Event Title " type='text' 
            name="event_title"  onChange={this.changeHandler}/>
            <div class='err_msg_promo'>
                               {this.state.et_err}
                              </div>
         </MDBRow>
         <MDBRow>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="Start Date " type='date'  style={{marginLeft:'0px'}} 
           name="event_start_date"  onChange={this.changeHandler}/>
           <div class='err_msg_promo' style={{marginLeft:'0px'}}>
                               {this.state.esd_err}
                              </div>
         </MDBCol>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="Start time " type='time'  style={{ marginRight:'0px'}}
          name="event_start_time"  onChange={this.changeHandler}/>
         </MDBCol>
         </MDBRow>

         <MDBRow>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="End Date " type='date'  style={{marginLeft:'0px'}} 
           name="event_end_date"  onChange={this.changeHandler} />
           <div class='err_msg_promo' style={{marginLeft:'0px'}}>
                               {this.state.eed_err}
                              </div>
         </MDBCol>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="End Time " type='time'  style={{ marginRight:'0px'}}
          name="event_end_time"  onChange={this.changeHandler}/>
         </MDBCol>
         </MDBRow>
        <div className='ap_subhead1'>Add More Details (Optional)</div>

         <MDBRow>
         <textarea rows="3"   className="promo_input"  placeholder="Event Details " type='text'
          name="event_details"  onChange={this.changeHandler} />
          <div class='err_msg_promo'>
                               {this.state.ed_err}
                              </div>
         </MDBRow>

         <MDBRow style={{marginTop:'15px'}}>
           <MDBCol md='1' className='ap_check'  >
             <Checkbox onChange={this.changeHandler} name="add_cta"/>
           </MDBCol>
           <MDBCol md='5' className='ap_contant2'>
           Add A CTA
           </MDBCol>
          
           <MDBCol md='1' className='ap_check' >
             <Checkbox onChange={this.changeHandler} name="expiry_post"/>
           </MDBCol>
           <MDBCol md='5' className='ap_contant2'>
           Report This Post After Expiry 
           </MDBCol>
         </MDBRow>
         {this.state.add_cta?
         <MDBRow>
         <MDBCol md='5'>
         <select className="promo_input"  name="cta_drop"  onChange={this.changeHandler}>
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
            name="cta_url"  onChange={this.changeHandler}
          />
         </MDBCol>
       </MDBRow>
         :null}


<MDBRow>
         <MDBCol md='6'>
        <select className="promo_input"  name="post_schedule_drop"  onChange={this.changeHandler}>
        <option selected>Post Now</option>
        <option>Schedule Post</option>
      </select>
         </MDBCol>
        {this.state.post_schedule_drop == "Schedule Post"?
         <MDBCol md='6'>
         <input type="date"  className="promo_input"  name="post_schedule_date"  onChange={this.changeHandler} />
         <div class='err_msg_promo'>
         {this.state.schDate_err}
        </div>
         </MDBCol>
        :null}
       </MDBRow>
        

          {this.state.event_title == "" || this.state.event_details == "" || this.state.event_end_date == ""
         || this.state.event_start_date == ""?<MDBRow style={{marginTop:'15px'}}>
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
        </MDBRow>:<MDBRow style={{marginTop:'15px'}}>
          <MDBCol md='6'>
            <MDBBtn className="draft_btn"  onClick={this.draftClicked} data-dismiss="modal">
            Save As Draft
            </MDBBtn>
          </MDBCol>

          <MDBCol md='6'>
            <MDBBtn className="cp_btn" onClick={this.confirmPost} data-dismiss="modal"> 
            Confirm Post
            </MDBBtn>
          </MDBCol>
        </MDBRow>}
    </div>
  }
   </div>
  }
  </div>
         
         {/* <MDBRow>
           <MDBCol md='8'>
           <textarea rows='6' className='ap_textarea' placeholder='Enter your post content here...'/>
           </MDBCol>
         </MDBRow> */}
        
        
   
        </div>
        
        </div>
        
        </div>
     </div>
      
    </div>
  </div>
  
  <div class="modal fade" id="myModal2" role="dialog">
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
          
            {this.state.type == "promotional"?
            <div>
            <div style={{margin:'0px' ,marginBottom:'30px'}} className="ap_subhead0">
            Promotional Post
    </div>
    <div class="scrollbar" style={{height:'415px'}}>
      <div class="overflow">
      {this.state.CropperActive_promo_get  ? <Cropper uploadUserImage={this.uploadUserImage_promo_get} />
          :
    <div >
    
    <div  >

         <MDBRow style={{marginTop:'15px'}}> 
           <MDBCol md='8'>
           <MDBRow >
                            <MDBCol md="2" className="ap_image">
                              <span>
                              <i className="zmdi zmdi-plus" onClick={this.OnImgClick_promo_get}></i>
                                {/* <input
                                  type="file"
                                  name="otherImages"
                                  onChange={this.onUploadOtherImage}
                                /> */}
                              </span>
                            </MDBCol>
                                {AllImg_promo_get}
                          </MDBRow>
                         
           </MDBCol>
         </MDBRow>
         <MDBRow>
           
         <input   className="promo_input"  placeholder="Offer Title " type='text' 
          value={this.state.offer_title}  name="offer_title"  onChange={this.changeHandler}/>
          <div class='err_msg_promo'>
                               {this.state.mpt_err}
                              </div>
         </MDBRow>
         <MDBRow>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="Start Date " type='date'  style={{marginLeft:'0px'}} 
         value={this.state.promo_start_date}  name="promo_start_date"  onChange={this.changeHandler} />
         <div class='err_msg_promo'>
                               {this.state.mpsd_err}
                              </div>
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
         <div class='err_msg_promo'>
                               {this.state.mped_err}
                              </div>
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
         <div class='err_msg_promo'>
                               {this.state.mpd_err}
                              </div>
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
   
         <MDBRow style={{marginTop:'15px'}}>
           <MDBCol md='1' className='ap_check'  >
             <Checkbox onChange={this.changeHandler} name="get_add_cta" checked={this.state.get_add_cta}/>
           </MDBCol>
           <MDBCol md='5' className='ap_contant2'>
           Add A CTA
           </MDBCol>
          
           <MDBCol md='1' className='ap_check' >
             <Checkbox onChange={this.changeHandler} name="get_expiry_post" checked={this.state.get_expiry_post}/>
           </MDBCol>
           <MDBCol md='5' className='ap_contant2'>
           Report This Post After Expiry 
           </MDBCol>
         </MDBRow>
         {this.state.get_add_cta?
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
         :null}
         {this.state.save_status=='active'?null:
<MDBRow>
         <MDBCol md='6'>
         {this.state.post_schedule_date?
         <select className="promo_input"  name="get_post_schedule_drop"  onChange={this.changeHandler}>
          <option>Post Now</option>
          <option selected>Schedule Post</option>
        </select>:
        <select className="promo_input"  name="get_post_schedule_drop"  onChange={this.changeHandler}>
        <option selected>Post Now</option>
        <option>Schedule Post</option>
      </select>}
         </MDBCol>
        {this.state.get_post_schedule_drop == "Schedule Post"?
         <MDBCol md='6'>
         <input type="date"  className="promo_input"  name="post_schedule_date" value={this.state.post_schedule_date} 
         onChange={this.changeHandler} />
         <div class='err_msg_promo'>
         {this.state.schDate_err}
        </div>
         </MDBCol>
        :null}
       </MDBRow>}
        
         {this.state.offer_title == "" || this.state.offer_details == "" || this.state.promo_end_date == ""
         || this.state.promo_start_date == ""?
         <MDBRow style={{marginTop:'15px'}}>
          <MDBCol md='6'>
            {this.state.save_status == "draft"?
            <MDBBtn className="draft_btn" onClick={this.editDraftPost} >
            Save As Draft
            </MDBBtn>:null}
          </MDBCol>

          <MDBCol md='6'>
            <MDBBtn className="cp_btn" onClick={this.editConfirmPost}> 
            Update Post
            </MDBBtn>
          </MDBCol>
        </MDBRow>:
        <MDBRow style={{marginTop:'15px'}}>
          <MDBCol md='6'>
            {this.state.save_status == "draft"?
            <MDBBtn className="draft_btn"  onClick={this.editDraftPost} data-dismiss="modal">
            Save As Draft
            </MDBBtn>:null}
          </MDBCol>

          <MDBCol md='6'>
            <MDBBtn className="cp_btn" onClick={this.editConfirmPost} data-dismiss="modal"> 
            Update Post
            </MDBBtn>
          </MDBCol>
        </MDBRow>}
   
        </div>
  }
        </div>
       </div>
          </div>
             :null
            }

{this.state.type == "event"?
<div>
<div style={{margin:'0px' ,marginBottom:'30px'}} className="ap_subhead0">
Post An Event
    </div>

   
    <div class="scrollbar" style={{height:'415px'}}>
      <div class="overflow">
    {this.state.CropperActive_event_get  ? <Cropper uploadUserImage={this.uploadUserImage_event_get} />
          :
    <div >
    <div >
         <MDBRow style={{marginTop:'15px'}}> 
           <MDBCol md='8'>
           <MDBRow >
                            <MDBCol md="2" className="ap_image">
                              <span>
                                <i className="zmdi zmdi-plus" onClick={this.OnImgClick_event_get}></i>
                                {/* <input
                                  type="file"
                                  name="otherImages"
                                  onChange={this.onUploadOtherImage}
                                /> */}
                              </span>
                            </MDBCol>
                            

                                {AllImg_event_get} 

                          </MDBRow>
                         
           </MDBCol>
         </MDBRow>
         <MDBRow>
           
         <input   className="promo_input"  placeholder="Event Title " type='text' 
          value={this.state.event_title}  name="event_title"  onChange={this.changeHandler} />
          <div class='err_msg_promo'>
                               {this.state.met_err}
                              </div>
         
         </MDBRow>
         <MDBRow>
         <MDBCol md='6'>
         <input   className="promo_input"  placeholder="Start Date " type='date'  style={{marginLeft:'0px'}} 
         value={this.state.event_start_date}  name="event_start_date"  onChange={this.changeHandler}/>
         <div class='err_msg_promo'>
                               {this.state.mesd_err}
                              </div>
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
         <div class='err_msg_promo'>
                               {this.state.meed_err}
                              </div>
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
         <div class='err_msg_promo'>
                               {this.state.med_err}
                              </div>
         </MDBRow>

         
    </div>
   
         <MDBRow style={{marginTop:'15px'}}>
           <MDBCol md='1' className='ap_check'  >
             <Checkbox onChange={this.changeHandler} name="get_add_cta" checked={this.state.get_add_cta} />
           </MDBCol>
           <MDBCol md='5' className='ap_contant2'>
           Add A CTA
           </MDBCol>
          
           <MDBCol md='1' className='ap_check' >
             <Checkbox onChange={this.changeHandler} name="get_expiry_post" checked={this.state.get_expiry_post}/>
           </MDBCol>
           <MDBCol md='5' className='ap_contant2'>
           Report This Post After Expiry 
           </MDBCol>
         </MDBRow>
         {this.state.get_add_cta?
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
         :null}
         {this.state.save_status=='active'?null:
<MDBRow>
         <MDBCol md='6'>
         {this.state.post_schedule_date?
         <select className="promo_input"  name="get_post_schedule_drop"  onChange={this.changeHandler}>
          <option>Post Now</option>
          <option selected>Schedule Post</option>
        </select>:
        <select className="promo_input"  name="get_post_schedule_drop"  onChange={this.changeHandler}>
        <option selected>Post Now</option>
        <option>Schedule Post</option>
      </select>}
         </MDBCol>
        {this.state.get_post_schedule_drop == "Schedule Post"?
         <MDBCol md='6'>
         <input type="date"  className="promo_input"  name="post_schedule_date" value={this.state.post_schedule_date} 
         onChange={this.changeHandler} />
         <div class='err_msg_promo'>
         {this.state.schDate_err}
        </div>
         </MDBCol>
        :null}
       </MDBRow>}
        
        {this.state.event_title == "" || this.state.event_details == "" || this.state.event_end_date == ""
         || this.state.event_start_date == ""?
         <MDBRow style={{marginTop:'15px'}}>
          <MDBCol md='6'>
          {this.state.save_status == "draft"?
            <MDBBtn className="draft_btn" onClick={this.editDraftPost}>
            Save As Draft
            </MDBBtn>:null}
          </MDBCol>

          <MDBCol md='6'>
            <MDBBtn className="cp_btn" onClick={this.editConfirmPost}> 
            Update Post
            </MDBBtn>
          </MDBCol>
        </MDBRow>: <MDBRow style={{marginTop:'15px'}}>
          <MDBCol md='6'>
          {this.state.save_status == "draft"?
            <MDBBtn className="draft_btn"  onClick={this.editDraftPost} data-dismiss="modal" >
            Save As Draft
            </MDBBtn>:null}
          </MDBCol>

          <MDBCol md='6'>
            <MDBBtn className="cp_btn" onClick={this.editConfirmPost} data-dismiss="modal"> 
            Update Post
            </MDBBtn>
          </MDBCol>
        </MDBRow>}
   
        </div>
  }
        </div>
</div>
    </div>
             :null
            }
  
         
    
        
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
