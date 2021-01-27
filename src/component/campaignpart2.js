import React, { Component } from "react";
import Loader from "react-loader-spinner";

import swal from "sweetalert";
import { Add_Campaign } from "./apis/review";
import {secure_pin} from "../config"
import { MDBCol, MDBRow } from "mdbreact";


export default class CampaignPart2 extends Component {
  state = {
    email_sendto_error: {},
    contact_sendto_error: {},
    fname_sendto_error: {},
    sendto_fname: { 0: "" },
    sendto_lname: { 0: "" },
    sendto_email: { 0: "" },
    sendto_contact: { 0: "" },
    add_customer: 1,
    wrong: "",
    loading: false,
    CustomerLoop:[1],

    FinalCustomers:[{}],
    isCsv:false,
    CsvFile:''
  };

  componentDidMount = () => {
    //console.log("promotional data", this.props.location.state);

  

  };

  submitHandler = event => {
    event.preventDefault();
    var { isEmail, isSms, FinalEmailSocial,FinalSmsSocial,ReplyTo,
      EmailSubject,
      email_heading,
      email_content,
      sms_content}= this.props;
    const data = {
      secure_pin,"user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId"),


      "campaign_type_email":isEmail?"email":"",
      "campaign_type_sms":isSms?"sms":"",
      "sender_email":"",
      "reply_email":ReplyTo,
      "subject":EmailSubject,
      "heading":email_heading,
      "email_content":email_content,
      "sms_content":sms_content,
      "recipient_array":this.state.FinalCustomers,

        "email_social_array":FinalEmailSocial,
        "sms_social_array":FinalSmsSocial,

        "import_csv":this.state.isCsv,
        "csv_file":this.state.CsvFile
    
    };
    console.log(data)
    Add_Campaign(data).then(resp => {
      console.log(resp)
     
    })
    .catch(resp => {
      
    })

  }

  add_customer_function = event => {
    event.preventDefault();
    console.log("add customer button clicked");
    this.setState({FinalCustomers:this.state.FinalCustomers.concat({})})


   
  };

  removeCustomer =(i)=>e=>{
    console.log(i);
    var a= this.state.FinalCustomers;
    delete a[i]
    this.setState({FinalCustomers:a})

  }

  AddCustomer =(index,type)=>e=>{
    console.log(index, e.target.value);

    var old = this.state.FinalCustomers;
    var newd={}
    if(type === "first"){

      var middle={
        "fname":e.target.value
     
    }
    console.log(newd)

    Object.assign(newd, old[index], middle);
    console.log(newd)
    old[index]=newd;
    console.log("old",old)

   
   

  }
  else if(type === "last"){

    var middle={
      "lname":e.target.value
   
  }
  console.log(newd)

  Object.assign(newd, old[index], middle);
  console.log(newd)
  old[index]=newd;
  console.log("old",old)

  }

  else if (type=== "email"){

    var middle={
      "email":e.target.value
   
  }
  console.log(newd)

  Object.assign(newd, old[index], middle);
  console.log(newd)
  old[index]=newd;
  console.log("old",old)

  }
  else if (type=== "phone"){

    var middle={
      "phone":e.target.value
   
  }
  console.log(newd)

  Object.assign(newd, old[index], middle);
  console.log(newd)
  old[index]=newd;
  console.log("old",old)

  }
  


  this.setState({FinalCustomers:old})
   
   

   

  }
  
  onUploadCsv=event=>{
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      this.setState({ CsvFile: e.target.result, isCsv:true });

      console.log(e.target.result)
    };
  }
  

  render() {
    console.log(this.state)
    console.log("props",this.props);
    const {
      campaign_name,
      email_sendto_error,
      contact_sendto_error,
      fname_sendto_error,
      sendto_fname,
      sendto_lname,
      sendto_email,
      add_customer,
      wrong,
      loading,
      CustomerLoop,
      FinalCustomers,
     
    } = this.state;
    var { isEmail,
      isSms}= this.props


    var l;
    l=FinalCustomers.map( (r,index)=>{
     

      return  <div style={{background:'#fff' , marginBottom:'20px'}}>
        <div className="formbox"> 
       <button onClick={this.removeCustomer(index)} className='campaignClose'> x</button>
                    <div className="row">
                   
                        <div className="col-md-12 camp_margin1">
                          <div >
                          <div className='camp_subhead1'>Customer First Name</div>
                          <input
                            type="text"
                            className="form-control"
                           placeholder="Enter first name"
                            onChange={this.AddCustomer(index,"first")}
                          />
                          </div>
                          {!r.fname ? <div className='err_msg '>First name required</div>:""}
                        </div>
                        <div className="col-md-6 camp_margin2">
                          <div >
                          <div className='camp_subhead1'>Customer Last Name</div>
                          <input
                            type="text"
                            className="form-control"
                            
                            onChange={this.AddCustomer(index,"last")}
                          />
                          </div>
                        </div>
                    
                       {isEmail? <div className="col-md-6 camp_margin2">
                          <div>
                          <div className='camp_subhead1'>Customer Email </div>
                          <input
                            type="text"
                            className="form-control"
                           
                            onChange={this.AddCustomer(index,"email")}
                          />
                          </div>
                          {!r.email ? <div className='err_msg '>Email required</div>:""}
                        </div>
                        :""}
                        {isSms ?<div className="col-md-6 camp_margin2">
                          <div>
                          <div className='camp_subhead1'> Phone Number</div>
                          <input
                            type="text"
                            className="form-control"
                           
                            onChange={this.AddCustomer(index,"phone")}
                          />
                          </div>
                          {!r.phone ? <div className='err_msg '>Mobile number required</div>:""}
                        </div>
                        :""}
                      
                    </div>
                  </div>
</div>
})

    return (
      <div>
        <div className="main_content">
          <form
            className="needs-validation"
            onSubmit={this.submitHandler}
            noValidate
          >
            <div className="rightside_title">
              <h1>Enter Campaign Details</h1>
            </div>
            <div className="row" >
              <div className="col-md-8">
                <div className="step2"  style={{borderRadius:'15px 15px 0px 0px',boxShadow:'none'}}>
                  <ul>
                    <li>
                      <div className="step-sms">
                        <a href="#">Step 02</a>
                        <span>Rating Email And SMS Template</span>
                      </div>
                      <div className="closebox" onClick ={this.props.step_2_1}>
                        <i className="zmdi zmdi-close"></i> Close Section
                      </div>
                    </li>
                  </ul>
                  </div>
                  <div>
                  <div > 
{l}
<div className='add_another_back'>
<div className="col-md-5 offset-md-7 " style={{marginTop:'30px',paddingRight:'0px',paddingLeft:'47px'}}>
                          <button onClick={this.add_customer_function} className="add_button">
                            Add Another Customer
                          </button>
                      </div>
</div>

</div>
  </div>
<MDBRow style={{marginTop:'10px'}}>
<MDBCol className='offset-md-6'>
<button className="gen_btn" >
                          Create New Review Generation Campaign
                        </button>
</MDBCol>
</MDBRow>
<MDBRow style={{marginTop:'10px'}}>
  <MDBCol className='offset-md-8'>
  {loading ? (
                          <Loader
                            type="Oval"
                            color="#00BFFF"
                            height={25}
                            width={25}
                            // timeout={3000} //3 secs
                          />
                        ) : (
                          <div class='err_msg'>{wrong}</div>
                        )}
                        <button type="submit" className="lunch_btn">
                          Launch Campaign
                        </button>
  </MDBCol>

</MDBRow>
                   
                  
                  
              </div>
              <div className="col-md-4">
                <div className="step2 ">
                  <div className="formbox">
                    <div className="design-ui">
                        Upload Your CSV containing Customer Email / Phone
                        Numbers
                      <div className="camp_csv">
                        <img src={require("./assets/csv.png")} alt="csv" />
                      </div>
                      <div className="uploadbox">
                      <button className="download_btn" href="/csv/emailsms.csv" target="_blank" rel="noopener noreferrer" download>
                          Download Simple
                     
                        </button>
                      </div>
                      <div className="uploadbox">
                          <button className="upload_btn">Upload CSV</button>
                          <input type="file" onChange={this.onUploadCsv} />
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
