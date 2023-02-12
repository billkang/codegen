/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-02-09 10:53:37
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-10 15:16:00
 */
import { COMPONENT_NAME, ASTNode } from '@codegen/types'
import { registrerComponentDef } from '@codegen/shared'
import { InputBaseDef } from '@codegen/plugin-library-base'

class InputDef extends InputBaseDef {
  constructor(node: ASTNode) {
    super(node)

    this.ejsTemplate = '<van-input class="el-input" />'
  }
}

registrerComponentDef(COMPONENT_NAME.INPUT, InputDef)
