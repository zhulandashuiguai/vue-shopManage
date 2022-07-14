<template>
  <div>
    <div class="header">
      签约合同内容：
      <el-button type="primary" @click="open">查看合同</el-button>
      <UserPdfDialog ref="UserDialog"></UserPdfDialog>
    </div>
    <div class="content">
      <el-row type="flex" justify="space-around">
        <el-col :span="7">
          <!-- <div class="grid-content bg-purple"></div> -->
          <card buttonName="下载发票">
            <img src="@/assets/images/11.jpg" width="100%" alt="">
          </card>
        </el-col>
        <el-col :span="7">
          <card buttonName="下载不同源发票">
            <img src="@/assets/images/11.jpg" width="100%" alt="">

          </card>
        </el-col>
        <el-col :span="7">
          <card buttonName="下载本地发票">
            <img src="@/assets/images/11.jpg" width="100%" alt="">
          </card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import UserPdfDialog from './userPdfDialog/UserPdfDialog.vue'
import Card from './card/Card.vue'
export default {
  methods: {
    open() { 
      this.$refs.UserDialog.dialogVisible=true
    } 
  }
  ,
  components: {
    UserPdfDialog,
    Card
  }
}
</script>

<style scoped lang="less">



.header{
  height: 40px;
  width: 100%;
  padding: 20px;
  // background-color: blue;
  border: 1px solid #ccc;
  border-top: 0px solid #ccc;
}
.content{
  // display: flex;
  padding: 20px;
}
    .el-row {
      margin-bottom: 20px;
  
      &:last-child {
        margin-bottom: 0;
      }
    }
  
    .el-col {
      border-radius: 4px;
    }
  
    .bg-purple-dark {
      background: #99a9bf;
    }
  
    .bg-purple {
      background: #d3dce6;
    }
  
    .bg-purple-light {
      background: #e5e9f2;
    }
  
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
  
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }

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
          //  width: 480px;
         }
</style>