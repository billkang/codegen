/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-01-31 16:14:29
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-11 15:31:25
 * @Description:
 */
import { template } from 'lodash'
import { ASTNode } from '@codegen/types'

const componentDefinationMap = new Map()

export abstract class ComponentDefine {
  node: ASTNode
  isBlock: Boolean
  ejsTemplate: string

  template: string
  imports?: string[]
  components?: string[]
  props?: object
  data?: object
  dataFuns?: string[]
  created?: string[]
  mounted?: string[]
  methods?: string[]
  styles?: string[]

  constructor(node: ASTNode) {
    this.node = node
    this.isBlock = false
    this.ejsTemplate = ''
    this.template = ''
  }

  abstract parseImports(): void

  abstract parseComponents(): void

  parseTemplate(childrenTemplates: string[]) {
    const props: any = {
      children: childrenTemplates.join('')
    }
    childrenTemplates.forEach((child, idx) => {
      props[`children_$${idx}`] = child
    })

    const compileFunc = template(this.ejsTemplate)
    this.template = compileFunc({
      ...props
    })
  }

  parseAttrs() {}

  parseProps() {}

  parseData() {}

  parseCreated() {}

  parseMounted() {}

  parseMethods() {}

  parseStyles() {}

  getCompiledCode(children: string[]) {
    this.parseImports()
    this.parseComponents()
    this.parseTemplate(children)
    this.parseAttrs()
    this.parseProps()
    this.parseData()
    this.parseCreated()
    this.parseMounted()
    this.parseMethods()
    this.parseStyles()

    const {
      template,
      imports,
      components,
      props,
      data,
      created,
      mounted,
      methods,
      styles
    } = this

    return {
      template,
      imports,
      components,
      props,
      data,
      created,
      mounted,
      methods,
      styles
    }
  }
}

export function registrerComponentDef(
  compName: string,
  compDef: typeof ComponentDefine
): void {
  componentDefinationMap.set(compName, compDef)
}

export function getComponentDefByName(compName: string) {
  return componentDefinationMap.get(compName)
}
