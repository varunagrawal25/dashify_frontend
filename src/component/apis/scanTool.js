import Axios from "axios";
const API = "https://dashify.biz/Api";

export const ScanAddBusiness = (data) => {
    return Axios.post(
      `${API}/admin/scantool_api/add_scantool`,data);
  };

  export const ScanBusiness = (data) => {
    return Axios.post(
      `${API}/admin/scantool_api/search_scantool`,data);
  };