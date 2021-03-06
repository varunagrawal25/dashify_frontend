import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { add_social_account } from "./apis/social_platforms";
import Spinner from "./common/Spinner";
import { MDBCol, MDBRow } from "mdbreact";
import { secure_pin } from "../config";
const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

class GoogleConnectedAccounts extends Component {
  state = {
    loading: false,
    isUrl: false,
    loader: true,
    all_pages: [],
    google_props: ""
  };

  componentDidMount = async () => {
    console.log(
      "all props",
      JSON.parse(decodeURIComponent(this.props.match.params.state))
    );
    await this.setState({
      google_props: JSON.parse(
        decodeURIComponent(this.props.match.params.state)
      )
    });

    const GoogleConfig = {
      headers: {
        Authorization: "Bearer " + this.state.google_props.Token
      }
    };

    console.log("google token", GoogleConfig);

    Axios.get(
      "https://mybusiness.googleapis.com/v4/accounts/",
      GoogleConfig
    ).then(res => {
      console.log(res)
      localStorage.setItem("accountId", res.data.accounts[0].name);

      Axios.get(
        "https://mybusiness.googleapis.com/v4/" +
          localStorage.getItem("accountId") +
          "/locations",
        GoogleConfig
      ).then(resp => {
        console.log("google location from ", resp.data);
        this.setState({
          all_pages: resp.data.locations ? resp.data.locations : [],
          loader: false
        });
      });
    });
  };

  onSubmit = index => e => {
    e.preventDefault();
    this.setState({ loader: true });

    const g_data = this.state.google_props;

    const data = {
      // location_id: g_data.location_id,
      // Platform: "Google",
      // Token: g_data.Token,
      // Username: this.state.all_pages[index].locationName,
      // Email: g_data.Email,
      // Password: "",
      // Connect_status: "Connect",
      // Other_info: this.state.all_pages[index].name,


      secure_pin,
      "user_id":localStorage.getItem("UserId"),
      "location_id":g_data.location_id,
      "google_id":g_data.googleIdf?g_data.googleIdf:"",
      "token":g_data.Token,
      "name":this.state.all_pages[index].locationName,
      "email_id":g_data.Email,
      "image_url":g_data.googleImgUrl ?g_data.googleImgUrl:"" ,
      "connect_type":"Google",
      "path_name":this.state.all_pages[index].name,
      "refresh_token":g_data.Refresh
    };
    console.log("googleRa",data)

    add_social_account(data, DjangoConfig)
      .then(resp => {
        console.log("google location response", resp.data);
        this.setState({ isUrl: true, loading: false });
      })
      .catch(resp => {
        console.log(resp);
        this.setState({ loading: false });
      });
  };

  render() {
    var link;
    if (this.state.isUrl) {
      return (
        <Redirect
          to={
            "/locations/" +
            localStorage.getItem("locationId") +
            this.state.google_props.redirect_to
          }
        />
      );
    }

    const allPages = this.state.all_pages.map((p, i) => {
      return (
        <form onSubmit={this.onSubmit(i)}>
          <div  key={p.id}>
            <hr/>
            <MDBRow>
              <MDBCol md='3' className='connect_table_contant'>
              {p.locationName}
              </MDBCol>
              <MDBCol md='2' className='connect_table_contant'>
              {p.primaryCategory.displayName}
              </MDBCol>
              <MDBCol md='5' className='connect_table_contant'>
              {p.address ? (
                    <div>
                      {p.address.addressLines.map(data => data)},
                      {p.address.locality},{p.address.administrativeArea},
                      {p.address.postalCode}
                    </div>
                  ) : (
                    "-"
                  )}

                  {p.primaryPhone ? (
                    <div>
                      {" "}
                      <br /> <b>Call:</b> {p.primaryPhone}{" "}
                    </div>
                  ) : (
                    ""
                  )}
              </MDBCol>
              <MDBCol md='2' className='action' style={{marginTop:'11px'}}>
              <button type="submit">Connect</button>
              </MDBCol>
            </MDBRow>
          </div>
        </form>
      );
    });

    return (
      <div>
         {this.state.loader ? (
            <div >
                 <MDBRow>
          <MDBCol md='1'>
          <img src={require("../images/google.png")} alt="Google" style={{height:'40px',width:'40px' ,marginTop:'25px'}}/>
          </MDBCol>
  <MDBCol md='11'>
  <div className="rightside_title" style={{marginLeft:'-28px'}}>
  
  <h1>Google Locations</h1>
            </div>
  </MDBCol>
 
  </MDBRow>
              <Spinner />
              </div>
          ) : this.state.all_pages.length == 0 ? (
            <h4 className='connect_msg'>No Google Business Account To Connect</h4>
         
         ) : (
          <div>
        <MDBRow>
          <MDBCol md='1'>
          <img src={require("../images/google.png")} alt="Google" style={{height:'40px',width:'40px' ,marginTop:'25px'}}/>
          </MDBCol>
  <MDBCol md='11'>
  <div className="rightside_title" style={{marginLeft:'-28px'}}>
  
  <h1>Google Locations</h1>
            </div>
  </MDBCol>
 
  </MDBRow>
        
  <MDBRow style={{background:'#ffffff',margin:'0px'}}>
              <MDBCol md='3' className='connect_table_heading'>
              Location Name
              </MDBCol>
              <MDBCol md='2' className='connect_table_heading'>
              Category
              </MDBCol>
              <MDBCol md='5' className='connect_table_heading'>
              Address
              </MDBCol>
              <MDBCol md='2' className='connect_table_heading' style={{marginLeft:'-25px'}}>
              Action
              </MDBCol>
            </MDBRow>
        <div class="scrollbar" style={{height:'300px' ,marginRight:'0px'}}>
        
        <div>{allPages}</div>
       </div>
        </div>
       )}
         
        </div>
    );
  }
}

export default GoogleConnectedAccounts;
