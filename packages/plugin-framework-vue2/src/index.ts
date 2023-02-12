/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-02-09 17:48:38
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-10 15:47:53
 */
import prettier from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'
import parserHtml from 'prettier/parser-html'
import { IScope } from '@codegen/types'
import { template } from 'lodash'

// 使用prettier对vue代码进行格式化操作
export function formatCompiledCode(code: string) {
  try {
    return prettier.format(code, {
      parser: 'vue',
      plugins: [parserBabel, parserHtml]
    })
  } catch (e) {
    return code
  }
}

const compilePage = template(`
<template>
<%= template %>
</template>

<script>
<%= imports %>

export default {
  name: '<%= name %>',
  components: {
    <%= components %>
  },
  props: {
    <%= props %>
  },
  data() {
    <%= dataFuncs %>

    return {
      <%= data %>
    }
  },
  created() {
    <%= created %>
  },
  mounted() {
    <%= mounted %>
  },
  methods: {
    <%= methods %>
  }
}
</script>

<style lang="scss" scoped>
<%= styles %>
</style>
`)

export default function generatoPage(scope: IScope): string {
  const {
    name,
    template,
    imports,
    components,
    props,
    dataFuncs,
    data,
    created,
    mounted,
    methods,
    styles
  } = scope.pageCode

  const pageCode = compilePage({
    name,
    template,
    imports: [...imports].join('\n'),
    components: [...components].join('\n'),
    props: [...props.values()].join('\n'),
    data: [...data.values()].join('\n'),
    dataFuncs: [...dataFuncs].join('\n'),
    created: [...created].join('\n'),
    mounted: [...mounted].join('\n'),
    methods: [...methods].join('\n'),
    styles: [...styles].join('\n')
  })

  return formatCompiledCode(pageCode)
}
