/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-01-31 14:45:44
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-12 10:45:56
 * @Description:
 */
import { ASTNode, Library, IScope } from '@codegen/types'
import { getComponentDefByName } from '@codegen/shared'
import NodePath from './node-path'
import Scope from './scope'

function transformer(node: ASTNode, parentPath?: NodePath, scope?: IScope) {
  const CompDef = getComponentDefByName(node.componentName!)
  let localScope = scope

  if (CompDef) {
    const path = new NodePath(node, parentPath)
    const compInstance = new CompDef(node)

    if (compInstance.isBlock) {
      localScope = new Scope()
    }

    let template: string = ''
    const childrenTemplates: string[] = []
    node.props.children?.forEach(child => {
      const template = transformer(child, path, localScope)
      template && childrenTemplates.push(template)
    })

    const res = compInstance.getCompiledCode(childrenTemplates)
    Object.keys(res).forEach(key => {
      const val = res[key]
      if (val) {
        if (key === 'template') {
          template = val
        } else {
          localScope!.addPageCode(key, val)
        }
      }
    })

    if (compInstance.isBlock) {
      localScope!.addPageCode('name', '')
      localScope!.addPageCode('template', template)
      node.__compiled_scope = localScope
    }

    return template
  }
}

export default async function traverse(pageAst: ASTNode, library: Library) {
  await import(`@codegen/plugin-library-${library}`)

  transformer(pageAst)
}
