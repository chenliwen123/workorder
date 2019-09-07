<template>
    <div>
      <div class="title_search"><h1>相关域名查询</h1><router-link to="/addFTP"><el-button type="success">添加</el-button></router-link></div>
      <el-input class="search_bottom" placeholder="请输入相关域名" v-model="search" @keyup.enter.native="ymsearch"><template slot="prepend">域名</template><el-button slot="append" @click="ymsearch" icon="el-icon-search"></el-button></el-input>
      <el-table
      :data="dataftp"
      default-expand-all
      row-key="ym"
      width="100%"
      @cell-dblclick="FTParticle"
      >
        <el-table-column prop="yyks" label="医院科室"></el-table-column>
        <el-table-column prop="ym" label="域名"></el-table-column>
        <el-table-column prop="FTP_ip" width="130" label="FTP_ip"></el-table-column>
        <el-table-column prop="FTPdk" width="80" label="FTP端口"></el-table-column>
        <el-table-column prop="FTPzh" label="FTP账号"></el-table-column>
        <el-table-column prop="FTPmm" label="FTP密码"></el-table-column>
        <el-table-column prop="htdz" width="250" label="后台地址"></el-table-column>
        <el-table-column prop="htzh" width="100" label="账号"></el-table-column>
        <el-table-column prop="htmm" label="密码"></el-table-column>
        <el-table-column prop="cjdate" label="创建时间"></el-table-column>
      </el-table>
      <el-pagination
        :page-size="10"
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
                total:20,
                dataftp:[
                    {
                        id:1,
                        yyks:"大连九州医院",
                        ym:"mobile.8421111.com",
                        FTP_ip:"115.159.195.151",
                        FTPdk:"21",
                        FTPzh:"mobile8421111com",
                        FTPmm:"g8bMhd1cVmDvtill",
                        htdz:"adminmob.84211111.com/bhde",
                        htzh:"admin",
                        htmm:"oOekr94DQRbrKzAr",
                        cjdate:"2019-08-16",
                        children:[
                            {ym:"wapzzrl.tjyy120.com",},
                            {ym:"www.dljz-nk.com",}
                        ]
                    },
                ]
            }
        },
        methods:{
            ymsearch:function () {
                //axios  提交查询FTP  相关域名  有绑定站 需要认真解决
            },
            FTParticle:function (	row, column, cell, event) {
                this.$router.push({path:`/FTParticle/${row.id}`});
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

<style scoped>
.search_bottom{margin-bottom: 20px;}
  .title_search{text-align:center;}
  .title_search button[data-v-804dfeec]{float:right;margin-top:-50px;}
</style>
