import React, { Component } from 'react';
import { Redirect_Url_Id } from './apis/review';

import { secure_pin } from "../config";
import { Redirect } from 'react-router-dom';
class RedirectCampaign extends Component {

    state={
        RedirectU:''
    }
  componentDidMount(){
      var id= this.props.match.params.id;
      const data=
      {
          secure_pin,
          "id":id}

    Redirect_Url_Id(data).then(res=>{
        console.log(res);
        console.log(res.data.count_data[0].connect_url,"url")
        this.setState({
            RedirectU:res.data.count_data[0].connect_url
        })
    })
    .catch(res=>{
        console.log(res)
    })
  }
 
  render() {

    if(this.state.RedirectU){
        window.location.href = this.state.RedirectU;
    }
   
  
    return (
    
      <div >

       
      </div>
    );
  }
}
 
export default RedirectCampaign;