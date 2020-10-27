export const over_all_rating_json = data => {
  if (data == "week") {
    return {
      rating: 4.2,
      reviews: "567"
    };
  } else if (data == "month") {
    return {
      rating: 4,
      reviews: "5670"
    };
  }
};

export const rating_breakdown_json = data => {
  if (data == "week") {
    return {
      one: 20,
      two: 10,
      three: 0,
      four: 25,
      five: 45
      //total 100
    };
  } else if (data == "month") {
    return {
      one: 10,
      two: 10,
      three: 10,
      four: 25,
      five: 45
      //total 100
    };
  }
};

export const all_reviews_json = data => {
  if (data == "week") {
    return {
      most_helpful_review: {
        name: "Ankit Sharma",
        image: require("../../images/facebook.png"),
        rating: 4.5,
        time: "28 May 2020 at 9:20 AM",
        review: "Very good place to enjoy. Must come"
      },
      all_reviews: [
        //sorted by time
        {
          name: "Ankit Sharma",
          media_name: "Facebook",
          image: require("../../images/facebook.png"),
          rating: 4.5,
          time: "28 May 2020 at 9:20 AM",
          review: "Very good place to enjoy. Must come"
        },
        {
          name: "Ankit Sharma",
          media_name: "Facebook",
          image: require("../../images/facebook.png"),
          rating: 4.5,
          time: "28 May 2020 at 9:20 AM",
          review: "Very good place to enjoy. Must come"
        },
        {
          name: "Ankit Sharma",
          media_name: "Facebook",
          image: require("../../images/facebook.png"),
          rating: 4.5,
          time: "28 May 2020 at 9:20 AM",
          review: "Very good place to enjoy. Must come"
        }
      ],
      media_wise_all_reviews: [
        {
          media_name: "Facebook",
          image: require("../../images/facebook.png"),
          all_reviews: [
            //sorted by time
            {
              name: "Ankit Sharma",
              image: require("../../images/facebook.png"),
              rating: 4.5,
              time: "28 May 2020 at 9:20 AM",
              review: "Very good place to enjoy. Must come"
            },
            {
              name: "Ankit Sharma",
              image: require("../../images/facebook.png"),
              rating: 4.5,
              time: "28 May 2020 at 9:20 AM",
              review: "Very good place to enjoy. Must come"
            },
            {
              name: "Ankit Sharma",
              image: require("../../images/facebook.png"),
              rating: 4.5,
              time: "28 May 2020 at 9:20 AM",
              review: "Very good place to enjoy. Must come"
            }
          ]
        },
        {
          media_name: "Yelp",
          image: require("../../images/yelp.png"),
          all_reviews: [
            {
              name: "Madhav",
              image: require("../../images/facebook.png"),
              rating: 4.5,
              time: "28 May 2020 at 9:20 AM",
              review: "good place to enjoy. Must come"
            },
            {
              name: "Ankit Sharma",
              image: require("../../images/facebook.png"),
              rating: 4.5,
              time: "28 May 2020 at 9:20 AM",
              review: "good place to enjoy. Must come"
            },
            {
              name: "Ankit Sharma",
              image: require("../../images/facebook.png"),
              rating: 4.5,
              time: "28 May 2020 at 9:20 AM",
              review: "Very good place to enjoy. Must come"
            }
          ]
        }
      ]
    };
  } else if (data == "month") {
    return {
      most_helpful_review: {
        name: "Rohit Sharma",
        image: require("../../images/facebook.png"),
        rating: 4.5,
        time: "30 May 2020 at 9:20 AM",
        review: "Very good place to enjoy. Must come"
      },
      All_reviews: [
        {
          media_name: "Facebook",
          image: require("../../images/facebook.png"),
          all_reviews: [
            {
              name: "Ankit Sharma",
              // image: require("../../images/avatar-4"),
              image: require("../../images/facebook.png"),
              rating: 4.5,
              time: "28 May 2020 at 9:20 AM",
              review: "Very good place to enjoy. Must come"
            },
            {
              name: "Ankit Sharma",
              image: require("../../images/facebook.png"),
              rating: 4.5,
              time: "28 May 2020 at 9:20 AM",
              review: "Very good place to enjoy. Must come"
            },
            {
              name: "Ankit Sharma",
              image: require("../../images/facebook.png"),
              rating: 4.5,
              time: "28 May 2020 at 9:20 AM",
              review: "Very good place to enjoy. Must come"
            }
          ]
        }
      ]
    };
  }
};

export const social_review_url_json = {
  Response: [
    { id: 1, name: "Facebook", image: "" },
    { id: 2, name: "Google", image: "../images/google.png" },
    { id: 3, name: "Linkedin", image: "" }
  ]
};
