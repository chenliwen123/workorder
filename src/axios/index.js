import axios from 'axios'
axios.defaults.baseURL="http://localhost:10242/index/Index/";
axios.defaults.headers['Content-Type']='Application/x-www-form-urlencoded';
axios.defaults.withCredentials=true;

export default axios;