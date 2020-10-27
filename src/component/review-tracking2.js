import React, { Component } from "react";
import Axios from "axios";
import { all_connection_of_one_location } from "./apis/social_platforms";
import {
  location_by_id,
  business_categories,
  business_states
} from "./apis/location";
import { over_all_rating, rating_breakdown, all_reviews } from "./apis/review";
import {
  all_reviews_json,
  rating_breakdown_json,
  over_all_rating_json
} from "./json/review";
import Rating from "react-rating";
import Spinner from "./common/Spinner";
import Loader from "react-loader-spinner";
import { breakStatement } from "@babel/types";
import { Dropdown } from "react-bootstrap";
// import { display } from "html2canvas/dist/types/css/property-descriptors/display";

const DjangoConfig = {
  headers: { Authorization: "Token " + localStorage.getItem("UserToken") }
};

export default class ReviewTracking extends Component {
  state = {
    fbReviews: [],
    yelpReviews: [],
    googleReviews: [],
    foursquareReviews: [],
    appleReviews: [],
    citysearchReviews: [],
    zillowReviews: [],
    tomtomReviews: [],
    avvoReviews: [],
    zomatoReviews: [],
    instaComments: [],
    loader: false,

    name: "",
    address: "",
    phone: "",
    city: "",
    postalCode: "",
    category: "",
    state: "",
    today: "",

    active_listing: [],

    most_helpful_review: "",
    all_reviews: "",
    all_review_duration: "week",
    all_review_loading: false,
    over_all_rating: "",
    over_all_rating_duration: "week",
    over_all_rating_loading: false,
    rating_breakdown: "",
    rating_breakdown_duration: "week",
    rating_breakdown_loading: false
  };

  componentDidMount = () => {
    let {
      over_all_rating_duration,
      all_review_duration,
      rating_breakdown_duration
    } = this.state;

    var today = new Date();
    today =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    this.setState({ today });

    // for over all rating
    this.over_all_rating_api_function();

    //for rating breakdown
    this.rating_breakdown_api_function();

    //for all reviews
    this.all_review_api_function();

    // all_reviews_json(all_review_body,DjangoConfig).then(res => {

    // }).catch( err => {
    //   console.log("all review error", err)
    //   all_review_data = all_reviews_json(all_review_body.duration)
    //   this.setState({
    //     most_helpful_review:all_review_data.most_helpful_review,
    //     all_reviews : all_review_data.all_reviews
    //   })
    // })

    // all_connection_of_one_location(data, DjangoConfig).then(response => {

    //     this.setState({ loader: false });
    //   })
    //   .catch(res => {
    //     console.log("error in review tracking", res);
    //     this.setState({ loader: false });
    //   });

    // getting business address

    const data = {
      location_id: this.props.match.params.locationId
    };

    location_by_id(data, DjangoConfig).then(resp => {
      // this.setState({ state: "Loading....", category: "Loading...." });
      business_states(DjangoConfig).then(resp1 => {
        resp1.data.status.map((s, i) =>
          s.id == resp.data.location.State
            ? this.setState({ state: s.State_name })
            : ""
        );
      });

      business_categories(DjangoConfig).then(resp1 => {
        resp1.data.BusinessCategory.map((b, i) =>
          b.id == resp.data.location.Business_category
            ? this.setState({ category: b.Category_Name })
            : ""
        );
      });

      this.setState({
        name: resp.data.location.Location_name,
        address: resp.data.location.Address_1,
        phone: resp.data.location.Phone_no,
        city: resp.data.location.City,
        postalCode: resp.data.location.Zipcode
      });
    });
  };

  over_all_rating_api_function = () => {
    this.setState({ over_all_rating_loading: true,over_all_rating:"" });
    const over_all_rating_body = {
      location_id: this.props.match.params.locationId,
      duration: this.state.over_all_rating_duration
    };

    over_all_rating(over_all_rating_body, DjangoConfig)
      .then(res => {
        if (res.status == 200 && res.data) {
          this.setState({
            over_all_rating: res.data,
            over_all_rating_loading: false
          });
        } else {
          this.setState({
            over_all_rating: over_all_rating_json(
              over_all_rating_body.duration
            ),
            over_all_rating_loading: false
          });
        }
      })
      .catch(err => {
        console.log("rating breakdown error", err);
        this.setState({
          over_all_rating: over_all_rating_json(over_all_rating_body.duration),
          over_all_rating_loading: false
        });
      });
  };

