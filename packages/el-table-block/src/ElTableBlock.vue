<template>
  <div class="el-table-block-wrap">
    <el-table ref="elTableBlock"
      v-bind="$attrs"
      v-on="$listeners"
      :data="data"
      :span-method="this.merge ? this.mergeMethod : this.spanMethod">
      <Column v-bind="$attrs"
        v-on="$listeners"
        v-for="(item, index) in column"
        :key="index"
        :column="item">
      </Column>
    </el-table>
    <el-pagination class="pagination"
      v-if="pagination && pageTotal>0"
      v-bind="$attrs"
      v-on="$listeners"
      :layout="pageLayout"
      :total="pageTotal"
      :current-page="currentPage"
      :page-size="pageSize"
      :background="pageBackground"
      :hide-on-single-page="pageHideOnSignlePage"
      @current-change="paginationCurrentChange"
      :style="{ 'margin-top': paginationTop, 'text-align': paginationAlign }">
    </el-pagination>
  </div>
</template>

<script>
import Column from '../../column/src/Column'
export default {
  name: 'ElTableBlock',
  props: {
    column: Array,
    data: Array,
    spanMethod: Function,
    pageHideOnSignlePage: {
      type: Boolean,
      defalut: false
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageLayout: {
      type: String,
      default: 'total, prev, pager, next'
    },
    pageTotal: {
      type: [Number, String],
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pagination: {
      type: Boolean,
      default: false
    },
    paginationTop: {
      type: String,
      default: '15px'
    },
    paginationAlign: {
      type: String,
      default: 'right'
    },
    pageBackground: {
      type: Boolean,
      default: false
    },
    merge: Array
  },
  components: {
    Column
  },
  data () {
    return {
      mergeLine: {},
      mergeIndex: {}
    }
  },
  created () {
    this.getMergeArr(this.data, this.merge)
  },
  computed: {
    dataLength () {
      return this.data.length
    }
  },
  methods: {
    clearSelection () {
      this.$refs.elTable.clearSelection()
    },
    toggleRowSelection (row, selected) {
      this.$refs.elTable.toggleRowSelection(row, selected)
    },
    toggleAllSelection () {
      this.$refs.elTable.toggleAllSelection()
    },
    toggleRowExpansion (row, expanded) {
      this.$refs.elTable.toggleRowExpansion(row, expanded)
    },
    setCurrentRow (row) {
      this.$refs.elTable.setCurrentRow(row)
    },
    clearSort () {
      this.$refs.elTable.clearSort()
    },
    clearFilter (columnKey) {
      this.$refs.elTable.clearFilter(columnKey)
    },
    doLayout () {
      this.$refs.elTable.doLayout()
    },
    sort (prop, order) {
      this.$refs.elTable.sort(prop, order)
    },
    paginationCurrentChange (val) {
      this.$emit('currentChange', val)
    },
    getMergeArr (tableData, merge) {
      // ["mpName", "processTypeName"]
      if (!merge) return
      this.mergeLine = {}
      this.mergeIndex = {}
      merge.forEach((item, k) => {
        tableData.forEach((data, i) => {
          if (i === 0) {
            this.mergeIndex[item] = this.mergeIndex[item] || []
            this.mergeIndex[item].push(1) // this.mergeIndex['mpName'] = [1]
            this.mergeLine[item] = 0 // this.mergeLine['mpName'] = 0
          } else {
            if (data[item] === tableData[i - 1][item]) {
              // （相同值第一个出现的位置，统计需要合并多少行）
              this.mergeIndex[item][this.mergeLine[item]] += 1
              // 新增一个被合并行
              this.mergeIndex[item].push(0)
            } else {
              // 否则不合并
              this.mergeIndex[item].push(1)
              this.mergeLine[item] = i
            }
          }
        })
      })
    },
    mergeMethod ({ row, column, rowIndex, columnIndex }) {
      const index = this.merge.indexOf(column.property)
      if (index > -1) {
        const _row = this.mergeIndex[column.property][rowIndex]
        // this.mergeIndex => {
        //   mpName: [
        //     3,
        //     0,
        //     0,
        //     2,
        //     0
        //   ],
        //   processTypeName: [
        //     3,
        //     0,
        //     0,
        //     2,
        //     0
        //   ]
        // }
        return {
          rowspan: _row,
          colspan: _row > 0 ? 1 : 0 // 0 展示 1隐藏
        }
      }
    }
  },
  watch: {
    merge () {
      this.getMergeArr(this.data, this.merge)
    },
    dataLength () {
      this.getMergeArr(this.data, this.merge)
    }
  }
}

</script>
