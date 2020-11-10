import React, { Component } from "react";
import { MDBCol, MDBRow, MDBContainer, MDBBtn } from "mdbreact";
import Logo from "./img/Logo.png";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Signin from "./login";
import Axios from "axios";

export default class Login extends Component {
  state = {
    price:"",
    loading: false
  };

  componentDidMount() {
    window.scrollTo(0, 0)
}
//   submitHandler = event => {
//     event.preventDefault();

//     this.setState({ Email_error: "", Password_error: "", wrong: "" });

//     var cal = false;
//     if (this.state.Email == "" && this.state.Password == "") {
//       this.setState({
//         Email_error: "Enter Email",
//         Password_error: "Enter Password"
//       });
//     } else if (this.state.Email == "") {
//       this.setState({ Email_error: "Enter Email" });
//     } else if (this.state.Password == "") {
//       this.setState({ Password_error: "Enter Password" });
//     } else {
//       cal = true;
//     }

//     if (cal) {
//       const data = {
//         username: this.state.Email,
//         password: this.state.Password
//       };

//       this.setState({ loading: true });

//       login(data)
//         .then(async res => {
//           console.log("login success", res.data);
//           await localStorage.setItem("RememberMe", this.state.RememberMe);
//           await localStorage.setItem("UserToken", res.data.Token);
//           await localStorage.setItem("UserId", res.data.user_info[0].id);
//           await localStorage.setItem("UserEmail", this.state.Email);
//           await localStorage.setItem(
//             "UserName",
//             res.data.user_info[0].first_name +
//               " " +
//               res.data.user_info[0].last_name
//           );
//           // setAuthToken(res.data.Token)
//           await this.setState({ isSuccessLogin: true, loading: false });
//         })
//         .catch(err => {
//           console.log("login error", err.response);
//           console.log("login error", err.message);
//           if (err.response.status == 403) {
//             window.location.assign("/dashboard");
//           } else if (err.response.status == 400) {
//             this.setState({
//               wrong:
//                 "Username and pasword is incorrect & may be your account is not activate",
//               loading: false
//             });
//           } else {
//             this.setState({ wrong: "Server error", loading: false });
//           }
//         });
//     }
//   };

  render() {
      let {price,loading} = this.state;
    return (
      <div>
        <div className="container">


              <div className="modal-body modal_body">
                <div style={{ padding: "0px 10%" }}>
                  {this.state.loading ? (
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={25}
                      width={25}
                      // timeout={3000} //3 secs
                    />
                  ) : (
                    <div style={{ color: "red" }}>{this.state.wrong}</div>
                  )}
                  
                  <ul className="nav navbar-nav navbar-right ml-auto">
                <li>
                  <Link data-toggle="modal" data-target="#myModalSignin" onClick={()=>this.setState({price:16})}>16$</Link>
                </li>
                <li>
                  <Link data-toggle="modal" data-target="#myModalSignin" onClick={()=>this.setState({price:18})}>18$</Link>
                </li>
                <li>
                  <Link data-toggle="modal" data-target="#myModalSignin" onClick={()=>this.setState({price:20})}>20$</Link>
                </li>
                <li>
                  <Link data-toggle="modal" data-target="#myModalSignin" onClick={()=>this.setState({price:30})}>30$</Link>
                </li>
                </ul>
                  
                </div>
              </div>


      </div>
      <Signin price={price} />
      </div>
    );
  }
}
