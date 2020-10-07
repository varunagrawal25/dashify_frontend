import React, { Component } from "react";
import "./Flaticon.css";
import "./App.css";

import MainApp from "./component/main";

import InstagramLogin from "./component/instagramlogin";
import YelpLogin from "./component/yelplogin";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./component/landingpage/home";
import Review_management from "./component/landingpage/Review_management";
import Blog from "./component/landingpage/Blog";
import Career from "./component/landingpage/career";
import ContactUs from "./component/landingpage/contactus";
import Support from "./component/landingpage/support";
import How_we_work from "./component/landingpage/How_we_work";
import Login from "./component/landingpage/login";
import LoginAndActivateAccount from "./component/landingpage/login-activateAccount";
import Signup from "./component/landingpage/signup";
import Forgot from "./component/landingpage/forgot.js";
import FourSquareLogin from "./component/foursquarelogin";
import DnbLogin from "./component/dnblogin";
import AppleLogin from "./component/applelogin";
import CitySearchLogin from "./component/citysearchlogin";
import HereLogin from "./component/herelogin";
import ZillowLogin from "./component/zillowlogin";
import TomtomLogin from "./component/tomtomlogin";
import ZomatoLogin from "./component/zomatologin";
import AvvoLogin from "./component/avvologin";
import { LinkedInPopUp } from "react-linkedin-login-oauth2";
import PageNotFound from "./component/page-not-found";

import EmailConfirmation from "./component/landingpage/email-confirmation";
import PasswordReset from "./component/landingpage/password-reset";
import Pricing from "./component/landingpage/Pricing";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <SideBar/> */}

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/career" component={Career} />
            <Route exact path="/contactus" component={ContactUs} />
            <Route exact path="/support" component={Support} />
            <Route exact path="/how-we-work" component={How_we_work} />
            <Route exact path="/pricing" component={Pricing} />
            <Route
              exact
              path="/review-management"
              component={Review_management}
            />
            {/* <Route exact path="/Login" component={Login} /> */}

            <Route
              path="/Login/:param1/:param2"
              render={props => <LoginAndActivateAccount {...props} />}
            />
            <Route
              exact
              path="/password-reset/:param1/:param2"
              render={props => <PasswordReset {...props} />}
            />

            <Route exact path="/Signup" component={Signup} />
            <Route
              exact
              path="/email-confirmation/:username"
              component={EmailConfirmation}
            />
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/instagramlogin" component={InstagramLogin} />
            <Route exact path="/yelplogin" component={YelpLogin} />
            <Route exact path="/foursquarelogin" component={FourSquareLogin} />
            <Route exact path="/dnblogin" component={DnbLogin} />
            <Route exact path="/applelogin" component={AppleLogin} />
            <Route exact path="/citysearchlogin" component={CitySearchLogin} />
            <Route exact path="/herelogin" component={HereLogin} />
            <Route exact path="/zillowlogin" component={ZillowLogin} />
            <Route exact path="/tomtomlogin" component={TomtomLogin} />
            <Route exact path="/zomatologin" component={ZomatoLogin} />
            <Route
              path="/avvologin"
              render={props => <AvvoLogin {...props} />}
            />

            <Route exact path="/linkedin" component={LinkedInPopUp} />

            <Route exact path="/dashboard" component={MainApp} />
            <Route path="/" component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
