<template>
  <div class="main_flex">
    <div class="main_right">
      <el-form label-width="100px" :model="dataftp" ref="dataftp">
        <h2 class="el-text">FTP信息详情</h2>
        <el-form-item label="医院科室" prop="yyks" :rules="[
        {required:true,messages:'医院科室不能为空'}
        ]">
          <el-input v-model="dataftp.yyks"></el-input>
        </el-form-item>
        <el-form-item label="域名" prop="ym" :rules="[
        {required:true,messages:'域名不能为空'}
        ]">
          <el-input v-model="dataftp.ym"></el-input>
        </el-form-item>
        <el-form-item label="绑定域名">
          <el-tag v-for="(item,index) of dataftp.children" :key="index" closable @close="deletebym(index)">{{item.ym}}</el-tag>
          <el-button v-if="addbdymshow" class="addymclass" type="primary" @click="addbhymshowtf">添加域名</el-button><el-input v-else @blur="handleInputConfirm" @keyup.enter.native="handleInputConfirm" ref="saveTagInput" v-model="addbdym" class="tag_input falseinput"></el-input>
        </el-form-item>
        <el-form-item label="FTP_ip">
          <el-input v-model="dataftp.FTP_ip"></el-input>
        </el-form-item>
        <el-form-item label="FTP端口">
          <el-input v-model="dataftp.FTPdk"></el-input>
        </el-form-item>
        <el-form-item label="FTP账号">
          <el-input v-model="dataftp.FTPzh"></el-input>
        </el-form-item>
        <el-form-item label="FTP密码">
          <el-input v-model="dataftp.FTPmm"></el-input>
        </el-form-item>
        <el-form-item label="后台地址">
          <el-input v-model="dataftp.htdz"></el-input>
        </el-form-item>
        <el-form-item label="账号">
        <el-input v-model="dataftp.htzh"></el-input>
      </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="dataftp.htmm"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="tijiao('dataftp')" class="uptatebutton" round>确定修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "FTParticle.vue",
        data(){
            return{
                addbdymshow:true,
                addbdym:"",
                dataftp:{},
            }
        },
        mounted(){
            let _this=this;
            this.$axios.post("gongdannum").then(function (success) {
                _this.$store.commit('menusum',success.data);
            })// 请求数据刷新 工单的个数 进行赋值
            this.$axios.post('ftparticle','id='+this.$route.params.id).then((success)=>{
              _this.dataftp=success.data[0];
            })
            //this.$route.params.id    路由请求ID
        },
        methods:{
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            tijiao(dataftp){
              const _this=this;
                 this.$refs[dataftp].validate((valid)=>{
                   if(valid){
                     _this.$axios.post('ftpupdate',`id=${_this.dataftp.id}&yyks=${_this.dataftp.yyks}&ym=${_this.dataftp.ym}&&FTP_ip=${_this.dataftp.FTP_ip}&FTPdk=${_this.dataftp.FTPdk}&FTPzh=${_this.dataftp.FTPzh}&FTPmm=${_this.dataftp.FTPmm}&htdz=${_this.dataftp.htdz}&htzh=${_this.dataftp.htzh}&htmm=${_this.dataftp.htmm}&cjdate=${_this.dataftp.cjdate}&children=${_this.dataftp.children}`).then((success)=>{
                        if(success.data==1){
                          _this.$message({
                            message:'修改成功',
                            type:'success'
                          })
                          _this.$router.push({path:`/FTPsearch`});
                          console.log(_this.$route);
                        } else if(success.data==2){
                          _this.$alert('未做任何修改',{
                            confirmButtonText: '确定',
                            type:'error'
                          })
                        }else{
                          _this.$alert('修改失败',{
                            confirmButtonText: '确定',
                            type:'error'
                          })
                        }
                     })
                   }else{
                     return false;
                   }
                 });
            },


            deletebym(index){
                this.dataftp.children.splice(index,1);
            },
            addbhymshowtf(){
                this.addbdymshow=false;
                this.$nextTick(_=>{
                    this.$refs.saveTagInput.$refs.input.focus();
                })
            },
            handleInputConfirm(){
                if(this.addbdym!=""){
                    this.dataftp.children.push({ym:this.addbdym});
                }
                this.addbdymshow=true;
                this.addbdym="";
            }
        },
    }
</script>

<style scoped>
  .main_left{width:10%;min-width:160px;}
  .main_flex{display:flex;justify-content:space-between;max-width:600px;}
  .el-table__row,.expanded{cursor:pointer;}
  .el-text{width:100%;margin:0;line-height: 2;}
  .el-input{width:500px;}

  .el-form-item{margin-bottom:30px;}
  .el-form-item[data-v-e25ebcf8]{margin:0;padding:0;text-align:left; border-radius:10px;text-indent:10px;margin-bottom:30px;width:100%;}
  .el-form-item[data-v-e25ebcf8] p{margin:0;padding:0;}
  form[data-v-e25ebcf8]{display: flex;flex-wrap:wrap;justify-content:center;}
  .main_right[data-v-e25ebcf8]{width:100%;}
  .el-form-item[data-v-e25ebcf8] >>> .el-form-item__label{text-align:left;}
  .el-tag{margin-left:10px;}
  .uptatebutton{width:100%;height:50px;font-size:20px;}
  .tag_input{width:100px;}
  .tag_input >>> input{height:32px;}
  .addymclass{font-size:12px;padding:9px 20px;margin-left:10px;}
  .falseinput{margin-left:10px;}
  .el-tag[data-v-e25ebcf8] >>> .el-icon-close:before{position:absolute;right:2px;}
</style>
