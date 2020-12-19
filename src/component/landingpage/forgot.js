import React from "react";
import Logo from "./img/Logo.png";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { get_link_of_forget_password } from "../apis/user";
import Loader from "react-loader-spinner";
import { secure_pin } from "../../config";
class Login extends React.Component {
  state = {
    Email: "",
    error: "",
    loading: false
  };

  submitHandler = event => {
    event.preventDefault();
    // event.target.className += ' was-validated';
    const data = {
      email_id: this.state.Email,
      secure_pin
    };
    if (this.state.Email) {
      this.setState({ loading: true });
      // Axios.post(
      //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/account/get-link-of-forget-password",
      //   data
      // )
      console.log("112233",data)
      get_link_of_forget_password(data)
        .then(res => {
          console.log("332211",res);
          this.setState({ error: "", loading: false });
          alert("Reset Password link sent to your Mail");
          //   alert(res.data.messgae)
        })
        .catch(res => {
          console.log("error in forgot", res);
          // this.setState({ error: "* Not registered email" });
          alert("something went wrong");
          this.setState({ loading: false });
        });
    } else {
      this.setState({ error: "Email can't Be Empty" });
    }
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render = () => {
    console.log(this.state.Email);

    return (
      <div>
        <div className="login-logo">
          <div className="container">
            <Row>
              <Col md={6}>
                <div className="forgot-md-size">
                  <form
                    className="needs-validation"
                    onSubmit={this.submitHandler}
                    noValidate
                  >
                    <img src={Logo} className="Alogo" alt="logo" />
                    <h5 className="forgot-heading"> Forgot your Password?</h5>
                    {this.state.loading ? (
                      <Loader
                        type="Oval"
                        color="#00BFFF"
                        height={25}
                        width={25}
                        // timeout={3000} //3 secs
                      />
                    ) : (
                      ""
                    )}
                    <Row>
                      <Col md="12" className="mb-3">
                        <label className="grey-text">
                          <h5>Email</h5>{" "}
                        </label>
                        <input
                          value={this.state.Email}
                          name="Email"
                          onChange={this.changeHandler}
                          type="text"
                          className="form-control"
                          placeholder="email@email.com"
                          required
                        />
                      </Col>
                    </Row>
                    <div style={{ color: "red" }}>{this.state.error}</div>
                    <div className="col-btn">
                      <Row>
                        <Col md={12}>
                          <button type="submit" className="sign-btn">
                            Reset Password
                          </button>
                        </Col>
                      </Row>
                    </div>
                    <div className="forgot-text">
                      <p>
                        Don't have an account?<Link to="/"> Register</Link>{" "}
                      </p>
                    </div>
                  </form>
                </div>
              </Col>
              <Col md={6}></Col>
            </Row>
          </div>
        </div>

        <div className="signin-footer1">
          <div className=" signin-footer-icon1">
            <Link to="" className="fb-ic2 ">
              <i className="fa fa-facebook-f" aria-hidden="true">
                {" "}
              </i>
            </Link>
            <Link to="" className="tw-ic2">
              <i className="fa fa-twitter" aria-hidden="true">
                {" "}
              </i>
            </Link>
            <Link to="" className="yt-ic2">
              <i className="fa fa-youtube-play" aria-hidden="true"></i>
            </Link>
            <Link to="" className="ld-ic2">
              <i className="fa fa-linkedin" aria-hidden="true"></i>
            </Link>
          </div>

          <div className="signin-footer-features">
            <ul>
              <li>
                <Link to="#">Coporate</Link>
              </li>
              <li>
                <Link to="#">Blog</Link>
              </li>
              <li>
                <Link to="#">Careers</Link>{" "}
              </li>
              <li>
                <Link to="#">Term and Conditions</Link>
              </li>
              <li>
                <Link to="#">Accessibility </Link>
              </li>
              <li>
                <Link to="#">Privacy policy</Link>
              </li>
              <li>
                <Link to="#">Sitemap</Link>
              </li>
            </ul>
          </div>

          <div className="signin-footer-copyright-link-2">
            <container fluid className="sign-date">
              &copy; {new Date().getFullYear()}
              <a href="#"> Deshify, All Rights Reserved</a>
            </container>
          </div>
        </div>
      </div>
    );
  };
}

export default Login;
