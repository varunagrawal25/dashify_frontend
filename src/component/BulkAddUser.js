import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";

import { add_social_account } from "./apis/social_platforms";
import swal from "sweetalert";
import {secure_pin} from "../config"
import { Add_Invite_User } from "./apis/invite";
import { MDBCol, MDBRow } from "mdbreact";

class BulkAddUser extends Component {
  state = {
   
    log: false,
    isUrl: false,
   CsvFile:'',
    loading: false
  };

  onUploadCsv=event=>{
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = async e => {
     await this.setState({ CsvFile: e.target.result, isCsv:true });

      console.log(e.target.result)
    };
  }

  onSubmit = async event => {
    event.preventDefault();
 
  
      const data = {
        secure_pin,
        "user_id":localStorage.getItem("UserId"),
        "first_name":"",
        "last_name":'',
        "email_id":'',
        "internal_agency_user":'',
        "role":'',
        "location_array":[],
        "import_csv":true,
        "csv_file":this.state.CsvFile
       
      
      };



console.log("instadata",data)
    

      Add_Invite_User(data)
      .then(resp => {
        console.log(resp);
        //this.setState({ isUrl: true, loading: false });
      })
      .catch(resp => {
        console.log(resp);
       
      });
   
   
  };

  render() {
    if (this.state.isUrl) {
      return (
        <Redirect
        to={
          "/locations/" +
          localStorage.getItem("locationId") +
          "/view-listing"
        }
      />
      );
    }

    console.log(this.state)

    return (
      <div>
        

        <div className="bulk_add_form">
        <div style={{fontWeight:'500',fontSize:'18px'}}>Add Multiple User</div>
<div  className='bulk_add_contant1'>
  
Follow the steps below to perform a bulk
upload of users to your dashboard:
</div>

<ol  className='bulk_add_ol'>
  <li><a  style={{color:'blue'}}>Download our help manual</a> and <a style={{color:'blue'}}>Download the CSV template</a></li>
  <li>Add user details as per the guideline provided</li>
  <li>Upload the CSV file to proceed</li>
</ol>


<div style={{border: "1px solid blueviolet",padding: '20px 40px'}}>
  <MDBRow>
    <MDBCol md='10' className='bulk_upload_csv'>Upload CSV File</MDBCol>
    <MDBCol md='2'>
    <button id='bulk_csv_file'> 
    <img src={require("./assets/csv.png")} alt="csv" />
  <input type="file"  onChange={this.onUploadCsv} id='bulk_input'  />
  </button>
    </MDBCol>
  </MDBRow>
</div>

<div>
  
<button onClick={this.onSubmit}  className='gen_btn' style={{marginTop:'35px', width:'30%'}}>Continue</button>
</div>

        </div>
      </div>
    );
  }
}

export default BulkAddUser;
