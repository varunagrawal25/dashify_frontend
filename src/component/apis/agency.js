
import Axios from "axios";
const API = "https://dashify.biz/Api";

export const add_agency_dashboard= (data) => {
    return Axios.post(
      `${API}/admin/account_api/add_update_user_dashboard_agency`,data);
  };

  export const add_agency_scantool = (data) =>{
      return Axios.post(
        `${API}/admin/account_api/user_add_agency`,data);
     
  }

  export const get_agency = (data) =>{
    return Axios.post(
      `${API}/admin/account_api/user_data_agency`,data);
   
}


export const update_agency_scantool = (data) =>{
  return Axios.post(
    `${API}/admin/account_api/update_user_data_agency`,data);
 
}