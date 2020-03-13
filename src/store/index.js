import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL="http://localhost:10242/index/Index/";
axios.defaults.headers['Content-Type']='Application/x-www-form-urlencoded';
axios.defaults.withCredentials=true;
Vue.use(Vuex);
const Store=new Vuex.Store({
  state:{
    menumorenzhi:"1-1",//menu 激活 值
    gongdan:"",     //工单 个数
    sessionname:''
  },
  mutations:{
    menudefaultzt(state,index){
      state.menumorenzhi=index;
    },
    menusum(state){
      axios.post("gongdannum").then(function (success) {
        state.gongdan=success.data;
        state.sessionname=success.data.sessionname;
      })
    },
  },
  actions:{
  },
  getters:{
  }
})
export default Store
