import React, { Component } from 'react'
import {MDBCol,MDBRow,MDBContainer,MDBBtn} from 'mdbreact';
import { Checkbox } from '@material-ui/core';
import camera from '../assets/camera.png'
import model_img1 from '../assets/model_img1.png'
import model_img2 from '../assets/model_img2.png'
export default class Support_chat extends Component {
    render() {
        return (
            <div>
              
<div className="container">
  <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Live Support Chat</button>
  <div className="modal fade" id="myModal" role="dialog" >
    <div className="modal-dialog " style={{width:'556px'}}>
      <div className="modal-content ">
        <div className="modal-header modal_header">
          <MDBRow>
            <MDBCol className="modal-title  " md='10'>
            <div className='support_chat_header_heading'>Live Support Chat</div>
            </MDBCol>
            <MDBCol md='2'>
            <button type="button" className=" modal_header_icon" data-dismiss="modal" >&times;</button>
            </MDBCol>
          </MDBRow>
        </div>
        
        <div className='support_chat_heading' >
                            You are chatting with <b>Support Team</b>
                            </div>
                            <hr className='modal_hr'/>
                            
                            <MDBRow>
                                <MDBCol className='col-md-3' ><img src={model_img1} alt='model_img1' className='modal_img'/></MDBCol>
                                <MDBCol className='col-md-9'>
                                <div className='support_chat_subheading'>Support Team</div>
                                <div className='support_chat_contant'>Hello! How can I help you?</div>
                                </MDBCol>
                            </MDBRow>
                            <hr className='modal_hr'/>
                            
                            <MDBRow>
                                <MDBCol className='col-md-3' ><img src={model_img2} alt='model_img2' className='modal_img'/></MDBCol>
                                <MDBCol className='col-md-9'>
                                <div className='support_chat_subheading'>You</div>
                                <div className='support_chat_contant'>Hi there... </div>
                                </MDBCol>
                            </MDBRow>
                                <div className='modal_footer_box'>
                                    <div className='modal_footer_innerbox'>
                                     <input placeholder='Type your message...' className='chat_inputbox'/>
                                     <img src={camera} alt='camera' id='camera' />
                                     <MDBBtn id='modal_button'>Send</MDBBtn>
                                     </div>

                                </div>
                            
        </div>
      </div>
    </div>
  </div>
   </div>
        )
    }
}
