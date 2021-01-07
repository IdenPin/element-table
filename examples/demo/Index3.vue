<template>
  <div>
    <el-table-block :column="column" :data="rows" :merge="merge" border />

    <!-- <el-table-block :column="column" :data="rows" :span-method="spanMethod" border> </el-table-block> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: '',
      column: [
        {
          type: 'index',
          renderBody: (h, data) => {
            return <b>{data.$index + 1}</b>
          }
        },
        {
          prop: 'mpName',
          label: '工艺流程'
        },
        {
          prop: 'processTypeName',
          label: '工艺类型'
        },
        {
          prop: 'equipTypeName',
          label: '设备类型'
        },
        {
          prop: 'equipTypeId',
          label: '监测设备',
          formatter(data) {
            return data.equipTypeId + '件'
          }
        },
        {
          prop: 'equipId',
          label: '判断依据'
        },
        {
          prop: 'processTypeCode',
          label: '操作',
          renderHeader: (h) => {
            return (
              <el-input
                value={this.searchValue}
                onInput={(value) => (this.searchValue = value)}
                size="mini"
                placeholder="输入关键字搜索"
              />
            )
          },
          renderBody(h) {
            return (
              <el-button
                type="primary"
                size="mini"
                onClick={() => {
                  alert(1)
                }}
              >
                查看
              </el-button>
            )
          }
        }
      ],
      rows: [],
      merge: ['mpName', 'equipTypeId']
    }
  },
  mounted() {
    this.fetchTable()
  },
  methods: {
    setTable(tableData, merge) {
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
              // console.log('i', i)
              this.mergeLine[item] = i
            }
          }
        })
      })
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      const index = this.merge.indexOf(column.property)
      if (index > -1) {
        const _row = this.mergeIndex[column.property][rowIndex]
        const _col = _row > 0 ? 1 : 0 // 1 展示 0隐藏
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    async fetchTable() {
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
          equipId: '1220218'
        },
        // {
        //   mpId: '89283938293',
        //   mpName: '活性污泥工艺流程',
        //   processTypeCode: '1',
        //   processTypeName: '活性污泥法',
        //   equipType: [
        //     {
        //       equipTypeId: '1',
        //       equipTypeName: '污水提升泵'
        //     },
        //     {
        //       equipTypeId: '2',
        //       equipTypeName: '鼓风机'
        //     },
        //     {
        //       equipTypeId: '3',
        //       equipTypeName: '污泥回流泵'
        //     }
        //   ],
        //   equipId: '111'
        // }
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
              equipTypeId: '2',
              equipTypeName: '污泥回流泵'
            }
          ],
          equipId: '1000212'
        }
        // {
        // mpId: '434342323',
        // mpName: '过氧化氢',
        // processTypeCode: '11',
        // processTypeName: '高锰酸钾冶炼法',
        // equipType: [
        //   {
        //     equipTypeId: '1',
        //     equipTypeName: '升泵'
        //   },
        //   {
        //     equipTypeId: '2',
        //     equipTypeName: '前泵'
        //   },
        //   {
        //     equipTypeId: '3',
        //     equipTypeName: '中泵'
        //   }
        // ],
        // equipId: '3333'
        // }
      ]
      this.rows = data.reduce((acc, v) => {
        v.equipType.forEach((vv) => {
          vv.rows = v.equipType.length
          vv.equipId = v.equipId
          vv.mpName = v.mpName
          vv.processTypeName = v.processTypeName
        })
        acc.push(...v.equipType)
        return acc
      }, [])
      this.setTable(this.rows, this.merge)
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
