<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      height="800px"
      row-key="id"
      default-expand-all
      @cell-dblclick="xiangqing"
      @selection-change="handleSelectionChange"
      class="table_tbody_tr">
      <el-table-column type="selection" min-width="30"></el-table-column>
      <el-table-column
        prop="id"
        min-width="40"
        label="id">
      </el-table-column>
      <el-table-column
        prop="ym"
        label="域名"
        min-width="100"
        sortable>
      </el-table-column>
      <el-table-column
        prop="leixing"
        label="工单类型"
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
        label="下单日期"
        sortable>
        <template slot-scope="scope">
          {{scope.row.xdsj|formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="jdsj"
        label="接单日期"
        sortable>
        <template slot-scope="scope">
          {{scope.row.jdsj|formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="wcsj"
        label="完成日期"
        sortable>
        <template slot-scope="scope">
          {{scope.row.wcsj|formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="xdr"
        label="下单人"
        sortable>
      </el-table-column>
      <el-table-column prop="zhuangtai" label="当前状态" sortable>
        <template slot-scope="scope">
          <el-badge is-dot :hidden="scope.row.fileurl==''">
            <el-tag type="warning" v-if="scope.row.dqzt==3" round>待打赏</el-tag>
          </el-badge>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="120">
        <template slot="header">
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="xiangqing(scope.row.id)">查看</el-button>
          <el-button size="mini" type="danger" @click="deletework(scope.row.id,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="11"
      :total="this.$store.state.gongdan.daidashang"
      layout="total,prev,pager,next"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <el-button-group>
      <el-button type="success" @click="dashang11(1)">优<i class="el-icon-sunny el-icon--right"></i></el-button>
      <el-button type="warning" @click="dashang11(2)">良<i class="el-icon-sunrise-1 el-icon--right"></i></el-button>
      <el-button type="danger" @click="dashang11(3)">差<i class="el-icon-heavy-rain el-icon--right"></i></el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  name: 'wotijiao',
  data(){
    return{
      tableData: [],
      dashang:[],
    }
  },
  methods:{
    xiangqing:function (row,column,event,cell,id) {
      let article_id;
      article_id=row.id?row.id:row;
      this.$router.push({path:`/article_article/${article_id}`});
    },//进入详情页方法
    deletework:function (id,index) {
     this.deletework1({id,index});
    },/*删除方法*/
     handleSelectionChange(selection){
         this.dashang=[];
        let _this=this;
          selection.forEach(function (value,index,arr) {
              _this.dashang.push(value.id);
          })
         //   这个方法是把全选的id  存在数组里面,然后后续打赏的时候都提交过去   后台批量打赏
      },
      wotijiaolist(){
        let _this=this;
        this.$axios.post('wotijiaolist').then(function (success) {
            _this.tableData=success.data;
        })
      },//渲染列表
      dashang11(pj){
        let _this=this;
        this.$axios.post('dashang',`id=${_this.dashang}&pj=${pj}`).then(function (success) {
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
      handleCurrentChange:function(val){
          let _this=this;
          this.$axios.post("fanye",`sum=${--val}&dqzt=3`).then(function (success) {
              _this.tableData=success.data;
          });
      },//翻页
  },
    sockets:{
          csserver:function(data){
            this.$store.commit('update_newwork',false);
            this.$store.commit('update_wjzid',data.id);
          }
        },
    mounted() {
        this.$store.commit('menusum');//改变左侧菜单显示个数
        this.$store.commit('menudefaultzt','1-4');//改变左侧激活状态
        this.wotijiaolist();//获取当前列表
    },
}
</script>

<style scoped>
  .expanded{cursor:pointer;}
  .el-table__footer-wrapper, .el-table__header-wrapper{cursor: pointer;}
  .el-table .cell{
    text-align:center;}
  .el-badge >>> .el-badge__content{top:5px;}
</style>
