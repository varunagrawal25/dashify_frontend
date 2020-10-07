import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "./img/Logo.png";
import Signup from "./signup";
import Signin from "./login";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "../../App.css";

class Navber extends Component {
  state = {
    isAlreadyLogin: false,
    name: ""
  };

  componentDidMount = () => {
    this.isAlreadyLogin();
  };

  isAlreadyLogin = () => {
    console.log(
      "remember_me and user_token",
      localStorage.getItem("RememberMe") == "true",
      localStorage.getItem("UserToken") != null
    );
    localStorage.getItem("UserToken") != null &&
    localStorage.getItem("RememberMe") == "true"
      ? this.setState({
          isAlreadyLogin: true,
          name: localStorage.getItem("UserName")
        })
      : this.setState({ isAlreadyLogin: false });
  };

  render() {
    let { name, isAlreadyLogin } = this.state;
    return (
      <div>
        <div
          className="navbar navbar-expand-lg navbar-light navbar-fixed-top"
          role="navigation"
        >
          <div className="container">
            <a className="navbar-brand" href="#">
              <img src={Logo} className="App-logo" alt="logo" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="nav navbar-nav navbar-right ml-auto">
                <li>
                  <Link to="#">Home</Link>
                </li>
                <li>
                  <Link to="#about">About Us</Link>
                </li>
                <li>
                  <Link to="#portfolio">Features</Link>
                </li>
                <li>
                  <Link to="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link to="#contact">Support</Link>
                </li>
                {/* <li>
                  <Link to="Login">{isAlreadyLogin ? name : "Sign in"}</Link>
                </li> */}
                <li>
                  <Link data-toggle="modal" data-target="#myModalSignin">
                    {isAlreadyLogin ? "" : "Sign in"}
                  </Link>
                </li>
                <li>
                  <Link data-toggle="modal" data-target="#myModalSignup">
                    {isAlreadyLogin ? "" : "Sign up"}
                  </Link>
                  {/* <Link to="signup">{isAlreadyLogin ? "" : "Sign up"}</Link> */}
                </li>
                <li className="demo">
                  <Link to="#">Book A Demo</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Signup />
        <Signin />
      </div>
    );
  }
}
export default Navber;

// import React, { Component } from "react";
// import { NavLink, withRouter } from "react-router-dom";
// import logo from "../assets/Logo.png";
// import {
//   MDBNavbar,
//   MDBNavbarBrand,
//   MDBNavbarNav,
//   MDBNavItem,
//   MDBNavLink,
//   MDBNavbarToggler,
//   MDBCollapse,
//   MDBDropdown,
//   MDBDropdownToggle,
//   MDBDropdownMenu,
//   MDBDropdownItem,
//   MDBIcon
// } from "mdbreact";
// import {
//   MDBContainer,
//   MDBBtn,
//   MDBModal,
//   MDBModalBody,
//   MDBModalHeader,
//   MDBModalFooter,
//   MDBCol,
//   MDBRow
// } from "mdbreact";
// import { Checkbox } from "@material-ui/core";

// class Navber extends Component {
//   state = {
//     isOpen: false,
//     modal: false,
//     isAlreadyLogin: false,
//     name: ""
//   };

//   componentDidMount = () => {
//     this.isAlreadyLogin();
//   };

//   isAlreadyLogin = () => {
//     console.log(
//       "remember_me and user_token",
//       localStorage.getItem("RememberMe") == "true",
//       localStorage.getItem("UserToken") != null
//     );
//     localStorage.getItem("UserToken") != null &&
//     localStorage.getItem("RememberMe") == "true"
//       ? this.setState({
//           isAlreadyLogin: true,
//           name: localStorage.getItem("UserName")
//         })
//       : this.setState({ isAlreadyLogin: false });
//   };

//   toggleCollapse = () => {
//     this.setState({ isOpen: !this.state.isOpen });
//   };

//   toggle = () => {
//     this.setState({
//       modal: !this.state.modal
//     });
//   };
//   render() {
//     let { name, isAlreadyLogin } = this.state;
//     return (
//       <MDBNavbar className="navbar navbar-expand-lg navbar-light " id="navbar">
//         <MDBContainer>
//           <MDBNavbarBrand>
//             <img src={logo} alt="logo" className="logo" />
//           </MDBNavbarBrand>

//           <MDBNavbarToggler onClick={this.toggleCollapse} />
//           <MDBCollapse isOpen={this.state.isOpen} navbar>
//             <MDBNavbarNav right className="menudiv">
//               <MDBNavItem>
//                 <MDBNavLink to="/" id="home">
//                   Home
//                 </MDBNavLink>
//               </MDBNavItem>

//               <MDBNavItem>
//                 <MDBNavLink to="/aboutus" id="aboutus">
//                   About Us
//                 </MDBNavLink>
//               </MDBNavItem>
//               <MDBNavItem>
//                 <MDBNavLink to="/features" id="features">
//                   Features
//                 </MDBNavLink>
//               </MDBNavItem>
//               <MDBNavItem>
//                 <MDBNavLink to="/Pricing" id="pricing">
//                   Pricing
//                 </MDBNavLink>
//               </MDBNavItem>
//               <MDBNavItem>
//                 <MDBNavLink to="/support" id="support">
//                   Support
//                 </MDBNavLink>
//               </MDBNavItem>
//               <MDBNavItem>
//                 <MDBNavLink to="/support" id="support">
//                   Support
//                 </MDBNavLink>
//               </MDBNavItem>

//               <MDBNavItem>
//                 <MDBNavLink to="/Login" id="signin" onClick={this.toggle}>
//                   {isAlreadyLogin ? name : "Sign in"}
//                 </MDBNavLink>
//               </MDBNavItem>

//               <MDBModal
//                 isOpen={this.state.modal}
//                 toggle={this.toggle}
//                 id="signin_container"
//               >
//                 <MDBModalHeader toggle={this.toggle} id="signin_header">
//                   <span></span>
//                   <span id="signin_header_heading">Log In</span>
//                 </MDBModalHeader>
//                 <MDBModalBody style={{ borderRadius: "10px" }}>
//                   <div className="signin_body_heading">Email</div>
//                   <div>
//                     <input className="signin_inputbox" />
//                   </div>
//                   <div className="signin_body_heading">Password</div>
//                   <div>
//                     <input className="signin_inputbox" />
//                   </div>
//                   <div>
//                     <span>
//                       <Checkbox />
//                     </span>
//                     <span className="signin_body_heading">Remember me</span>
//                   </div>
//                   <div>
//                     <MDBBtn id="signin_button">Send</MDBBtn>
//                   </div>
//                 </MDBModalBody>
//               </MDBModal>

//               <button id="demo_box" className="demo">
//                 Book A Demo
//               </button>
//             </MDBNavbarNav>
//           </MDBCollapse>
//         </MDBContainer>
//       </MDBNavbar>
//     );
//   }
// }
// export default withRouter(Navber);
