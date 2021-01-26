import React, { Component } from 'react'
import {MDBCol,MDBRow,MDBDataTableV5, MDBContainer,MDBBtn} from 'mdbreact';
import { CircularProgressbarWithChildren , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Checkbox } from '@material-ui/core';
import google from '../assets/google.png'
import bing from '../assets/bing.png'
import yelp from '../assets/yelp.png'
import scanner_img1 from '../assets/scanner_img1.png'
import scanner_img2 from '../assets/scanner_img2.png'
import scanner_img3 from '../assets/scanner_img3.png'
import scanner_img4 from '../assets/scanner_img4.png'
import scanner_img5 from '../assets/scanner_img5.png'
import check_img from '../assets/check_img.png'
import cross_img from '../assets/cross_img.png'
import Footer from "./footer";
import Navbar from "./navbar";
//import Radial_chart from '../utils/Radial_chart';
export default class Scanner extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
}
    render() {
        const datatable = {
            
          columns: [
            {
              label: '',
              field: 'name',
              width: 150,
              attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'Name',
              },
            },
            {
              label: '',
              field: 'position',
              width: 270,
            },
            {
              label: 'Office',
              field: 'office',
              width: 200,
            },
            {
              label: 'Age',
              field: 'age',
              sort: 'asc',
              width: 100,
            },
            {
              label: 'Start date',
              field: 'date',
              sort: 'disabled',
              width: 150,
            },
            {
              label: 'Salary',
              field: 'salary',
              sort: 'disabled',
              width: 100,
            },
          ],
          rows: [
            {
              name: 'Garrett Winters',
              position: 'Accountant',
              office: 'Tokyo',
              age: '63',
              date: '2011/07/25',
              salary: '$170',
            },
            {
              name: 'Ashton Cox',
              position: 'Junior Technical Author',
              office: 'San Francisco',
              age: '66',
              date: '2009/01/12',
              salary: '$86',
            },
            {
              name: 'Cedric Kelly',
              position: 'Senior Javascript Developer',
              office: 'Edinburgh',
              age: '22',
              date: '2012/03/29',
              salary: '$433',
            },
            {
              name: 'Airi Satou',
              position: 'Accountant',
              office: 'Tokyo',
              age: '33',
              date: '2008/11/28',
              salary: '$162',
            },
          ]
          }
        return (
            <div>
              <Navbar/>
              <MDBContainer>
                <div className='scanner_heading'>Dashify scan results</div>
                <MDBRow>
                    <MDBCol md='2' className='scanner_radial_chart'>
                    <Radial_chart/>
                
                    {/* <img src={scanner_img1} alt='scanner_img1' id='scanner_img1'/> */}
                    </MDBCol>
                    <MDBCol md='4'>
                        <div className='scanner_contant1'>Steves Plumbing</div>
                        <div className='scanner_contant2'>Kandl Water Condition Inc.</div>
                        <div className='scanner_contant2'>264 Manitoba St. Spicar, 56288, USA</div>
                        <div className='scanner_contant2'>(320)706-50-20</div>
                        <div>
                            <span className='scanner_contant2'>This isn’t my business information</span>
                            <span><Checkbox/></span>
                        </div>
                        <div>
                          <MDBBtn id='scanner_fix_btn'>Fix all errors</MDBBtn>
                        </div>
                    </MDBCol>
                    <MDBCol md='6'>
                    <img src={scanner_img1} alt='' id='scanner_img1' />
                    </MDBCol>
                </MDBRow>
                <div className='scanner_heading'>Directories</div>
                <MDBRow>
                  <MDBCol md='4'>
                    <div className='scanner_box'>
                    <MDBRow>
                        <MDBCol md='8' >
                          <img src={google}  className='scanner_google_img'  />
                        </MDBCol>
                        <MDBCol md='4' >
                        <CircularProgressbarWithChildren value={50}  
                        styles={buildStyles({
                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: 'butt',
                          pathColor: `#8264C6 `,
                          trailColor: '#ffffff',
                        })}>
                          <div className='scanner_contant6'>20%</div>
                          <div className='scanner_contant7'>Score</div>
                          </CircularProgressbarWithChildren>;
                        </MDBCol>
                      </MDBRow>
                    
                      <MDBRow>
                        <MDBCol md='3'>
                        <div className='scanner_contant1'>Link</div>
                        </MDBCol>
                        <MDBCol md='9'>
                        <div><Checkbox/></div>
                        </MDBCol>
                      </MDBRow>

                      <MDBRow>
                        <MDBCol md='3'>
                        <div className='scanner_contant1'>Name:</div>
                        </MDBCol>
                        <MDBCol md='9'>
                        <div className='scanner_contant2'>Kandl Water Condition Inc.</div>
                        </MDBCol>
                      </MDBRow>

                       <MDBRow>
                        <MDBCol md='3'>
                        <div className='scanner_contant1'>Adress:</div>
                        </MDBCol>
                        <MDBCol md='9'>
                        <div className='scanner_contant2'>264 Manitoba St. Spicar, 56288, USA</div>
                        </MDBCol>
                      </MDBRow>

                      <MDBRow>
                        <MDBCol md='3'>
                        <div className='scanner_contant1'>Phone:</div>
                        </MDBCol>
                        <MDBCol md='9'>
                        <div className='scanner_contant2'>(320)706-50-20</div>
                        </MDBCol>
                      </MDBRow>
                     
                  <div className='scanner_contant3'>Detailed breakdown</div>

                  <MDBRow>
                    <MDBCol md='9'>
                    <div className='scanner_contant2'>Categories</div>
                    </MDBCol>
                    
                    <MDBCol md='3'>
                      <MDBBtn className='scanner_yes_btn'>Yes</MDBBtn>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md='9'>
                    <div className='scanner_contant2'>Website URL Present</div>
                    </MDBCol>
                    
                    <MDBCol md='3'>
                      <MDBBtn className='scanner_yes_btn'>Yes</MDBBtn>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md='9'>
                    <div className='scanner_contant2'>Hours of operation</div>
                    </MDBCol>
                    
                    <MDBCol md='3'>
                      <MDBBtn className='scanner_yes_btn'>Yes</MDBBtn>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md='9'>
                    <div className='scanner_contant2'>Photos present</div>
                    </MDBCol>
                    
                    <MDBCol md='3'>
                      <MDBBtn className='scanner_yes_btn'>Yes</MDBBtn>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md='9'>
                    <div className='scanner_contant2'>Reviews</div>
                    </MDBCol>
                    
                    <MDBCol md='3'>
                      <MDBBtn className='scanner_yes_btn'>Yes</MDBBtn>
                    </MDBCol>
                  </MDBRow>
                 </div>
                  </MDBCol>

                  <MDBCol md='4'>
                    <div className='scanner_box'>
                    <MDBRow>
                        <MDBCol md='8' >
                          <img src={bing}  className='scanner_bing_img'  />
                        </MDBCol>
                        <MDBCol md='4' >
                        <CircularProgressbarWithChildren value={98}  
                        styles={buildStyles({
                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: 'butt',
                          pathColor: `#8264C6 `,
                          trailColor: '#ffffff',
                        })}>
                          <div className='scanner_contant6'>98%</div>
                          <div className='scanner_contant7'>Score</div>
                          </CircularProgressbarWithChildren>;
                        </MDBCol>
                      </MDBRow>
                    
                      <MDBRow>
                        <MDBCol md='3'>
                        <div className='scanner_contant1'>Link</div>
                        </MDBCol>
                        <MDBCol md='9'>
                        <div><Checkbox/></div>
                        </MDBCol>
                      </MDBRow>

                      <MDBRow>
                        <MDBCol md='3'>
                        <div className='scanner_contant1'>Name:</div>
                        </MDBCol>
                        <MDBCol md='9'>
                        <div className='scanner_contant2'>Kandl Water Condition Inc.</div>
                        </MDBCol>
                      </MDBRow>

                       <MDBRow>
                        <MDBCol md='3'>
                        <div className='scanner_contant1'>Adress:</div>
                        </MDBCol>
                        <MDBCol md='9'>
                        <div className='scanner_contant2'>264 Manitoba St. Spicar, 56288, USA</div>
                        </MDBCol>
                      </MDBRow>

                      <MDBRow>
                        <MDBCol md='3'>
                        <div className='scanner_contant1'>Phone:</div>
                        </MDBCol>
                        <MDBCol md='9'>
                        <div className='scanner_contant2'>(320)706-50-20</div>
                        </MDBCol>
                      </MDBRow>
                     
                  <div className='scanner_contant3'>Detailed breakdown</div>

                  <MDBRow>
                    <MDBCol md='9'>
                    <div className='scanner_contant2'>Categories</div>
                    </MDBCol>
                    
                    <MDBCol md='3'>
                      <MDBBtn className='scanner_yes_btn'>Yes</MDBBtn>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md='9'>
                    <div className='scanner_contant2'>Website URL Present</div>
                    </MDBCol>
                    
                    <MDBCol md='3'>
                      <MDBBtn className='scanner_yes_btn'>Yes</MDBBtn>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md='9'>
                    <div className='scanner_contant2'>Hours of operation</div>
                    </MDBCol>
                    
                    <MDBCol md='3'>
                      <MDBBtn className='scanner_yes_btn'>Yes</MDBBtn>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md='9'>
                    <div className='scanner_contant2'>Photos present</div>
                    </MDBCol>
                    
                    <MDBCol md='3'>
                      <MDBBtn className='scanner_yes_btn'>Yes</MDBBtn>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md='9'>
                    <div className='scanner_contant2'>Reviews</div>
                    </MDBCol>
                    
                    <MDBCol md='3'>
                      <MDBBtn className='scanner_yes_btn'>Yes</MDBBtn>
                    </MDBCol>
                  </MDBRow>
                 </div>
                  </MDBCol>

                  <MDBCol md='4'>
                    <div className='scanner_box'>
                    <MDBRow>
                        <MDBCol md='8' >
                          <img src={yelp}  className='scanner_yelp_img'  />
                        </MDBCol>
                        <MDBCol md='4' >
                        <CircularProgressbarWithChildren value={80}  
                        styles={buildStyles({
                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: 'butt',
                          pathColor: `#8264C6 `,
                          trailColor: '#ffffff',
                        })}>
                          <div className='scanner_contant6'>80%</div>
                          <div className='scanner_contant7'>Score</div>
                          </CircularProgressbarWithChildren>;
                        </MDBCol>
                      </MDBRow>
                    
                      <MDBRow>
                        <MDBCol md='3'>
                        <div className='scanner_contant1'>Link</div>
                        </MDBCol>
                        <MDBCol md='9'>
                        <div><Checkbox/></div>
                        </MDBCol>
                      </MDBRow>

                      <MDBRow>
                        <MDBCol md='3'>
                        <div className='scanner_contant1'>Name:</div>
                        </MDBCol>
                        <MDBCol md='9'>
                        <div className='scanner_contant2'>Kandl Water Condition Inc.</div>
                        </MDBCol>
                      </MDBRow>

                       <MDBRow>
                        <MDBCol md='3'>
                        <div className='scanner_contant1'>Adress:</div>
                        </MDBCol>
                        <MDBCol md='9'>
                        <div className='scanner_contant2'>264 Manitoba St. Spicar, 56288, USA</div>
                        </MDBCol>
                      </MDBRow>

                      <MDBRow>
                        <MDBCol md='3'>
                        <div className='scanner_contant1'>Phone:</div>
                        </MDBCol>
                        <MDBCol md='9'>
                        <div className='scanner_contant2'>(320)706-50-20</div>
                        </MDBCol>
                      </MDBRow>
                     
                  <div className='scanner_contant3'>Detailed breakdown</div>

                  <MDBRow>
                    <MDBCol md='9'>
                    <div className='scanner_contant2'>Categories</div>
                    </MDBCol>
                    
                    <MDBCol md='3'>
                      <MDBBtn className='scanner_yes_btn'>Yes</MDBBtn>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md='9'>
                    <div className='scanner_contant2'>Website URL Present</div>
                    </MDBCol>
                    
                    <MDBCol md='3'>
                      <MDBBtn className='scanner_yes_btn'>Yes</MDBBtn>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md='9'>
                    <div className='scanner_contant2'>Hours of operation</div>
                    </MDBCol>
                    
                    <MDBCol md='3'>
                      <MDBBtn className='scanner_yes_btn'>Yes</MDBBtn>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md='9'>
                    <div className='scanner_contant2'>Photos present</div>
                    </MDBCol>
                    
                    <MDBCol md='3'>
                      <MDBBtn className='scanner_yes_btn'>Yes</MDBBtn>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md='9'>
                    <div className='scanner_contant2'>Reviews</div>
                    </MDBCol>
                    
                    <MDBCol md='3'>
                      <MDBBtn className='scanner_no_btn'>No</MDBBtn>
                    </MDBCol>
                  </MDBRow>
                 </div>
                  </MDBCol>
                </MDBRow>

                <div className="blog-pagination">
              <ul>
                <li>
                  <img src={require("../assets/arrow-left.png")} />
                </li>
                <li>
                  <span>1</span>
                </li>
                <li>
                  <span>2</span>
                </li>
                <li>
                  <span>3</span>
                </li>
                <li>
                  <img src={require("../assets/arrow-right.png")} />
                </li>
              </ul>
            </div>

            <MDBRow className='scanner_box scanner_margin1' >
              <MDBCol md='2' className='scanner_margin3'>
              <div className='scanner_contant5'>Score Breakdown</div>
              </MDBCol>
              <MDBCol md='2' className='scanner_box2'>
                <MDBRow>
                  <MDBCol md='8' className='scanner_nopadding'>
                  <div className='scanner_contant4'>Listings present</div>
                  </MDBCol>
                  <MDBCol md='4' className='scanner_nopadding'>
<MDBBtn className='scanner_btn'>39</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCol>

              <MDBCol md='2' className='scanner_box2'>
                <MDBRow>
                  <MDBCol md='8' className='scanner_nopadding'>
                  <div className='scanner_contant4'>Listings checked</div>
                  </MDBCol>
                  <MDBCol md='4' className='scanner_nopadding'>
<MDBBtn className='scanner_btn'>39</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol md='2' className='scanner_box2'>
                <MDBRow>
                  <MDBCol md='8' className='scanner_nopadding'>
                  <div className='scanner_contant4'> Presence score</div>
                  </MDBCol>
                  <MDBCol md='4' className='scanner_nopadding'>
<MDBBtn className='scanner_btn'>39</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol md='2' className='scanner_margin4' >
                        <CircularProgressbarWithChildren value={83}  
                        styles={buildStyles({
                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: 'butt',
                          pathColor: `#8264C6 `,
                          trailColor: '#ffffff',
                          width:'115px',
                          height:'115px'
                        })}>
                          <div className='scanner_contant6'>83%</div>
                          <div className='scanner_contant7'>
                            <div>NAP</div>
                            <div>Score</div>
                          </div>
                          </CircularProgressbarWithChildren>;
                        </MDBCol>
            </MDBRow>
            
            {/* <div  >
            <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />
                </div> */}
                <div>
                <MDBRow className='scanner_hr' id='scanner_hr1'>
                  <MDBCol md='2' className='scanner_table_heading offset-md-4'>
                    <div className='scanner_table_heading_contant' >Bussiness Name</div>
                  </MDBCol>
                  <MDBCol md='2' className='scanner_table_heading2 '>
                    <div className='scanner_table_heading_contant' >Address</div>
                  </MDBCol>
                  <MDBCol md='2' className='scanner_table_heading2 '>
                    <div className='scanner_table_heading_contant' >Phone</div>
                  </MDBCol>
                  <MDBCol md='2' className='scanner_table_heading2 '>
                    <div className='scanner_table_heading_contant' >Status</div>
                  </MDBCol>
                </MDBRow>

                <MDBRow className='scanner_hr'>
                  <MDBCol md='1'>
                  <img src={require("../assets/home_icon1.png")} alt="" className='scanner_table_img'/>
                  </MDBCol>
                  <MDBCol md='3' className='scanner_margin_table2'>
                    <div className='scanner_table_contant1'>Google</div>
                    <div className='scanner_table_contant2'>Lorem  Ipsum Dolor</div>
                  </MDBCol>
                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>Lorem ipsum Dolor Sit Amet</div>
                  </MDBCol>

                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>#123 2nd flore, State Loremipsum</div>
                  </MDBCol>

                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>(320)647-53-52</div>
                  </MDBCol>

                   <MDBCol md='2' className='scanner_nopadding scanner_margin_table'>
                    <div>
                    <MDBBtn className='scanner_table_exclam_btn'>!</MDBBtn>
                      <span className='scanner_table_contant3'>Incorrect information</span>
                    </div>
                  </MDBCol>
                </MDBRow>
                

                <MDBRow className='scanner_hr'>
                  <MDBCol md='1'>
                  <img src={require("../assets/home_icon2.png")} alt="" className='scanner_table_img'/>
                  </MDBCol>
                  <MDBCol md='3' className='scanner_margin_table2'>
                    <div className='scanner_table_contant1'>BING</div>
                    <div className='scanner_table_contant2'>Lorem  Ipsum Dolor</div>
                  </MDBCol>
                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>Lorem ipsum Dolor Sit Amet</div>
                  </MDBCol>

                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>#123 2nd flore, State Loremipsum</div>
                  </MDBCol>

                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>(320)647-53-52</div>
                  </MDBCol>

                  <MDBCol md='2'  className='scanner_nopadding scanner_margin_table'>
                    <div>
                     <MDBBtn className='scanner_table_cross_btn'><img src={cross_img} className='check_img'/></MDBBtn>
                      <span className='scanner_table_contant3'>No information</span>
                    </div>
                  </MDBCol>
                </MDBRow>
                

                <MDBRow className='scanner_hr'>
                  <MDBCol md='1'>
                  <img src={require("../assets/home_icon3.png")} alt="" className='scanner_table_img'/>
                  </MDBCol>
                  <MDBCol md='3' className='scanner_margin_table2'>
                    <div className='scanner_table_contant1'>YELP</div>
                    <div className='scanner_table_contant2'>Lorem  Ipsum Dolor</div>
                  </MDBCol>
                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>Lorem ipsum Dolor Sit Amet</div>
                  </MDBCol>

                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>#123 2nd flore, State Loremipsum</div>
                  </MDBCol>

                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>(320)647-53-52</div>
                  </MDBCol>

                   <MDBCol md='2' className='scanner_nopadding scanner_margin_table'>
                    <div>
                    <MDBBtn className='scanner_table_check_btn'><img src={check_img} className='check_img'/></MDBBtn>
                      <span className='scanner_table_contant3'>No information</span>
                    </div>
                  </MDBCol>
                </MDBRow>
                

                <MDBRow className='scanner_hr'>
                  <MDBCol md='1'>
                  <img src={require("../assets/home_icon4.png")} alt="" className='scanner_table_img'/>
                  </MDBCol>
                  <MDBCol md='3' className='scanner_margin_table2'>
                    <div className='scanner_table_contant1'>APPLE</div>
                    <div className='scanner_table_contant2'>Lorem  Ipsum Dolor</div>
                  </MDBCol>
                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>Lorem ipsum Dolor Sit Amet</div>
                  </MDBCol>

                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>#123 2nd flore, State Loremipsum</div>
                  </MDBCol>

                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>(320)647-53-52</div>
                  </MDBCol>

                   <MDBCol md='2' className='scanner_nopadding scanner_margin_table'>
                    <div>
                    <MDBBtn className='scanner_table_check_btn'><img src={check_img} className='check_img'/></MDBBtn>
                      <span className='scanner_table_contant3'>No information</span>
                    </div>
                  </MDBCol>
                </MDBRow>
                

                <MDBRow className='scanner_hr'>
                  <MDBCol md='1'>
                  <img src={require("../assets/home_icon5.png")} alt="" className='scanner_table_img'/>
                  </MDBCol>
                  <MDBCol md='3' className='scanner_margin_table2'>
                    <div className='scanner_table_contant1'>ANGIES LIST</div>
                    <div className='scanner_table_contant2'>Lorem  Ipsum Dolor</div>
                  </MDBCol>
                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>Lorem ipsum Dolor Sit Amet</div>
                  </MDBCol>

                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>#123 2nd flore, State Loremipsum</div>
                  </MDBCol>

                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>(320)647-53-52</div>
                  </MDBCol>

                   <MDBCol md='2' className='scanner_nopadding scanner_margin_table'>
                    <div>
                    <MDBBtn className='scanner_table_check_btn'><img src={check_img} className='check_img'/></MDBBtn>
                      <span className='scanner_table_contant3'>No information</span>
                    </div>
                  </MDBCol>
                </MDBRow>
                

                <MDBRow className='scanner_hr'>
                  <MDBCol md='1'>
                  <img src={require("../assets/home_icon6.png")} alt="" className='scanner_table_img'/>
                  </MDBCol>
                  <MDBCol md='3' className='scanner_margin_table2'>
                    <div className='scanner_table_contant1'>YAHOO</div>
                    <div className='scanner_table_contant2'>Lorem  Ipsum Dolor</div>
                  </MDBCol>
                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>Lorem ipsum Dolor Sit Amet</div>
                  </MDBCol>

                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>#123 2nd flore, State Loremipsum</div>
                  </MDBCol>

                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>(320)647-53-52</div>
                  </MDBCol>

                  <MDBCol md='2'  className='scanner_nopadding scanner_margin_table'>
                    <div>
                     <MDBBtn className='scanner_table_cross_btn'><img src={cross_img} className='check_img'/></MDBBtn>
                      <span className='scanner_table_contant3'>No information</span>
                    </div>
                  </MDBCol>
                </MDBRow>
                

                <MDBRow className='scanner_hr'>
                  <MDBCol md='1'>
                  <img src={require("../assets/home_icon7.png")} alt="" className='scanner_table_img'/>
                  </MDBCol>
                  <MDBCol md='3' className='scanner_margin_table2'>
                    <div className='scanner_table_contant1'>YP</div>
                    <div className='scanner_table_contant2'>Lorem  Ipsum Dolor</div>
                  </MDBCol>
                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>Lorem ipsum Dolor Sit Amet</div>
                  </MDBCol>

                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>#123 2nd flore, State Loremipsum</div>
                  </MDBCol>

                  <MDBCol md='2' className='scanner_margin_table'>
                    <div className='scanner_table_contant3'>(320)647-53-52</div>
                  </MDBCol>

                  <MDBCol md='2'  className='scanner_nopadding scanner_margin_table'>
                    <div>
                     <MDBBtn className='scanner_table_cross_btn'><img src={cross_img} className='check_img'/></MDBBtn>
                      <span className='scanner_table_contant3'>No information</span>
                    </div>
                  </MDBCol>
                </MDBRow>
                

                <MDBRow>
                  <MDBCol className='offset-md-9 scanner_nopadding' md='3'>
                  <a><div id='scanner_contant8'>
                    <span >See all results</span>
                    <span ><img src={require("../assets/arrow.png")} style={{marginLeft:'15px'}}/></span>
                  </div></a>
                  </MDBCol>
                </MDBRow>

                </div>

            <div className='scanner_heading'>Voice search readiness</div>

            <MDBRow className='scanner_box ' >
              <MDBCol md='2' className='scanner_margin3'>
              <div className='scanner_contant5'>Score Breakdown</div>
              </MDBCol>
              <MDBCol md='2' className='scanner_box2'>
                <MDBRow>
                  <MDBCol md='8' className='scanner_nopadding'>
                  <div className='scanner_contant4'>Listings present</div>
                  </MDBCol>
                  <MDBCol md='4' className='scanner_nopadding'>
<MDBBtn className='scanner_btn'>39</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCol>

              <MDBCol md='2' className='scanner_box2'>
                <MDBRow>
                  <MDBCol md='8' className='scanner_nopadding'>
                  <div className='scanner_contant4'>Listings checked</div>
                  </MDBCol>
                  <MDBCol md='4' className='scanner_nopadding'>
<MDBBtn className='scanner_btn'>39</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol md='2' className='scanner_box2'>
                <MDBRow>
                  <MDBCol md='8' className='scanner_nopadding'>
                  <div className='scanner_contant4'> Presence score</div>
                  </MDBCol>
                  <MDBCol md='4' className='scanner_nopadding'>
<MDBBtn className='scanner_btn'>39</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol md='2' className='scanner_margin4' >
                        <CircularProgressbarWithChildren value={100}  
                        styles={buildStyles({
                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: 'butt',
                          pathColor: `#8264C6 `,
                          trailColor: '#ffffff',
                        })}>
                          <div className='scanner_contant6'>100%</div>
                          <div className='scanner_contant7'>
                            <div>Voice Search</div>
                            <div>readiness</div>
                          </div>
                          </CircularProgressbarWithChildren>;
                        </MDBCol>
            </MDBRow>
<div className='scanner_margin1'>
            <MDBRow className='scanner_margin5'>
              <MDBCol md='6' className='scanner_margin2'>
                <MDBRow>
                  <MDBCol md='8'>
                  <img src={scanner_img2}/>
                  </MDBCol>
                  <MDBCol md='4'>
                    <MDBBtn className='scanner_check_btn'><img src={check_img} className='check_img'/></MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCol>

              <MDBCol md='6' className='scanner_margin2'>
                <MDBRow>
                  <MDBCol md='8'>
                  <img src={scanner_img3}/>
                  </MDBCol>
                  <MDBCol md='4'>
                    <MDBBtn className='scanner_check_btn'><img src={check_img} className='check_img'/></MDBBtn>
                  </MDBCol>
                </MDBRow>

              </MDBCol>
            </MDBRow>

            <MDBRow className='scanner_margin5'>
              <MDBCol md='6' className='scanner_margin2'>
                <MDBRow>
                  <MDBCol md='8'>
                  <img src={scanner_img4}/>
                  </MDBCol>
                  <MDBCol md='4'>
                    <MDBBtn className='scanner_cross_btn'><img src={cross_img} className='check_img'/></MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCol>

              <MDBCol md='6' className='scanner_margin2'>
                <MDBRow>
                  <MDBCol md='8'>
                  <img src={scanner_img5} className='scanner_img2'/>
                  </MDBCol>
                  <MDBCol md='4'>
                    <MDBBtn className='scanner_check_btn'><img src={check_img} className='check_img'/></MDBBtn>
                  </MDBCol>
                </MDBRow>

              </MDBCol>
            </MDBRow>
            </div>
                
                </MDBContainer>
           <Footer/>
            </div>
        )
    }
}
