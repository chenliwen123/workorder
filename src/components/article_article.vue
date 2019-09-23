<template>
  <div class="main_flex">
    <div class="main_right">
      <el-form label-width="80px" :model="formLabelAlign">
        <h2 class="el-text">工单详情</h2>
        <el-form-item label="下单人">
          <p v-text="formLabelAlign.xdr"></p>
        </el-form-item>
        <el-form-item label="域名">
          <p v-cloak>{{formLabelAlign.ym}}</p>
        </el-form-item>
        <el-form-item label="工单类型">
          <p label="1" v-if="formLabelAlign.leixing==1">域名解析</p>
          <p label="2" v-if="formLabelAlign.leixing==2">整站复制</p>
          <p label="3"  v-if="formLabelAlign.leixing==3">整站上传</p>
          <p label="4"  v-if="formLabelAlign.leixing==4">域名续费</p>
          <p label="5"  v-if="formLabelAlign.leixing==5">域名备案</p>
          <p label="6"  v-if="formLabelAlign.leixing==6">域名转移</p>
          <p label="7"  v-if="formLabelAlign.leixing==7">网站恢复</p>
          <p label="10"  v-if="formLabelAlign.leixing==10">网站修改</p>
          <p label="11"  v-if="formLabelAlign.leixing==11">专题复制</p>
          <p label="12"  v-if="formLabelAlign.leixing==12">专题修改</p>
          <p label="13"  v-if="formLabelAlign.leixing==13">整站修改</p>
          <p label="14"  v-if="formLabelAlign.leixing==14">专题制作</p>
          <p label="15"  v-if="formLabelAlign.leixing==15">整站制作</p>
          <p label="16"  v-if="formLabelAlign.leixing==16" >整站优化</p>
          <p label="17"  v-if="formLabelAlign.leixing==17">图片修改</p>
          <p label="18"  v-if="formLabelAlign.leixing==18">图片设计</p>
          <p label="19"  v-if="formLabelAlign.leixing==19" >专题设计</p>
          <p label="20"  v-if="formLabelAlign.leixing==20" >整站设计</p>
          <p label="8"  v-if="formLabelAlign.leixing==8">商务通</p>
          <p label="9"  v-if="formLabelAlign.leixing==9">扒专题</p>
        </el-form-item>
        <el-form-item label="描述" style="margin-bottom:20px;">
          <p class="description" v-cloak>{{formLabelAlign.description}}</p>
        </el-form-item>
        <el-form-item label="" class="download_flex">
          <el-radio-group  size="small" style="float:left;" v-if="formLabelAlign.dqzt==3" v-model="radio">
            <el-radio-button class="you"  label="1">优<i class="el-icon-sunny el-icon--right"></i></el-radio-button>
            <el-radio-button class="liang" label="2">良<i class="el-icon-sunrise-1 el-icon--right"></i></el-radio-button>
            <el-radio-button class="cha" label="3">差<i class="el-icon-heavy-rain el-icon--right"></i></el-radio-button>
          </el-radio-group>
          <a :href="formLabelAlign.fileurl" class="download" style="float:right"  v-if="formLabelAlign.fileurl">
            <el-button class="el-icon-download download_button" type="success" order>下载文件</el-button>
          </a>
        </el-form-item>
        <el-form-item>
          <el-button class="quedingbutton" v-if="formLabelAlign.dqzt==1" type="primary" @click="jieshou()" round>接收</el-button>
          <el-button class="quedingbutton" type="success" v-if="formLabelAlign.dqzt==2"  @click="wancheng()" round>完成</el-button>
          <el-button class="quedingbutton" type="warning" v-if="formLabelAlign.dqzt==3" @click="dashang11()" round>打赏</el-button>
          <el-button class="quedingbutton" type="success" v-if="formLabelAlign.dqzt==4" round>已完成</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import workaside from "./workaside.vue"
