// import React, { Component } from "react";
// import Footer from "./footer";
// import Navbar from "./navbar";
// import { Row, Col } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import Carousel from "react-bootstrap/Carousel";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import { Link } from "react-router-dom";

// class Home extends Component {
//   render() {
//     return (
//       <div>
//         <Navbar />
//         <div className="home-banner">
//           <h1 className="destop-h1">
//             <span>
//               {" "}
//               One Place, <b>All Business</b>
//             </span>
//           </h1>

//           <img src={require("./img/background-4.jpg")} />
//           <div className="banner-box">
//             <div className="container">
//               <div className="banner-text font-stylebox">
//                 <h1>
//                   <span>
//                     {" "}
//                     One Place,
//                     <br /> <b>All Business</b>
//                   </span>
//                 </h1>
//                 <p>
//                   {" "}
//                   Having everything in one place means organization, simplifying
//                   business and more time spent on the important stuff Dashify
//                   organize, update and keep track of all your information and
//                   social pages from one convenient dashboard. Effortlessly.{" "}
//                 </p>
//                 <div className="home-banner-btnn">
//                   <Button variant="outline2">Book A Demo</Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="txt-area font-stylebox">
//           <h1>
//             <span>
//               <b>CHECK HOW YOUR BUSINESS APPEARS ONLINE SCAN YOUR TOOL</b>
//             </span>
//             <strong className="border-button"></strong>
//           </h1>
//           <div className="txt-subarea">
//             <div className="container">
//               <Row>
//                 <Col md={2}>
//                   <Form.Group controlId="formGridState">
//                     <Form.Control as="select">
//                       <option>Choose country</option>
//                       <option>USA</option>
//                       <option>South America</option>
//                       <option>australia</option>
//                       <option>india</option>
//                       <option>pakistan</option>
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col md={2}>
//                   <Form.Group controlId="formGridState">
//                     <Form.Control as="select">
//                       <option>Business Name</option>
//                       <option>Online shop</option>
//                       <option> Cloth shop</option>
//                       <option>Software Company</option>
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group controlId="formGridState" className="scan-input">
//                     <Form.Control
//                       as="input"
//                       className="from-control-txt"
//                       placeholder="Business Name"
//                     ></Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group controlId="formGridState" className="scan-input">
//                     <Form.Control
//                       as="input"
//                       className="from-control-txt"
//                       placeholder="Business Type"
//                     ></Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col md={2}>
//                   <Button variant="outline-info">Scan Now</Button>
//                 </Col>
//               </Row>
//             </div>
//           </div>
//         </div>

//         <section className="font-stylebox">
//           <div className="container">
//             <div className="heading-title">
//               <h2>
//                 <b>What Oasis Features</b>
//               </h2>
//             </div>

//             <div className="columbox">
//               <div className="col-box">
//                 <div className="col-box-pading">
//                   <img src={require("./img/icon-5.png")} />
//                   <div className="col-box-text">
//                     <h3>
//                       <span>Management</span>
//                     </h3>
//                     <h5 className="col-box-subtext">
//                       <span>Keep It Streamlined</span>
//                     </h5>
//                     <p>
//                       Manage everything effortlessly from one place at any time.
//                       Dashify was designed with streamlined simplicity in mind.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-box">
//                 <div className="col-box-pading2">
//                   <img src={require("./img/icon-1.png")} />
//                   <div className="col-box-text1">
//                     <h3>
//                       <span>Review Tracker</span>
//                     </h3>
//                     <h5 className="col-box-subtext">
//                       <span>Who Said That?</span>
//                     </h5>

//                     <p>
//                       {" "}
//                       Was it good? Was it bad? Whatever they thought, see it
//                       instantly by tracking business reviews and keeping an eye
//                       on who said what.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-box">
//                 <div className="col-box-pading">
//                   <img src={require("./img/icon-3.png")} />
//                   <div className="col-box-text2">
//                     <h3>
//                       <span>Promotion</span>
//                     </h3>
//                     <h5 className="col-box-subtext">
//                       <span>Making Business Louder</span>
//                     </h5>

//                     <p>
//                       {" "}
//                       Promoting can make or break a business. Get yours seen,
//                       heard and clicked with the right promotion, all from the
//                       convenience of one place.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="columbox1">
//               <div className="col-box col-box-border">
//                 <div className="col-box-pading">
//                   <img src={require("./img/icon-2.png")} />
//                   <div className="col-box-text1">
//                     <h3>
//                       <span> Notification Feed</span>
//                     </h3>
//                     <h5 className="col-box-subtext">
//                       <span>Instant Interaction</span>
//                     </h5>

