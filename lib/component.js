import Component from '@radical-web/global-module/component'
import installTwind from "@twind/with-web-components"
import { defineConfig } from "@twind/core"
import presetAutoprefix from "@twind/preset-autoprefix"
import presetTailwind from "@twind/preset-tailwind"
export * from '@radical-web/global-module/component'

const presetRemToPx = ({ baseValue = 16 } = {}) => {
  return {
    finalize(rule) {
      return {
        ...rule,
        d: rule.d?.replace(
          /"[^"]+"|'[^']+'|url\([^)]+\)|(-?\d*\.?\d+)rem/g,
          (match, p1) => {
            if (p1 === undefined) return match
            return `${p1 * baseValue}${p1 == 0 ? "" : "px"}`
          }
        )
      }
    }
  }
}

export default installTwind(defineConfig({
  hash: false,
  presets: [presetAutoprefix(), presetTailwind(), presetRemToPx()]
}))(Object.defineProperty(Component, 'withoutTailwind', { value: Component }))
