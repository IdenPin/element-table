<template>
  <div id="app">
    <el-main>
      <el-card shadow="hover" :body-style="{ padding: '20px' }">
        <div slot="header">
          <div style="font-size: 30px">
            ELEMENT TABLE DEMO
            <el-tag size="mini" type="primary">v{{ pkg.version }}</el-tag>
          </div>
          <p>{{ pkg.description }}</p>
          <highlightjs
            language="javascript"
            v-if="isShowCode"
            code="npm i @pdeng/element-table
import ElTableBlock from '@pdeng/element-table'
Vue.use(ElTableBlock)"
          />
        </div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="基础表格" name="1">
            <Demo1 />
          </el-tab-pane>
          <el-tab-pane label="分页表格" name="2">
            <Demo2 />
          </el-tab-pane>
          <el-tab-pane label="合并表格" name="3">
            <Demo3 />
          </el-tab-pane>
          <el-tab-pane label="行内编辑表格" name="4">
            <Demo4 />
          </el-tab-pane>
          <el-tab-pane label="弹层修改表格" name="5">
            <Demo5 />
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-card shadow="hover" class="show-code">
        <div>
          <span
            ><el-button type="primary" plain @click="isShowCode = !isShowCode"
              >{{ isShowCode ? '隐藏' : '展开' }}代码</el-button
            ></span
          >
        </div>
        <highlightjs language="javascript" v-if="isShowCode" :code="code" />
      </el-card>
    </el-main>
  </div>
</template>

<script>
import pkg from '../package.json'
import Demo1 from './demo/Index1'
import Demo2 from './demo/Index2'
import Demo3 from './demo/Index3'

import Demo4 from './demo/Index4'
import Demo5 from './demo/Index5'

