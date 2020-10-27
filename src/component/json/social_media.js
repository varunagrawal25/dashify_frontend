export const all_social_media_notifications_json = {
  Notification: [
    // Google, facebook all notification here in sorted time
    {
      media_name: "facebook",
      media_image: require("../../images/facebook.png"),
      head: "Arjun commented on your post",
      description: "Nice click",
      link: "https://fb.com",
      time: "2 hours ago"
    },
    {
      media_name: "google",
      media_image: require("../../images/google.png"),
      head: "Arjun commented on your post",
      description: "Nice click",
      link: "link to go to that page",
      time: "2 hours ago"
    },
    {
      media_name: "linkedin",
      media_image: require("../../images/yelp.png"),
      head: "Arjun commented on your post",
      description: "Nice click",
      link: "link to go to that page",
      time: "2 hours ago"
    },
    {
      media_name: "yelp",
      media_image: require("../../images/yelp.png"),
      head: "Arjun commented on your post",
      description: "Nice click",
      link: "link to go to that page",
      time: "2 hours ago"
    },
    {
      media_name: "tomtom",
      media_image: require("../../images/tomtom.png"),
      head: "Arjun commented on your post",
      description: "Nice click",
      link: "link to go to that page",
      time: "2 hours ago"
    },
    {
      media_name: "zomato",
      media_image: require("../../images/zomato.png"),
      head: "Arjun commented on your post",
      description: "Nice click",
      link: "link to go to that page",
      time: "2 hours ago"
    }
    //same for other google, yelp et"
  ]
};

export const all_social_media_overview_json = data => {
  if (data.duration == "week") {
    return {
      Overview: [
        {
          media_name: "Facebook",
          image: require("../../images/facebook.png"),
          parameters: ["views", "calls", "direction"],
          values: ["25", "65", "34"]
        },

        {
          media_name: "Linkedin",
          image: require("../../images/linkedin.png"),
          parameters: ["likes", "followers", "impressions"],
          values: ["23", "45", "-"]
        },

        {
          media_name: "Yelp",
          image: require("../../images/yelp.png"),
          parameters: ["likes", "followers", "impressions"],
          values: ["23", "45", "-"]
        },

        {
          media_name: "Google",
          image: require("../../images/google.png"),
          parameters: ["likes", "followers", "impressions"],
          values: ["23", "45", "-"]
        }
      ]

      // same for other 10 listings, give any 3 important parameters from your side like “likes”,”rating”,”calls”,”direction”,”reviews” etc. for connected listings
    };
  } else if (data.duration == "month") {
    return {
      Overview: [
        {
          media_name: "Facebook",
          image: require("../../images/facebook.png"),
          parameters: ["views", "calls", "direction"],
          values: ["250", "650", "340"]
        },

        {
          media_name: "Linkedin",
          image: require("../../images/linkedin.png"),
          parameters: ["likes", "followers", "impressions"],
          values: ["203", "450", "67"]
        },

        {
          media_name: "Yelp",
          image: require("../../images/yelp.png"),
          parameters: ["likes", "followers", "impressions"],
          values: ["2332", "453", "67"]
        },

        {
          media_name: "Google",
          image: require("../../images/google.png"),
          parameters: ["likes", "followers", "impressions"],
          values: ["235", "455", "45"]
        }
      ]

      // same for other 10 listings, give any 3 important parameters from your side like “likes”,”rating”,”calls”,”direction”,”reviews” etc. for connected listings
    };
  } else if (data.duration == "3 months") {
    return {
      Overview: [
        {
          media_name: "Facebook",
          image: require("../../images/facebook.png"),
          parameters: ["views", "calls", "direction"],
          values: ["2508", "650", "3450"]
        },

        {
          media_name: "Linkedin",
          image: require("../../images/linkedin.png"),
          parameters: ["likes", "followers", "impressions"],
          values: ["2035", "4507", "657"]
        },

        {
          media_name: "Yelp",
          image: require("../../images/yelp.png"),
          parameters: ["likes", "followers", "impressions"],
          values: ["2332", "4563", "567"]
        },

        {
          media_name: "Google",
          image: require("../../images/google.png"),
          parameters: ["likes", "followers", "impressions"],
          values: ["2354", "4455", "455"]
        }
      ]

      // same for other 10 listings, give any 3 important parameters from your side like “likes”,”rating”,”calls”,”direction”,”reviews” etc. for connected listings
    };
  } else if (data.duration == "6 months") {
    return {
      Overview: [
        {
          media_name: "Facebook",
          image: require("../../images/facebook.png"),
          parameters: ["views", "calls", "direction"],
          values: ["25084", "6504", "34520"]
        },

        {
          media_name: "Linkedin",
          image: require("../../images/linkedin.png"),
          parameters: ["likes", "followers", "impressions"],
          values: ["20345", "44507", "6457"]
        },

        {
          media_name: "Yelp",
          image: require("../../images/yelp.png"),
          parameters: ["likes", "followers", "impressions"],
          values: ["2332", "43563", "567"]
        },

        {
          media_name: "Google",
          image: require("../../images/google.png"),
          parameters: ["likes", "followers", "impressions"],
          values: ["23543", "44355", "455"]
        }
      ]

      // same for other 10 listings, give any 3 important parameters from your side like “likes”,”rating”,”calls”,”direction”,”reviews” etc. for connected listings
    };
  } else if (data.duration == "year") {
    return {
      Overview: [
        {
          media_name: "Facebook",
          image: require("../../images/facebook.png"),
          parameters: ["views", "calls", "direction"],
          values: ["2508444", "650434", "345240"]
        },

        {
          media_name: "Linkedin",
          image: require("../../images/linkedin.png"),
          parameters: ["likes", "followers", "impressions"],
          values: ["203435", "443507", "64537"]
        },

        {
          media_name: "Yelp",
          image: require("../../images/yelp.png"),
          parameters: ["likes", "followers", "impressions"],
          values: ["233332", "43563", "56337"]
        },

        {
          media_name: "Google",
          image: require("../../images/google.png"),
          parameters: ["likes", "followers", "impressions"],
          values: ["235343", "443545", "45335"]
        }
      ]

      // same for other 10 listings, give any 3 important parameters from your side like “likes”,”rating”,”calls”,”direction”,”reviews” etc. for connected listings
    };
  }
};

