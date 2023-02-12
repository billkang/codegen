/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-02-09 10:53:37
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-11 15:32:24
 */
import { COMPONENT_NAME, ASTNode } from '@codegen/types'
import { registrerComponentDef } from '@codegen/shared'
import { FormBaseDef } from '@codegen/plugin-library-base'

class FormDef extends FormBaseDef {
  constructor(node: ASTNode) {
    super(node)

    this.ejsTemplate = '<van-form class="el-form"><%= children %></van-form>'
  }
}

registrerComponentDef(COMPONENT_NAME.FORM, FormDef)
