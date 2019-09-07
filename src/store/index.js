import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.prototype.$axios=axios;
axios.defaults.baseURL="http://localhost:10242/index/Index/";
axios.defaults.headers['Content-Type']='Application/x-www-form-urlencoded';
Vue.use(Vuex);
const Store=new Vuex.Store({
  state:{
    menumorenzhi:"",//menu 激活 值
    gongdan:"",     //工单 个数
  },
  mutations:{
    menudefaultzt(state,index){
      state.menumorenzhi=index;
    },
    menusum(state,data){
      axios.post("gongdannum").then(function (success) {
        state.gongdan=success.data;
      })
    },
    daijieshoujianyi(state){
      console.log(state.gongdan);
      state.gongdan.daijieshou--;
    }
  },
  actoins:{

  },
  getters:{

  }
})
export default Store
