import React, { Component } from "react";
import {
  business_categories,
  location_by_id,
  edit_location_by_id,
  edit_location_operations_hours_by_id,
  edit_location_payment_by_id,
  update_images_by_location_id,
  add_other_images_by_location_id,
  delete_other_images_by_location_id,
  All_payment_by_location
} from "./apis/location";
import Spinner from "./common/Spinner";
import Loader from "react-loader-spinner";
import { MDBCol, MDBRow, MDBContainer } from "mdbreact";
import edit_icon from "./assets/edit.png";
import cross_img from "./assets/cross_img.png";
import edit from "./assets/edit.png";
import swal from "sweetalert";
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

export default class LocationManager extends Component {
  state = {
    location: [],
    name: "",
    storeCode: "",
    category: "",
    address: "",
    website: "",
    phone: "",
    hours: [],
    about: "",
    ownerName: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    ownerEmail: "",
    yearOfIncorp: "",
    businessTagline: "",
    instagramProfile: "",
    twitterProfile: "",
    facebookProfile: "",
    payment: [],
    loader: true,
    img_type:'',
    //edit details

    name_edit: "",
    storeCode_edit: "",
    address_edit: "",
    website_edit: "",
    phone_edit: "",
    about_edit: "",
    ownerName_edit: "",
    addressLine_edit: "",
    city_edit: "",
    state_edit: "",
    postalCode_edit: "",
    ownerEmail_edit: "",
    yearOfIncorp_edit: "",
    businessTagline_edit: "",
    instagramProfile_edit: "",
    twitterProfile_edit: "",
    facebookProfile_edit: "",

    detailEdit: false,
    detailEdit2: false,
    paymentEdit: false,
    hourEdit: false,

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

    mondayStart1_error: "",
    mondayStart2_error: "",
    mondayEnd1_error: "",
    mondayEnd2_error: "",
    tuesday_error: "",
    tuesdayStart1_error: "",
    tuesdayEnd1_error: "",
    tuesdayStart2_error: "",
    tuesdayEnd2_error: "",

    wednesday_error_error: "",
    wednesdayStart1_error: "",
    wednesdayEnd1_error: "",
    wednesdayStart2_error: "",
    wednesdayEnd2_error: "",

    thursday_error: "",
    thursdayStart1_error: "",
    thursdayEnd1_error: "",
    thursdayStart2_error: "",
    thursdayEnd2_error: "",

    friday_error: "",
    fridayStart1_error: "",
    fridayEnd1_error: "",
    fridayStart2_error: "",
    fridayEnd2_error: "",

    saturday_error: "",
    saturdayStart1_error: "",
    saturdayEnd1_error: "",
    saturdayStart2_error: "",
    saturdayEnd2_error: "",

    sunday_error: "",
    sundayStart1_error: "",
    sundayEnd1_error: "",
    sundayStart2_error: "",
    sundayEnd2_error: "",

    monday_s: "",
    monday_day_s: "",
    mondayStart1_s: "",
    mondayEnd1_s: "",
    mondayStart2_s: "",
    mondayEnd2_s: "",
    add_special_hour: false,
    special_hour_data: {},

    monday_day_s_error: "",
    mondayStart1_s_error: "",
    mondayEnd1_s_error: "",
    mondayStart2_s_error: "",
    mondayEnd2_s_error: "",

    LocationDetails: "",
    // otherImageLength: [0, 1, 2, 3, 4, 5, 6, 7],
    otherImage: "",
    otherImages: [],
    specialTimeLoading: false,
    otherImagesLoading: false,
    businessDetailsLoading: false,
    businessDetailsLoading2: false,
    paymentLoading: false,
    operatingHoursLoading: false,
    logoLoading: false,
    coverImageLoading: false,

    businessCategories: [],

    phone_error: "",
    applyAll: "0",
    applyAllError: ""
  };

  componentDidMount = async () => {
    await this.loading_location_details();
    await this._loadBusinessCategories();
  };

  loading_location_details = () => {
    var locationId = this.props.match.params.locationId;
    const data = {
      secure_pin,
      location_id: locationId,
      user_id: localStorage.getItem("UserId"),
    };
    // p_amex: p_amex,
    // p_android: p_android,
    // p_apple: p_apple,
    // p_cash: p_cash,
    // p_check: p_check,
    // p_crypto: p_crypto,
    // p_diners: p_diners,
    // p_financing: p_financing,
    // p_invoices: p_invoices,
    // p_maestro: p_maestro,
    // p_paypal: p_paypal,
    // p_discover: p_discover,
    // p_samsung: p_samsung,
    // p_traveler: p_traveler,
    // p_visa: p_visa
    All_payment_by_location(data)
      .then(resp => {
        console.log(resp.data.payment_method_array.payment_name)
        resp.data.payment_method_array.map(p =>
          {
            console.log('p7',p)
          if(p.payment_name=="Amex"){
            this.setState({p_amex:true})
          }

          if(p.payment_name=="Android"){
            this.setState({p_android:true})
          }

          if(p.payment_name=="Apple"){
            this.setState({p_apple:true})
          }

          if(p.payment_name=="Cash"){
            this.setState({p_cash:true})
          }

          if(p.payment_name=="Check"){
            this.setState({p_check:true})
          }

          if(p.payment_name=="Crypto"){
            this.setState({p_crypto:true})
          }

          if(p.payment_name=="Diners"){
            this.setState({p_diners:true})
          }

          if(p.payment_name=="Discover"){
            this.setState({p_discover:true})
          }

          if(p.payment_name=="Financing"){
            this.setState({p_financing:true})
          }

          if(p.payment_name=="Invoices"){
            this.setState({p_invoices:true})
          }

          if(p.payment_name=="Maestro"){
            this.setState({p_maestro:true})
          }

          if(p.payment_name=="Paypal"){
            this.setState({p_paypal:true})
          }

          if(p.payment_name=="Traveler"){
            this.setState({p_traveler:true})
          }

          if(p.payment_name=="Visa"){
            this.setState({p_visa:true})
          }

          if(p.payment_name=="Samsung"){
            this.setState({p_samsung:true})
          }
          }
          )
         
      }).catch(err => {
        console.log("err",err)
        swal("Something went wrong")
      });
console.log("data255",data)
    location_by_id(data)
    .then(resp => {
      const data2={secure_pin}
console.log("jj",data2)
      business_categories(data2).then(resp1 => {
        console.log("jj",resp1)
        resp1.data.bussiness_category_array.map((b, i) =>
        b.id == resp.data.location_details[0].bussiness_cate
        ? this.setState({ category: b.name })
        : ""
        );
        
      }).catch(err => {
        console.log("err",err)
        this.setState({category: "Loading..."})
      });
      console.log("location_by_id0", resp);
      console.log("location_by_id1", resp.data);
      console.log("location_by_id2", resp.data.location_details);
      console.log("location_by_id3", resp.data.location_details[0].location_name);
      this.setState({
        location: resp.data.location_details[0],
        name: resp.data.location_details[0].location_name,
        storeCode: resp.data.location_details[0].stor_code,
        category: "Loading.....",
        category_id: "",
        address: resp.data.location_details[0].address1,
        website: resp.data.location_details[0].website,
        phone: resp.data.location_details[0].phone_no,
        hours: resp.data.open_hours_details,
        about: resp.data.location_details[0].about_bussiness,
        ownerName: resp.data.location_details[0].bussiness_owner_name,
        addressLine: resp.data.location_details,
        city: resp.data.location_details[0].city,
        state: resp.data.location_details[0].state,
        postalCode: resp.data.location_details[0].zipcode,
        ownerEmail: resp.data.location_details[0].bussiness_owner_email,
        yearOfIncorp: resp.data.location_details[0].year_of_incorporation,
        businessTagline: resp.data.location_details[0].bussiness_tagline,
        instagramProfile: resp.data.location_details[0].instagram_profile,
        twitterProfile: resp.data.location_details[0].twitter_profile,
        facebookProfile: resp.data.location_details[0].facebook_profile,
        payment: resp.data.location_payment_method_detail,
        LocationDetails: resp.data.location_details[0],
        otherImages: resp.data.location_images,
        loader: false,

        //editing details
        name_edit: resp.data.location_details[0].location_name,
        storeCode_edit: resp.data.location_details[0].stor_code,
        address_edit: resp.data.location_details[0].address1,
        website_edit: resp.data.location_details[0].website,
        phone_edit: resp.data.location_details[0].phone_no,
        about_edit: resp.data.location_details[0].about_bussiness,
        ownerName_edit: resp.data.location_details[0].bussiness_owner_name,
        addressLine_edit: resp.data.location_details,
        city_edit: resp.data.location_details[0].city,
        state_edit: resp.data.location_details[0].state,
        postalCode_edit: resp.data.location_details[0].zipcode,
        ownerEmail_edit: resp.data.location_details[0].bussiness_owner_email,
        yearOfIncorp_edit: resp.data.location_details[0].year_of_incorporation,
        businessTagline_edit: resp.data.location_details[0].bussiness_tagline,
        instagramProfile_edit: resp.data.location_details[0].instagram_profile,
        twitterProfile_edit: resp.data.location_details[0].twitter_profile,
        facebookProfile_edit: resp.data.location_details[0].facebook_profile
      }).catch(err =>
        {
          console.log("err25",err)
        })
      console.log("name88",this.state.name)
console.log("name88",resp.data.location_details[0].location_name)

    }).catch(err => {
      console.log("err",err)
      this.setState({loader:false})
    })
    
  };

  editDetailsButton = event => {
    console.log("bu");
    this.setState({
      detailEdit: this.state.detailEdit == false ? true : false
    });
  };

  editDetailsButton2 = event => {
    console.log("bu");
    this.setState({
      detailEdit2: this.state.detailEdit2 == false ? true : false
    });
  };

  editPaymentButton = event => {
    console.log("pa");
    this.setState({ paymentEdit: !this.state.paymentEdit });
  };

  editHourButton = event => {
    this.setState({ hourEdit: this.state.hourEdit == false ? true : false });
  };

