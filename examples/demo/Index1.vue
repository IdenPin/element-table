<template>
  <el-table-block
    :column="column"
    :data="rows"
  />
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
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
      rows: Array.from({ length: 5 }, (_, index) => ({
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }))
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
