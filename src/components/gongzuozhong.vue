<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      default-expand-all
      @cell-dblclick="xiangqing"
      height="1000px"
      class="table_tbody_tr">
      <el-table-column
        prop="id"
        label="id"
      width="60">
      </el-table-column>
      <el-table-column
        prop="ym"
        label="域名"
        min-width="100"
        sortable>
      </el-table-column>
      <el-table-column label="工单类型" sortable min-width="50">
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
        prop="jdsj"
        label="接单日期"
        min-width="80"
        >
        <template slot-scope="scope">
          {{scope.row.jdsj | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="xdr"
        label="下单人"
        class-name="callclass"
        min-width="60"
        sortable>
      </el-table-column>
      <el-table-column
        prop="scope"
        label="当前状态"
        min-width="70"
        sortable>
            <template slot-scope="scope">
              <el-badge is-dot :hidden="scope.row.fileurl==''">
                <el-tag type="success" v-if="scope.row.dqzt==2"  round>工作中</el-tag>
              </el-badge>
            </template>
      </el-table-column>
      <el-table-column align="center" width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="wancheng(scope.row.id)">完成</el-button>
          <el-button size="mini" type="info" @click="xiangqing(scope.row.id)">查看</el-button>
          <el-button size="mini" type="danger" @click="deletework(scope.row.id,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="11"
      :total="this.$store.state.gongdan.gongzuozhong"
      layout="total,prev,pager,next"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'gongzuozhong',
  data(){
    return{
      tableData: [
      ],
    }
  },
  methods:{
    xiangqing:function (row,column,event,cell,id) {
      let article_id;
      article_id=row.id?row.id:row;
      this.$router.push({path:`/article_article/${article_id}`});
    },
    deletework:function (id,index) {
       this.deletework1({id,index});
    },
      gongzuozhonglist(){
        let _this=this;
          this.$axios.post("gongzuozhong").then(function (success) {
              _this.tableData=success.data;
          })
      },
      wancheng(id){
        let _this=this;
        this.$axios.post('wanchen',`id=${id}`).then(function (success) {
            if (success.data==1){
                _this.$message({
                    type:"success",
                    message:"完成工单"
                })
                _this.$store.commit('menusum');//刷新左侧个数
                _this.$router.push({path:'/daidashang'})
            }
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
            this.$store.commit('menusum');
            this.gongzuozhonglist();
        this.$store.commit('menudefaultzt','1-2');//改变左侧激活状态
    },
}
</script>

<style scoped>
  .expanded{cursor:pointer;}
  .el-table__footer-wrapper, .el-table__header-wrapper{cursor: pointer;}
  .el-table .cell{
    text-align:center;}
    .cellname{text-align:center;}
  .el-badge >>> .el-badge__content{top:5px;}
</style>