  updateDetailsButton = name => event => {
    event.preventDefault();
    var locationId = this.props.match.params.locationId;
    this.setState({
      phone_error: ""
    });
    let {
      storeCode_edit,
      address_edit,
      website_edit,
      phone_edit,
      ownerName_edit,
      ownerEmail_edit,
      businessTagline_edit,
      yearOfIncorp_edit,
      about_edit,
      facebookProfile_edit,
      instagramProfile_edit,
      twitterProfile_edit
    } = this.state;
    let data = {};
    // {"secure_pin":"digimonk","location_id":"11","user_id":"11","stor_code":"123123sdfq212","bussiness_cate":"11",
    // "location_name":"Gwalior","address1":"GGsdfsd","address2":"sdfsdMG","country":"101","state":"21","city":"221",
    // "zipcode":"344334","phone_no":"1231231231","website":"www.digimonk.in","franchiese_locaiton":"1",
    // "do_not_publish_my_address":"1","bussiness_owner_name":"ram","bussiness_owner_email":"ram.gautam2@digimonk.in",
    // "bussiness_tagline":"ggggg,asasdasd,asdasds","year_of_incorporation":"2012",
    // "about_bussiness":"fkljlskdjf asdklfjtks dflksdfj sdklfjsd kdfjsl","facebook_profile":"facebook.com",
    // "instagram_profile":"instagram.com","twitter_profile":"twitter.com"}
    if (name == "details1") {
      data = {
        secure_pin,
        location_id: locationId,
        user_id: localStorage.getItem("UserId"),
        stor_code: storeCode_edit,
        bussiness_cate:this.state.category,
        location_name:this.state.name,
        address1: address_edit,
        address2 :"ind",
        country :"101",
        state :"21",
        city :"211",
        zipcode :"474001",
        phone_no: phone_edit,
          website: website_edit,
        franchiese_locaiton:"0",
        do_not_publish_my_address:"0",
        bussiness_owner_name: ownerName_edit,
        bussiness_owner_email: ownerEmail_edit,
        bussiness_tagline: businessTagline_edit,
        year_of_incorporation: yearOfIncorp_edit,
        about_bussiness: about_edit,
        facebook_profile: facebookProfile_edit,
        instagram_profile: instagramProfile_edit,
        twitter_profile: twitterProfile_edit,
          
      };
      this.setState({ businessDetailsLoading: true });
      this.updateDetails(data);
    } else if (name == "details2") {
      const result = phone_regex(phone_edit);
      if (result === false) {
        this.setState({
          phone_error: "Not a valid Phone No."
        });
      } else {
        data = {
          // secure_pin,
          // location_id: locationId,
          // stor_code: storeCode_edit,
          // address1: address_edit,
          // phone_no: phone_edit,
          // website: website_edit
          secure_pin,
        location_id: locationId,
        user_id: localStorage.getItem("UserId"),
        stor_code: storeCode_edit,
        bussiness_cate:this.state.category,
        location_name:this.state.name,
        address1: address_edit,
        address2 :"ind",
        country :"101",
        state :"21",
        city :"211",
        zipcode :"474001",
        phone_no: phone_edit,
          website: website_edit,
        franchiese_locaiton:"0",
        do_not_publish_my_address:"0",
        bussiness_owner_name: ownerName_edit,
        bussiness_owner_email: ownerEmail_edit,
        bussiness_tagline: businessTagline_edit,
        year_of_incorporation: yearOfIncorp_edit,
        about_bussiness: about_edit,
        facebook_profile: facebookProfile_edit,
        instagram_profile: instagramProfile_edit,
        twitter_profile: twitterProfile_edit,
        };
        this.setState({ businessDetailsLoading2: true });
        this.updateDetails(data);
      }
    }
  };

  updateDetails = (data) => {
    let {
      storeCode_edit,
      address_edit,
      website_edit,
      phone_edit,
      ownerName_edit,
      ownerEmail_edit,
      businessTagline_edit,
      yearOfIncorp_edit,
      about_edit,
      facebookProfile_edit,
      instagramProfile_edit,
      twitterProfile_edit
    } = this.state;
console.log("tt25",data)
    edit_location_by_id(data)
      .then(resp => {
        console.log("update user details", resp);

        this.setState({
          detailEdit: false,
          detailEdit2:false,
          businessDetailsLoading: false,
          businessDetailsLoading2: false,
          storeCode: storeCode_edit,
          address: address_edit,
          website: website_edit,
          phone: phone_edit,
          ownerName: ownerName_edit,
          ownerEmail: ownerEmail_edit,
          businessTagline: businessTagline_edit,
          yearOfIncorp: yearOfIncorp_edit,
          about: about_edit,
          facebookProfile: facebookProfile_edit,
          instagramProfile: instagramProfile_edit,
          twitterProfile: twitterProfile_edit
        });
      })
      .catch(resp => {
        console.log("update user details err", resp);
        this.setState({
          businessDetailsLoading: false,
          businessDetailsLoading2: false
        });
        swal("couldn't update details");
      });
  };

