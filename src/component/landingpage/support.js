import React, { Component } from 'react'
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import Footer from "./footer";
import Navbar from "./navbar";

export default class Support extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
}
  render() {
    return (
      <div>
        <Navbar />
        <div >
        <MDBContainer>
        <div className='contact_heading'>Welcome to the Support Center</div>
        <div id='support_width1'>
<div id='contact_contant1' className='contact_contant'>
Find  solutions to customer service, general inquiry, product problem, business partnership, software upgrade, 
refund policy and any other issues related to Dashify
</div>
</div>

<div >
                      <span id='search_input'>
                      <img src={require("../assets/search_icon.png")} alt="" id='search_icon' />
                     <input type='text' placeholder='How can we help you today?' id='support_contant2' className='support_contant '/>
                     </span>
                    <span>
                          <button id='Search_box' > 
                          Search
                          </button>
                        </span>
                        </div>
                        <div id='support_width2'>
                        <div id='support_heading2' >Have a question?</div>
                        <div className="panel-group" id="accordion" >
                          <div className='collapse_box'>
        <div data-toggle="collapse" data-parent="#accordion" href="#collapse1">
        <img src={require("../assets/plus.png")} alt="" className='plus_minus' />
        <span className='support_collapse_heading' >About Dashify</span>
        </div>
      
    <div id="collapse1" className="panel-collapse collapse ">
      <div className="panel-body support_collapse_body">
      Google. Google Maps. Amazon Alexa. Apple Maps. Facebook. Bing. Yahoo. Yelp. It doesn’t matter which map, 
      app, voice assistant, search engine, GPS system, or social network consumers use to find and engage with 
      your business. What matters is that they discover accurate, complete, and compelling information at every turn.
      </div>
    </div>
    </div>
    <hr  />


    <div className='collapse_box'>
    <div data-toggle="collapse" data-parent="#accordion" href="#collapse2">
        <img src={require("../assets/plus.png")} alt="" className='plus_minus' />
        <span className='support_collapse_heading' >FAQ Center</span>
        </div>
      
    <div id="collapse2" className="panel-collapse collapse ">
      <div className="panel-body support_collapse_body">
      Google. Google Maps. Amazon Alexa. Apple Maps. Facebook. Bing. Yahoo. Yelp. It doesn’t matter which map, 
      app, voice assistant, search engine, GPS system, or social network consumers use to find and engage with 
      your business. What matters is that they discover accurate, complete, and compelling information at every turn.
      </div>
    </div>
    </div>
    <hr  />


    <div className='collapse_box'>
    <div data-toggle="collapse" data-parent="#accordion" href="#collapse3">
        <img src={require("../assets/plus.png")} alt="" className='plus_minus' />
        <span className='support_collapse_heading' >Guide & Tutorials</span>
        </div>
      
    <div id="collapse3" className="panel-collapse collapse ">
      <div className="panel-body support_collapse_body">
      Google. Google Maps. Amazon Alexa. Apple Maps. Facebook. Bing. Yahoo. Yelp. It doesn’t matter which map, 
      app, voice assistant, search engine, GPS system, or social network consumers use to find and engage with 
      your business. What matters is that they discover accurate, complete, and compelling information at every turn.
      </div>
    </div>
    </div>
    <hr  />

    <div className='collapse_box'>
    <div data-toggle="collapse" data-parent="#accordion" href="#collapse4">
        <img src={require("../assets/plus.png")} alt="" className='plus_minus' />
        <span className='support_collapse_heading' >Upgrade & Refund</span>
        </div>
      
    <div id="collapse4" className="panel-collapse collapse ">
      <div className="panel-body support_collapse_body">
      Google. Google Maps. Amazon Alexa. Apple Maps. Facebook. Bing. Yahoo. Yelp. It doesn’t matter which map, 
      app, voice assistant, search engine, GPS system, or social network consumers use to find and engage with 
      your business. What matters is that they discover accurate, complete, and compelling information at every turn.
      </div>
    </div>
    </div>
    <hr  />


    <div className='collapse_box'>
    <div data-toggle="collapse" data-parent="#accordion" href="#collapse5">
        <img src={require("../assets/plus.png")} alt="" className='plus_minus' />
        <span className='support_collapse_heading' >Join Our affiliate</span>
        </div>
      
    <div id="collapse5" className="panel-collapse collapse ">
      <div className="panel-body support_collapse_body">
      Google. Google Maps. Amazon Alexa. Apple Maps. Facebook. Bing. Yahoo. Yelp. It doesn’t matter which map, 
      app, voice assistant, search engine, GPS system, or social network consumers use to find and engage with 
      your business. What matters is that they discover accurate, complete, and compelling information at every turn.
      </div>
    </div>
    </div>
    <hr  />

    <div className='collapse_box'>
    <div data-toggle="collapse" data-parent="#accordion" href="#collapse6">
        <img src={require("../assets/plus.png")} alt="" className='plus_minus' />
        <span className='support_collapse_heading' >Get Free License</span>
        </div>
      
    <div id="collapse6" className="panel-collapse collapse ">
      <div className="panel-body support_collapse_body">
      Google. Google Maps. Amazon Alexa. Apple Maps. Facebook. Bing. Yahoo. Yelp. It doesn’t matter which map, 
      app, voice assistant, search engine, GPS system, or social network consumers use to find and engage with 
      your business. What matters is that they discover accurate, complete, and compelling information at every turn.
      </div>
     
    </div>
    </div>
    <hr  />
  </div>
  </div>
                            <div id='asknow'>
                        <span id='support_contant3'>Any more questions?</span>
                        <span id='support_contant4' className='support_contant'>Ask it now! </span>
                        {/* <hr id='line'/> */}
                        </div>

                        <MDBRow id='support_contact'>
                          <MDBCol md='4'>
                          <div className="how-icon">
                  <img src={require("../assets/email_icon.png")} alt="" />
                  <h3>Email</h3>
                  <p className='support_icon'>
                    Dashify Listings, we created an entirely new way for
                    businesses to control the facts about their
                  </p>
                </div>
                          </MDBCol>

                          <MDBCol md='4'>
                          <div className="how-icon">
                  <img src={require("../assets/chat_icon.png")} alt="" />
                  <h3>Chat</h3>
                  <p className='support_icon'>
                    Dashify Listings, we created an entirely new way for
                    businesses to control the facts about their
                  </p>
                </div>
                          </MDBCol>

                          <MDBCol md='4'>
                          <div className="how-icon">
                  <img src={require("../assets/call_icon.png")} alt="" />
                  <h3>Call</h3>
                  <p className='support_icon'>
                    Dashify Listings, we created an entirely new way for
                    businesses to control the facts about their
                  </p>
                </div>
                          </MDBCol>
                        </MDBRow>
            </MDBContainer>
        </div>
        <Footer />
      </div>
    );
  }
}
