<template>
  <div>
    <el-dialog title="合同内容" :visible.sync="dialogVisible" width="70%">
      <!-- src属性：文件路径
            :page:显示的页码
            :rotate:旋转90的倍数
            @page-loaded Number
Triggers when a page is loaded. 

@num-pages Number 总页码
The sum of all pages from the given pdf. 获取当前页码
print()组件的打印方法
      -->
      <hr>
      <el-button @click="page--">上一页</el-button>
      <el-button @click="page++">下一页</el-button>
      <div>
        {{currentPage}} / {{pageCount}}
      </div>
      <el-button type="primary" @click="print" >打印合同</el-button>
      <pdf ref="myPdf" src="./sxt.pdf" :page="page" @num-pages="pageCount = $event" @page-loaded="currentPage = $event">
      </pdf>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  data() {
    return {
      dialogVisible: false,
      currentPage: 0,
      pageCount: 0,
      page:1
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    print() { 
      this.$refs.myPdf.print()
    }
  },
  components: {
    pdf 
  }
};
</script>

<style>

</style>