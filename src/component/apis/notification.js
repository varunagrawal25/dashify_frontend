
import Axios from "axios";
const API = "https://digimonk.net/dashify-ci";

export const add_notification = (data) => {
  return Axios.post(
    `${API}/admin/account_api/add_notification_settings`, data );
};