export default {
  name: 'article_article',
  components:{workaside},
  data(){
    return{
      formLabelAlign:{},
     // formshow:false,//改变显示详细 变量
        radio:null,
    }
  },
  created(){
      this.shuaxin();
  },
  methods:{
      jieshou(){
          let _this=this;
          this.$axios.post("jieshou",`id=${_this.$route.params.id}`).then(function (success) {
              if (success.data==1){
                  _this.$store.commit('menusum');// 请求数据刷新 工单的个数 进行赋值
                  console.log("接收成功");
                  _this.$router.push({path:"/gongzuozhong"});
              }else if (success.data==0){
                  console.log("好像已经被人接走了");
              }else{
                  console.log("出现错误了");
              }
          })
      },
      shuaxin(){
          let _this=this;
          this.$store.commit('menusum');// 请求数据刷新 工单的个数 进行赋值
          this.$axios.post("article_article",`id=${_this.$route.params.id}`).then(function (success) {
              _this.formLabelAlign=success.data[0];
              // if (success.data[0]!=null){
              //     _this.formshow=true;//改变显示详细模块
              // }
          })
      },
      dashang11(){
          let _this=this;
          this.$axios.post('dashang',`id=${_this.dashang}&pj=${_this.radio}`).then(function (success) {
              console.log(success.data);
              if (success.data==1){
                  _this.$message({
                      type:"success",
                      message:"打赏成功",
                  })
                  _this.$router.push("/yiwancheng");
              }
          })
      },
      wancheng(){
          let _this=this;
          this.$axios.post('wanchen',`id=${_this.$route.params.id}`).then(function (success) {
              if (success.data==1){
                  _this.$message({
                      type:"success",
                      message:"完成工单"
                  })
                  _this.$store.commit('menusum');//刷新左侧个数
                  _this.$router.push({path:'/daidashang'})
              }
          })
      },
      dashang11(pj){
          let _this=this;
          this.$axios.post('dashang',`id=${_this.$route.params.id}&pj=${pj}`).then(function (success) {
              console.log(success.data);
              if (success.data==1){
                  _this.$message({
                      type:"success",
                      message:"打赏成功",
                  })
                  _this.$router.push("/yiwancheng");
              }
          })
      },//打赏
  },
}
</script>
<style scoped type="less">
  [v-cloak]{display:none !important;}
  .main_left{width:10%;min-width:160px;}
  .main_right{width:90%;display:flex;justify-content:center;}
  .main_flex{display:flex;justify-content:space-between;}
  .el-table__row,.expanded{cursor:pointer;}
  .el-text{width:100%;margin:0;line-height: 2;}
  .el-input{width:500px;}
  .quedingbutton{width:100%;font-size:20px;}
  .el-form-item{margin-bottom:30px;}
  .el-form-item p{margin:0;padding:0;text-align:left;border:1px solid #ddd; border-radius:10px;text-indent:10px;width:600px;padding:10px;line-height: 25px;}
  .el-from{min-width:550px;}
  .description{min-height:70px;}

  .download,.download_button{width:110px;font-size:14px;line-height:0;height:30px;}
  .download_flex{display:flex;justify-content:space-between;margin-bottom:20px;}
  .el-tag{font-size:18px;text-align:left;height: 100%;line-height:2;}
  .leixing_tag{display:flex;justify-content:flex-start;}
  .leixing_tag >>> .el-form-item__content{margin:0 !important;}
  .download_flex[data-v-63284e4d] >>> div.el-form-item__content{width:100%;}
  .el-radio-button:nth-child(1).is-active[data-v-63284e4d] >>> .el-radio-button__inner{background-color:#67C23A;border:#67C23A 1px solid ;-webkit-box-shadow:-1px 0 0 0 #67C23A;}
  .el-radio-button:nth-child(2).is-active[data-v-63284e4d] >>> .el-radio-button__inner{background-color:#E6A23C;border:#E6A23C 1px solid;-webkit-box-shadow:-1px 0 0 0 #E6A23C;}
  .el-radio-button:nth-child(3).is-active[data-v-63284e4d] >>> .el-radio-button__inner{background-color:#F56C6C;border:#F56C6C 1px solid;-webkit-box-shadow:-1px 0 0 0 #F56C6C;}
  .el-radio-group {

    .el-radio__input.is-checked .el-radio__inner {



      border-color: #67C23A;

      background: #67C23A;

    }

    .el-radio__input .el-radio__inner {



      &:hover {

        border: 1px solid #67C23A;

      }

    }

    .el-radio__input.is-checked+.el-radio__label {



      color: #67C23A;

    }



  }
</style>
