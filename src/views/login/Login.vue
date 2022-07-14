<template>
  <div>
    <div class="login-box">
      <h3 style="text-align:center">登录界面</h3>
      <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input type="txt" v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { validator: validateUser, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('校验通过');
          console.log('校验通过',this.loginForm);
          // 校验通过则请求登录接口实现登录
          let {username,password} = this.loginForm
          this.$api.login({
            username,password
          }).then(res=>{
            console.log('登录---------',res.data)
            if (res.data.status == 200) {
              // 密码账号都正确
              // console.log(jwtDecode(res.data.data))
              // 1.登录成功后存储登录的信息 2.跳转网页  3.顶部区域显示用户信息 4.持久化
              let obj = {
                user: jwtDecode(res.data.data).username,
                token: res.data.data
              }
              this.$store.commit('setUser', obj)
              // 存储本地
              localStorage.setItem('user',JSON.stringify(obj))
              // 跳转
              this.$router.push('/')
            }else{
              // 账号或者密码错误
            this.$message.error('账号密码错误');
            }
          })

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

<style lang="less" scoped>


.login-box{
  padding:20px;
  width: 600px;
  height:300px;
  margin:150px auto;
  border-radius: 10px;
  border: 2px solid rgb(188, 228, 255);
  background:rgba(152, 220, 247, 0.5);
}
.demo-ruleForm{
  margin-top:20px;
  margin-right: 40px;
}
</style>