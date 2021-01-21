import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  HashRouter,
  NavLink
} from "react-router-dom";
import CampaignPart2 from "./campaignpart2";
import ReviewGenerationCampaign from "./review-generation-campaign";
import ReviewGenerationCampaign2 from "./review-generation-campaign2";
import ReviewTracking from "./review-tracking";
import ViewAListing from "./view-listing";
import VoiceListing from "./voice_listing/voice-listing";

import ReviewAnalytics from "./review-analytics";
import RankingAnalytics from "./ranking-analytics";
import Topbarmenu from "./topbarmenu";

import User_profile from "./user_profile";
import Notification from "./notification";
import SettingMain from "./setting-main";
import SettingAccounts from "./setting-accounts";
import SettingPeople from "./setting-people";
import SettingBilling from "./setting-billing";
import SettingEmail from "./setting-email";
import SettingUpdateCard from "./setting-updateCard";
import SideBar from "./sidebar";
import PromotionalPost from "./promotional-post";
import PromotionalPostSorry from "./promotional-post-sorry";
import ViewLocations from "./view-locations";
import LocationManager from "./location-manager";
import ProfileAnalytics from "./profile-analytics";
import ViewListing from "./view-listing";
import Overview from "./overview";
import ReviewGenerationStats from "./review-generation-stats";
import AddLocation from "./add-location";
import ConnectedAccounts from "./connectedaccounts";
import GoogleConnectedAccounts from "./google-connectedaccounts";
import LinkedinConnectedAccounts from "./linkedin-connectedaccounts";
import HereRelatedLocation from "./here-related-location";
import TomtomRelatedLocation from "./tomtom-related-location";
import PageNotFound from "./page-not-found";
import CommonLogin from "./CommonLogin";
import InviteNewUser from "./InviteNewUser";
import SettingAgency from "./setting-agency";

