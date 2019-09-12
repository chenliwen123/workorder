<template>
<div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      type="index"
      default-expand-all
      height="800px"
      @cell-dblclick="xiangqing"
      row-class-name="ymchangd"
      class="table_tbody_tr">
      <el-table-column
        prop="id"
        min-width="80"
        label="id">
      </el-table-column>
   <el-table-column
     prop="ym"
     label="域名"
     sortable
   class-name="yuming">
   </el-table-column>
      <el-table-column
        prop="leixing"
        label="工单类型"
        min-width="120"
        sortable>
<template slot-scope="scope">
  <el-tag label="1" v-if="scope.row.leixing==1" type="success" effect="plain">域名解析</el-tag>
  <el-tag label="2" v-if="scope.row.leixing==2" type="success" effect="plain" border>整站复制</el-tag>
  <el-tag label="3"  v-if="scope.row.leixing==3" type="success" effect="plain" border>整站上传</el-tag>
  <el-tag label="4"  v-if="scope.row.leixing==4" type="success" effect="plain" border>域名续费</el-tag>
  <el-tag label="5"  v-if="scope.row.leixing==5" type="success" effect="plain" border>域名备案</el-tag>
  <el-tag label="6"  v-if="scope.row.leixing==6" type="success" effect="plain" border>域名转移</el-tag>
  <el-tag label="7"  v-if="scope.row.leixing==7" type="success" effect="plain" border>网站恢复</el-tag>
  <el-tag label="10"  v-if="scope.row.leixing==10" type="success" effect="plain" border>网站修改</el-tag>
  <el-tag label="11"  v-if="scope.row.leixing==11" type="success" effect="plain" border>专题复制</el-tag>
  <el-tag label="12"  v-if="scope.row.leixing==12" type="success" effect="plain" border>专题修改</el-tag>
  <el-tag label="13"  v-if="scope.row.leixing==13" type="success" effect="plain" border>整站修改</el-tag>
  <el-tag label="14"  v-if="scope.row.leixing==14" type="success" effect="plain" border>专题制作</el-tag>
  <el-tag label="15"  v-if="scope.row.leixing==15" type="success" effect="plain" border>整站制作</el-tag>
  <el-tag label="16"  v-if="scope.row.leixing==16" type="success" effect="plain" border>整站优化</el-tag>
  <el-tag label="17"  v-if="scope.row.leixing==17" type="danger" effect="plain" border>图片修改</el-tag>
  <el-tag label="18"  v-if="scope.row.leixing==18" type="danger" effect="plain" border>图片设计</el-tag>
  <el-tag label="19"  v-if="scope.row.leixing==19" type="danger" effect="plain" border>专题设计</el-tag>
  <el-tag label="20"  v-if="scope.row.leixing==20" type="danger" effect="plain" border>整站设计</el-tag>
  <el-tag label="8"  v-if="scope.row.leixing==8" type="success" effect="plain" border>商务通</el-tag>
  <el-tag label="9"  v-if="scope.row.leixing==9" type="success" effect="plain" border>扒专题</el-tag>
</template>
      </el-table-column>
      <el-table-column
        prop="xdsj"
        label="下单时间"
        min-width="180"
        sortable>
        <template slot-scope="scope">
          {{scope.row.xdsj | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="xdr"
        label="下单人"
        min-width="100"
        sortable>
      </el-table-column>
      <el-table-column prop="dqzt" label="当前状态" min-width="100" height="35" sortable>
        <template slot-scope="scope">
          <el-badge is-dot :hidden="scope.row.fileurl==''">
              <el-tag type="primary" v-if="scope.row.dqzt==1">待接收</el-tag>
              <el-tag type="warning" v-if="scope.row.dqzt==2">工作中</el-tag>
              <el-tag type="primary" v-if="scope.row.dqzt==3">待打赏</el-tag>
              <el-tag type="success" v-if="scope.row.dqzt==4">已完成</el-tag>
          </el-badge>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="220">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="请输入关键词搜索"></el-input>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="jieshou(scope.row.id)">接收</el-button>
          <el-button size="mini" type="info" @click="xiangqing(scope.row.id)">查看</el-button>
          <el-button size="mini" type="danger" @click="deletework(scope.row.id,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  <el-pagination
    :page-size="11"
    :total="this.$store.state.gongdan.daijieshou"
    layout="total,prev,pager,next"
    @current-change="handleCurrentChange"
  ></el-pagination>
  </div>
</template>

<script>
    import {formatDate} from '@/assets/js/date.js'
export default {
  name: 'daijieshou',
  data(){
    return{
        search:"",
        tableData: [],
        sum:1,//当前页
        pageshow:true,
        // listdata:['域名解析','整站复制','整站上传','域名续费','域名备案','域名转移','网站恢复','网站修改','专题复制','专题修改','专题复制','整站修改','专题制作']
    }
  },
    mounted(){
        let _this=this;
        if (this.total<=11){
            this.pageshow=false;
        }
        this.$store.commit('menusum');//刷新左侧个数
        this.$store.commit('menudefaultzt','1-1');//改变左侧激活状态
        this.$axios.post("daijieshou").then(function (success) {
            _this.tableData=success.data;
        })
    },
  methods:{
    xiangqing:function (row,column,event,cell,id) {
      let article_id;
      article_id=row.id?row.id:row;
      article_id;
      this.$router.push({path:`/article_article/${article_id}`});
    },
    deletework:function (id,index) {
      let _this=this;
      this.$confirm(`将删除ID为${id}的工单,是否继续`,'提示',{
          confirmButtonText:"确定",
          cancelButtonText:"取消",
          type:"warning"
      }).then(function () {
          _this.$axios.post("delete_article",`id=${id}`).then(function (success) {//实现数据库中删除
              if (success.data==1){
                  _this.$message({
                      message:"删除成功",
                      type:"success"
                  });
                  _this.tableData.splice(index,1);//实现组件中数组删除
                  _this.$store.commit("daijieshoujianyi");//实现左侧个数减一
              }
          })
      }).catch(function () {
          _this.$message({
              message:"取消删除",
              type:"info",
          })
      })
    },
      handleCurrentChange:function(val){
          let _this=this;
          this.$axios.post("fanye",`sum=${--val}&dqzt=1`).then(function (success) {
              _this.tableData=success.data;
          });
      },
      jieshou(id){
          let _this=this;
          this.$axios.post("jieshou",`id=${id}`).then(function (success) {
              if (success.data==1){
                  _this.$store.commit('menusum');// 请求数据刷新 工单的个数 进行赋值
                  _this.$router.push({path:"/gongzuozhong"});
              }else if (success.data==0){
                  console.log("好像已经被人接走了");
              }else{
                  console.log("出现错误了");
              }
          })
      },
  },
    filters:{
        //时间戳
        formatDate(time) {
            return formatDate(time);
        },
    }
}
</script>

<style scoped>
  .expanded{cursor:pointer;}
  .el-table__footer-wrapper, .el-table__header-wrapper{cursor: pointer;}
  .el-table .cell{text-align:center;}
  .el-table-column{height:70px;}
  .ymchangd{widows:;}
  .el-badge[data-v-12e714f6] >>> .el-badge__content{top:5px;}
  .ymchangd td{font-size:23px;}
  .el-table[data-v-12e714f6] >>> td.yuming div{word-wrap: break-word;-webkit-line-clamp:2;-webkit-box-orient: vertical;display:-webkit-box;}
</style>
