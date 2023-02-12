/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-01-31 16:14:29
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-11 15:31:25
 * @Description:
 */
import { template } from 'lodash';
const componentDefinationMap = new Map();
export class ComponentDefine {
    constructor(node) {
        this.node = node;
        this.isBlock = false;
        this.ejsTemplate = '';
        this.template = '';
    }
    parseTemplate(childrenTemplates) {
        const props = {
            children: childrenTemplates.join('')
        };
        childrenTemplates.forEach((child, idx) => {
            props[`children_$${idx}`] = child;
        });
        const compileFunc = template(this.ejsTemplate);
        this.template = compileFunc(Object.assign({}, props));
    }
    parseAttrs() { }
    parseProps() { }
    parseData() { }
    parseCreated() { }
    parseMounted() { }
    parseMethods() { }
    parseStyles() { }
    getCompiledCode(children) {
        this.parseImports();
        this.parseComponents();
        this.parseTemplate(children);
        this.parseAttrs();
        this.parseProps();
        this.parseData();
        this.parseCreated();
        this.parseMounted();
        this.parseMethods();
        this.parseStyles();
        const { template, imports, components, props, data, created, mounted, methods, styles } = this;
        return {
            template,
            imports,
            components,
            props,
            data,
            created,
            mounted,
            methods,
            styles
        };
    }
}
export function registrerComponentDef(compName, compDef) {
    componentDefinationMap.set(compName, compDef);
}
export function getComponentDefByName(compName) {
    return componentDefinationMap.get(compName);
}
