import React, { Component } from 'react'
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import { secure_pin } from "../config";
import swal from "sweetalert";
import {add_agency_dashboard,get_agency} from './apis/agency'
export default class AgencyDashboard extends Component {
  state={
    customDomain:'',
    containerId:'',
    accessSwitch:false,
    customDomainError:'',
    containerIdError:'',
    isError:false
  }

  componentDidMount =() =>{
    const data={
      secure_pin,
      user_id:localStorage.getItem("UserId")
    }
    console.log(data)
    get_agency(data)
    .then(resp=>{
console.log(resp)
this.setState({
  customDomain:resp.data.agency_data[0].dash_custom_domain,
  containerId:resp.data.agency_data[0].dash_google_tag_id,
  accessSwitch:resp.data.agency_data[0].dash_access_client,
})
    })
  
  
  }
  changeHandler = event => {
    this.setState({
      [event.target.name] :event.target.value
    });

    if(event.target.name=='accessSwitch'){
      this.setState({
        accessSwitch:!this.state.accessSwitch
      })
    }
  }

  onSave = async e =>{
    if(this.state.customDomain==''){
     await this.setState({
        customDomainError:'Domain Required',
        isError:true
      })
      console.log("mudda",this.state.isError)
    }else{
      this.setState({
        customDomainError:'',
        isError:false
      })
    }
    // if(this.state.containerId==''){
    //   await this.setState({
    //     containerIdError:'Container Id Required',
    //     isError:true
    //   })
    // }
    // else{
    //   this.setState({
    //     containerIdError:'',
    //     isError:false
    //   })
    // }
   // {"secure_pin":"digimonk","user_id":"10","custom_domain":"digimonk.in","google_tag_id":"SFSSFS-234sd"}
    if(!this.state.isError){
      if(!this.state.isError){
        const data={
          secure_pin,
          user_id:localStorage.getItem("UserId"),
          custom_domain:this.state.customDomain,
          google_tag_id:this.state.containerId,
          access_client:this.state.accessSwitch
        }
        console.log(data)
        add_agency_dashboard(data)
        .then(resp=>{
  swal("Added Successfully")
  console.log(resp)
  const data1={
    secure_pin,
    user_id:localStorage.getItem("UserId")
  }
  console.log(data1)
  get_agency(data1)
  .then(resp=>{
console.log(resp)
this.setState({
customDomain:resp.data.agency_data[0].dash_custom_domain,
containerId:resp.data.agency_data[0].dash_google_tag_id,
accessSwitch:resp.data.agency_data[0].dash_access_client,
})
  })

        })
        
      }
    }
    return this.state.isError


   
  }
    render() {
      console.log(this.state)
        return (
            <div >
            <MDBRow style={{padding:'3% 6%'}}>
              <MDBCol md="12" className="profileSpacing">
                <MDBRow>
                  <MDBCol md="6">
                    <div className="agencycontant1">Custom Domain<span style={{color:'red'}}>*</span> :</div>
                    
                  </MDBCol>
                  <MDBCol md="6">
                    <input
                    value={this.state.customDomain}
                      className="profile4"
                      placeholder="info@oasismedia.co"
                      name="customDomain"
                      type='email'
                      onChange={this.changeHandler}
                      style={{width:'100%'}}
                    />
                    <div className='err_msg_agency'>{this.state.customDomainError}</div>
                  </MDBCol>
                </MDBRow>
              </MDBCol>

              <MDBCol md="12" className="profileSpacing">
                <MDBRow>
                  <MDBCol md="6">
                    <div className="agencycontant1">Google Tag Manager Container ID :</div>
                  </MDBCol>
                  <MDBCol md="6">
                    <input className="profile4" style={{width:'100%'}} 
                    value={this.state.containerId}
                    placeholder="GTM-PV9NZ657GH"  name="containerId"
                            onChange={this.changeHandler} />

<div className='err_msg_agency'>{this.state.containerIdError}</div>
                  </MDBCol>
                </MDBRow>
              </MDBCol>

              
                  <MDBCol md='12'>
                      <MDBRow className='agency_dashboard1'>
                          <MDBCol md='8' className="agencycontant1" style={{paddingTop:'15px'}}>
                          Enable white label dashboard access to all clients
                          </MDBCol>
                          <MDBCol className="es_table_font2" md="4">
              <div>
                <label className="switch">
                  <input type="checkbox" className="switch-input" name='accessSwitch' onChange={this.changeHandler}checked={this.state.accessSwitch} />
                  <span
                    className="switch-label"
                    data-on="On"
                    data-off="Off"
                  ></span>
                  <span className="switch-handle"></span>
                </label>
              </div>
            </MDBCol>
                      </MDBRow>
                  </MDBCol>
                  <div style={{margin:'auto',marginTop:'30px'}}>
                    <MDBBtn className="pay_last_btn" onClick={this.onSave}>Save</MDBBtn></div>
                        </MDBRow>
           
        </div>
    
        )
    }
}
