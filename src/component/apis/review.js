// import { API } from "../../config";
import Axios from "axios";
const API = "https://dashify.biz/Api";
//const API = "https://dashify.biz/api";

// review tracking page

export const over_all_rating = data => {
  return Axios.post(`${API}/review/over-all-rating`, data);
};

export const rating_breakdown = data => {
  return Axios.post(`${API}/review/rating-breakdown`, data);
};

export const all_reviews = data => {
  return Axios.post(`${API}/review/all-reviews`, data);
};


export const review_analytics_by_location = data => {
  return Axios.post(`${API}/admin/socialmedia_api/get_reviews_analytics_by_filter`, data);
};

export const overall_rating_review = data => {
  return Axios.post(`${API}/admin/socialmedia_api/get_reviews_tracking`, data);
};

export const Add_Campaign = data => {
  return Axios.post(`${API}/admin/socialmedia_api/add_campaign`, data);
};

export const List_Connected_Url = data => {
  return Axios.post(`${API}/admin/socialmedia_api/list_connected_social_campaign`, data);
};

export const Review_Generation_Stats = data => {
  return Axios.post(`${API}/admin/socialmedia_api/get_generation_stats`, data);
};

export const Redirect_Url_Id = data => {
  return Axios.post(`${API}/admin/socialmedia_api/count_campaign_social`, data);
};


