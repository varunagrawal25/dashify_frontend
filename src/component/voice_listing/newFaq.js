import React, { Component } from "react";

import { add_faq} from "../apis/voice";
import Spinner from "../common/Spinner";
import { MDBRow, MDBCol,  MDBContainer } from "mdbreact";
import Loader from "react-loader-spinner";
import { secure_pin } from "../../config";
const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

export default class NewFaq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      que: "",
      ans: "",
      loader_new: false,
      show_err_newfaq: ""
    };
  }

  handler = event => {
    try{
    console.log("states", this.state);
    this.setState({ [event.target.name]: event.target.value });
  }catch(e){}
  };

  submitFaq = (que, ans) => event => {
    try{
    event.preventDefault();

    this.setState({ loader_new: true, show_err_newfaq: "" });
    var data = {
      secure_pin,
      user_id: localStorage.getItem("UserId"),
      location_id: this.props.locationId,
      que: que,
      ans: ans
    };
    add_faq(data)
      .then(async resp => {
        await this.props.getNewAllFaq();
        await this.props.cancel();
        this.setState({ loader_new: false });
      })
      .catch(err => {
        this.setState({
          loader_new: false,
          show_err_newfaq: "New Faq couldn't added"
        });
      });
    }catch(e){}};

  render() {
    let { show_err_newfaq, loader_new } = this.state;
    return (
      <div className="conntend">
        {loader_new ? (
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
                    onChange={this.handler}
                  />
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
                  onChange={this.handler}
                />
                
  </MDBCol>
</MDBRow>
          </MDBCol>
         
          <MDBCol md="4" className='vl_gap2' >
          <button type="submit" className="user_btn" onClick={this.submitFaq(this.state.que, this.state.ans)}>
                          Submit
                        </button>
                        <button
                          className="user_btn"
                          onClick={this.props.cancel}
                        >
                          {" "}
                          Cancel
                        </button>
                        <div className="warning">{show_err_newfaq}</div>
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
          //           onChange={this.handler}
          //         />
          //       </h4>
          //     </div>
          //     <div className="faq-title">
          //       <h4>
          //         Answer :{" "}
          //         <input
          //           type="text"
          //           name="ans"
          //           className="form-group"
          //           onChange={this.handler}
          //         />
          //       </h4>
          //     </div>
          //   </div>

          //   <div className="col-md-2">
          //     <button
          //       onClick={this.submitFaq(this.state.que, this.state.ans)}
          //       className="btn"
          //     >
          //       Save
          //     </button>
          //   </div>
          //   <div className="col-md-2">
          //     <button onClick={this.props.cancel} className="btn">
          //       Cancel
          //     </button>
          //   </div>
          //   <div className="warning">{show_err_newfaq}</div>
          // </div>
        )}
      </div>
    );
  }
}
