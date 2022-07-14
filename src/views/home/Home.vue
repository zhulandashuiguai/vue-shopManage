<template>
  <div>
    <!-- <home-echarts></home-echarts> -->
    <div class="header">
      <el-row :gutter="20" type="flex" justify="space-between">
        <el-col :span="6" class="clo1" v-for="item in statisicList" :key="item.id">
          <div class="grid-content">
            <div class="layout">{{ item.title }}</div>
            <h1>{{ item.total }}</h1>
            <hr>
            <div class="layout">今日销售额:{{ item.current }}</div>
          </div>
        </el-col>
        <!-- <el-col :span="6" class="clo2">
        <div class="grid-content">
          <div>访问量:</div>
          <h4>xxxx{{}}</h4>
          <hr>
          <div>今日销售额:{{}}</div>
        </div>
      </el-col>
      <el-col :span="6" class="clo3">
        <div class="grid-content">
          <div>访问量:</div>
          <h4>xxxx{{}}</h4>
          <hr>
          <div>今日销售额:{{}}</div>
        </div>
      </el-col>
      <el-col :span="6" class="clo4">
        <div class="grid-content">
          <div>访问量:</div>
          <h4>xxxx{{}}</h4>
          <hr>
          <div>今日销售额:{{}}</div>
        </div>
      </el-col> -->
      </el-row>
    </div>

    <div class="echarts">
      <home-echarts></home-echarts>
    </div>


  </div>
</template>

<script>
import HomeEcharts from './homeEcharts/HomeEcharts.vue'
export default {
  data() { 
    return {
      statisicList:[]
    }
  }
  ,
  components: {
    HomeEcharts
  },
  methods: {
  },
  mounted() {
    // console.log('123');
    this.$api.getStatistic().then(res => {
      // console.log(res.data)
      if (res.status == 200) { 
        this.statisicList=res.data.list
      }
    })
  },
}
</script>

<style scoped lang="less">


.echarts{
  padding: 20px;
}
.layout{
  margin: 10px 0;
}

.header[data-v-d66815e4]{
  border-bottom:0px
}

.clo1{
background-color: rgba(0, 0, 0, 0.1);
margin-right: 10px;
}
.header{
  padding: 20px;

}
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 100px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>