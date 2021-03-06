import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";

import swal from "sweetalert";
import {secure_pin} from "../config"
import { Add_Invite_User, Edit_Invite, Update_Invite } from "./apis/invite";
import { all_location } from "./apis/location";
import SelectSearch from "react-select-search";
// import { Add_Invite_User } from "./apis/invite";
import { MDBBtn, MDBCol, MDBRow } from "mdbreact";
import {
  email_regex,
  url_regex,
  phone_regex,
  zipcode_regex
} from "./utils/regularexpressions";
class InviteNewUser extends Component {
  state = {
   
    log: false,
    loading: false,
    locationArray:[],
    firstName:"",
    lastName:'',
    userEmail:'',
    userType:'internal',
    userRole:'',
    locationArray:[],
    update:false,
    showSelect:true,
    isSuc:false
  };

  
  onSubmit = e => {
    
    try{
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

      if(this.state.firstName==''){
        this.setState({
          first_name_err:'First name can not be empty'
        })
      }
      else{
        this.setState({
          first_name_err:''
        })

      }
      // if(this.state.lastName==''){
      //   this.setState({
      //     last_name_err:'Last name can not be empty'
      //   })
      // }
      if(this.state.userEmail==''){
        this.setState({
          email_err:'Email can not be empty'
        })
      }
      else{
        if(!email_regex(this.state.userEmail)){
          this.setState({
            email_err:'Email is Not Valid'
          })
        }
        else{
          this.setState({
            email_err:''
          })
  
        }

      }

console.log("invite ",data)
    
      if(this.state.userEmail && this.state.firstName && this.state.userRole && email_regex(this.state.userEmail))
      Add_Invite_User(data)
      .then(resp => {
        console.log(resp);
        this.setState({isSuc:true})
        //this.setState({ isUrl: true, loading: false });
      })
      .catch(resp => {
        console.log(resp);
       
      });
   
   
    }catch(e){} };

  componentDidMount(){
    try{
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
  
  }catch(e){}}


  Update=e=>{
    try{

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
        this.setState({isSuc:true})
       
      }
    )
    .catch(res=>{

    })

  
    if(this.state.firstName==''){
      this.setState({
        first_name_err:'First name can not be empty'
      })
    }
    if(this.state.lastName==''){
      this.setState({
        last_name_err:'Last name can not be empty'
      })
    }
    if(this.state.userEmail==''){
      this.setState({
        email_err:'Email can not be empty'
      })
    }

  }catch(e){}}

  removeLocation=(id)=>e=>{
console.log("id",id)
this.setState({ locationArray: this.state.locationArray.filter(item=>item.location_id !== id) })
console.log("id2",this.state.locationArray)
  }

  render() {
    if (this.state.isSuc) {
      return (
        <Redirect
        to={
          "/setting-main/setting-people/"
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

    if(locationArray && this.state.AllLocations){
      LocationArrayPrint= locationArray.map(m=>{

        var h=this.state.AllLocations.filter(item=>item.id === m.location_id);
        console.log("con",h[0])
        return (<div key={h[0].id} > 
       <MDBRow>
         <MDBCol>
         <MDBRow style={{marginTop:'7px',marginBottom:'7px'}}>
          <MDBCol md='1' >
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          </MDBCol>
          <MDBCol md='9' className="invite_drop">
          {h[0].location_name} 
          </MDBCol>
          <MDBCol md='1' >
          <button className='invite_cross' onClick={this.removeLocation(h[0].id)}>x</button>
          </MDBCol>
        </MDBRow>
         </MDBCol>
       </MDBRow>
          </div>)
      })
    }

    
    return (
      <div>
       <div className="profile_container" style={{color:'#4f4f4f',marginTop:'60px'}}>
        
         
            <fieldset className="login_fieldset">
            <MDBRow>
          <MDBCol md='11'  className='form-group invite_head'>
          Login
          </MDBCol>
          <MDBCol md='1'>
          <Link to="/setting-main/setting-people/" style={{paddingLeft:'52px',textDecoration:'none'}}>x</Link>
          </MDBCol>
        </MDBRow>

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
  <MDBRow>
          <MDBCol md='4' className='form-group invite_subHead'>
            <div>First Name <span className="red">*</span></div>
            <input
                  type="text"
                  value={this.state.firstName}
                  placeholder="Enter FirstName"
                  className="form-control"
                  onChange={e => this.setState({ firstName: e.target.value })}
                />
                <div class='err_msg'>{this.state.first_name_err}</div>
          </MDBCol>

          <MDBCol md='4' className='form-group invite_subHead'>
            <div>Last Name</div>
            <input
                  type="text"
                  value={this.state.lastName}
                 name="lastName"
                 placeholder="Enter LastName"
                 className="form-control"
                  onChange={e => this.setState({ lastName: e.target.value })}
                />
                <div class='err_msg'>{this.state.last_name_err}</div>
          </MDBCol>

          <MDBCol md='4' className='form-group invite_subHead'>
            <div>User Email <span className="red">*</span></div>
            <input
                  type="email"
                  value={this.state.userEmail}
                  name="userEmail"
                  placeholder="Enter Email"
                  className="form-control"
                  onChange={e => this.setState({ userEmail: e.target.value })}
                />
                <div class='err_msg'>{this.state.email_err}</div>
          </MDBCol>
        </MDBRow>
       
             
            
<MDBRow>
          <MDBCol md='2' className='form-group invite_subHead'>
          Internal User
          </MDBCol>
          <MDBCol md='2' className='form-group invite_subHead'>
            {this.state.userType=='internal'?
          <input
          checked
                  type="radio"
                  name="userType"
                  onChange={e => this.setState({ userType: "internal" })}
                />:<input
                        type="radio"
                        name="userType"
                        onChange={e => this.setState({ userType: "internal" })}
                      />}
          </MDBCol>
          <MDBCol md='2' className='form-group invite_subHead'>
          Agency's Client
          </MDBCol>
          <MDBCol md='2' className='form-group invite_subHead'>
        {this.state.userType=='agency' ?
          <input
          checked
                  type="radio"
                  name="userType"
                  onChange={e => this.setState({ userType: "agency" })}
                />:  <input
                        type="radio"
                        name="userType"
                        onChange={e => this.setState({ userType: "agency" })}
                      />}
          </MDBCol>
        </MDBRow>
<MDBRow style={{marginTop:'20px'}}>
  <MDBCol md='4' className='form-group invite_subHead'>
  Select User Role Below <span className="red">*</span>
  <div>
  <select  value={this.state.userRole}
                //   type="password"
                //   name="userEmail"
                className="review_select_btn"
                  onChange={e => this.setState({ userRole: e.target.value  })}
                  onClick={() => this.setState({showSelect:false})}
                >
                  {this.state.showSelect? <option  >
                  Select
               </option>:null}
                    

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
              </div></MDBCol>
              
<MDBCol md='4'>
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

<p className="scrollbar" style={{height:'150px',width:'100%',background:'none'}}>
  {LocationArrayPrint}
</p>
</MDBCol>

              </MDBRow>




              <p>
               
              {this.state.update ? <button className="last_btn" onClick={this.Update}>Update User</button>:
               <button className="last_btn" onClick={this.onSubmit} >Invite User</button>}
              </p>


              
            </fieldset>
        
        </div>
     
      </div>
    );
  }
}

export default InviteNewUser;
