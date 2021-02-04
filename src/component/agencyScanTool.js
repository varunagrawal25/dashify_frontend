import React, { Component } from 'react'
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import { Checkbox } from '@material-ui/core';
import { secure_pin } from "../config";
import swal from "sweetalert";
import Spinner from "./common/Spinner";
import {add_agency_scantool, get_agency,update_agency_scantool} from './apis/agency'
export default class AgencyScanTool extends Component {
  state={
    name:"",
    email:"",
    customDomain:"",
    fixListing:"",
    pageTitle:"",
    pageDescription:"",
    containerId:"",
    nameError:"",
    emailError:"",
    customDomainError:"",
    fixListingError:"",
    pageTitleError:"",
    pageDescriptionError:"",
    containerIdError:"",
    showError:false,
    isError:false,
    isLoading:false
  }
 // {"secure_pin":"digimonk","user_id":"10","agency_id":"1"}
  componentDidMount = () =>{
    this.setState({
      isLoading:true
    })
    const data={
      secure_pin,
      user_id:localStorage.getItem("UserId"),
     
    }
    get_agency(data)
    .then(resp=>{
     console.log(resp)

     this.setState({
      name:resp.data.agency_data[0].agency_name,
      email:resp.data.agency_data[0].agency_email,
      customDomain:resp.data.agency_data[0].custom_domain,
      fixListing:resp.data.agency_data[0].link_to_fix,
      pageTitle:resp.data.agency_data[0].page_title,
      pageDescription:resp.data.agency_data[0].page_description,
      containerId:resp.data.agency_data[0].google_tab_id,
      showError:resp.data.agency_data[0].show_error,
      isLoading:false
     })
    })
  }

  changeHandler = event => {
    this.setState({
      [event.target.name] :event.target.value
    });

    if(event.target.name=='showError'){
      this.setState({
        showError:!this.state.showError
      })
    }
  }

