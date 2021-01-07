<template>
  <el-table-block :column="column" :data="rows" />
</template>

<script>
export default {
  name: 'Demo',
  data() {
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
        },
        {
          label: '操作人',
          prop: 'name'
        }
      ],
      rows: Array.from({ length: 5 }, (_, index) => ({
        date: '2020-05-02',
        name: '韩小寒',
        address: '陕西省西安市高新区汇鑫IBC'
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