export const graph_google_customer_actions_json = data => {
  if (data == "week") {
    return {
      date: [
        "18/10/2020",
        "19/10/2020",
        "20/10/2020",
        "21/10/2020",
        "22/10/2020",
        "23/10/2020",
        "24/10/2020"
      ],
      phone: [12, 23, 34, 12, 23, 34, 56],
      direction: [122, 234, 34, 172, 23, 34, 586],
      website: [123, 23, 234, 132, 234, 34, 556]
    };
  } else if (data == "month") {
    return {
      date: [
        "01/10/2020",
        "08/10/2020",
        "15/10/2020",
        "22/10/2020",
        "29/10/2020"
      ],
      phone: [12, 23, 34, 162, 23],
      direction: [12, 234, 34, 172, 26],
      website: [123, 23, 34, 132, 2634]
    };
  } else if (data == "3 months") {
    return {
      date: [
        "01/10/2020",
        "08/10/2020",
        "15/10/2020",
        "22/10/2020",
        "29/10/2020",
        "01/11/2020",
        "08/11/2020",
        "15/11/2020",
        "22/11/2020",
        "29/11/2020",
        "01/12/2020",
        "08/12/2020",
        "15/12/2020",
        "22/12/2020",
        "29/12/2020"
      ],
      phone: [12, 223, 34, 122, 232, 12, 23, 34, 122, 23, 122, 23, 342, 12, 23],
      direction: [
        122,
        2234,
        34,
        172,
        23,
        1222,
        234,
        34,
        172,
        23,
        122,
        234,
        34,
        172,
        23
      ],
      website: [
        123,
        232,
        234,
        132,
        234,
        123,
        23,
        24,
        132,
        234,
        123,
        23,
        2343,
        132,
        234
      ]
    };
  } else if (data == "6 months") {
    return {
      date: [
        "21/01/2020",
        "21/02/2020",
        "20/03/2020",
        "21/04/2020",
        "22/05/2020",
        "23/06/2020"
      ],
      phone: [12, 23, 34, 12, 23, 344],
      direction: [1242, 234, 34, 172, 23, 34],
      website: [123, 23, 2344, 132, 234, 34]
    };
  } else if (data == "year") {
    return {
      date: [
        "21/01/2020",
        "21/02/2020",
        "20/03/2020",
        "21/04/2020",
        "22/05/2020",
        "23/06/2020",
        "21/07/2020",
        "21/08/2020",
        "20/09/2020",
        "21/10/2020",
        "22/11/2020",
        "23/12/2020"
      ],
      phone: [12, 23, 34, 12, 23, 34, 125, 23, 34, 12, 23, 34],
      direction: [122, 2343, 34, 172, 23, 34, 12, 23, 34, 12, 23, 34],
      website: [123, 23, 234, 132, 234, 34, 12, 23, 34, 12, 23, 340]
    };
  }
};