  rating_breakdown_api_function = () => {
    this.setState({ rating_breakdown_loading: true,rating_breakdown:"" });
    const rating_breakdown_body = {
      location_id: this.props.match.params.locationId,
      duration: this.state.rating_breakdown_duration
    };

    rating_breakdown(rating_breakdown_body, DjangoConfig)
      .then(res => {
        if (res.status == 200 && res.data) {
          this.setState({
            rating_breakdown: res.data,
            rating_breakdown_loading: false
          });
        } else {
          this.setState({
            rating_breakdown: rating_breakdown_json(
              rating_breakdown_body.duration
            ),
            rating_breakdown_loading: false
          });
        }
      })
      .catch(err => {
        console.log("rating breakdown error", err);
        this.setState({
          rating_breakdown: rating_breakdown_json(
            rating_breakdown_body.duration
          ),
          rating_breakdown_loading: false
        });
      });
  };

  all_review_api_function = async () => {
    this.setState({ all_review_loading: true ,fbReviews: [],
      yelpReviews: [],
      googleReviews: [],
      foursquareReviews: [],
      appleReviews: [],
      citysearchReviews: [],
      zillowReviews: [],
      tomtomReviews: [],
      avvoReviews: [],
      zomatoReviews: [],
      instaComments: []});

    const all_review_body = {
      location_id: this.props.match.params.locationId,
      duration: this.state.all_review_duration
    };

    let all_active_listing = [];
    let all_review_data = ""

    


    await all_reviews(all_review_body, DjangoConfig)
      .then(res => {
        if (res.status == 200 && res.data) {
          all_review_data = res.data;
        } else {
          all_review_data = all_reviews_json(all_review_body.duration);
        }
      })
      .catch(err => {
        console.log("all review error", err);
        all_review_data = all_reviews_json(all_review_body.duration);
        console.log("all_review_data",all_review_data)
      });




    if (all_review_data) {
      this.setState({
        most_helpful_review: all_review_data.most_helpful_review,
        all_reviews: all_review_data.all_reviews
      });

      if (all_review_data.media_wise_all_reviews) {
        Promise.all(
          all_review_data.media_wise_all_reviews.map((data, i) => {
            if (data.media_name == "Facebook") {
              this.setState({
                fbReviews: data.all_reviews
              });
              all_active_listing = [...all_active_listing, "Facebook"];
            } else if (data.media_name == "Yelp") {
              this.setState({
                yelpReviews: data.all_reviews
              });
              all_active_listing = [...all_active_listing, "Yelp"];
            } else if (data.media_name == "Apple") {
              this.setState({
                appleReviews: data.all_reviews
              });
              all_active_listing = [...all_active_listing, "Apple"];
            } else if (data.media_name == "Citysearch") {
              this.setState({
                citysearchReviews: data.all_reviews
              });
              all_active_listing = [...all_active_listing, "Citysearch"];
            } else if (data.media_name == "Google") {
              this.setState({
                googleReviews: data.all_reviews
              });
              all_active_listing = [...all_active_listing, "Google"];
            } else if (data.media_name == "Foursquare") {
              this.setState({
                foursquareReviews: data.all_reviews
              });
              all_active_listing = [...all_active_listing, "Foursquare"];
            } else if (data.media_name == "Instagram") {
              this.setState({
                intaComments: data.all_reviews
              });
              all_active_listing = [...all_active_listing, "Instagram"];
            } else if (data.media_name == "Zillow") {
              this.setState({
                zillowReviews: data.all_reviews
              });
              all_active_listing = [...all_active_listing, "Zillow"];
            } else if (data.media_name == "Tomtom") {
              this.setState({
                tomtomReviews: data.all_reviews
              });
              all_active_listing = [...all_active_listing, "Tomtom"];
            } else if (data.media_name == "Avvo") {
              this.setState({
                avvoReviews: data.all_reviews
              });
              all_active_listing = [...all_active_listing, "Avvo"];
            } else if (data.media_name == "Zomato") {
              this.setState({
                zomatoReviews: data.all_reviews
              });
              all_active_listing = [...all_active_listing, "Zomato"];
            }
          })
        ).then(() =>
          this.setState({
            active_listing: all_active_listing,
            all_review_loading: false
          })
        );
      } else {
        this.setState({
          all_review_loading: false
        })
      }
    } else {
      this.setState({
        all_review_loading: false
      })
    }
  };

