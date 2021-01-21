import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";

import swal from "sweetalert";
import {secure_pin} from "../config"
import { Add_Invite_User, Edit_Invite, Update_Invite } from "./apis/invite";
import { all_location } from "./apis/location";
import SelectSearch from "react-select-search";

class InviteNewUser extends Component {
  state = {
   
    log: false,
   
    
    loading: false,
    locationArray:[],
    firstName:"",
    lastName:'',
    userEmail:'',
    userType:'',
    userRole:'',
    locationArray:[],
    update:false
  };

  
  onSubmit = e => {
    e.preventDefault();

  
      const data = {
        secure_pin,
        "user_id":localStorage.getItem("UserId"),
        "first_name":this.state.firstName,
        "last_name":this.state.lastName,
        "email_id":this.state.userEmail,
        "internal_agency_user":this.state.userType,
        "role":this.state.userRole,
        "location_array":this.state.locationArray,
        "import_csv":false,"csv_file":"base64"
       
      
      };



console.log("invite ",data)
    

      Add_Invite_User(data)
      .then(resp => {
        console.log(resp);
        //this.setState({ isUrl: true, loading: false });
      })
      .catch(resp => {
        console.log(resp);
       
      });
   
   
  };

  componentDidMount(){
    const data = {
      user_id: localStorage.getItem("UserId"),
    
      secure_pin
    };


  
    all_location(data)
      .then(async res => {
        console.log(res);
        console.log("963",res.data.all_location);

       await this.setState({ AllLocations: res.data.all_location });
      })
      .catch(res => {
        console.log("error in LocationManager");
      });

      if(this.props.match.params.id){
        this.setState({update:true})

      var id = this.props.match.params.id;
      console.log("rahul");
      console.log(this.props);
  
      const data2 ={
        secure_pin,
        "user_id":id
      }
  
  
      Edit_Invite(data2).then(
        res=>{
          console.log("up ",res);
          this.setState({
            firstName:res.data.user_data[0].first_name,
    lastName:res.data.user_data[0].last_name,
    userEmail:res.data.user_data[0].email_id,
    userType:res.data.user_data[0].internal_agency,
    userRole:res.data.user_data[0].role,
    locationArray:res.data.user_data[0].location_data,
          })
  
        }
      )
      .catch(res=>{
  
      })

    }
  
  }


  Update=e=>{

    var id = this.props.match.params.id;
   
    console.log(this.props);

    const data ={
      secure_pin,
      "user_id":localStorage.getItem("UserId"),
      "customer_id":id,
      "first_name":this.state.firstName,
      "last_name":this.state.lastName,
      "email_id":this.state.userEmail,
      "internal_agency_user":this.state.userType,
      "role":this.state.userRole,
      "location_array":this.state.locationArray,
      "import_csv":false,"csv_file":"base64"
    }


    Update_Invite(data).then(
      res=>{
        console.log("upd ",res);
       
      }
    )
    .catch(res=>{

    })

  


  }

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

    var locations = [];
    var {locationArray} =this.state;
    if (this.state.AllLocations) {
      this.state.AllLocations.map(loc => {
       
        locations.push({ name: loc.location_name, value: loc.id.toString() });
      });
    }

    console.log(this.state)
    var LocationArrayPrint;

    if(locationArray){
      LocationArrayPrint= locationArray.map(m=>{

        var h=this.state.AllLocations.filter(item=>item.id === m.location_id);
        console.log("con",h[0])
        return (<div key={h[0].id} >{h[0].location_name}</div>)
      })
    }

    return (
      <div>
        

        <div className="login_form">
          <form onSubmit={this.onSubmit}>
            <fieldset className="login_fieldset">
              <legend>Login</legend>

              {this.state.loading ? (
                <Loader
                  type="Oval"
                  color="#00BFFF"
                  height={25}
                  width={25}
                  // timeout={3000} //3 secs
                />
              ) : (
                <div class='err_msg'>{this.state.wrong}</div>
              )}

              <Link to="/setting-main/setting-people/">x</Link>
              <p>
                <label htmlFor="url">First Name</label>
                <input
                  type="text"
                
                  value={this.state.firstName}
                  placeholder="teamdigimonk"
                  onChange={e => this.setState({ firstName: e.target.value })}
                />
                <div class='err_msg'>{this.state.url_error}</div>
              </p>

              <p>
                <label htmlFor="username">Last Name</label>
                <input
                  type="text"
                 name="lastName"
                 value={this.state.lastName}
                  onChange={e => this.setState({ lastName: e.target.value })}
                />
                <div class='err_msg'>{this.state.username_error}</div>
              </p>
              <p>
                <label htmlFor="password">User Email</label>
                <input
                  type="email"
                  name="userEmail"
                  value={this.state.userEmail}
                  onChange={e => this.setState({ userEmail: e.target.value })}
                />
                <div class='err_msg'>{this.state.password_error}</div>
              </p>

              <p>
              <input
                  type="radio"
                  name="userType"
                  onChange={e => this.setState({ userType: "internal" })}
                />
                <label htmlFor="password">Internal User</label>
                <input
                  type="radio"
                  name="userType"
                  onChange={e => this.setState({ userType: "agency" })}
                />
                <label htmlFor="password">Agency's Client</label>
                
                {/* <div class='err_msg'>{this.state.password_error}</div> */}
              </p>

              <p>
                <label htmlFor="password">Select User Role Below</label>
                <select
                //   type="password"
                //   name="userEmail"
                  onChange={e => this.setState({ userRole: e.target.value })}
                >
                     <option >
                   Select
                </option>

                <option value="clientWrite">
                    Client (Write)
                </option>
                
                <option  value="admin" >
                    Admin
                </option>
                
                <option value="manager">
                  Manager
                </option>
                
                <option value="clientRead">
                    Client (Read only)
                </option>
                    </select>
                {/* <div class='err_msg'>{this.state.password_error}</div> */}
              </p>

              <SelectSearch
               options={locations} 
                search={true}
                 value={locations.value}
                  className="searcdd" 
                  name="language"
 onChange={e =>{
  console.log(e)
  this.setState({ locationArray: this.state.locationArray.concat({"location_id":e}) })
}
} 
placeholder={ "Search"}  />

<p>
  {LocationArrayPrint}
</p>


              <p>
               
              {this.state.update ? <button onClick={this.Update}>Update User</button>: <button type="submit">Invite User</button>}
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default InviteNewUser;
