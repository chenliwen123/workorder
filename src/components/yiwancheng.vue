<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      default-expand-all
      @cell-dblclick="xiangqing"
      class="table_tbody_tr">
      <el-table-column
        prop="id"
        width="40"
        label="id">
      </el-table-column>
      <el-table-column
        prop="name"
        label="域名"
        sortable>
      </el-table-column>
      <el-table-column
        prop="liexing"
        label="工单类型"
        sortable>
      </el-table-column>
      <el-table-column
        prop="date"
        label="下单日期"
        sortable>
      </el-table-column>
      <el-table-column
        prop="jdrq"
        label="接单日期"
        sortable>
      </el-table-column>
      <el-table-column
        prop="wcrq"
        label="完成日期"
        sortable>
      </el-table-column>
      <el-table-column
        prop="xiadanren"
        label="下单人"
        sortable>
      </el-table-column>
      <el-table-column prop="zhuangtai" label="当前状态">
        <template slot-scope="scope" >
          <el-tag type="success">{{scope.row.zhuangtai}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="dashang" label="打赏">
        <template slot-scope="scope">
          {{scope.row.dashang}}分
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header">
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="xiangqing(scope.row.id)">查看</el-button>
          <el-button size="mini" type="danger" @click="deletework(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
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
  name: 'yiwancheng',
  data(){
    return{
      total:16,
      tableData: [
        {
          id: 3,
          date: '2016-05-01',
          name: 'mobile.89906662.com',
          liexing:"网站修改",
          xiadanren:"陈立文",
          zhuangtai:"已完成",
          jdrq: '2019-08-05 11:30',
          wcrq: '2019-08-05 14:04',
          dashang:5,
        },
        {
          id: 4,
          date: '2016-05-01',
          name: 'mobile.89906662.com',
          liexing:"网站修改",
          xiadanren:"陈立文",
          zhuangtai:"已完成",
          jdrq: '2019-08-05 11:30',
          wcrq: '2019-08-05 14:04',
          dashang:5,
        },
      ],
    }
  },
  methods:{
    xiangqing:function (row,column,event,cell,id) {
      let article_id;
      article_id=row.id?row.id:row;
      this.$router.push({path:`/article_article/${article_id}`});
    },
    deletework:function (id) {
      console.log(id);
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
  .expanded{cursor:pointer;}
  .el-table__footer-wrapper, .el-table__header-wrapper{cursor: pointer;}
  .el-table .cell{
    text-align:center;}
</style>
