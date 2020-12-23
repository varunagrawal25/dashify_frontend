import React, { Component } from 'react'

export default class promotional_modal extends Component {
    render() {
        return (
            <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  {/* <button type="button" class="close" data-dismiss="modal">&times;</button> */}
                  <h4 class="modal-title">Additional Promotional Posts</h4>
                </div>
                <div class="modal-body">
                 <MDBRow>
                   <MDBCol md='8'>
                   Write your post
                   </MDBCol>
                   <MDBCol md='4'>
                   100-150 Characters
                   </MDBCol>
                 </MDBRow>
        
                 <MDBRow>
                   <MDBCol md='8'>
                   Write your post
                   </MDBCol>
                   <MDBCol md='4'>
                   Attatch a document
                   </MDBCol>
                 </MDBRow>
                 <MDBRow>
                   <MDBCol md='12'>
                   <textarea rows='6' placeholder='Enter your post content here...'/>
                   </MDBCol>
                 </MDBRow>
                 <MDBRow>
                   <MDBCol md='1'>
                     <Checkbox/>
                   </MDBCol>
                   <MDBCol md='5'>
                   Add a CTA
                   </MDBCol>
                   <MDBCol md='1'>
                     <Checkbox/>
                   </MDBCol>
                   <MDBCol md='5'>
                   Post an event
                   </MDBCol>
                 </MDBRow>
                 <MDBRow>
                   <MDBCol md='1'>
                     <Checkbox/>
                   </MDBCol>
                   <MDBCol md='5'>
                   Make this post a promoyional post
                   </MDBCol>
                   <MDBCol md='1'>
                     <Checkbox/>
                   </MDBCol>
                   <MDBCol md='5'>
                   Report this post after expairy 
                   </MDBCol>
                 </MDBRow>
                </div>
                
                <MDBRow>
                  <MDBCol md='6'>
                    <MDBBtn >
                    Save as Draft
                    </MDBBtn>
                  </MDBCol>
        
                  <MDBCol md='6'>
                    <MDBBtn >
                    Confirm Post
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </div>
              
            </div>
          </div>
          
        
        )
    }
}
