import React, { Component } from "react";
import Axios from "axios";
import {
  business_categories,
  location_by_id,
  edit_location_by_id,
  edit_location_operations_hours_by_id,
  edit_location_payment_by_id,
  update_images_by_location_id,
  add_other_images_by_location_id,
  delete_other_images_by_location_id
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
    applyAll: false,
    applyAllError: ""
  };

  componentDidMount = async () => {
    await this.loading_location_details();
    await this._loadBusinessCategories();
  };

  loading_location_details = () => {
    var locationId = this.props.match.params.locationId;
    const data = {
      location_id: locationId
    };

    location_by_id(data, DjangoConfig).then(resp => {
      console.log("location_by_id", resp.data);
      this.setState({
        location: resp.data.location,
        name: resp.data.location.Location_name,
        storeCode: resp.data.location.Store_Code,
        category: "Loading.....",
        category_id: "",
        address: resp.data.location.Address_1,
        website: resp.data.location.Website,
        phone: resp.data.location.Phone_no,
        hours: resp.data.location.Df_location_poen_hour,
        about: resp.data.location.About_Business,
        ownerName: resp.data.location.Business_Owner_Name,
        addressLine: resp.data.location,
        city: resp.data.location.City,
        state: resp.data.location.State,
        postalCode: resp.data.location.Zipcode,
        ownerEmail: resp.data.location.Owner_Email,
        yearOfIncorp: resp.data.location.Year_Of_Incorporation,
        businessTagline: resp.data.location.Business_Tagline,
        instagramProfile: resp.data.location.Instagram_Profile,
        twitterProfile: resp.data.location.Twitter_Profile,
        facebookProfile: resp.data.location.Facebook_Profile,
        payment: resp.data.location.Df_location_payments,
        LocationDetails: resp.data.location,
        otherImages: resp.data.location.Df_location_image,
        loader: false,

        //editing details
        name_edit: resp.data.location.Location_name,
        storeCode_edit: resp.data.location.Store_Code,
        address_edit: resp.data.location.Address_1,
        website_edit: resp.data.location.Website,
        phone_edit: resp.data.location.Phone_no,
        about_edit: resp.data.location.About_Business,
        ownerName_edit: resp.data.location.Business_Owner_Name,
        addressLine_edit: resp.data.location,
        city_edit: resp.data.location.City,
        state_edit: resp.data.location.State,
        postalCode_edit: resp.data.location.Zipcode,
        ownerEmail_edit: resp.data.location.Owner_Email,
        yearOfIncorp_edit: resp.data.location.Year_Of_Incorporation,
        businessTagline_edit: resp.data.location.Business_Tagline,
        instagramProfile_edit: resp.data.location.Instagram_Profile,
        twitterProfile_edit: resp.data.location.Twitter_Profile,
        facebookProfile_edit: resp.data.location.Facebook_Profile
      });

      business_categories(DjangoConfig).then(resp1 => {
        resp1.data.BusinessCategory.map((b, i) =>
          b.id == resp.data.location.Business_category
            ? this.setState({ category: b.Category_Name })
            : ""
        );
      });
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

    if (name == "details1") {
      data = {
        Location_id: locationId,
        Business_Owner_Name: ownerName_edit,
        Owner_Email: ownerEmail_edit,
        Business_Tagline: businessTagline_edit,
        Year_Of_Incorporation: yearOfIncorp_edit,
        About_Business: about_edit,
        Facebook_Profile: facebookProfile_edit,
        Instagram_Profile: instagramProfile_edit,
        Twitter_Profile: twitterProfile_edit
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
          Location_id: locationId,
          Store_Code: storeCode_edit,
          Address_1: address_edit,
          Phone_no: phone_edit,
          Website: website_edit
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

    edit_location_by_id(data, DjangoConfig)
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
      payment["" + i] = "Amex";
      i++;
    }
    if (p_android) {
      payment["" + i] = "Android";
      i++;
    }
    if (p_apple) {
      payment["" + i] = "Apple";
      i++;
    }
    if (p_cash) {
      payment["" + i] = "Cash";
      i++;
    }
    if (p_check) {
      payment["" + i] = "Check";
      i++;
    }
    if (p_crypto) {
      payment["" + i] = "Crypto";
      i++;
    }
    if (p_diners) {
      payment["" + i] = "Diners";
      i++;
    }
    if (p_discover) {
      payment["" + i] = "Discover";
      i++;
    }
    if (p_financing) {
      payment["" + i] = "Financing";
      i++;
    }
    if (p_invoices) {
      payment["" + i] = "Invoices";
      i++;
    }
    if (p_maestro) {
      payment["" + i] = "Maestro";
      i++;
    }
    if (p_paypal) {
      payment["" + i] = "Paypal";
      i++;
    }
    if (p_samsung) {
      payment["" + i] = "Samsung";
      i++;
    }
    if (p_traveler) {
      payment["" + i] = "Traveler";
      i++;
    }
    if (p_visa) {
      payment["" + i] = "Visa";
      i++;
    }

    const data = {
      Location_id: locationId,
      payment_method: payment
    };
    const data2 = {
      Location_id: locationId
    };
    console.log(data);

    this.setState({ paymentLoading: true });

    edit_location_payment_by_id(data, DjangoConfig)
      .then(resp => {
        console.log("paycheck",resp);
        this.setState({
          paymentEdit: false,
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
          p_visa: false
        });
        const data1 = {
          location_id: locationId
        };
        location_by_id(data1, DjangoConfig)
          .then(resp1 => {
            this.setState({
              payment: resp1.data.location.Df_location_payments,
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

      const data = {
        Location_id: locationId,
        open_houre: {
          0: {
            date: "",
            Day: "Monday",
            Type: "Regular",
            Open_status: this.state.monday,
            start_time_1: this.state.mondayStart1,
            end_time_1: this.state.mondayEnd1,
            start_time_2: this.state.mondayStart2,
            end_time_2: this.state.mondayEnd2
          },
          1: {
            date: "",
            Day: "Tuesday",
            Type: "Regular",
            Open_status: this.state.tuesday,
            start_time_1: this.state.tuesdayStart1,
            end_time_1: this.state.tuesdayEnd1,
            start_time_2: this.state.tuesdayStart2,
            end_time_2: this.state.tuesdayEnd2
          },
          2: {
            date: "",
            Day: "Wednesday",
            Type: "Regular",
            Open_status: this.state.wednesday,
            start_time_1: this.state.wednesdayStart1,
            end_time_1: this.state.wednesdayEnd1,
            start_time_2: this.state.wednesdayStart2,
            end_time_2: this.state.wednesdayEnd2
          },
          3: {
            date: "",
            Day: "Thursday",
            Type: "Regular",
            Open_status: this.state.thursday,
            start_time_1: this.state.thursdayStart1,
            end_time_1: this.state.thursdayEnd1,
            start_time_2: this.state.thursdayStart2,
            end_time_2: this.state.thursdayEnd2
          },
          4: {
            date: "",
            Day: "Friday",
            Type: "Regular",
            Open_status: this.state.friday,
            start_time_1: this.state.fridayStart1,
            end_time_1: this.state.fridayEnd1,
            start_time_2: this.state.fridayStart2,
            end_time_2: this.state.fridayEnd2
          },
          5: {
            date: "",
            Day: "Saturday",
            Type: "Regular",
            Open_status: this.state.saturday,
            start_time_1: this.state.saturdayStart1,
            end_time_1: this.state.saturdayEnd1,
            start_time_2: this.state.saturdayStart2,
            end_time_2: this.state.saturdayEnd2
          },
          6: {
            date: "",
            Day: "Sunday",
            Type: "Regular",
            Open_status: this.state.sunday,
            start_time_1: this.state.sundayStart1,
            end_time_1: this.state.sundayEnd1,
            start_time_2: this.state.sundayStart2,
            end_time_2: this.state.sundayEnd2
          }
        }
      };

      edit_location_operations_hours_by_id(data, DjangoConfig)
        .then(resp => {
          console.log(resp);
          this.setState({ hourEdit: false });
          // window.location.reload(false);

          const data1 = {
            location_id: locationId
          };

          location_by_id(data1, DjangoConfig)
            .then(resp1 => {
              this.setState({
                hours: resp1.data.location.Df_location_poen_hour,
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

  addSpecialHourButton = async event => {
    event.preventDefault();

    let isError = await this.specialHourError();

    if (!isError) {
      let i = 0;
      let i2 = this.state.LocationDetails.Df_location_poen_hour.length - 7;
      console.log("monday", this.state.monday_day_s, i);

      if (this.state.monday_day_s) {
        await this.setState(prevState => ({
          special_hour_data: {
            ...prevState.special_hour_data,
            [i]: {
              date: this.state.monday_day_s,
              Day: "Special",
              Type: `Special-${i2}`,
              Open_status: this.state.monday_s,
              start_time_1: this.state.mondayStart1_s,
              end_time_1: this.state.mondayEnd1_s,
              start_time_2: this.state.mondayStart2_s,
              end_time_2: this.state.mondayEnd2_s
            }
          }
        }));
        i++;
      }

      this.addSpecialHourToDb();
    }
  };

  addSpecialHourToDb = () => {
    // event.preventDefault();
    console.log("special");
    var locationId = this.props.match.params.locationId;

    const data = {
      Location_id: locationId,
      open_houre: this.state.special_hour_data
    };

    this.setState({ specialTimeLoading: true });

    edit_location_operations_hours_by_id(data, DjangoConfig)
      .then(resp => {
        console.log(resp);
        this.setState({ add_special_hour: false });

        const data1 = {
          location_id: locationId
        };

        location_by_id(data1, DjangoConfig)
          .then(resp1 => {
            this.setState({
              hours: resp1.data.location.Df_location_poen_hour,
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
    if (name == "Business_Logo") {
      this.setState({ logoLoading: true });
    }
    if (name == "Business_Cover_Image") {
      this.setState({ coverImageLoading: true });
    }
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      //   console.log(e.target.result);
      //   this.setState({ BusinessLogoUpdate: e.target.result });

      var locationId = this.props.match.params.locationId;

      const data = {
        location_id: locationId,
        [name]: e.target.result
      };

      update_images_by_location_id(data, DjangoConfig)
        .then(resp => {
          const data1 = {
            location_id: locationId
          };

          location_by_id(data1, DjangoConfig)
            .then(resp1 => {
              this.setState({
                LocationDetails: resp1.data.location,
                logoLoading: false,
                coverImageLoading: false
              });
            })
            .catch(resp1 => {
              console.log(resp1);
              alert("uploading image failed");
              this.setState({ logoLoading: false, coverImageLoading: false });
            });
        })
        .catch(resp => {
          console.log(resp);
          alert("uploading image failed");
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

      const data = {
        location_id: locationId,
        other_image: { 0: e.target.result }
      };

      this.setState({ otherImagesLoading: true });

      add_other_images_by_location_id(data, DjangoConfig)
        .then(resp => {
          const data1 = {
            location_id: locationId
          };
          location_by_id(data1, DjangoConfig)
            .then(resp1 => {
              this.setState({
                otherImages: resp1.data.location.Df_location_image,
                otherImagesLoading: false
              });
            })
            .catch(resp1 => {
              console.log(resp1);
              alert("uploading image failed");
              this.setState({ otherImagesLoading: false });
            });
        })
        .catch(resp => {
          console.log(resp);
          alert("uploading image failed");
          this.setState({ otherImagesLoading: false });
        });
    };
  };

  delete_other_image = image_id => {
    var locationId = this.props.match.params.locationId;
    const data = {
      image_id: image_id
    };
    console.log("image_id", image_id);
    this.setState({ otherImagesLoading: true });
    delete_other_images_by_location_id(data, DjangoConfig)
      .then(res => {
        const data1 = {
          location_id: locationId
        };
        location_by_id(data1, DjangoConfig)
          .then(resp1 => {
            this.setState({
              otherImages: resp1.data.location.Df_location_image,
              otherImagesLoading: false
            });
          })
          .catch(resp1 => {
            console.log(resp1);
            alert("deleting image failed");
            this.setState({ otherImagesLoading: false });
          });
      })
      .catch(res => {
        alert("deleting image failed");
        this.setState({ otherImagesLoading: false });
        console.log(res);
      });
  };

  _loadBusinessCategories = () => {
    this.setState({ loadBusinessCategories: true });

    business_categories(DjangoConfig)
      .then(res => {
        this.setState({
          businessCategories: res.data.BusinessCategory
        });
      })
      .catch(res => {
        console.log("error in loading business categories");
      });
  };

  render() {
    console.log(this.state);

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

    var RegularHours1;
    RegularHours1 = (
      <div className="vl_gap3">
        {this.state.hours.map(h =>
          h.Type == "Regular" ? (
            <div className="daybox " key={h.id}>
              <div className="daytype">{h.Day}</div>

              {h.Open_status == "SPLIT" ? (
                <div>
                  {h.start_time_1} - {h.end_time_1}
                  <br />
                  {h.start_time_2} - {h.end_time_2}
                </div>
              ) : (
                ""
              )}

              {h.Open_status == "OPEN" ? (
                <div>
                  From {h.start_time_1} to {h.end_time_1}
                </div>
              ) : (
                ""
              )}

              {h.Open_status == "OPEN 24x7" ? <div>OPEN 24x7</div> : ""}

              {h.Open_status == "CLOSED" ? <div>CLOSED</div> : ""}
            </div>
          ) : (
            ""
          )
        )}
      </div>
    );

    var RegularHours2;
    RegularHours2 = (
      <div className="vl_gap4">
        {this.state.hours.map(h =>
          h.Day == "Special" ? (
            <div className="daybox" key={h.id}>
              {/* <div className="daytype">{h.Day}</div> */}
              <div className="daytype">
                {h.date
                  .split("-")
                  .reverse()
                  .join("-")}
              </div>

              {h.Open_status == "SPLIT" ? (
                <div>
                  {h.start_time_1} - {h.end_time_1},{h.start_time_2} -{" "}
                  {h.end_time_2}
                </div>
              ) : (
                ""
              )}

              {h.Open_status == "OPEN" ? (
                <div>
                  From {h.start_time_1} to {h.end_time_1}
                </div>
              ) : (
                ""
              )}

              {h.Open_status == "OPEN 24x7" ? <div>OPEN 24x7</div> : ""}

              {h.Open_status == "CLOSED" ? <div>CLOSED</div> : ""}
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
        {p.Payment_Method == "Visa" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-visa.png")} alt="Visa" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.Payment_Method == "Maestro" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-maestro.png")} alt="Maestro" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.Payment_Method == "Amex" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-amex.png")} alt="Amex" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.Payment_Method == "Cash" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-cash.png")} alt="Cash" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.Payment_Method == "Check" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-check.png")} alt="Check" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.Payment_Method == "Crypto" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-crypto.png")} alt="Crypto" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.Payment_Method == "Diners" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-diners.png")} alt="Diners" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.Payment_Method == "Discover" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-discover.png")} alt="Discover" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.Payment_Method == "Apple" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-apple.png")} alt="Apple" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.Payment_Method == "Samsung" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-samsung.png")} alt="Samsung" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.Payment_Method == "Paypal" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-paypal.png")} alt="Paypal" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.Payment_Method == "Android" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-android.png")} alt="Android" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.Payment_Method == "Invoices" ? (
          <div className='payment_box'>
            <label className='payment_label' >
          <img src={require("../images/p-invoices.png")} alt="Invoices" />
          </label>
          </div>
        ) : (
          ""
        )}
        {p.Payment_Method == "Traveler" ? (
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
        {p.Payment_Method == "Financing" ? (
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
        <div className="setting-10">
            <h3>Business Information</h3>
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
                              ) : LocationDetails.Business_Logo ? (
                                <div className="uploadphoto pt-15">
                                  <img
                                    src={
                                      "https://dashify.biz" +
                                      LocationDetails.Business_Logo
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
                                      name="Business_Logo"
                                      onChange={this.onUploadLogo(
                                        "Business_Logo"
                                      )}
                                    />
                                  </div>
                                  {/* <div>
                                  Update
                                  <input
                                    type="file"
                                    name="Business_Logo"
                                    onChange={this.onUploadLogo(
                                      "Business_Logo"
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
                                      name="Business_Logo"
                                      onChange={this.onUploadLogo(
                                        "Business_Logo"
                                      )}
                                    />
                                  </div>
                                  {/* <div>
                                  <i className="zmdi zmdi-cloud-upload"></i>
                                  <h3>Upload logo</h3>
                                  <input
                                    type="file"
                                    name="Business_Logo"
                                    onChange={this.onUploadLogo(
                                      "Business_Logo"
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
                                          type="url"
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
                                  LocationDetails.Business_Logo
                                    ? "https://dashify.biz" +
                                      LocationDetails.Business_Logo
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
                                          (this.state.city,
                                          this.state.state,
                                          this.state.postalCode)
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

                                      <MDBRow className="uploadauthor">
                                        <MDBCol md="6">
                                          <div className="author_namebox">
                                            Website :
                                          </div>
                                        </MDBCol>

                                        <MDBCol md="6">
                                          <input
                                            name="website_edit"
                                            type="url"
                                            onChange={this.changeHandler}
                                            className="vl_edit_input"
                                            value={this.state.website_edit}
                                          />
                                        </MDBCol>
                                      </MDBRow>

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
                                  {applyAll && !applyAllError ? (
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

                          {RegularHours1}

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

                              {RegularHours2}
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

                    <MDBCol md="2">
                      <button
                        className="pay_last_btn"
                        onClick={this.editPaymentButton}
                      >
                        {this.state.paymentEdit ? "Cancel" : "Edit"}
                      </button>
                    </MDBCol>
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
                        
                        <MDBRow>
                          <MDBCol className="offset-md-10">
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
                        ) : LocationDetails.Business_Cover_Image ? (
                          <div className="coverimgupload">
                            <img
                              src={
                                "https://dashify.biz" +
                                LocationDetails.Business_Cover_Image
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
                                name="Business_Cover_Image"
                                onChange={this.onUploadLogo(
                                  "Business_Cover_Image"
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
                                name="Business_Cover_Image"
                                onChange={this.onUploadLogo(
                                  "Business_Cover_Image"
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
                                <img
                                  src={
                                    "https://dashify.biz" +
                                    this.state.otherImages[i].Image
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
                                            "https://dashify.biz" +
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
              <h4 className='connect_msg'>Connect Location first</h4>
            </div>
        )}
      </div>
    );
  }
}
