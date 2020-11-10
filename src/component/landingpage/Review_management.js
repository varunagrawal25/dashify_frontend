import React, { Component } from "react";
import Footer from "./footer";
import Navbar from "./navbar";

export default class Review_management extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
}
  render() {
    return (
      <div>
        <Navbar />
        <div className="review-management">
          <div className="cricle1">
            <img src={require("../assets/ellipse-30.png")} alt="" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="ant-heading">
                  <h2 className="heading">Dashify Analytics</h2>
                  <p>
                    Information is power when it comes to your business. The
                    power to improve, change, and come up with strategic plans
                    that effectively boost your business. You need to have an
                    effective system in place that provides you with such data
                    so you can stay ahead of the competition.{" "}
                  </p>
                  <p>
                    <small>
                      This is where our review and ranking analytics come in
                      handy. Have all the information you need in one place so
                      you can strategize and boost your business. Here is how
                      our review and ranking analytics can help you with the
                      growth of your business.
                    </small>
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <img src={require("../assets/ant-1.png")} alt="" />
              </div>
            </div>

            <div className="row re-top">
              <div className="col-md-6">
                <div className="ant-heading">
                  <h2 className="heading">
                    {" "}
                    What are review and ranking analytics?
                  </h2>
                  <img src={require("../assets/ant-2.png")} alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="ant-heading pt-35">
                  <p>
                    Ranking analytics will help you to keep track of your
                    ranking on major search engines by utilizing keywords. This
                    will let you know how your business is doing in terms of
                    ranking on major search engines. You can then utilize this
                    data to improve your rankings if need be.
                  </p>
                  <p>
                    <small>
                      They will also show trends of keywords. Keywords that are
                      on the rise and keywords that are declining. You can then
                      adjust your SEO accordingly and effectively increase your
                      rankings across search engines again.
                    </small>
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="cricle2">
            <img src={require("../assets/ellipse-32.png")} alt="" />
          </div>
          <div className="cricle3">
            <img src={require("../assets/ellipse-28.png")} alt="" />
          </div>
        </div>
        <div className="review-ant">
          <div className="container">
            <h2 className="heading">
              Review analytics will help your business in managing
              <br />
              its reputation by looking at all the review metrics. <br />
              They usually show:
            </h2>
            <div className="row">
              <div className="col-md-6">
                <div className="review-list">
                  <ul>
                    <li>Total number of reviews across all platforms</li>
                    <li>How many new reviews your business is receiving </li>
                    <li>Average rating</li>
                    <li>The review response rate</li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="ant-heading">
                  <p>
                    {" "}
                    These metrics will be available for every single website
                    your business is mentioned. You can then utilize this data
                    to come up with effective solutions that will improve the
                    reputation of your business.
                  </p>
                  <p>
                    We provide an effective system that is fast and reliable so
                    you can have all the data available to you in no time. It
                    will optimize all metrics and keep them in one place so you
                    can easily navigate and use them for your strategic business
                    marketing plans.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="review-faq">
          <div className="cricle4">
            <img src={require("../assets/ellipse-33.png")} alt="" />
          </div>

          <div className="cricle5">
            <img src={require("../assets/ellipse-34.png")} alt="" />
          </div>
          <div className="cricle6">
            <img src={require("../assets/ellipse-31.png")} alt="" />
          </div>
          <div className="cricle7">
            <img src={require("../assets/ellipse-35.png")} alt="" />
          </div>

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
              <div className="card mb-0">
                <div
                  className="card-header collapsed"
                  data-toggle="collapse"
                  href="#collapseOne"
                >
                  <a className="card-title">High return on investment (ROI)</a>
                </div>
                <div
                  id="collapseOne"
                  className="card-body collapse"
                  data-parent="#accordion"
                >
                  <p>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid. 3 wolf moon officia
                    aute, non cupidatat skateboard dolor brunch. Food truck
                    quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                    sunt aliqua put a bird on it squid single-origin coffee
                    nulla assumenda shoreditch et. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim
                    aesthetic synth nesciunt you probably haven't heard of them
                    accusamus labore sustainable VHS.
                  </p>
                </div>
                <div
                  className="card-header collapsed"
                  data-toggle="collapse"
                  data-parent="#accordion"
                  href="#collapseTwo"
                >
                  <a className="card-title">
                    Better equipped to deal with customers
                  </a>
                </div>
                <div
                  id="collapseTwo"
                  className="card-body collapse"
                  data-parent="#accordion"
                >
                  <p>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid. 3 wolf moon officia
                    aute, non cupidatat skateboard dolor brunch. Food truck
                    quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                    sunt aliqua put a bird on it squid single-origin coffee
                    nulla assumenda shoreditch et. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim
                    aesthetic synth nesciunt you probably haven't heard of them
                    accusamus labore sustainable VHS.
                  </p>
                </div>
                <div
                  className="card-header collapsed"
                  data-toggle="collapse"
                  data-parent="#accordion"
                  href="#collapseThree"
                >
                  <a className="card-title">
                    Retain and target new customer segments
                  </a>
                </div>
                <div
                  id="collapseThree"
                  className="collapse"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    <p>
                      Your customer segment and target audience need to be
                      retained so they can keep investing in your business. This
                      is best done by providing support and improving relations
                      with customers. The metrics you will have will help you
                      improve this and you can retain customers for a very long
                      time so they can be loyal to our brand.
                    </p>
                    <p>
                      Another important part of a business is to target new
                      customer segments. This will expand your business in new
                      directions which will eventually mean more profits. The
                      review and ranking analytics will tell you the behaviour
                      and preferences of your audience.{" "}
                    </p>
                    <p>
                      You can then utilize the correct strategies to engage that
                      audience and also target new customers using the data of
                      the ones you have already have. There is a lot you can do
                      with this information if you use it accurately and you
                      will see how well it is helping you organically grow your
                      business.
                    </p>
                  </div>
                </div>

                <div
                  className="card-header collapsed"
                  data-toggle="collapse"
                  data-parent="#accordion"
                  href="#collapsefour"
                >
                  <a className="card-title">Trends and opportunities</a>
                </div>
                <div
                  id="collapsefour"
                  className="collapse"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    <p>
                      Your customer segment and target audience need to be
                      retained so they can keep investing in your business. This
                      is best done by providing support and improving relations
                      with customers. The metrics you will have will help you
                      improve this and you can retain customers for a very long
                      time so they can be loyal to our brand.
                    </p>
                    <p>
                      Another important part of a business is to target new
                      customer segments. This will expand your business in new
                      directions which will eventually mean more profits. The
                      review and ranking analytics will tell you the behaviour
                      and preferences of your audience.{" "}
                    </p>
                    <p>
                      You can then utilize the correct strategies to engage that
                      audience and also target new customers using the data of
                      the ones you have already have. There is a lot you can do
                      with this information if you use it accurately and you
                      will see how well it is helping you organically grow your
                      business.
                    </p>
                  </div>
                </div>
              </div>
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
        <Footer />
      </div>
    );
  }
}
