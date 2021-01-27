import React, { Component } from 'react'
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import { Checkbox } from '@material-ui/core';

export default class AgencyScanTool extends Component {
  state={
    name:'',
    email:'',
    customDomain:'',
    fixListing:'',
    pageTitle:'',
    pageDescription:'',
    containerId:'',
    nameError:'',
    emailError:'',
    customDomainError:'',
    fixListingError:'',
    pageTitleError:'',
    pageDescriptionError:'',
    containerIdError:'',
    showError:false,
    isError:false
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

  onSave = () =>{
    if(this.state.name==''){
      this.setState({
        nameError:'Name Required',
        isError:true
      })
    }else{
      this.setState({
        nameError:'',
        isError:false
      })
    }
    if(this.state.email==''){
      this.setState({
        emailError:'Email Id Required',
        isError:true
      })
    }
    else{
      this.setState({
        emailError:'',
        isError:false
      })
    }
    if(this.state.pageTitle==''){
      this.setState({
        pageTitleError:'page title Required',
        isError:true
      })
    }else{
      this.setState({
        pageTitleError:'',
        isError:false
      })
    }
    if(this.state.pageDescription==''){
      this.setState({
        pageDescriptionError:'Page Description Required',
        isError:true
      })
    }
    else{
      this.setState({
        pageDescriptionError:'',
        isError:false
      })
    }
    if(this.state.customDomain==''){
      this.setState({
        customDomainError:'Domain Required',
        isError:true
      })
    }else{
      this.setState({
        customDomainError:'',
        isError:false
      })
    }
    if(this.state.containerId==''){
      this.setState({
        containerIdError:'Container Id Required',
        isError:true
      })
    }
    else{
      this.setState({
        containerIdError:'',
        isError:false
      })
    }
    if(this.state.fixListing==''){
      this.setState({
        fixListingError:'Link Required',
        isError:true
      })
    }
    else{
      this.setState({
        fixListingError:'',
        isError:false
      })
    }
    return this.state.isError
  }
    render() {
      console.log(this.state)
        return (
            <div>
                <MDBRow style={{padding:'3% 6%'}}>
                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Agency Name:</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input
                          className="profile4" style={{width:'100%'}}
                          placeholder="Enter agency name"
                          name="name"
                          onChange={this.changeHandler}
                        />
                        <div className='err_msg_agency'>{this.state.nameError}</div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Agency Email:</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input className="profile4" style={{width:'100%'}} placeholder="Enter agency email"  name="email"
                           type='email'     onChange={this.changeHandler} />
                           <div className='err_msg_agency'>{this.state.emailError}</div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Custom Domain:</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input
                          className="profile4" style={{width:'100%'}}
                          placeholder="Enter custom domain"
                          name="customDomain"
                          type='email'
                          onChange={this.changeHandler}
                        />
                        <div className='err_msg_agency'>{this.state.customDomainError}</div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="12" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="6">
                        <div className="agencycontant1">Link to Fix Listing:</div>
                      </MDBCol>
                      <MDBCol md="6">
                        <input className="profile4" style={{width:'100%'}} placeholder="Enter link to fix listings" 
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
                        <Checkbox name='showError' onChange={this.changeHandler}/>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <div style={{margin:'auto',marginTop:'30px'}}>
                  <MDBBtn className="pay_last_btn" style={{margin:'0px 5px'}} onClick={this.onSave} >Save</MDBBtn>
                  <MDBBtn className="pay_last_btn" style={{margin:'0px 5px',background:'#00C27A'}}>Upload Custom CSS</MDBBtn>
                      
                      </div>
                  
                </MDBRow>
               
            </div>
        )
    }
}
