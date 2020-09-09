export default function (ctx) {
  return [
    {
      type: 'index',
      label: '编号',
      width: 100,
      index: (v) => {
        return (ctx.currentPage - 1) * ctx.pageSize + v + 1
      }
    },
    {
      prop: 'date',
      label: '日期',
      labelClassName: '___test___style__label',
      className: '___test___style',
      showOverflowTooltip: true,
      renderHeader (h, { column }) {
        return (
          <div>
            <el-link type="success">{column.label}</el-link>
          </div>
        )
      }
    },
    {
      label: '配送信息',
      align: 'center',
      children: [
        {
          prop: 'name',
          label: '姓名',
          renderBody (h, { row }) {
            return (
              <div style={{ backgroundColor: 'red' }}>
                <i style={{ color: '#fff' }}>{row.name}</i>
              </div>
            )
          }
        },
        {
          label: '地址',
          align: 'center',
          children: [
            {
              prop: 'province',
              label: '省份'
            },
            {
              prop: 'city',
              label: '市区'
            },
            {
              prop: 'address',
              label: '地址',
              showOverflowTooltip: true
            }
          ]
        }
      ]
    }
  ]
}
