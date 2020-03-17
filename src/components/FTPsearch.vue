<template>
    <div>
      <div class="title_search"><h1>相关域名查询</h1><router-link to="/addFTP"><el-button type="success">添加</el-button></router-link></div>
      <el-input class="search_bottom" placeholder="请输入相关域名" v-model="search" @keyup.enter.native="ymsearch">
        <template slot="prepend">域名</template>
        <el-button slot="append" @click="ymsearch" icon="el-icon-search"></el-button>
      </el-input>
      <el-table
      :data="dataftp"
      default-expand-all
      row-key="id"
      width="100%">
        <el-table-column prop="yyks" label="医院科室"></el-table-column>
        <el-table-column prop="ym" label="域名"></el-table-column>
        <el-table-column prop="FTP_ip" width="130" label="FTP_ip"></el-table-column>
        <el-table-column prop="FTPdk" width="80" label="FTP端口"></el-table-column>
        <el-table-column prop="FTPzh" label="FTP账号"></el-table-column>
        <el-table-column prop="FTPmm" label="FTP密码"></el-table-column>
        <el-table-column prop="htdz" width="250" label="后台地址"></el-table-column>
        <el-table-column prop="htzh" width="100" label="账号"></el-table-column>
        <el-table-column prop="htmm" label="密码"></el-table-column>
        <el-table-column prop="cjdate" label="创建时间">
          <template slot-scope="scope">
            {{scope.row.cjdate|formatDate}}
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" v-if="scope.row.cjdate" type="primary" @click="FTParticle(scope.row)">修改</el-button>
            <el-button size="mini" v-if="scope.row.cjdate" type="danger" @click="FTPdelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="10"
        v-if="total>10"
        :total="total"
        layout="total,prev,pager,next"
      ></el-pagination>
    </div>
</template>

<script>
    export default {
        name: "FTPsearch.vue",
        data(){
            return {
                search:"",
                total:9,
                dataftp:[]
            }
        },
        methods:{
            ymsearch:function () {
                //axios  提交查询FTP  相关域名  有绑定站 需要认真解决
            },
            FTParticle:function (	row, column, cell, event) {
                this.$router.push({path:`/FTParticle/${row.id}`});
            },
            FTPdelete:function (	row, column, cell, event) {
              let _this=this;
              this.$confirm('确认要删除工单？','确认信息',{
                distinguishCancelAndClose:true,
                confirmButtonText:'确认',
                cancelButtonText:'取消'
              }).then(()=>{
                _this.$axios.post('FTPdelete',`id=${row.id}`).then((success)=>{
                if(success.data){
                  _this.$message({
                    type:'success',
                    message:'成功删除'
                  })
                  _this.ftplist();
                }else if(success.data==0){
                   _this.$message({
                    type:'error',
                    message:'删除失败'
                  })
                }
              })
              }).catch(action => {
                _this.$message({
                    type:'info',
                    message:'取消删除'
                  })
                
              })
            },
            ftplist:function(){
              let _this=this;
              this.$axios.post('ftplist').then((success)=>{
             _this.dataftp=success.data;
           })
            }
        },
          sockets:{
          csserver:function(data){
            this.$store.commit('update_newwork',false);
            this.$store.commit('update_wjzid',data.id);
          }
        },
        mounted() {
            let _this=this;
            this.$store.commit('menudefaultzt','2');//改变左侧激活状态
            this.ftplist();
        }
    }
</script>

<style scoped>
.search_bottom{margin-bottom: 20px;}
  .title_search{text-align:center;}
  .title_search button[data-v-804dfeec]{float:right;margin-top:-50px;}
  .el-table-column{display:block;overflow-inline:hidden;white-space:nowrap;text-overflow:ellipsis;width:50px;}
</style>