//                     <p>
//                       {" "}
//                       Interact with your target audience, customers and clients
//                       instantly by keeping on top<br></br> of all notifications
//                       on every platform. You’ll never miss another ding
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-box col-box-border">
//                 <div className="col-box-pading">
//                   <img src={require("./img/icon-4.png")} />
//                   <div className="col-box-text2">
//                     <h3>
//                       <span>Analytics</span>
//                     </h3>
//                     <h5 className="col-box-subtext">
//                       <span>Prioritize Performance</span>
//                     </h5>

//                     <p>
//                       {" "}
//                       Performance is paramount, and Dashify keep an eye on it
//                       for you. With complete precision, monitor how well you’re
//                       doing at any time with astute and accurate analytics.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-box-btn">
//               <Button variant="outline-info">Learn more</Button>
//             </div>
//           </div>
//         </section>

//         <div className="home-banner2 font-stylebox ">
//           <div className="heading-title2">
//             <h1>
//               <span>
//                 <b> Connect your Business</b>
//               </span>
//               <strong className="border-button"></strong>
//             </h1>
//             <div className="home-banner2-img">
//               <img src={require("./img/a (1).png")} />
//             </div>
//           </div>
//         </div>

//         <div className="home-banner3 font-stylebox ">
//           <div className="container">
//             <div className="heading-title3">
//               <h2>
//                 <span>
//                   <b>Trusted By Companies</b>
//                 </span>
//                 <strong className="border-button3"></strong>
//               </h2>
//             </div>
//             <div className="client-logo">
//               <div className="container">
//                 <ul>
//                   <li className="fluff-logo">
//                     <Link to="">
//                       <img src={require("./img/Fluffup.png")} />
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="">
//                       <img src={require("./img/paypal.png")} />
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="">
//                       <img src={require("./img/237.png")} />{" "}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="">
//                       <img src={require("./img/perceptra.png")} />{" "}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="">
//                       <img src={require("./img/Disney.png")} />
//                     </Link>
//                   </li>
//                 </ul>
//                 <div className="client-logo-text">
//                   <p>
//                     {" "}
//                     with our mission if perfect answers everyuwhere we are
//                     leaeding barnds into the futuer of seacrh{" "}
//                   </p>
//                   <Link to="">
//                     <p>SEE CUSTOMER STORIES</p>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="home-banner4 font-stylebox">
//           <div className="container">
//             <div className="banner-text2">
//               <h4>
//                 <span>
//                   <b>SPECIALIZING IN BRAND AWARENESS</b>
//                 </span>
//                 <strong className="border-button4"></strong>
//               </h4>
//               <p>
//                 {" "}
//                 Restaurants, Hotels, Retail, Healthcare, Home Improvement
//                 Automative, Fincanical, Many More
//               </p>
//             </div>

//             <Row className="columbox2">
//               <Col md={4} className="colum-padding">
//                 <Link to="" className="coloum-link">
//                   {" "}
//                   <h5 className="col-title">
//                     Retail
//                     <strong className="banner-button1"></strong>
//                   </h5>
//                   <img src={require("./img/image-1.png")} />
//                   <div className="overlay"></div>
//                 </Link>
//               </Col>

//               <Col md={4} className="colum-padding">
//                 <Link to="">
//                   {" "}
//                   <h5 className="col-title">
//                     Restaurant
//                     <strong className="banner-button1"></strong>
//                   </h5>
//                   <img src={require("./img/image-2.png")} />
//                   <div className="overlay"></div>
//                 </Link>
//               </Col>

//               <Col md={4} className="colum-padding">
//                 <Link to="">
//                   {" "}
//                   <h5 className="col-title">
//                     Financial services
//                     <strong className="banner-button1"></strong>
//                   </h5>
//                   <img src={require("./img/image-3.png")} />
//                   <div className="overlay"></div>
//                 </Link>
//               </Col>
//             </Row>
//           </div>
//         </div>

//         <div className="home-banner5 font-stylebox">
//           <div className="container">
//             <div className="banner5-text">
//               <h2>
//                 <span>
//                   <b>BLOG</b>
//                 </span>
//                 <strong className="border-button5"></strong>
//               </h2>
//               <p>
//                 {" "}
//                 Lorem ipsum dolor sit amet,cansectet adipiscing elit, sed do
//                 eiumod tempor idcididentet lobare et dolor magne aliqua. ut enim
//                 ad minim veniam quis nostrud execitation, ullamco laboris nisi
//                 ut aliquip ex ea commode cansequt
//               </p>
//             </div>
//             <div className="banner-img">
//               <Row>
//                 <Col md={3}>
//                   <Card>
//                     <Card.Img src={require("./img/1.png")} />
//                     <Card.Body className="body-text">
//                       <Card.Title>Lorem IPUSM</Card.Title>
//                       <Card.Text>
//                         Some quick example text to build on the card title and
//                         make up the bulk of the card's content.
//                       </Card.Text>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//                 <Col md={3}>
//                   <Card>
//                     <Card.Img src={require("./img/2.png")} />

