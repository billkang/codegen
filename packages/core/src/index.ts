/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-01-31 15:09:30
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-10 15:21:48
 * @Description:
 */
import { isEmpty } from 'lodash'
import { COMPONENT_NAME, ASTNode, CodegenOption } from '@codegen/types'
import traverse from './traverse'
import generator from './generator'

function filterUselessProps(node: ASTNode): ASTNode {
  const obj: ASTNode = {
    props: {}
  }
  const propBlackList = ['id', 'instanceId', '_isWhole', 'props', 'icon']

  Object.keys(node).forEach(key => {
    if (!propBlackList.includes(key) && !isEmpty(node[key])) {
      if (key === 'componentName') {
        obj[key] = replaceComponentName(node[key]!)
      } else {
        obj[key] = node[key]
      }
    }
  })

  if (node.props) {
    Object.keys(node.props).forEach(key => {
      if (!propBlackList.includes(key) && !isEmpty(node.props[key])) {
        obj.props[key] = node.props[key]
      }
    })
  }

  return obj
}

function replaceComponentName(name: string): string {
  return name.replace('LcM', '').replace('Lc', '')
}

// 过滤掉无意义的节点
export function filterEmptyChildren(children: ASTNode[]): ASTNode[] {
  return children
    .filter((child: ASTNode) => {
      if (!isEmpty(child.props.children)) {
        child.props.children = filterEmptyChildren(child.props.children!)
        return !isEmpty(child.props.children)
      } else if (
        replaceComponentName(child.componentName!) === COMPONENT_NAME.ROWER
      ) {
        return false
      }

      return true
    })
    .map(child => filterUselessProps(child))
}

function wrapPage(children: ASTNode[]): ASTNode {
  return {
    componentName: COMPONENT_NAME.PAGE,
    props: {
      children
    }
  }
}

export default async function codegen(
  children: ASTNode[],
  { framework = 'vue2', library = 'element-ui' }: CodegenOption
): Promise<string> {
  const filterChildren = filterEmptyChildren(children)
  const pageAst = wrapPage(filterChildren)

  await traverse(pageAst, library)

  return generator(pageAst, framework)
}
