

import React, { Component } from "react";
import Slider from "react-slick";
import Footer from "./footer";
import Navbar from "./navbar";
import { account_activate } from "../apis/user";
import { secure_pin } from "../../config";
import swal from "sweetalert";
import { business_categories, business_counrty } from "../apis/location";
import { ScanAddBusiness } from "../apis/scanTool";
import { Redirect } from "react-router-dom";

export default class Home extends Component {
  state={

    businessCategories:[],
    countryCategories:[],
    dat:false
  }

  _loadBusinessCategories = () => {
    try{
    this.setState({ loadBusinessCategories: true });
    // Axios.get(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/dropdown-values/business-categoryes",
    //   DjangoConfig
    // )
    const data = {secure_pin}
    console.log("data1234", data)
    business_categories(data)
      .then(res => {
        console.log("category", res.data)
        const busi_cat =res.data.bussiness_category_array
  
       // console.log("hello1234", busi_cat)
           this.setState({
          businessCategories: busi_cat,
          loadBusinessCategories: false
          
        });
       
      })
      .catch(res => {
        console.log("error in loading business categories");
      });
      console.log(this.state)
    }catch(e){}};
  
  _loadCountryCategories = () => {
    try{
    this.setState({ loadCountryCategories: true });
    // Axios.get(
    //   "https://cors-anywhere.herokuapp.com/https://dashify.biz/dropdown-values/counrty",
    //   DjangoConfig
    // )
    const data = {secure_pin}
    business_counrty(data)
      .then(res => {
        console.log("country",res)
        this.setState({
          countryCategories: res.data.country_array,
          loadCountryCategories: false
        });
      //  console.log("all country a", this.state.countryCategories);
      })
      .catch(e => {
        console.log(e);
      });
    }catch(e){}};

    changeHandler1 = event => {
      try{
      this.setState({ [event.target.name]: event.target.value ,
      country_selected_id:event.target.value})
    }catch(e){}};
  componentDidMount = () => {
      window.scrollTo(0, 0)
    console.log("this.props", this.props.match.params.param2);
    try{
      this._loadBusinessCategories();
      this._loadCountryCategories();
      // this._loadStateCategories();
    }catch(e){}

    if (this.props.match.params.param1 && this.props.match.params.param2) {
      var { param1, param2 } = this.props.match.params;
      
      const data = {
        secure_pin,
        user_id: param1,
        activation_code: param2
      };
console.log("qq1",data)

      account_activate(data)
        .then(res => {
          console.log("account activation", res);
          swal(res.data.message);
        })
        .catch(res => console.log("not active"));
    }
  };

  changeHandler = event => {
    try{
    this.setState({ [event.target.name]: event.target.value });
  }catch(e){}};

  search=e=>{

    var da=this.state;

    const data={
      secure_pin,
       "country":da.country,
       "zipcode":da.zipcode,
       "business_name":da.businessName,
       "business_type":da.category,
       "mobile_no":da.mobile

    }

    ScanAddBusiness(data)
    .then(res => {
      console.log("res", res);
      this.setState({
        id:res.data.scantool_data, dat:true
      })
      
    })
    .catch(res => console.log("not active"));
  }

