// import { API } from "../../config";
import Axios from "axios";
// const API = "http://52.14.16.129:8000/api";
const API = "https://dashify.biz/Api";


export const all_listing_overview = (data, DjangoConfig) => {
  return Axios.post(
    `${API}/admin/socialmedia_api/get_overview_listing`,
    data,
    DjangoConfig
  );
};


export const all_connection_of_one_location = (data, DjangoConfig) => {
  return Axios.post(
    `${API}/admin/socialmedia_api/get_all_social_connected_list`,
    data,
    DjangoConfig
  );
};

export const add_social_account = (data) => {
  return Axios.post(`${API}/admin/socialmedia_api/connect_social_media`, data);
};

export const remove_social_account = (data, DjangoConfig) => {
  return Axios.post(
    `${API}/admin/socialmedia_api/disconnect_social_media`,
    data,
    DjangoConfig
  );
};
