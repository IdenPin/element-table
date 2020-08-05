export default function (ctx) {
  return [
    {
      type: 'index',
      label: '编号',
      index: (v) => {
        return (ctx.currentPage - 1) * ctx.pageSize + v + 1
      }
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
          renderHeader (h, { column }) {
            return (
              <h1 style={{ color: 'red' }}>{column.label}</h1>
            )
          },
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
  ]
}
