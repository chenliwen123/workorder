import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/index'
Vue.use(Vuex);
const Store=new Vuex.Store({
  state:{
    menumorenzhi:"1-1",//menu 激活 值
    gongdan:"",        //工单 个数
    sessionname:'',    //session  用户名
    newwork:true,      //判断是否有新工单   true 没有新工单  false  有新工单
    wjzid:[]               //当前用户没加载到的工单id
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
    update_newwork(state,shwo){
      state.newwork=shwo;
    },
    update_wjzid(state,id){
      if(id==null){
        state.wjzid=[];
      }else{
        state.wjzid.push(id);
      }
    },
  },
  actions:{
  },
  getters:{
  }
})
export default Store
