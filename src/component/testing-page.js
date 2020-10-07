import React from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

function Profile() {
  return (
    <>
      <div className="container profile_margin " id="overview-10">
        <div className="setting-10">
          <h3>Profile Setting</h3>
        </div>
        <div className="row acct_gap">
          <div className="col-md-3 setting-11 ">
            <div className="col-md-12 account-10">
              <h3> Account</h3>
            </div>
            <div className="col-md-12 account-11">
              <h3>Notification Setting</h3>
            </div>
            <div className="col-md-12 account-11">
              <h3> Biling</h3>
            </div>
            <div className="col-md-12 account-11">
              <h3> Integrations</h3>
            </div>
            <div className="col-md-12 account-11">
              <h3>Agency Setting</h3>
            </div>
          </div>
          <div className="col-md-8  ">
            <div className="row ">
              <div className=" setting-12">
                <h3>My Profile</h3>
              </div>
              <div className=" setting-13">
                <h3>Company Profile</h3>
              </div>
            </div>
            <div className="row setting-14">
              <div class="col-md-4 avatar  ">
                <img src={require("./assets/img_avatar.png")} alt="" />

                <p>Will Newman</p>
              </div>

              <div className="col-md-8 ">
                <div class="form-group row form_gap">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">
                    Email:
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="email"
                      class="form-control"
                      id="inputEmail3"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword3" class="col-sm-2 col-form-label">
                    Password:
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword3"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword3" class="col-sm-2 col-form-label">
                    Role:
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword3"
                      placeholder="Admin"
                    />
                  </div>
                </div>
                <div className="save_gap">
                  <button type="submit" class="btn btn-profile-10 ">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
