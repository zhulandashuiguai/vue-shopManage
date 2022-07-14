<template>
  <div>
    <!-- 
      title ： 弹框标题
      :visible.sync="dialogVisible"  控制显示与隐藏 
     -->
    <!-- 外弹框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="60%" :before-close="resetForm">
      <!-- 内容区域 -->
      <el-form :model="goodsForm" :rules="rules" ref="goodsForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类目选择" prop="category">
          <el-button @click="innerDialogVisible=true" type="primary">类目选择</el-button>
          {{this.goodsForm.category }}
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

        <el-form-item label="发布时间">
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
          <el-button type="primary" @click="innerDialogPic=true">上传图片</el-button>
          <img :src="goodsForm.image" style="margin-left:10px" height="100px" alt="">
        </el-form-item>
        <el-form-item label="商品描述" prop="descs">
          <!-- 富文本编辑组件 -->
          <my-editor ref="myEditorRef" @sendEditor="sendEditor"></my-editor>
        </el-form-item>
        <!-- 
        <el-form-item>
          <el-button type="primary" @click="submitForm('goodsForm')">确定</el-button>
          <el-button @click="resetForm('goodsForm')">重置</el-button>
        </el-form-item> -->
      </el-form>
      <!-- GoodsDialog的弹框底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm()">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
      <!-- 1.类目选择内弹框1 -->
      <el-dialog class="innerdialog" width="40%" title="类目选择" :visible.sync="innerDialogVisible" append-to-body>
        <TreeDialog @sendTreeData="sendTreeData"></TreeDialog>
        <!-- 底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerDialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="showTreeData">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 1.类目选择内弹框1 end -->
      <!-- 2.上传图片内弹框 -->
      <el-dialog class="innerdialog" width="40%" title="上传图片" :visible.sync="innerDialogPic" append-to-body>
        <PicUploadDialog @sendImg="sendImg"></PicUploadDialog>
        <!-- 底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerDialogPic=false">取 消</el-button>
          <el-button type="primary" @click="showImg">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 2.end -->

    </el-dialog>
  </div>
</template>

<script>
// 内弹框Tree组件
import TreeDialog from "@/views/goods/treeDialog/TreeDialog.vue"
// 图片上传内弹框
import PicUploadDialog from '@/views/goods/picUploadDialog/PicUploadDialog.vue'
// 富文本编辑组件
import MyEditor from "@/views/goods/goodsDialog/wangEditor/MyEditor.vue"

