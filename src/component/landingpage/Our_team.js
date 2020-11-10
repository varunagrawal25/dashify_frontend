import React, { Component } from 'react'
// import '.../css/Our_team.css'
import team1 from '../assets/team1.png'
import team2 from '../assets/team2.png'
import team3 from '../assets/team3.png'
import team4 from '../assets/team4.png'
import team5 from '../assets/team5.png'
import team6 from '../assets/team6.png'
import team7 from '../assets/team7.png'
import team8 from '../assets/team8.png'
import team9 from '../assets/team9.png'
import team10 from '../assets/team10.png'
import team11 from '../assets/team11.png'
import team12 from '../assets/team12.png'
import team13 from '../assets/team13.png'
import team14 from '../assets/team14.png'
import linkedin from '../assets/linkedin.png'
import twitter from '../assets/rev_track_twitter.png'
import seperator from '../assets/seperator.png'
import { MDBCol, MDBContainer ,MDBRow} from 'mdbreact'
import Footer from "./footer";
import Navbar from "./navbar";

export default class Our_team extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        return (
            <div className='white_background'>
                <Navbar />
                
                <MDBContainer className='container_margin'>
               <div  className='team_heading'>Meet our team</div> 
               <div className='subhead'>Star in intelligent search</div>
               <div className='team_contant' >
                   <p style={{width:'80%'}}>
                   Your customers are your most important source of feedback. Their ratings and reviews
                    impact how search engines and other customers make decisions about your brand everyday.
                     If you don’t pay attention to this important source of customer feedback, you could be
                      leaving revenue on the table.
                   </p>
               </div>
               <div>
                   <img src={team1} alt='' id='team1'/>
                   <img src={team2} alt='' id='team2'/>
                   <img src={team3} alt='' id='team3'/>
               </div>
               
               <div>
                   <img src={team4} alt='' id='team4'/> 
                   <img src={team5} alt='' id='team5'/>
                   <img src={team6} alt='' id='team6'/>
                   <img src={team7} alt='' id='team7'/>
                   </div>
              
               <div className='team_heading1' >Our team</div>

               <MDBRow>
                   <MDBCol md='2' className='no_padding team_space'>
                   <img src={team8} alt='' className='team8'/>
                   <div  className='name'>John Anderson</div>
                   <div  className='desig'>Manager</div>
                   <div>
                   <span  className='headshot'>Headshot</span>
                   <span><img src={seperator} className='team_seperator' alt='' /></span>
                   <span><img src={linkedin} className='team_linkedin' alt='' /></span>
                   <span><img src={twitter} className='team_linkedin' alt='' /></span>
                   </div>
                   </MDBCol>
                   <MDBCol md='2' className='no_padding team_space'>
                   <img src={team9} alt='' className='team8'/>
                   <div  className='name'>Ann Johnson </div>
                   <div  className='desig'>IT Department</div>
                   <div>
                   <span  className='headshot'>Headshot</span>
                   <span><img src={seperator} className='team_seperator' alt='' /></span>
                   <span><img src={linkedin} className='team_linkedin' alt='' /></span>
                   <span><img src={twitter} className='team_linkedin' alt='' /></span>
                   </div>
                   </MDBCol>
                   <MDBCol md='2' className='no_padding team_space'>
                   <img src={team10} alt='' className='team8'/>
                   <div  className='name'>Bradley Grosh</div>
                   <div  className='desig'>Manager</div>
                   <div>
                   <span  className='headshot'>Headshot</span>
                   <span><img src={seperator} className='team_seperator' alt='' /></span>
                   <span><img src={linkedin} className='team_linkedin' alt='' /></span>
                   <span><img src={twitter} className='team_linkedin' alt='' /></span>
                   </div>
                   </MDBCol>
                   <MDBCol md='2' className='no_padding team_space'>
                   <img src={team11} alt='' className='team8'/>
                   <div  className='name'>John Anderson</div>
                   <div  className='desig'>Manager</div>
                   <div>
                   <span  className='headshot'>Headshot</span>
                   <span><img src={seperator} className='team_seperator' alt='' /></span>
                   <span><img src={linkedin} className='team_linkedin' alt='' /></span>
                   <span><img src={twitter} className='team_linkedin' alt='' /></span>
                   </div>
                   </MDBCol>
                   <MDBCol md='2' className='no_padding team_space'>
                   <img src={team12} alt='' className='team8'/>
                   <div  className='name'>John Anderson</div>
                   <div  className='desig'>Manager</div>
                   <div>
                   <span  className='headshot'>Headshot</span>
                   <span><img src={seperator} className='team_seperator' alt='' /></span>
                   <span><img src={linkedin} className='team_linkedin' alt='' /></span>
                   <span><img src={twitter} className='team_linkedin' alt='' /></span>
                   </div>
                   </MDBCol>
                   <MDBCol md='2' className='no_padding team_space'>
                   <img src={team8} alt='' className='team8'/>
                   <div  className='name'>John Anderson</div>
                   <div  className='desig'>Manager</div>
                   <div>
                   <span  className='headshot'>Headshot</span>
                   <span><img src={seperator} className='team_seperator' alt='' /></span>
                   <span><img src={linkedin} className='team_linkedin' alt='' /></span>
                   <span><img src={twitter} className='team_linkedin' alt='' /></span>
                   </div>
                   </MDBCol>
                   <MDBCol md='2' className='no_padding team_space'>
                   <img src={team9} alt='' className='team8'/>
                   <div  className='name'>Ann Johnson </div>
                   <div  className='desig'>IT Department</div>
                   <div>
                   <span  className='headshot'>Headshot</span>
                   <span><img src={seperator} className='team_seperator' alt='' /></span>
                   <span><img src={linkedin} className='team_linkedin' alt='' /></span>
                   <span><img src={twitter} className='team_linkedin' alt='' /></span>
                   </div>
                   </MDBCol>
                   <MDBCol md='2' className='no_padding team_space'>
                   <img src={team10} alt='' className='team8'/>
                   <div  className='name'>Bradley Grosh</div>
                   <div  className='desig'>Manager</div>
                   <div>
                   <span  className='headshot'>Headshot</span>
                   <span><img src={seperator} className='team_seperator' alt='' /></span>
                   <span><img src={linkedin} className='team_linkedin' alt='' /></span>
                   <span><img src={twitter} className='team_linkedin' alt='' /></span>
                   </div>
                   </MDBCol>
                   <MDBCol md='2' className='no_padding team_space'>
                   <img src={team11} alt='' className='team8'/>
                   <div  className='name'>John Anderson</div>
                   <div  className='desig'>Manager</div>
                   <div>
                   <span  className='headshot'>Headshot</span>
                   <span><img src={seperator} className='team_seperator' alt='' /></span>
                   <span><img src={linkedin} className='team_linkedin' alt='' /></span>
                   <span><img src={twitter} className='team_linkedin' alt='' /></span>
                   </div>
                   </MDBCol>
                   <MDBCol md='2' className='no_padding team_space'>
                   <img src={team12} alt='' className='team8'/>
                   <div  className='name'>John Anderson</div>
                   <div  className='desig'>Manager</div>
                   <div>
                   <span  className='headshot'>Headshot</span>
                   <span><img src={seperator} className='team_seperator' alt='' /></span>
                   <span><img src={linkedin} className='team_linkedin' alt='' /></span>
                   <span><img src={twitter} className='team_linkedin' alt='' /></span>
                   </div>
                   </MDBCol>
                   
               </MDBRow>
               
               <MDBRow>
                   <MDBCol md='6'>
                   <div style={{textAlign:'center'}}>
               <img src={team13} alt='' className='team9'/>
                   <div className='subhead1' >Lorem ipsum dolor</div>
                   <div className='team_contant1'>Your customers are your most important source of feedback</div>
                   <div style={{}}>
                          <button  className='team_learn_more'>
                          Learn more
                          </button>
                        </div>
               </div>
                   </MDBCol>

                   <MDBCol md='6'>
                   <div style={{textAlign:'center'}}>
               <img src={team14} alt='' className='team9'/>
                   <div className='subhead1' >Lorem ipsum dolor</div>
                   <div className='team_contant1' >Your customers are your most important source of feedback</div>
                   <div >
                          <button  className='team_learn_more'>
                          Learn more
                          </button>
                        </div>
               </div>
                   </MDBCol>
               </MDBRow>
             
               </MDBContainer>
            
            <Footer />
            </div>
        )
    }
}