  updatePaymentButton = event => {
    event.preventDefault();
    var locationId = this.props.match.params.locationId;
    console.log("p_visa1",this.state.p_visa)
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

    var payment = {},
      i = 0;

    if (p_amex) {
      payment["" + i] = {"payment_name":"Amex"};
      i++;
    }
    if (p_android) {
      payment["" + i] = {"payment_name":"Android"};
      i++;
    }
    if (p_apple) {
      payment["" + i] = {"payment_name":"Apple"};
      i++;
    }
    if (p_cash) {
      payment["" + i] = {"payment_name":"Cash"};
      i++;
    }
    if (p_check) {
      payment["" + i] = {"payment_name":"Check"};
      i++;
    }
    if (p_crypto) {
      payment["" + i] = {"payment_name":"Crypto"};
      i++;
    }
    if (p_diners) {
      payment["" + i] = {"payment_name":"Diners"};
      i++;
    }
    if (p_discover) {
      payment["" + i] = {"payment_name":"Discover"};
      i++;
    }
    if (p_financing) {
      payment["" + i] = {"payment_name":"Financing"};
      i++;
    }
    if (p_invoices) {
      payment["" + i] = {"payment_name":"Invoices"};
      i++;
    }
    if (p_maestro) {
      payment["" + i] = {"payment_name":"Maestro"};
      i++;
    }
    if (p_paypal) {
      payment["" + i] = {"payment_name":"Paypal"};
      i++;
    }
    if (p_samsung) {
      payment["" + i] = {"payment_name":"Samsung"};
      i++;
    }
    if (p_traveler) {
      payment["" + i] = {"payment_name":"Traveler"};
      i++;
    }
    if (p_visa) {
      payment["" + i] = {"payment_name":"Visa"};
      i++;
    }
    // {"secure_pin":"digimonk","location_id":"11","user_id":"11","payment_method_array":[{"payment_name":"Instamonjo"},
    // {"payment_name":"Strip"}]}
    const data = {
    secure_pin,
    user_id: localStorage.getItem("UserId"),
    location_id: locationId,
      payment_method_array: payment
    };
    const data2 = {
      Location_id: locationId
    };
    console.log("datacheck",data);

    this.setState({ paymentLoading: true });

    edit_location_payment_by_id(data)
      .then(resp => {
        console.log("paycheck",resp);
        this.setState({
          paymentEdit: false,
          p_amex: p_amex,
          p_android: p_android,
          p_apple: p_apple,
          p_cash: p_cash,
          p_check: p_check,
          p_crypto: p_crypto,
          p_diners: p_diners,
          p_financing: p_financing,
          p_invoices: p_invoices,
          p_maestro: p_maestro,
          p_paypal: p_paypal,
          p_discover: p_discover,
          p_samsung: p_samsung,
          p_traveler: p_traveler,
          p_visa: p_visa
        });
        const data1 = {
          secure_pin,
          location_id: locationId
        };
        location_by_id(data1)
          .then(resp1 => {
            this.setState({
              payment: resp1.data.location_payment_method_detail,
              paymentLoading: false
            });
          })
          .catch(resp1 => {
            console.log(resp1);
            this.setState({
              paymentLoading: false
            });
          });
      })
      .catch(resp => {
        console.log(resp);
      });
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
console.log("timecheck1",event.target.checked)
console.log("timecheck2",isValid)
    if (event.target.checked && isValid) {
      this.setState({
        applyAll: "1",

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
        applyAll: "0",

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

  checkUpdateHourDetaisls = () => {
    let {
      monday,
      mondayStart1,
      mondayStart2,
      mondayEnd1,
      mondayEnd2,
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
      sundayEnd2
    } = this.state;

    this.setState({
      mondayStart1_error: "",
      mondayStart2_error: "",
      mondayEnd1_error: "",
      mondayEnd2_error: "",
      tuesdayStart1_error: "",
      tuesdayEnd1_error: "",
      tuesdayStart2_error: "",
      tuesdayEnd2_error: "",

      wednesdayStart1_error: "",
      wednesdayEnd1_error: "",
      wednesdayStart2_error: "",
      wednesdayEnd2_error: "",

      thursdayStart1_error: "",
      thursdayEnd1_error: "",
      thursdayStart2_error: "",
      thursdayEnd2_error: "",

      fridayStart1_error: "",
      fridayEnd1_error: "",
      fridayStart2_error: "",
      fridayEnd2_error: "",

      saturdayStart1_error: "",
      saturdayEnd1_error: "",
      saturdayStart2_error: "",
      saturdayEnd2_error: "",

      sundayStart1_error: "",
      sundayEnd1_error: "",
      sundayStart2_error: "",
      sundayEnd2_error: ""
    });

    let isError = false;

    if (monday == "OPEN") {
      if (!mondayStart1) {
        this.setState({ mondayStart1_error: "complete this field" });
        isError = true;
      }
      if (!mondayEnd1) {
        this.setState({ mondayEnd1_error: "complete this field" });
        isError = true;
      }
    }
    if (monday == "SPLIT") {
      if (!mondayStart1) {
        this.setState({ mondayStart1_error: "complete this field" });
        isError = true;
      }
      if (!mondayEnd1) {
        this.setState({ mondayEnd1_error: "complete this field" });
        isError = true;
      }
      if (!mondayStart2) {
        this.setState({ mondayEnd2_error: "complete this field" });
        isError = true;
      }
      if (!mondayEnd2) {
        this.setState({ mondayEnd2_error: "complete this field" });
        isError = true;
      }
    }
    if (tuesday == "OPEN") {
      if (!tuesdayStart1) {
        this.setState({ tuesdayStart1_error: "complete this field" });
        isError = true;
      }
      if (!tuesdayEnd1) {
        this.setState({ tuesdayEnd1_error: "complete this field" });
        isError = true;
      }
    }
    if (tuesday == "SPLIT") {
      if (!tuesdayStart1) {
        this.setState({ tuesdayStart1_error: "complete this field" });
        isError = true;
      }
      if (!tuesdayEnd1) {
        this.setState({ tuesdayEnd1_error: "complete this field" });
        isError = true;
      }
      if (!tuesdayStart2) {
        this.setState({ tuesdayEnd2_error: "complete this field" });
        isError = true;
      }
      if (!tuesdayEnd2) {
        this.setState({ tuesdayEnd2_error: "complete this field" });
        isError = true;
      }
    }
    if (wednesday == "OPEN") {
      if (!wednesdayStart1) {
        this.setState({ wednesdayStart1_error: "complete this field" });
        isError = true;
      }
      if (!wednesdayEnd1) {
        this.setState({ wednesdayEnd1_error: "complete this field" });
        isError = true;
      }
    }
    if (wednesday == "SPLIT") {
      if (!wednesdayStart1) {
        this.setState({ wednesdayStart1_error: "complete this field" });
        isError = true;
      }
      if (!wednesdayEnd1) {
        this.setState({ wednesdayEnd1_error: "complete this field" });
        isError = true;
      }
      if (!wednesdayStart2) {
        this.setState({ wednesdayEnd2_error: "complete this field" });
        isError = true;
      }
      if (!wednesdayEnd2) {
        this.setState({ wednesdayEnd2_error: "complete this field" });
        isError = true;
      }
    }
    if (thursday == "OPEN") {
      if (!thursdayStart1) {
        this.setState({ thursdayStart1_error: "complete this field" });
        isError = true;
      }
      if (!thursdayEnd1) {
        this.setState({ thursdayEnd1_error: "complete this field" });
        isError = true;
      }
    }
    if (thursday == "SPLIT") {
      if (!thursdayStart1) {
        this.setState({ thursdayStart1_error: "complete this field" });
        isError = true;
      }
      if (!thursdayEnd1) {
        this.setState({ thursdayEnd1_error: "complete this field" });
        isError = true;
      }
      if (!thursdayStart2) {
        this.setState({ thursdayEnd2_error: "complete this field" });
        isError = true;
      }
      if (!thursdayEnd2) {
        this.setState({ thursdayEnd2_error: "complete this field" });
        isError = true;
      }
    }
    if (friday == "OPEN") {
      if (!fridayStart1) {
        this.setState({ fridayStart1_error: "complete this field" });
        isError = true;
      }
      if (!fridayEnd1) {
        this.setState({ fridayEnd1_error: "complete this field" });
        isError = true;
      }
    }
    if (friday == "SPLIT") {
      if (!fridayStart1) {
        this.setState({ fridayStart1_error: "complete this field" });
        isError = true;
      }
      if (!fridayEnd1) {
        this.setState({ fridayEnd1_error: "complete this field" });
        isError = true;
      }
      if (!fridayStart2) {
        this.setState({ fridayEnd2_error: "complete this field" });
        isError = true;
      }
      if (!fridayEnd2) {
        this.setState({ fridayEnd2_error: "complete this field" });
        isError = true;
      }
    }
    if (saturday == "OPEN") {
      if (!saturdayStart1) {
        this.setState({ saturdayStart1_error: "complete this field" });
        isError = true;
      }
      if (!saturdayEnd1) {
        this.setState({ saturdayEnd1_error: "complete this field" });
        isError = true;
      }
    }
    if (saturday == "SPLIT") {
      if (!saturdayStart1) {
        this.setState({ saturdayStart1_error: "complete this field" });
        isError = true;
      }
      if (!saturdayEnd1) {
        this.setState({ saturdayEnd1_error: "complete this field" });
        isError = true;
      }
      if (!saturdayStart2) {
        this.setState({ saturdayEnd2_error: "complete this field" });
        isError = true;
      }
      if (!saturdayEnd2) {
        this.setState({ saturdayEnd2_error: "complete this field" });
        isError = true;
      }
    }
    if (sunday == "OPEN") {
      if (!sundayStart1) {
        this.setState({ sundayStart1_error: "complete this field" });
        isError = true;
      }
      if (!sundayEnd1) {
        this.setState({ sundayEnd1_error: "complete this field" });
        isError = true;
      }
    }
    if (sunday == "SPLIT") {
      if (!sundayStart1) {
        this.setState({ sundayStart1_error: "complete this field" });
        isError = true;
      }
      if (!sundayEnd1) {
        this.setState({ sundayEnd1_error: "complete this field" });
        isError = true;
      }
      if (!sundayStart2) {
        this.setState({ sundayEnd2_error: "complete this field" });
        isError = true;
      }
      if (!sundayEnd2) {
        this.setState({ sundayEnd2_error: "complete this field" });
        isError = true;
      }
    }
    return isError;
  };

  updateHourButton = async event => {
    event.preventDefault();

    let isError = await this.checkUpdateHourDetaisls();
    var locationId = this.props.match.params.locationId;

    if (!isError && locationId) {
      this.setState({ operatingHoursLoading: true });
      // {"secure_pin":"digimonk","location_id":"11","user_id":"11","open_hours_apply_all":"1",
      // "open_hours_array":[{"day":"Wednesday","open_status":"OPEN","start_time1":"11:00 AM","end_time1":"02:40 PM",
      // "start_time2":"03:20 PM","end_time2":"08:00 PM"}]}
      const data = {
        secure_pin,
        location_id: locationId,
        user_id: localStorage.getItem("UserId"),
        open_hours_apply_all:this.state.applyAll,
        type:'regular',
        open_hours_array: [ {
         day: "Monday",
          open_status: this.state.monday,
          start_time1: this.state.mondayStart1,
          end_time1: this.state.mondayEnd1,
          start_time2: this.state.mondayStart2,
          end_time2: this.state.mondayEnd2
        },{
         day: "Tuesday",
          open_status: this.state.tuesday,
          start_time1: this.state.tuesdayStart1,
          end_time1: this.state.tuesdayEnd1,
          start_time2: this.state.tuesdayStart2,
          end_time2: this.state.tuesdayEnd2
        },{
         day: "Wednesday",
          open_status: this.state.wednesday,
          start_time1: this.state.wednesdayStart1,
          end_time1: this.state.wednesdayEnd1,
          start_time2: this.state.wednesdayStart2,
          end_time2: this.state.wednesdayEnd2
        },{
         day: "Thursday",
          open_status: this.state.thursday,
          start_time1: this.state.thursdayStart1,
          end_time1: this.state.thursdayEnd1,
          start_time2: this.state.thursdayStart2,
          end_time2: this.state.thursdayEnd2
        },{
         day: "Friday",
          open_status: this.state.friday,
          start_time1: this.state.fridayStart1,
          end_time1: this.state.fridayEnd1,
          start_time2: this.state.fridayStart2,
          end_time2: this.state.fridayEnd2
        },{
         day: "Saturday",
          open_status: this.state.saturday,
          start_time1: this.state.saturdayStart1,
          end_time1: this.state.saturdayEnd1,
          start_time2: this.state.saturdayStart2,
          end_time2: this.state.saturdayEnd2
        }, {
         day: "Sunday",
          open_status: this.state.sunday,
          start_time1: this.state.sundayStart1,
          end_time1: this.state.sundayEnd1,
          start_time2: this.state.sundayStart2,
          end_time2: this.state.sundayEnd2
        }]
         
      };
      
      console.log("json data",JSON.stringify(data))
      edit_location_operations_hours_by_id(data)
        .then(resp => {
          console.log(resp);
          this.setState({ hourEdit: false });
          // window.location_details[0].reload(false);

          const data1 = {
            location_id: locationId,
            secure_pin
          };

          location_by_id(data1)
            .then(resp1 => {
              this.setState({
                hours: resp1.data.open_hours_details,
                operatingHoursLoading: false
              });
            })
            .catch(resp1 => {
              console.log(resp1);
              this.setState({
                operatingHoursLoading: false
              });
            });
        })
        .catch(resp => {
          console.log(resp);
          this.setState({
            operatingHoursLoading: false
          });
        });
    }
  };

  editSpecialHourButton = event => {
    console.log("hr");
    this.setState({ add_special_hour: !this.state.add_special_hour });
  };

  specialHourError = () => {
    let {
      monday_s,
      monday_day_s,
      mondayStart1_s,
      mondayStart2_s,
      mondayEnd1_s,
      mondayEnd2_s
    } = this.state;
    this.setState({
      monday_day_s_error: "",
      mondayStart1_s_error: "",
      mondayStart2_s_error: "",
      mondayEnd1_s_error: "",
      mondayEnd2_s_error: ""
    });
    let isError = false;
    if (!monday_day_s) {
      this.setState({ monday_day_s_error: "complete this field" });
      isError = true;
    }
    if (monday_s == "OPEN") {
      if (!mondayStart1_s) {
        this.setState({ mondayStart1_s_error: "complete this field" });
        isError = true;
      }
      if (!mondayEnd1_s) {
        this.setState({ mondayEnd1_s_error: "complete this field" });
        isError = true;
      }
    }
    if (monday_s == "SPLIT") {
      if (!mondayStart1_s) {
        this.setState({ mondayStart1_s_error: "complete this field" });
        isError = true;
      }
      if (!mondayEnd1_s) {
        this.setState({ mondayEnd1_s_error: "complete this field" });
        isError = true;
      }
      if (!mondayStart2_s) {
        this.setState({ mondayStart2_s_error: "complete this field" });
        isError = true;
      }
      if (!mondayEnd2_s) {
        this.setState({ mondayEnd2_s_error: "complete this field" });
        isError = true;
      }
    }
    return isError;
  };

  // addSpecialHourButton = async event => {
  //   event.preventDefault();

  //   let isError = await this.specialHourError();

  //   if (!isError) {
  //     let i = 0;
  //     let i2 = this.state.LocationDetails.Df_location_poen_hour.length - 7;
  //     console.log("monday", this.state.monday_day_s, i);

  //     if (this.state.monday_day_s) {
  //       await this.setState(prevState => ({
  //         special_hour_data: {
  //           ...prevState.special_hour_data,
  //           [i]: {
  //             date: this.state.monday_day_s,
  //             day: "Special",
  //             Type: `Special-${i2}`,
  //             open_status: this.state.monday_s,
  //             start_time1: this.state.mondayStart1_s,
  //             end_time1: this.state.mondayEnd1_s,
  //             start_time2: this.state.mondayStart2_s,
  //             end_time2: this.state.mondayEnd2_s
  //           }
  //         }
  //       }));
  //       i++;
  //     }

  //     this.addSpecialHourToDb();
  //   }
  // };

  addSpecialHourButton = () => {
    // event.preventDefault();
    console.log("special");
    var locationId = this.props.match.params.locationId;

    const data = {
      secure_pin,
        location_id: locationId,
        user_id: localStorage.getItem("UserId"),
      type: "special", 
      open_hours_array: [ {
        special_date: this.state.monday_day_s,
        open_status: this.state.monday_s,
        start_time1: this.state.mondayStart1_s,
        end_time1: this.state.mondayEnd1_s,
        start_time2: this.state.mondayStart2_s,
        end_time2: this.state.mondayEnd2_s
               }]
    };
console.log("happyh",data)
    this.setState({ specialTimeLoading: true });

    edit_location_operations_hours_by_id(data)
      .then(resp => {
        console.log(resp);
        this.setState({ add_special_hour: false });

        const data1 = {
          location_id: locationId,secure_pin
        };

        location_by_id(data1)
          .then(resp1 => {
            this.setState({
              hours: resp1.data.open_hours_details,
              specialTimeLoading: false
            });
          })
          .catch(resp1 => {
            console.log(resp1);
            this.setState({ specialTimeLoading: false });
          });
      })
      .catch(resp => {
        console.log(resp);
        this.setState({ specialTimeLoading: false });
        swal("couldn't add special hour");
      });
  };

  clear_day_state = date => {
    this.setState({ [date]: "" });
  };

  changeHandler = event => {
    console.log("changeHandler", event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  checkBoxHandler = event => {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.setState({ [event.target.name]: true });
    } else {
      this.setState({ [event.target.name]: false });
    }
  };

  onUploadLogo = name => event => {
    if (name == "bussiness_logo") {
      
      this.setState({ logoLoading: true ,img_type:'logo'});
    }
    if (name == "bussiness_cover_image") {
      this.setState({ coverImageLoading: true ,img_type:'cover'});
    }
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      //   console.log(e.target.result);
      //   this.setState({ BusinessLogoUpdate: e.target.result });

      var locationId = this.props.match.params.locationId;
      // {"secure_pin":"digimonk","user_id":"11","location_id":"11",
      // "bussiness_logo_cover":"base64image","type_cover_logo":"logo/cover"}
      const data = {
        secure_pin,
        user_id: localStorage.getItem("UserId"),
        location_id: locationId,
        bussiness_logo_cover:e.target.result,
        type_cover_logo:this.state.img_type
        // [name]: e.target.result
        
      };
      console.log("result555",data)
      update_images_by_location_id(data)
        .then(resp => {
          const data1 = {
            location_id: locationId,
            secure_pin
          };

          location_by_id(data1)
            .then(resp1 => {
              this.setState({
                LocationDetails: resp1.data.location_details[0],
                logoLoading: false,
                coverImageLoading: false
              });
              console.log("7770",resp1)
            })
            .catch(resp1 => {
              console.log(resp1);
              swal("uploading image failedc");
              this.setState({ logoLoading: false, coverImageLoading: false });
            });
        })
        .catch(resp => {
          console.log(resp);
          swal("uploading image failed");
          this.setState({ logoLoading: false, coverImageLoading: false });
        });
    };
  };

  onUploadOtherImage = event => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      //   console.log(e.target.result);
      //   this.setState({ BusinessLogoUpdate: e.target.result });

      var locationId = this.props.match.params.locationId;
      // {"secure_pin":"digimonk","user_id":"10","location_id":"38",
      // "more_bussiness_images_array":[{"bussiness_image":"base64image1"},{"bussiness_image":"base64image2"}]}
      const data = {
        secure_pin,
        user_id: localStorage.getItem("UserId"),
        location_id: locationId,
        
        more_bussiness_images_array: [{ bussiness_image: e.target.result }]
      };
console.log("kkl",data)
      this.setState({ otherImagesLoading: true });

      add_other_images_by_location_id(data)
        .then(resp => {
          const data1 = {
            location_id: locationId,
            secure_pin
          };
          location_by_id(data1)
            .then(resp1 => {
              this.setState({
                otherImages: resp1.data.location_images,
                otherImagesLoading: false
              });
            })
            .catch(resp1 => {
              console.log(resp1);
              swal("uploading image failed");
              this.setState({ otherImagesLoading: false });
            });
        })
        .catch(resp => {
          console.log(resp);
          swal("uploading image failed");
          this.setState({ otherImagesLoading: false });
        });
    };
  };

  delete_other_image = image_id => {
    var locationId = this.props.match.params.locationId;
    const data = {
      secure_pin,
      location_id:locationId,
      image_id: image_id
    };
    console.log("image_id", image_id);
    this.setState({ otherImagesLoading: true });
    delete_other_images_by_location_id(data)
      .then(res => {
        const data1 = {
          location_id: locationId,
          secure_pin
        };
        location_by_id(data1)
          .then(resp1 => {
            this.setState({
              otherImages: resp1.data.location_images,
              otherImagesLoading: false
            });
          })
          .catch(resp1 => {
            console.log(resp1);
            swal("deleting image failed");
            this.setState({ otherImagesLoading: false });
          });
      })
      .catch(res => {
        swal("deleting image failed");
        this.setState({ otherImagesLoading: false });
        console.log(res);
      });
  };

  _loadBusinessCategories = () => {
    this.setState({ loadBusinessCategories: true });
const data={secure_pin}
    business_categories(data)
      .then(res => {
        console.log("bc25",res)
        this.setState({
          businessCategories: res.data.bussiness_category_array
        });
      })
      .catch(res => {
        console.log("error in loading business categories");
      });
  };

  render() {
    console.log("kk",this.state.hours);

    let {
      mondayStart1_error,
      mondayStart2_error,
      mondayEnd1_error,
      mondayEnd2_error,
      tuesday_error,
      tuesdayStart1_error,
      tuesdayEnd1_error,
      tuesdayStart2_error,
      tuesdayEnd2_error,
      wednesday_error,
      wednesdayStart1_error,
      wednesdayEnd1_error,
      wednesdayStart2_error,
      wednesdayEnd2_error,

      thursday_error,
      thursdayStart1_error,
      thursdayEnd1_error,
      thursdayStart2_error,
      thursdayEnd2_error,

      friday_error,
      fridayStart1_error,
      fridayEnd1_error,
      fridayStart2_error,
      fridayEnd2_error,

      saturday_error,
      saturdayStart1_error,
      saturdayEnd1_error,
      saturdayStart2_error,
      saturdayEnd2_error,

      sunday_error,
      sundayStart1_error,
      sundayEnd1_error,
      sundayStart2_error,
      sundayEnd2_error,

      monday_day_s_error,
      mondayStart1_s_error,
      mondayEnd1_s_error,
      mondayStart2_s_error,
      mondayEnd2_s_error,

      applyAll,
    applyAllError
    } = this.state;

    localStorage.setItem("locationId", this.props.match.params.locationId);

    var regularHours1;
    regularHours1 = (
      <div className="vl_gap3">
        {this.state.hours.map(h =>
          h.type == "regular" ? (
            <div className="daybox " key={h.id}>
              <div className="daytype">{h.day}</div>

              {h.open_status == "SPLIT" ? (
                <div>
                  {h.start_time1} - {h.end_time1}
                  <br />
                  {h.start_time2} - {h.end_time2}
                </div>
              ) : (
                ""
              )}

              {h.open_status == "OPEN" ? (
                <div>
                  From {h.start_time1} to {h.end_time1}
                </div>
              ) : (
                ""
              )}

              {h.open_status == "OPEN 24x7" ? <div>OPEN 24x7</div> : ""}

              {h.open_status == "CLOSED" ? <div>CLOSED</div> : ""}
            </div>
          ) : (
            ""
          )
        )}
      </div>
    );

    var regularHours2;
    regularHours2 = (
      <div className="vl_gap4">
        {this.state.hours.map(h =>
          h.type == "special" ? (
            <div className="daybox" key={h.id}>
              {/* <div className="daytype">{h.day}</div> */}
              <div className="daytype">
                {h.special_date
                  .split("-")
                  .reverse()
                  .join("-")}
              </div>

              {h.open_status == "SPLIT" ? (
                <div>
                  {h.start_time1} - {h.end_time1},{h.start_time2} -{" "}
                  {h.end_time2}
                </div>
              ) : (
                ""
              )}

              {h.open_status == "OPEN" ? (
                <div>
                  From {h.start_time1} to {h.end_time1}
                </div>
              ) : (
                ""
              )}

              {h.open_status == "OPEN 24x7" ? <div>OPEN 24x7</div> : ""}

              {h.open_status == "CLOSED" ? <div>CLOSED</div> : ""}
            </div>
          ) : (
            ""
          )
        )}
      </div>
    );

    var paymentAccepted;

    paymentAccepted = this.state.payment.map(p => (
      // <MDBCol md='2'>
      //   <div className='payment_box'>
      <MDBCol md="2" key={p.id}>
        {p.payment_name == "Visa" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-visa.png")} alt="Visa" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.payment_name == "Maestro" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-maestro.png")} alt="Maestro" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.payment_name == "Amex" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-amex.png")} alt="Amex" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.payment_name == "Cash" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-cash.png")} alt="Cash" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.payment_name == "Check" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-check.png")} alt="Check" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.payment_name == "Crypto" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-crypto.png")} alt="Crypto" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.payment_name == "Diners" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-diners.png")} alt="Diners" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.payment_name == "Discover" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-discover.png")} alt="Discover" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.payment_name == "Apple" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-apple.png")} alt="Apple" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.payment_name == "Samsung" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-samsung.png")} alt="Samsung" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.payment_name == "Paypal" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-paypal.png")} alt="Paypal" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.payment_name == "Android" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-android.png")} alt="Android" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.payment_name == "Invoices" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-invoices.png")} alt="Invoices" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.payment_name == "Traveler" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img
            src={require("../images/p-traveler.png")}
            alt="Traveler's Check"
          />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.payment_name == "Financing" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-financing.png")} alt="Financing" />
          </label>
          </div>
        ) : (
          ""
        )}
      </MDBCol>
    ));

    let { LocationDetails, businessCategories } = this.state;
    // let a = this.state.LocationDetails.Df_location_image.map(
    //   (img, i) => img.Image
    // );

    console.log("this.state.otherImages", this.state.otherImages);

    return (
      <div className="main_content">
        <div className="rightside_title">
            <h1>Business Information</h1>
          </div>
        {this.props.match.params.locationId != "null" ? (
          this.state.loader ? (
            <div className="rightside_title">
              <Spinner />
            </div>
          ) : (
            <div>
              <div className="mt-30">
                <div className="">
                  <div className="row">
                    <div className="col-md-4">
                      {this.state.businessDetailsLoading2 ? (
                        <div className="white-shadow">
                          <div style={{ textAlign: "center" }}>
                            <Loader
                              type="Oval"
                              color="#00BFFF"
                              height={30}
                              width={30}
                              // timeout={3000} //3 secs
                            />
                          </div>
                        </div>
                      ) : this.state.detailEdit2 ? (
                        <div className="white-shadow">
                          <div>
                            <MDBRow>
                              <MDBCol md="9" className="vl_box_head">
                                {this.state.name}
                              </MDBCol>
                            </MDBRow>

                            <form
                              onSubmit={this.updateDetailsButton("details2")}
                            >
                              {this.state.logoLoading ? (
                                <div style={{ textAlign: "center" }}>
                                  <Loader
                                    type="Oval"
                                    color="#00BFFF"
                                    height={30}
                                    width={30}
                                    // timeout={3000} //3 secs
                                  />
                                </div>
                              ) : LocationDetails.bussiness_logo ? (
                                <div className="uploadphoto pt-15">
                                  <img
                                    src={
                                      "https://digimonk.net/dashify-ci/assets/upload/images/business-type-image/" +
                                      LocationDetails.bussiness_logo
                                    }
                                    alt=""
                                  />
                                  {/* <br /> */}
                                  <div className="get-image">
                                    <img
                                      src={edit}
                                      alt=""
                                      style={{ height: "20px", width: "20px" }}
                                    />
                                    <input
                                      type="file"
                                      name="bussiness_logo"
                                      onChange={this.onUploadLogo(
                                        "bussiness_logo"
                                      )}
                                    />
                                  </div>
                                  {/* <div>
                                  Update
                                  <input
                                    type="file"
                                    name="bussiness_logo"
                                    onChange={this.onUploadLogo(
                                      "bussiness_logo"
                                    )}
                                  />
                                </div> */}
                                </div>
                              ) : (
                                <div className="uploadphoto pt-15">
                                  <div className="get-image">
                                    <img
                                      src={edit}
                                      alt=""
                                      style={{ height: "20px", width: "20px" }}
                                    />
                                    <input
                                      type="file"
                                      name="bussiness_logo"
                                      onChange={this.onUploadLogo(
                                        "bussiness_logo"
                                      )}
                                    />
                                  </div>
                                  {/* <div>
                                  <i className="zmdi zmdi-cloud-upload"></i>
                                  <h3>Upload logo</h3>
                                  <input
                                    type="file"
                                    name="bussiness_logo"
                                    onChange={this.onUploadLogo(
                                      "bussiness_logo"
                                    )}
                                  />
                                </div> */}
                                </div>
                              )}

                              <div className="detailbox">
                                <MDBRow>
                                  <MDBCol>
                                    <MDBRow className="uploadauthor">
                                      <MDBCol md="6">
                                        <div className="author_namebox">
                                          Store Code :
                                        </div>
                                      </MDBCol>

                                      <MDBCol md="6">
                                        <input
                                          name="storeCode_edit"
                                          onChange={this.changeHandler}
                                          type="text"
                                          className="vl_edit_input"
                                          value={this.state.storeCode_edit}
                                        />
                                      </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="uploadauthor">
                                      <MDBCol md="6">
                                        <div className="author_namebox">
                                          Category :
                                        </div>
                                      </MDBCol>

                                      <MDBCol md="6">
                                      <select
                                    name="category"
                                    onChange={this.changeHandler}
                                    className="form-control"
                                    id="primaryCategory"
                                  >
                                    <option value="0" disabled="">
                                      Select Category
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
                                      </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="uploadauthor">
                                      <MDBCol md="6">
                                        <div className="author_namebox">
                                          Address :
                                        </div>
                                      </MDBCol>

                                      <MDBCol md="6">
                                        <input
                                          name="address_edit"
                                          onChange={this.changeHandler}
                                          className="vl_edit_input"
                                          value={this.state.address_edit}
                                        />
                                      </MDBCol>
                                    </MDBRow>

                                    <MDBRow className="uploadauthor">
                                      <MDBCol md="6">
                                        <div className="author_namebox">
                                          Phone :
                                        </div>
                                      </MDBCol>

                                      <MDBCol md="6">
                                        <input
                                          name="phone_edit"
                                          onChange={this.changeHandler}
                                          type="tel"
                                          type="number"
                                          className="vl_edit_input"
                                          value={this.state.phone_edit}
                                        />
                                        <div class='err_msg'>
                                          {this.state.phone_error}
                                        </div>
                                      </MDBCol>
                                    </MDBRow>

                                    <MDBRow className="uploadauthor">
                                      <MDBCol md="6">
                                        <div className="author_namebox">
                                          Website :
                                        </div>
                                      </MDBCol>

                                      <MDBCol md="6">
                                        <input
                                          name="website_edit"
                                          type="text"
                                          onChange={this.changeHandler}
                                          className="vl_edit_input"
                                          value={this.state.website_edit}
                                        />
                                      </MDBCol>
                                    </MDBRow>

                                    <MDBRow style={{ marginTop: "20px" }}>
                                      <MDBCol md="3" className="offset-md-5">
                                        <button
                                          type="submit"
                                          className="last_btn"
                                          style={{ marginLeft: "-5px" }}
                                          // onClick={this.updateDetailsButton2}
                                        >
                                          Update
                                        </button>
                                      </MDBCol>
                                      <MDBCol md="3">
                                        <button
                                          className="last_btn"
                                          onClick={this.editDetailsButton2}
                                          style={{ marginLeft: "5px" }}
                                        >
                                          Cancel
                                        </button>
                                      </MDBCol>
                                    </MDBRow>
                                  </MDBCol>
                                </MDBRow>
                              </div>
                            </form>
                          </div>
                        </div>
                      ) : (
                        <div className="white-shadow">
                          <div>
                            <MDBRow>
                              <MDBCol md="9" className="vl_box_head">
                                {this.state.name}
                              </MDBCol>
                              <MDBCol md="3">
                                <button
                                  className="last_btn"
                                  onClick={this.editDetailsButton2}
                                >
                                  Edit
                                </button>
                              </MDBCol>
                            </MDBRow>
                            <div className="uploadphoto pt-15">
                              <img
                                src={
                                  LocationDetails.bussiness_logo
                                    ? "https://digimonk.net/dashify-ci/assets/upload/images/business-type-image/" +
                                      LocationDetails.bussiness_logo
                                    : require("./assets/user_img.png")
                                }
                                alt="Logo"
                              />
                            </div>
                            <div className="detailbox">
                              <MDBRow>
                                <MDBCol>
                                  <MDBRow className="uploadauthor">
                                    <MDBCol md="6">
                                      <div className="author_namebox">
                                        Store Code :
                                      </div>
                                    </MDBCol>

                                    <MDBCol md="6">
                                      <div className="storetext">
                                        {this.state.storeCode}
                                      </div>
                                    </MDBCol>
                                  </MDBRow>

                                  <MDBRow className="uploadauthor">
                                    <MDBCol md="6">
                                      <div className="author_namebox">
                                        Category :
                                      </div>
                                    </MDBCol>

                                    <MDBCol md="6">
                                      <div className="storetext">
                                        {this.state.category}
                                      </div>
                                    </MDBCol>
                                  </MDBRow>

                                  <MDBRow className="uploadauthor">
                                    <MDBCol md="6">
                                      <div className="author_namebox">
                                        Address :
                                      </div>
                                    </MDBCol>

                                    <MDBCol md="6">
                                      <div className="storetext">
                                        {
                                          this.state.address
                                          // (this.state.city,
                                          // this.state.state,
                                          // this.state.postalCode)
                                        }
                                      </div>
                                    </MDBCol>
                                  </MDBRow>

                                  <MDBRow className="uploadauthor">
                                    <MDBCol md="6">
                                      <div className="author_namebox">
                                        Phone :
                                      </div>
                                    </MDBCol>

                                    <MDBCol md="6">
                                      <div className="storetext">
                                        {this.state.phone}
                                      </div>
                                    </MDBCol>
                                  </MDBRow>

                                  <MDBRow className="uploadauthor">
                                    <MDBCol md="6">
                                      <div className="author_namebox">
                                        Website :
                                      </div>
                                    </MDBCol>

                                    <MDBCol md="6">
                                      <div className="storetext">
                                        {this.state.website}
                                      </div>
                                    </MDBCol>
                                  </MDBRow>
                                </MDBCol>
                              </MDBRow>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="col-md-4">
                      {this.state.businessDetailsLoading ? (
                        <div className="white-shadow">
                          <div style={{ textAlign: "center" }}>
                            <Loader
                              type="Oval"
                              color="#00BFFF"
                              height={30}
                              width={30}
                              // timeout={3000} //3 secs
                            />
                          </div>
                        </div>
                      ) : this.state.detailEdit ? (
                        <div className="white-shadow">
                          <div>
                            <MDBRow>
                              <MDBCol md="9" className="vl_box_head">
                                {this.state.name}
                              </MDBCol>
                            </MDBRow>
                            <form
                              onSubmit={this.updateDetailsButton("details1")}
                            >
                              <div className="pt-15">
                                <MDBRow className="uploadauthor">
                                  <MDBCol md="12">
                                    <div className="author_namebox">
                                      About the business :
                                    </div>
                                  </MDBCol>

                                  <MDBCol md="12">
                                    <textarea
                                      name="about_edit"
                                      onChange={this.changeHandler}
                                      type="text"
                                      className="vl_edit_textbox"
                                      placeholder="Enter about business "
                                      value={this.state.about_edit}
                                    />
                                  </MDBCol>
                                </MDBRow>
                                <div className="detailbox">
                                  <MDBRow>
                                    <MDBCol>
                                      <MDBRow className="uploadauthor">
                                        <MDBCol md="6">
                                          <div className="author_namebox">
                                            Owner name :
                                          </div>
                                        </MDBCol>

                                        <MDBCol md="6">
                                          <input
                                            name="ownerName_edit"
                                            onChange={this.changeHandler}
                                            type="text"
                                            className="vl_edit_input"
                                            placeholder="Enter Owner Name"
                                            value={this.state.ownerName_edit}
                                            required
                                          />
                                        </MDBCol>
                                      </MDBRow>

                                      <MDBRow className="uploadauthor">
                                        <MDBCol md="6">
                                          <div className="author_namebox">
                                            Owner email :
                                          </div>
                                        </MDBCol>

                                        <MDBCol md="6">
                                          <input
                                            name="ownerEmail_edit"
                                            onChange={this.changeHandler}
                                            type="email"
                                            className="vl_edit_input"
                                            placeholder="Enter Owner Email"
                                            value={this.state.ownerEmail_edit}
                                          />
                                        </MDBCol>
                                      </MDBRow>

                                      <MDBRow className="uploadauthor">
                                        <MDBCol md="6">
                                          <div className="author_namebox">
                                            Bussiness tagline :
                                          </div>
                                        </MDBCol>

                                        <MDBCol md="6">
                                          <input
                                            name="businessTagline_edit"
                                            onChange={this.changeHandler}
                                            className="vl_edit_input"
                                            placeholder="Enter Business Tagline"
                                            value={
                                              this.state.businessTagline_edit
                                            }
                                          />
                                        </MDBCol>
                                      </MDBRow>

                                      <MDBRow className="uploadauthor">
                                        <MDBCol md="6">
                                          <div className="author_namebox">
                                            Year of incorporation :
                                          </div>
                                        </MDBCol>

                                        <MDBCol md="6">
                                          <input
                                            name="yearOfIncorp_edit"
                                            onChange={this.changeHandler}
                                            type="number"
                                            className="vl_edit_input"
                                            id="yearOfIncorp"
                                            placeholder="Enter Year of Incorporation"
                                            value={this.state.yearOfIncorp_edit}
                                          />
                                        </MDBCol>
                                      </MDBRow>

                                      {/* <MDBRow className="uploadauthor">
                                        <MDBCol md="6">
                                          <div className="author_namebox">
                                            Website :
                                          </div>
                                        </MDBCol>

                                        <MDBCol md="6">
                                          <input
                                            name="website_edit"
                                            type="text"
                                            onChange={this.changeHandler}
                                            className="vl_edit_input"
                                            value={this.state.website_edit}
                                          />
                                        </MDBCol>
                                      </MDBRow>
 */}

                                      <MDBRow className="uploadauthor">
                                        <MDBCol md="6">
                                          <div className="author_namebox">
                                            Facebook Profile :
                                          </div>
                                        </MDBCol>

                                        <MDBCol md="6">
                                          <input
                                            name="facebookProfile_edit"
                                            onChange={this.changeHandler}
                                            type="url"
                                            className="vl_edit_input"
                                            placeholder="Enter Facbook Profile"
                                            value={
                                              this.state.facebookProfile_edit
                                            }
                                          />
                                        </MDBCol>
                                      </MDBRow>

                                      <MDBRow className="uploadauthor">
                                        <MDBCol md="6">
                                          <div className="author_namebox">
                                            Instagram Profile :
                                          </div>
                                        </MDBCol>

                                        <MDBCol md="6">
                                          <input
                                            name="instagramProfile_edit"
                                            onChange={this.changeHandler}
                                            type="url"
                                            className="vl_edit_input"
                                            placeholder="Enter Instagram Profile"
                                            value={
                                              this.state.instagramProfile_edit
                                            }
                                          />
                                        </MDBCol>
                                      </MDBRow>

                                      <MDBRow className="uploadauthor">
                                        <MDBCol md="6">
                                          <div className="author_namebox">
                                            Twitter Profile :
                                          </div>
                                        </MDBCol>

                                        <MDBCol md="6">
                                          <input
                                            name="twitterProfile_edit"
                                            type="url"
                                            onChange={this.changeHandler}
                                            className="vl_edit_input"
                                            placeholder="Enter twitter Profile"
                                            value={
                                              this.state.twitterProfile_edit
                                            }
                                          />
                                        </MDBCol>
                                      </MDBRow>
                                    </MDBCol>
                                  </MDBRow>

                                  <MDBRow style={{ marginTop: "20px" }}>
                                    <MDBCol md="3" className="offset-md-5">
                                      <button
                                        type="submit"
                                        className="last_btn"
                                        style={{ marginLeft: "-5px" }}
                                        // onClick={this.updateDetailsButton2}
                                      >
                                        Update
                                      </button>
                                    </MDBCol>
                                    <MDBCol md="3">
                                      <button
                                        className="last_btn"
                                        onClick={this.editDetailsButton}
                                        style={{ marginLeft: "5px" }}
                                      >
                                        Cancel
                                      </button>
                                    </MDBCol>
                                  </MDBRow>
                                  {/* <div className="business-cover text-center">
                              <button
                                type="submit"
                                className="last_btn"
                                // onClick={this.updateDetailsButton}
                              >
                                Update
                              </button>
                              <button
                                className="last_btn"
                                onClick={this.editDetailsButton}
                              >
                                Cancel
                              </button>
                            </div> */}
                                </div>
                              </div>

                              {/* <div className="form-group">
                              <label className='payment_label'>Business Owner Name</label>
                              <input
                                name="ownerName_edit"
                                onChange={this.changeHandler}
                                type="text"
                                className="vl_edit_input"
                                placeholder="Enter Business Owner Name"
                                value={this.state.ownerName_edit}
                                required
                              ></input>
                            </div>
                            <div className="form-group">
                              <label className='payment_label'>Owner Email</label>
                              <input
                                name="ownerEmail_edit"
                                onChange={this.changeHandler}
                                type="email"
                                className="vl_edit_input"
                                placeholder="Enter Owner Email"
                                value={this.state.ownerEmail_edit}
                              ></input>
                            </div>

                            <div className="form-group">
                              <label className='payment_label'>Business Tagline</label>
                              <input
                                name="businessTagline_edit"
                                onChange={this.changeHandler}
                                className="vl_edit_input"
                                placeholder="Enter Business Tagline"
                                value={this.state.businessTagline_edit}
                              ></input>
                            </div>

                            <div className="form-group">
                              <label className='payment_label'>Year of Incorporation</label>
                              <input
                                name="yearOfIncorp_edit"
                                onChange={this.changeHandler}
                                type="number"
                                className="vl_edit_input"
                                id="yearOfIncorp"
                                placeholder="Enter Year of Incorporation"
                                value={this.state.yearOfIncorp_edit}
                              />
                            </div>

                            <div className="form-group">
                              <label className='payment_label'>
                                About The Business <span>*</span>
                              </label>
                              <textarea
                                name="about_edit"
                                onChange={this.changeHandler}
                                className="vl_edit_input"
                                value={this.state.about_edit}
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label className='payment_label'>Facebook Profile</label>
                              <input
                                name="facebookProfile_edit"
                                onChange={this.changeHandler}
                                type="url"
                                className="vl_edit_input"
                                placeholder="Enter Facbook Profile"
                                value={this.state.facebookProfile_edit}
                              />
                            </div>

                            <div className="form-group">
                              <label className='payment_label'>Instagram Profile</label>
                              <input
                                name="instagramProfile_edit"
                                onChange={this.changeHandler}
                                type="url"
                                className="vl_edit_input"
                                placeholder="Enter Instagram Profile"
                                value={this.state.instagramProfile_edit}
                              />
                            </div>

                            <div className="form-group">
                              <label className='payment_label'>Twitter Profile</label>
                              <input
                                name="twitterProfile_edit"
                                onChange={this.changeHandler}
                                type="url"
                                className="vl_edit_input"
                                placeholder="Enter Twitter Profile"
                                value={this.state.twitterProfile_edit}
                              />
                            </div> */}

                              {/* <div className="business-cover text-center">
                              <button
                                type="submit"
                                className="last_btn"
                                // onClick={this.updateDetailsButton}
                              >
                                Update
                              </button>
                              <button
                                className="last_btn"
                                onClick={this.editDetailsButton}
                              >
                                Cancel
                              </button>
                            </div> */}
                            </form>
                          </div>
                        </div>
                      ) : (
                        <div className="upload_text white-shadow">
                          <MDBRow>
                            <MDBCol md="9" className="vl_box_head">
                              {this.state.name}
                            </MDBCol>
                            <MDBCol md="3">
                              <button
                                className="last_btn"
                                onClick={this.editDetailsButton}
                              >
                                Edit
                              </button>
                            </MDBCol>
                          </MDBRow>
                          <div className="pt-15">
                            <h3>About the business</h3>
                            <p style={{height:'129px'}}>{this.state.about}</p>
                            <div className="detailbox">
                              {/* <div className="uploadauthor">
                            <div className="author_namebox">Owner name :</div>
                            <div className="storetext">
                              {this.state.ownerName}
                            </div>
                          </div> */}

                              <MDBRow>
                                <MDBCol>
                                  <MDBRow className="uploadauthor">
                                    <MDBCol md="6">
                                      <div className="author_namebox">
                                        Owner name :
                                      </div>
                                    </MDBCol>

                                    <MDBCol md="6">
                                      <div className="storetext">
                                        {this.state.ownerName}
                                      </div>
                                    </MDBCol>
                                  </MDBRow>

                                  <MDBRow className="uploadauthor">
                                    <MDBCol md="6">
                                      <div className="author_namebox">
                                        Owner email :
                                      </div>
                                    </MDBCol>

                                    <MDBCol md="6">
                                      <div className="storetext">
                                        {this.state.ownerEmail}
                                      </div>
                                    </MDBCol>
                                  </MDBRow>

                                  <MDBRow className="uploadauthor">
                                    <MDBCol md="6">
                                      <div className="author_namebox">
                                        Bussiness tagline :
                                      </div>
                                    </MDBCol>

                                    <MDBCol md="6">
                                      <div className="storetext">
                                        {/* {this.state.city}, */}
                                        {this.state.businessTagline}
                                        {/* {this.state.postalCode} */}
                                      </div>
                                    </MDBCol>
                                  </MDBRow>

                                  <MDBRow className="uploadauthor">
                                    <MDBCol md="6">
                                      <div className="author_namebox">
                                        Year of incorporation :
                                      </div>
                                    </MDBCol>

                                    <MDBCol md="6">
                                      <div className="storetext">
                                        {this.state.yearOfIncorp}
                                      </div>
                                    </MDBCol>
                                  </MDBRow>

                                  {/* <MDBRow className="uploadauthor">
                                    <MDBCol md="6">
                                      <div className="author_namebox">
                                        Website :
                                      </div>
                                    </MDBCol>


                                    <MDBCol md="6">
                                      <div className="storetext">
                                        {this.state.website}
                                      </div>
                                    </MDBCol>
                                  </MDBRow>
                                */}
                                </MDBCol>
                              </MDBRow>
                            </div>
                            <ul className="socialicon-new">
                              {this.state.facebookProfile ? (
                                <li>
                                  <a href={this.state.facebookProfile}>
                                    <img
                                      src={require("../images/icon-2.png")}
                                      alt="Facebook"
                                    />
                                  </a>
                                </li>
                              ) : (
                                ""
                              )}

                              {this.state.instagramProfile ? (
                                <li>
                                  <a href={this.state.instagramProfile}>
                                    <img
                                      src={require("../images/icon-3.png")}
                                      alt="Instagram"
                                    />
                                  </a>
                                </li>
                              ) : (
                                ""
                              )}
                              {this.state.twitterProfile ? (
                                <li>
                                  <a href={this.state.twitterProfile}>
                                    <img
                                      src={require("../images/icon-4.png")}
                                      alt="Twitter"
                                    />
                                  </a>
                                </li>
                              ) : (
                                ""
                              )}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="col-md-4">
                      {this.state.operatingHoursLoading ? (
                        <div className="white-shadow">
                          <div style={{ textAlign: "center" }}>
                            <Loader
                              type="Oval"
                              color="#00BFFF"
                              height={30}
                              width={30}
                              // timeout={3000} //3 secs
                            />
                          </div>
                        </div>
                      ) : this.state.hourEdit ? (
                        <div className=" white-shadow">
                          <MDBRow>
                            <MDBCol md="9" className="vl_box_head">
                              Operations Hours
                            </MDBCol>
                          </MDBRow>
                          <div className="vl_gap3 ">
                            <MDBRow className=" daybox">
                              <MDBCol md="3" className="daytype">
                                Monday
                              </MDBCol>
                              <MDBCol md="5" className='no_right_padding'>
                                <select
                                  name="monday"
                                  onChange={this.changeHandler}
                                  className="vl_edit_input"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>
                              </MDBCol>
                              <MDBCol md="4"  className='no_right_padding'>
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
                                        {mondayStart1_error}

                                        <input
                                          name="mondayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {mondayEnd1_error}
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
                                        {mondayStart1_error}

                                        <input
                                          name="mondayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {mondayEnd1_error}

                                        <input
                                          name="mondayStart2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {mondayStart2_error}

                                        <input
                                          name="mondayEnd2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {mondayEnd2_error}
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {this.state.monday ? (
                                    <div
                                      className="closebox"
                                      onClick={() =>
                                        this.clear_day_state("monday")
                                      }
                                    >
                                      {/* <i className="zmdi zmdi-close"></i> */}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </MDBCol>
                            </MDBRow>
                            <div>
                              <span><input
                                    type="checkbox"
                                    name="applyAll"
                                    onChange={this.allChanger}
                                  /></span>
                                  <span className='apply_all'>Apply To All</span>
                                  </div>
                                  <div class='err_msg'>
                                    {applyAllError}
                                  </div>
                                  {applyAll=="1" && !applyAllError ? (
                                    ""
                                  ) : (
                                    <div>
                                      <MDBRow className=" daybox">
                              <MDBCol md="3" className="daytype">
                                Tuesday
                              </MDBCol>
                              <MDBCol md="5" className='no_right_padding'>
                                <select
                                  name="tuesday"
                                  onChange={this.changeHandler}
                                  className="vl_edit_input"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>
                              </MDBCol>
                              <MDBCol md="4"  className='no_right_padding'>
                                <div className="output">
                                  {this.state.tuesday == "OPEN" ? (
                                    <div>
                                      <p className="basicExample">
                                        {console.log("time")}

                                        <input
                                          name="tuesdayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {tuesdayStart1_error}

                                        <input
                                          name="tuesdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {tuesdayEnd1_error}
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
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {tuesdayStart1_error}

                                        <input
                                          name="tuesdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {tuesdayEnd1_error}

                                        <input
                                          name="tuesdayStart2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {tuesdayStart2_error}

                                        <input
                                          name="tuesdayEnd2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {tuesdayEnd2_error}
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {this.state.tuesday ? (
                                    <div
                                      className="closebox"
                                      onClick={() =>
                                        this.clear_day_state("tuesday")
                                      }
                                    >
                                      {/* <i className="zmdi zmdi-close"></i> */}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </MDBCol>
                            </MDBRow>

                            <MDBRow className=" daybox">
                              <MDBCol md="3" className="daytype">
                                Wednesday
                              </MDBCol>
                              <MDBCol md="5" className='no_right_padding'>
                                <select
                                  name="wednesday"
                                  onChange={this.changeHandler}
                                  className="vl_edit_input"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>
                              </MDBCol>
                              <MDBCol md="4"  className='no_right_padding'>
                                <div className="output">
                                  {this.state.wednesday == "OPEN" ? (
                                    <div>
                                      <p className="basicExample">
                                        {console.log("time")}

                                        <input
                                          name="wednesdayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {wednesdayStart1_error}

                                        <input
                                          name="wednesdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {wednesdayEnd1_error}
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
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {wednesdayStart1_error}

                                        <input
                                          name="wednesdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {wednesdayEnd1_error}

                                        <input
                                          name="wednesdayStart2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {wednesdayStart2_error}

                                        <input
                                          name="wednesdayEnd2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {wednesdayEnd2_error}
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {this.state.wednesday ? (
                                    <div
                                      className="closebox"
                                      onClick={() =>
                                        this.clear_day_state("wednesday")
                                      }
                                    >
                                      {/* <i className="zmdi zmdi-close"></i> */}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </MDBCol>
                            </MDBRow>

                            <MDBRow className=" daybox">
                              <MDBCol md="3" className="daytype">
                                Thrusday
                              </MDBCol>
                              <MDBCol md="5" className='no_right_padding'>
                                <select
                                  name="thursday"
                                  onChange={this.changeHandler}
                                  className="vl_edit_input"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>
                              </MDBCol>
                              <MDBCol md="4"  className='no_right_padding'>
                                <div className="output">
                                  {this.state.thursday == "OPEN" ? (
                                    <div>
                                      <p className="basicExample">
                                        {console.log("time")}

                                        <input
                                          name="thursdayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {thursdayStart1_error}

                                        <input
                                          name="thursdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {thursdayEnd1_error}
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
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {thursdayStart1_error}

                                        <input
                                          name="thursdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {thursdayEnd1_error}

                                        <input
                                          name="thursdayStart2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {thursdayStart2_error}

                                        <input
                                          name="thursdayEnd2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {thursdayEnd2_error}
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {this.state.thursday ? (
                                    <div
                                      className="closebox"
                                      onClick={() =>
                                        this.clear_day_state("thursday")
                                      }
                                    >
                                      {/* <i className="zmdi zmdi-close"></i> */}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </MDBCol>
                            </MDBRow>

                            <MDBRow className=" daybox">
                              <MDBCol md="3" className="daytype">
                                Friday
                              </MDBCol>
                              <MDBCol md="5" className='no_right_padding'>
                                <select
                                  name="friday"
                                  onChange={this.changeHandler}
                                  className="vl_edit_input"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>
                              </MDBCol>
                              <MDBCol md="4"  className='no_right_padding'>
                                <div className="output">
                                  {this.state.friday == "OPEN" ? (
                                    <div>
                                      <p className="basicExample">
                                        {console.log("time")}

                                        <input
                                          name="fridayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {fridayStart1_error}

                                        <input
                                          name="fridayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {fridayEnd1_error}
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
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {fridayStart1_error}

                                        <input
                                          name="fridayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {fridayEnd1_error}

                                        <input
                                          name="fridayStart2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {fridayStart2_error}

                                        <input
                                          name="fridayEnd2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {fridayEnd2_error}
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {this.state.friday ? (
                                    <div
                                      className="closebox"
                                      onClick={() =>
                                        this.clear_day_state("friday")
                                      }
                                    >
                                      {/* <i className="zmdi zmdi-close"></i> */}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </MDBCol>
                            </MDBRow>

                            <MDBRow className=" daybox">
                              <MDBCol md="3" className="daytype">
                                Saturday
                              </MDBCol>
                              <MDBCol md="5" className='no_right_padding'>
                                <select
                                  name="saturday"
                                  onChange={this.changeHandler}
                                  className="vl_edit_input"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>
                              </MDBCol>
                              <MDBCol md="4"  className='no_right_padding'>
                                <div className="output">
                                  {this.state.saturday == "OPEN" ? (
                                    <div>
                                      <p className="basicExample">
                                        {console.log("time")}

                                        <input
                                          name="saturdayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {saturdayStart1_error}

                                        <input
                                          name="saturdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {saturdayEnd1_error}
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
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {saturdayStart1_error}

                                        <input
                                          name="saturdayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {saturdayEnd1_error}

                                        <input
                                          name="saturdayStart2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {saturdayStart2_error}

                                        <input
                                          name="saturdayEnd2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {saturdayEnd2_error}
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {this.state.saturday ? (
                                    <div
                                      className="closebox"
                                      onClick={() =>
                                        this.clear_day_state("saturday")
                                      }
                                    >
                                      {/* <i className="zmdi zmdi-close"></i> */}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </MDBCol>
                            </MDBRow>

                            <MDBRow className=" daybox">
                              <MDBCol md="3" className="daytype">
                                Sunday
                              </MDBCol>
                              <MDBCol md="5" className='no_right_padding'>
                                <select
                                  name="sunday"
                                  onChange={this.changeHandler}
                                  className="vl_edit_input"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>
                              </MDBCol>
                              <MDBCol md="4"  className='no_right_padding'>
                                <div className="output">
                                  {this.state.sunday == "OPEN" ? (
                                    <div>
                                      <p className="basicExample">
                                        {console.log("time")}

                                        <input
                                          name="sundayStart1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {sundayStart1_error}

                                        <input
                                          name="sundayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {sundayEnd1_error}
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
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {sundayStart1_error}

                                        <input
                                          name="sundayEnd1"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {sundayEnd1_error}

                                        <input
                                          name="sundayStart2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {sundayStart2_error}

                                        <input
                                          name="sundayEnd2"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {sundayEnd2_error}
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {this.state.sunday ? (
                                    <div
                                      className="closebox"
                                      onClick={() =>
                                        this.clear_day_state("sunday")
                                      }
                                    >
                                      {/* <i className="zmdi zmdi-close"></i> */}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </MDBCol>
                            </MDBRow>
                                    </div>)}

                            
                          </div>

                          <MDBRow style={{ marginTop: "20px" }}>
                            <MDBCol md="3" className="offset-md-5">
                              <button
                                type="submit"
                                className="last_btn"
                                style={{ marginLeft: "-5px" }}
                                onClick={this.updateHourButton}
                              >
                                Update
                              </button>
                            </MDBCol>
                            <MDBCol md="3">
                              <button
                                className="last_btn"
                                onClick={this.editHourButton}
                                style={{ marginLeft: "5px" }}
                              >
                                Cancel
                              </button>
                            </MDBCol>
                          </MDBRow>
                        </div>
                      ) : (
                        <div className=" white-shadow">
                          <MDBRow>
                            <MDBCol md="9" className="vl_box_head">
                              Operations Hours
                            </MDBCol>
                            <MDBCol md="3">
                              <button
                                className="last_btn"
                                onClick={this.editHourButton}
                              >
                                Edit
                              </button>
                            </MDBCol>
                          </MDBRow>

                          {regularHours1}

                          {this.state.specialTimeLoading ? (
                            <div style={{ textAlign: "center" }}>
                              <Loader
                                type="Oval"
                                color="#00BFFF"
                                height={30}
                                width={30}
                                // timeout={3000} //3 secs
                              />
                            </div>
                          ) : this.state.add_special_hour ? (
                            <div className="form-group">
                              <div className="timebox">
                                {/* <div className="form-day">MONDAY</div> */}
<MDBRow>
   <MDBCol md='12'>
                             
                                  <input
                                    name="monday_day_s"
                                    onChange={this.changeHandler}
                                    type="date"
                                    className="vl_edit_input"
                                  />
                                  {monday_day_s_error}
                             
  </MDBCol>
  <MDBCol md='6'>
  <select
                                  name="monday_s"
                                  onChange={this.changeHandler}
                                  className="vl_edit_input"
                                >
                                  <option>Select hours</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="SPLIT">SPLIT</option>
                                  <option value="OPEN 24x7">OPEN_24x7</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>                
  </MDBCol>
 <MDBCol md='6' className="output">
 {this.state.monday_s == "OPEN" ? (
                                    <div>
                                      <p className="basicExample">
                                        {console.log("time")}

                                        <input
                                          name="mondayStart1_s"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {mondayStart1_s_error}

                                        <input
                                          name="mondayEnd1_s"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {mondayEnd1_s_error}
                                      </p>{" "}
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {this.state.monday_s == "SPLIT" ? (
                                    <div>
                                      <p className="basicExample">
                                        <input
                                          name="mondayStart1_s"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {mondayStart1_s_error}

                                        <input
                                          name="mondayEnd1_s"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {mondayEnd1_s_error}

                                        <input
                                          name="mondayStart2_s"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {mondayStart2_s_error}

                                        <input
                                          name="mondayEnd2_s"
                                          onChange={this.changeHandler}
                                          type="time"
                                          className="vl_edit_input"
                                          defaultValue="12:00 AM"
                                        />
                                        {mondayEnd2_s_error}
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
 </MDBCol>
</MDBRow>
                                   
                              </div>
                              <MDBRow style={{ marginTop: "20px" }}>
                            <MDBCol md="3" className="offset-md-5">
                              <button
                                type="submit"
                                className="last_btn"
                                style={{ marginLeft: "-5px" }}
                                onClick={this.addSpecialHourButton}
                              >
                                Update
                              </button>
                            </MDBCol>
                            <MDBCol md="3">
                              <button
                                className="last_btn"
                                onClick={() => this.editSpecialHourButton()}
                                style={{ marginLeft: "5px" }}
                              >
                                Cancel
                              </button>
                            </MDBCol>
                          </MDBRow>
                              {/* <div className="business-cover text-center">
                                <button
                                  type="submit"
                                  className="last_btn"
                                  onClick={this.addSpecialHourButton}
                                >
                                  Update
                                </button>
                                <button
                                  type="submit"
                                  className="last_btn"
                                  onClick={() => this.editSpecialHourButton()}
                                >
                                  Cancel
                                </button>
                              </div>
                             */}
                            </div>
                          ) : (
                            <div>
                              <div className="add-a-spacial box-space">
                                <a
                                  className="last_btn"
                                  onClick={this.editSpecialHourButton}
                                >
                                  Add a special Hour
                                </a>
                              </div>

                              {regularHours2}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-30">
                <div className="light-blue">
                  <MDBRow className="box-space">
                    <MDBCol md="10" className="vl_box_head">
                      Payment Method
                    </MDBCol>
                    {this.state.paymentEdit ? null : 
                    <MDBCol md="2">
                      <button
                        className="pay_last_btn"
                        onClick={this.editPaymentButton}
                      >
                        Edit
                      </button>
                    </MDBCol>}
                  </MDBRow>

                  {this.state.paymentLoading ? (
                    <div style={{ textAlign: "center" }}>
                      <Loader
                        type="Oval"
                        color="#00BFFF"
                        height={30}
                        width={30}
                        // timeout={3000} //3 secs
                      />
                    </div>
                  ) : this.state.paymentEdit ? (
                    <div className="mathedbox">
                      <form onSubmit={this.editDetailsHandler}>
                      <MDBRow>
      
        {this.state.p_visa?
<MDBCol md='2' >
  <div className='payment_box ' >
<input
checked
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
:<MDBCol md='2' >
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
  
</MDBCol>}
{this.state.p_maestro?<MDBCol md='2' >
  <div className='payment_box'>
<input
checked
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
   :
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
  }
{this.state.p_amex?
  <MDBCol md='2'>
<div  className='payment_box '> 
<input checked
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
 :
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
  }
  {this.state.p_cash?<MDBCol md='2'>
<div  className='payment_box '> 
<input
checked
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
 :
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
  }
  {this.state.p_crypto?<MDBCol md='2'>
<div  className='payment_box '> 
<input
checked
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
</MDBCol>:
 
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
  }
  {this.state.p_diners?<MDBCol md='2'>
<div  className='payment_box '> 
<input checked
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
 :
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
  }
  {this.state.p_discover?<MDBCol md='2'>
<div  className='payment_box '> 
<input checked
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
 :
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
  }
  {this.state.p_apple?<MDBCol md='2'>
<div  className='payment_box '> 
<input checked
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
</MDBCol>:<MDBCol md='2'>
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
 
 }
{this.state.p_samsung?<MDBCol md='2'>
<div  className='payment_box '>
<input checked
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
</MDBCol>:<MDBCol md='2'>
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
 
 }
{this.state.p_paypal?
<MDBCol md='2'>
<div  className='payment_box '>
<input checked
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
 :<MDBCol md='2'>
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
  } 
  {this.state.p_android?<MDBCol md='2'>
<div  className='payment_box '> 
<input checked
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
</MDBCol>:
 
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
  }
{this.state.p_invoices?<MDBCol md='2'>
<div  className='payment_box '> 
<input checked
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
</MDBCol>:<MDBCol md='2'>
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
  
  }
  {this.state.p_traveler?<MDBCol md='2'>
<div  className='payment_box '>
<input checked
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
 :
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
  }
{this.state.p_financing?<MDBCol md='2'>
<div  className='payment_box '> 
<input checked
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
</MDBCol>:<MDBCol md='2'>
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
 }
</MDBRow>                 
                        
                        <MDBRow>
                        {this.state.paymentEdit ?
                        <MDBCol md="2" className="offset-md-8">
                      <button
                        className="pay_last_btn"
                        onClick={this.editPaymentButton}
                      >
                         Cancel 
                      </button>
                    </MDBCol>
                    : null}
                          <MDBCol md='2'>
                            <button
                              type="submit"
                              className="last_btn"
                              onClick={this.updatePaymentButton}
                              style={{ float: "right", marginRight: "18px" }}
                            >
                              Update
                            </button>
                          </MDBCol>
                        </MDBRow>
                      </form>
                    </div>
                  ) : (
                    <div className="mathedbox">
                      <MDBRow>{paymentAccepted}</MDBRow>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-30">
                <div className="row">
                  <div className="col-md-4">
                    <div className="business-cover vl_box_head">
                      Business covers image
                      <div>
                        {this.state.coverImageLoading ? (
                          <div style={{ textAlign: "center" }}>
                            <Loader
                              type="Oval"
                              color="#00BFFF"
                              height={30}
                              width={30}
                              // timeout={3000} //3 secs
                            />
                          </div>
                        ) : LocationDetails.bussiness_cover_image ? (
                          <div className="coverimgupload">
                            <img
                              src={
                                "https://digimonk.net/dashify-ci/assets/upload/images/business-type-image/" +
                                LocationDetails.bussiness_cover_image
                              }
                              alt="Cover image"
                              style={{
                                height: "110px",
                                width: "112px",
                                borderRadius: "10px"
                              }}
                            />
                            <div className="vl-get-image1">
                              <img
                                src={edit}
                                alt=""
                                style={{ height: "20px", width: "20px" }}
                              />
                              <input
                                type="file"
                                name="bussiness_cover_image"
                                onChange={this.onUploadLogo(
                                  "bussiness_cover_image"
                                )}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="plush_new">
                            <span>
                              <i className="zmdi zmdi-plus"></i>
                              Attatch a image
                              <input
                                type="file"
                                name="bussiness_cover_image"
                                onChange={this.onUploadLogo(
                                  "bussiness_cover_image"
                                )}
                              />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="business-cover ">
                      <div className="vl_box_head">Sharred Business Images</div>
                      {this.state.otherImagesLoading ? (
                        <div style={{ textAlign: "center" }}>
                          <Loader
                            type="Oval"
                            color="#00BFFF"
                            height={30}
                            width={30}
                            // timeout={3000} //3 secs
                          />
                        </div>
                      ) : (
                        <div style={{ marginTop: "5px" }}>
                          <MDBRow>
                            <MDBCol md="2" className="plush_new">
                              <span>
                                <i className="zmdi zmdi-plus"></i>
                                Attatch a image
                                <input
                                  type="file"
                                  name="otherImage"
                                  onChange={this.onUploadOtherImage}
                                />
                              </span>
                            </MDBCol>
                            {this.state.otherImages.map((n, i) => (
                              <MDBCol md="2" className="plush_new">
                                <img src={"https://digimonk.net/dashify-ci/assets/upload/images/business-type-image/" +
                                    n.image
                                  }
                                  alt=""
                                  style={{
                                    height: "110px",
                                    width: "112px",
                                    borderRadius: "10px"
                                  }}
                                />

                                <div className="get-image1">
                                  <img
                                    src={cross_img}
                                    alt=""
                                    style={{
                                      height: "10px",
                                      width: "10px",
                                      backgroundColor: "red",
                                      borderRadius: "50%",
                                      padding: "2px"
                                    }}
                                    onClick={() =>
                                      this.delete_other_image(n.id)
                                    }
                                  />
                                </div>
                              </MDBCol>
                            ))}
                          </MDBRow>
                          {/* <li>
                                  <div className="plush_new">
                                    <span>
                                      <i className="zmdi zmdi-plus"></i>
                                      Attatch a image
                                      <input
                                        type="file"
                                        name="otherImage"
                                        onChange={this.onUploadOtherImage}
                                      />
                                    </span>
                                    
                                  </div>
                                </li> */}
                          {/* {this.state.otherImages.map((n, i) => (
                                  <li>
                                    <span>
                                      <div className="coverimgupload">
                                        <img
                                          src={
                                            "https://digimonk.net/dashify-ci/assets/upload/images/business-type-image/" +
                                            this.state.otherImages[i].Image
                                          }
                                          alt="Starred Business covers image"
                                        />

                                        <div className="get-image">
                                          <img
                                            src={cross_img}
                                            alt=""
                                            style={{
                                              height: "20px",
                                              width: "20px"
                                            }}
                                            onClick={() =>
                                              this.delete_other_image(n.id)
                                            }
                                          />
                                        </div>
                                      </div>
                                    </span>
                                  </li>
                                ))} */}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          
            <div >
              <h4 className='connect_msg'>Connect Location First</h4>
            </div>
        )}
      </div>
    );
  }
}
