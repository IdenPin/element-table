<template>
  <div>
    <el-table-block :column="tableData.column"
      :data="[...tableData.data,...tableData.data]"
      :row-class-name="rowClassName"
      :pagination="true"
      paginationAlign='center'
      :currentPage.sync="currentPage"
      :pageSize.sync="pageSize"
      height="700"
      @currentChange="fetchTable"
      border>
    </el-table-block>
  </div>
</template>

<script>
import ElTableBlock from '@/components/ElTableBlock/Index'
import columnData from '@/components/ElTableBlock/data'
export default {
  name: 'Demo',
  components: {
    ElTableBlock
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      tableData: {
        column: columnData(this),
        data: [
          {
            date: '2016-05-03',
            name: '韩小寒1',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '韩小寒2',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '韩小寒3',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '韩小寒4',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '韩小寒5',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }
        ]
      }
    }
  },
  methods: {
    fetchTable (v) {
      this.currentPage = v
    },
    rowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
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
