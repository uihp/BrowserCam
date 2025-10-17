import Component, { html, css } from '@radical-web/practice/component'
import { websocket, peerConn } from '~/shared'

customElements.define('display-view', class extends Component {
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }`
  preparing = websocket.connected.promise
  onMounted() {
    websocket.addEventListener('message', async event => {
      const message = JSON.parse(event.data)
      if (message.type !== 'offer') return
      await peerConn.setRemoteDescription(new RTCSessionDescription(message))
      const sessionDesc = await peerConn.createAnswer()
      await peerConn.setLocalDescription(sessionDesc)
      websocket.send(JSON.stringify(sessionDesc))
    })
    peerConn.addEventListener('track', event => {
      this.cameraVideo.srcObject = new MediaStream([event.track])
    })
  }
  render() {
    return html`${this.cameraVideo = html`<video class="h-full w-full" autoplay muted></video>`.elem}`
  }
})
