import React, { Component } from "react";
import Axios from "axios";
import {
  add_location,
  business_categories,
  business_counrty,
  business_states
} from "./apis/location";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";
import { MDBCol, MDBRow, MDBContainer } from "mdbreact";
//importing regex
import {
  email_regex,
  url_regex,
  phone_regex,
  zipcode_regex
} from "./utils/regularexpressions";
import { secure_pin } from "../config";
const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};
export default class AddLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: "",
      storeCode: "",
      category: "",
      additionalCategories: "",
      country_selected_id:"",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      website: "",
      phone: "",
      hours: [],

      monday: "",
      mondayStart1: "",
      mondayEnd1: "",
      mondayStart2: "",
      mondayEnd2: "",

      tuesday: "",
      tuesdayStart1: "",
      tuesdayEnd1: "",
      tuesdayStart2: "",
      tuesdayEnd2: "",

      wednesday: "",
      wednesdayStart1: "",
      wednesdayEnd1: "",
      wednesdayStart2: "",
      wednesdayEnd2: "",

      thursday: "",
      thursdayStart1: "",
      thursdayEnd1: "",
      thursdayStart2: "",
      thursdayEnd2: "",

      friday: "",
      fridayStart1: "",
      fridayEnd1: "",
      fridayStart2: "",
      fridayEnd2: "",

      saturday: "",
      saturdayStart1: "",
      saturdayEnd1: "",
      saturdayStart2: "",
      saturdayEnd2: "",

      sunday: "",
      sundayStart1: "",
      sundayEnd1: "",
      sundayStart2: "",
      sundayEnd2: "",

      about: "",
      Franchise_Location: "false",
      Do_not_publish_my_address: "true",
      ownerName: "",
      ownerEmail: "",
      yearOfIncorp: "",
      businessTagline: "",
      instagramProfile: "",
      twitterProfile: "",
      facebookProfile: "",
      paymentMethod: [],

      //payment methods
      p_amex: false,
      p_android: false,
      p_apple: false,
      p_cash: false,
      p_check: false,
      p_crypto: false,
      p_diners: false,
      p_discover: false,
      p_financing: false,
      p_invoices: false,
      p_maestro: false,
      p_paypal: false,
      p_discover: false,
      p_samsung: false,
      p_traveler: false,
      p_visa: false,

      BusinessLogo: "",
      BusinessCoverImage: "",
      otherImage: "",
      other_image0: "",
      other_image1: "",
      other_image2: "",
      businessCategories: [],
      countryCategories: [],
      stateCategories: [],
      loadBusinessCategories: false,
      loadCountryCategories: false,
      loadStateCategories: false,
      applyAll: false,
      isSuccess: false,

      locationName_error: "",
      storeCode_error: "",
      category_error: "",
      additionalCategories_error: "",

      address1_error: "",
      address2_error: "",
      city_error: "",
      state_error: "",
      country_error: "",
      zipCode_error: "",
      website_error: "",
      phone_error: "",
      hours_error: "",

      about_error: "",
      ownerName_error: "",
      ownerEmail_error: "",
      yearOfIncorp_error: "",
      businessTagline_error: "",
      instagramProfile_error: "",
      twitterProfile_error: "",
      facebookProfile_error: "",
      paymentMethod_error: "",

      error: "",
      show_message: "",
      applyAllError: "",
      loading: false
    };
  }
  submitHandler = async event => {
    event.preventDefault();

    let {
      p_amex,
      p_android,
      p_apple,
      p_cash,
      p_check,
      p_crypto,
      p_diners,
      p_discover,
      p_financing,
      p_invoices,
      p_maestro,
      p_paypal,
      p_samsung,
      p_traveler,
      p_visa
    } = this.state;

    await this.Other_images();

    var payment = []

    if (p_amex) {
      payment.push({payment_name: "Amex"})
    }
    if (p_android) {
      payment.push({payment_name: "Android"})
    }
    if (p_apple) {
      payment.push({payment_name: "Apple"})
    }
    if (p_cash) {
      payment.push({payment_name: "Cash"})
    }
    if (p_check) {
      payment.push({payment_name: "Check"})
    }
    if (p_crypto) {
      payment.push({payment_name: "Crypto"})
    }
    if (p_diners) {
      payment.push({payment_name: "Diners"})
    }
    if (p_discover) {
      payment.push({payment_name: "Discover"})
    }
    if (p_financing) {
      payment.push({payment_name: "Financing"})
    }
    if (p_invoices) {
      payment.push({payment_name: "Invoices"})
    }
    if (p_maestro) {
      payment.push({payment_name: "Maestro"})
    }
    if (p_paypal) {
      payment.push({payment_name: "Paypal"})
    }
    if (p_samsung) {
      payment.push({payment_name: "Samsung"})
    }
    if (p_traveler) {
      payment.push({payment_name: "Traveler"})
    }
    if (p_visa) {
      payment.push({payment_name: "Visa"})
    }
    var franchise, donot;
    // if (this.state.FranchiseLocation) {
    //   franchise = "true";
    // } else {
    //   franchise = "false";
    // }
    // if (this.state.DoNotPublishMyAddress) {
    //   donot = "true";
    // } else {
    //   donot = "false";
    // }


    
const data = {
secure_pin,user_id: localStorage.getItem("UserId"), stor_code: this.state.storeCode, bussiness_logo:this.state.BusinessLogo,
bussiness_cate : this.state.category, location_name:this.state.locationName , address1:  this.state.address1 ,
 address2 :  this.state.address1 , country :this.state.country , state : this.state.state , city:this.state.city , 
 zipcode : this.state.zipCode ,phone_no :this.state.phone ,website :this.state.website ,
  franchiese_locaiton :this.state.Franchise_Location ,do_not_publish_my_address:  this.state.Do_not_publish_my_address ,
  bussiness_owner_name:this.state.ownerName , bussiness_owner_email :this.state.ownerEmail ,
  bussiness_tagline : this.state.businessTagline ,year_of_incorporation :this.state.yearOfIncorp ,
  about_bussines : this.state.about,facebook_profile: this.state.facebookProfile ,
  instagram_profile: this.state.instagramProfile ,twitter_profile:this.state.twitterProfile ,
  bussiness_cover_image: this.state.BusinessCoverImage,payment_method_array: payment, 
  more_bussiness_images_array :  this.state.otherImage, open_hours_apply_all : "0" ,
   open_hours_array :[{day:"Monday",open_status:this.state.monday,start_time1: this.state.mondayStart1,
   end_time1:this.state.mondayEnd1,start_time2:this.state.mondayStart2,end_time2:this.state.mondayEnd2},
   {day:"Tuesday",open_status:this.state.tuesday,start_time1: this.state.tuesdayStart1,end_time1:this.state.tuesdayEnd1,
   start_time2:this.state.tuesdayStart2,end_time2:this.state.tuesdayEnd2},{day:"Wednesday",
   open_status:this.state.wednesday,start_time1: this.state.wednesdayStart1,end_time1:this.state.wednesdayEnd1,
   start_time2:this.state.wednesdayStart2,end_time2:this.state.wednesdayEnd2},
   {day:"Thursday",open_status:this.state.thursday,start_time1: this.state.thursdayStart1,
   end_time1:this.state.thursdayEnd1,start_time2:this.state.thursdayStart2,end_time2:this.state.thursdayEnd2},
   {day:"Friday",open_status:this.state.friday,start_time1: this.state.fridayStart1,end_time1:this.state.fridayEnd1,
   start_time2:this.state.fridayStart2,end_time2:this.state.fridayEnd2},{day:"Saturday",open_status:this.state.saturday,
   start_time1: this.state.saturdayStart1,end_time1:this.state.saturdayEnd1,start_time2:this.state.saturdayStart2,
   end_time2:this.state.saturdayEnd2},{day:"Sunday",open_status:this.state.sunday,start_time1: this.state.sundayStart1,
   end_time1:this.state.sundayEnd1,start_time2:this.state.sundayStart2,end_time2:this.state.sundayEnd2}]

}


    console.log("data11", data);

    let error_present = await this.errorValue(data);

    if (!error_present) {
      this.setState({ loading: true, show_message: "" });
      add_location(data)
        .then(async res => {
          console.log("resp1", res);
          if (res.data.message == "Location Add successfully") {
            localStorage.setItem("locationId", res.data.Location_id.toString());
            localStorage.setItem("locationName", this.state.locationName);
            await this.setState({
              isSuccess: true,
              loading: false
            });
            console.log("Location Add successfull", res.data);
          } else {
            this.setState({
              error: res,
              isSuccess: false,
              loading: false,
              show_message: "Location not added"
            });
          }
        })
        .catch(res => {
          console.log("error in add location");
          this.setState({
            error: res,
            isSuccess: false,
            loading: false,
            show_message: "Location not added"
          });
          console.log("error", res);
        });
    } else {
      this.setState({ show_message: "Fill above fields" });
    }
  };

  errorValue = data => {
    let {
      locationName_error,
      storeCode_error,
      category_error,
      additionalCategories_error,
      address1_error,
      address2_error,
      city_error,
      state_error,
      country_error,
      zipCode_error,
      website_error,
      phone_error,
      hours_error,
      about_error,
      ownerName_error,
      ownerEmail_error,
      yearOfIncorp_error,
      businessTagline_error,
      instagramProfile_error,
      twitterProfile_error,
      facebookProfile_error,
      paymentMethod_error
    } = this.state;

    this.setState({
      locationName_error: "",
      storeCode_error: "",
      category_error: "",
      additionalCategories_error: "",
      address1_error: "",
      address2_error: "",
      city_error: "",
      state_error: "",
      country_error: "",
      zipCode_error: "",
      website_error: "",
      phone_error: "",
      hours_error: "",
      about_error: "",
      ownerName_error: "",
      ownerEmail_error: "",
      yearOfIncorp_error: "",
      businessTagline_error: "",
      instagramProfile_error: "",
      twitterProfile_error: "",
      facebookProfile_error: "",
      paymentMethod_error: ""
    });

    let error_present = false;

    if (data.Location_name == "") {
      this.setState({ locationName_error: "*Location can not be empty" });
      error_present = true;
    }
    if (data.Store_Code == "") {
      this.setState({ storeCode_error: "*Store Code can not be empty" });
      error_present = true;
    }
    if (data.Business_category == "") {
      this.setState({ category_error: "*Please select Business category" });
      error_present = true;
    }
    if (data.Additional_catugory == "") {
      this.setState({
        additionalCategories_error: "*Additional categories can not be empty"
      });
      error_present = true;
    }
    if (data.Address_1 == "") {
      this.setState({ address1_error: "*Address can not be empty" });
      error_present = true;
    }
    if (data.Address_2 == "") {
      this.setState({ address2_error: "*Address 2 can not be empty" });
      error_present = true;
    }
    if (data.City == "") {
      this.setState({ city_error: "*City can not be empty" });
      error_present = true;
    }
    if (data.State == "") {
      this.setState({ state_error: "*Please select your state" });
      error_present = true;
    }
    if (data.Country == "") {
      this.setState({ country_error: "*Please select your country" });
      error_present = true;
    }
    if (data.Zipcode == "") {
      this.setState({ zipCode_error: "*Zipcode can not be empty" });
      error_present = true;
    } else {
      const result = zipcode_regex(data.Zipcode);
      if (result === false) {
        this.setState({
          zipCode_error: "Not a valid zipcode"
        });
        error_present = true;
      }
    }
    console.log("data.Website",data.website)
    if (data.Website == "") {
      this.setState({ website_error: "*Website can not be empty" });
      error_present = true;
    } else {
      const result = url_regex(data.website);
      if (result == null) {
        this.setState({
          website_error: "Not a valid website"
        });
        error_present = true;
      }
    }
    if (data.Phone_no == "") {
      this.setState({ phone_error: "*Phone No. can not be empty" });
      error_present = true;
    } else {
      const result = phone_regex(data.Phone_no);
      if (result === false) {
        this.setState({
          phone_error: "Not a valid Phone No."
        });
        error_present = true;
      }
    }
    // if (data.open_houre == "") {
    //   this.setState({ hours_error: "*password can not be empty" });
    // }
    if (data.About_Business == "") {
      this.setState({ about_error: "*Enter about your business" });
      error_present = true;
    }
    if (data.Business_Owner_Name == "") {
      this.setState({ ownerName_error: "*Owner name can not be empty" });
      error_present = true;
    }
    if (data.Owner_Email == "") {
      this.setState({ ownerEmail_error: "*Owner email can not be empty" });
      error_present = true;
    } else {
      const result = email_regex(data.Owner_Email);
      if (result === false) {
        this.setState({
          ownerEmail_error: "Not a valid email"
        });
        error_present = true;
      }
    }
    if (data.Year_Of_Incorporation == "") {
      this.setState({
        yearOfIncorp_error: "*Year of Incorporation can not be empty"
      });
      error_present = true;
    } else {
      var currentYear = new Date().getFullYear();
      var input = parseInt(data.Year_Of_Incorporation);
      console.log(input, currentYear);
      if (( input <= currentYear) == false) {
        this.setState({
          yearOfIncorp_error: "*Invaild Year of Incorporation"
        });
        error_present = true;
      }
    }
    if (data.Business_Tagline == "") {
      this.setState({
        businessTagline_error: "*Business Tagline can not be empty"
      });
      error_present = true;
    }
    if (data.instagram_profile == "") {
      this.setState({
        instagramProfile_error: "*Instagram Profile can not be empty"
      });
      error_present = true;
    } else {
      const result = url_regex(data.instagram_profile);
      if (result == null) {
        this.setState({
          instagramProfile_error: "Not a valid url"
        });
        error_present = true;
      }
    }
    if (data.twitter_profile == "") {
      this.setState({
        twitterProfile_error: "*Twitter Profile can not be empty"
      });
      error_present = true;
    } else {
      const result = url_regex(data.twitter_profile);
      if (result == null) {
        this.setState({
          twitterProfile_error: "Not a valid url"
        });
        error_present = true;
      }
    }
    if (data.facebook_profile == "") {
      this.setState({
        facebookProfile_error: "*Facebook Profile can not be empty"
      });
      error_present = true;
    } else {
      const result = url_regex(data.facebook_profile);
      if (result == null) {
        this.setState({
          facebookProfile_error: "Not a valid url"
        });
        error_present = true;
      }
    }
    if (data.payment_method_array == "") {
      this.setState({
        paymentMethod_error: "*Payment method can not be empty"
      });
      error_present = true;
    }
    return error_present;
  };

  onUploadLogo = event => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      this.setState({ BusinessLogo: e.target.result });
    };
  };
  onUploadCover = event => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      this.setState({ BusinessCoverImage: e.target.result });
    };
  };

  onUploadOther = name => event => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      this.setState({ [name]: e.target.result });
    };
  };

  Other_images = async () => {
    let otherImage = [{bussiness_image : this.state.other_image0},{bussiness_image : this.state.other_image1},{bussiness_image : this.state.other_image2}];
    await this.setState({ otherImage: otherImage });
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeHandler1 = event => {
    this.setState({ [event.target.name]: event.target.value ,
    country_selected_id:event.target.value},()=>{
      this._loadStateCategories();
    });
    // console.log("this.state.country_selected_id1",this.state.country_selected_id)
    
    
    // this.setState({ [event.target.name]: event.target.value });
  };

  checkBoxHandler = event => {
    if (event.target.checked) {
      this.setState({ [event.target.name]: true });
    } else {
      this.setState({ [event.target.name]: false });
    }
  };

  allChanger = event => {
    let {
      monday,
      mondayStart1,
      mondayStart2,
      mondayEnd1,
      mondayEnd2
    } = this.state;
    let isValid = false;
    this.setState({ applyAllError: "" });
    if (monday == "CLOSED" || monday == "OPEN 24x7") {
      isValid = true;
    } else if (monday == "OPEN") {
      if (mondayStart1 && mondayEnd1) {
        isValid = true;
      }
    } else if (monday == "SPLIT") {
      if (mondayStart1 && mondayStart2 && mondayEnd1 && mondayEnd2) {
        isValid = true;
      }
    }

    if (isValid == false) {
      this.setState({
        applyAllError: "Select  operating hours of Monday first"
      });
    }

    if (event.target.checked && isValid) {
      this.setState({
        applyAll: true,

        tuesday: this.state.monday,
        tuesdayStart1: this.state.mondayStart1,
        tuesdayEnd1: this.state.mondayEnd1,
        tuesdayStart2: this.state.mondayStart2,
        tuesdayEnd2: this.state.mondayEnd2,

        wednesday: this.state.monday,
        wednesdayStart1: this.state.mondayStart1,
        wednesdayEnd1: this.state.mondayEnd1,
        wednesdayStart2: this.state.mondayStart2,
        wednesdayEnd2: this.state.mondayEnd2,

        thursday: this.state.monday,
        thursdayStart1: this.state.mondayStart1,
        thursdayEnd1: this.state.mondayEnd1,
        thursdayStart2: this.state.mondayStart2,
        thursdayEnd2: this.state.mondayEnd2,

        friday: this.state.monday,
        fridayStart1: this.state.mondayStart1,
        fridayEnd1: this.state.mondayEnd1,
        fridayStart2: this.state.mondayStart2,
        fridayEnd2: this.state.mondayEnd2,

        saturday: this.state.monday,
        saturdayStart1: this.state.mondayStart1,
        saturdayEnd1: this.state.mondayEnd1,
        saturdayStart2: this.state.mondayStart2,
        saturdayEnd2: this.state.mondayEnd2,

        sunday: this.state.monday,
        sundayStart1: this.state.mondayStart1,
        sundayEnd1: this.state.mondayEnd1,
        sundayStart2: this.state.mondayStart2,
        sundayEnd2: this.state.mondayEnd2
      });
    } else {
      this.setState({
        applyAll: false,

        tuesday: "",
        tuesdayStart1: "",
        tuesdayEnd1: "",
        tuesdayStart2: "",
        tuesdayEnd2: "",

        wednesday: "",
        wednesdayStart1: "",
        wednesdayEnd1: "",
        wednesdayStart2: "",
        wednesdayEnd2: "",

        thursday: "",
        thursdayStart1: "",
        thursdayEnd1: "",
        thursdayStart2: "",
        thursdayEnd2: "",

        friday: "",
        fridayStart1: "",
        fridayEnd1: "",
        fridayStart2: "",
        fridayEnd2: "",

        saturday: "",
        saturdayStart1: "",
        saturdayEnd1: "",
        saturdayStart2: "",
        saturdayEnd2: "",

        sunday: "",
        sundayStart1: "",
        sundayEnd1: "",
        sundayStart2: "",
        sundayEnd2: ""
      });
    }
  };

  _loadBusinessCategories = () => {
    this.setState({ loadBusinessCategories: true });
    // Axios.get(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/dropdown-values/business-categoryes",
    //   DjangoConfig
    // )
    const data = {secure_pin}
    console.log("data1234", data)
    business_categories(data)
      .then(res => {
        console.log("hello123", res.data.bussiness_category_array)
        const busi_cat =res.data.bussiness_category_array

        console.log("hello1234", busi_cat)
           this.setState({
          businessCategories: busi_cat,
          loadBusinessCategories: false
          
        });
       
      })
      .catch(res => {
        console.log("error in loading business categories");
      });
      console.log(this.state)
  };

  _loadCountryCategories = () => {
    this.setState({ loadCountryCategories: true });
    // Axios.get(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/dropdown-values/counrty",
    //   DjangoConfig
    // )
    const data = {secure_pin}
    business_counrty(data)
      .then(res => {
        console.log("resp223",res)
        this.setState({
          countryCategories: res.data.country_array,
          loadCountryCategories: false
        });
        console.log("all country a", this.state.countryCategories);
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  _loadStateCategories = () => {

    // console.log()
    this.setState({ loadStateCategories: true });
    // Axios.get(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/dropdown-values/states",
    //   DjangoConfig
    // )
    const data = {secure_pin,countryid:this.state.country_selected_id}
    console.log("this.state.country_selected_id111",this.state.country_selected_id)
    business_states(data)
      .then(res => {
        console.log("00",res)
        this.setState({
          stateCategories: res.data.all_states,
          loadStateCategories: false
        });
      })
      .catch(res => {
        console.log("error in loading state categories");
      });
  };

  componentDidMount() {
    this._loadBusinessCategories();
    this._loadCountryCategories();
    // this._loadStateCategories();
  }

  render() {
    if (this.state.isSuccess) {
      return <Redirect to="/" />;
    }
    let {
      businessCategories,
      countryCategories,
      stateCategories,
      loadBusinessCategories,
      loadCountryCategories,
      loadStateCategories,
      locationName_error,
      storeCode_error,
      category_error,
      additionalCategories_error,
      address1_error,
      address2_error,
      city_error,
      state_error,
      country_error,
      zipCode_error,
      website_error,
      phone_error,
      hours_error,
      about_error,
      ownerName_error,
      ownerEmail_error,
      yearOfIncorp_error,
      businessTagline_error,
      instagramProfile_error,
      twitterProfile_error,
      facebookProfile_error,
      paymentMethod_error,
      show_message,
      BusinessLogo,
      BusinessCoverImage,
      other_image0,
      other_image1,
      other_image2,

      //apply all hours
      applyAll,

      tuesday,
      tuesdayStart1,
      tuesdayEnd1,
      tuesdayStart2,
      tuesdayEnd2,

      wednesday,
      wednesdayStart1,
      wednesdayEnd1,
      wednesdayStart2,
      wednesdayEnd2,

      thursday,
      thursdayStart1,
      thursdayEnd1,
      thursdayStart2,
      thursdayEnd2,

      friday,
      fridayStart1,
      fridayEnd1,
      fridayStart2,
      fridayEnd2,

      saturday,
      saturdayStart1,
      saturdayEnd1,
      saturdayStart2,
      saturdayEnd2,

      sunday,
      sundayStart1,
      sundayEnd1,
      sundayStart2,
      sundayEnd2,

      applyAllError
    } = this.state;

    // console.log("this.state", this.state);

    return (
      <div>
        {/* <div className="content-page"> */}

        <div className="main_content">
          <form
            className="needs-validation"
            onSubmit={this.submitHandler}
            noValidate
          >
            <div className="rightside_title">
              <h1>Add Location</h1>
            </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="analytics-whice">
                    <div className="box-space">
                      <h2 className="analytics_btnx">New Location </h2>
                    </div>

                    <div className="promotional-box border-bottom">
                      <div className="stepone-loaction">
                        <h4>
                          <span>step 1</span> Location Information
                        </h4>
<MDBRow className='addlocationboxs'>
  <MDBCol md='8'>
  <MDBRow>
                          <MDBCol md='6' className="form-group">
                          <label>Store Code</label>
                              <input
                                type="text"
                                name="storeCode"
                                onChange={this.changeHandler}
                                placeholder="Please enter store code"
                                className="form-control"
                              />
                              <div class='err_msg'>
                                {storeCode_error}
                              </div>
 
                          </MDBCol>
                          <MDBCol md='6' className="form-group">
                          <label>
                                Location Name <span className="red">*</span>
                              </label>
                              <input
                                type="text"
                                name="locationName"
                                onChange={this.changeHandler}
                                placeholder="Enter Location Name"
                                className="form-control"
                              />
                              <div class='err_msg'>
                                {locationName_error}
                              </div>
                          </MDBCol>

                          <MDBCol md='6' className="form-group">
                          <label>
                                Business Category <span className="red">*</span>
                              </label>
                          {loadBusinessCategories ? (
                                <h4>Loading.....</h4>
                              ) : (
                                <div>
                                  <select
                                    name="category"
                                    onChange={this.changeHandler}
                                    className="form-control"
                                    id="primaryCategory"
                                    required
                                  >
                                    <option value="0" disabled="">
                                      Select A Business Category
                                    </option>
                                    {this.state.businessCategories.map((b, i) => (
                                      <option
                                        key={`business-${i}`}
                                        value={b.id}
                                      >
                                        {b.name}
                                      </option>
                                    ))}
                                  </select>
                                  <div class='err_msg'>
                                    {category_error}
                                  </div>
                                </div>
                              )}
                          </MDBCol>

                          <MDBCol md='6 ' className="form-group">
                            <label>Additional Categories</label>
                              <textarea
                                name="additionalCategories"
                                onChange={this.changeHandler}
                                className="form-control"
                              ></textarea>
                              <div class='err_msg'>
                                {additionalCategories_error}
                              </div>
                          </MDBCol>
                        </MDBRow>
  </MDBCol>
  <MDBCol md='2' className='offset-md-1'>
  <label>Business Logo</label>

{BusinessLogo ? (
  <img src={BusinessLogo} alt="Business Logo" />
) : (
  <div className="staresd margin-top0">
    <div className="imgup">
      <i className="zmdi zmdi-image"></i>
    </div>
  </div>
)}

<div className="upload_btnbox">
  <button>Upload your logo</button>
  <input
    type="file"
    onChange={this.onUploadLogo}
  />
</div>
  </MDBCol>
</MDBRow>
                       
<hr/>
                       
                        

                        <div className="row addlocationboxs">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>
                                address 1 <span>*</span>
                              </label>
                              <input
                                type="text"
                                name="address1"
                                onChange={this.changeHandler}
                                placeholder="Colony / Street / Locality"
                                className="form-control"
                              />
                              <div class='err_msg'>
                                {address1_error}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label>address 2</label>
                              <input
                                type="text"
                                name="address2"
                                onChange={this.changeHandler}
                                placeholder="Flat / House No. / Floor / Building"
                                className="form-control"
                              />
                              <div class='err_msg'>
                                {address2_error}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label>
                                City <span>*</span>
                              </label>
                              <input
                                type="text"
                                name="city"
                                onChange={this.changeHandler}
                                placeholder="Enter City Name"
                                className="form-control"
                              />
                              <div class='err_msg'>{city_error}</div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label>
                                Country <span>*</span>
                              </label>
                              {/* <select
                                name="country"
                                onChange={this.changeHandler}
                                id="country"
                                required
                                className="form-control"
                              >
                                <option value="0" disabled="">
                                  Select Country
                                </option>
                                <option value="1">Australia</option>
                              </select> */}

                              <div>
                                <select
                                  name="country"
                                  onChange={this.changeHandler1}
                                  id="country"
                                  required
                                  className="form-control"
                                >
                                  <option value="0" disabled="">
                                    {loadCountryCategories
                                      ? "Loading....."
                                      : "Select Country"}
                                  </option>
                                  {countryCategories.map((c, i) => (
                                    <option key={`country-${i}`} value={c.id}>
                                      {c.name}
                                    </option>
                                  ))}
                                </select>
                                <div class='err_msg'>
                                  {country_error}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label>
                                State <span>*</span>
                              </label>
                              {/* <select
                                name="state"
                                onChange={this.changeHandler}
                                id="state"
                                required
                                className="form-control"
                              >
                                <option value="0" disabled="">
                                  Select State
                                </option>
                                <option value="1">Auckland</option>
                              </select> */}

                              <div>
                                <select
                                  name="state"
                                  onChange={this.changeHandler}
                                  id="state"
                                  required
                                  className="form-control"
                                >
                                  <option value="0" disabled="">
                                    {this.state.country_selected_id == "" ||
                                    loadStateCategories
                                      ? "Select Country first"
                                      : "Select State"}
                                  </option>
                                  {stateCategories.map((s, i) =>
                                    this.state.country_selected_id == s.country_id ? (
                                      <option key={`stste-${i}`} value={s.id}>
                                        {s.name}
                                      </option>
                                    ) : (
                                      ""
                                    )
                                  )}
                                </select>
                                <div class='err_msg'>
                                  {state_error}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label>
                                Zipcode <span>*</span>
                              </label>
                              <input
                                type="text"
                                name="zipCode"
                                onChange={this.changeHandler}
                                id="state"
                                placeholder="Enter zipcode"
                                required
                                className="form-control"
                              />
                              <div class='err_msg'>
                                {zipCode_error}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Phone</label>
                              <input
                                type="tel"
                                name="phone"
                                onChange={this.changeHandler}
                                className="form-control"
                                placeholder="Enter your number"
                              />
                              <div class='err_msg'>{phone_error}</div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Website</label>
                              <input
                                name="website"
                                onChange={this.changeHandler}
                                type="url"
                                className="form-control"
                                placeholder="Enter your website"
                              />
                              <div class='err_msg'>
                                {website_error}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group checkboxadd">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={
                                    this.state.Franchise_Location == "true"
                                      ? true
                                      : false
                                  }
                                  name="Franchise_Location"
                                  value={
                                    this.state.Franchise_Location == "true"
                                      ? false
                                      : true
                                  }
                                  onChange={this.changeHandler}
                                  id="CheckboxGroup1_0"
                                />
                                Franchise Location?
                              </label>

                              <label>
                                <input
                                  type="checkbox"
                                  checked={
                                    this.state.Do_not_publish_my_address ==
                                    "true"
                                      ? true
                                      : false
                                  }
                                  name="Do_not_publish_my_address"
                                  value={
                                    this.state.Do_not_publish_my_address ==
                                    "true"
                                      ? false
                                      : true
                                  }
                                  onChange={this.changeHandler}
                                  id="CheckboxGroup1_1"
                                />
                                Do not publish my address
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="promotional-box border-bottom">
                      <div className="stepone-loaction">
                        <h4>
                          <span>step 2</span> Business and Operational
                          Information
                        </h4>

                        <div className="row addlocationboxs">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Business Owner Name</label>
                              <input
                                name="ownerName"
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                id="ownerName"
                                placeholder="Enter Business Owner Name"
                              ></input>
                              <div class='err_msg'>
                                {ownerName_error}
                              </div>
                            </div>
                            <div className="form-group">
                              <label>Owner Email</label>
                              <input
                                name="ownerEmail"
                                onChange={this.changeHandler}
                                type="email"
                                className="form-control"
                                id="ownerEmail"
                                placeholder="Enter Owner Email"
                              ></input>
                              <div class='err_msg'>
                                {ownerEmail_error}
                              </div>
                            </div>

                            <div className="form-group">
                              <label>Business Tagline</label>
                              <input
                                name="businessTagline"
                                onChange={this.changeHandler}
                                className="form-control"
                                id="businessTagline"
                                placeholder="Enter Business Tagline"
                              ></input>
                              <div class='err_msg'>
                                {businessTagline_error}
                              </div>
                            </div>

                            <div className="form-group">
                              <label>Year of Incorporation</label>
                              <input
                                name="yearOfIncorp"
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                id="yearOfIncorp"
                                placeholder="Enter Year of Incorporation"
                              ></input>
                              <div class='err_msg'>
                                {yearOfIncorp_error}
                              </div>
                            </div>

                            <div className="form-group">
                              <label>
                                About The Business <span>*</span>
                              </label>
                              <textarea
                                name="about"
                                onChange={this.changeHandler}
                                className="form-control businessh"
                              ></textarea>
                              <div class='err_msg'>{about_error}</div>
                            </div>
                            <div className="form-group">
                              <label>Facebook Profile</label>
                              <input
                                name="facebookProfile"
                                onChange={this.changeHandler}
                                type="url"
                                className="form-control"
                                placeholder="Enter Facbook Profile"
                              />
                              <div class='err_msg'>
                                {facebookProfile_error}
                              </div>
                            </div>

                            <div className="form-group">
                              <label>Instagram Profile</label>
                              <input
                                name="instagramProfile"
                                onChange={this.changeHandler}
                                type="url"
                                className="form-control"
                                placeholder="Enter Instagram Profile"
                              />
                              <div class='err_msg'>
                                {instagramProfile_error}
                              </div>
                            </div>

                            <div className="form-group">
                              <label>Twitter Profile</label>
                              <input
                                name="twitterProfile"
                                onChange={this.changeHandler}
                                type="url"
                                className="form-control"
                                placeholder="Enter Twitter Profile"
                              />
                              <div class='err_msg'>
                                {twitterProfile_error}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <div >
                                <MDBRow>
                                  <MDBCol md="9" className="vl_box_head">
                                    Operations Hours
                                  </MDBCol>
                                </MDBRow>
                                <div className="vl_gap5 ">
                                  <MDBRow className=" daybox2">
                                    <MDBCol md="3" className="daytype">
                                      Monday
                                    </MDBCol>
                                    <MDBCol md="5">
                                      <select
                                        name="monday"
                                        onChange={this.changeHandler}
                                        className="vl_edit_input"
                                      >
                                        <option>Select hours</option>
                                        <option value="OPEN">OPEN</option>
                                        <option value="SPLIT">SPLIT</option>
                                        <option value="OPEN 24x7">
                                          OPEN_24x7
                                        </option>
                                        <option value="CLOSED">CLOSED</option>
                                      </select>
                                    </MDBCol>
                                    <MDBCol md="4">
                                      <div className="output">
                                        {this.state.monday == "OPEN" ? (
                                          <div>
                                            <p className="basicExample">
                                              {console.log("time")}

                                              <input
                                                name="mondayStart1"
                                                onChange={this.changeHandler}
                                                type="time"
                                                className="vl_edit_input"
                                                defaultValue="12:00 AM"
                                              />

                                              <input
                                                name="mondayEnd1"
                                                onChange={this.changeHandler}
                                                type="time"
                                                className="vl_edit_input"
                                                defaultValue="12:00 AM"
                                              />
                                            </p>{" "}
                                          </div>
                                        ) : (
                                          ""
                                        )}

                                        {this.state.monday == "SPLIT" ? (
                                          <div>
                                            <p className="basicExample">
                                              <input
                                                name="mondayStart1"
                                                onChange={this.changeHandler}
                                                type="time"
                                                className="vl_edit_input"
                                                defaultValue="12:00 AM"
                                              />

                                              <input
                                                name="mondayEnd1"
                                                onChange={this.changeHandler}
                                                type="time"
                                                className="vl_edit_input"
                                                defaultValue="12:00 AM"
                                              />

                                              <input
                                                name="mondayStart2"
                                                onChange={this.changeHandler}
                                                type="time"
                                                className="vl_edit_input"
                                                defaultValue="12:00 AM"
                                              />

                                              <input
                                                name="mondayEnd2"
                                                onChange={this.changeHandler}
                                                type="time"
                                                className="vl_edit_input"
                                                defaultValue="12:00 AM"
                                              />
                                            </p>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </MDBCol>
                                    <div className='apply_all_margin'>
                              <span><input
                                    type="checkbox"
                                    name="applyAll"
                                    onChange={this.allChanger}
                                  /></span>
                                  <span className='apply_all'>Apply To All</span>
                                  </div>
                                  <div class='err_msg apply_all_margin'>
                                    {applyAllError}
                                  </div>
                                  </MDBRow>

                                 
                                  {applyAll && !applyAllError ? (
                                    ""
                                  ) : (
                                    <div>
                                      <MDBRow className=" daybox2">
                                        <MDBCol md="3" className="daytype">
                                          Tuesday
                                        </MDBCol>
                                        <MDBCol md="5">
                                          <select
                                            name="tuesday"
                                            onChange={this.changeHandler}
                                            className="vl_edit_input"
                                          >
                                            <option>Select hours</option>
                                            <option value="OPEN">OPEN</option>
                                            <option value="SPLIT">SPLIT</option>
                                            <option value="OPEN 24x7">
                                              OPEN_24x7
                                            </option>
                                            <option value="CLOSED">
                                              CLOSED
                                            </option>
                                          </select>
                                        </MDBCol>
                                        <MDBCol md="4">
                                          <div className="output">
                                            {this.state.tuesday == "OPEN" ? (
                                              <div>
                                                <p className="basicExample">
                                                  {console.log("time")}

                                                  <input
                                                    name="tuesdayStart1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="tuesdayEnd1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />
                                                </p>{" "}
                                              </div>
                                            ) : (
                                              ""
                                            )}

                                            {this.state.tuesday == "SPLIT" ? (
                                              <div>
                                                <p className="basicExample">
                                                  <input
                                                    name="tuesdayStart1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="tuesdayEnd1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="tuesdayStart2"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="tuesdayEnd2"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />
                                                </p>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        </MDBCol>
                                      </MDBRow>
                                      
                                      <MDBRow className=" daybox2">
                                        <MDBCol md="3" className="daytype">
                                          Wednesday
                                        </MDBCol>
                                        <MDBCol md="5">
                                          <select
                                            name="wednesday"
                                            onChange={this.changeHandler}
                                            className="vl_edit_input"
                                          >
                                            <option>Select hours</option>
                                            <option value="OPEN">OPEN</option>
                                            <option value="SPLIT">SPLIT</option>
                                            <option value="OPEN 24x7">
                                              OPEN_24x7
                                            </option>
                                            <option value="CLOSED">
                                              CLOSED
                                            </option>
                                          </select>
                                        </MDBCol>
                                        <MDBCol md="4">
                                          <div className="output">
                                            {this.state.wednesday == "OPEN" ? (
                                              <div>
                                                <p className="basicExample">
                                                  {console.log("time")}

                                                  <input
                                                    name="wednesdayStart1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="wednesdayEnd1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />
                                                </p>{" "}
                                              </div>
                                            ) : (
                                              ""
                                            )}

                                            {this.state.wednesday == "SPLIT" ? (
                                              <div>
                                                <p className="basicExample">
                                                  <input
                                                    name="wednesdayStart1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="wednesdayEnd1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="wednesdayStart2"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="wednesdayEnd2"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />
                                                </p>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        </MDBCol>
                                      </MDBRow>
                                     
                                      <MDBRow className=" daybox2">
                                        <MDBCol md="3" className="daytype">
                                          Thrusday
                                        </MDBCol>
                                        <MDBCol md="5">
                                          <select
                                            name="thursday"
                                            onChange={this.changeHandler}
                                            className="vl_edit_input"
                                          >
                                            <option>Select hours</option>
                                            <option value="OPEN">OPEN</option>
                                            <option value="SPLIT">SPLIT</option>
                                            <option value="OPEN 24x7">
                                              OPEN_24x7
                                            </option>
                                            <option value="CLOSED">
                                              CLOSED
                                            </option>
                                          </select>
                                        </MDBCol>
                                        <MDBCol md="4">
                                          <div className="output">
                                            {this.state.thursday == "OPEN" ? (
                                              <div>
                                                <p className="basicExample">
                                                  {console.log("time")}

                                                  <input
                                                    name="thursdayStart1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="thursdayEnd1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />
                                                </p>{" "}
                                              </div>
                                            ) : (
                                              ""
                                            )}

                                            {this.state.thursday == "SPLIT" ? (
                                              <div>
                                                <p className="basicExample">
                                                  <input
                                                    name="thursdayStart1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="thursdayEnd1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="thursdayStart2"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="thursdayEnd2"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />
                                                </p>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        </MDBCol>
                                      </MDBRow>
                                    
                                      <MDBRow className=" daybox2">
                                        <MDBCol md="3" className="daytype">
                                          Friday
                                        </MDBCol>
                                        <MDBCol md="5">
                                          <select
                                            name="friday"
                                            onChange={this.changeHandler}
                                            className="vl_edit_input"
                                          >
                                            <option>Select hours</option>
                                            <option value="OPEN">OPEN</option>
                                            <option value="SPLIT">SPLIT</option>
                                            <option value="OPEN 24x7">
                                              OPEN_24x7
                                            </option>
                                            <option value="CLOSED">
                                              CLOSED
                                            </option>
                                          </select>
                                        </MDBCol>
                                        <MDBCol md="4">
                                          <div className="output">
                                            {this.state.friday == "OPEN" ? (
                                              <div>
                                                <p className="basicExample">
                                                  {console.log("time")}

                                                  <input
                                                    name="fridayStart1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="fridayEnd1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />
                                                </p>{" "}
                                              </div>
                                            ) : (
                                              ""
                                            )}

                                            {this.state.friday == "SPLIT" ? (
                                              <div>
                                                <p className="basicExample">
                                                  <input
                                                    name="fridayStart1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="fridayEnd1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="fridayStart2"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="fridayEnd2"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />
                                                </p>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        </MDBCol>
                                      </MDBRow>
                                      {/* <div className="timebox">
                                <div className="form-day"> FRIDAY</div>
                                <select
                                  name="friday"
                                  onChange={this.changeHandler}
                                  className="form-control colorselector"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>

                                <div className="output">
                                  {this.state.friday == "OPEN" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="fridayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="fridayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>{" "}
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {this.state.friday == "SPLIT" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="fridayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="fridayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="fridayStart2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="fridayEnd2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div> */}

                                      <MDBRow className=" daybox2">
                                        <MDBCol md="3" className="daytype">
                                          Saturday
                                        </MDBCol>
                                        <MDBCol md="5">
                                          <select
                                            name="saturday"
                                            onChange={this.changeHandler}
                                            className="vl_edit_input"
                                          >
                                            <option>Select hours</option>
                                            <option value="OPEN">OPEN</option>
                                            <option value="SPLIT">SPLIT</option>
                                            <option value="OPEN 24x7">
                                              OPEN_24x7
                                            </option>
                                            <option value="CLOSED">
                                              CLOSED
                                            </option>
                                          </select>
                                        </MDBCol>
                                        <MDBCol md="4">
                                          <div className="output">
                                            {this.state.saturday == "OPEN" ? (
                                              <div>
                                                <p className="basicExample">
                                                  {console.log("time")}

                                                  <input
                                                    name="saturdayStart1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="saturdayEnd1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />
                                                </p>{" "}
                                              </div>
                                            ) : (
                                              ""
                                            )}

                                            {this.state.saturday == "SPLIT" ? (
                                              <div>
                                                <p className="basicExample">
                                                  <input
                                                    name="saturdayStart1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="saturdayEnd1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="saturdayStart2"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="saturdayEnd2"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />
                                                </p>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        </MDBCol>
                                      </MDBRow>
                                      {/* <div className="timebox">
                                <div className="form-day">SATURDAY</div>
                                <select
                                  name="saturday"
                                  onChange={this.changeHandler}
                                  className="form-control colorselector"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>

                                <div className="output">
                                  {this.state.saturday == "OPEN" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="saturdayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="saturdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>{" "}
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {this.state.saturday == "SPLIT" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="saturdayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="saturdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="saturdayStart2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="saturdayEnd2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div> */}
                                      <MDBRow className=" daybox2">
                                        <MDBCol md="3" className="daytype">
                                          Sunday
                                        </MDBCol>
                                        <MDBCol md="5">
                                          <select
                                            name="sunday"
                                            onChange={this.changeHandler}
                                            className="vl_edit_input"
                                          >
                                            <option>Select hours</option>
                                            <option value="OPEN">OPEN</option>
                                            <option value="SPLIT">SPLIT</option>
                                            <option value="OPEN 24x7">
                                              OPEN_24x7
                                            </option>
                                            <option value="CLOSED">
                                              CLOSED
                                            </option>
                                          </select>
                                        </MDBCol>
                                        <MDBCol md="4">
                                          <div className="output">
                                            {this.state.sunday == "OPEN" ? (
                                              <div>
                                                <p className="basicExample">
                                                  {console.log("time")}

                                                  <input
                                                    name="sundayStart1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="sundayEnd1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />
                                                </p>{" "}
                                              </div>
                                            ) : (
                                              ""
                                            )}

                                            {this.state.sunday == "SPLIT" ? (
                                              <div>
                                                <p className="basicExample">
                                                  <input
                                                    name="sundayStart1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="sundayEnd1"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="sundayStart2"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />

                                                  <input
                                                    name="sundayEnd2"
                                                    onChange={
                                                      this.changeHandler
                                                    }
                                                    type="time"
                                                    className="vl_edit_input"
                                                    defaultValue="12:00 AM"
                                                  />
                                                </p>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        </MDBCol>
                                      </MDBRow>
                                      {/* <div className="timebox">
                                <div className="form-day">SUNDAY</div>
                                <select
                                  name="sunday"
                                  onChange={this.changeHandler}
                                  className="form-control colorselector"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>

                                <div className="output">
                                  {this.state.sunday == "OPEN" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="sundayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="sundayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>{" "}
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {this.state.sunday == "SPLIT" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="sundayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="sundayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="sundayStart2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time form-control "
                                          defaultValue="12:00 AM"
                                        />

                                        <input
                                          name="sundayEnd2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="time end form-control "
                                          defaultValue="12:00 AM"
                                        />
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div> 
                              </div>*/}
                                    </div>
                                  )}
                                </div>
                              </div>

                             
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="stepone-loaction">
                                <h4>Payment Methods</h4>
                                <MDBRow>
<MDBCol md='2' >
  <div className='payment_box ' >
<input
      name="p_visa"
      type="checkbox"
      onChange={this.checkBoxHandler}
      value="true"
      id="myCheckbox1"
    /> 
    <label className='payment_label' for="myCheckbox1">
    <img
      src={require("../images/p-visa.png")}
      alt="Visa"
      className='payment_img'
    />
    </label>
    </div>
    
</MDBCol>

<MDBCol md='2' >
  <div className='payment_box'>
<input
      name="p_maestro"
      onChange={this.checkBoxHandler}
      value="true"
      type="checkbox"
      id="myCheckbox2"
      /> 
      <label className='payment_label' for="myCheckbox2">
    <img
      src={require("../images/p-maestro.png")}
      alt="Maestro"
      className='payment_img'
    />
    </label>
    </div>
</MDBCol>

<MDBCol md='2'>
<div  className='payment_box '> 
<input
      name="p_amex"
      type="checkbox"
      onChange={this.checkBoxHandler}
      value="true"
      id="myCheckbox3"
      /> 
      <label className='payment_label' for="myCheckbox3">
    <img
      src={require("../images/p-amex.png")}
      alt="Amex"
    />
    </label>
    </div>
</MDBCol>

<MDBCol md='2'>
<div  className='payment_box '> 
<input
      name="p_cash"
      onChange={this.checkBoxHandler}
      value="true"
      type="checkbox"
      id="myCheckbox4"
      /> 
      <label className='payment_label' for="myCheckbox4">
    <img
      src={require("../images/p-cash.png")}
      alt="Cash"
    />
    </label>
    </div>
</MDBCol>

<MDBCol md='2'>
<div  className='payment_box '> 
<input
      name="p_crypto"
      onChange={this.checkBoxHandler}
      value="true"
      type="checkbox"
      id="myCheckbox5"
      /> 
      <label className='payment_label' for="myCheckbox5">
    <img
      src={require("../images/p-crypto.png")}
      alt="Crypto"
    />
    </label>
    </div>
</MDBCol>

<MDBCol md='2'>
<div  className='payment_box '> 
<input
      name="p_diners"
      onChange={this.checkBoxHandler}
      value="true"
      type="checkbox"
      id="myCheckbox6"
      /> 
      <label className='payment_label' for="myCheckbox6">
    <img
      src={require("../images/p-diners.png")}
      alt="Diners"
    />
    </label>
    </div>
</MDBCol>

<MDBCol md='2'>
<div  className='payment_box '> 
<input
      name="p_discover"
      onChange={this.checkBoxHandler}
      value="true"
      type="checkbox"
      id="myCheckbox7"
      /> 
      <label className='payment_label' for="myCheckbox7">
    <img
      src={require("../images/p-discover.png")}
      alt="Discover"
    />
    </label>
    </div>
</MDBCol>

<MDBCol md='2'>
<div  className='payment_box '> 
<input
      name="p_apple"
      onChange={this.checkBoxHandler}
      value="true"
      type="checkbox"
      id="myCheckbox8"
      /> 
      <label className='payment_label' for="myCheckbox8">
    <img
      src={require("../images/p-apple.png")}
      alt="Apple"
    />
    </label>
    </div>
</MDBCol>

<MDBCol md='2'>
<div  className='payment_box '>
<input
      name="p_samsung"
      onChange={this.checkBoxHandler}
      value="true"
      type="checkbox"
      id="myCheckbox9"
      /> 
      <label className='payment_label' for="myCheckbox9">
    <img
      src={require("../images/p-samsung.png")}
      alt="Samsung"
    />
    </label>
    </div>
</MDBCol>

<MDBCol md='2'>
<div  className='payment_box '>
<input
      name="p_paypal"
      onChange={this.checkBoxHandler}
      value="true"
      type="checkbox"
      id="myCheckbox10"
      /> 
      <label className='payment_label' for="myCheckbox10">
    <img
      src={require("../images/p-paypal.png")}
      alt="Paypal"
    /> 
    </label>
    </div> 
</MDBCol>

<MDBCol md='2'>
<div  className='payment_box '> 
<input
      name="p_android"
      onChange={this.checkBoxHandler}
      value="true"
      type="checkbox"
      id="myCheckbox11"
      /> 
      <label className='payment_label' for="myCheckbox11">
    <img
      src={require("../images/p-android.png")}
      alt="Android"
    />
    </label>
    </div>
</MDBCol>

<MDBCol md='2'>
<div  className='payment_box '> 
<input
      name="p_invoices"
      onChange={this.checkBoxHandler}
      value="true"
      type="checkbox"
      id="myCheckbox12"
      /> 
      <label className='payment_label' for="myCheckbox12">
    <img
      src={require("../images/p-invoices.png")}
      alt="Invoices"
    />
    </label>
    </div>
</MDBCol>

<MDBCol md='2'>
<div  className='payment_box '>
<input
      name="p_traveler"
      onChange={this.checkBoxHandler}
      value="true"
      type="checkbox"
      id="myCheckbox13"
      /> 
      <label className='payment_label' for="myCheckbox13">
    <img
      src={require("../images/p-traveler.png")}
      alt="Traveler's Check"
    />
    </label>
    </div>
</MDBCol>

<MDBCol md='2'>
<div  className='payment_box '> 
<input
      name="p_financing"
      onChange={this.checkBoxHandler}
      value="true"
      type="checkbox"
      id="myCheckbox14"
      /> 
      <label className='payment_label' for="myCheckbox14">
    <img
      src={require("../images/p-financing.png")}
      alt="Financing"
    />
    </label>
    </div>
</MDBCol>
</MDBRow>                 
                                                  {/* <div className="paymentbox">
                                  <ul>
                                    
                                    <li>
                                      <input
                                        name="p_visa"
                                        type="checkbox"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                      />
                                      <img
                                        src={require("../images/p-visa.png")}
                                        alt="Visa"
                                      />
                                    </li>

                                    <li>
                                      <input
                                        name="p_maestro"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                        type="checkbox"
                                      />{" "}
                                      <img
                                        src={require("../images/p-maestro.png")}
                                        alt="Maestro"
                                      />
                                    </li>
                                    <li>
                                      <input
                                        name="p_amex"
                                        type="checkbox"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                      />
                                      <img
                                        src={require("../images/p-amex.png")}
                                        alt="Amex"
                                      />
                                    </li>

                                    <li>
                                      <input
                                        name="p_cash"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                        type="checkbox"
                                      />{" "}
                                      <img
                                        src={require("../images/p-cash.png")}
                                        alt="Cash"
                                      />
                                    </li>
                                    <li>
                                      <input
                                        name="p_check"
                                        type="checkbox"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                      />
                                      <img
                                        src={require("../images/p-check.png")}
                                        alt="Check"
                                      />
                                    </li>

                                    <li>
                                      <input
                                        name="p_crypto"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                        type="checkbox"
                                      />{" "}
                                      <img
                                        src={require("../images/p-crypto.png")}
                                        alt="Crypto"
                                      />
                                    </li>
                                    <li>
                                      <input
                                        name="p_diners"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                        type="checkbox"
                                      />{" "}
                                      <img
                                        src={require("../images/p-diners.png")}
                                        alt="Diners"
                                      />
                                    </li>
                                    <li>
                                      <input
                                        name="p_discover"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                        type="checkbox"
                                      />{" "}
                                      <img
                                        src={require("../images/p-discover.png")}
                                        alt="Discover"
                                      />
                                    </li>
                                    <li>
                                      <input
                                        name="p_apple"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                        type="checkbox"
                                      />{" "}
                                      <img
                                        src={require("../images/p-apple.png")}
                                        alt="Apple"
                                      />
                                    </li>
                                    <li>
                                      <input
                                        name="p_samsung"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                        type="checkbox"
                                      />{" "}
                                      <img
                                        src={require("../images/p-samsung.png")}
                                        alt="Samsung"
                                      />
                                    </li>
                                    <li>
                                      <input
                                        name="p_paypal"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                        type="checkbox"
                                      />{" "}
                                      <img
                                        src={require("../images/p-paypal.png")}
                                        alt="Paypal"
                                      />
                                    </li>
                                    <li>
                                      <input
                                        name="p_android"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                        type="checkbox"
                                      />{" "}
                                      <img
                                        src={require("../images/p-android.png")}
                                        alt="Android"
                                      />
                                    </li>
                                    <li>
                                      <input
                                        name="p_invoices"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                        type="checkbox"
                                      />{" "}
                                      <img
                                        src={require("../images/p-invoices.png")}
                                        alt="Invoices"
                                      />
                                    </li>
                                    <li>
                                      <input
                                        name="p_traveler"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                        type="checkbox"
                                      />{" "}
                                      <img
                                        src={require("../images/p-traveler.png")}
                                        alt="Traveler's Check"
                                      />
                                    </li>
                                    <li>
                                      <input
                                        name="p_financing"
                                        onChange={this.checkBoxHandler}
                                        value="true"
                                        type="checkbox"
                                      />{" "}
                                      <img
                                        src={require("../images/p-financing.png")}
                                        alt="Financing"
                                      />
                                    </li>
                                  </ul>
                                  <div class='err_msg'>
                                    {paymentMethod_error}
                                  </div>
                                </div> */}
                              </div>
                           
                    </div>

                    <div className="promotional-box border-bottom">
                      <div className="stepone-loaction">
                        <h4>
                          <span>step 3</span> Business Images & Media
                        </h4>

                        <div className="row addlocationboxs">
                          <div className="col-md-4">
                            <label>Business Cover Image</label>
                            <div className="coverimgupload">
                              {BusinessCoverImage ? (
                                <img
                                  src={BusinessCoverImage}
                                  alt="Business Cover Image"
                                />
                              ) : (
                                <div className="coverocn">
                                  <i className="zmdi zmdi-image"></i>
                                  <h4>Attatch a image</h4>
                                  <input
                                    type="file"
                                    onChange={this.onUploadCover}
                                  />
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-md-8">
                            <label>Starred Business images</label>
                            <div className="row">
                              <div className="col-md-3">
                                {other_image0 ? (
                                  <img src={other_image0} alt="other image" />
                                ) : (
                                  <div className="staresd">
                                    <div className="imgup">
                                      <i className="zmdi zmdi-image"></i>
                                      <input
                                        type="file"
                                        onChange={this.onUploadOther(
                                          "other_image0"
                                        )}
                                        name="other_image0"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="col-md-3">
                                {other_image1 ? (
                                  <img src={other_image1} alt="other image" />
                                ) : (
                                  <div className="staresd">
                                    <div className="imgup">
                                      <i className="zmdi zmdi-image"></i>
                                      <input
                                        type="file"
                                        onChange={this.onUploadOther(
                                          "other_image1"
                                        )}
                                        name="other_image1"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="col-md-3">
                                {other_image2 ? (
                                  <img src={other_image2} alt="other image" />
                                ) : (
                                  <div className="staresd">
                                    <div className="imgup">
                                      <i className="zmdi zmdi-image"></i>
                                      <input
                                        type="file"
                                        onChange={this.onUploadOther(
                                          "other_image2"
                                        )}
                                        name="other_image2"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           

            <div className="mt-30">
              <div className="row">
                <div className="col-md-12">
                  <div
                    className="business-cover text-center"
                    style={{ padding: "25px" }}
                  >
                    <p>Great! Your Business Location setup is complete</p>
                    {this.state.loading ? (
                      <Loader
                        type="Oval"
                        color="#00BFFF"
                        height={25}
                        width={25}
                        // timeout={3000} //3 secs
                      />
                    ) : this.state.isSuccess ? (
                      <div style={{ color: "green" }}>
                        Location added succesfully
                      </div>
                    ) : (
                      <div class='err_msg'>{show_message}</div>
                    )}
                    <div className="upload_btnbox">
                      <button type="submit">Add New Location</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* </div> */}
      </div>
    );
  }
}
