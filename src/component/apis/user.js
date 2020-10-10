// import { API } from "../../config";
import Axios from "axios";
const API = "https://cors-anywhere.herokuapp.com/http://18.216.54.114:8000/api";
// const API = "https://cors-anywhere.herokuapp.com/https://dashify.biz/api";

export const login = user_login_data => {
  return Axios.post(`${API}/account/login`, user_login_data);
};

export const account_activate = data => {
  return Axios.post(`${API}/account/account-activate`, data);
};

export const signup = data => {
  return Axios.post(`${API}/account/register`, data);
};

export const get_all_user = () => {
  return Axios.get(`${API}/account/get-all-user`);
};

export const get_login_user_info = (data, DjangoConfig) => {
  return Axios.post(`${API}/account/get-login-user-info`, data, DjangoConfig);
};

export const update_user_info = (data, DjangoConfig) => {
  return Axios.post(`${API}/account/update-user-info`, data, DjangoConfig);
};

export const update_user_image = (data, DjangoConfig) => {
  return Axios.post(`${API}/account/update-user-image`, data, DjangoConfig);
};

export const reset_password = data => {
  return Axios.post(`${API}/account/reset-password`, data);
};

export const get_link_of_forget_password = data => {
  return Axios.post(`${API}/account/get-link-of-forget-password`, data);
};

export const send_varification_link = data => {
  return Axios.post(`${API}/account/send-varification-link`, data);
};

export const logout = () => {
  return Axios.post(`${API}/account/logout`);
};
