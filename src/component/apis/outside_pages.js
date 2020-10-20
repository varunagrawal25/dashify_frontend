// import { API } from "../../config";
import Axios from "axios";
const API = "http://52.14.16.129:8000/api";
//const API = "https://dashify.biz/api";

export const add_query = query_data => {
  return Axios.post(`${API}/queryes`, query_data);
};

export const all_blogs = () => {
  return Axios.get(`${API}/bloges`);
};

export const all_jobs = () => {
  return Axios.get(`${API}/jobs`);
};

export const apply_for_job = data => {
  return Axios.post(`${API}/jobs/job-application`);
};
