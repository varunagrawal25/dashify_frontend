import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import ProfileSettingSidebar from "./setting-sidebar";
import { Link } from "react-router-dom";
import { Get_All_Invites_By_User, Delete_Invite, Disable_Invite } from "./apis/invite";
// import Datatable from './Datatable'
import { secure_pin } from "../config";
import Datatable from './Datatable'
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
export default class Profile_setting extends Component {

  state={
    AllPeople:[]
  }

  componentDidMount(){
try{
    this.setState({role:this.props.role})

    const data ={
      secure_pin,"user_id":localStorage.getItem("UserId") 
    }
    Get_All_Invites_By_User(data).then(res=>{
      console.log(res)
      this.setState({AllPeople:res.data.invite_user_list})

    }).catch(res=>{

    })
  }catch(e){}}

  editButton (id){
    try{
    console.log(id)
    this.props.history.push({
      pathname: `/setting-main/setting-people/user/edit/${id}`
    })
   
  }catch(e){} }

  deleteButton (id){
    try{
    console.log("dele",id)
    const data ={
      secure_pin,
      "customer_id":id}

    Delete_Invite(data).then(res=>{
      console.log(res)
      const data ={
        secure_pin,"user_id":localStorage.getItem("UserId") 
      }
      Get_All_Invites_By_User(data).then(res=>{
        console.log(res)
        this.setState({AllPeople:res.data.invite_user_list})
  
      }).catch(res=>{
  
      })
    }).catch(res=>{
      console.log(res)
    })
    
   
  }catch(e){} }
  disableButton (id,active){
    try{
    console.log("dis",id,active)
    const data ={
      secure_pin,
      "customer_id":id,"status":active
    }
    Disable_Invite(data).then(res=>{
      console.log(res)
      const data ={
        secure_pin,"user_id":localStorage.getItem("UserId") 
      }
      Get_All_Invites_By_User(data).then(res=>{
        console.log(res)
        this.setState({AllPeople:res.data.invite_user_list})
  
      }).catch(res=>{
  
      })
    }).catch(res=>{
      console.log(res)
    })
    
  }catch(e){} }

  

  // a and b are javascript Date objects
  dateDiffInDays(a, b) 
  {
    try{
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }catch(e){}
  }

  
  componentDidUpdate(){
    try{
    if(this.state.role !== this.props.role)
    this.setState({role:this.props.role});
  }catch(e){}
  }
 
  render() {
    var { AllPeople } =this.state;
var AllPeop=[];

    if(AllPeople){

   AllPeople.map( a=>
{ 
  var  ab = new Date(a.cdate);
   var  b = new window.Date();
   var  difference =  this.dateDiffInDays(ab, b);

    console.log(ab,b,this.dateDiffInDays(ab, b));
 

  var active;
   
     if (a.admin_status === "0"){
     
    console.log(difference);
    if(difference <3)
    active= "Not Active"
    else
    active= "Invite expired"
     }
    else if (a.admin_status === "1")
    active= "Active"


    AllPeop.push(  
      {
        // img:'',
        name: <div> {a.profile_image?<img src={a.profile_image}/>:<AccountCircleIcon fontSize="large" style={{marginTop:'9px'}}/>}  {a.first_name}</div> ,
        email:a.email_id,
        role:a.role,
        status:active,
        action:<div> 
                        <a  className="rightdah  dropleft" data-toggle="dropdown"><MoreVertIcon/></a>
                     
                     <div class="dropdown-menu drop_contant0">
                     <div className='drop_contant1'>
                     <a onClick={ ()=>this.editButton(a.id)}>
                        {/* <i className="fa fa-edit"></i>  */}
                        Edit
                     </a>
                     </div>
                     <div className='drop_contant1' >
                      <a onClick={ ()=>this.deleteButton(a.id)}>
                      {/* <i className="fa fa-trash"></i>  */}
                       Delete
                      </a>
                    </div>
                    {a.admin_status === "1" ?
                    <div className='drop_contant1'>  
            <a onClick={ ()=>this.disableButton(a.id, "disable")}>
            Disable
            </a>
             </div>
             :null}
                      {a.admin_status === "0" || a.status === "expire" ?
                    <div className='drop_contant1'>  
           <a onClick={ ()=>this.disableButton(a.id, "active")}>
             Enable
            </a>
             </div>
             :null}
                </div>
          
         
          {/* <button onClick={ ()=>this.editButton(a.id)} >Edit</button> / <button  onClick={ ()=>this.deleteButton(a.id)}>Delete</button> 
          / {a.admin_status === "1" ?<button onClick={ ()=>this.disableButton(a.id, "disable")} >Disable</button>:""} 
          {a.admin_status === "0"  || a.status === "expire" ?<button onClick={ ()=>this.disableButton(a.id, "active")} >Enable</button>:""}  */}
          </div>
      }
      
   )}
   )
    }



    return (
      <div>
        <MDBContainer>
          <div className="setting-10">
            <h3>Profile Setting</h3>
          </div>
          <MDBRow>
            <MDBCol md="3">
              <ProfileSettingSidebar role={this.state.role} />

              <MDBRow className="mt-3" style={{padding:'12px'}}>
                <MDBCol
                  className="profile_container"
                  style={{ textAlign: "center" ,paddingLeft:'0px',paddingRight:'0px' }}
                >
                  <div className="exclamation">!</div>
                  <div className="profile1">People</div>
                  <div className="profile2">
                    Learn more about managing users
                  </div>
                  <div>
                    <MDBBtn id="profile_here_btn">Here</MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCol>

            <MDBCol md="9">
              <MDBRow className="align-items-center mb-3">
                <MDBCol className="profile1" md="4">
                  People
                </MDBCol>
                <MDBCol md="4">
                 <Link to="/setting-main/setting-people/invite-new-user"> <MDBBtn id="profile_new_btn">+ Invite New User</MDBBtn>
                 </Link>
                </MDBCol>
                <MDBCol md="4">
                <Link to="/setting-main/setting-people/bulk-user"> <MDBBtn id="profile_add_btn">Add Using CSV</MDBBtn>
                </Link>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol>
                  <div className="profile_container">
                    <Datatable  AllPeople= {AllPeop} />
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
