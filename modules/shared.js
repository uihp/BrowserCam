import { SIGNAL_URL } from '~/site'

export const globalStates = new Map()
export const globalPromises = new Map()
export const globalResolvers = new Map()
export const globalComponents = new Map()

export const peerConn = new Proxy({
  value: new RTCPeerConnection(),
  reconnect() {
    this.value = new RTCPeerConnection()
    websocket.connect()
  }
}, {
  get(target, prop, receiver) {
    let val = Reflect.get(target.value, prop, target.value)
    if (typeof val === 'function') val = val.bind(target.value)
    return val ?? Reflect.get(target, prop, receiver)
  }
})

export const websocket = new Proxy({
  value: {},
  listen: new AbortController(),
  connected: Promise.withResolvers(),
  connect() {
    if (this.value instanceof WebSocket) this.value.close()
    this.listen.abort()
    this.listen = new AbortController()
    this.value = new WebSocket(SIGNAL_URL)
    this.value.addEventListener('error', () => this.connect(), { signal: this.listen.signal })
    this.value.addEventListener('open', () => {
      peerConn.addEventListener('icecandidate', ({ candidate }) => {
        this.value.send(JSON.stringify({ type: 'candidate', candidate}))
      })
      this.value.addEventListener('message', async event => {
        const message = JSON.parse(event.data)
        if (message.type !== 'answer') return
        await peerConn.setRemoteDescription(new RTCSessionDescription(message))
      })
      this.value.addEventListener('message', event => {
        const message = JSON.parse(event.data)
        if (message.type !== 'candidate') return
        if (!message.candidate) return
        peerConn.addIceCandidate(new RTCIceCandidate(message.candidate))
      })
      this.connected.resolve()
      this.connected = Promise.withResolvers()
    }, { signal: this.listen.signal })
    this.value.addEventListener('close', e => alert(`websocket closed: ${e.code} ${e.reason} ${e.wasClean}`), { signal: this.listen.signal })
    setTimeout(() => this.value.readyState !== WebSocket.OPEN && this.connect(), 200)
  }
}, {
  get(target, prop, receiver) {
    let val = Reflect.get(target.value, prop, target.value)
    if (typeof val === 'function') val = val.bind(target.value)
    return val ?? Reflect.get(target, prop, receiver)
  }
})

websocket.connect()
