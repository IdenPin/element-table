## element-table

#### 基于 `element-ui` table 二次开发的 table 组件
 - 保留原有的 `element-ui` table api
 - 增加了 table 分页组件集成
 - 支持 table 表头外部自定义导入配置
 - table body 支持 jsx 语法
```js
// 安装
npm i @pdeng/element-table

// 使用
import ElementTable from '@pdeng/element-table'
Vue.use(ElementTable)

<DTable :data="dataList" :column="columnData" />

data() {
  return {
    currentPage: 1,
    pageSize: 10,
    columnData: [
      {
        type: 'index',
        label: '编号',
        index: (v) => {
          return (this.currentPage - 1) * this.pageSize + v + 1
      },
      {
        label: '日期',
        prop:'date',
      },
      {
        label: '姓名',
        prop:'name',
      }
      ...
    ],
    dataList: [
      {
        date: '2020-08-01',
        name: '韩小寒'
      },
      {
        date: '2020-08-01',
        name: '韩小寒'
      },
      ....
    ]
  },
}
```
