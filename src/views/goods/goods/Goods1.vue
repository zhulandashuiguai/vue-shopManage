<template>
  <div class="goods">
    <!-- 搜索区域 -->
    <div class="header">
      <!-- @change	仅在输入框失去焦点或用户按下回车时触发 -->
      <el-input @change="searchInput" v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="searchInput ">查询</el-button>
      <el-button type="primary">
        <router-link to="/goods/addgoods">页面添加</router-link>
      </el-button>
      <el-button type="primary" @click="showDialog">弹框添加</el-button>
    </div>
    <!-- 表格区域展示视图数据 -->
    <div class="wrapper">
      <el-table :data="tableData" border style="width: 100%" is-scrolling-right>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="商品ID" width="180">
        </el-table-column>
        <el-table-column prop="title" label="商品名称" width="180" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="180" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="num" label="商品数量" width="180" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="category" label="规格类目" width="180" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="image" label="商品图片" width="180" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="sellPoint" label="商品卖点" width="180" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="descs" label="商品描述" width="180" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <!-- index,row序号和行内容 -->
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <!-- 分页 total是数据总条数  -->
    <MyPagination :total="total" :pageSize="pageSize" @pageChange="pageChange" :currentPage1="currentPage"></MyPagination>
    <!-- 弹框组件 -->
    <GoodsDialog ref="DialogRef" @cancel="cancel" :title="title"></GoodsDialog>
  </div>
</template>

<script>
// 分页
import MyPagination from '@/components/common/MyPagination.vue';
// 弹框
import GoodsDialog from '@/views/goods/goodsDialog/GoodsDialog.vue';


export default {
  data() {
    return {
      input: '',
      tableData: [],
      total: 0,
      pageSize: 0,
      type: 1,
      list: [],
      // dialogVisible: false,
      currentPage: 1,//选中的高亮页码
      // 弹框标题
      title:'添加商品'
    }
  },
  methods: {
    // // 点击展示弹框,添加商品
    showDialog(index, row) {
      this.$refs.DialogRef.goodsForm = {}
      this.$refs.DialogRef.dialogVisible = true
      this.title='添加商品'
    },
    // 编辑操作
    handleEdit(index, row) {
      // console.log(index, row);
      // 点击编辑，把title弹框标题改成编辑商品,显示弹框
      this.title='编辑商品'
      this.$refs.DialogRef.dialogVisible = true
      // 直接操作组件赋值
      this.$refs.DialogRef.goodsForm = row
    
    }, 
    // 删除操作
    handleDelete(index, row) {
      console.log('删除--', index, row);
      this.$confirm('此操作将永久删除该商品数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定,请求接口删除商品{id:id}
        this.$api.deleteGoods({ id: row.id }).then(res => { 
          // console.log('删除==',res.data);
          if (res.data.status == 200) { 
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
          // 视图刷新
          this.getGoods(1)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 获取商品列表
    getGoods(page) { 
      this.$api.getGoodsList({ page: page }).then(res => {
        // console.log(res.data);
        if (res.data.status == 200) {
          this.tableData = res.data.data
          this.total = res.data.total
          this.pageSize = res.data.pageSize
        }
      })
    },
    // 搜索查询数据
    searchInput(val) {
      // console.log('123',val);
      if (!val.trim()) { 
        this.getGoods(1)
        return;
      }
      // 请求查询接口
      this.$api.getSearch({ search: val }).then(res => { 
        // console.log(res);
        // 判断是否有数据
        // 有数据 
        if (res.data.status == 200) {
          this.currentPage = 1

          // 有数据就更新tableDate
          // this.tableData = res.data.result
        
          this.list = res.data.result;//存放所有的搜索结果，一遍分页展示 
         // 假设需要分页
          this.total = res.data.result.length;
          this.pageSize = 3;
          // this.tableData = res.data.result
          this.tableData = this.list.slice(0, 3)
          this.type = 2;//z
        }
        // 没有数据
        else { 
          // 只需要tabledate的数据为空就行
          this.tableData = [];
          this.total = 0;
          this.pageSize = 0;
          this.type = 1;
        }
      })
    },
    // 页码改变 
    pageChange(page) { 
      // 高亮页码
      this.currentPage=page
      if (this.type == 1) {//1是默认的商品分页
        this.getGoods(page)
      } else {//其他的为搜索结果分页 
      // 点击下一页切其他结果，页码1 2 3 ，对应展示得数据是，[0 1 2 3 4 5 6],0-3 3-6 6-9
        // console.log('搜索分页');
        this.tableData = this.list.slice(page*3-3, page*3)
      }
    },
    // 弹框方式添加商品 
    addGoods() { 
      this.dialogVisible=true
    },
    cancel() {
      this.dialogVisible=false
    }
  },
  // 
  created() {
    // 商品列表
    this.getGoods(1)
  },
  components: {
    MyPagination,
    GoodsDialog,
   
  }
}
</script>

<style scoped lang="less">
.goods{
  margin: 20px;
}

.header{
  display: flex;
  .el-input{
    width: 300px;
    // margin-right: 20px;
  }
  button{
    margin-left: 20px;
  }
}
a{
  text-decoration: none;
}

.wrapper{
  margin: 20px 0;
}
.el-table td.is-center,
.el-table th.is-center {
  text-align: center;
}
</style>