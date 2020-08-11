<template>
  <div>
    <el-table-block :column="tableData.column"
      :data="[...tableData.data,...tableData.data]"
      border>
    </el-table-block>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      tableData: {
        column: [
          {
            label: '日期',
            prop: 'date'
          },
          {
            label: '名称',
            prop: 'name'
          },
          {
            label: '地址',
            prop: 'address'
          }
        ],
        data: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
