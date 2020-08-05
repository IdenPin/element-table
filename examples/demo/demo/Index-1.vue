<template>
  <div>
    <DTable
      :column="column"
      :data="dataList"
    />
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      column: [
        {
          type: 'index',
          label: '编号'
          // renderBody: (h, ctx) => {
          //   const temp = ctx.$index * 2 + this.pageSize
          //   console.log('---', temp)
          //   return (
          //     <span>{temp}</span>
          //   )
          // }
        },
        {
          prop: 'date',
          label: '日期'
        },
        {
          label: '配送信息',
          children: [
            {
              prop: 'name',
              label: '姓名',
              renderBody (h, { row }) {
                return (
                  <h1>{row.name}</h1>
                )
              }
            },
            {
              label: '地址',
              children: [
                {
                  prop: 'province',
                  label: '省份'
                },
                {
                  prop: 'city',
                  label: '市区',
                  align: 'center'
                },
                {
                  prop: 'address',
                  label: '地址',
                  showOverflowTooltip: true,
                  width: 150
                }
              ]
            }
          ]
        }
      ],
      dataList: [
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
        }
      ]
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
