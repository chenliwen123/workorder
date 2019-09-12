<template>
    <div>
      <div class="main_left">
        <el-menu :default-active="this.$store.state.menumorenzhi" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">工单列表</span>
            </template>
            <router-link to="/daijieshou"><el-menu-item index="1-1"><el-badge :value="this.$store.state.gongdan.daijieshou" :max="99" class="item" type="primary">待接收</el-badge></el-menu-item></router-link>
            <router-link to="/gongzuozhong"><el-menu-item index="1-2"><el-badge :value="this.$store.state.gongdan.gongzuozhong" :max="99" type="success">工作中</el-badge></el-menu-item></router-link>
            <router-link to="/daidashang"><el-menu-item index="1-3"><el-badge :value="this.$store.state.gongdan.daidashang" :max="99" type="warning">待打赏</el-badge></el-menu-item></router-link>
            <router-link to="/yiwancheng"><el-menu-item index="1-4"><el-badge type="info" :value="this.$store.state.gongdan.yiwancheng" :max="99">已完成</el-badge></el-menu-item></router-link>
            <router-link to="/tijiao"><el-menu-item index="1-5">提交</el-menu-item></router-link>
          </el-submenu>
          <router-link to="/FTPsearch">
            <el-menu-item index="2">
             <i class="el-icon-document"></i>
            <span slot="title">FTP查询</span>
            </el-menu-item>
          </router-link>
<!--          <el-menu-item index="3">-->
<!--            <i class="el-icon-document"></i>-->
<!--            <span slot="title">导航三</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="4">-->
<!--            <i class="el-icon-setting"></i>-->
<!--            <span slot="title">导航四</span>-->
<!--          </el-menu-item>-->
        </el-menu>
      </div>
    </div>
</template>

<script>
export default {
  name: 'workaside.vue',
  data(){
    return{

    }
  },
  methods:{

  },
    mounted() {
        let _this=this;
        this.$axios.post("gongdannum").then(function (success) {
            _this.$store.commit('menusum',success.data);
        })// 请求数据刷新 工单的个数 进行赋值
      //加载组件之后  要在后台接收  待接收  工作中  待打赏  已完成  的个数,并给相应的值
    }
}
</script>

<style scoped type="scss">
  .el-submenu .el-menu-item{min-width:0 !important;}
  .el-submenu .el-menu a{text-decoration:none;}
  .el-badge[data-v-7cf3cd67] /deep/ sup{top:10px;}/*   两种写法  >>> /deep/     */
  a[data-v-7cf3cd67]{text-decoration:none;color:#303133;}
</style>
