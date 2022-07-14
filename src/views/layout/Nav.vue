<template>
  <!-- 导航组件 -->
  <div>
    <!-- <ul>
      <li><router-link to="/">首页</router-link></li>
      <li><router-link to="/goods">商品管理</router-link></li>
      <li><router-link to="/params">规格参数</router-link></li>
      <li><router-link to="/advert">广告分类</router-link></li>
      <li><router-link to="/order">订单管理</router-link></li>
    </ul> -->
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#304156" text-color="#fff"
             active-text-color="#ffd04b" router :collapse="isCollapse" :collapse-transition="false">

      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!--商品管理1  -->
      <!-- <el-menu-item index="/goods">
        <i class="el-icon-document"></i>
        <span slot="title">商品管理</span>
   
      </el-menu-item> -->
      <!-- 商品管理2 -->
      <el-submenu index="/goods">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item index="/goods">
            <i class="el-icon-setting"></i>
            <span slot="title"> 商品管理</span>
          </el-menu-item>
          <el-menu-item index="/goods/addgoods">
            <i class="el-icon-setting"></i>
            <span slot="title"> 添加商品</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!--  -->
      <el-menu-item index="/params">
        <i class="el-icon-setting"></i>
        <span slot="title">规格参数</span>
      </el-menu-item>
      <el-menu-item index="/advert">
        <i class="el-icon-setting"></i>
        <span slot="title">广告分类</span>
      </el-menu-item>
      <!-- 带下拉菜单 -->
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item index="/order/orderlist">
            <i class="el-icon-setting"></i>
            <span slot="title"> 订单列表</span>
          </el-menu-item>
          <el-menu-item index="/order/orderback">
            <i class="el-icon-setting"></i>
            <span slot="title"> 退货管理</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/user">
        <i class="el-icon-setting"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    isCollapse: false,
  },
  mounted() {

  },
  data() { 
    return { 
      // isCollapse:false
    }
  }
}
</script>

<style scoped lang="less">




.el-menu{
  border-right:0;
  .is-active{
    // background-color: #054476!important;
    color:#409eff!important
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>