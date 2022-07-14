<template>
  <div id="container">
  </div>
</template>

<script>
import E from 'wangeditor'


export default {
data() {
  return {
    editor:''
  }
},
  mounted() {
    // 为了以后方便操作，把editor赋值给外面的变量，不然生命周期里不好操作
    this.editor = new E('#container')
    // 配置 onchange 回调函数
    this.editor.config.onchange =  (newHtml)=> {
      // console.log("change 之后最新的 html", newHtml);
      // 把输入的内容传出去给父组件
      this.$emit('sendEditor',newHtml)
    };
    // 配置触发 onchange 的时间频率，默认为 200ms
    this.editor.config.onchangeTimeout = 500; // 修改为 500ms
    // 默认情况下，显示所有菜单
    this.editor.config.menus = [
      'head',
      'bold',
      'fontSize',
      'fontName',
      'italic',
      'underline',
      'strikeThrough',
      'indent',
      'lineHeight',
      'foreColor',
      'backColor',
      // 'link',
      // 'list',
      'todo',
      // 'justify',
      'quote',
      // 'emoticon',
      // 'image',
      // 'video',
      // 'table',
      // 'code',
      'splitLine',
      'undo',
      'redo',
    ]

  // 取消自动focus
    // 取消自动 focus
    this.editor.config.focus = false
    this.editor.create()
  },
}
</script>

<style>

</style>