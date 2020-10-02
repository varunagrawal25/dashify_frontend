import React, { Component } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import Axios from "axios";
import Spinner from "../common/Spinner";
import { all_blogs } from "../apis/outside_pages";

export default class Blog extends Component {
  state = {
    loader: true,
    date_of_blogs: [],
    blogs: {},
    indexOfDate: 0,
    currentPage: 1,
    BlogsPerPage: 12
  };

  componentDidMount() {
    var today = new Date();

    all_blogs()
      .then(res => {
        console.log("all blogs", res.data);
        let blogs = {};
        let date = "";
        let date_of_blogs = [];
        Promise.all(
          res.data.map(data => {
            date = data.Create_date.slice(0, 7);
            if (blogs[date]) {
              blogs = { ...blogs, [date]: [...blogs[date], data] };
            } else {
              blogs = { ...blogs, [date]: [data] };
              date_of_blogs = [...date_of_blogs, date];
            }
          })
        ).then(res => {
          this.setState({ blogs, date_of_blogs, loader: false });
          console.log("blogs", blogs);
          console.log("date_of_blogs", date_of_blogs);
        });
      })
      .catch(res => {
        console.log("error in blogs", res);
        this.setState({ loader: false });
      });
  }

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  };

  showMonthAndYear = data => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    let showMonthAndYear = "";
    let arrayOfMonthAndYear = data ? data.split("-") : "";
    if (arrayOfMonthAndYear) {
      return `${monthNames[arrayOfMonthAndYear[1] - 1]} ${
        arrayOfMonthAndYear[0]
      }`;
    }
  };

  //   changeItemsPerPage = event => {
  //     console.log("items", event.target.value);
  //   };

  render() {
    var link;

    let {
      blogs,
      date_of_blogs,
      indexOfDate,
      currentPage,
      BlogsPerPage
    } = this.state;

    let show_blogs = blogs[date_of_blogs[indexOfDate]]
      ? blogs[date_of_blogs[indexOfDate]]
      : [];

    // Logic for displaying Locations
    const indexOfLastBlog = currentPage * BlogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - BlogsPerPage;
    const currentBlogs = show_blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const renderBlogs = currentBlogs.map((b, index) => {
      if (index % 10 == 0 || (index - 6 >= 0 && (index - 6) % 10 == 0)) {
        return (
          <div className="col-md-8" key={b.id}>
            <div className="blog-shadow">
              <div className="row">
                <div className="col-md-6">
                  <img src={b.Blog_Image} alt="Blog Image" />
                </div>
                <div className="col-md-6">
                  <div className="blog-descrition height-one">
                    <div className="latext">
                      <h5>{b.Blog_Title.slice(0, 60)}</h5>
                      <p>{b.Message.slice(0, 100)}</p>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-3">
      <div className="text-center action">
        <div style={{ display: "none" }}>
          {(link = `viewblog/${b.id}`)}
        </div>
        <a href={link}>View blog</a>
      </div>
    </div> */}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="col-md-4" key={b.id}>
            <div className="blog-shadow">
              <img src={b.Blog_Image} alt="Blog Image" />

              <div className="blog-descrition height-two">
                <div className="latext">
                  <h5>{b.Blog_Title.slice(0, 60)}</h5>
                  <p>{b.Message.slice(0, 150)}</p>
                </div>
              </div>
              {/* <div className="col-md-3">
        <div className="text-center action">
          <div style={{ display: "none" }}>
            {(link = `viewblog/${b.id}`)}
          </div>
          <a href={link}>View blog</a>
        </div>
      </div> */}
            </div>
          </div>
        );
      }
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(show_blogs.length / BlogsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li>
          <span key={number} id={number} onClick={this.handleClick}>
            {number}
          </span>
        </li>
      );
    });

    return (
      <div>
        <Navbar />
        <div className="main-blog">
          <div className="container">
            <div className="blog-title">
              <h2 className="heading">Our Blogs</h2>
              <p>
                Find solutions to customer service, general inquiry, product
                problem, business <br />
                partnership, software upgrade, refund policy and any other
                issues related to Dashify
              </p>

              <ul>
                <li>
                  {indexOfDate > 0 ? (
                    <div>
                      <img
                        onClick={() =>
                          this.setState({ indexOfDate: indexOfDate - 1 })
                        }
                        src={require("../assets/arrow-left.png")}
                        alt=""
                      />
                      {this.showMonthAndYear(date_of_blogs[indexOfDate - 1])}
                    </div>
                  ) : (
                    ""
                  )}
                </li>
                <li>{this.showMonthAndYear(date_of_blogs[indexOfDate])}</li>
                <li>
                  {indexOfDate < date_of_blogs.length - 1 ? (
                    <div>
                      {this.showMonthAndYear(date_of_blogs[indexOfDate + 1])}
                      <img
                        onClick={() =>
                          this.setState({ indexOfDate: indexOfDate + 1 })
                        }
                        src={require("../assets/arrow.png")}
                        alt=""
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
            </div>
            {this.state.loader ? (
              <div className="rightside_title">
                <Spinner />
              </div>
            ) : show_blogs.length == 0 ? (
              <h4>No Blogs</h4>
            ) : (
              <div>
                <div className="row">{renderBlogs}</div>

                <div className="blog-pagination">
                  <ul>
                    {currentPage > 1 ? (
                      <li>
                        <img
                          onClick={() =>
                            this.setState({ currentPage: currentPage - 1 })
                          }
                          src={require("../assets/arrow-left.png")}
                        />
                      </li>
                    ) : (
                      ""
                    )}
                    {renderPageNumbers}
                    {currentPage < pageNumbers.length ? (
                      <li>
                        <img
                          onClick={() =>
                            this.setState({ currentPage: currentPage + 1 })
                          }
                          src={require("../assets/arrow-right.png")}
                        />
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="seeshow">
          <div className="container">
            <h2>
              See how your business can deliver verified
              <br />
              answers to searching consumers, helping <br />
              drive discovery and revenue
            </h2>

            <div className="banner-btn">
              <a href="#" className="book_btn">
                Book A Demo{" "}
              </a>
              <a href="#" className="learn_btn">
                Learn more{" "}
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
