/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-02-09 10:53:37
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-10 15:12:43
 */
import { ASTNode } from '@codegen/types'
import { ComponentDefine } from '@codegen/shared'

export class FormBaseDef extends ComponentDefine {
  constructor(node: ASTNode) {
    super(node)
  }

  parseImports(): void {}

  parseComponents(): void {}
}
