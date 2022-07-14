<template>
  <div class="params">
    <!-- 1.搜索框 -->
    <div class="header">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="searchParams">查询</el-button>
      <el-button type="primary" @click="addParams">添加</el-button>
    </div>
    <!-- 2.表格 -->
    <div class="table">
      <el-table :data="tableData" border style="width: 100%" class="el_table">
        <el-table-column prop="itemCatId" label="规格参数ID" width="150">
        </el-table-column>
        <el-table-column prop="id" label="类目ID" width="150">
        </el-table-column>
        <el-table-column prop="specsName" label="规格名称" width="150">
        </el-table-column>
        <el-table-column prop="paramData" label="规格参数" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 3.分页 -->
    <div>
      <MyPagination :total="total" :pageSize="pageSize" @pageChange="pageChange" :currentPage="currentPage"></MyPagination>
    </div>
    <!-- 4.弹框 -->
  <ParamsDialog ref="paramsDialogRef"></ParamsDialog>
  </div>
</template>

<script>
import MyPagination from '@/components/common/MyPagination.vue';
import ParamsDialog from '@/views/params/paramsDialog/ParamsDialog.vue'

export default {
data() {    
  return {
    input: '',
    // 表格数据
    tableData: [],
    total: 10,
    pageSize: 1,
    currentPage: 1,
    // 控制弹框显示隐藏
    
  }
  },
  methods: {
    // 添加
    addParams() { 
      this.$refs.paramsDialogRef.dialogVisible=true
    },
    // 查询
    searchParams() { 
      if (this.input.trim() == '') {
        this.getParamsList(1)
        this.$message({
          showClose: true,
          message: '请输入内容！',
          duration: 1500,
          type: 'warning'
        });
      } else { 
        this.$api.searchParams({ search: this.input }).then(res => { 
          console.log(res.data);
          // 判断搜索是否有数据
          if (res.data.result) {
            // 如果有 更新tableData
            this.currentPage = 1
            this.tableData = res.data.result
            this.total = res.data.result.length;
            this.pageSize = 8;
          } else { 
            // 没有数据
            this.total = 0
            this.tableData=[]
          }
        })
      }
    },
  // 获取列表数据
  getParamsList(page) { 
    this.$api.getParams({page:page}).then(res => { 
      // console.log(res);
      if (res.status == 200) {
        this.tableData = res.data.data
        // 获取分页的数据
        this.total = res.data.total
        this.pageSize=res.data.pageSize
      } else { 
      }
    })
  },
  handleEdit(index, row) {
    console.log(index, row);
  },
  handleDelete(index, row) {
    console.log(index, row);
    this.$api.deleteParams({ id:row.id }).then(res => { 
      // console.log(res.data);
      if (res.status == 200) { 
        this.$message({
          message: '删除成功!',
          type: 'success'
        });
        this.getParamsList(1)
      }
    })
  },
  pageChange(page) { 
    console.log(page);
    this.getParamsList(page)
  }
  },
  created() {
    this.getParamsList(1)
  },
  components: {
    MyPagination,
    ParamsDialog
  }
}
</script>

<style lang="less" scoped>


.params{
  padding: 20px;
}

.header{
  display: flex;
 
  .el-input{
    width: 400px!important;
    margin-right: 20px;
  }
}

.table{
  margin-top: 20px;
  .el_table{
    text-align: center;
  }
}
</style>