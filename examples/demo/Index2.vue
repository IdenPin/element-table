<template>
  <div>
    <el-table-block
      :column="column"
      :data="rows"
      :rowClassName="rowClassName"
      :pagination="true"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="30"
      height="300"
      layout="prev, pager, slot, jumper, next, sizes"
      prev-text="上页"
      next-text="下页"
      size="mini"
      @currentChange="fetchTable"
    >
      <template v-slot:append>
        <h3 style="text-align: right; margin-right: 20px">合计：100</h3>
      </template>
      <template v-slot:pagination>
        <el-button style="padding: 0 8px" class="btn-next">前往最后一页</el-button>
      </template>
    </el-table-block>
  </div>
</template>

<script>
import columnData from '../assets/data'
export default {
  name: 'Demo',
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      column: columnData(this),
      rows: Array.from({ length: 10 }, (_, index) => ({
        date: '2016-05-03',
        name: `张二米${index}`,
        province: '西安',
        city: '高新',
        address: '陕西省西安市高新区都市之门',
        zip: 200333
      }))
    }
  },
  methods: {
    fetchTable(v) {
      this.currentPage = v
    },
    rowClassName({ rowIndex }) {
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
.___test___style__label {
  background-color: black;
  margin: 0;
  padding: 0;
}
.___test___style {
  font-size: 26px;
  padding: 0;
  background-color: yellow;
  border: red;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
