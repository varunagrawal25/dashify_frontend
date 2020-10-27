// import { API } from "../../config";
import Axios from "axios";
// const API = "http://52.14.16.129:8000/api";
const API = "https://dashify.biz/api";

export const faqs_by_id = (data, DjangoConfig) => {
  return Axios.post(`${API}/voice-faq/get-faqs-by-id`, data, DjangoConfig);
};

export const edit_faq = (data, DjangoConfig) => {
  return Axios.post(`${API}/voice-faq/edit-faq`, data, DjangoConfig);
};

export const all_faq_by_location_id = (data, DjangoConfig) => {
  return Axios.post(
    `${API}/voice-faq/get-all-faqs-by-location-id`,
    data,
    DjangoConfig
  );
};

export const delete_faq = (data, DjangoConfig) => {
  return Axios.post(`${API}/voice-faq/delete-faq`, data, DjangoConfig);
};

export const all_faq = DjangoConfig => {
  return Axios.get(`${API}/voice-faq/get-all-faqs`, DjangoConfig);
};

export const add_faq = (data, DjangoConfig) => {
  return Axios.post(`${API}/voice-faq/add`, data, DjangoConfig);
};
