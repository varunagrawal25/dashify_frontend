

import Axios from "axios";
const API = "https://dashify.biz/Api";

export const Add_Invite_User = (data) => {
    return Axios.post(
      `${API}/admin/account_api/add_new_invite_user`,data);
  };
  

  export const Get_All_Invites_By_User = (data) => {
    return Axios.post(
      `${API}/admin/account_api/get_invite_userlist_by_uid`,data);
  };

  export const Edit_Invite = (data) => {
    return Axios.post(
      `${API}/admin/account_api/invite_user_details`,data);
  };
  

  export const Update_Invite = (data) => {
    return Axios.post(
      `${API}/admin/account_api/update_invite_user`,data);
  };
  
  export const Delete_Invite = (data) => {
    return Axios.post(
      `${API}/admin/account_api/delete_invite_user_`,data);
  };
  
  export const Disable_Invite = (data) => {
    return Axios.post(
      `${API}/admin/account_api/disable_invite_user`,data);
  };
  
  