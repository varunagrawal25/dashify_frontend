// import { API } from "../../config";
import Axios from "axios";
const API = "http://52.14.16.129:8000/api";
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
