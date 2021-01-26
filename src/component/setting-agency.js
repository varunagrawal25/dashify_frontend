import React, { Component } from "react";
import { NavLink ,Switch,Route} from "react-router-dom";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import ProfileSettingSidebar from "./setting-sidebar";
import swal from "sweetalert";
import AgencyScanTool from "./agencyScanTool";
import AgencyDashboard from "./agencyDashboard";

export default class SettingAgency extends Component {
  state={
    type:"dashboard"
  }
  componentDidMount ()  {

    this.setState({role:this.props.role})
  }
  componentDidUpdate(){
    if(this.state.role !== this.props.role)
    this.setState({role:this.props.role});
  }
    render() {
        return (
          <>
          {/* <div className="left-side-menu"></div>
          <div className="content-page"> */}
           <MDBContainer>
            <div className="setting-10">
              <h3> Profile Setting</h3>
            </div>
  
            <MDBRow>
              <MDBCol md="3">
                <ProfileSettingSidebar role={this.state.role}/>
              </MDBCol>
              <div className="col-md-9  ">
                
                <div className="breadcrumb-menu" style={{margin:'0px -15px'}}>
                <ul class="nav nav-tabs nav-justified">
    <li className="underline-from-left" ><a data-toggle="tab" className='active' href="#dashboard" onClick={ () => {this.setState({type:"dashboard"})}}>  Dashboard</a></li>
    <li className="underline-from-left" style={{marginLeft:'55px'}}><a data-toggle="tab" href="#scan_tool"  onClick={ () => {this.setState({type:"scan_tool"})}}>Scan Tool</a></li>
  </ul>
  <div  id="dashboard" className="active">
    {this.state.type=="dashboard" ?  <AgencyDashboard/> : null}
  </div>
  <div id="scan_tool" >
    {this.state.type="scan_tool"?
  <AgencyScanTool/>:null}
  </div>

                </div>

            
             </div>
          
           </MDBRow>
          
          </MDBContainer>
          {/* </div> */}
        </>
   
       
       )
    }
}
