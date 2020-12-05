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

export const location_by_id = (data) => {
  console.log("location api",`${API}/admin/location_api/get_location_detail`)
  return Axios.post(`${API}/admin/location_api/get_location_detail`, data);
};

export const edit_location_by_id = (data, DjangoConfig) => {
  return Axios.post(
    `${API}/locations/edit-Location-Business-by-id`,
    data,
    DjangoConfig
  );
};

export const edit_location_operations_hours_by_id = (data, DjangoConfig) => {
  return Axios.post(
    `${API}/locations/edit-Location-operations-hours-by-id`,
    data,
    DjangoConfig
  );
};

export const edit_location_payment_by_id = (data) => {
  return Axios.post(
    `${API}/admin/location_api/update_location_payment_method`,
    data );
};

export const update_images_by_location_id = (data, DjangoConfig) => {
  return Axios.post(
    `${API}/locations/update-images-files-by-location-id`,
    data,
    DjangoConfig
  );
};

export const add_other_images_by_location_id = (data, DjangoConfig) => {
  return Axios.post(
    `${API}/locations/add-other-images-files-by-location-id`,
    data,
    DjangoConfig
  );
};

export const delete_other_images_by_location_id = (data, DjangoConfig) => {
  return Axios.post(
    `${API}/locations/remove-other-images-files-by-location-id-image-id`,
    data,
    DjangoConfig
  );
};
