/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-02-09 10:53:37
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-10 15:13:12
 */
import { ASTNode } from '@codegen/types'
import { ComponentDefine } from '@codegen/shared'

export class PageBaseDef extends ComponentDefine {
  constructor(node: ASTNode) {
    super(node)

    this.isBlock = true
  }

  parseImports(): void {}
  parseComponents(): void {}
}
