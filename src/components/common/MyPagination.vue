<template>
  <div class="pag">
    <el-pagination background layout="total,prev, pager, next,jumper" :total="total" :page-size="pageSize"
              @current-change="pageChange" :current-page.sync="page_current">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data(){
    return {
      page_current:this.currentPage
    }
  },
  props: {
    total: {
      type: Number,
      default:100
    },
    pageSize: {
      type: Number,
      default:10
    },
    currentPage: {
      type: Number,
      default:1
    }
  },
  methods: {
    pageChange(page) { 
      // 事件传出去
      this.$emit('pageChange',page)
    }
  },
}
</script>

<style lang="less" scoped>


.pag{
  text-align: center;
  margin: 20px;
}

</style>