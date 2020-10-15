import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { all_connection_of_one_location } from "../apis/social_platforms";
import {
  location_by_id,
  business_categories,
  business_states
} from "../apis/location";

import {
  faqs_by_id,
  edit_faq,
  all_faq_by_location_id,
  delete_faq,
  all_faq,
  add_faq
} from "../apis/voice";
import GoogleLogin from "react-google-login";
import Spinner from "../common/Spinner";
import { MDBRow, MDBCol, MDBBtn, MDBCard, MDBContainer } from "mdbreact";
import Loader from "react-loader-spinner";

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

export default class UpdateFaq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faqid: "",
      que: "",
      ans: "",
      loader_update: false,
      show_err_updatefaq: ""
    };
  }

  handler = event => {
    console.log("states", this.state);
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    this.setState({ faqid: this.props.faqid });
    this.faqById();
  }

  faqById = () => {
    this.setState({ loader: true });
    var data = {
      faq_id: this.props.faqid
    };

    let filtered_faq = this.props.allfaq.filter(
      data => data.id === this.props.faqid
    );

    this.setState({
      que: filtered_faq[0].question,
      ans: filtered_faq[0].answer,
      loader_update: false
    });

    // faqs_by_id(data, DjangoConfig).then(resp => {
    //   console.log(resp);
    //   this.setState({
    //     que: resp.data.all_faqs.question,
    //     ans: resp.data.all_faqs.answer,
    //     loader_update: false
    //   });
    // });
  };

  render() {
    let { faqid, loader_update, show_err_updatefaq } = this.state;
    if (this.props.faqid != faqid) {
      this.faqById();
    }

    return (
      <div className="conntend">
        {loader_update ? (
          <Loader
            type="Oval"
            color="#00BFFF"
            height={25}
            width={25}
            // timeout={3000} //3 secs
          />
        ) : (
          <div className="row d-flex ">
            <div className="col-md-8">
              <div className="faq-title">
                <h4>
                  Question :{" "}
                  <input
                    type="text"
                    className="form-group"
                    name="que"
                    value={this.state.que}
                    onChange={this.handler}
                  />
                </h4>
                <div style={{ color: "red" }}>{this.props.error.que_error}</div>
              </div>
              <div className="faq-title">
                <h4>
                  Answer :{" "}
                  <input
                    type="text"
                    name="ans"
                    className="form-group"
                    value={this.state.ans}
                    onChange={this.handler}
                  />
                </h4>
                <div style={{ color: "red" }}>{this.props.error.ans_error}</div>
              </div>
            </div>

            <div className="col-md-2">
              <button
                onClick={this.props.update(
                  this.state.que,
                  this.state.ans,
                  this.props.faqid
                )}
                className="btn"
              >
                update
              </button>
            </div>
            <div className="col-md-2">
              <button onClick={this.props.cancel} className="btn">
                cancel
              </button>
            </div>
            <div className="warning">{show_err_updatefaq}</div>
          </div>
        )}
      </div>
    );
  }
}
