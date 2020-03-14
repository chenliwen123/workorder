<template>
  <div class="main_flex">
    <div class="main_right">
      <el-form label-width="80px" :model="ruleForm" ref="ruleForm">
        <h2 class="el-text">工单详情</h2>
        <el-form-item label="域名" prop="yuming" :rules="[
        {required:true,message:'域名不能为空'}
        ]">
          <el-input v-model="ruleForm.yuming"></el-input>
        </el-form-item>
        <el-form-item label="工单类型" prop="leixing" :rules="[
        {required:true,message:'必须要选一个类型'}
        ]">
          <el-radio-group v-model="ruleForm.leixing" size="small">
            <el-radio label="1" border>域名解析</el-radio>
            <el-radio label="2" border>整站复制</el-radio>
            <el-radio label="3" border>整站上传</el-radio>
            <el-radio label="4" border>域名续费</el-radio>
            <el-radio label="5" border>域名备案</el-radio>
            <el-radio label="6" border>域名转移</el-radio>
            <el-radio label="7" border>网站恢复</el-radio>
            <el-radio label="10" border>网站修改</el-radio>
            <el-radio label="11" border>专题复制</el-radio>
            <el-radio label="12" border>专题修改</el-radio>
            <el-radio label="13" border>整站修改</el-radio>
            <el-radio label="14" border>专题制作</el-radio>
            <el-radio label="15" border>整站制作</el-radio>
            <el-radio label="16" border>整站优化</el-radio>
            <el-radio label="17" border>图片修改</el-radio>
            <el-radio label="18" border>图片设计</el-radio>
            <el-radio label="19" border>专题设计</el-radio>
            <el-radio label="20" border>整站设计</el-radio>
            <el-radio label="8" border>商务通</el-radio>
            <el-radio label="9" border>扒专题</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :autosize="{minRows:3,maxRows:15}"  palceholder="工单描述" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item>
            <el-upload
              ref="uploadExcel"
              action="http://localhost:10242/index/Index/upload"
              :on-success="fileok"
              :file="ruleForm.fileurl">
                <el-button type="primary" size="small" >上传文档</el-button>
                <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="tijiaobutton" @click="tijiao('ruleForm')" round>提交工单</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
    import workaside from "./workaside.vue"
    export default {
        name: 'tijiao',
        components:{workaside},
        data(){
            return{
                ruleForm:{
                    fileurl: "",
                    yuming:"",
                    leixing:"",
                    description:"",
                },
            }
        },
        mounted(){
                this.$store.commit('menusum');
                this.$store.commit('menudefaultzt','1-6');//改变左侧激活状态
        },
        methods:{
            tijiao(ruleForm){
                let _this=this;
               this.$refs[ruleForm].validate((valid)=>{
                   if (valid){
                       _this.$axios.post("addgongdan",`ym=${this.ruleForm.yuming}&leixing=${this.ruleForm.leixing}&description=${this.ruleForm.description}&fileurl=${this.ruleForm.fileurl}&xdr=${this.$cookie.get('name')}`).then(function (success) {
                           if(success.data.code==1){
                               _this.$message({
                                   type:"success",
                                   message:"提交成功"
                               });
                               _this.$router.push({path:`/daijieshou`});
                           }
                       });
                       _this.$store.commit('menudefaultzt','1-1');
                   }else{
                       return false;
                   }
                })
            },
            fileok(response, file, fileList){
                this.ruleForm.fileurl=response.img;
            }
        },
    }
</script>

<style scoped>
  .main_left{width:10%;min-width:160px;}
  .main_right{width:90%;display:flex;justify-content:center;}
  .main_flex{display:flex;justify-content:space-between;}
  .el-table__row,.expanded{cursor:pointer;}
  .el-form{width:725px;}
  .el-text{width:100%;margin-bottom:20px;line-height: 2;}
  .el-input{width:500px;}
  .el-form-item{margin-bottom:30px;}
  .el-form-item p{margin:0;padding:0;text-align:left;border:1px solid #ddd; border-radius:10px;text-indent:10px;max-width:600px;padding:10px;line-height: 25px;}
  .el-from{min-width:550px;}
  .el-radio.is-bordered+.el-radio.is-bordered{margin:0 !important;}
  .el-radio{margin:0;}
  .el-radio.is-bordered+.el-radio.is-bordered,.el-radio[data-v-57fabab2][data-v-57fabab2]{margin:0 15px 10px 15px !important;float:left;width:95px;}
  .tijiaobutton{width:100%;font-size:18px;}
  .el-form-item[data-v-57fabab2] >>> .el-form-item__content > div{width:100%;display: flex;justify-content:space-between;flex-wrap:wrap;}
</style>
