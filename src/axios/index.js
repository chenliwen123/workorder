import axios from 'axios'
//axios.defaults.baseURL="http://192.168.255.80:10242/index/Index/";
axios.defaults.headers['Content-Type']='Application/x-www-form-urlencoded';
axios.defaults.withCredentials=true;
if(process.env.NODE_ENV=='development'){
    axios.defaults.baseURL="/api"
}else if(process.env.NODE_ENV=='debug'){
    axios.defaults.baseURL="http://192.168.255.80:10242/index/Index"
}
else if(process.env.NODE_ENV=='production'){
    axios.defaults.baseURL="http://192.168.255.80:10242/index/Index"
}
export default axios;