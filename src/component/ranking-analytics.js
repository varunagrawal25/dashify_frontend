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
// import MultipleValueTextInput from 'react-multivalue-text-input';
// import { WithContext as ReactTags } from 'react-tag-input';
import { InputTag } from "./MultiTextInput";
import { Add_Keyword ,Get_Keywords} from "./apis/keyword";

import { secure_pin } from "../config";
import { Link } from "react-router-dom";
const KeyCodes = {
  comma: 188,
  enter: 13,
};
// const delimiters = [KeyCodes.comma, KeyCodes.enter];
export default class RankingAnalytics extends Component {

  constructor(props) {
    super(props)

    this.handler = this.handler.bind(this)
    this.state={
      tags:[],
      CsvFile:'',
      isCsv:false
    }
  }

  handler(tag) {
    console.log("hand",tag)
    this.setState({
      tags: tag
    })
  }

  submit=e=>{
    console.log("sub", this.state.tags);

    if(this.state.tags){
    var keyword_array=[];
    var arra=this.state.tags;

    arra.map(a=>{
      keyword_array.push(
        {
          "keyword_name":a
        }
      )
    })
   console.log( keyword_array)

    const data=
    {
      secure_pin,
      "user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId"),
      "keyword_array":keyword_array,

      "import_csv":this.state.isCsv,
      "csv_file":this.state.CsvFile
    }
    console.log("data",data)
    Add_Keyword(data).then(resp=>{
      console.log( resp);
      const data=
      {
        secure_pin,"user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId")
      }
      Get_Keywords(data).then(resp=>{
        console.log( resp)
        this.setState({
          AllKey:resp.data.keyword_list
        })
      })
      .catch(resp=>{
  
      })

    })
    .catch(resp=>{

    })

  }
  }

  componentDidMount(){
    const data=
    {
      secure_pin,"user_id":localStorage.getItem("UserId") ,"location_id":localStorage.getItem("locationId")
    }
    Get_Keywords(data).then(resp=>{
      console.log( resp)
      this.setState({
        AllKey:resp.data.keyword_list
      })
    })
    .catch(resp=>{

    })
  }

  onUploadCsv=event=>{
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      this.setState({ CsvFile: (e.target.result), isCsv:true });

      console.log((e.target.result))
    };
  }
   
  render() {
    console.log(this.state)

    var  {AllKey } = this.state;
    var AllKeywords=[];
    if(AllKey){
     AllKey.map(k=>{

     var temp=   { keyword: k.keyword,
        google_local_rank:'No Match', 
        google_organic_rank: 'No Match', 
        bing_search_rank: 'No Match' ,
        yahoo_search_rank:'No Match'}

        AllKeywords.push(temp)
      
      }
      )
    }
    // console.log("inp", InputTag.relo)

    console.log("inp", this.state.tags)
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
              <MDBBtn className="ranking_keyword_btn" data-toggle="modal" data-target="#myModalkey">
                  Add New Keyword
                </MDBBtn>
            </MDBCol>
          </MDBRow>
          <div class="modal fade" id="myModalkey" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
      <div className="modal-header modal_header">
                <h4 className="modal-title modal_header_heading" style={{marginLeft:'0px'}}>Add New Keywords</h4>
                <button
                  type="button"
                  className="modal_header_icon"
                  data-dismiss="modal" 
                >
                  &times;
                </button>
              </div>

        
        <div class="modal-body" >
          <div>
<MDBRow className='raModal_head'>
  Enter keywords that you would like for us to monitor your rankings for

  {/* <ReactTags 
  tags={tags}
                   suggestions={suggestions}
                   handleDelete={this.handleDelete} 
                   handleAddition={this.handleAddition}
                   handleDrag={this.handleDrag}
                    delimiters={delimiters} />    */}
</MDBRow> 
<div><InputTag  handler={this.handler}/></div>
</div>
<MDBRow> 

</MDBRow>

<div  className='ra_db'>
  <MDBRow >
    <MDBCol md='8' className='raModal_contant'>
      Or, upload csv containing keywords.<br/>
    <span style={{color:'#5d80e2'}}> <a href="/csv/keyword.csv" target="_blank" rel="noopener noreferrer" download> Check Sample</a></span>
    </MDBCol>
    <MDBCol md='4'>
      <MDBBtn>
        <input type='file' title='Upload file' onChange={this.onUploadCsv}/>
      </MDBBtn>
    </MDBCol>
  </MDBRow>
</div>
<MDBRow>
  <MDBCol md='3'>
  <MDBBtn className="cp_btn"  onClick={this.submit}> 
           Submit Keywords
            </MDBBtn>
  </MDBCol>
  <MDBCol md='3'>
  <MDBBtn style={{margin:'15px 0px',border:'none'}} > 
           Cancel
            </MDBBtn>
  </MDBCol>
</MDBRow>
          </div>
          </div>
          </div>
          </div>
          <MDBRow>
            <MDBCol md="8">
              <div className="review_container"> Not enough data for Graph</div>
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
                <div className="ranking_analytics_contant5"> -</div>
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
                <div className="ranking_analytics_contant5"> -</div>
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
                <div className="ranking_analytics_contant5"> -</div>
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
                <div className="ranking_analytics_contant5"> - </div>
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

      data={AllKeywords?AllKeywords:[]}
      // data={[
      //   { keyword: 'Italian Pizza Midtown',
      //   google_local_rank:'No Match', 
      //   google_organic_rank: 'No Match', 
      //   bing_search_rank: 'No Match' ,
      //   yahoo_search_rank:'No Match'},
      
      //   { keyword: 'Marinara Pizza Midtown',
      //   google_local_rank:'No Match', 
      //   google_organic_rank: 'No Match', 
      //   bing_search_rank: 'No Match' ,
      //   yahoo_search_rank:'No Match'},

      //   { keyword: 'Pizza King Dhanamandi',
      //   google_local_rank:'No Match', 
      //   google_organic_rank: 'No Match', 
      //   bing_search_rank: 'No Match' ,
      //   yahoo_search_rank:'No Match'},
       
      // ]}
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
