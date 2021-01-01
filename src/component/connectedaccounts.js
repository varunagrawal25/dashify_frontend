import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { add_social_account } from "./apis/social_platforms";
import Spinner from "./common/Spinner";
import { MDBCol, MDBRow } from "mdbreact";
const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

class ConnectedAccounts extends Component {
  state = {
    loading: false,
    isUrl: false,
    loader: true,
    all_pages: []
  };

  componentDidMount = () => {
    const fb_accessToken = localStorage.getItem("fb_token");

    Axios.get(
      "https://graph.facebook.com/me/accounts?fields=access_token,id,name,overall_star_rating,category,category_list,tasks&access_token=" +
        fb_accessToken
    ).then(res => {
      console.log("facebook response", res.data.data);
      this.setState({
        all_pages: res.data.data ? res.data.data : [],
        loader: false
      });
    });
  };
 
  onSubmit = index => e => {
    e.preventDefault();
    this.setState({ loader: true });

    const fb_data = JSON.parse(localStorage.getItem("fb_data"));

    const data = {
      // location_id: fb_data.location_id,
      // Platform: "Facebook",
      // Token: localStorage.getItem("fb_token"),
      // Username: fb_data.Username,
      // Email: fb_data.Email,
      // Password: "",
      // Connect_status: "Connect",
      // Other_info: this.state.all_pages[index].id,


      "secure_pin":"digimonk",
      "user_id":localStorage.getItem("UserId"),
      "location_id":fb_data.location_id,
      "facebook_id":fb_data.userId,
      "token":fb_data.AccessToken,
      "name":fb_data.Username,
      "email_id":fb_data.Email,
      "picture_url":fb_data.image,
      "connect_type":"Facebook",
      "page_access_token":this.state.all_pages[index].access_token,
      "page_id":this.state.all_pages[index].id
    };
    console.log(data)

    // Axios.post(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/social-platforms/add-account",
    //   data,
    //   DjangoConfig
    // )
    add_social_account(data, DjangoConfig)
      .then(resp => {
        console.log("facebook page response", resp);
        // this.setState({
        //   fbIsLoggedIn: true,

        //   fbName: response.name,

        //   fbToken: response.accessToken,
        //   fbId: resp.data.data.conect_to_location_id
        // });
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
          to={`/locations/${localStorage.getItem("locationId")}/${
            this.props.match.params.redirect_to
          }`}
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
              {p.name}
              </MDBCol>
              <MDBCol md='2' className='connect_table_contant'>
              {p.category}
              </MDBCol>
              <MDBCol md='5' className='connect_table_contant'>
              {p.category_list.map(data => (
                    <div>{data.name}</div>
                  ))}
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
       <img src={require("../images/facebook.png")} alt="Facebook" style={{height:'40px',width:'40px' ,marginTop:'25px'}}/>
       </MDBCol>
<MDBCol md='11'>
<div className="rightside_title" style={{marginLeft:'-28px'}}>

<h1>Facebook Pages</h1>
         </div>
</MDBCol>

</MDBRow>
           <Spinner />
           </div>
       ) : this.state.all_pages.length == 0 ? (
         <h4 className='connect_msg'>No Facebook Business Page To Connect</h4>
      
      ) : (
       <div>
     <MDBRow>
       <MDBCol md='1'>
       <img src={require("../images/facebook.png")} alt="Facebook" style={{height:'40px',width:'40px' ,marginTop:'25px'}}/>
       </MDBCol>
<MDBCol md='11'>
<div className="rightside_title" style={{marginLeft:'-28px'}}>

<h1>Facebook Pages</h1>
         </div>
</MDBCol>

</MDBRow>
     
<MDBRow style={{background:'#ffffff',margin:'0px'}}>
           <MDBCol md='3' className='connect_table_heading'>
           Page Name
           </MDBCol>
           <MDBCol md='2' className='connect_table_heading'>
           Category
           </MDBCol>
           <MDBCol md='5' className='connect_table_heading'>
           Category list
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

export default ConnectedAccounts;
