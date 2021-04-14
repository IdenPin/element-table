<template>
  <div>
    <el-table-block
      highlight-current-row
      :column="column"
      @current-change="handleCurrentChange"
      :data="rows"
      ref="test"
    />
    <el-button style="margin-top: 20px" @click="setCurrent(rows[1])">选中第二行</el-button>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data() {
    return {
      currentRow: null,
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
      rows: Array.from({ length: 5 }, () => ({
        date: '2020-05-02',
        name: '韩小寒',
        address: '陕西省西安市高新区汇鑫IBC'
      }))
    }
  },
  methods: {
    setCurrent(row) {
      this.$refs.test.setCurrentRow(row)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    }
  }
}
</script>
