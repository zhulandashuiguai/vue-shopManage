<template>
  <div class="layout">
    <!-- 左侧导航区域 -->
    <Nav class="nav" :isCollapse="isCollapse"></Nav>
    <!-- 右侧内容区域 -->
    <Content class="content" :class="{isActive:isCollapse}" @changeMenu="changeMenu" :isCollapse="isCollapse"></Content>
  </div>
</template>

<script>
import Nav from "@/views/layout/Nav.vue"
import Content from "@/views/layout/Content.vue"

export default {
  data() { 
    return {
      isCollapse:false
    }
  }
  ,
  methods: {
    changeMenu() { 
      this.isCollapse=!this.isCollapse
    }
  }
,
  components: {
    Nav,
    Content
  },
}
</script>
 
<style lang="less" scoped>

.layout{
.nav{
  // 固定宽度去掉才能实现一起收缩
  // width: 200px;
  // min-height: 500px;
  background-color: #304156;
  position: fixed;
  top: 0;
  bottom: 0;
}
.content{
  margin-left: 200px;
  // background-color: blue;
}
}

.isActive{
  margin-left: 64px!important;
}

</style> 