  most_helpful_review = () => {
    let { most_helpful_review ,all_review_loading} = this.state;
    this.setState({most_helpful_review:""})

    let data = most_helpful_review ? (
      <div className="col-md-4">
        {all_review_loading ? <div style={{ textAlign: "center" }}>
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={25}
                      width={25}
                      // timeout={3000} //3 secs
                    />
                  </div> : <div className="tablediv autor_namex ">
          <h4>Most helpful Review</h4>
          <div className="helpful-review">
            
            <div className="autoter">
              <img src={most_helpful_review.image} width={120} />
              <div className="autor_name">
                <h5>{most_helpful_review.name}</h5>
                <fieldset className="rating star">
                  <Rating
                    style={{ color: "#f7c508" }}
                    emptySymbol={["fa fa-star-o fa-2x high"]}
                    fullSymbol={["fa fa-star fa-2x high"]}
                    fractions={3}
                    initialRating={parseFloat(most_helpful_review.rating)}
                    readonly={true}
                  />
                </fieldset>
              </div>
            </div>
          </div>

          <div className="text_autor">
            <p>{most_helpful_review.review}</p>
          </div>
        </div>}
        
      </div>
    ) : (
      <div className="col-md-4">
        <div className="tablediv autor_namex ">
          <h4>Most helpful Review</h4>
        </div>
      </div>
    );
    return data;
  };

  rating_breakdown_function = () => {
    let { rating_breakdown } = this.state;
    let data = "";
    if (rating_breakdown && rating_breakdown.one) {
      let keys = Object.keys(rating_breakdown);
      let values = Object.values(rating_breakdown);
      let index = "";
      let numeric = [5, 4, 3, 2, 1];
      return ["five", "four", "three", "two", "one"].map((num, i) => (
        <div className="pull-left bottomstar">
          {(index = keys.indexOf(num))}
          <div className="pull-left" style={{ width: "35px", lineHeight: "1" }}>
            <div style={{ height: "12px", margin: "5px 0" }}>
              {numeric[i]}
              <span className="glyphicon glyphicon-star"></span>
            </div>
          </div>
          <div className="pull-left" style={{ width: "180px" }}>
            <div
              className="progress"
              style={{ height: "12px", margin: "8px 0" }}
            >
              <div
                className="progress-bar progress-bar-info"
                role="progressbar"
                aria-valuenow="3"
                aria-valuemin="0"
                aria-valuemax="5"
                style={{
                  width: values[index] + "%"
                }}
              >
                <span className="sr-only">80% Complete (danger)</span>
              </div>
            </div>
          </div>
          <div className="pull-right" style={{ marginLeft: "10px" }}>
            {values[index].toFixed(2)}%
          </div>
        </div>
      ));
    } else {
      return [5, 4, 3, 2, 1].map(data => (
        <div className="pull-left bottomstar">
          <div className="pull-left" style={{ width: "35px", lineHeight: "1" }}>
            <div style={{ height: "12px", margin: "5px 0" }}>
              {data}
              <span className="glyphicon glyphicon-star"></span>
            </div>
          </div>
          <div className="pull-left" style={{ width: "180px" }}>
            <div
              className="progress"
              style={{ height: "12px", margin: "8px 0" }}
            >
              <div
                className="progress-bar progress-bar-info"
                role="progressbar"
                aria-valuenow="3"
                aria-valuemin="0"
                aria-valuemax="5"
                style={{
                  width: 0 + "%"
                }}
              >
                <span className="sr-only">80% Complete (danger)</span>
              </div>
            </div>
          </div>
          <div className="pull-right" style={{ marginLeft: "10px" }}>
            0%
          </div>
        </div>
      ));
    }
  };

