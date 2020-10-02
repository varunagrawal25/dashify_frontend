import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { MDBRow, MDBCol, MDBContainer } from "mdbreact";
import logo from "../assets/footer-logo.png";

class Footer extends Component {
  render() {
    return (
      <div>
        <div className="footer">
          <MDBContainer>
            <MDBRow>
              <MDBCol md="3">
                <div className="footer-logo">
                  <img src={logo} alt="logo" />
                </div>
              </MDBCol>
              <MDBCol md="3">
                <ul>
                  <li>
                    {" "}
                    <NavLink to="/aboutus">About us</NavLink>
                  </li>
                  <li>
                    {" "}
                    <NavLink to="/how-we-work">How we work</NavLink>
                  </li>
                  <li>
                    <NavLink to="/our-team">Our team</NavLink>
                  </li>
                  <li>
                    {" "}
                    <NavLink to="/our-news">Our news</NavLink>
                  </li>
                  <li>
                    <NavLink to="/our-customer">Our customers</NavLink>
                  </li>
                  <li>
                    <NavLink to="/blog">Blog</NavLink>
                  </li>
                </ul>
              </MDBCol>
              <MDBCol md="3">
                <ul>
                  <li>
                    {" "}
                    <NavLink to="/our-app">Our App</NavLink>
                  </li>

                  <li>
                    <NavLink to="/listing-management">
                      Listings Management
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/review-management">Review Management</NavLink>
                  </li>
                  <li>
                    <NavLink to="/analytics">Analytics</NavLink>
                  </li>
                  <li>
                    {" "}
                    <NavLink to="/commants-and-review">
                      Сomments and reviews
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/features">Features</NavLink>
                  </li>
                </ul>
              </MDBCol>
              <MDBCol md="3">
                <ul>
                  <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                  </li>
                  <li>
                    <NavLink to="/support">Support</NavLink>
                  </li>
                  <li>
                    <NavLink to="/chat">Chat</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Log in</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contactus">Contact us</NavLink>
                  </li>
                  <li>
                    <NavLink to="/career">Career</NavLink>
                  </li>
                </ul>
                <div className="bookbox">
                  <button className="btn_demo">Book A Demo</button>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}
export default withRouter(Footer);
