<template>
  <div class="el-table-block-wrap">
    <!-- <div class="download-table" v-if="!$attrs.export" @click="exportTableFile">
      <i class="el-icon-download"></i>导出
    </div> -->
    <el-table
      ref="elTable"
      v-bind="$attrs"
      v-on="$listeners"
      :data="data"
      :span-method="this.merge ? this.mergeMethod : this.spanMethod"
    >
      <Column v-bind="$attrs" v-on="$listeners" v-for="(item, index) in column" :key="index" :column="item"> </Column>
      <template v-slot:append>
        <!-- 表格后追加 -->
        <slot name="append"></slot>
      </template>
      <!-- 默认空白 -->
      <template v-slot:empty>
        <slot name="empty"></slot>
      </template>
    </el-table>
    <el-pagination
      class="pagination"
      v-if="pagination && $attrs.total > 0"
      v-bind="$attrs"
      v-on="$listeners"
      :current-page="$attrs.currentPage"
      :page-size="$attrs.pageSize"
      :style="$attrs.pageStyle"
      @current-change="paginationCurrentChange"
    >
      <!-- 分页-自定义slot -->
      <slot name="pagination"></slot>
    </el-pagination>
  </div>
</template>

<script>
import Column from '../../column/src/Column'
import exportToExcel from './download'
export default {
  name: 'ElTableBlock',
  props: {
    column: Array,
    data: Array,
    spanMethod: Function,
    pagination: {
      type: Boolean,
      default: false
    },
    merge: Array
  },
  components: {
    Column
  },
  data() {
    return {
      mergeLine: {},
      mergeIndex: {}
    }
  },
  created() {
    this.getMergeArr(this.data, this.merge)
  },
  computed: {
    dataLength() {
      return this.data.length
    }
  },
  methods: {
    exportTableFile() {
      console.log(this.data, this.column)
      exportToExcel(this.data, this.column, this.$attrs.exportConfig)
    },
    clearSelection() {
      this.$refs.elTable.clearSelection()
    },
    toggleRowSelection(row, selected) {
      this.$refs.elTable.toggleRowSelection(row, selected)
    },
    toggleAllSelection() {
      this.$refs.elTable.toggleAllSelection()
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.elTable.toggleRowExpansion(row, expanded)
    },
    setCurrentRow(row) {
      this.$refs.elTable.setCurrentRow(row)
    },
    clearSort() {
      this.$refs.elTable.clearSort()
    },
    clearFilter(columnKey) {
      this.$refs.elTable.clearFilter(columnKey)
    },
    doLayout() {
      this.$refs.elTable.doLayout()
    },
    sort(prop, order) {
      this.$refs.elTable.sort(prop, order)
    },
    paginationCurrentChange(val) {
      this.$emit('currentChange', val)
    },
    getMergeArr(tableData, merge) {
      if (!merge) return
      let mergeLine = {}
      let mergeIndex = {}
      // eslint-disable-next-line
      merge.forEach(item => {
        tableData.forEach((data, i) => {
          if (i === 0) {
            mergeIndex[item] = mergeIndex[item] || []
            mergeIndex[item].push(1) // this.mergeIndex['mpName'] = [1]
            mergeLine[item] = 0 // this.mergeLine['mpName'] = 0
          } else {
            if (data[item] === tableData[i - 1][item]) {
              // （相同值第一个出现的位置，统计需要合并多少行）
              mergeIndex[item][mergeLine[item]] += 1
              // 新增一个被合并行
              mergeIndex[item].push(0)
            } else {
              // 否则不合并
              mergeIndex[item].push(1)
              mergeLine[item] = i
            }
          }
        })
      })
      // console.log('mergeLine', JSON.stringify(mergeLine, null, 2))
      // console.log('mergeIndex', JSON.stringify(mergeIndex, null, 2))
      this.mergeLine = mergeLine
      this.mergeIndex = mergeIndex
    },
    mergeMethod({ column, rowIndex }) {
      // console.log(`第${rowIndex}行，第${columnIndex}列`)
      // console.log('column', JSON.stringify(column, null, 2))
      const index = this.merge.indexOf(column.property)
      if (index > -1) {
        // console.log(`第${rowIndex}行，第${columnIndex}列`)
        // console.log('mergeLine', JSON.stringify(this.mergeIndex, null, 2))
        const _row = this.mergeIndex[column.property][rowIndex]

        return {
          rowspan: _row,
          colspan: _row > 0 ? 1 : 0 // 1 展示 0隐藏
        }
      }
    }
  },
  watch: {
    merge() {
      this.getMergeArr(this.data, this.merge)
    },
    dataLength() {
      this.getMergeArr(this.data, this.merge)
    }
  }
}
</script>
<style scoped>
.download-table {
  font-size: 13px;
  color: #2c3240;
  cursor: pointer;
  width: 50px;
  float: right;
  margin-bottom: 10px;
}

.pagination {
  display: flex;
  padding: 10px 0;
  justify-content: center;
  /* border: 1px solid #ebeef5; */
  border-top: none;
}

::v-deep .el-table--small,
::v-deep .el-table--mini {
  font-size: 13px;
}
::v-deep .el-table--small th {
  padding: 3px 0;
}
::v-deep .el-table--small td {
  padding: 6px 0;
}

::v-deep .el-table thead th,
::v-deep .el-table thead tr {
  background: #ebeef5;
  color: #7b818d;
}

::v-deep .el-table th,
::v-deep .el-table tr {
  color: #2e3544;
}

::v-deep .el-table td,
::v-deep .el-table th.is-leaf,
::v-deep .el-table--border td,
::v-deep .el-table--border th,
::v-deep .el-table__fixed-right-patch,
::v-deep .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-bottom: 1px solid #e5e7ee;
}
::v-deep .el-table--border td,
::v-deep .el-table--border th,
::v-deep .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right: 1px solid #e5e7ee;
}
</style>
