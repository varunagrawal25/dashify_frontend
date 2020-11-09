import React, { Component } from 'react'
import { NavLink, withRouter} from "react-router-dom";
import { MDBRow, MDBCol, MDBContainer } from "mdbreact";
import logo from '../assets/footer-logo.png'

 class Footer extends Component {
    render() {
        return (
          
            <div id='footer_box'>
            <MDBContainer>
              <MDBRow>
                <MDBCol className='col-md-4'>
                <img src={logo} alt='logo' id='logo'/>
                </MDBCol>
                <MDBCol className='col-md-8'>
                  <MDBRow>
              <MDBCol className='col-md-4' style={{marginTop:'45px'}}>
                            
                            <div >
                            <NavLink to="/about-us" className='options'>About us</NavLink>
                            </div>
                            <div > 
                            <NavLink to="/how-we-work" className='options'>How we work</NavLink>
                            </div>
                            <div >
                            <NavLink to="/our-team" className='options'>Our team</NavLink>
                            </div>
                            <div >
                            <NavLink to="/our-news" className='options'>Our news</NavLink>
                            </div>
                            <div >
                            <NavLink to="/our-customer" className='options'>Our customers</NavLink>
                            </div>
                            <div > 
                            <NavLink to="/blog" className='options'>Blog</NavLink>
                            </div>
                            <div > 
                            <NavLink to="/career" className='options'>Career</NavLink>
                            </div>
                           
                      
                    </MDBCol>
                    <MDBCol className='col-md-4' style={{marginTop:'45px'}}>
                      
                            <div >
                            <NavLink to="/our-app" className='options'>Our App</NavLink>
                            </div>
                            <div >
                            <NavLink to="/listing-management" className='options'>Listings Management</NavLink>
                            </div>
                            <div > 
                            <NavLink to="/review-management" className='options'>Review Management</NavLink>
                            </div>
                            <div >
                            <NavLink to="/analytics" className='options'>Analytics</NavLink>
                            </div>
                            <div > 
                            <NavLink to="/commants-and-review" className='options'>Сomments and reviews</NavLink>
                            </div>
                            <div >
                            <NavLink to="/features" className='options'>Features</NavLink>
                            </div>
                      
                    </MDBCol> 
                    
                    <MDBCol className='col-md-4' style={{marginTop:'45px'}}>
                      
                            <div >
                            <NavLink to="/pricing" className='options'>Pricing</NavLink>
                            </div>

                            <div >
                            <NavLink to="/scanner" className='options'>Scanner</NavLink>
                            </div>
                            <div >
                            <NavLink to="/support" className='options'>Support</NavLink>
                            </div>
                            <div > 
                            <NavLink to="/chat" className='options'>Chat</NavLink>
                            </div>
                            <div >
                            <NavLink to="/login" className='options'>Log in</NavLink>
                            </div>
                            <div >
                            <NavLink to="/contact-us" className='options'>Contact us</NavLink>
                            </div>
                        <div >
                          <button id='btn_box' className='btn'>
                          Book A Demo
                          </button>
                        </div>
                    </MDBCol>
                    </MDBRow>
                    </MDBCol>
                    
              </MDBRow>
              </MDBContainer>
             
              <div className='rights_box' id='rights'>
                    
                      ©Dashify | All Rights Reserved
                      
                    </div>
            </div>
            
         
        )
    }
}
export default withRouter(Footer)