// import { API } from "../../config";
import Axios from "axios";
const API = "https://cors-anywhere.herokuapp.com/http://18.216.54.114:8000/api";
//const API = "https://dashify.biz/api";

// overview page

export const all_social_media_notifications = data => {
  return Axios.post(`${API}/social-media/all-notifications`, data);
};

export const all_social_media_overview = data => {
  return Axios.post(`${API}/social-media/social-overview`, data);
};

export const graph_google_customer_actions = data => {
  return Axios.post(`${API}/social-media/graph-google-customer-actions`, data);
};

// view listing

export const google_listing_detail = (data, DjangoConfig) => {
  return Axios.post(`${API}/social-media/google-listing-detail`, data);
};

export const citysearch_listing_detail = (data, DjangoConfig) => {
  return Axios.post(`${API}/social-media/citysearch-listing-detail`, data);
};