  render() {
    console.log(this.state)

    if (this.state.dat){

      return <Redirect  to={"/scanner/result/"+this.state.id} />
    }
    var settings = {
      dots: false,
      infinite: true,
      arrows: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 320,
          settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 2, slidesToScroll: 2, infinite: false }
        },
        {
          breakpoint: 1024,
          settings: { slidesToShow: 3, slidesToScroll: 3, infinite: false }
        }
      ]
    };

    var settings1 = {
      dots: true,
      infinite: true,
      arrows: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 320,
          settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 2, slidesToScroll: 2, infinite: false }
        },
        {
          breakpoint: 1024,
          settings: { slidesToShow: 3, slidesToScroll: 3, infinite: false }
        }
      ]
    };

    return (
      <div>
        <Navbar />
        <div className="banner">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h2>One Place, All Business</h2>

                <p>
                  {" "}
                  Having everything in one place means organization, simplifying
                  business and more time spent on the important stuff Dashify
                  organize, update and keep track of all your information and
                  social pages from one convenient dashboard. Effortlessly.
                </p>
                <div className="banner-btn">
                  <a href="#" className="book_btn">
                    Book A Demo{" "}
                  </a>
                  <a href="#" className="learn_btn">
                    Learn more{" "}
                  </a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Coffe Shop with free wifi near me"
                    readOnly
                  />
                  <button>
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bookingbox">
          <div className="criclle"></div>
          <div className="criclle2"></div>
          <div className="container">
            <h2>
              Check How Your Business <br />
              Appears Online
            </h2>
            <div className="checkabilty">
              {/* <select>
                <option>Choose country</option>
                <option>Choose country</option>
                <option>Choose country</option>
              </select> */}



             
                                <select
                                  name="country"
                                  onChange={this.changeHandler1}
                                  id="country"
                                  required
                                  className="form-control"
                                >
                                  <option value="0" disabled="">
                                    {this.state.loadCountryCategories
                                      ? "Loading....."
                                      : "Choose country"}
                                  </option>
                                  {this.state.countryCategories.map((c, i) => (
                                    <option key={`country-${i}`} value={c.id}>
                                      {c.name}
                                    </option>
                                  ))}
                                </select>
                                
                              
                           
              


              

              <input type="text"
              name="businessName"
              placeholder="enter business name"
              onChange={this.changeHandler}
              />
                 <input type="text"
              name="zipcode"
              placeholder="enter zipcode"
              onChange={this.changeHandler}
              />
              {/* <select>
                <option>Business Name</option>
                <option>Business Name</option>
                <option>Business Name</option>
              </select> */}
              <input type="text" placeholder="Mobile Number with code (+91)" 
              name="mobile"
              onChange={this.changeHandler}/>
              {/* <select>
                <option>Business Type</option>
                <option>Business Type</option>
                <option>Business Type</option>
              </select> */}

<select
                                    name="category"
                                    onChange={this.changeHandler}
                                    className="form-control"
                                    name="category"
                                    id="primaryCategory"
                                    required
                                  >
                                    <option value="0" disabled="">
                                      Select A Business Category
                                    </option>
                                    {this.state.businessCategories.map((b, i) => (
                                      <option
                                        key={`business-${i}`}
                                        value={b.id}
                                      >
                                        {b.name}
                                      </option>
                                    ))}
                                  </select>
                                 

              <button onClick={this.search}>Scan now</button>
            </div>
          </div>
        </div>

        <div className="features">
          <div className="container position">
            <div className="criclboxs"></div>
            <h2>What Dashify Features</h2>
            <div className="row">
              <div className="col-md-4">
                <div className="feature-text">
                  <div className="onestep">01</div>
                  <h4>Management</h4>
                  <span>Keep it streamlined</span>
                  <p>
                    Manage everything effortlessy from one place at any time.
                    Dashify was designed with streamlined simplicity in mind.{" "}
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-text">
                  <div className="onestep2">02</div>
                  <h4>Review tracker</h4>
                  <span>Who said that?</span>
                  <p>
                    What it good? Was it bad? Whatever they thought, see it
                    instantly by tracking business reviews and keeping an eye on
                    who said what.{" "}
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="feature-text">
                  <div className="onestep2">03</div>
                  <h4>Promotion</h4>
                  <span>Making business louder</span>
                  <p>
                    Promotion can make or break a business. Get your seen, heard
                    and clicked with the right promotion, all from the
                    convenience of one place.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="feature-text">
                  <div className="onestep2">04</div>
                  <h4>Notification feed</h4>
                  <span>Instant interaction</span>
                  <p>
                    Interact with your target audience, customers and clients
                    instantly by keeping on top of all notifications on every
                    platform. You’ll never miss another ding.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="feature-text">
                  <div className="onestep2">05</div>
                  <h4>Analytics</h4>
                  <span>Prioritize</span>
                  <p>
                    Performance is paramount, and Dashify keep an eye on it for
                    you. With complete precision, monitor how well you’re doing
                    at any time with astute and accurate analytics.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="learn-more">
                  <a href="#">
                    Learn More{" "}
                    <img src={require("../assets/arrow.png")} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="client-name">
          <div className="container">
            <h2>Sync Your Business</h2>
            <p>
              Connect your business with all these great apps from <br />
              one dashboard{" "}
            </p>
            <div className="client-box">
              <ul>
                <li>
                  <a href="#">
                    <img src={require("../assets/home_icon1.png")} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={require("../assets/home_icon2.png")} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={require("../assets/home_icon3.png")} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={require("../assets/home_icon4.png")} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={require("../assets/home_icon5.png")} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={require("../assets/home_icon6.png")} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={require("../assets/home_icon7.png")} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={require("../assets/home_icon8.png")} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={require("../assets/home_icon9.png")} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={require("../assets/home_icon10.png")} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={require("../assets/home_icon11.png")} alt="" />
                  </a>
                </li>
                <li className="icc">
                  <a href="#">
                    <img src={require("../assets/home_icon12.png")} alt="" />
                  </a>
                </li>
                <li className="manta">
                  <a href="#">
                    <img src={require("../assets/home_icon13.png")} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={require("../assets/home_icon14.png")} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={require("../assets/home_icon15.png")} alt="" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="manybox">
              <a href="#" className="many_btn">
                Many More <img src={require("../assets/arrow.png")} alt="" />
              </a>
            </div>
            <div className="buttonbox text-center">
              <button className="get_btn">Get started</button>
            </div>
          </div>
        </div>
        <div className="trusted">
          <div className="container">
            <h2>Trusted By Companies</h2>
            <p>
              With our mission in mind we are leading brands
              <br /> into the future of search{" "}
            </p>

            <Slider {...settings}>
              <div className="slide">
                <img src={require("../assets/slide-logo-1.png")} alt="" />
              </div>
              <div className="slide">
                <img src={require("../assets/slide-logo-2.png")} alt="" />
              </div>
              <div className="slide">
                <img src={require("../assets/slide-logo-3.png")} alt="" />
              </div>
              <div className="slide">
                <img src={require("../assets/slide-logo-4.png")} alt="" />
              </div>
              <div className="slide">
                <img src={require("../assets/slide-logo-5.png")} alt="" />
              </div>
            </Slider>

            {/*<div className="customer-logos slider">
      <div className="slide"><img src={require('../assets/slide-logo-1.png')} alt="" /></div>
      <div className="slide"><img src={require('../assets/slide-logo-2.png')} alt="" /></div>
      <div className="slide"><img src={require('../assets/slide-logo-3.png')} alt="" /></div>
      <div className="slide"><img src={require('../assets/slide-logo-4.png')} alt="" /></div>
      <div className="slide"><img src={require('../assets/slide-logo-5.png')} alt="" /></div>
      <div className="slide"><img src={require('../assets/slide-logo-1.png')} alt="" /></div>
     </div>*/}

            <div className="boxc">
              <a href="#">
                See customer stories{" "}
                <img src={require("../assets/arrow.png")} alt="" />
              </a>
            </div>
          </div>
        </div>
        <div className="bg-1"></div>
        <div className="brand">
          <div className="criclle"></div>
          <div className="criclle2"></div>
          <div className="container">
            <h2>Specializing In Brand Awareness</h2>
            <p>
              Restaurants, Hotels, Retail, Healthcare, Home Improvement
              <br /> Automative, Fincanical, Many more
            </p>

            <Slider {...settings1} className="brand-slider">
              <div className="slide">
                <div className="brand-box">
                  <div className="brand-img">
                    <img src={require("../assets/brand-1.png")} alt="" />
                  </div>
                  <div className="brand-text">
                    <img src={require("../assets/icon-1.jpg")} alt="" />
                    <h5>Hotels</h5>
                  </div>
                </div>
              </div>

              <div className="slide">
                <div className="brand-box">
                  <div className="brand-img">
                    <img src={require("../assets/brand-2.png")} alt="" />
                  </div>
                  <div className="brand-text">
                    <img src={require("../assets/icon-2.jpg")} alt="" />
                    <h5>Restaurant</h5>
                  </div>
                </div>
              </div>

              <div className="slide">
                <div className="brand-box">
                  <div className="brand-img">
                    <img src={require("../assets/brand-3.png")} alt="" />
                  </div>
                  <div className="brand-text">
                    <img src={require("../assets/cart.jpg")} alt="" />
                    <h5>Retail</h5>
                  </div>
                </div>
              </div>

              <div className="slide">
                <div className="brand-box">
                  <div className="brand-img">
                    <img src={require("../assets/brand-4.png")} alt="" />
                  </div>
                  <div className="brand-text">
                    <img src={require("../assets/icon-5.png")} alt="" />
                    <h5>Financial</h5>
                  </div>
                </div>
              </div>

              <div className="slide">
                <div className="brand-box">
                  <div className="brand-img">
                    <img src={require("../assets/brand-5.png")} alt="" />
                  </div>
                  <div className="brand-text">
                    <img src={require("../assets/icon-4.jpg")} alt="" />
                    <h5>Health care</h5>
                  </div>
                </div>
              </div>

              <div className="slide">
                <div className="brand-box">
                  <div className="brand-img">
                    <img src={require("../assets/brand-1.png")} alt="" />
                  </div>
                  <div className="brand-text">
                    <img src={require("../assets/icon-1.jpg")} alt="" />
                    <h5>Hotels</h5>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
        <div className="bg-2"></div>

        <div className="blog">
          <div className="container position">
            <div className="blog-cricle"></div>
            <h2 className="heading">Blog</h2>
            <p>
              Dashify occasionally accepts articles from guest writers to
              complement
              <br />
              our blog. If you wish to submit an article for consideration,
              please <br />
              first check our <a href="#">contributor guidelines.</a>
            </p>
            <div className="tmt">
              <ul>
                <li>
                  <b>September 2020</b>{" "}
                </li>
                <li>
                  August 2020{" "}
                  <img src={require("../assets/arrow.png")} alt="" />
                </li>
              </ul>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="text-blog">
                  <div className="blog-img">
                    <img src={require("../assets/blog1.png")} alt="" />
                  </div>
                  <div className="text-descripton">
                    <h5>
                      Google’s Latest API Update: Specify Service Items for Your
                      Business{" "}
                    </h5>
                    <p>
                      On April 27th 2020, Google launched version 4.6 of its
                      Google My Business (GMB) API for...{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="text-blog">
                  <div className="blog-img">
                    <img src={require("../assets/blog2.png")} alt="" />
                  </div>
                  <div className="text-descripton">
                    <h5>
                      4 Reasons Search Is the Most Critical Issue for Your Brand
                      This Year
                    </h5>
                    <p>
                      {" "}
                      With 90% of consumers reporting that they use search at
                      every stage of the customer lifecycle...
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="text-blog">
                  <div className="blog-img">
                    <img src={require("../assets/blog3.png")} alt="" />
                  </div>
                  <div className="text-descripton">
                    <h5>
                      3 Moments That Make or Break a Customer’s Trust in a Brand
                    </h5>
                    <p>
                      Building brand trust is of the utmost importance for
                      businesses. It fosters loyalty with existing...{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="heigh_blog">
                  <a href="#" className="many_btn">
                    Read all articles{" "}
                    <img src={require("../assets/arrow.png")} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="feedback-box">
          <div className="container">
            <h2 className="heading">We Appreciate Our Customer`s Feedbacks!</h2>
            <p className="lead-text">
              {" "}
              Here’s what some of our customers say about our work.
            </p>
            <div className="row top-50">
              <div className="col-md-6">
                <div className="feed-box">
                  <div className="feed-img">
                    <img src={require("../assets/home_cf1.png")} alt="" />
                  </div>
                  <div className="feed-text">
                    <div className="webox">
                      <p>
                        We believe that Dashify is the tool that will help keep
                        our brand information up to date and consistent across
                        the web, and allow us to keep scaling up our local SEO
                        efforts!
                      </p>
                      <h5>Abram George</h5>
                      <span>Company name</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="feed-box">
                  <div className="feed-img">
                    <img src={require("../assets/home_cf2.png")} alt="" />
                  </div>
                  <div className="feed-text">
                    <div className="webox">
                      <p>
                        We have gone to great lengths to manage all our retail
                        stores internally, from a central database. We have a
                        centralized system with checks and balances in place, so
                        it all flows out from that one database as a source of
                        truth. Dashify came in and helped us do that
                      </p>
                      <h5>Rose Mango</h5>
                      <span>Company name</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="feed-box">
                  <div className="feed-img">
                    <img src={require("../assets/home_cf3.png")} alt="" />
                  </div>
                  <div className="feed-text">
                    <div className="webox">
                      <p>
                        Dashify is now fundamentally embedded into our marketing
                        initiatives and digital presence system. The purpose of
                        our digital presence is to drive diners into our actual
                        restaurant locations time and again, and that is where
                        Dashify's platform is invaluable
                      </p>
                      <h5>Marcus Bergson</h5>
                      <span>Company name</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="feed-box">
                  <div className="feed-img">
                    <img src={require("../assets/home_cf4.png")} alt="" />
                  </div>
                  <div className="feed-text">
                    <div className="webox">
                      <p>Smart and easy to use!</p>
                      <h5>Roger Curtis</h5>
                      <span>Company name</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 text-center mt-50">
                <a href="#" className="many_btn">
                  Read more <img src={require("../assets/arrow.png")} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