//                     <Card.Body className="body-text">
//                       <Card.Title>Lorem IPUSM</Card.Title>
//                       <Card.Text>
//                         Some quick example text to build on the card title and
//                         make up the bulk of the card's content.
//                       </Card.Text>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//                 <Col md={3}>
//                   <Card>
//                     <Card.Img src={require("./img/3.png")} />

//                     <Card.Body className="body-text">
//                       <Card.Title>Lorem IPUSM</Card.Title>
//                       <Card.Text>
//                         Some quick example text to build on the card title and
//                         make up the bulk of the card's content.
//                       </Card.Text>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//                 <Col md={3}>
//                   <Card>
//                     <Card.Img src={require("./img/4.png")} />

//                     <Card.Body className="body-text">
//                       <Card.Title>Lorem IPUSM</Card.Title>
//                       <Card.Text>
//                         Some quick example text to build on the card title and
//                         make up the bulk of the card's content.
//                       </Card.Text>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               </Row>
//             </div>
//           </div>
//         </div>

//         <div id="myCarousel" className="carousel slide" data-ride="carousel">
//           <ol className="carousel-indicators">
//             <li
//               data-target="#myCarousel"
//               data-slide-to="0"
//               className="active"
//             ></li>
//             <li data-target="#myCarousel" data-slide-to="1"></li>
//             <li data-target="#myCarousel" data-slide-to="2"></li>
//           </ol>

//           <div className="carousel-inner">
//             <div className="item active">
//               <img src={require("./img/background-2.jpg")} alt="First slide" />
//               <div className="carousel-caption">
//                 <div className="banner-text3">
//                   <h1>HEAR WHAT OUR CUSTOMER ARE SAYING</h1>
//                   <p>
//                     Lorem ipsum dolor sit amet,cansectet adipiscing elit,{" "}
//                     <span>
//                       {" "}
//                       sed do eiumod tempor idcididentet lobare et dolor magne
//                       aliqua.
//                     </span>{" "}
//                   </p>
//                   <p>
//                     ut enim ad minim veniam quis nostrud execitation, ullamco{" "}
//                     <span> laboris nisi ut aliquip ex ea commode cansequt</span>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="item">
//               <img src={require("./img/background-2.jpg")} alt="First slide" />
//               <div className="carousel-caption">
//                 <div className="banner-text3">
//                   <h1>HEAR WHAT OUR CUSTOMER ARE SAYING</h1>
//                   <p>
//                     Lorem ipsum dolor sit amet,cansectet adipiscing elit,{" "}
//                     <span>
//                       {" "}
//                       sed do eiumod tempor idcididentet lobare et dolor magne
//                       aliqua.
//                     </span>{" "}
//                   </p>
//                   <p>
//                     ut enim ad minim veniam quis nostrud execitation, ullamco{" "}
//                     <span> laboris nisi ut aliquip ex ea commode cansequt</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="item">
//               <img src={require("./img/background-2.jpg")} alt="First slide" />
//               <div className="carousel-caption">
//                 <div className="banner-text3">
//                   <h1>HEAR WHAT OUR CUSTOMER ARE SAYING</h1>
//                   <p>
//                     Lorem ipsum dolor sit amet,cansectet adipiscing elit,{" "}
//                     <span>
//                       {" "}
//                       sed do eiumod tempor idcididentet lobare et dolor magne
//                       aliqua.
//                     </span>{" "}
//                   </p>
//                   <p>
//                     ut enim ad minim veniam quis nostrud execitation, ullamco{" "}
//                     <span> laboris nisi ut aliquip ex ea commode cansequt</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <Footer />
//       </div>
//     );
//   }
// }

// export default Home;

import React, { Component } from "react";
import Slider from "react-slick";
import Footer from "./footer";
import Navbar from "./navbar";
import { account_activate } from "../apis/user";

export default class Home extends Component {
  componentDidMount = () => {
      window.scrollTo(0, 0)
    console.log("this.props", this.props.match.params.param2);

    if (this.props.match.params.param1 && this.props.match.params.param2) {
      var { param1, param2 } = this.props.match.params;

      const data = {
        pera_1: param1,
        pera_2: param2
      };

      account_activate(data)
        .then(res => {
          console.log("account activation", res);
          alert(res.data.messgae);
        })
        .catch(res => console.log("not active"));
    }
  };

  render() {
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
              <select>
                <option>Choose country</option>
                <option>Choose country</option>
                <option>Choose country</option>
              </select>
              <select>
                <option>Business Name</option>
                <option>Business Name</option>
                <option>Business Name</option>
              </select>
              <input type="text" placeholder="search" />
              <select>
                <option>Business Type</option>
                <option>Business Type</option>
                <option>Business Type</option>
              </select>
              <button>Scan now</button>
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
