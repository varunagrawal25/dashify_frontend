import React, { Component } from "react";
import { MDBCol, MDBRow, MDBContainer, MDBBtn } from "mdbreact";
import { Checkbox } from "@material-ui/core";
import Logo from "./img/Logo.png";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { secure_pin } from "../../config";
import {
	login,
	account_activate,
	send_varification_link,
	logout
} from "../apis/user";
import { email_regex } from "../utils/regularexpressions";
// import sendVerificationLink from "./activate_account";
import swal from "sweetalert";

export default class Login extends Component {
	state = {
		Password: "",
		isSuccessLogin: false,
		isAlreadyLoginRememberme: false,
		RememberMe: false,
		Password_error: "",
		wrong: "",
		isPasswordShown: false,
		loading: false,

		Email: "",
		Email_error: "",
		email_sent: "",
		loading_activate: false
	};

	componentDidMount = async () => {
		await this.isAlreadyLoginRememberme();

		await this.notLogout();
	};

	isAlreadyLoginRememberme = () => {
		console.log(
			"remember_me and user_token",
			localStorage.getItem("RememberMe") == "true",
			localStorage.getItem("UserToken") != null
		);
		localStorage.getItem("UserToken") != null &&
		localStorage.getItem("RememberMe") == "true"
			? this.setState({ isAlreadyLoginRememberme: true })
			: this.setState({ isAlreadyLoginRememberme: false });
	};

	notLogout = () => {
		if (
			localStorage.getItem("UserToken") != null &&
			localStorage.getItem("RememberMe") != "true"
		) {
			this.logout();
		}
	};

	logout = () => {
		// localStorage.clear();
		// logout()
		//   .then(res => {
		//     console.log("sucess");
		//     console.log(res);
		//   })
		//   .catch(res => {
		//     console.log("error in Logout");
		//   });
	};

	loginHandler = (event) => {
		event.preventDefault();
		// event.target.className += ' was-validated';

		// if (
		//   (localStorage.getItem("username")==this.state.Email)
		//    &&
		//     (localStorage.getItem("password")==this.state.Password)
		//     &&
		//     (this.state.Email!=''))
		//     {
		//   this.setState({isSuccessLogin:true})
		// }
		this.setState({ Email_error: "", Password_error: "", wrong: "" });

		var cal = false;
		if (this.state.Email == "" && this.state.Password == "") {
			this.setState({
				Email_error: "*Enter Email",
				Password_error: "*Enter Password"
			});
		} else if (this.state.Email == "") {
			this.setState({ Email_error: "*Enter Email" });
		} else if (this.state.Password == "") {
			this.setState({ Password_error: "*Enter Password" });
		} else if (email_regex(this.state.Email) === false) {
			this.setState({ Email_error: "Not a valid Email" });
		} else {
			cal = true;
		}

		if (cal) {
			const data = {
				secure_pin,
				email_id: this.state.Email,
				password: this.state.Password
			};

			this.setState({ loading: true });

			login(data)
				.then(async (res) => {
					if (res.data && res.data.message == "Successfully login !") {
						console.log("login success", res.data);
						await localStorage.setItem("RememberMe", this.state.RememberMe);
						await localStorage.setItem("UserId", res.data.get_details[0].id);
						await localStorage.setItem(
							"UserEmail",
							res.data.get_details[0].email_id
						);
						await localStorage.setItem(
							"UserName",
							res.data.get_details[0].first_name +
								" " +
								res.data.get_details[0].last_name
						);
						await this.setState({ isSuccessLogin: true, loading: false });
					} else if (res.data && res.data.message === "Wrong details!") {
						swal("Either Email or password is wrong!");
						this.setState({ loading: false });
					} else if (res.data && res.data.message === "Account deactivated!") {
						this.setState({
							loading: false,
							wrong: "Account deactivated!"
						});
					} else if (res.data && res.data.message === "Email does not exist!") {
						this.setState({
							Email_error: "Email does not exist!",
							loading: false
						});
					} else {
						console.log("login error", res.data);
						this.setState({ wrong: "Server error!", loading: false });
					}
				})
				.catch((err) => {
					console.log("login error", err);
					this.setState({ wrong: "Server error!", loading: false });
				});
		}
	};

	activateHandler = (event) => {
		event.preventDefault();

		this.setState({ Email_error: "", email_sent: "" });

		var cal = false;
		if (this.state.Email == "") {
			this.setState({
				Email_error: "Enter Email"
			});
		} else {
			const data = {
				secure_pin,
				email_id: this.state.Email
			};

			this.setState({ loading_activate: true });

			send_varification_link(data)
				.then((res) => {
					if (
						res.data &&
						res.data.message == "Activation link sent in your email id"
					) {
						this.setState({ loading_activate: false, email_sent: 1 });
					} else {
						this.setState({ loading_activate: false, email_sent: 0 });
					}
				})
				.catch((res) => {
					console.log(";;")
					this.setState({ loading_activate: false, email_sent: 0 });
				});
		}
	};

	changeHandler = (event) => {
		console.log("states", this.state);
		this.setState({ [event.target.name]: event.target.value });
	};

