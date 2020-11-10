import React, { Component } from "react";
import "./Flaticon.css";
import "./App.css";
import "reactjs-popup/dist/index.css";
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
import pricing from "./component/landingpage/Pricing";
import How_we_work from "./component/landingpage/How_we_work";
import Login from "./component/landingpage/login";
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
import PrivateRoute from "./auth/PrivateRoute";
import Listing_management from './component/landingpage/Listing_management'
import Our_news from './component/landingpage/Ournews'
import Our_team from './component/landingpage/Our_team'
import Scanner from './component/landingpage/Scanner'
import PasswordReset from "./component/landingpage/password-reset";
import Aboutus from './component/landingpage/Aboutus'
import Contactus from './component/landingpage/contactus'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <SideBar/> */}

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/:param1/:param2"
              render={props => <Home {...props} />}
            />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/career" component={Career} />
            <Route exact path="/contactus" component={ContactUs} />
            <Route exact path="/support" component={Support} />
            <Route exact path="/pricing" component={pricing} />
            <Route exact path="/how-we-work" component={How_we_work} />
           
            {/* <Route exact path="/" component={Home} /> */}
             <Route  path="/about-us" component={Aboutus} />
             <Route  path="/contact-us" component={Contactus} />
             <Route  path="/listing-management" component={Listing_management} />
             <Route  path="/our-news" component={Our_news} />
             <Route  path="/our-team" component={Our_team} />
             <Route  path="/scanner" component={Scanner} />
             <Route  path="/review-management" component={Review_management} />
            {/* <Route exact path="/Login" component={Login} /> */}

            <Route
              exact
              path="/password-reset/:param1/:param2"
              render={props => <PasswordReset {...props} />}
            />

            <Route exact path="/Signup" component={Signup} />
            {/* <Route
              exact
              path="/email-confirmation/:username"
              component={EmailConfirmation}
            /> */}
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

            <PrivateRoute exact path="/dashboard" component={MainApp} />
            <Route path="/" component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
