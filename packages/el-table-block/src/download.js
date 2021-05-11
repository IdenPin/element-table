import { export_json_to_excel } from './vendor/Export2Excel'
// 行转列
function formatJson(filterVal, jsonData) {
  return jsonData.map((v) =>
    filterVal.map((j) => {
      return v[j]
    })
  )
}

let CURRENT_CELL_INDEX = 0
// https://segmentfault.com/q/1010000023268006?utm_source=tag-newest
//转换数字到EXCEL单元格编号
function numberToCellCode(number) {
  let s = ''
  while (number > 0) {
    let m = number % 26
    if (m === 0) m = 26
    s = String.fromCharCode(m + 64) + s
    number = (number - m) / 26
  }
  return s
}
// 获取跨列
function getColSpan(column) {
  var colSpan = 0
  var children = column.children || []
  for (var i = 0; i < children.length; i++) {
    var item = children[i]
    if (item.children && item.children.length > 0) {
      colSpan += getColSpan(item)
    } else {
      colSpan += 1
    }
  }
  if (colSpan == 0) {
    colSpan = 1
  }
  return colSpan
}
// 获取跨行
function getRowSpan(column, maxLevel) {
  let rowSpan = 1
  if (!column.children || column.children.length === 0) {
    rowSpan = maxLevel - column.level + 1
  }
  return rowSpan
}
// 获取最大层级
function setCellCode(columns, parentNode) {
  const levels = []
  columns.forEach((li, index) => {
    if (!CURRENT_CELL_INDEX) {
      CURRENT_CELL_INDEX = 1
    } else {
      CURRENT_CELL_INDEX++
    }
    if (parentNode && index == 0) {
      CURRENT_CELL_INDEX = parentNode.CellIndex
    }
    li.CellIndex = CURRENT_CELL_INDEX
    li.CellCode = numberToCellCode(CURRENT_CELL_INDEX)
    const children = li.children
    if (children && children.length > 0) {
      setCellCode(children, li)
    }
  })
  return levels
}
// 获取最大层级
function getLevels(columns, parentNode) {
  const levels = []
  columns.forEach((li, index) => {
    li.level = parentNode ? parentNode.level + 1 : 0
    levels.push(li.level)
    const children = li.children
    if (children && children.length > 0) {
      const result = getLevels(children, li)
      levels.push(...result)
    }
  })
  return levels
}
// 设置合并
function setMerges(columns = [], maxLevel, multiHeader = [], merges = []) {
  columns.forEach((li, index) => {
    const level = li.level + 1
    const cellIndex = li.CellIndex - 1
    const CellCode = li.CellCode
    const cellTitle = li.label
    const colSpan = getColSpan(li)
    const rowSpan = getRowSpan(li, maxLevel)

    li.colSpan = colSpan
    li.rowSpan = rowSpan
    if (!multiHeader[level - 1]) {
      multiHeader[level - 1] = []
    }
    // debugger
    if (rowSpan > 1) {
      merges.push(`${CellCode}${level}:${CellCode}${level + rowSpan - 1}`)
      multiHeader[level - 1][cellIndex] = cellTitle
      for (let i = 1; i < rowSpan; i++) {
        if (!multiHeader[level - 1 + i]) {
          multiHeader[level - 1 + i] = []
        }
        multiHeader[level - 1 + i][cellIndex] = ''
      }
    } else {
      multiHeader[level - 1][cellIndex] = cellTitle
    }
    if (colSpan > 1) {
      let endCellIndex = cellIndex
      let emptyCell = []
      for (let i = 1; i < colSpan; i++) {
        endCellIndex++
        emptyCell.push('')
      }
      const endCellCode = numberToCellCode(endCellIndex)
      multiHeader[level - 1].splice(cellIndex + 1, 0, ...emptyCell)
      merges.push(`${CellCode}${level}:${endCellCode}${level}`)
    }
    const children = li.children
    if (children && children.length > 0) {
      setMerges(children, maxLevel, multiHeader, merges)
    }
  })
}
/**
 * 文件导出
 * @param tableData {Array} 数据源
 * @param columns {Array} 列
 * @param config {Object} 配置项
 */
export default function exportToExcel(tableData, columns, config) {
  const date = new Date()
  let filename = `${date.getFullYear()}年${
    date.getMonth() + 1
  }月${date.getDate()}日 ${date.getHours()}/${date.getMinutes()}/${date.getSeconds()}`
  const option = { filename, autoWidth: true, bookType: 'xlsx' }
  if (config) {
    Object.assign(option, config)
  }
  let multiHeader = []
  const header = []
  const merges = []
  CURRENT_CELL_INDEX = 0
  setCellCode(columns, null, null)
  // console.log('setCellCode', columns)
  // 最大层级集合
  const allLevels = getLevels(columns, null)
  // 获取最大层级
  const maxLevel = Math.max(...allLevels)
  // console.log(maxLevel)
  setMerges(columns, maxLevel, multiHeader, merges)
  // console.log('multiHeader', JSON.stringify(multiHeader, null, 4))
  // console.log('setMerges', merges)
  header.push(...multiHeader[maxLevel])
  if (maxLevel > 0) {
    multiHeader.splice(maxLevel, 1)
  } else {
    multiHeader = []
  }
  // 行转列
  const filterVal = []
  columns.forEach((row) => {
    filterVal.push(row.prop)
  })
  const data = formatJson(filterVal, tableData)
  export_json_to_excel({
    multiHeader,
    header,
    merges,
    data,
    filename: option.filename,
    autoWidth: option.autoWidth,
    bookType: option.bookType
  })
}