  onSave = async e =>{
    if(this.state.name==""){
     await this.setState({
        nameError:'Name Required',
        isError:true
      })
      console.log("mudda",this.state.isError)
    }
    
    else{
      this.setState({
        nameError:"",
        isError:false
      })
    }

    console.log(this.state.isError)
    console.log(this.state.nameError)


    if(this.state.email==""){
      await this.setState({
        emailError:'Email Id Required',
        isError:true
      })
    }
    else{
      this.setState({
        emailError:"",
        isError:false
      })
    } 
    // if(this.state.pageTitle == ""){
    //   this.setState({
    //     pageTitleError:'page title Required',
    //     isError:true
    //   })
    // }else{
    //   this.setState({
    //     pageTitleError:"",
    //     isError:false
    //   })
    // }
    // if(this.state.pageDescription==""){
    //   this.setState({
    //     pageDescriptionError:'Page Description Required',
    //     isError:true
    //   })
    // }
    // else{
    //   this.setState({
    //     pageDescriptionError:"",
    //     isError:false
    //   })
    // }
    if(this.state.customDomain==""){
      await this.setState({
        customDomainError:'Domain Required',
        isError:true
      })
    }else{
      this.setState({
        customDomainError:"",
        isError:false
      })
    }
    // if(this.state.containerId==""){
    //   this.setState({
    //     containerIdError:'Container Id Required',
    //     isError:true
    //   })
    // }
    // else{
    //   this.setState({
    //     containerIdError:"",
    //     isError:false
    //   })
    // }
    if(this.state.fixListing==""){
      await this.setState({
        fixListingError:'Link Required',
        isError:true
      })
    }
    else{
      this.setState({
        fixListingError:"",
        
      })
    }
    // {"secure_pin":"digimonk","user_id":"10","agency_name":"agency_name","agency_email":"agency_email",
    // "custom_domain":"custom_domain","link_to_fix":"link_to_fix","page_title":"page_title",
    // "page_description":"page_description","google_tab_id":"google_tab_id","show_error":"show_error",
    // "upload_css":"data:text/css;base64"}
    console.log(this.state.isError)
    console.log(this.state)
    if(!this.state.isError){
      this.setState({
        isLoading:true
      })
      const data={
        secure_pin,
user_id:localStorage.getItem("UserId"),
agency_name:this.state.name,
agency_email:this.state.email,
link_to_fix:this.state.fixListing,
page_title:this.state.pageTitle,
page_description:this.state.pageDescription,
show_error:this.state.showError,
custom_domain:this.state.customDomain,
google_tab_id:this.state.containerId,
upload_css:""
      }
      console.log(data)
      add_agency_scantool(data)
      .then(resp=>{
swal("Added Successfully")
console.log(resp)
this.setState({

  isLoading:false
 })
      })
    }
    return this.state.isError
  }
    render() {
      console.log(this.state)
        return (
            <div style={{padding:'3% 6%'}}>
                 {this.state.isLoading?<Spinner/>:
                <MDBRow >
                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Agency Name<span style={{color:'red'}}>*</span> :</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input
                          className="profile4" style={{width:'100%'}}
                          placeholder="Enter agency name"
                          name="name"
                          onChange={this.changeHandler}
                          value={this.state.name}
                        />
                        <div className='err_msg_agency'>{this.state.nameError}</div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Agency Email<span style={{color:'red'}}>*</span> :</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input className="profile4" style={{width:'100%'}}
                        value={this.state.email}
                         placeholder="Enter agency email"  name="email"
                           type='email'     onChange={this.changeHandler} />
                           <div className='err_msg_agency'>{this.state.emailError}</div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Custom Domain<span style={{color:'red'}}>*</span> :</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input
                          className="profile4" style={{width:'100%'}}
                          placeholder="Enter custom domain"
                          name="customDomain"
                          type='email'
                          value={this.state.customDomain}
                          onChange={this.changeHandler}
                        />
                        <div className='err_msg_agency'>{this.state.customDomainError}</div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Link to Fix Listing<span style={{color:'red'}}>*</span> :</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input className="profile4" style={{width:'100%'}}
                        value={this.state.fixListing}
                         placeholder="Enter link to fix listings" 
                         name="fixListing" onChange={this.changeHandler}/>
                         <div className='err_msg_agency'>{this.state.fixListingError}</div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                
                  
                
                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Page Title:</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input className="profile4" style={{width:'100%'}} placeholder="Enter page title" 
                        value={this.state.pageTitle}
                         name="pageTitle" onChange={this.changeHandler}/>
                         <div className='err_msg_agency'>{this.state.pageTitleError}</div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                
                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Page Description:</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input className="profile4" style={{width:'100%'}} placeholder="Enter page description:"
                        value={this.state.pageDescription}
                          name="pageDescription" onChange={this.changeHandler}/>
                          <div className='err_msg_agency'>{this.state.pageDescriptionError}</div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Google Tag Manager Container ID:</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input className="profile4" style={{width:'100%'}} placeholder="Enter google tag id" 
                        value={this.state.containerId} 
                        name="containerId" onChange={this.changeHandler}/>
                                <div className='err_msg_agency'>{this.state.containerIdError}</div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Show Errors</div>
                      </MDBCol>
                      <MDBCol md="6" style={{marginLeft:'-25px'}}>
                        <Checkbox name='showError' onChange={this.changeHandler} checked={this.state.showError}/>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <div style={{margin:'auto',marginTop:'30px'}}>
                  <MDBBtn className="pay_last_btn" style={{margin:'0px 5px'}} onClick={this.onSave} >Save</MDBBtn>
                  <MDBBtn className="pay_last_btn" style={{margin:'0px 5px',background:'#00C27A'}}>Upload Custom CSS</MDBBtn>
                      
                      </div>
                  
                </MDBRow>
    }
            </div>
        )
    }
}
