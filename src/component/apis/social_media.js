// import { API } from "../../config";
import Axios from "axios";
// const API = "http://52.14.16.129:8000/api";
const API = "https://digimonk.net/dashify-ci";

// overview page

export const all_social_media_notifications = data => {
  return Axios.post(`${API}/social-media/all-notifications`, data);
};

export const all_social_media_overview = data => {
  return Axios.post(`${API}/admin/socialmedia_api/get_social_overview_listing`, data);
};

export const graph_google_customer_actions = data => {
  return Axios.post(`${API}/admin/socialmedia_api/get_avereage_google_customer_action`, data);
};

// view listing page
export const google_listing_detail = data => {
  return Axios.post(`${API}/social-media/google-listing-detail`, data);
};

export const citysearch_listing_detail = data => {
  return Axios.post(`${API}/social-media/citysearch-listing-detail`, data);
};

//profile analytics page
export const profile_analytics = data => {
  return Axios.post(`${API}/social-media/profile-analytics`, data);
};

export const optimization_score = data => {
  return Axios.post(`${API}/admin/socialmedia_api/check_social_score`, data);
};

