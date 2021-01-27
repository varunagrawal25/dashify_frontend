import Axios from "axios";
// const API = "http://52.14.16.129:8000/api";
// const API = "https://dashify.biz/api";
const API = "https://dashify.biz/Api";

export const login = (user_login_data) => {
	return Axios.post(`${API}/admin/account_api/user_login`, user_login_data);
};

export const get_all_country = (data) => {
	return Axios.post(`${API}/admin/account_api/get_all_country`, data);
};
export const account_activate = (data) => {
	return Axios.post(`${API}/admin/account_api/user_activation`, data);
};

export const signup = (data) => {
	return Axios.post(`${API}/admin/account_api/user_registration`, data);
}; 

export const get_all_user = (data) => {
	return Axios.post(`${API}/admin/account_api/get_all_users`, data);
};

export const get_login_user_info = (data) => {
	return Axios.post(`${API}/admin/account_api/get_users_info`, data);
};

export const update_user_info = (data) => {
	return Axios.post(`${API}/admin/account_api/user_profile_data_update`, data);
};

export const update_user_image = (data) => {
	return Axios.post(`${API}/admin/account_api/user_profile_image_update`, data);
};

export const reset_password = (data) => {
	return Axios.post(`${API}/admin/account_api/reset_password_link`, data);
};

export const get_link_of_forget_password = (data) => {
	return Axios.post(`${API}/admin/account_api/forget_password_link`, data);
};

export const send_varification_link = (data) => {
	return Axios.post(`${API}/admin/account_api/resend_activation_link`, data);
};

export const card_billing = (data) => {
	return Axios.post(`${API}/admin/account_api/user_card_billing_update`, data);
};

export const logout = () => {
	return Axios.post(`${API}/account/logout`);
};
