<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{cardName}}</span>
        <el-button style="float: right; padding: 3px 0" type="text">{{buttonName}}</el-button>
      </div>
      <div class="text item">
        <!-- 列表内容 -->
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    cardName: {
      type:String,
      default:'卡片名称'
    },
    buttonName: {
      type: String,
      default:'按钮名称'
    }
  },

}
</script>

<style lang="less" scoped>


.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  // width: 480px;
}

</style>