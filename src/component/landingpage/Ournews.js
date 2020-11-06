import React, {Component} from 'react'
import Footer from "./footer";
import Navbar from "./navbar";
import arrow from '../assets/arrow.png'
import news1 from '../assets/news1.png'
import news2 from '../assets/news2.png'
import news3 from '../assets/news3.png'
import news4 from '../assets/news4.png'
import youtube from '../assets/youtube.png'
import { MDBCol, MDBRow ,MDBContainer} from 'mdbreact';
// import Pagination from "react-js-pagination";
import Pagination from '@material-ui/lab/Pagination';
export default class Ournews extends Component {
  constructor(props){
    super(props);
      this.state={
        activePage:1
      }
    
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }
  render() {
    return (
       <div className='white_background'>
                <Navbar />
                
                <MDBContainer className='container_margin'>
               <div  className='team_heading'>What's new?</div> 
               <div className='team_contant' >
                   <p style={{width:'60%'}}>
                   Find  solutions to customer service, general inquiry, product problem, business partnership, 
                   software upgrade, refund policy and any other issues related to Dashify
                   </p>
               </div>
         
<MDBRow className='news_hr1'>
  <MDBCol md='2' className='news_month1'>
  August 2020
  </MDBCol>
  <MDBCol md='2' className='news_month2'> 
    September 2020
  </MDBCol>
  <MDBCol style={{padding:'0px'}}><img src={arrow} alt=''/></MDBCol>
</MDBRow>

     <MDBRow style={{marginTop:'50px'}}>
       <MDBCol md='4' className='news_box' >
         <MDBRow>
           <MDBCol md='12'>
           <div className='date' >02.04.2020</div>
         <div className='sub_news_heading' >Search Is the Most Critical Issue for Your Brand This Year</div>
         <div className='news_contant'>
           With 90% of consumers reporting that they use search at every stage of the customer lifecycle.
            With 90% of consumers reporting that they use search at every stage of the customer lifecycle.
                  With 90% of consumers reporting that they use search at every stage of the customer
          </div>
          <hr className='news_hr'/>
           </MDBCol>
           <MDBCol md='12'>
           <div className='date' >02.04.2020</div>
         <div className='sub_news_heading' >Search Is the Most Critical Issue for Your Brand This Year</div>
         <div className='news_contant'>
           With 90% of consumers reporting that they use search at every stage of the customer lifecycle.
            With 90% of consumers reporting that they use search at every stage of the customer lifecycle.
                  With 90% of consumers reporting that they use search at every stage of the customer
          </div>
           </MDBCol>
         </MDBRow>
       </MDBCol>

       <MDBCol md='4' className='news_box news_vl'>
        <MDBRow>
          <MDBCol md='12'>
          <img src={news1} alt='news1' className='news_img1'/>
          <div className='sub_news_heading' >Search Is the Most Critical Issue for Your Brand This Year</div>
         <div className='news_contant'>
           With 90% of consumers reporting that they use search at every stage of the customer lifecycle.
            With 90% of consumers reporting that they use search at every stage of the customer lifecycle.
                  With 90% of consumers reporting that they use search at every stage of the customer
          </div>
          <hr className='news_hr'/>
          </MDBCol>
          <MDBCol md='12'>
          <img src={news2} alt='news1' className='news_img1'/>
          <div className='sub_news_heading' >Search Is the Most Critical Issue for Your Brand This Year</div>
         <div className='news_contant'>
           With 90% of consumers reporting that they use search at every stage of the customer lifecycle.
            With 90% of consumers reporting that they use search at every stage of the customer lifecycle.
                  With 90% of consumers reporting that they use search at every stage of the customer
          </div>
          </MDBCol>
        </MDBRow>
       </MDBCol>
       
       <MDBCol md='4' className='news_box'>
         <div className='sub_news_heading' >Videos</div>
        <MDBRow>
          <MDBCol md='12'>
          <img src={youtube} alt='' className='youtube'/>
          <img src={news3} alt='news1' className='news_img2'/>
          <div className='sub_news_heading' >Specify Service Items for You</div>
          <hr className='news_hr'/>
          </MDBCol>
          <MDBCol md='12'>
          <img src={youtube} alt='' className='youtube'/>
          <img src={news4} alt='news1' className='news_img2'/>
          <div className='sub_news_heading' >Specify Service Items for You</div>
          
          </MDBCol>
        </MDBRow>
       </MDBCol>
       
       </MDBRow>      
<div className='pagination_margin'>
<Pagination count={3} shape="rounded" />
</div>
         
      </MDBContainer>
      <div className="seeshow" style={{marginTop:'-100px'}}>
          <div className="container">
            <h2>
              See how your business can deliver verified
              <br />
              answers to searching consumers, helping <br />
              drive discovery and revenue
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
      <Footer />
    </div>
            
        
    )
}
}

