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
            <router-link to="/yiwancheng"><el-menu-item index="1-5"><el-badge type="info" :value="this.$store.state.gongdan.yiwancheng" :max="99">已完成</el-badge></el-menu-item></router-link>
            <router-link to="/wotijiao"><el-menu-item index="1-4"><el-badge :value="this.$store.state.gongdan.wotijiao" :max="99">我提交</el-badge></el-menu-item></router-link>
            <router-link to="/tijiao"><el-menu-item index="1-6">提交</el-menu-item></router-link>
          </el-submenu>
          <router-link to="/FTPsearch">
            <el-submenu index="4">
            <template  slot="title" index="4-1">
                 <i class="el-icon-document"></i>
                 <span slot="title">FTP查询</span>  
            </template> 
            </el-submenu>
            </router-link>
          <el-submenu index='3'>
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">{{this.$store.state.sessionname}}</span>
            </template>
            <el-menu-item index="3-1" @click="sign()">
              <p>退出</p>
            </el-menu-item>
          </el-submenu>
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
    sign () {
      let _this=this;
      this.$confirm('此操作会退出该账号,是否继续?','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        
        _this.$message({
          type:'success',
          message:'已退出'
        })
         _this.$router.push('/login'); 
        _this.$axios.post('sign');
      }).catch(()=>{
        _this.$message({
          type:'info',
          message:'已取消退出'
        })
      })
      
  },
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
  .el-submenu >>> .el-submenu__icon-arrow{display:none;}
</style>
