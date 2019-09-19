<template>
    <div>
      <h2>工单系统</h2>
      <el-form>
        <el-row type="flex" justify="center">
          <el-col :xl="4" :lg="6" :md="8" :sm="10" :xs="12" class="minwidth">
            <el-row>
              <el-col>
                <div class="form_name"><el-input placeholder="请输入姓名" v-model="name" value clearable></el-input></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="form_pas"><el-input placeholder="密码" v-model="pas" @keyup.enter.native="pasent" show-password></el-input></div>
              </el-col>
            </el-row>
            <el-row>
              <div id="captcha"></div>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'login.vue',
  data(){
    return{
      name:"",
      pas:"",
    }
  },
  methods:{
    login:function () {
      var _this=this;
      this.$axios.post("vuelogin","name="+this.name+"&pas="+this.pas).then((res)=>{
        if (res.data.code==1){
          this.$cookie.set('name',_this.name,{expires:'1d'})
          _this.$router.push('/daijieshou')
        }else {
          this.$message({
            type:'error',
            message:"账号或密码错误",
          })
          document.querySelector('.refreshIcon').onclick();
        }
      })
    },
    pasent:function () {
      this.$message({
        type:"error",
        message:"请完成以下验证"
      })
    }
  },
  mounted(){
    let _this=this;
    jigsaw.init({
      el: document.getElementById('captcha'),
      onSuccess: function() {
        _this.login();
      },
       onFail: function(){
       },
      onRefresh: function(){
      },
    })
  }
}
</script>

<style scoped>

  .form_name,.form_pas{width:100%;margin-bottom:15px;}
  .loginbuttn .el-button{
    width: 100%;}
  .minwidth{min-width:320px;}
</style>
