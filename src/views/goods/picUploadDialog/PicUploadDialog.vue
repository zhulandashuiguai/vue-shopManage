<template>
  <div>
    <!-- 
      ref="upload" //获取组件dom
      action="x链接"// 必选参数，上传的地址 
      on-preview//点击文件列表中已上传的文件时的钩子
      on-remove	//文件列表移除文件时的钩子
      file-list	//上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
      auto-upload//	是否在选取文件后立即进行上传function(file, fileList)
      on-success	文件上传成功时的钩子function(response, file, fileList)
      on-error	文件上传失败时的钩子function(err, file, fileList)
      on-progress	文件上传时的钩子 function(event, file, fileList)
      -->
    <el-upload class="upload-demo" ref="upload" :action="url" :on-preview="handlePreview" :on-remove="handleRemove"
               :file-list="fileList" :auto-upload="false" :on-success="successUpload">

      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-upload>
  </div>
</template> 
 
<script>
// 导入上传图片接口的地址
import base from '@/api/base.js'

export default { 
  data() {
    return {
      //上传图片文件的服务区地址
      url:base.uploadUrl,
      // [{name:'xxx.jpg',url:'xxx'}]
      fileList: []
    };
  },
  methods: {
    // 上传到服务器
    submitUpload() {
      // 组件自带的submit方法
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 上传成功的函数
    successUpload(response,file,fileList) {
      // response是后台返回的数据(res.send)
        console.log('数据',response,file,fileList);
      this.$message({
        message: '图片上传成功',
        type: 'success'
      });
        // 上传成功后把图片的路径接口传给父组件
      let imgUrl = base.host + '/' + response.url.slice(7)
        this.$emit('sendImg',imgUrl)
    }
  }
}
</script>

<style>

</style>