
import Axios from "axios";
const API = "https://digimonk.net/dashify-ci";

export const add_notification = (data) => {
  return Axios.post(
    `https://dashify.biz/Api/admin/account_api/add_notification_settings`, data );
};

// export const add_notification = (data) => {
//   return Axios.post(
//     `https://digimonk.net/dashify-ci/admin/account_api/add_notification_settings`, data );
// };

export const delete_email = (data) => {
  return Axios.post(
    `https://dashify.biz/Api/admin/account_api/delete_notification_emailid`, data );
};

export const get_notification = (data) => {
  return Axios.post(
    `https://dashify.biz/Api/admin/account_api/get_notification_settings`, data );
};

