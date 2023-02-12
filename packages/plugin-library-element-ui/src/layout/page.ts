/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-02-09 10:53:37
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-10 15:17:04
 */
import { COMPONENT_NAME, ASTNode } from '@codegen/types'
import { registrerComponentDef } from '@codegen/shared'
import { PageBaseDef } from '@codegen/plugin-library-base'

class PageDef extends PageBaseDef {
  constructor(node: ASTNode) {
    super(node)

    this.ejsTemplate = '<div class="page-container"><%= children %></div>'
  }
}

registrerComponentDef(COMPONENT_NAME.PAGE, PageDef)
