<template>
  <div>
    <!-- :merge="['mpName','processTypeName']" -->
    <el-table-block :column="column"
      :data="rows"
      :span-method="spanMethod"
      border>
    </el-table-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      column: [{
        prop: 'mpName',
        label: '工艺流程'
      }, {
        prop: 'processTypeName',
        label: '工艺类型'
      }, {
        prop: 'equipTypeName',
        label: '设备类型'
      }, {
        prop: 'equipTypeId',
        label: '监测设备'
      }, {
        prop: 'equipId',
        label: '判断依据'
      }, {
        prop: 'processTypeCode',
        label: '操作',
        renderBody (h) {
          return (
            <el-button type="primary" size="mini" onClick={() => { alert(1) }}>查看</el-button>
          )
        }
      }
      ],
      rows: []
    }
  },
  mounted () {
    this.fetchTable()
  },
  methods: {
    spanMethod ({ row, column, rowIndex, columnIndex }) {
      // 合并第一列和第二列
      if (columnIndex <= 1) {
        // 清楚合并的
        if (rowIndex > 0 && row[column.property] === this.rows[rowIndex - 1][column.property]) {
          return {
            rowspan: 0,
            colspan: 0
          }
        } else {
          let rows = 1
          // 如果前一项和后一项相等，则合并
          for (let i = rowIndex; i < this.rows.length - 1; i++) {
            if (row[column.property] === this.rows[i + 1][column.property]) {
              rows++
            }
          }
          // 返回相同内容的行数
          console.log({
            rowspan: rows,
            colspan: 1
          })
          return {
            rowspan: rows,
            colspan: 1
          }
        }
      }
    },
    async fetchTable () {
      // const { data } = await fetch('http://rap2.taobao.org:38080/app/mock/data/1679024').then((res) => res.json())
      const data = [
        {
          mpId: '89283938294',
          mpName: '沟法工艺流程',
          processTypeCode: '1',
          processTypeName: '洋流化沟法',
          equipType: [
            {
              equipTypeId: '1',
              equipTypeName: '升泵'
            },
            {
              equipTypeId: '2',
              equipTypeName: '风机'
            },
            {
              equipTypeId: '3',
              equipTypeName: '回流泵'
            }
          ],
          equipId: '121212'
        },
        {
          mpId: '89283938293',
          mpName: '活性污泥工艺流程',
          processTypeCode: '1',
          processTypeName: '活性污泥法',
          equipType: [
            {
              equipTypeId: '1',
              equipTypeName: '污水提升泵'
            },
            {
              equipTypeId: '2',
              equipTypeName: '鼓风机'
            },
            {
              equipTypeId: '3',
              equipTypeName: '污泥回流泵'
            }
          ],
          equipId: '111'
        },
        {
          mpId: '89283938294',
          mpName: '氧化沟法工艺流程',
          processTypeCode: '2',
          processTypeName: '氧化沟法',
          equipType: [
            {
              equipTypeId: '2',
              equipTypeName: '鼓风机'
            },
            {
              equipTypeId: '3',
              equipTypeName: '污泥回流泵'
            }
          ],
          equipId: '222'
        },
        {
          mpId: '434342323',
          mpName: '过氧化氢',
          processTypeCode: '11',
          processTypeName: '高锰酸钾冶炼法',
          equipType: [
            {
              equipTypeId: '1',
              equipTypeName: '升泵'
            },
            {
              equipTypeId: '2',
              equipTypeName: '前泵'
            },
            {
              equipTypeId: '3',
              equipTypeName: '中泵'
            }
          ],
          equipId: '3333'
        }
      ]
      this.rows = data
      this.rows = data.reduce((acc, v) => {
        v.equipType.forEach(vv => {
          vv.rows = v.equipType.length
          vv.equipId = v.equipId
          vv.mpName = v.mpName
          vv.processTypeName = v.processTypeName
        })
        acc.push(...v.equipType)
        return acc
      }, [])
      console.log('-----', this.rows)
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
