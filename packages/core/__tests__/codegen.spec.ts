/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-02-03 09:22:30
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-12 10:37:06
 */
import path from 'path'
import fs from 'fs'
import fse from 'fs-extra'
import codegen, { filterEmptyChildren } from '../src/index'

const sourceAst = fse.readJSONSync(
  path.resolve(__dirname, 'mock/source_ast.json')
)

describe('codegen test', () => {
  test('filterEmptyChildren should works ok', async () => {
    const ast = filterEmptyChildren(sourceAst)
    const filterAst = fse.readJSONSync(
      path.resolve(__dirname, 'mock/filter_ast.json')
    )

    expect(JSON.stringify(ast)).toBe(JSON.stringify(filterAst))
  })

  test('codegen should works ok, framework is vue2, library is element-ui', async () => {
    const ret = await codegen(sourceAst, {
      framework: 'vue2',
      library: 'element-ui'
    })

    const elementUIString = fs.readFileSync(
      path.resolve(__dirname, 'mock/element-ui.txt'),
      'utf-8'
    )

    expect(ret).toBe(elementUIString)
  })

  test('codegen should works ok, framework is vue2, library is vant', async () => {
    const ret = await codegen(sourceAst, {
      framework: 'vue2',
      library: 'vant'
    })

    const vantString = fs.readFileSync(
      path.resolve(__dirname, 'mock/vant.txt'),
      'utf-8'
    )

    expect(ret).toBe(vantString)
  })
})
