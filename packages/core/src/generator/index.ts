/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-02-07 08:43:25
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-10 15:22:48
 */
import { ASTNode, Framework, IScope } from '@codegen/types'

async function walk(ast: ASTNode, generatePage: (arg0: IScope) => any) {
  if (ast.__compiled_scope) {
    return generatePage(ast.__compiled_scope)
  }
}

export default async function generator(
  ast: ASTNode,
  framework: Framework
): Promise<string> {
  const { default: generatePage } = await import(
    `@codegen/plugin-framework-${framework}`
  )

  return walk(ast, generatePage)
}
