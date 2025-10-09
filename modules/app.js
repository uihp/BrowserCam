import Component, { html, css } from 'radical-web/component'
import '~/layouts/main-content'

window.addEventListener('load', () => 'serviceWorker' in navigator && navigator.serviceWorker.register('/sw.js'))

customElements.define('browsercam-app', class extends Component {
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }`
  render() {
    return html`<main-content></main-content>`
  }
})

// alert('[VI]Version: {version} - built on {date}[/VI]')
