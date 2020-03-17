import axios from 'axios'
axios.defaults.baseURL="http://192.168.255.80:10242/index/Index/";
axios.defaults.headers['Content-Type']='Application/x-www-form-urlencoded';
axios.defaults.withCredentials=true;

export default axios;