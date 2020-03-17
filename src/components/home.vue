<template>
  <div class="main_flex">
    <workaside></workaside>
    <div class="main_right">
      <div class="right_content">
        <!--      <ceshi></ceshi>-->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import daijieshou from "./daijieshou.vue"
import workaside from "./workaside.vue"
export default {
  name: 'home',
  components:{workaside,daijieshou},
  data () {
    return {
      isCollapse:"",
    }
  },
  methods:{
  },
    sockets:{
          csserver:function(data){
            this.$store.commit('update_newwork',false);
            this.$store.commit('update_wjzid',data.id);
          }
        },
  mounted() {
      let _this=this;
      this.$axios.post("gongdannum").then(function (success) {
          _this.$store.commit('menusum',success.data);
      })// 请求数据刷新 工单的个数 进行赋值
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main_left{width:10%;min-width:160px;}
  .main_right{width:100%;display: flex;justify-content: center;}
  .right_content{width:95%;display: flex;justify-content: center;}
  .right_content >>> div[data-v-957c9522]{width:100%;}
  .main_flex{display:flex;justify-content:flex-start;}
  .el-submenu .el-menu-item{padding:0 !important;min-width: 0;}
</style>
