

import Axios from "axios";
const API = "https://digimonk.net/dashify-ci";

export const Add_Keyword = (data) => {
    return Axios.post(
      `${API}/admin/location_api/add_keyword`,data);
  };
  

  export const Get_Keywords = (data) => {
    return Axios.post(
      `${API}/admin/location_api/get_keyword_ranking_analytics`,data);
  };
  