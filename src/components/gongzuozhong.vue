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
      width="40">
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
        prop="jdrq"
        label="接单日期"
        sortable>
      </el-table-column>
      <el-table-column
        prop="xiadanren"
        label="下单人"
        sortable>
      </el-table-column>
      <el-table-column prop="zhuangtai" label="当前状态" sortable>
        <template slot-scope="scope" >
          <el-tag type="success">{{scope.row.zhuangtai}}</el-tag>
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
  name: 'gongzuozhong',
  data(){
    return{
      total:20,
      tableData: [
        {
          id: 3,
          date: '2016-05-01',
          name: 'mobile.89906662.com',
          liexing:"网站修改",
          xiadanren:"陈立文",
          zhuangtai:"工作中",
          jdrq: '2019-08-05 11:30',
          wcrq: '2019-08-05 14:04',
        },
        {
          id: 4,
          date: '2016-05-01',
          name: 'mobile.89906662.com',
          liexing:"网站修改",
          xiadanren:"陈立文",
          zhuangtai:"工作中",
          jdrq: '2019-08-05 11:30',
          wcrq: '2019-08-05 14:04',
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
      //删除工单 用的相应id  axios 提交删除
    }
  },
    mounted() {
            this.$store.commit('menusum');
    }
}
</script>

<style scoped>
  .expanded{cursor:pointer;}
  .el-table__footer-wrapper, .el-table__header-wrapper{cursor: pointer;}
  .el-table .cell{
    text-align:center;}
</style>
