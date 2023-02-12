/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-02-03 09:10:07
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-12 10:59:41
 */
const config = require('../../jest.config')

module.exports = {
  ...config,
  setupFilesAfterEnv: ['./packages/core/__tests__/setup/index.ts'],
  testMatch: ['**/__tests__/?(*.)+(spec|test).[jt]s?(x)']
}
