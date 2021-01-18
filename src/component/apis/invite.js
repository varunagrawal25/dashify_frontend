

import Axios from "axios";
const API = "https://digimonk.net/dashify-ci";

export const Add_Invite_User = (data) => {
    return Axios.post(
      `${API}/admin/account_api/add_new_invite_user`,data);
  };
  

  export const Get_All_Invites_By_User = (data) => {
    return Axios.post(
      `${API}/admin/account_api/get_invite_userlist_by_uid`,data);
  };
  