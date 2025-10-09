import Component, { html, css, attribute } from 'radical-web/component'
import { utils } from 'global-module'
import { typescaleStyles } from '@/material'

const TypescaleMixin = target => class extends target {
  onBeforeMount() {
    const targetRule = utils.itemSearch(typescaleStyles.cssRules[0].cssRules, rule => rule.selectorText === this.constructor.targetSelectorText)
    const hostStyle = css`:host {}`
    hostStyle.cssRules[0].style.setProperty('font', targetRule.style.getPropertyValue('font'), 'important')
    this.root.adoptedStyleSheets.push(hostStyle)
  }
}

customElements.define('mwc-typescale-p', class extends TypescaleMixin(Component.is(HTMLParagraphElement)) {
  @attribute() accessor title = false
  @attribute() accessor large = false
  @attribute() accessor small = false
  onBeforeMount() {
    const targetSelectorText = `.md-typescale-${this.title ? 'title' : 'body'}-${this.large ? 'large' : this.small ? 'small' : 'medium'}`
    this.constructor.targetSelectorText = `${targetSelectorText}, ${targetSelectorText}-prominent`
    super.onBeforeMount()
  }
  render() { return html`<slot></slot>` }
}, { extends: 'p' })

customElements.define('mwc-typescale-span', class extends TypescaleMixin(Component.is(HTMLSpanElement)) {
  @attribute() accessor large = false
  @attribute() accessor small = false
  onBeforeMount() {
    const targetSelectorText = `.md-typescale-label-${this.large ? 'large' : this.small ? 'small' : 'medium'}`
    this.constructor.targetSelectorText = `${targetSelectorText}, ${targetSelectorText}-prominent`
    super.onBeforeMount()
  }
  render() { return html`<slot></slot>` }
}, { extends: 'span' })

/* Heading Group */

customElements.define('mwc-typescale-h1', class extends TypescaleMixin(Component.is(HTMLHeadingElement)) {
  static targetSelectorText = '.md-typescale-display-large, .md-typescale-display-large-prominent'
  render() { return html`<slot></slot>` }
}, { extends: 'h1' })

customElements.define('mwc-typescale-h2', class extends TypescaleMixin(Component.is(HTMLHeadingElement)) {
  static targetSelectorText = '.md-typescale-display-medium, .md-typescale-display-medium-prominent'
  render() { return html`<slot></slot>` }
}, { extends: 'h2' })

customElements.define('mwc-typescale-h3', class extends TypescaleMixin(Component.is(HTMLHeadingElement)) {
  static targetSelectorText = '.md-typescale-display-small, .md-typescale-display-small-prominent'
  render() { return html`<slot></slot>` }
}, { extends: 'h3' })

customElements.define('mwc-typescale-h4', class extends TypescaleMixin(Component.is(HTMLHeadingElement)) {
  static targetSelectorText = '.md-typescale-headline-large, .md-typescale-headline-large-prominent'
  render() { return html`<slot></slot>` }
}, { extends: 'h4' })

customElements.define('mwc-typescale-h5', class extends TypescaleMixin(Component.is(HTMLHeadingElement)) {
  static targetSelectorText = '.md-typescale-headline-medium, .md-typescale-headline-medium-prominent'
  render() { return html`<slot></slot>` }
}, { extends: 'h5' })

customElements.define('mwc-typescale-h6', class extends TypescaleMixin(Component.is(HTMLHeadingElement)) {
  static targetSelectorText = '.md-typescale-headline-small, .md-typescale-headline-small-prominent'
  render() { return html`<slot></slot>` }
}, { extends: 'h6' })
