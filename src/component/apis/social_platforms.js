// import { API } from "../../config";
import Axios from "axios";
// const API = "http://52.14.16.129:8000/api";
const API = "https://digimonk.net/dashify-ci";

export const all_connection_of_one_location = (data, DjangoConfig) => {
  return Axios.post(
    `${API}/locations/get-all-connection-of-one-location`,
    data,
    DjangoConfig
  );
};

export const add_social_account = (data) => {
  return Axios.post(`${API}/admin/socialmedia_api/connect_social_media`, data);
};

export const remove_social_account = (data, DjangoConfig) => {
  return Axios.post(
    `${API}/locations/location-connect-remove-with-social-media`,
    data,
    DjangoConfig
  );
};
