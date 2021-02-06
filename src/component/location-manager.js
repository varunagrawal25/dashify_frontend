import React, { Component } from "react";
import Axios from "axios";
import Spinner from "./common/Spinner";
import { all_location } from "./apis/location";
import { Last } from "react-bootstrap/esm/PageItem";
import { MDBCol, MDBRow } from "mdbreact";
import { secure_pin } from "../config";
const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

export default class ViewLocations extends Component {
  state = {
    loader: true,
    AllLocations: [],
    currentPage: 1,
    LocationsPerPage: 5
  };

  componentDidMount() {
    const DjangoConfig1 = {
      headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
    };
    const data = {
      user_id: localStorage.getItem("UserId"),
      secure_pin
    };
console.log("data55",data)
    all_location(data)
      .then(res => {
        console.log("ll",res);
        console.log("loc",res.data.all_location);

        this.setState({ AllLocations: res.data.all_location, loader: false });
      })
      .catch(res => {
        console.log("error in LocationManager", res);
        this.setState({ loader: false });
      });
  }

  handleClick = event => {
    console.log("handleClick", event.target.id, event);
    this.setState({
      currentPage: Number(event.target.id)
    });
  };

  changeItemsPerPage = event => {
    console.log("items", event.target.value);
  };
  itemsPerPage=(e)=>{
    this.setState({
      LocationsPerPage:e.target.value
    })
  }
  pagebottom=()=>{
    window.scrollTo(0,500)
  }
  render() {
    var link;

    const { AllLocations, currentPage, LocationsPerPage } = this.state;

    // Logic for displaying Locations
    const indexOfLastLocation = currentPage * LocationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - LocationsPerPage;
    const currentLocations = AllLocations.slice(
      indexOfFirstLocation,
      indexOfLastLocation
    );

    const renderLocations = currentLocations.map((loc, index) => {
      return (
        <div className="listdata " key={loc.id}>
          <hr/>
          <div className="row d-flex">
            <div className="col-md-3">
              <div className="authordata ">
                <img
                  src={
                    loc.bussiness_logo
                      ? "https://dashify.biz/Api/assets/upload/images/business-type-image/" + loc.bussiness_logo
                      : require("../images/Logo2.png")
                  }
                  
                />
                <div className="authordatatext">
                  <h4>{loc.location_name}</h4>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="text-center address">
                <h4>{loc.address1}</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center phonenumber">
                <h4>{loc.phone_no}</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center action">
                <div style={{ display: "none" }}>
                  {(link = "dashboard#/locations/" + loc.id + "/view-location")}
                </div>
                <a
                  href={link}
                  onClick={() => {
                    localStorage.setItem("locationId", loc.id.toString());
                    localStorage.setItem("locationName", loc.location_name);
                  }}
                >
                  View Listing
                </a>
              </div>
            </div>
          </div>
       
        </div>
      );
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(AllLocations.length / LocationsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li >
          <button
            key={number}
            className={
              currentPage == number ? "pagination_page_num_selected" : "pagination_page_num"
            }
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </button>
        </li>
      );
    });

    return (
      <div style={{marginBottom:'30px'}}>
        {this.state.loader ? (
          <div>
            <MDBRow>
            <MDBCol md='10'>
            <div className="rightside_title">
                        <h1>Location Manager</h1>
                      </div>
            </MDBCol>
          
          </MDBRow>
          <div className="rightside_title">
            <Spinner />
          </div>
          </div>
        ) : (
          <div>
              {this.state.AllLocations.length == 0 ? (
                <div>
                <MDBRow>
                <MDBCol md='10'>
                <div className="rightside_title">
                            <h1>Location Manager</h1>
                          </div>
                </MDBCol>
              
              </MDBRow>
                <h4 className='connect_msg'>No Location Added, Please Add A Loaction</h4>
                </div>
              ) : (<div>
<MDBRow>
  <MDBCol md='10'>
  <div className="rightside_title">
              <h1>Location Manager</h1>
            </div>
  </MDBCol>
  <MDBCol md='2'>
  <select onChange={this.itemsPerPage} className="review_select_btn items_select" >
                    <option value="5">5 locations/page</option>
                    <option value="10">10 locations/page</option>
                    <option value="20">20 locations/page</option>
                    <option value="50">50 locations/page</option>
                    <option value="99">99 locations/page</option>
                    <option value="999999">All locations</option>
                  </select>
  </MDBCol>
</MDBRow>
                <div className="tablediv">
                   <div className="row">
                      <div className="col-md-3">
                        <div className="location_company_name">
                          Company Name
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="location_address">Address</div>
                      </div>
                      <div className="col-md-3">
                        <div className="location_phone">
                          Phone Number
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="location_action">Action</div>
                      </div>
                    </div>
                <div class="scrollbar" style={{height:'380px' ,marginRight:'0px'}}>
                <div>{renderLocations}</div>
                </div>
        </div>
        {renderLocations?
        <div className="pagination-main">
              <div className="pagination">
                <ul>
                  {currentPage > 1 ? (
                    <li >
                      <button 
                      className="prev"
                        key={currentPage}
                        id={currentPage - 1}
                        onClick={this.handleClick}
                      >
                        Previous
                      </button>
                    </li>
                  ) : (
                    <li >
                      <button disabled
                      className="prev"
                        key={currentPage}
                        id={currentPage - 1}
                        onClick={this.handleClick}
                      >
                        Previous
                      </button>
                    </li>
                  )}
<li style={{marginTop:'5px'}}>
{renderPageNumbers}
</li>
 {currentPage < pageNumbers.length ? (
                    <li >
                      <button
                      className="next"
                        key={currentPage}
                        id={currentPage + 1}
                        onClick={this.handleClick}
                      >
                        Next
                      </button>
                    </li>
                  ) : (
                    <li >
                      <button disabled
                      className="next"
                        key={currentPage}
                        id={currentPage + 1}
                        onClick={this.handleClick}
                      >
                        Next
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
         :null}
             </div>
             )}
            
           
          </div>
        )}
      </div>
    );
  }
}
