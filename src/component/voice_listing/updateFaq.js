import React, { Component } from "react";

import {edit_faq} from "../apis/voice";
import Spinner from "../common/Spinner";
import { MDBRow, MDBCol,  MDBContainer } from "mdbreact";
import Loader from "react-loader-spinner";
import { secure_pin } from "../../config";
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
      que_error: "",
      ans_error: "",
      loader_update: false,
      show_err_updatefaq: ""
    };
  }

  handler = event => {
    try{
    console.log("states", this.state);
    this.setState({ [event.target.name]: event.target.value });
  }catch(e){}
  };

  componentDidMount() {
    try{
    this.setState({ faqid: this.props.faqid });
    this.faqById(this.props.faqid);
  }catch(e){}}

  faqById = id => {
    try{
    var data = {
      faqid: id
    };

    let filtered_faq = this.props.allfaq.filter(data => data.id === id);

    this.setState({
      que: filtered_faq[0].que,
      ans: filtered_faq[0].ans
    });

    // faqs_by_id(data, DjangoConfig).then(resp => {
    //   console.log(resp);
    //   this.setState({
    //     que: resp.data.all_faqs.question,
    //     ans: resp.data.all_faqs.answer,
    //     loader_update: false
    //   });
    // });
  }catch(e){} };

  updateFaq = (que, ans, id) => event => {
    try{
    event.preventDefault();
    var data = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.locationId,
      que: que,
      ans: ans,
      faqid: id
    };
console.log("update_data",data)
    this.setState({ que_error: "", ans_error: "", loader_update: true });

    let is_que = false,
      is_ans = false;

    if (que) {
      is_que = true;
    } else {
      this.setState({ que_error: "Question can not be empty" });
    }

    if (ans) {
      is_ans = true;
    } else {
      this.setState({ ans_error: "Answer can not be empty" });
    }

    if (is_ans && is_que) {
      edit_faq(data)
        .then(async resp => {
          console.log("edit",resp)
          await this.props.getNewAllFaq();
          await this.props.cancel();
          this.setState({
            update: false,
            loader_update: false
          });
        })
        .catch(err => {
          this.setState({
            loader_update: false,
            show_err_updatefaq: "server error"
          });
        });
    }
  }catch(e){}};

  render() {
    let { faqid, loader_update, show_err_updatefaq } = this.state;
    if (this.props.faqid != faqid) {
      this.setState({ faqid: this.props.faqid });
      this.faqById(this.props.faqid);
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
          <MDBContainer>
          <MDBRow>
            <MDBCol md='8'  >
  <MDBRow className='vl_gap1'>
    <MDBCol md='3' className="vl_input_head">
    Question :
    </MDBCol>
    <MDBCol md='9' >
                     <input
                    type="text"
                    className="vl_input"
                    name="que"
                    value={this.state.que}
                    onChange={this.handler}
                  />
                  <div style={{ color: "red" }}>{this.state.que_error}</div>
    </MDBCol>
  </MDBRow>
  <MDBRow className='vl_gap1'>
    <MDBCol md='3' className="vl_input_head ">
    Answer :
    </MDBCol>
    <MDBCol md='9' >
    <textarea
                     type="text"
                     name="ans"
                     className="vl_input"
                     value={this.state.ans}
                     onChange={this.handler}
                   />
                  <div style={{ color: "red" }}>{this.state.ans_error}</div>
    </MDBCol>
  </MDBRow>
            </MDBCol>
           
            <MDBCol md="4" className='vl_gap2' >
                          <button
                onClick={this.updateFaq(
                  this.state.que,
                  this.state.ans,
                  this.props.faqid
                )}
                className="user_btn"
              >
                Update
              </button>
              <button onClick={this.props.cancel} className="user_btn">
                Cancel
              </button>
            <div className="warning">{show_err_updatefaq}</div>
            </MDBCol>
          </MDBRow>
          </MDBContainer>
          // <div className="row d-flex ">
          //   <div className="col-md-8">
          //     <div className="faq-title">
          //       <h4>
          //         Question :{" "}
          //         <input
          //           type="text"
          //           className="form-group"
          //           name="que"
          //           value={this.state.que}
          //           onChange={this.handler}
          //         />
          //       </h4>
          //       <div style={{ color: "red" }}>{this.state.que_error}</div>
          //     </div>
          //     <div className="faq-title">
          //       <h4>
          //         Answer :{" "}
          //         <input
          //           type="text"
          //           name="ans"
          //           className="form-group"
          //           value={this.state.ans}
          //           onChange={this.handler}
          //         />
          //       </h4>
          //       <div style={{ color: "red" }}>{this.state.ans_error}</div>
          //     </div>
          //   </div>

          //   <div className="col-md-2">
          //     <button
          //       onClick={this.updateFaq(
          //         this.state.que,
          //         this.state.ans,
          //         this.props.faqid
          //       )}
          //       className="btn"
          //     >
          //       update
          //     </button>
          //   </div>
          //   <div className="col-md-2">
          //     <button onClick={this.props.cancel} className="btn">
          //       cancel
          //     </button>
          //   </div>
          //   <div className="warning">{show_err_updatefaq}</div>
          // </div>
        )}
      </div>
    );
  }
}
