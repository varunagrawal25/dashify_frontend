import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { add_social_account } from "./apis/social_platforms";
import Spinner from "./common/Spinner";

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

class LinkedinConnectedAccounts extends Component {
  state = {
    loading: false,
    isUrl: false,
    loader: true,
    all_pages: [],
    linkedinToken: "",
    redirect_to: ""
  };

  componentDidMount = async () => {
    console.log(
      "all props",
      this.props.match.params.state,
      this.props.match.params.redirect_to
    );
    await this.setState({
      linkedinToken: this.props.match.params.state,
      redirect_to: this.props.match.params.redirect_to
    });

    const LinkedinConfig = {
      headers: {
        Authorization: "Bearer " + this.state.linkedinToken
      }
    };

    Axios.get(
      "https://cors-anywhere.herokuapp.com/https://api.linkedin.com/v2/organizationAcls?q=roleAssignee&role=ADMINISTRATOR&projection=(elements*(*,roleAssignee~(localizedFirstName, localizedLastName), organization~(localizedName)))",
      LinkedinConfig
    )
      .then(resp => {
        console.log("linkedin location", resp.data);
        this.setState({
          all_pages: resp.data && resp.data.elements ? resp.data.elements : [],
          loader: false
        });
      })
      .catch(res => {
        this.setState({
          loader: false
        });
        console.log("linkedin error", res);
      });
  };

  onSubmit = index => e => {
    e.preventDefault();
    this.setState({ loading: true });

    const data = {
      location_id: this.props.match.params.locationId,
      Platform: "Linkedin",
      Token: this.state.linkedinToken,
      Username: this.state.all_pages[index]["organization~"].localizedName,
      Email: "",
      Password: "",
      Connect_status: "Connect",
      Other_info: this.state.all_pages[index]["organization"]
    };

    add_social_account(data, DjangoConfig)
      .then(resp => {
        console.log("linkedin location response", resp.data);
        this.setState({ isUrl: true, loading: false });
      })
      .catch(resp => {
        console.log(resp);
        this.setState({ loading: false });
      });
  };

  render() {
    var link;
    if (this.state.isUrl) {
      return (
        <Redirect
          to={`/locations/${this.props.match.params.locationId}/${this.state.redirect_to}`}
        />
      );
    }

    const allPages = this.state.all_pages.map((p, i) => {
      return (
        <form onSubmit={this.onSubmit(i)}>
          <div className="listdata" key={p.id}>
            <div className="row d-flex">
              <div className="col-md-9">
                <div className="authordata ">
                  <div className="authordatatext">
                    <h3>{p["organization~"].localizedName}</h3>
                  </div>
                </div>
              </div>

              {/* <div className="col-md-3">
                <div className="text-center address">
                  <h4>{p.primaryCategory.displayName}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center phonenumber">
                  {p.address ? (
                    <div>
                      {p.address.addressLines.map(data => data)},
                      {p.address.locality},{p.address.administrativeArea},
                      {p.address.postalCode}
                    </div>
                  ) : (
                    "-"
                  )}

                  {p.primaryPhone ? (
                    <div>
                      {" "}
                      <br /> <b>Call:</b> {p.primaryPhone}{" "}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div> */}
              <div className="col-md-3">
                <div className="action">
                  <button type="submit">connect</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      );
    });

    return (
      <div>
        <div className="rightside_title">
          <div className="foursquer-logo">
            <img src={require("../images/linkedin.png")} alt="Linkedin" />
          </div>
          <h1>Linkedin locations</h1>
        </div>
        <div className="tablediv">
          <div className="border-bottom">
            <div className="dataview nametop">
              <div className="titledivb">
                <div className="row">
                  <div className="col-md-9">
                    <div className="company-name text-left">
                      Organization name
                    </div>
                  </div>
                  {/* <div className="col-md-3">
                    <div className="company-name text-center">Category</div>
                  </div>
                  <div className="col-md-3">
                    <div className="company-name text-center">Address</div>
                  </div> */}
                  <div className="col-md-3">
                    <div className="company-name text-center">Action</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {this.state.loader ? (
            <Spinner />
          ) : this.state.all_pages.length == 0 ? (
            <div className="listdata" key="no linedin page">
              <div className="row d-flex">
                <div className="col-md-12">
                  <div className="authordata ">
                    <div className="authordatatext">
                      <h3>No Linkedin page to connect</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>{allPages}</div>
          )}
        </div>
      </div>
    );
  }
}

export default LinkedinConnectedAccounts;
