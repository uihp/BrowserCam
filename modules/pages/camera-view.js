import Component, { html, css } from '@/component'
import { websocket, peerConn } from '~/shared'

customElements.define('camera-view', class extends Component {
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }`
  isRear = false
  async onMounted() {
    if (!this.sender) await websocket.connected.promise
    const stream = await window.navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: this.isRear ? 'environment' : 'user' } } })
    this.cameraVideo.srcObject = stream
    this.cameraVideo.play()
    const [track] = stream.getTracks()
    if (!this.sender) {
      this.sender = peerConn.addTrack(this.track = track)
      const sessionDesc = await peerConn.createOffer()
      await peerConn.setLocalDescription(sessionDesc)
      websocket.send(JSON.stringify(sessionDesc))
    } else this.sender.replaceTrack(this.track = track)
  }
  zoom() {
    const zoom = this.zoomSlider.value > 1 ? (this.zoomSlider.value-1)*8+1 : this.zoomSlider.value
    this.track.applyConstraints({ advanced: [{ zoom }] })
  }
  switch() {
    this.isRear = !this.isRear
    this.remount()
  }
  reconnect() {
    peerConn.reconnect()
    this.sender = null
    this.remount()
  }
  render() {
    return html`
      ${this.cameraVideo = html`<video class="h-full w-full" autoplay muted></video>`.elem}
      <md-icon-button class="absolute top-10 ml-10" @click="${this.switch.bind(this)}"><md-icon>cameraswitch</md-icon></md-icon-button>
      <md-icon-button class="absolute top-10 right-0 mr-10" @click="${this.reconnect.bind(this)}"><md-icon>replay</md-icon></md-icon-button>
      ${this.zoomSlider = html`<md-slider class="absolute bottom-10 w-full px-10" min="${this.isRear ? 0.5 : 1}" max="1.5" value="1" step="0.001" @input="${this.zoom.bind(this)}"></md-slider>`.elem}`
  }
})
