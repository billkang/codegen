import { ASTNode } from '@codegen/types'

export default class NodePath {
  node: ASTNode
  parentPath: NodePath | undefined

  constructor(node: ASTNode, parentPath?: NodePath) {
    this.node = node
    this.parentPath = parentPath
  }
}
