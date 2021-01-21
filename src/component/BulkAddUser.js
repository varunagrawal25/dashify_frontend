import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";

import { add_social_account } from "./apis/social_platforms";
import swal from "sweetalert";
import {secure_pin} from "../config"
import { Add_Invite_User } from "./apis/invite";

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
        

        <div className="login_form">
        Add Multiple User

Follow the steps below to perform a bulk
upload of users to your dashboard:

1.

  
Download our help manual
  and  

Download the CSV template
2. Add user details as per the guideline provided

3. Upload the CSV file to proceed

<input type="file"  onChange={this.onUploadCsv}/>

<button onClick={this.onSubmit}
> Submit</button>
        </div>
      </div>
    );
  }
}

export default BulkAddUser;
