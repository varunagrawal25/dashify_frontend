// import { API } from "../../config";
import Axios from "axios";
const API = "https://cors-anywhere.herokuapp.com/http://18.216.54.114:8000/api";

export const add_location = (data, DjangoConfig) => {
  return Axios.post(`${API}/locations/add-location`, data, DjangoConfig);
};

export const all_location = (data, DjangoConfig) => {
  return Axios.post(`${API}/locations/get-all-locations`, data, DjangoConfig);
};

export const business_categories = DjangoConfig => {
  return Axios.get(`${API}/dropdown-values/business-categoryes`, DjangoConfig);
};

export const business_counrty = DjangoConfig => {
  return Axios.get(`${API}/dropdown-values/counrty`, DjangoConfig);
};
export const business_states = DjangoConfig => {
  return Axios.get(`${API}/dropdown-values/states`, DjangoConfig);
};

export const location_by_id = (data, DjangoConfig) => {
  return Axios.post(`${API}/locations/get-location-by-id`, data, DjangoConfig);
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

export const edit_location_payment_by_id = (data, DjangoConfig) => {
  return Axios.post(
    `${API}/locations/edit-Location-payment-method-by-id`,
    data,
    DjangoConfig
  );
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
