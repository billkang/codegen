/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-02-09 10:53:37
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-10 15:13:44
 * @FilePath: \lcds-app\codegen\src\traverse\visitors\element-ui\form.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ASTNode } from '@codegen/types'
import { ComponentDefine } from '@codegen/shared'

export class RowerBaseDef extends ComponentDefine {
  constructor(node: ASTNode) {
    super(node)
  }

  parseImports(): void {}

  parseComponents(): void {}
}
