import Axios from "axios";
// const API = "http://52.14.16.129:8000/api";
// const API = "https://dashify.biz/api";
const API = "https://digimonk.net/dashify-ci";

export const add_location = (data) => {
  return Axios.post(
    `${API}/admin/location_api/add`, data );
};

export const all_location = (data) => {
  return Axios.post(`${API}/admin/location_api/get_all_location`, data);
};

export const business_categories = (data) => {
  return Axios.post(`${API}/admin/location_api/get_all_bussiness_category`, data);
};

export const business_counrty = (data) => {
  return Axios.post(`${API}/admin/account_api/get_all_country`,data);
};
export const business_states = (data) => {
  return Axios.post(`${API}/admin/account_api/get_states`, data);
};
export const business_cities = (data) => {
  return Axios.post(`${API}/admin/account_api/get_cities`, data);
};

export const location_by_id = (data) => {
  console.log("location api",`${API}/admin/location_api/get_location_detail`)
  return Axios.post(`${API}/admin/location_api/get_location_detail`, data);
};

export const edit_location_by_id = (data) => {
  return Axios.post( `${API}/admin/location_api/update_location`, data );
};

export const edit_location_operations_hours_by_id = (data) => {
  return Axios.post(
    `${API}/admin/location_api/update_location_hours`, data);
};

export const All_payment_by_location = (data) => {
  return Axios.post(
    `${API}/admin/location_api/list_location_payment_method`,data );
};

export const edit_location_payment_by_id = (data) => {
  return Axios.post(
    `${API}/admin/location_api/update_location_payment_method`,data );
};

export const update_images_by_location_id = (data) => {
  return Axios.post(
    `${API}/admin/location_api/update_logo_cover_image`, data);
};

export const add_other_images_by_location_id = (data) => {
  return Axios.post(
    `${API}/admin/location_api/update_more_images`, data );
};

export const delete_other_images_by_location_id = (data) => {
  return Axios.post(
    `${API}/admin/location_api/delete_other_images`, data );
};

export const Add_Promotional = (data) => {
  return Axios.post(
    `${API}/admin/promotion_api/add_promotion`, data );
};

export const All_Promotional_list = (data) => {
  return Axios.post(
    `${API}/admin/promotion_api/all_promotional_by_locationid`, data );
};

export const Promotional_by_id = (data) => {
  return Axios.post(
    `${API}/admin/promotion_api/get_promotional_by_id`, data );
};

export const Update_Promotional_by_id = (data) => {
  return Axios.post(
    `${API}/admin/promotion_api/update_promotion`, data );
};

export const Delete_Promotional_by_id = (data) => {
  return Axios.post(
    `${API}/admin/promotion_api/delete_promotional`, data );
};