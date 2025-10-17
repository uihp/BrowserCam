# Browser Camera with WebRTC
### Python package [`rtcam`](https://pypi.org/project/rtcam/) frontend

Use phone or any devices with browser supports [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) and stream your camera via it

# Signaling
It using WebSocket with JSON, message format below:

SDP Exchange (Offer/Answer): same as `RTCSessionDescriptionInit`, `{ type: "offer/anwser", sdp: "<SDP>" }`

ICE Candidate: `{ type: "candidate", candidate: RTCLocalIceCandidateInit | undefined }`

Signaling server only needs to boardcast any message received, simple signaling server code:
```python
from fastapi import WebSocket, WebSocketDisconnect
from fastapi import FastAPI
import json, asyncio

class ConnManager:
    sockets: list[WebSocket] = []
    @classmethod
    async def broadcast(cls, data, sender):
        await asyncio.gather(*[socket.send_json(data) for socket in cls.sockets if socket is not sender])

async def signal(websocket: WebSocket):
    await websocket.accept()
    ConnManager.sockets.append(websocket)
    try:
        while True:
            bus_data = json.loads(await websocket.receive_text())
            print(bus_data)
            await ConnManager.broadcast(bus_data, websocket)
    except WebSocketDisconnect: pass
    except Exception as err: print(err)
    ConnManager.sockets.remove(websocket)

app = FastAPI()
app.websocket('/signal')(signal)
```

# Usage
Build: `pnpm i && pnpm build`
Mount it on `nginx` or any other web server at `/` with **HTTPS enabled**
Open the site and use the cam
run the code and see the stream:
```python
import cv2
from rtcam import CameraThread
camera = CameraThread(f'wss://{signaling_server_addr}/signal')
camera.start()
while True:
    if camera.frame is None: continue
    cv2.imshow("Browser Camera", camera.frame.to_ndarray(format='bgr24'))
    if cv2.waitKey(1) == 27: break
```
Can also receive stream in browser at `/display` website path
