<template>
  <div class="myform">
    <el-form :model="goodsForm" :rules="rules" ref="goodsForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="类目选择" prop="category">
        <el-button type="primary">类目选择</el-button>
      </el-form-item>
      <el-form-item label="商品名称" prop="title">
        <el-input v-model="goodsForm.title"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="goodsForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="num">
        <el-input v-model="goodsForm.num"></el-input>
      </el-form-item>
    
      <el-form-item label="发布时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="goodsForm.date1" style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">----</el-col>  
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker placeholder="选择时间" v-model="goodsForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="商品卖点" prop="sellPoint">
        <el-input v-model="goodsForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="image">
        <el-button type="primary">上传图片</el-button>
      </el-form-item>
      <el-form-item label="商品描述" prop="descs">
        <textarea name="" id="" cols="140" rows="10"></textarea>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('goodsForm')">确定</el-button>
        <el-button @click="resetForm('goodsForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsForm: {//表单容器-对象
        title: '',//商品名称 
        price: '',//商品价格
        num: '',//商品数量
        sellPoint: '',//商品卖点
        image: '',//商品图片
        category: '',//商品类目
        descs: '',//商品描述
        date1: '',//商品时间 
        date2: '',//商品时间 
      },
      rules: {//校验规则
        title: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
          { min: 1,  message: '数量至少为1', trigger: 'blur' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped lang="less">


.myform{
  margin: 20px;
  padding-right: 10px;
}
.line{
  text-align: center;
}
</style>