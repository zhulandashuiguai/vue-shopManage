<template>
  <div class="Content">
    <div class="header">
      <!-- 顶部左边区域 -->
      <i v-if="!isCollapse" @click="zuosuojin" class="iconfont icon-zuosuojin"></i>
      <i v-else @click="zuosuojin" class="iconfont icon-yousuojin"></i>
      <div class="bread">
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:''}"><a href="/">活动管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item> -->
          <el-breadcrumb-item v-for="item in breadItemList" :key="item.index">
            <router-link :to="item.path">
              {{item.meta.title}}
            </router-link>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 顶部右边区域 -->
      <div class="header-right">
        <!-- <div>
          <el-dropdown @command="dropDownClick">
            <span class="el-dropdown-link">
              菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="选项1">首页</el-dropdown-item>
              <el-dropdown-item command="选项2">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div> -->
        <div class="user">
          <div class="welcome">
            欢迎{{$store.state.userinfo.user}}!
          </div>
          <div class="loginOut" @click="loginOut">
            <span>退出登录</span>
            <!-- <i class="iconfont icon-tuichu3"></i> -->
            <!-- <img class="tuichu" src="@/assets/images/tuichu.png" alt=""> -->
            <i class="el-icon-switch-button"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- 内容区域---路由出口 -->
    <div class="content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    isCollapse:false
  },
  computed: {
    breadItemList() { 
      // 过滤掉了没有name属性的
      let matched = this.$route.matched.filter(item => item.name)
      // const first = matched[0]
      // if (first.name !== 'home') {
        matched = [{ path: '/', meta: { title: '首页' } }].concat(matched)
      // }
      // console.log('matched',matched);
      return matched
    }
  }
  , 
methods: {
    zuosuojin() { 
      // 点击事件传给父组件
      // this.$bus.$emit('zuosuojin')
      this.$emit('changeMenu')
    },
    dropDownClick(val){
      console.log('点击事件',val)
  },
  loginOut() { 
    console.log('out');
    // 退出登录
    // 清空vuex数据
    this.$store.commit('clearUser')
    // 清空本地存储
    localStorage.removeItem('user')
    // 返回登录界面
    this.$router.push('/login')
  }
  },  
mounted() {
  // console.log(this.$route)
},
}
</script>

<style lang="less" scoped>



.welcome{
  margin-right: 20px;
}

.loginOut{
  cursor: pointer;
}
.el-icon-switch-button{
  margin-left: 5px;
  font-size: 25px;
  vertical-align: middle;
  margin-bottom: 4px;
}


.header{
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
 line-height: 50px;
  .iconfont{
    font-size: 30px;
    cursor: pointer;
    margin-right: 15px;
  }
  .bread{
    display: inline-block;
    margin-bottom: 2px;
  }
  .el-breadcrumb{
    font-size: 17px;
  }
}
.Content{
  background-color: #fff;
}

.header-right{
  float:right;
  display: flex;
  padding-right: 20px;
  .user{
    display: flex;
    padding-left: 20px;
    font-weight: 700;
  }
}

 .el-dropdown-link {
   cursor: pointer;
   color: black;
   font-size: 16px;
 }

 .el-icon-arrow-down {
   font-size: 12px;
 }
</style>