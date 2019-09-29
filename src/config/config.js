import Vue from 'vue';
import {MessageBox,Message} from 'element-ui'
import axios from 'axios'
axios.defaults.baseURL="http://localhost:10242/index/Index/";
axios.defaults.headers['Content-Type']='Application/x-www-form-urlencoded';

export default{
  install(Vue,options){
    Vue.prototype.deletework1=function(data){
      let _this=this;
      MessageBox.confirm(`将删除ID为${data.id}的工单,是否继续`,'提示',{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:"warning",
        callback:function (action,instance) {
          console.log(action);
        }
      }).then(async()=> {
        axios.post("delete_article",`id=${data.id}`).then(function (success) {//实现数据库中删除
          if (success.data==1){
            Message({
              message:"删除成功",
              type:"success"
            });
            _this.$store.commit("menusum");
            _this.back.deleteback=1;
          }
        })
      }).catch(()=> {
        Message({
          message:"取消删除",
          type:"info",
        });
        _this.back.deleteback=0;
      });
    },
      Vue.prototype.back={
         deleteback:null,
      }
  }
}