export default {
  name: 'App',
  data() {
    return {
      pkg,
      activeName: '1',
      isShowCode: true
    }
  },
  components: {
    Demo1,
    Demo2,
    Demo3,
    Demo4,
    Demo5
  },
  computed: {
    code() {
      let code1 = `
  <div>
    <el-table-block
      highlight-current-row
      :column="column"
      @current-change="handleCurrentChange"
      :data="rows"
      ref="test"
    />
    <el-button style="margin-top: 20px" @click="setCurrent(rows[1])">选中第二行</el-button>
  </div>

  export default {
    name: 'Demo',
    data() {
      return {
        currentRow: null,
        column: [
          {
            label: '日期',
            prop: 'date'
          },
          {
            label: '名称',
            prop: 'name'
          },
          {
            label: '地址',
            prop: 'address'
          },
          {
            label: '操作人',
            prop: 'name'
          }
        ],
        rows: Array.from({ length: 5 }, (_, index) => ({
          date: '2020-05-02',
          name: '韩小寒',
          address: '陕西省西安市高新区汇鑫IBC'
        }))
      }
    },
    methods: {
      setCurrent(row) {
        this.$refs.test.setCurrentRow(row)
      },
      handleCurrentChange(val) {
        this.currentRow = val
      }
    }
  }
        `
      let code2 = `
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
    background
    @currentChange="fetchTable"
  >
    <template v-slot:append>
      <h3 style="text-align: right; margin-right: 20px">合计：100</h3>
    </template>
    <template v-slot:pagination>
      <el-button style="padding: 0 8px" class="btn-next">前往最后一页</el-button>
    </template>
  </el-table-block>

  import columnData from '../assets/data'
  export default {
    name: 'Demo',
    data() {
      return {
        currentPage: 1,
        pageSize: 5,
        column: [
          {
            type: 'index',
            label: '编号',
            width: 100,
            index: () => {
              return (this.currentPage - 1) * this.pageSize + v + 1
            }
          },
          {
            prop: 'date',
            label: '日期',
            labelClassName: '___test___style__label',
            className: '___test___style',
            showOverflowTooltip: true,
            renderHeader(h, { column }) {
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
                renderBody(h, { row }) {
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
        ],
        rows: Array.from({ length: 10 }, (_, index) => ({
          date: '2016-05-03',
          name: '张二米',
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
      rowClassName({ row, rowIndex }) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      }
    }
  }`

      let code3 = `
  <el-table-block :column="column" :data="rows" :merge="merge" border />


  export default {
    data() {
      return {
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
      }
    }
  }
  `
      let code4 = `
    <el-table-block
      :column="tableData.column"
      :pagination="true"
      :pageTotal="20"
      :pageSize="5"
      :currentPage="1"
      :data="tableData.data"
    />


    export default {
      data() {
        return {
          tableData: {
            column: [
              {
                type: 'index'
              },
              {
                prop: 'date',
                label: '日期',
                width: '150',
                renderBody: (h, scope) => {
                  return (
                    <div>
                      {scope.row._edit ? (
                        <el-date-picker
                          value={scope.row[scope.column.property]}
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                          style="width: 140px"
                          onInput={(val) => {
                            scope.row[scope.column.property] = val
                          }}
                        ></el-date-picker>
                      ) : (
                        <span>{scope.row[scope.column.property]}</span>
                      )}
                    </div>
                  )
                }
              },
              {
                prop: 'name',
                label: '姓名',
                renderBody: (h, scope) => {
                  return (
                    <div>
                      {scope.row._edit ? (
                        <el-input
                          value={scope.row[scope.column.property]}
                          onInput={(val) => {
                            scope.row[scope.column.property] = val
                          }}
                        ></el-input>
                      ) : (
                        <span>{scope.row[scope.column.property]}</span>
                      )}
                    </div>
                  )
                }
              },
              {
                prop: 'tag',
                label: '标签',
                renderBody: (h, scope) => {
                  return (
                    <div>
                      {scope.row._edit ? (
                        <el-select
                          value={scope.row[scope.column.property]}
                          style="width: 80px"
                          onChange={(val) => {
                            scope.row[scope.column.property] = val
                          }}
                        >
                          {this.tagOptions.map((option) => {
                            return <el-option label={option.label} value={option.value}></el-option>
                          })}
                        </el-select>
                      ) : (
                        <el-tag type={scope.row.tag === '家' ? 'primary' : 'success'}>
                          {scope.row[scope.column.property]}
                        </el-tag>
                      )}
                    </div>
                  )
                }
              },
              {
                label: '操作',
                renderBody: (h, scope) => {
                  return (
                    <div>
                      {scope.row._edit ? (
                        <div>
                          <el-button-group>
                            <el-button
                              type="primary"
                              onClick={() => {
                                this.handleSave(scope)
                              }}
                            >
                              保存
                            </el-button>
                            <el-button
                              onClick={() => {
                                this.handleCancle(scope)
                              }}
                            >
                              取消
                            </el-button>
                          </el-button-group>
                        </div>
                      ) : (
                        <el-button
                          type="primary"
                          onClick={() => {
                            this.handleEdit(scope)
                          }}
                        >
                          编辑
                        </el-button>
                      )}
                    </div>
                  )
                }
              }
            ],
            data: [
              {
                date: '2016-05-02',
                name: '韩寒1',
                tag: '家'
              },
              {
                date: '2016-05-02',
                name: '韩寒2',
                tag: '公司'
              },
              {
                date: '2016-05-02',
                name: '韩寒3',
                tag: '公司'
              }
            ],
            defaultData: []
          },
          tagOptions: [
            {
              label: '家',
              value: '家'
            },
            {
              label: '公司',
              value: '公司'
            }
          ]
        }
      },
      created() {
        this.tableData.defaultData = JSON.parse(JSON.stringify(this.tableData.data))
      },
      methods: {
        handleEdit(scope) {
          this.$set(scope.row, '_edit', true)
        },
        handleSave(scope) {
          this.$set(scope.row, '_edit', false)
          this.$set(this.tableData.defaultData, scope.$index, JSON.parse(JSON.stringify(scope.row)))
        },
        handleCancle(scope) {
          this.$set(this.tableData.data, scope.$index, JSON.parse(JSON.stringify(this.tableData.defaultData[scope.$index])))
        }
      }
    }
    `
      let code5 = `
    <el-table-block :column="tableData.column" :data="tableData.data"> </el-table-block>

    <el-dialog :visible.sync="dialogVisible" title="编辑" append-to-body>
      <div class="dialog-content">
        <el-form v-if="currentEdit" label-width="100px">
          <el-form-item label="日期">
            <el-date-picker v-model="currentEdit.date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="姓名">
            <el-input v-model="currentEdit.name" placeholder="请输入姓名"> </el-input>
          </el-form-item>

          <el-form-item label="地址">
            <el-input v-model="currentEdit.address" type="textarea" placeholder="请输入地址"> </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>


    export default {
      data() {
        return {
          tableData: {
            column: [
              {
                prop: 'date',
                label: '日期'
              },
              {
                prop: 'name',
                label: '姓名'
              },
              {
                prop: 'address',
                label: '地址'
              },
              {
                label: '操作',
                renderBody: (h, scope) => {
                  return (
                    <el-button
                      type="primary"
                      onClick={() => {
                        this.openDialog(scope)
                      }}
                    >
                      编辑
                    </el-button>
                  )
                }
              }
            ],
            data: [
              {
                date: '2016-05-02',
                name: '韩寒1',
                address: '陕西省西安市高新区都市之门'
              },
              {
                date: '2016-05-02',
                name: '韩寒2',
                address: '陕西省西安市高新区都市之门'
              },
              {
                date: '2016-05-02',
                name: '韩寒3',
                address: '陕西省西安市高新区都市之门'
              }
            ]
          },
          currentEdit: null,
          currentIndex: null,
          dialogVisible: false
        }
      },
      methods: {
        openDialog(scope) {
          this.currentEdit = JSON.parse(JSON.stringify(scope.row))
          this.currentIndex = scope.$index
          this.dialogVisible = true
        },
        confirm() {
          this.dialogVisible = false
          this.$set(this.tableData.data, this.currentIndex, this.currentEdit)
        }
      }
    }
    `

      let biz = {
        code1,
        code2,
        code3,
        code4,
        code5
      }

      return biz[`code${this.activeName}`]
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.show-code {
  margin-top: 20px;
}
</style>
