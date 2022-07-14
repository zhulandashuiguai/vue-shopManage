<template>
  <div>
    <!-- 
  :props="props"
      label	指定节点标签为节点对象的某个属性值
      children	指定子树为节点对象的某个属性值
      isLeaf	指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
      :load="loadNode"
      lazy：lazy	是否懒加载子节点，需与 load 方法结合使用
  show-checkbox//加复选框 
  accordion：控制只展开一个节点
  -->
    <el-tree accordion :props="props" :load="loadNode" lazy @node-click="nodeClick">
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: 'name',//字段名，按照给出的格式，匹配名字[{name:'xxx'}],表示匹配数组里对象的name属性
        children: 'zones',
        isLeaf: 'leaf'
      },
    };
  },
  methods: {
    // 点击node把数据传给父组件
    nodeClick(data) { 
      // console.log(data);
      this.$emit('sendTreeData',data)
    },
    // 组件自带的事件
    loadNode(node, resolve) {//resolve返回结果
      if (node.level === 0) {//0表示一级菜单，1表示二级菜单，类推
      // 获取第一层的tree数据
        this.$api.getSelectCategory().then(res => { 
          // console.log(res);
          if (res.status == 200) {
          return resolve(res.data.result) 
          }
        })
        // return resolve([{ name: '一级菜单1' }, { name: '一级菜单2' }]);
      } 
      if (node.level >= 1) {
        //继续请求当前点击tree下面的数据，点击node节点时node会记录当前节点的信息
        this.$api.getSelectCategory({
          id:node.data.cid
        }).then(res => { 
          // console.log('二级tree', res);
          if (res.data.status == 200) {
            return resolve(res.data.result);
          } else { 
            // 没有下一级菜单就返回空数组
            return resolve([]);
          }
        })
        // return resolve([{name:'二级菜单 '}]);
      }
    // 下面的setTimeOut不要
    }
  }
}
</script>

<style>

</style>