import axios from "axios";

const Fetch = axios.create({
  withCredentials: true,
});

Fetch.interceptors.response.use((res) => res.data);

export default Fetch;
