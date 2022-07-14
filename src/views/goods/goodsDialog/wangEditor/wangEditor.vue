<template>
    <div style="border: 1px solid #ccc;">
      <!-- <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor style="height: 500px; overflow-y: hidden;" v-model="html" :defaultConfig="editorConfig" :mode="mode"
              @onCreated="onCreated" /> -->
    </div>
</template>

<script>
export default {
}
</script>
// <script>
// import Vue from 'vue'
// import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// export default Vue.extend({
//   components: { Editor, Toolbar },
//   data() {
//     return {
//       editor: null,
//       html: '<p>hello</p>',
//       toolbarConfig: {},
//       editorConfig: { placeholder: '请输入内容...' },
//       mode: 'default',
      
//     }
//   },
//   methods: {
//     onCreated(editor) {
//       this.editor = Object.seal(editor) 
//     },
//   },
//   mounted() {
//     setTimeout(() => {
//       this.html = '<p></p>'
//     }, 1500)
//   },
//   beforeDestroy() {
//     const editor = this.editor
//     if (editor == null) return
//     editor.destroy() 
//   }
// })
// </script>

<script>
import { IToolbarConfig, createToolbar } from '@wangeditor/editor'

const toolbarConfig = {
    /* 工具栏配置 */
}

// 创建工具栏
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: toolbarConfig,
  mode: 'default'
})
</script>
<style>

</style>
<style src="@wangeditor/editor/dist/css/style.css">
</style>