// import { API } from "../../config";
import Axios from "axios";
const API = "https://cors-anywhere.herokuapp.com/http://18.216.54.114:8000/api";
//const API = "https://dashify.biz/api";

export const all_social_media_notifications = data => {
  return Axios.post(`${API}/social-media/all-notifications`, data);
};

export const all_social_media_overview = data => {
  return Axios.post(`${API}/social-media/social-overview`, data);
};

export const graph_google_customer_actions = data => {
  return Axios.post(`${API}/social-media/graph-google-customer-actions`, data);
};
