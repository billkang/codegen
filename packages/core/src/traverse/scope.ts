/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-02-02 16:40:53
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-10 14:12:05
 * @Description:
 */
import { PageCode, IScope } from '@codegen/types'

export default class Scope implements IScope {
  connectors: Map<string, object>
  components: Map<string, object>
  dialogs: Map<string, object>
  drawers: Map<string, object>
  pageCode: PageCode

  constructor() {
    // 连接器
    this.connectors = new Map()
    // 当前页面引用的组件
    this.components = new Map()
    // 当前页面引用的弹框
    this.dialogs = new Map()
    // 当前页面引用的drawer
    this.drawers = new Map()

    // 当前页面出码使用的数据
    this.pageCode = {
      name: '',
      template: '',
      imports: new Set<string>(),
      components: new Set<string>(),
      props: new Map<string, object>(),
      data: new Map<string, object>(),
      dataFuncs: new Set<string>(),
      created: new Set<string>(),
      mounted: new Set<string>(),
      methods: new Set<string>(),
      styles: new Set<string>()
    }
  }

  addPageCode(key: string, val: string | object) {
    const code = this.pageCode

    if (['name', 'template'].includes(key)) {
      code[key] = val
    }

    if (
      [
        'imports',
        'components',
        'dataFuns',
        'created',
        'mounted',
        'methods'
      ].includes(key)
    ) {
      if (!Array.isArray(val)) {
        throw new Error(`scope.addPageCode 失败，${key}只接收数组类型数据!`)
      }

      code[key].add(val)
    }

    if (['props', 'data'].includes(key)) {
      if (typeof val !== 'object') {
        throw new Error(`scope.addPageCode 失败，${key}只接收object类型数据!`)
      }

      const obj = code[key]
      Object.keys(val).forEach(subKey => {
        if (obj.has(subKey)) {
          const original = obj.get(subKey)
          obj.add(subKey, {
            ...original,
            ...val[subKey]
          })
        } else {
          obj.add(subKey, val[subKey])
        }
      })
    }
  }
}