export const profile_analytics_json = data => {
  if (data == "week") {
    return {
      facebook: {
        views: "23",
        calls: "34",
        web: "-",
        direction: "56",
        clicks: "78"
      },
      facebook_percentage: {
        views: "2",
        calls: "4",
        web: "45",
        direction: "46",
        clicks: "78"
      },
      google: {
        views: "253",
        calls: "354",
        web: "56",
        direction: "536",
        clicks: "478"
      },
      google_percentage: {
        views: "12",
        calls: "43",
        web: "35",
        direction: "46",
        clicks: "22"
      },
      consolidated: {
        views: "23",
        calls: "334",
        web: "54",
        direction: "56",
        clicks: "758"
      },
      consolidated_percentage: {
        views: "2",
        calls: "48",
        web: "5",
        direction: "4",
        clicks: "8"
      },
      googleIsLoggedIn: false,
      fbIsLoggedIn: false
    };
  } else if (data == "month") {
    return {
      facebook: {
        views: "23",
        calls: "34",
        web: "-",
        direction: "656",
        clicks: "768"
      },
      facebook_percentage: {
        views: "2",
        calls: "4",
        web: "45",
        direction: "46",
        clicks: "78"
      },
      google: {
        views: "23",
        calls: "34",
        web: "-",
        direction: "56",
        clicks: "78"
      },
      google_percentage: {
        views: "12",
        calls: "43",
        web: "35",
        direction: "46",
        clicks: "22"
      },
      consolidated: {
        views: "23",
        calls: "34",
        web: "-",
        direction: "56",
        clicks: "78"
      },
      consolidated_percentage: {
        views: "2",
        calls: "48",
        web: "5",
        direction: "4",
        clicks: "8"
      },
      googleIsLoggedIn: false,
      fbIsLoggedIn: false
    };
  } else if (data == "3 months") {
    return {
      facebook: {
        views: "23",
        calls: "3412",
        web: "-",
        direction: "56",
        clicks: "78"
      },
      facebook_percentage: {
        views: "2",
        calls: "42",
        web: "45",
        direction: "46",
        clicks: "78"
      },
      google: {
        views: "23",
        calls: "3412",
        web: "-",
        direction: "5446",
        clicks: "78"
      },
      google_percentage: {
        views: "12",
        calls: "43",
        web: "35",
        direction: "46",
        clicks: "22"
      },
      consolidated: {
        views: "23",
        calls: "3444",
        web: "-",
        direction: "56",
        clicks: "78"
      },
      consolidated_percentage: {
        views: "2",
        calls: "48",
        web: "5",
        direction: "4",
        clicks: "8"
      },
      googleIsLoggedIn: false,
      fbIsLoggedIn: false
    };
  } else if (data == "6 months") {
    return {
      facebook: {
        views: "23",
        calls: "344",
        web: "-",
        direction: "526",
        clicks: "78"
      },
      facebook_percentage: {
        views: "2",
        calls: "4",
        web: "45",
        direction: "46",
        clicks: "78"
      },
      google: {
        views: "23",
        calls: "342",
        web: "-",
        direction: "56",
        clicks: "782"
      },
      google_percentage: {
        views: "12",
        calls: "43",
        web: "35",
        direction: "46",
        clicks: "22"
      },
      consolidated: {
        views: "2223",
        calls: "3422",
        web: "-",
        direction: "56",
        clicks: "784"
      },
      consolidated_percentage: {
        views: "2",
        calls: "48",
        web: "51",
        direction: "4",
        clicks: "81"
      },
      googleIsLoggedIn: false,
      fbIsLoggedIn: false
    };
  } else if (data == "year") {
    return {
      facebook: {
        views: "2553",
        calls: "3554",
        web: "5656",
        direction: "5446",
        clicks: "78"
      },
      facebook_percentage: {
        views: "22",
        calls: "43",
        web: "45",
        direction: "46",
        clicks: "78"
      },
      google: {
        views: "23",
        calls: "34",
        web: "-",
        direction: "56",
        clicks: "78"
      },
      google_percentage: {
        views: "12",
        calls: "43",
        web: "35",
        direction: "46",
        clicks: "22"
      },
      consolidated: {
        views: "2113",
        calls: "3421",
        web: "-",
        direction: "561",
        clicks: "781"
      },
      consolidated_percentage: {
        views: "22",
        calls: "48",
        web: "55",
        direction: "43",
        clicks: "82"
      },
      googleIsLoggedIn: false,
      fbIsLoggedIn: false
    };
  }
};
