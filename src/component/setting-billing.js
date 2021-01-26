import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import paypal from "./assets/paypal.png";
import mastercard from "./assets/mastercard.png";
import ProfileSettingSidebar from "./setting-sidebar";
import SettingCardUpdate from './setting-cardUpdate';
import {card_billing} from "./apis/user";
import {secure_pin} from "../config"
export default class SettingBilling extends Component {
  state = {
    updateCard:false,
    cardnum:'',
    expiry:'',
    name:'',
    CVV:'',
    address:'',
    city:'',
    country:'',
    zipcode:''
  }
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  cardUpdate = () => {
    console.log("states", this.state);
    this.setState({ updateCard:true });
  };
  updateCardBtn = () =>{
    const data={secure_pin,user_id: localStorage.getItem("UserId"),card_number:this.state.cardnum, name_of_card:this.state.name,
      ex_date:this.state.expiry,code:this.state.cvv,address:this.state.address,city:this.state.city,
    state:'mp',country:this.state.country,zipcode:this.state.zipcode}
    card_billing(data)
    .then(resp => {
      
    })
  }
  componentDidMount ()  {

    this.setState({role:this.props.role})
  }
  componentDidUpdate(){
    if(this.state.role !== this.props.role)
    this.setState({role:this.props.role});
  }
 
  render() {
    return (
      <div>
        <MDBContainer>
          <div className="setting-10">
            <h3> Profile Setting</h3>
          </div>

          <MDBRow>
            <MDBCol md="3">
              <ProfileSettingSidebar  role={this.state.role} />
            </MDBCol>
            {this.state.updateCard?
          <MDBCol md="9">
              <div className="profile_container">
                <div className="billing_head"> Update your card</div>
                <MDBRow>
                  <MDBCol md="6" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="5">
                        <div className="profile3">Card Number</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input
                          className="profile4"
                          placeholder="9999 9999 9999 9999 "
                          name="cardnum"
                          onChange={this.changeHandler}
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="6 " className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="5">
                        <div className="profile3">Expiry date</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input className="profile5" placeholder="MM/YY"  name="expiry"
                                onChange={this.changeHandler}/>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="6" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="5">
                        <div className="profile3">Name of card</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input className="profile4" placeholder="Jhon Doe"  name="name"
                                onChange={this.changeHandler}/>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="6 " className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="5">
                        <div className="profile3">Security code</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input className="profile5" placeholder="CVV"  name="cvv"
                                onChange={this.changeHandler}/>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <div className="billing_head">Billing Address</div>
                <MDBRow>
                  <MDBCol md="10" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="3">
                        <div className="profile3">Address</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input
                          className="profile4"
                          placeholder="123 St. Jones street"
                          name="address"
                          onChange={this.changeHandler}
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="10" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="3">
                        <div className="profile3">City</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input className="profile4" placeholder="Denver"  name="city"
                                onChange={this.changeHandler} />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="10" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="3">
                        <div className="profile3">Country</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input
                          className="profile4"
                          placeholder="United States Of America"
                          name="country"
                          onChange={this.changeHandler}
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="10" className="profileSpacing">
                    <MDBRow>
                      <MDBCol md="3">
                        <div className="profile3">ZipCode</div>
                      </MDBCol>
                      <MDBCol md="7">
                        <input className="profile4" placeholder="1323123"  name="zipCode"
                                onChange={this.changeHandler}/>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <MDBBtn id="profile_update_card" onClick={this.updateCardBtn}>Update Card</MDBBtn>
              </div>
          
            </MDBCol>:
             <MDBCol md="9">
              <div className="user_container ">
                <MDBRow>
                  <MDBCol md="3" id="user7">
                    Subscription
                  </MDBCol>
                  <MDBCol md="6" className="user12">
                    Premium Monthly
                  </MDBCol>
                  <MDBCol md="3">
                    <MDBBtn id="user_save">Save</MDBBtn>
                  </MDBCol>
                 
                </MDBRow>
                <MDBRow>
                  <MDBCol md="3" id="user_payment_container">
                    <div id="user6">$8</div>
                    <div className="user8">Month</div>
                    <div className="user9">Per Location</div>
                    <div className="user9">Billed Monthly</div>
                  </MDBCol>
                  <MDBCol md="7" id="user10">
                    <div>
                      <span className="user4">Start Date: </span>
                      <span className="user5">30 Jan 2020</span>
                    </div>

                    <div>
                      <span className="user4">Valid Till: </span>
                      <span className="user5">30 Jan 2020</span>
                    </div>

                    <div>
                      <span className="user4">Min. Commitemnt:</span>
                      <span className="user5"> 60 Loсation / Monthly </span>
                    </div>

                    <div>
                      <span className="user4">Currently added: </span>
                      <span className="user5">637 Locations </span>
                    </div>

                    <div>
                      <span className="user4">Next Billing amount: </span>
                      <span className="user5">$5103. 94 On 29 Feb 2020 </span>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="5">
                    <img src={mastercard} />{" "}
                  </MDBCol>
                  <MDBCol md="5">
                    <img src={paypal} />
                  </MDBCol>
                  <MDBCol md="2">
                    <MDBBtn className="add_more" onClick={this.cardUpdate}>+</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </div>
            </MDBCol>
          }
           
          </MDBRow>
         
        </MDBContainer>
        
      </div>
    );
  }
}
