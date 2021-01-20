import React, { Component } from "react";
import { NavLink ,Switch,Route} from "react-router-dom";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import ProfileSettingSidebar from "./setting-sidebar";
import swal from "sweetalert";
import agenctDashboard from "./agencyDashboard";
import agencyScanTool from "./agencyScanTool";
import agencyDashboard from "./agencyDashboard";

export default class SettingAgency extends Component {
    render() {
        return (
            <div>
         <MDBContainer>
          <div className="setting-10">
            <h3> Profile Setting</h3>
          </div>

          <MDBRow>
            <MDBCol md="3">
              <ProfileSettingSidebar />
            </MDBCol>
            <div className="col-md-9  ">
              <div className="breadcrumb-menu" style={{margin:'0px -15px'}}>
                    <ul>
                      <li>
                        <NavLink
                          to={
                            "/setting-main/setting-agency/dashboard" 
                          }
                          className="underline-from-left"
                        >
                         Dashboard
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to={
                            "/setting-main/setting-agency/scan-tool" 
                          }
                          className="underline-from-left"
                        >
                          Scan Tool
                        </NavLink>
                      </li>
                      </ul>
                
              </div>
              <Switch>
           <Route path="/setting-main/setting-agency/dashboard" component={agencyDashboard} />
           <Route path="/setting-main/setting-agency/scan-tool" component={agencyScanTool} />
          </Switch>
           </div>
         </MDBRow>
        
        </MDBContainer>
   
            </div>
        )
    }
}