  change_states = name => async e => {
    await this.setState({ [name]: e.target.value });
    if (name == "over_all_rating_duration") {
      this.over_all_rating_api_function();
    } else if (name == "rating_breakdown_duration") {
      this.rating_breakdown_api_function();
    } else if (name == "all_review_duration") {
      this.all_review_api_function();
    }
  };

  drop_down = name => {
    let dropDown = (
      <select onChange={this.change_states(name)} className="review_select_btn">
        <option value="week">Last week</option>
        <option value="month">Last month</option>

        <option value="3 months">Last 3 month</option>

        <option value="6 months">Last 6 month</option>
        <option value="year">Last year</option>
      </select>
    );
    return dropDown;
  };

  render() {
    console.log("this.state", this.state);

    let {
      fbReviews,
      yelpReviews,
      googleReviews,
      foursquareReviews,
      appleReviews,
      citysearchReviews,
      instaComments,
      zillowReviews,
      tomtomReviews,
      avvoReviews,
      zomatoReviews,
      active_listing,

      most_helpful_review,
      over_all_rating_duration,
      over_all_rating,
      over_all_rating_loading,
      all_review_duration,
      all_reviews,
      all_review_loading,
      rating_breakdown_duration,
      rating_breakdown,
      rating_breakdown_loading
    } = this.state;
    
    
    return (
      <div>
        {/* <div className="content-page"> */}

        {this.state.loader ? (
          <div className="rightside_title">
            <Spinner />
          </div>
        ) : (
          <div className="main_content">
            <div className="rightside_title">
              <h1>Review Tracking</h1>
            </div>
            {active_listing.length != 0 ? (
              <div>
                <div className=" mb-30">
                  <div className="row">
                    <div className="col-md-4">
                      {over_all_rating_loading ? <div style={{ textAlign: "center" }}>
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={25}
                      width={25}
                      // timeout={3000} //3 secs
                    />
                  </div> : over_all_rating && over_all_rating.rating ? (
                        <div className="rating-block tablediv">
                          <h4>Overall Rating</h4>
                          {this.drop_down("over_all_rating_duration")}
                          <h2 className="bold padding-bottom-7">
                            {over_all_rating.rating.toString().slice(0, 3)}{" "}
                            <small>/ 5</small>
                          </h2>
                          <fieldset className="rating star">
                            <Rating
                              style={{ color: "#f7c508" }}
                              emptySymbol={["fa fa-star-o fa-2x high"]}
                              fullSymbol={["fa fa-star fa-2x high"]}
                              fractions={3}
                              initialRating={parseFloat(over_all_rating.rating)}
                              readonly={true}
                            />
                          </fieldset>
                          <div className="reviewthis">
                            <h5>{over_all_rating.reviews} Review</h5>
                            <h5>This Month</h5>
                          </div>
                        </div>
                      ) : (
                        <div className="rating-block tablediv">
                          <h4>Overall Rating</h4>
                          {this.drop_down("over_all_rating_duration")}
                        </div>
                      )}
                      
                    </div>

                    <div className="col-md-4">
                      
                      <div className="tablediv ratingdown">
                        <h4>Rating breakdown</h4>
                        {this.drop_down("rating_breakdown_duration")}
                        {rating_breakdown_loading ? <div style={{ textAlign: "center" }}>
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={25}
                      width={25}
                      // timeout={3000} //3 secs
                    />
                  </div> : this.rating_breakdown_function() }
                      </div>
                    </div>

                    {this.most_helpful_review()}
                  </div>
                </div>

                <div className="mt-30 viewallreview">
                  {/* <div className="box-space">
              <h1>View All Review</h1>
            </div> */}

                  <div className="box-space">
                    <div className="row d-flex">
                      <div className="col-md-8">
                        <h2>View All Review</h2>
                        {this.drop_down("all_review_duration")}
                      </div>

                      <div className="col-md-4 text-right"></div>
                    </div>
                  </div>

                  {active_listing.length != 0 ? (
                    <ul
                      className="nav nav-tabs nav-tabs-dropdown"
                      role="tablist"
                    >
                      <li role="presentation" className="active">
                        <a
                          href="#all-interactions"
                          aria-controls="all-interactions"
                          role="tab"
                          data-toggle="tab"
                        >
                          View all reviews
                        </a>
                      </li>

                      {active_listing.includes("Google") ? (
                        <li role="presentation">
                          <a
                            href="#Google"
                            aria-controls="city-search"
                            role="tab"
                            data-toggle="tab"
                          >
                            Google
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Instagram") ? (
                        <li role="presentation">
                          <a
                            href="#Instagram"
                            aria-controls="inside"
                            role="tab"
                            data-toggle="tab"
                          >
                            Instagram
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Foursquare") ? (
                        <li role="presentation">
                          <a
                            href="#Foursquare"
                            aria-controls="inside"
                            role="tab"
                            data-toggle="tab"
                          >
                            Foursquare
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Yelp") ? (
                        <li role="presentation">
                          <a
                            href="#Yelp"
                            aria-controls="yelp"
                            role="tab"
                            data-toggle="tab"
                          >
                            Yelp
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Facebook") ? (
                        <li role="presentation">
                          <a
                            href="#Facebook"
                            aria-controls="facebook"
                            role="tab"
                            data-toggle="tab"
                          >
                            Facebook
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Apple") ? (
                        <li role="presentation">
                          <a
                            href="#Apple"
                            aria-controls="inside"
                            role="tab"
                            data-toggle="tab"
                          >
                            Apple
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Citysearch") ? (
                        <li role="presentation">
                          <a
                            href="#Citysearch"
                            aria-controls="inside"
                            role="tab"
                            data-toggle="tab"
                          >
                            Citysearch
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Zillow") ? (
                        <li role="presentation">
                          <a
                            href="#Zillow"
                            aria-controls="inside"
                            role="tab"
                            data-toggle="tab"
                          >
                            Zillow
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Tomtom") ? (
                        <li role="presentation">
                          <a
                            href="#Tomtom"
                            aria-controls="inside"
                            role="tab"
                            data-toggle="tab"
                          >
                            Tomtom
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Avvo") ? (
                        <li role="presentation">
                          <a
                            href="#Avvo"
                            aria-controls="inside"
                            role="tab"
                            data-toggle="tab"
                          >
                            Avvo
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {active_listing.includes("Zomato") ? (
                        <li role="presentation">
                          <a
                            href="#Zomato"
                            aria-controls="inside"
                            role="tab"
                            data-toggle="tab"
                          >
                            Zomato
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  ) : (
                    <ul
                      className="nav nav-tabs nav-tabs-dropdown"
                      role="tablist"
                    >
                      <li role="presentation">
                        <a
                          aria-controls="all-interactions"
                          role="tab"
                          data-toggle="tab"
                        >
                          No listings are connected, please connect some
                          listings to see reviews
                        </a>
                      </li>
                    </ul>
                  )}
                </div>

                <div className="mt-30 ">
                  <div className="tab-content">
                    {all_review_loading ? <div style={{ textAlign: "center" }}>
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={25}
                      width={25}
                      // timeout={3000} //3 secs
                    />
                  </div> : <>
                    <div
                      role="tabpanel"
                      className="tab-pane active"
                      id="all-interactions"
                    >
                      {all_reviews && all_reviews.length != 0 ? (
                        all_reviews.map((rev, j) => (
                          <div className="whitebox" key={++j + "all_review"}>
                            <div className="view_author">
                              <img src={rev.image} />
                            </div>
                            <div className="text_viewahor">
                              <h4>
                                {/* Katrina leave a 5 star review{" "} */}
                                <span>{rev.time}</span>
                              </h4>
                              <Rating
                                style={{ color: "#f7c508" }}
                                emptySymbol={["fa fa-star-o fa-2x high"]}
                                fullSymbol={["fa fa-star fa-2x high"]}
                                fractions={3}
                                initialRating={rev.rating}
                                readonly={true}
                              />
                              <p>{rev.review}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane" id="Google">
                      {googleReviews.length != 0 ? (
                        googleReviews.map((rev, j) => (
                          <div className="whitebox" key={++j + "google"}>
                            <div className="view_author">
                              <img src={rev.image} />
                            </div>
                            <div className="text_viewahor">
                              <h4>
                                {/* Katrina leave a 5 star review{" "} */}
                                <span>{rev.time}</span>
                              </h4>
                              <Rating
                                style={{ color: "#f7c508" }}
                                emptySymbol={["fa fa-star-o fa-2x high"]}
                                fullSymbol={["fa fa-star fa-2x high"]}
                                fractions={3}
                                initialRating={rev.rating}
                                readonly={true}
                              />
                              <p>{rev.review}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane" id="Instagram">
                      {instaComments.length != 0 ? (
                        instaComments.map((rev, j) => (
                          <div className="whitebox" key={++j + "insta"}>
                            <div className="view_author">
                              <img src={rev.image} />
                            </div>
                            <div className="text_viewahor">
                              <h4>
                                {/* Katrina leave a 5 star review{" "} */}
                                <span>{rev.time}</span>
                              </h4>
                              <Rating
                                style={{ color: "#f7c508" }}
                                emptySymbol={["fa fa-star-o fa-2x high"]}
                                fullSymbol={["fa fa-star fa-2x high"]}
                                fractions={3}
                                initialRating={rev.rating}
                                readonly={true}
                              />
                              <p>{rev.review}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No comment</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane " id="Foursquare">
                      {foursquareReviews.length != 0 ? (
                        foursquareReviews.map((rev, j) => (
                          <div className="whitebox" key={++j + "foursquare"}>
                            <div className="view_author">
                              <img src={rev.image} />
                            </div>
                            <div className="text_viewahor">
                              <h4>
                                {/* Katrina leave a 5 star review{" "} */}
                                <span>{rev.time}</span>
                              </h4>
                              <Rating
                                style={{ color: "#f7c508" }}
                                emptySymbol={["fa fa-star-o fa-2x high"]}
                                fullSymbol={["fa fa-star fa-2x high"]}
                                fractions={3}
                                initialRating={rev.rating}
                                readonly={true}
                              />
                              <p>{rev.review}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane " id="Yelp">
                      {yelpReviews.length != 0 ? (
                        yelpReviews.map((rev, j) => (
                          <div className="whitebox" key={++j + "yelp"}>
                            <div className="view_author">
                              <img src={rev.image} />
                            </div>
                            <div className="text_viewahor">
                              <h4>
                                {/* Katrina leave a 5 star review{" "} */}
                                <span>{rev.time}</span>
                              </h4>
                              <Rating
                                style={{ color: "#f7c508" }}
                                emptySymbol={["fa fa-star-o fa-2x high"]}
                                fullSymbol={["fa fa-star fa-2x high"]}
                                fractions={3}
                                initialRating={rev.rating}
                                readonly={true}
                              />
                              <p>{rev.review}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane " id="Apple">
                      {appleReviews.length != 0 ? (
                        appleReviews.map((rev, j) => (
                          <div className="whitebox" key={++j + "apple"}>
                            <div className="view_author">
                              <img src={rev.image} />
                            </div>
                            <div className="text_viewahor">
                              <h4>
                                {/* Katrina leave a 5 star review{" "} */}
                                <span>{rev.time}</span>
                              </h4>
                              <Rating
                                style={{ color: "#f7c508" }}
                                emptySymbol={["fa fa-star-o fa-2x high"]}
                                fullSymbol={["fa fa-star fa-2x high"]}
                                fractions={3}
                                initialRating={rev.rating}
                                readonly={true}
                              />
                              <p>{rev.review}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane " id="Citysearch">
                      {citysearchReviews.length != 0 ? (
                        citysearchReviews.map((rev, j) => (
                          <div className="whitebox" key={++j + "citysearch"}>
                            <div className="view_author">
                              <img src={rev.image} />
                            </div>
                            <div className="text_viewahor">
                              <h4>
                                {/* Katrina leave a 5 star review{" "} */}
                                <span>{rev.time}</span>
                              </h4>
                              <Rating
                                style={{ color: "#f7c508" }}
                                emptySymbol={["fa fa-star-o fa-2x high"]}
                                fullSymbol={["fa fa-star fa-2x high"]}
                                fractions={3}
                                initialRating={rev.rating}
                                readonly={true}
                              />
                              <p>{rev.review}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane " id="Zillow">
                      {zillowReviews.length != 0 ? (
                        zillowReviews.map((rev, j) => (
                          <div className="whitebox" key={++j + "zillow"}>
                            <div className="view_author">
                              <img src={rev.image} />
                            </div>
                            <div className="text_viewahor">
                              <h4>
                                {/* Katrina leave a 5 star review{" "} */}
                                <span>{rev.time}</span>
                              </h4>
                              <Rating
                                style={{ color: "#f7c508" }}
                                emptySymbol={["fa fa-star-o fa-2x high"]}
                                fullSymbol={["fa fa-star fa-2x high"]}
                                fractions={3}
                                initialRating={rev.rating}
                                readonly={true}
                              />
                              <p>{rev.review}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane " id="Tomtom">
                      {tomtomReviews.length != 0 ? (
                        tomtomReviews.map((rev, j) => (
                          <div className="whitebox" key={++j + "tomtom"}>
                            <div className="view_author">
                              <img src={rev.image} />
                            </div>
                            <div className="text_viewahor">
                              <h4>
                                {/* Katrina leave a 5 star review{" "} */}
                                <span>{rev.time}</span>
                              </h4>
                              <Rating
                                style={{ color: "#f7c508" }}
                                emptySymbol={["fa fa-star-o fa-2x high"]}
                                fullSymbol={["fa fa-star fa-2x high"]}
                                fractions={3}
                                initialRating={rev.rating}
                                readonly={true}
                              />
                              <p>{rev.review}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane " id="Avvo">
                      {avvoReviews.length != 0 ? (
                        avvoReviews.map((rev, j) => (
                          <div className="whitebox" key={++j + "avvo"}>
                            <div className="view_author">
                              <img src={rev.image} />
                            </div>
                            <div className="text_viewahor">
                              <h4>
                                {/* Katrina leave a 5 star review{" "} */}
                                <span>{rev.time}</span>
                              </h4>
                              <Rating
                                style={{ color: "#f7c508" }}
                                emptySymbol={["fa fa-star-o fa-2x high"]}
                                fullSymbol={["fa fa-star fa-2x high"]}
                                fractions={3}
                                initialRating={rev.rating}
                                readonly={true}
                              />
                              <p>{rev.review}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane " id="Zomato">
                      {zomatoReviews.length != 0 ? (
                        zomatoReviews.map((rev, j) => (
                          <div className="whitebox" key={++j + "zomato"}>
                            <div className="view_author">
                              <img src={rev.image} />
                            </div>
                            <div className="text_viewahor">
                              <h4>
                                {/* Katrina leave a 5 star review{" "} */}
                                <span>{rev.time}</span>
                              </h4>
                              <Rating
                                style={{ color: "#f7c508" }}
                                emptySymbol={["fa fa-star-o fa-2x high"]}
                                fullSymbol={["fa fa-star fa-2x high"]}
                                fractions={3}
                                initialRating={rev.rating}
                                readonly={true}
                              />
                              <p>{rev.review}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div role="tabpanel" className="tab-pane " id="Facebook">
                      {fbReviews.length != 0 ? (
                        fbReviews.map((rev, j) => (
                          <div className="whitebox" key={++j + "fb"}>
                            <div className="view_author">
                              <img src={rev.image} />
                            </div>
                            <div className="text_viewahor">
                              <h4>
                                {/* Katrina leave a 5 star review{" "} */}
                                <span>{rev.time}</span>
                              </h4>
                              <Rating
                                style={{ color: "#f7c508" }}
                                emptySymbol={["fa fa-star-o fa-2x high"]}
                                fullSymbol={["fa fa-star fa-2x high"]}
                                fractions={3}
                                initialRating={rev.rating}
                                readonly={true}
                              />
                              <p>{rev.review}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="whitebox">
                          <div className="text_viewahor">
                            <h4>No review</h4>
                          </div>
                        </div>
                      )}
                    </div></>}
                    
                  </div>
                </div>
              </div>
            ) : (
              <div className=" mt-30">
                <div className="analytics-whice">
                  <div className="box-space2">
                    <h4>Connect some listings to see Reviews</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* </div> */}
      </div>
    );
  }
}
