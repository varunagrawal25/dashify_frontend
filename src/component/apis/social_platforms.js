// import { API } from "../../config";
import Axios from "axios";
// const API = "https://cors-anywhere.herokuapp.com/http://18.216.54.114:8000/api";
const API = "https://dashify.biz/api";

export const all_connection_of_one_location = (data, DjangoConfig) => {
  return Axios.post(
    `${API}/locations/get-all-connection-of-one-location`,
    data,
    DjangoConfig
  );
};

export const add_social_account = (data, DjangoConfig) => {
  return Axios.post(`${API}/social-platforms/add-account`, data, DjangoConfig);
};

export const remove_social_account = (data, DjangoConfig) => {
  return Axios.post(
    `${API}/locations/location-connect-remove-with-social-media`,
    data,
    DjangoConfig
  );
};
