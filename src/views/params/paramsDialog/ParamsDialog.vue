<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <!-- 弹框内容   -->
      <!-- 树形控件 -->
      <div class="tree">
        <TreeDialog @sendTreeData="treeClick"></TreeDialog>
      </div>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGroup" :disabled="isDisabled">确定并添加分组</el-button>
      </span>
      <!-- 内层的dialog -->
      <el-dialog width="50%" title="商品规格参数配置" :visible.sync="innerVisible" append-to-body>
        <!-- 内弹框内容 -->
        <div>当前选中的商品:{{ treeNodeData.name }}</div>
        <el-button class="button" type="primary" @click="addDomain">新增规格列表</el-button>
        <hr>
        <!-- 动态表单 -->
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
          <!-- domains:[{value:'',title:'',children:[]},{},{}] -->
          <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="domain.title" :key="index"
                        :prop="domain.title" :rules="{required: true,message: '内容不能为空', trigger: 'blur'}">
            <div class="formItem">
              <el-input v-model="domain.title"></el-input>
              <el-button @click.prevent="addChildDomain(index)">添加子组</el-button>
              <el-button @click.prevent="removeDomain(domain)">删除</el-button>
            </div>
            <!-- 内层children -->
           
              <el-form-item v-for="(ele, i) in domain.children" :label="ele.title" :key="i" :prop="ele.title"
                            :rules="{required: true,message: '内容不能为空', trigger: 'blur'}">
                <div class="formItem">
                  <el-input v-model="ele.title" style="margin-top:5px;"></el-input>
                  <el-button @click.prevent="removeChildDomain(index,i)">删除</el-button>
                </div>
              </el-form-item>
            

            <!-- 内层end -->
          </el-form-item>
        </el-form>
        <!-- 底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
          <el-button type="primary" @click="resetForm('dynamicValidateForm')">重置</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import TreeDialog from '@/views/goods/treeDialog/TreeDialog.vue';
export default {
  data() {  
    return {
      dialogVisible: false,
      innerVisible: false,
      isDisabled: true,//默认不可点击
      // 树形控件节点数据
      treeNodeData: {},
      dynamicValidateForm: {//动态表单
          domains: [],
        }
    };
  },
  methods: {
    // 添加子组
    addChildDomain(index) { 
      this.dynamicValidateForm.domains[index].children.push({
        value: '',
        title:''
      })
    },

    // 内弹框确定
    innerConfirm() {
    }
    ,
    addGroup() { 
      console.log('222');
      this.innerVisible=true
    }
    ,
    treeClick(data) { 
      console.log(data);
      this.isDisabled = false
      this.treeNodeData=data
    }
    ,
    handleClose() {
      this.dialogVisible = false
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit', this.dynamicValidateForm);
          // 验证成功请求接口添加参数 参数：itemCatId,content,specsName
          this.$api.addParams({
            itemCatId: this.treeNodeData.cid,
            content:JSON.stringify(this.dynamicValidateForm.domains),
            specsName: this.treeNodeData.name,
          }).then(res => {
            console.log(res.data);
            if (res.status == 200) {
              // 成功之后隐藏弹框  更新规格列表
              this.innerVisible = false
              this.dialogVisible = false
              // 清空表单数据
              this.dynamicValidateForm.domains = []
              this.isDisabled=true
              // 更新规格列表数据
              this.$parent.getParamsList(1);
              this.$message({
                message: '添加成功!',
                type: 'success'
              });
             }
          })
        } else {
          console.log('error submit!!');
          return false;
        } 
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dynamicValidateForm.domains=[]
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    // 删除子组
    removeChildDomain(index1,i) { 
        this.dynamicValidateForm.domains[index1].children.splice(i, 1)
    },
    // 新增列表，增加大组
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        title: '',
        children:[]
      });
    }
  },
  components: {
    TreeDialog
  }
}
</script>

<style scoped lang="less">


.button{
  margin: 10px 0;
}

hr {
  margin-bottom: 10px;
}
.formItem{
  display: flex;
  button{
    margin-left: 10px;
  }
}
</style>