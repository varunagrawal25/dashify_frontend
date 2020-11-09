import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import React, { Component } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import email_icon from '../assets/email_icon.png'
import call_icon from '../assets/call_icon.png'
import chat_icon from '../assets/chat_icon.png'
import account from '../assets/account.png'
import analytics from '../assets/analytics.png'
import client_feedback from '../assets/client_feedback.png'
import digital_catalogues from '../assets/digital_catalogues.png'
import plateform_adv from '../assets/plateform_adv.png'
import search_quaries from '../assets/search_quaries.png'
import scan from '../assets/scan.png'

export default class How_we_work extends Component {
  componentDidMount() {
    window.scrollTo(0, 0) 
}
  render() {
    return (
      <div className='bluish_background'>
        <Navbar />
        <MDBContainer className='hww_container'>
         <div className='hww_heading'>How we work</div>
         <div className='hww_contant1'>
         Find  solutions to customer service, general inquiry, product problem, business partnership, 
         software upgrade, refund policy and any other issues related to Dashify
         </div>
         <MDBRow>
           <MDBCol md='6' className='hww_box_outer1'>
             <div className='hww_box'>
<MDBRow>
<div className="numaric">01</div>
  <MDBCol md='8' className='hww_box_head'>
  Start our scan
  </MDBCol>
  <MDBCol md='4' className='scan_img_box'>
    <img src={scan} alt='' className='hww_icons'/>
  </MDBCol>
  <div className='hww_contant2'>
  Input your business information, start our scan to see if your information is coming up correctly, 
  you will get to check the health of your online visibility to see whether consumers are receiving 
  the correct information about your business and your online exposure.
  </div>
</MDBRow>
             </div>
           </MDBCol>

         </MDBRow>

         <MDBRow>
           <MDBCol md='6' className='offset-md-6'>
             <div>
<MDBRow>
  <MDBCol md='8'>
  Start our scan
  </MDBCol>
  <MDBCol md='4'>
    <img src={scan} alt='' />
  </MDBCol>
  <div>
  Input your business information, start our scan to see if your information is coming up correctly, 
  you will get to check the health of your online visibility to see whether consumers are receiving 
  the correct information about your business and your online exposure.
  </div>
</MDBRow>
             </div>
           </MDBCol>

         </MDBRow>
        </MDBContainer>
        {/* <div className="how-it-work">
          <div className="container">
            <div className="how-it-title">
              <h2>How we work</h2>
              <p>
                Find solutions to customer service, general inquiry, product
                problem,
                <br />
                business partnership, software upgrade, refund policy and any
                other issues
                <br />
                related to Dashify
              </p>
            </div>

            <ul className="timeline">
              <li>
                <div className="cricle-how"></div>
                <div className="numaric">01</div>
                <div className="timeline-badge primary">
                  <a>
                    <i></i>
                  </a>
                </div>
                <div className="timeline-panel">
                  <div className="timeline-body">
                    <h2>
                      Start our scan{" "}
                      <img src={require("../assets/scan.png")} alt="" />
                    </h2>
                    <p>
                      Input your business information, start our scan to see if
                      your information is coming up correctly, you will get to
                      check the health of your online visibility to see whether
                      consumers are receiving the correct information about your
                      business and your online exposure.
                    </p>
                  </div>
                </div>
              </li>

              <li className="timeline-inverted">
                <div className="cricle-how2"></div>
                <div className="numaric">02</div>
                <div className="timeline-badge primary">
                  <a>
                    <i></i>
                  </a>
                </div>
                <div className="timeline-panel">
                  <div className="timeline-body">
                    <h2>
                      Create your account{" "}
                      <img src={require("../assets/account.png")} alt="" />
                    </h2>
                    <p>
                      Create your account and start using the features of where
                      you would like to be noticed online, and the way you would
                      like to manage your information from one centralized
                      location, instead of managing it across multiple sites and
                      platforms where your information is listed.{" "}
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="numaric">03</div>
                <div className="timeline-badge primary">
                  <a>
                    <i></i>
                  </a>
                </div>
                <div className="timeline-panel">
                  <div className="timeline-body">
                    <h2>
                      Search queries{" "}
                      <img
                        src={require("../assets/search_quaries.png")}
                        alt=""
                      />
                    </h2>
                    <p>
                      Instantly update your key business information while
                      Improving your business discoverability and search
                      rankings across the web. It doesn’t matter which app,
                      voice search assistant, search engine, social network or
                      map system consumers use to find information about your
                      business. What does matters is that these searches produce
                      accurate and compelling information about your business
                      when consumers see your information.{" "}
                    </p>
                  </div>
                </div>
              </li>

              <li className="timeline-inverted">
                <div className="numaric">04</div>
                <div className="timeline-badge primary">
                  <a>
                    <i></i>
                  </a>
                </div>
                <div className="timeline-panel">
                  <div className="timeline-body">
                    <h2>
                      Platform advertising{" "}
                      <img
                        src={require("../assets/plateform_adv.png")}
                        alt=""
                      />
                    </h2>
                    <p>
                      Promote your business across social media, directory
                      searches, mobile marketing, and voice search platforms.
                      Run promotional posts to multiple sites all at once.
                      Keeping your customers up to date regardless of what
                      directory they are using.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="numaric">05</div>
                <div className="timeline-badge primary">
                  <a>
                    <i></i>
                  </a>
                </div>
                <div className="timeline-panel">
                  <div className="timeline-body">
                    <h2>
                      Client feedback{" "}
                      <img
                        src={require("../assets/client_feedback.png")}
                        alt=""
                      />
                    </h2>
                    <p>
                      Check what customers have to say about your business! This
                      way you can see what areas you are exceling in and also
                      what areas may need some work. This makes business
                      automation an easier task at hand.{" "}
                    </p>
                  </div>
                </div>
              </li>

              <li className="timeline-inverted">
                <div className="how-cricle3"></div>
                <div className="numaric">06</div>
                <div className="timeline-badge primary">
                  <a>
                    <i></i>
                  </a>
                </div>
                <div className="timeline-panel">
                  <div className="timeline-body">
                    <h2>
                      Browse the analytics{" "}
                      <img src={require("../assets/analytics.png")} alt="" />
                    </h2>
                    <p>
                      See the analytics of how your customers are interacting
                      with the information, whether they are calling, requesting
                      directions or visiting your website. This makes it easier
                      to see what means your customers are using so you can
                      drive more traffic to your brand and see what approach you
                      should take to accomplish.
                    </p>
                  </div>
                </div>
              </li>
              <li style={{ marginBottom: "0px" }}>
                <div className="how-cricle4"></div>
                <div className="numaric">07</div>
                <div
                  className="timeline-badge primary"
                  style={{ display: "none" }}
                >
                  <a>
                    <i></i>
                  </a>
                </div>
                <div className="timeline-panel">
                  <div className="timeline-body">
                    <h2>
                      Digital catalogues{" "}
                      <img
                        src={require("../assets/digital_catalogues.png")}
                        alt=""
                      />
                    </h2>
                    <p>
                      Dashify gives you control to upload content and
                      information across digital directories all over the world.
                      Our platform allows you to manage your brands information,
                      ensuring consumers find the information you want them to
                      see.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="how-cover"></div>
 */}

        {/* <div className="what-we-do">
          <div className="container">
            <div className="how-it-title">
              <h2>What we do?</h2>
              <p>
                Find solutions to customer service, general inquiry, product
                problem,
                <br />
                business partnership, software upgrade, refund policy and any
                other issues
                <br />
                related to Dashify
              </p>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="how-icon">
                  <img src={require("../assets/email_icon.png")} alt="" />
                  <h3>Email</h3>
                  <p>
                    Dashify Listings, we created an entirely new way for
                    businesses to control the facts about their
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="how-icon">
                  <img src={require("../assets/chat_icon.png")} alt="" />
                  <h3>Chat</h3>
                  <p>
                    Dashify Listings, we created an entirely new way for
                    businesses to control the facts about their
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="how-icon">
                  <img src={require("../assets/call_icon.png")} alt="" />
                  <h3>Call</h3>
                  <p>
                    Dashify Listings, we created an entirely new way for
                    businesses to control the facts about their
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="see-cover"></div>
        <div className="see-business">
          <div className="container position-relative">
            <div className="how-cricle5"></div>
            <div className="how-cricle6"></div>
            <h2>
              See how your business can deliver verified answers to searching
              consumers, helping drive discovery and revenue
            </h2>
            <div className="banner-btn">
              <a href="#" className="book_btn">
                Book A Demo{" "}
              </a>
              <a href="#" className="learn_btn">
                Learn more{" "}
              </a>
            </div>
          </div>
        </div>
        */}
        <Footer />
      </div>
    );
  }
}
