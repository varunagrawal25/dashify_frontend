import React, { Component } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { all_jobs, apply_for_job } from "../apis/outside_pages";

export default class Career extends Component {
  state = {
    loader: true,
    jobs: {},
    jobs_category: [],
    u_name: "",
    u_email: "",
    u_contactNo: "",
    job_category_id: "",
    job_id: "",
    u_name_error: "",
    u_email_error: "",
    u_contactNo_error: ""
  };
  componentDidMount = () => {
    all_jobs()
      .then(res => {
        console.log("all jobs", res.data);
        let jobs_category = [];
        let jobs = {};
        Promise.all(
          res.data.map(data => {
            if (jobs[data.Category_name.id]) {
              jobs = {
                ...jobs,
                [data.Category_name.id]: [
                  ...jobs[data.Category_name.id],
                  { job_id: data.id, job_name: data.Job_Title }
                ]
              };
            } else {
              jobs = {
                ...jobs,
                [data.Category_name.id]: [
                  { job_id: data.id, job_name: data.Job_Title }
                ]
              };
              jobs_category = [
                ...jobs_category,
                {
                  category_id: data.Category_name.id,
                  category_name: data.Category_name.CategoryName
                }
              ];
            }
          })
        ).then(res => {
          this.setState({ jobs_category, jobs, loader: false });
          console.log("jobs_category", jobs_category);
          console.log("jobs", jobs);
        });
      })
      .catch(err => {
        console.log("all jobs error", err);
        this.setState({ loader: false });
      });
  };

  onSubmit = e => {
    e.preventDefault();

    let { u_name, u_email, u_contactNo, job_id, job_category_id } = this.state;
    let isError = false;

    // for checking email
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    this.setState({
      u_name_error: "",
      u_email_error: "",
      u_contactNo_error: "",
      job_id_error: ""
    });

    if (u_name == "") {
      this.setState({
        u_name_error: "Enter your full name"
      });
      isError = true;
    }
    if (u_email == "") {
      this.setState({ u_email_error: "Enter your email" });
      isError = true;
    } else if (reg.test(u_email) == false) {
      this.setState({ u_email_error: "Invalid email" });
      isError = true;
    }
    if (u_contactNo == "") {
      this.setState({ u_contactNo_error: "Enter your Conatct no." });
      isError = true;
    } else if (u_contactNo.length != 10) {
      this.setState({ u_contactNo_error: "Conatct no. must be of 10 digits" });
      isError = true;
    }
    if (job_id == "") {
      this.setState({ job_id_error: "Please select a job" });
      isError = true;
    }

    if (!isError) {
      this.setState({ loading: true });

      const data = {
        Job_title: Number(job_id),
        job_cate: job_category_id,
        Name: u_name,
        email: u_email,
        contact_no: u_contactNo
      };

      apply_for_job(data)
        .then(res => {
          this.setState({ loading: false });
          alert("Submitted succesfully");
          console.log("apply for job response", res.data);
        })
        .catch(res => {
          alert("Something went wrong");
          this.setState({ loading: false });
          console.log("apply for job error", res, data);
        });
    }
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log("this.state", this.state);
  };

  aplyForJob = () => {
    let {
      job_category_id,
      jobs,
      u_name,
      u_email,
      u_contactNo,
      job_id_error,
      u_name_error,
      u_email_error,
      u_contactNo_error
    } = this.state;
    if (job_category_id && jobs[job_category_id]) {
      return (
        <div id="myModal2" className="modal fade" role="dialog">
          <div className="foursquer-logo">
            <img src={require("../../images/apple.png")} alt="" />
          </div>
          <div className="login_form">
            <form onSubmit={this.onSubmit}>
              <fieldset className="login_fieldset">
                <legend>Apply</legend>
                <p>
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="u_name"
                    name="u_name"
                    value={u_name}
                    onChange={this.changeHandler}
                  />
                  <div style={{ color: "red" }}>{u_name_error}</div>
                </p>

                <p>
                  <label htmlFor="job">select job</label>
                  <select
                    name="job_id"
                    onChange={this.changeHandler}
                    className="form-control"
                    id="job_id"
                    required
                  >
                    <option value="0" disabled="">
                      select job
                    </option>
                    {jobs[job_category_id].map((j, i) => (
                      <option key={`job-${i}`} value={j.job_id}>
                        {j.job_name}
                      </option>
                    ))}
                  </select>
                  <div style={{ color: "red" }}>{job_id_error}</div>
                </p>

                <p>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="text"
                    id="u_email"
                    name="u_email"
                    value={u_email}
                    onChange={this.changeHandler}
                  />
                  <div style={{ color: "red" }}>{u_email_error}</div>
                </p>
                <p>
                  <label htmlFor="contactNo">Your Contact No.</label>
                  <input
                    type="number"
                    id="u_contactNo"
                    name="u_contactNo"
                    value={u_contactNo}
                    onChange={this.changeHandler}
                  />
                  <div style={{ color: "red" }}>{u_contactNo_error}</div>
                </p>
                <p>
                  <button type="submit">Submit</button>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      );
    }
  };

  showJobs = () => {
    let { jobs_category, jobs } = this.state;

    return jobs_category.map((data1, i) => {
      let a1 = `#collapse${i}`;
      let a2 = `collapse${i}`;
      return (
        <div>
          <div
            className="card-header collapsed"
            data-toggle="collapse"
            href={a1}
          >
            <a className="card-title">{data1.category_name}</a>
          </div>
          <div id={a2} className="card-body collapse" data-parent="#accordion">
            {jobs[data1.category_id].map((data2, i2) =>
              i2 == 0 ? <p>{data2.job_name}</p> : <p>,{data2.job_name}</p>
            )}
            <button
              href="#"
              data-toggle="modal"
              className="editicon"
              data-target="#myModal2"
              onClick={() =>
                this.setState({ job_category_id: data1.category_id })
              }
            >
              Apply
            </button>
          </div>
        </div>
      );
    });
  };

  render() {
    let { loader, jobs, jobs_category } = this.state;
    return (
      <div>
        <Navbar />

        <div className="review-faq">
          <div className="container">
            <div className="review-rank">
              <h2>Why your business needs review and ranking analytics</h2>
              <p>
                Every business that wants to grow organically, utilizes these
                techniques to stay ahead. Having such information available to
                you goes a long way in improving the services of your business.
                Here is how you can benefit from our review and ranking analytic
                services:
              </p>
            </div>

            <div id="accordion" class="accordion">
              <div className="card mb-0">{this.showJobs()}</div>
            </div>
          </div>
        </div>
        <div className="review-demo">
          <div className="container">
            <div className="review-text">
              <div class="row">
                <div className="col-md-7">
                  <p>
                    Our user-friendly systems will give you all ranking and
                    review analytics that you can utilize to grow your business.
                    We are experts in these services and will make sure that you
                    have everything you need to grow your business in the best
                    direction. If you want to employ the use of the review and
                    ranking analytics then hire our services now!{" "}
                  </p>
                </div>
                <div className="col-md-5 text-center">
                  <div class="banner-btn">
                    <a href="#" class="book_btn">
                      Book A Demo{" "}
                    </a>
                    <a href="#" class="learn_btn">
                      Learn more{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cricle9">
            <img src={require("../assets/ellipse-30.png")} alt="" />
          </div>
        </div>

        {/* job form */}
        {this.aplyForJob()}
        {/* job form */}
        <Footer />
      </div>
    );
  }
}
