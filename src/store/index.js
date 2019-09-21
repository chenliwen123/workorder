import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {Message, MessageBox} from "element-ui";

axios.defaults.baseURL="http://localhost:10242/index/Index/";
axios.defaults.headers['Content-Type']='Application/x-www-form-urlencoded';

Vue.use(Vuex);
const Store=new Vuex.Store({
  state:{
    menumorenzhi:"1-1",//menu 激活 值
    gongdan:"",     //工单 个数
    gaibian:null,
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
    daijieshoujianyi(state,dqzt){
      switch(dqzt){
        case 1 : state.gongdan.daijieshou--;break;
        case 2 : state.gongdan.gongzuozhong--;break;
        case 3 : state.gongdan.daidashang--;break;
        case 4 : state.gongdan.yiwancheng--;break;
      }
    },
    gaibian(state,index){
      state.gaibian=index;
    },
  },
  actions:{
    deletework(state,data){
      MessageBox.confirm(`将删除ID为${data.id}的工单,是否继续`,'提示',{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:"warning"
      }).then(function () {
        axios.post("delete_article",`id=${data.id}`).then(function (success) {//实现数据库中删除
          if (state.gaibian=success.data==1){
            Store.commit('gaibian','1');
            Message({
              message:"删除成功",
              type:"success"
            });
          }
          Store.commit('daijieshoujianyi',data.dqzt);

        })
      }).catch(function () {
        Store.commit('gaibian','0');
        Message({
          message:"取消删除",
          type:"info",
        })
      })
    }
  },
  getters:{
  }
})
export default Store
