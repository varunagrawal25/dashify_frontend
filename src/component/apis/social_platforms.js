// import { API } from "../../config";
import Axios from "axios";
// const API = "http://52.14.16.129:8000/api";
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