export default {
  data() {
    return {
      
      // imgUrl：中间变量，存放子组件发送过来的图片链接
      imgUrl:'',
      // 控制图片上传内弹框的显示隐藏
      innerDialogPic: false,
      // 保存tree控件点击节点传过来的数据的中间变量
      treeclickData: '',
      dialogVisible:false,//控制外弹框显示隐藏
      innerDialogVisible: false,//内弹框显示控制
      goodsForm: {//表单容器-对象
      id:'',
        title: '',//商品名称 
        price: '',//商品价格
        num: '',//商品数量
        sellPoint: '',//商品卖点
        image: '',//商品图片
        category: '',//商品类目
        descs: '',//商品描述
        date1: '',//商品时间 
        date2: '',//商品时间 
        cid:'',//类目的id
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
          { min: 1, message: '数量至少为1', trigger: 'blur' }
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
  props: {
    title:''
  },
  watch: {
    goodsForm(newVal) {
      // console.log('监听到goodsForm变化');
      // 使用this.nextTick(cb) 函数可以让函数读到最新的dom结构
      this.$nextTick(() => { 
        //    editor.txt.html('<p>用 JS 设置的内容</p>') // 重新设置编辑器内容
        this.$refs.myEditorRef.editor.txt.html(this.goodsForm.descs)
      })
    }
  }
  ,
  methods: {
    // MyEditor传过来的商品描述文本信息
    sendEditor(val) {
      this.goodsForm.descs=val
    },
    // showImg 点击确定显示图片地址
    showImg() { 
      this.innerDialogPic = false
      this.goodsForm.image=this.imgUrl
    },
    // 接收图片上传子组件传过来的图片链接并显示
    sendImg(val) {
      // console.log('图片地址', val);
      this.imgUrl=val
     },
    // 点击tree组件确认后把数据显示在dialog的方框里
    showTreeData() { 
      // 先关闭内嵌tree组件弹框
      this.innerDialogVisible = false
      // 把数据显示在表单里
      this.goodsForm.category = this.treeClickData
      
    }
    ,
    // tree控件组件传来的节点点击数据
    sendTreeData(data) { 
      console.log('父组件', data);
      this.treeClickData = data.name
      this.goodsForm.cid=data.cid
    },  
    // 
    cansel() {
      this.$emit('cancel')
    },
    submitForm() {
      this.$refs.goodsForm.validate((valid) => {
        if (valid) { 
          // alert('submit!');
          // console.log('输入的信息',this.goodsForm)
          // 验证成功后请求接口添加商品到数据库
          //  * addGoods参数： title cid  category sellPoint price num descs paramsInfo image
          // 解构赋值
          let { title, cid, category, sellPoint, price, num, descs, image,id } = this.goodsForm
          // 要判断确定按钮是添加商品还是编辑商品
          if (this.title == '添加商品') { 
            // 添加商品的接口
            this.$api.addGoods({
              title, cid, category, sellPoint, price, num, descs, image
            }).then(res => {
              // 添加成功
              if (res.data.status == 200) {
                // 1.成功就关闭弹框
                // this.dialogVisible = false
                // 2.请求第一页数据,操作父组件
                this.$parent.getGoods(1)
                // 3.弹框提示
                this.$message({
                  message: '添加商品成功',
                  type: 'success'
                });
                // // 4.重置表单两种方法，1.使用elementui的重置方法  2.手动初始化goodsForm的数据
                // this.$refs.goodsForm.resetFields();//使用这个方法，表单要配prop属性才可以，wang编译清不掉
                // // 手动清除wangEditor的内容 editor.txt.clear()
                // this.$refs.myEditorRef.editor.txt.clear()
                this.resetForm()
              } else {
                this.$message.error('添加商品失败');
              }
              // console.log('添加商品--- ',res.data);
            })

          }else if(this.title == '编辑商品'){ 
            // 请求编辑商品的接口
            // console.log('编辑商品');
            this.$api.updateGoods({
              id,
              title, cid, category, sellPoint, price, num, descs, image
            }).then(res => {
              console.log(res.data);
              if (res.data.status == 200) {
                  // 修改成功
                // 2.请求第一页数据,操作父组件
                this.$parent.getGoods(1)
                // 3.弹框提示
                this.$message({
                  message: '修改商品成功',
                  type: 'success'
                });
                this.resetForm()
              } else { 
                // 修改失败
                this.$message.error('修改商品失败');
              }
             })
          }
     } else {
          this.$message.error('表单未按规则填写');
          // console.log('error submit!!');
          return false;
        }
      });
    },
    // 封装重置表单的方法
    resetForm() {
      // 关闭弹框   
      this.dialogVisible = false
      // 4.重置表单两种方法，1.使用elementui的重置方法(有问题)  2.手动初始化goodsForm的数据
      // this.$refs.goodsForm.resetFields();//使用这个方法，表单要配prop属性才可以，wang编译清不掉
      // 手动初始化goodsForm
      this.goodsForm = {}
      // 手动清除wangEditor的内容 editor.txt.clear()
      this.$refs.myEditorRef.editor.txt.clear()
    }
  },
  components: {
    TreeDialog,
    PicUploadDialog,
    MyEditor 
  },
}
</script>

<style scoped lang="less">

.line {
  text-align: center;
}

.innerdialog{
  z-index: 999;
}
</style>