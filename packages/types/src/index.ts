/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-02-02 17:36:29
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-10 14:10:10
 * @Description:
 */
export enum COMPONENT_NAME {
  PAGE = 'Page',
  ROWER = 'Rower',
  FORM = 'Form',
  INPUT = 'Input'
}

export type PageCode = {
  name: string
  template: string
  imports: Set<string>
  components: Set<string>
  props: Map<string, object>
  data: Map<string, object>
  dataFuncs: Set<string>
  created: Set<string>
  mounted: Set<string>
  methods: Set<string>
  styles: Set<string>
}

export interface IScope {
  connectors: Map<string, object>
  components: Map<string, object>
  dialogs: Map<string, object>
  drawers: Map<string, object>
  pageCode: PageCode

  addPageCode(key: string, val: string | object): void
}

export type ASTNode = {
  componentName?: string
  props: {
    children?: ASTNode[]
  }
  __compiled_scope?: IScope
}

export type Framework = 'vue2' | 'vue3' | 'react'
export type Library = 'element-ui' | 'vant' | 'antd'

export type CodegenOption = {
  framework: Framework
  library: Library
}
