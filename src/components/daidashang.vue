<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      default-expand-all
      @cell-dblclick="xiangqing"
      @selection-change="handleSelectionChange"
      class="table_tbody_tr">
      <el-table-column type="selection" width="55"></el-table-column>
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
      <el-table-column prop="zhuangtai" label="当前状态" sortable>
        <template slot-scope="scope" >
          <el-tag type="warning">{{scope.row.zhuangtai}}</el-tag>
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
    <el-button-group>
      <el-button type="success">优<i class="el-icon-sunny el-icon--right"></i></el-button>
      <el-button type="warning">良<i class="el-icon-sunrise-1 el-icon--right"></i></el-button>
      <el-button type="danger">差<i class="el-icon-heavy-rain el-icon--right"></i></el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  name: 'daidashang',
  data(){
    return{
        total:17,
      tableData: [
        {
          id: 3,
          date: '2016-05-01',
          name: 'mobile.89906662.com',
          liexing:"网站修改",
          xiadanren:"陈立文",
          zhuangtai:"待打赏",
          jdrq: '2019-08-05 11:30',
          wcrq: '2019-08-05 14:04',
        },
        {
          id: 4,
          date: '2016-05-01',
          name: 'mobile.89906662.com',
          liexing:"网站修改",
          xiadanren:"陈立文",
          zhuangtai:"待打赏",
          jdrq: '2019-08-05 11:30',
          wcrq: '2019-08-05 14:04',
        },
      ],
      dashang:[],
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
    },
     handleSelectionChange(selection){
        let _this=this;
          selection.forEach(function (value,index,arr) {
              _this.dashang.push(value.id);
          })
         //   这个方法是把全选的id  存在数组里面,然后后续打赏的时候都提交过去   后台批量打赏
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
