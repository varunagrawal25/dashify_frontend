import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import ranking_analytics_img1 from "./assets/ranking_analytics_img1.png";
import ranking_analytics_img2 from "./assets/ranking_analytics_img2.png";
import ranking_analytics_img3 from "./assets/ranking_analytics_img3.png";
import ranking_analytics_img4 from "./assets/ranking_analytics_img4.png";
import up_arrow from "./assets/up_arrow.png";
import down_arrow from "./assets/down_arrow_icon.png";
import left_arrow from "./assets/left_arrow.png";
import right_arrow from "./assets/right_arrow.png";
import MaterialTable from 'material-table';

export default class RankingAnalytics extends Component {
  render() {
    return (
      <div>
        <MDBContainer id='rankana'>
          <MDBRow>
            <MDBCol className="setting-10" >
              <h3> Ranking Analytics</h3>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol md="4" style={{ marginTop: "20px" }}>
              <div className="ranking_analytics_contant1">
                Google Local Average Ranking
              </div>
            </MDBCol>
            <MDBCol md="2">
              <select className="review_select_btn">
                <option selected value="week">
                  This Week
                </option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </MDBCol>

            <MDBCol md="2" className="no_left_padding">
              <select className="ranking_keyword_btn" >
                <option selected value="Add new keyword" className='ranking_keyword_btn_options'>
                  Add New Keyword
                </option>
                <option value="Add new keyword" className='ranking_keyword_btn_options'>Keyword1</option>
                <option value="Add new keyword" className='ranking_keyword_btn_options'>Keyword2</option>
              </select>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol md="8">
              <div className="review_container"></div>
            </MDBCol>
            <MDBCol md="4">
              <MDBRow>
                <MDBCol md="6">
                  <div className="review_container">
                    <div className="ranking_analytics_contant1">Ranking</div>
                    <div className="ranking_analytics_contant2">05</div>
                    <div className="ranking_analytics_contant3">
                      <span>
                        <img src={left_arrow} alt="" />{" "}
                      </span>
                      <span className="ranking_icon">00</span>
                      <span>
                        <img src={right_arrow} alt="" />{" "}
                      </span>
                    </div>

                    <div className="ranking_analytics_contant4">
                      Ranking 1-3{" "}
                    </div>
                  </div>
                </MDBCol>
                <MDBCol md="6">
                  <div className="review_container">
                    <div className="ranking_analytics_contant1">Ranking</div>
                    <div className="ranking_analytics_contant2">08</div>
                    <div className="ranking_analytics_contant3">
                      <span className="ranking_icon">00</span>
                      <span>
                        <img src={down_arrow} alt="" />{" "}
                      </span>
                    </div>
                    <div className="ranking_analytics_contant4">
                      Ranking 4-10{" "}
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6">
                  <div className="review_container">
                    <div className="ranking_analytics_contant1">Ranking</div>
                    <div className="ranking_analytics_contant2">12</div>
                    <div className="ranking_analytics_contant3">
                      <span className="ranking_icon">00</span>
                      <span>
                        <img src={up_arrow} alt="" />{" "}
                      </span>
                    </div>
                    <div className="ranking_analytics_contant4">
                      Ranking 11-25{" "}
                    </div>
                  </div>
                </MDBCol>
                <MDBCol md="6">
                  <div className="review_container">
                    <div className="ranking_analytics_contant1">Ranking</div>
                    <div className="ranking_analytics_contant2">05</div>
                    <div className="ranking_analytics_contant3">
                      <span>
                        <img src={left_arrow} alt="" />{" "}
                      </span>
                      <span className="ranking_icon">00</span>
                      <span>
                        <img src={right_arrow} alt="" />{" "}
                      </span>
                    </div>
                    <div className="ranking_analytics_contant4">
                      Ranking 26-50{" "}
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="3">
              <div className="review_container">
                <div>
                  <img
                    src={ranking_analytics_img1}
                    className="ranking_analytics_img"
                  />{" "}
                </div>
                <div className="ranking_analytics_contant5">03</div>
                <div className="ranking_analytics_contant6">
                  Rising Keywords
                </div>
                <div className="ranking_analytics_contant7">
                  Keyword that have moved up in the rank
                </div>
              </div>
            </MDBCol>

            <MDBCol md="3">
              <div className="review_container">
                <div>
                  <img
                    src={ranking_analytics_img2}
                    className="ranking_analytics_img"
                  />{" "}
                </div>
                <div className="ranking_analytics_contant5">07</div>
                <div className="ranking_analytics_contant6">
                  Declining Keywords
                </div>
                <div className="ranking_analytics_contant7">
                  Keyword that have moved up in the rank
                </div>
              </div>
            </MDBCol>

            <MDBCol md="3">
              <div className="review_container">
                <div>
                  <img
                    src={ranking_analytics_img3}
                    className="ranking_analytics_img"
                  />{" "}
                </div>
                <div className="ranking_analytics_contant5">25</div>
                <div className="ranking_analytics_contant6">Ranking Top 25</div>
                <div className="ranking_analytics_contant7">
                  Keyword that have moved up in the rank
                </div>
              </div>
            </MDBCol>

            <MDBCol md="3">
              <div className="review_container">
                <div>
                  <img
                    src={ranking_analytics_img4}
                    className="ranking_analytics_img"
                  />{" "}
                </div>
                <div className="ranking_analytics_contant5">50</div>
                <div className="ranking_analytics_contant6">Ranking Top 50</div>
                <div className="ranking_analytics_contant7">
                  Keyword that have moved up in the rank
                </div>
              </div>
            </MDBCol>
          </MDBRow>

          {/* <Datatable/> */}
          <div style={{margin:'30px 0px'}}>
                    <MaterialTable 
                    
      columns={[
        {
          title: 'Keyword (17)', field: 'keyword',
          cellStyle: {
            backgroundColor: '#E4F2FF',
            border:'none',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '16px',
            color: '#000000',
            opacity: '0.6',
           
          }
        },
       
        { title: 'Google Local Rank', field: 'google_local_rank' },
        { title: 'Google Organic Rank', field: 'google_organic_rank' },
        { title: 'Bing Search Rank', field: 'bing_search_rank'},
        { title: 'Yahoo Search Rank', field: 'yahoo_search_rank' },
      ]}
      data={[
        { keyword: 'Italian Pizza Midtown',
        google_local_rank:'No Match', 
        google_organic_rank: 'No Match', 
        bing_search_rank: 'No Match' ,
        yahoo_search_rank:'No Match'},
      
        { keyword: 'Marinara Pizza Midtown',
        google_local_rank:'No Match', 
        google_organic_rank: 'No Match', 
        bing_search_rank: 'No Match' ,
        yahoo_search_rank:'No Match'},

        { keyword: 'Pizza King Dhanamandi',
        google_local_rank:'No Match', 
        google_organic_rank: 'No Match', 
        bing_search_rank: 'No Match' ,
        yahoo_search_rank:'No Match'},
       
      ]}
      options={{
        disableGutters:true,
        varient:false,
        search:false,
        paging:false,
        sorting:true,
        showTitle:false,
        headerStyle: {
          backgroundColor: '#73B6E5',
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '14px',
          lineHeight: '16px',
          textAlign:'center',
          color: '#ffffff',
        },
        cellStyle: {
          fontFamily: 'Roboto',
fontStyle: 'normal',
fontWeight: '500',
fontSize: '14px',
lineHeight: '16px',
border:'none',
color: '#000000',
textAlign:'center',
opacity: '0.6',
        }
      }}
    />
      </div>    
          {/* <div style={{ margin: "40px 0px" }}>
            <div className="analytics-whice">
              <div className="box-space2">
                <table
                  id="example"
                  className="analytics-whice"
                  cellSpacing="0"
                  width="100%"
                >
                  <thead>
                    <tr className="thead-color">
                      <th className="table_heading">Keword (17)</th>
                      <th className="table_heading">Google Local Rank</th>
                      <th className="table_heading">Google Organic Rank</th>
                      <th className="table_heading">Bing Search Rank</th>
                      <th className="table_heading">Yahoo Search Rank</th>
                    </tr>
                  </thead>

                  <tbody className="cons">
                    <tr>
                      <td className="table_col1">Italian Pizza Midtown</td>
                      <td>
                        <div className="table_col1">
                          <span>41</span>
                          <span className="table_col2">
                            5 <img src={up_arrow} alt="" />
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="table_col1">No Match</div>
                      </td>
                      <td>
                        <div className="table_col1">No Match</div>
                      </td>
                      <td>
                        <div className="table_col1">No Match</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="table_col1">Marinara Pizza Midtown </td>
                      <td>
                        <div className="table_col1">
                          <span>41</span>
                          <span className="table_col2">
                            5 <img src={up_arrow} alt="" />
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="table_col1">No Match</div>
                      </td>
                      <td>
                        <div className="table_col1">No Match</div>
                      </td>
                      <td>
                        <div className="table_col1">No Match</div>
                      </td>
                    </tr>

                    <tr>
                      <td className="table_col1">Pizza King Dhanamandi</td>
                      <td>
                        <div className="table_col1">
                          <span>41</span>
                          <span className="table_col2">
                            5 <img src={up_arrow} alt="" />
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="table_col1">No Match</div>
                      </td>
                      <td>
                        <div className="table_col1">No Match</div>
                      </td>
                      <td>
                        <div className="table_col1">No Match</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}

          {/* <MDBRow>
             <MDBCol md='7'>
              <MDBRow>
                <MDBCol md='4'>
                  <div>Keyword (17)</div>
                </MDBCol>

                <MDBCol md='4'>
                  <div>
                    <span>Google Local Rank</span>
                  </div>
                </MDBCol>

                <MDBCol md='4'>
                  <div >Google Organic Rank</div>
                </MDBCol>
              </MDBRow>
             </MDBCol>

             <MDBCol md='5'>
              <MDBRow>
                <MDBCol md='6'>
                  <div>
                    <span>Bing Search Rank</span>
                  </div>
                </MDBCol>

                <MDBCol md='6'>
                  <div >Yahoo  Search Rank</div>
                </MDBCol>
              </MDBRow>
             </MDBCol>
           </MDBRow>  */}
        </MDBContainer>
      </div>
    );
  }
}
