import React, { Component } from 'react'
// import '.../css/Listing_management.css'
import listingbanner from '../assets/Listingbanner.png'
import boosts_visibility from '../assets/boosts_visibility.png'
import boosts_web_traffic from '../assets/boosts_web_traffic.png'
import value_for_money from '../assets/value_for_money.png'
import stay_ahead from '../assets/stay_ahead.png'
import down_arrow from '../assets/down_arrow.png'
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import Footer from "./footer";
import Navbar from "./navbar";
export default class Listing_management extends Component {
  componentDidMount(){
    window.scrollTo(0, 0)
  }
    render() {
        return (
            <div>
              <Navbar />
            <MDBContainer>
              <MDBRow>
<MDBCol md='7'>
<div  className='lm_heading'>Internet Listing Management</div>
<div  className='lm_contant'>
                    <p>
                    Do you know what makes businesses successful in the modern 
                    world? Visibility. All these marketing and PR campaigns that you see every 
                    day are only because of a sole reason. That reason is visibility.
                    </p>
                    <p>
                    Without visibility or a presence, your brand won’t reach your target audience and 
                    many people will not know about your business at all. This is where we come in.
                    Listing your business on search engines, social media platforms, and the digital 
                    world is one way to gain higher visibility and something we excel at.
                    </p>
                  <p>
                  Of course, before opting for any service you need to what it is about and what it entails so 
                    here are some details.
                  </p>
                </div>
</MDBCol>
<MDBCol md='5'>
<img src={listingbanner} alt='logo' id='listing_banner'/>
</MDBCol>
              </MDBRow>
              <div  className='lm_heading1'>
                What is Internet Listing Management?
                </div>
                <div  className='lm_contant1'>
                <p>
                    This is where you list your business on major search engines people use such 
                    as Google, Bing, Yelp, etc. As experts in this field, we manage listings for 
                    a variety of big companies to help them gain more visibility. 
                    </p>
                    <p>
                    However, for a successful business listing, you need to provide us with some 
                    basic information about your business such as:
                    </p>
                </div>
                <MDBRow className='review_container' style={{marginTop:'40px'}}>
                  <MDBCol md='2' className='lm_box_options'>
                  Website URL
                  <img src={down_arrow} alt=''  className='lm_arrow' />
                  </MDBCol>

                  <MDBCol md='2' className='lm_box_options'>
                  Business Name
                  <img src={down_arrow} alt=''  className='lm_arrow' />
                  </MDBCol>

                  <MDBCol md='2' className='lm_box_options'>
                  Address
                  <img src={down_arrow} alt=''  className='lm_arrow' />
                  </MDBCol>

                  <MDBCol md='2' className='lm_box_options'>
                  Business Type
                  <img src={down_arrow} alt=''  className='lm_arrow' />
                  </MDBCol>

                  <MDBCol md='2' style={{marginLeft:'20px'}}>
                  <button  className='btn_box' >Scan now</button>
                  </MDBCol>
                </MDBRow>
                <div  className='lm_contant2'>
                    <p>
                    This is some basic information that will help us get started with listing your business 
                    on search engines.
                    </p>
            </div>
            <div  className='lm_heading1'>
            How Does It Work?
                </div>

                <MDBRow>
                  <MDBCol md='6' style={{padding:' 0px 30px'}}>
                  <div className='lm_container lm_contant' >
                         
                         However, do provide accurate information as this is how many people will find you
                          in the digital world. We will make sure that your business information is everywhere 
                          and is up to date at all times. Any changes in address, contact number, or anything
                           else need to be communicated to us so we can keep your listings up to date.
                           
                         </div>
                  </MDBCol>
                  <MDBCol md='6' style={{padding:' 0px 30px'}}>
                  <div className='lm_container lm_contant' >
                         
                         However, do provide accurate information as this is how many people will find you
                          in the digital world. We will make sure that your business information is everywhere 
                          and is up to date at all times. Any changes in address, contact number, or anything
                           else need to be communicated to us so we can keep your listings up to date.
                           
                         </div>
                  </MDBCol>
                </MDBRow>
                <div  className='lm_heading2'>
                Why You Need This Service For Your Business?
                </div>
                <div>
                <p  className='lm_contant3'>
                So, by now you are probably wondering why you need to hire someone for this job and how can 
                it benefit your business. Well, there are many reasons a business listing can aid the growth
                of your business.
                </p>
                </div>

                <MDBRow>
                  <MDBCol md='6' className='lm_margin1'>
                    <MDBRow>
                      <MDBCol md='6'>
                      <img src={boosts_visibility} alt='logo' className='lm_img'/>
                      </MDBCol>
                      <MDBCol md='6' className='lm_margin2'>
                      <div  className='sublm_heading'>
            Boosts visibility 
            </div>
            <div  className='lm_contant'>
      <p> 
    As a professional business listing service, we make sure that your business is ranked high across all 
    search engines. This will ensure that while searching, your business listing will show on top. This is
     done by the use of links and SEO, in which we are experts.
      </p>
     <p>
     Our team of professionals will make sure that your website and business is ranked high on search engine 
     results. Now, the higher your business name is the more likely it is that people will click that link. 
     This means that many people will now get to know about your business in a way they never did before!
     </p>
            </div>
                
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol md='6' className='lm_margin1'>
                    <MDBRow>
                      <MDBCol md='6' className='lm_margin3'>
                      <img src={value_for_money} alt='logo' className='lm_img' />
                      </MDBCol>
                      <MDBCol md='6'>
                      <div  className='sublm_heading'>
                      Value for money 
            </div>
            <div  className='lm_contant'>
            <p> 
      Listing your business with us won’t cost you an arm and a leg. We value our customers and their
       hard-earned money. This is why our charges will provide you with value for your money and the best
        services with amazing results. 
      </p>
     <p>
     Our strategy has proven successful for many businesses that are now an integral part of our company
      and always utilize our listing services. We leave no stone unturned when it comes to listing your
       business successfully.
     </p>
            </div>
                
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md='6' className='lm_margin1'>
                    <MDBRow>
                      <MDBCol md='6'>
                      <img src={boosts_web_traffic} alt='logo' className='lm_img'/>
                      </MDBCol>
                      <MDBCol md='6' className='lm_margin2'>
                      <div  className='sublm_heading'>
                      Boosts web traffic 
            </div>
            <div  className='lm_contant'>
            <p> 
      The more traffic you have on your website, the more it will lead to sales. Your website is a 
      representation of your business and many people will judge your services through your website.
       It will be a big factor when it comes to deciding if they want to utilize the services of your business.
      </p>
     <p>
     Our list of directories and listings will ensure that your website and business information has reached
      a wide audience. Even an audience that you might have had difficulty targeting before, our professionals
       will make sure that your business is known to them as well.
     </p>
            </div>
                
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md='6' className='lm_margin1'>
                    <MDBRow>
                      <MDBCol md='6' className='lm_margin3'>
                      <img src={stay_ahead} alt='logo' className='lm_img'/>
                      </MDBCol>
                      <MDBCol md='6'>
                      <div  className='sublm_heading'>
                      Stay ahead of the competition 
            </div>
            <div  className='lm_contant'>
            <p> 
      Everything has gotten fiercely competitive now. To be successful as a business, you need to ensure 
      that you are always ahead of the curve. This is done by making sure that you are coming up with a 
      strategic plan to boost the growth and visibility of your business on all fronts.
      </p>
     <p>
     Business listings on the correct platforms are essential to staying ahead and making sure that your
      business is visible on all fronts. A successful business listing plan will involve staying ahead of 
      competitors and making sure your business has high rankings on every major search engine.
     </p>
            </div>
                
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <div  className='lm_heading3'>
                If you want your business to grow easily and organically, then hire our internet listing
                 management services now to stay ahead of the competition and make your brand to a wide 
                 audience!
                </div>
                
                <div style={{textAlign:'center'}}>
                  <span>
                  <button className='lm_book_demo'>
                          Book A Demo
                          </button>
                  </span>
                  <span>
                          <button  className='lm_learn_more'>
                          Learn more
                          </button>
                        </span>
                        </div>
                        
            </MDBContainer>
            <Footer />
      </div>
        )
    }
}
