/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-02-09 10:53:37
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-10 15:17:43
 * @FilePath: \lcds-app\codegen\src\traverse\visitors\element-ui\form.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { COMPONENT_NAME, ASTNode } from '@codegen/types'
import { registrerComponentDef } from '@codegen/shared'
import { RowerBaseDef } from '@codegen/plugin-library-base'

class RowerDef extends RowerBaseDef {
  constructor(node: ASTNode) {
    super(node)

    this.ejsTemplate = '<div class="lc-rower"><%= children %></div>'
  }
}

registrerComponentDef(COMPONENT_NAME.ROWER, RowerDef)
