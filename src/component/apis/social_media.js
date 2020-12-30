// import { API } from "../../config";
import Axios from "axios";
// const API = "http://52.14.16.129:8000/api";
const API = "https://digimonk.net/dashify-ci";

// overview page

export const all_social_media_notifications = data => {
  return Axios.post(`${API}/social-media/all-notifications`, data);
};

export const all_social_media_overview = data => {
  return Axios.post(`${API}/social-media/social-overview`, data);
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