export default class MainApp extends Component {
  render() {
    console.log(localStorage.getItem("locationId"));

    return (
      <div>
        <Topbarmenu />
        <SideBar />
        <HashRouter>
          <div className="content-page">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="breadcrumb-menu">
                    <ul>
                      <li>
                        <NavLink
                          to={
                            "/locations/" +
                            localStorage.getItem("locationId") +
                            "/overview"
                          }
                          className="underline-from-left"
                        >
                          Overview
                        </NavLink>
                      </li>

                      <li className="dropdown">
                        <NavLink
                          to={
                            "/locations/" +
                            localStorage.getItem("locationId") +
                            "/view-listing"
                          }
                          className="underline-from-left dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          Listing
                        </NavLink>
                        <ul className="dropdown-menu">
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/view-listing"
                              }
                            >
                              View Listing
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/view-location"
                              }
                            >
                              View Location
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/voice-listing"
                              }
                            >
                              Voice Listing
                            </NavLink>
                          </li>
                        </ul>
                      </li>

                      <li className="dropdown">
                        <NavLink
                          to={
                            "/locations/" +
                            localStorage.getItem("locationId") +
                            "/review-analytics"
                          }
                          className="underline-from-left dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          Analytics
                        </NavLink>
                        <ul className="dropdown-menu">
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/profile-analytics"
                              }
                            >
                              Profile Analytics
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/review-analytics"
                              }
                            >
                              Review Analytics
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/ranking-analytics"
                              }
                            >
                              Ranking Analytics
                            </NavLink>
                          </li>
                         
                        </ul>
                      </li>

                      <li>
                        <NavLink
                          to="/location-manager"
                          className="underline-from-left"
                        >
                          Location Manager
                        </NavLink>
                      </li>
                      <li className="dropdown">
                        <NavLink
                          to={
                            "/locations/" +
                            localStorage.getItem("locationId") +
                            "/review-tracking"
                          }
                          className="underline-from-left dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          Review Generations
                        </NavLink>
                        <ul className="dropdown-menu">
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/review-generation-campaign"
                              }
                            >
                              Generation
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/review-tracking"
                              }
                            >
                              Tracking
                            </NavLink>
                          </li>
                          {/* <li>
                            <NavLink to="/b">Wedgets</NavLink>
                          </li> */}
                          <li>
                            <NavLink
                              to={
                                "/locations/" +
                                localStorage.getItem("locationId") +
                                "/review-generation-stats"
                              }
                            >
                              Review Generation Stats
                            </NavLink>
                          </li>
                        </ul>
                      </li>

                      <li className="dropdown">
                        <NavLink
                          to={
                            "/locations/" +
                            localStorage.getItem("locationId") +
                            "/promotional"
                          }
                          className="underline-from-left"
                        >
                          Promotional Posts
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="content">
              <Switch>
                <Route
                  exact
                  path="/locations/:locationId/overview"
                  render={props => <Overview {...props} />}
                />

                <Route
                  exact
                  path="/setting-main/setting-people/invite-new-user"
                  render={props => <InviteNewUser {...props} />}
                />
                <Route
                  exact
                  path="/locations/:locationId/campaignpart2/:campaign_id"
                  render={props => <CampaignPart2 {...props} />}
                />
                <Route
                  exact
                  path="/locations/:locationId/review-generation-campaign"
                  render={props => <ReviewGenerationCampaign {...props} />}
                />
                <Route
                 exact
                path="/common-login/:name"
                component={CommonLogin} />
                {/* <Route
                  
                  path="/review-generation-campaign-step-2"
                  component={ReviewGenerationCampaign2}
                /> */}
                <Route
                  exact
                  path="/locations/:locationId/review-tracking"
                  render={props => <ReviewTracking {...props} />}
                />
                <Route exact path="/" component={Overview} />
                <Route
                  exact
                  path="/locations/:locationId/view-listing"
                  render={props => <ViewListing {...props} />}
                />
                <Route
                  exact
                  path="/locations/:locationId/voice-listing"
                  render={props => <VoiceListing {...props} />}
                />
                <Route
                  exact
                  path="/locations/:locationId/view-location"
                  render={props => <ViewLocations {...props} />}
                />
                <Route
                  exact
                  path="/location-manager"
                  component={LocationManager}
                />

                <Route
                  exact
                  path="/locations/:locationId/review-analytics"
                  render={props => <ReviewAnalytics {...props} />}
                />
                <Route
                  exact
                  path="/locations/:locationId/ranking-analytics"
                  render={props => <RankingAnalytics {...props} />}
                />
                <Route
                  exact
                  path="/locations/:locationId/profile-analytics"
                  render={props => <ProfileAnalytics {...props} />}
                />

               

                <Route
                  exact
                  path="/locations/:locationId/promotional"
                  render={props => <PromotionalPost {...props} />}
                />
                <Route
                  exact
                  path="/promotional-sorry"
                  component={PromotionalPostSorry}
                />
                <Route
                  exact
                  path="/locations/:locationId/review-generation-stats"
                  render={props => <ReviewGenerationStats {...props} />}
                />
                <Route exact path="/add-location" component={AddLocation} />

                <Route exact path="/user-profile" component={User_profile} />
                <Route exact path="/notification" component={Notification} />
                <Route exact path="/setting-main" component={SettingMain} />
                <Route
                  path="/setting-main/setting-accounts"
                  component={SettingAccounts}
                />
                <Route
                  exact
                  path="/setting-main/setting-people"
                  component={SettingPeople}
                />
                <Route
                  exact
                  path="/setting-main/setting-agency"
                  component={SettingAgency}
                />
                
<Route
                  exact
                  path="/setting-main/setting-billing"
                  component={SettingBilling}
                />
                <Route
                  exact
                  path="/setting-main/setting-email"
                  component={SettingEmail}
                />

                <Route
                  exact
                  path="/setting-main/setting-updateCard"
                  component={SettingUpdateCard}
                />

                <Route
                  exact
                  path="/connectedaccounts/:redirect_to"
                  render={props => <ConnectedAccounts {...props} />}
                />
                <Route
                  exact
                  path="/google-connectedaccounts/:state"
                  render={props => <GoogleConnectedAccounts {...props} />}
                />
                <Route
                  exact
                  path="/linkedin-connectedaccounts/:state/:redirect_to/:locationId"
                  render={props => <LinkedinConnectedAccounts {...props} />}
                />
                <Route
                  exact
                  path="/here-related-location"
                  component={HereRelatedLocation}
                />
                <Route
                  exact
                  path="/tomtom-related-location"
                  component={TomtomRelatedLocation}
                />
                <Route path="/" component={PageNotFound} />
              </Switch>
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}
