<template>
  <div id="app">
    <el-main>
      <h1>Element Table</h1>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="基础表格" name="1">
          <Demo1/>
        </el-tab-pane>
        <el-tab-pane label="复杂表格" name="2">
          <Demo2/>
        </el-tab-pane>
        <el-tab-pane label="合并单元格" name="3">
          <Demo3/>
        </el-tab-pane>
        <el-tab-pane label="编辑行" name="4">
          <Demo4/>
        </el-tab-pane>
        <el-tab-pane label="弹层修改" name="5">
          <Demo5/>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </div>
</template>

<script>
import Demo1 from './demo/Index1'
import Demo2 from './demo/Index2'
import Demo3 from './demo/Index3'
import Demo4 from './demo/Index4'
import Demo5 from './demo/Index5'

export default {
  name: 'App',
  data () {
    return {
      activeName: '1'
    }
  },
  components: {
    Demo1,
    Demo2,
    Demo3,
    Demo4,
    Demo5
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
