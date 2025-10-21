import Component, { html } from '@/component'
import '@/history-router'
import '~/pages/camera-view'
import '~/pages/display-view'

customElements.define('main-content', class extends Component {
  render() {
    return html`${this.router = html`
      <history-router>
        <template slot="\\/display"><display-view></display-view></template>
        <template slot="\\/"><camera-view></camera-view></template>
      </history-router>`.elem}`
  }
})
