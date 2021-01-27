// import { API } from "../../config";
import Axios from "axios";
// const API = "http://52.14.16.129:8000/api";
const API = "https://dashify.biz/Api";

export const faqs_by_id = (data, DjangoConfig) => {
  return Axios.post(`${API}/voice-faq/get-faqs-by-id`, data, DjangoConfig);
};

export const edit_faq = (data) => {
  return Axios.post(`${API}/admin/location_api/edit_faq`, data);
};

export const all_faq_by_location_id = (data) => {
  return Axios.post(
    `${API}/admin/location_api/all_faq_by_location`,data);
};

export const delete_faq = (data) => {
  return Axios.post(`${API}/admin/location_api/delete_faq`, data);
};

export const all_faq = DjangoConfig => {
  return Axios.get(`${API}/voice-faq/get-all-faqs`, DjangoConfig);
};

export const add_faq = (data) => {
  return Axios.post(`${API}/admin/location_api/add_faq`, data);
};