	togglePasswordVisibilty = () => {
		const { isPasswordShown } = this.state;
		this.setState({ isPasswordShown: !isPasswordShown });
	};
	accActivate = () => {
		this.setState({
			isLoginPage: false,
			isActivationPage: true
		});
	};
	render() {
		const { isPasswordShown } = this.state;

		if (this.state.isSuccessLogin) {
			// return <Redirect to="/dashboard" />;
			window.location.assign("/dashboard#/location-manager");
		}
		if (this.state.isAlreadyLoginRememberme) {
			// return <Redirect to="/dashboard" />;
			window.location.assign("/dashboard#/location-manager");
		}
console.log("this.state.email_sent",this.state.email_sent)
		return (
			// <div>
			//   <div className="container">
			<div>
				<div className="modal fade" id="myModalSignin" role="dialog">
					<div className="modal-dialog " id="login_width">
						<form onSubmit={this.loginHandler} noValidate>
							<div className="modal-content ">
								<div className="modal-header modal_header">
									<h4 className="modal-title modal_header_heading">Log in</h4>
									<button
										type="button"
										className="modal_header_icon"
										data-dismiss="modal"
									>
										&times;
									</button>
								</div>

								<div className="modal-body modal_body">
									<div style={{ padding: "0px 8%" }}>
										<MDBRow>
											<MDBCol>
												<div className="modal_body_subheading">Email</div>

												<div>
													<input
														value={this.state.Email}
														name="Email"
														onChange={this.changeHandler}
														type="text"
														className="modal_inputbox modal_inputbox_new"
														required
													/>
													<div className="warning">
														{this.state.Email_error}
													</div>
												</div>
											</MDBCol>
										</MDBRow>

										<MDBRow>
											<MDBCol>
												<div className="modal_body_subheading">Password</div>
												<div>
													<input
														value={this.state.Password}
														name="Password"
														onChange={this.changeHandler}
														type={isPasswordShown ? "text" : "Password"}
														className="modal_inputbox modal_inputbox_new"
														required
													/>
													<div className="warning">
														{this.state.Password_error}
													</div>
												</div>
											</MDBCol>
										</MDBRow>

										<MDBRow>
											<MDBCol md="6">
												<span className="modal_checkbox">
													<Checkbox
														onClick={() =>
															this.setState({
																RememberMe: !this.state.RememberMe
															})
														}
													/>
												</span>
												<span md="5" className="modal_body_contant01">
													Remember me
												</span>
											</MDBCol>

											<MDBCol md="6" className="for-color">
												<Link to="Forgot">Forgot Password ? </Link>
											</MDBCol>
										</MDBRow>

										<MDBRow>
											<MDBCol md="6">
												<button type="submit" className="login_btn">
													Log in
												</button>
											</MDBCol>
										</MDBRow>

										{this.state.loading ? (
											<div className="warning">
												<Loader
													type="Oval"
													color="#00BFFF"
													height={25}
													width={25}

													// timeout={3000} //3 secs
												/>
											</div>
										) : (
											<div className="warning">
												{this.state.wrong == "Account deactivated!" ? (
													<div>
														Your account is not activate, Activate your account
														by{" "}
														<a
															data-toggle="modal"
															data-target="#activate_acount"
															className="for-color"
															onClick={this.accActivate}
															data-dismiss="modal"
														>
															clicking here
														</a>{" "}
													</div>
												) : (
													this.state.wrong
												)}
											</div>
										)}
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>

				{/* activate account */}
				<div className="modal fade" id="activate_acount" role="dialog">
					<div className="modal-dialog " id="login_width">
						<div className="modal-content ">
							<div className="modal-header modal_header">
								<h4 className="modal-title modal_header_heading">
									Activate account
								</h4>
								<button
									type="button"
									className="modal_header_icon"
									data-dismiss="modal"
								>
									&times;
								</button>
							</div>
							<form onSubmit={this.activateHandler} noValidate>
								<div className="modal-body modal_body">
									<div style={{ padding: "0px 8%" }}>
										<MDBRow>
											<MDBCol>
												<div className="modal_body_subheading">Email</div>

												<div>
													<input
														value={this.state.Email}
														name="Email"
														onChange={this.changeHandler}
														type="text"
														className="modal_inputbox modal_inputbox_new"
														readOnly
													/>
													<div className="warning">
														{this.state.Email_error}
													</div>
												</div>
											</MDBCol>
										</MDBRow>

										<div>
											<button type="submit" className="login_btn">
												Send email
											</button>
										</div>
										{this.state.loading_activate ? (
											<Loader
												type="Oval"
												color="#00BFFF"
												height={25}
												width={25}
												// timeout={3000} //3 secs
											/>
										) : this.state.email_sent == "" ? (
											<div className="warning"></div>
										) : this.state.email_sent == 0 ? (
											<div className="warning">Email not sent</div>
										) :
										 this.state.email_sent == 1 ? (
											<div className="fine">
												Email verification link has been sent to your inbox
												successfully
											</div>
										) : (
											<div className="warning">someting went wrong</div>
										)}
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			// </div>
			// </div>
		);
	}
}
