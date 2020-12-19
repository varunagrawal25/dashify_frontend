import React, { Component } from 'react'
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import Footer from "./footer";
import Navbar from "./navbar";
import check from '../assets/pricing_check.png'
import cross from '../assets/pricing_cross.png'

export default class Pricing extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div >
        <MDBContainer>
        <div className='contact_heading'>Pricing</div>
        <div id='pricing_width1'>
<div id='contact_contant1' className='contact_contant'>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
</div>
</div>

                <div id='pricing_period'>
                  <MDBBtn id='pricing_btn1'>Monthly</MDBBtn>
                  <MDBBtn id='pricing_btn2'>Annual</MDBBtn>
                </div>

                <MDBRow>
                    <MDBCol md='4'/>
                  <MDBCol md='8' className=' pricing_container1'>
                      <MDBRow>
                      <MDBCol md='3' >
                      <div style={{textAlign:'center'}}>
                        <div className='pricing_contant1'>Start</div>
                        <div >
                        <span className='pricing_contant2'>16</span>
                        <span>$</span>
                        </div>
                        <div ><MDBBtn className='pricing_enable_btn'>Enable</MDBBtn></div>
                        </div>
                  </MDBCol>

                  <MDBCol md='3' >
                      <div style={{textAlign:'center'}}>
                        <div className='pricing_contant1'>Business</div>
                        <div >
                        <span className='pricing_contant2'>18</span>
                        <span>$</span>
                        </div>
                        <div ><MDBBtn className='pricing_enable_btn'>Enable</MDBBtn></div>
                        </div>
                  </MDBCol>

                  <MDBCol md='3' >
                      <div style={{textAlign:'center'}}>
                        <div className='pricing_contant1'>Professional</div>
                        <div >
                        <span className='pricing_contant2'>20</span>
                        <span>$</span>
                        </div>
                        <div ><MDBBtn className='pricing_enable_btn'>Enable</MDBBtn></div>
                        </div>
                  </MDBCol>

                  <MDBCol md='3' >
                      <div style={{textAlign:'center'}}>
                        <div className='pricing_contant1'>Max</div>
                        <div >
                        <span className='pricing_contant2'>30</span>
                        <span>$</span>
                        </div>
                        <div ><MDBBtn className='pricing_enable_btn'>Enable</MDBBtn></div>
                        </div>
                  </MDBCol>
                      </MDBRow>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol className='pricing_contant3'>
                        General
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/> </MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'><img src={cross} className='p_cross'/> </MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'><img src={cross} className='p_cross'/> </MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={cross} className='p_cross'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={cross} className='p_cross'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>

                
                <MDBRow>
                    <MDBCol className='pricing_contant3'>
                    Advertising platform
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                      <MDBCol md='3' className='pricing_contant5'>0 $</MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'><img src={cross} className='p_cross'/> </MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol className='pricing_contant3'>
                    Rating
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'><img src={cross} className='p_cross'/> </MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'><img src={cross} className='p_cross'/> </MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'><img src={cross} className='p_cross'/> </MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>


                <MDBRow>
                    <MDBCol className='pricing_contant3'>
                    Statistics
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'><img src={cross} className='p_cross'/> </MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'><img src={cross} className='p_cross'/> </MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'><img src={cross} className='p_cross'/> </MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>


                <MDBRow>
                    <MDBCol className='pricing_contant3'>
                    Tenders
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'><img src={cross} className='p_cross'/> </MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'><img src={cross} className='p_cross'/> </MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='4' className='pricing_contant4' >
                    Lorem ipsum dolor sit amet
                    </MDBCol>
                    <MDBCol md='8' className=' pricing_container2'>
                    <MDBRow>
                      <MDBCol md='3' className='pricing_contant5'><img src={cross} className='p_cross'/> </MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                      <MDBCol md='3' className='pricing_contant5'><img src={check} className='p_check'/></MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='4' className='pricing_contant6'>
                       Total :
                    </MDBCol>
                  <MDBCol md='8' className=' pricing_container3'>
                      <MDBRow>
                      <MDBCol md='3' >
                      <div style={{textAlign:'center'}}>
                        <div >
                        <span className='pricing_contant2'>16</span>
                        <span>$</span>
                        </div>
                        <div ><MDBBtn className='pricing_enable_btn'>Enable</MDBBtn></div>
                        </div>
                  </MDBCol>

                  <MDBCol md='3' >
                      <div style={{textAlign:'center'}}>
                        <div >
                        <span className='pricing_contant2'>18</span>
                        <span>$</span>
                        </div>
                        <div ><MDBBtn className='pricing_enable_btn'>Enable</MDBBtn></div>
                        </div>
                  </MDBCol>

                  <MDBCol md='3' >
                      <div style={{textAlign:'center'}}>
                        <div >
                        <span className='pricing_contant2'>20</span>
                        <span>$</span>
                        </div>
                        <div ><MDBBtn className='pricing_enable_btn'>Enable</MDBBtn></div>
                        </div>
                  </MDBCol>

                  <MDBCol md='3' >
                      <div style={{textAlign:'center'}}>
                        <div >
                        <span className='pricing_contant2'>30</span>
                        <span>$</span>
                        </div>
                        <div ><MDBBtn className='pricing_enable_btn'>Enable</MDBBtn></div>
                        </div>
                  </MDBCol>
                      </MDBRow>
                  </MDBCol>
                </MDBRow>

                        <div id='support_width2'>
                        <div className='contact_heading' >Frequently asked questions about pricing </div>
                        <div className="panel-group pricing_block" id="accordion" >
                          <div className='collapse_box'>
        <div data-toggle="collapse" data-parent="#accordion" href="#collapse1">
        <img src={require("../assets/plus.png")} alt="" className='plus_minus' />
        <span className='support_collapse_heading' >
            Do I need to enter my credit card details to sign up?
        </span>
        </div>
      
    <div id="collapse1" className="panel-collapse collapse ">
      <div className="panel-body support_collapse_body">
      Google. Google Maps. Amazon Alexa. Apple Maps. Facebook. Bing. Yahoo. Yelp. It doesn’t matter which map, 
      app, voice assistant, search engine, GPS system, or social network consumers use to find and engage with 
      your business. What matters is that they discover accurate, complete, and compelling information at every turn.
      </div>
    </div>
    </div>
    <hr className='pricing_collapse_hr' />


    <div className='collapse_box'>
    <div data-toggle="collapse" data-parent="#accordion" href="#collapse2">
        <img src={require("../assets/plus.png")} alt="" className='plus_minus' />
        <span className='support_collapse_heading' >Is there a setup free?</span>
        </div>
      
    <div id="collapse2" className="panel-collapse collapse ">
      <div className="panel-body support_collapse_body">
      Google. Google Maps. Amazon Alexa. Apple Maps. Facebook. Bing. Yahoo. Yelp. It doesn’t matter which map, 
      app, voice assistant, search engine, GPS system, or social network consumers use to find and engage with 
      your business. What matters is that they discover accurate, complete, and compelling information at every turn.
      </div>
    </div>
    </div>
    <hr className='pricing_collapse_hr' />


    <div className='collapse_box'>
    <div data-toggle="collapse" data-parent="#accordion" href="#collapse3">
        <img src={require("../assets/plus.png")} alt="" className='plus_minus' />
        <span className='support_collapse_heading' >
        Is there any storage or usage limit for a content repository?
        </span>
        </div>
      
    <div id="collapse3" className="panel-collapse collapse ">
      <div className="panel-body support_collapse_body">
      Google. Google Maps. Amazon Alexa. Apple Maps. Facebook. Bing. Yahoo. Yelp. It doesn’t matter which map, 
      app, voice assistant, search engine, GPS system, or social network consumers use to find and engage with 
      your business. What matters is that they discover accurate, complete, and compelling information at every turn.
      </div>
    </div>
    </div>
    <hr className='pricing_collapse_hr' />
  </div>
  </div>
                            <div id='asknow'>
                        <span id='support_contant3'>Any more questions?</span>
                        <span id='support_contant4' className='support_contant'>Ask it now! </span>
                        {/* <hr id='line'/> */}
                        </div>
            </MDBContainer>
        </div>
        <Footer />
      </div>
    );
  }
}
