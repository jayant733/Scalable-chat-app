import { WebSocketServer , WebSocket } from "ws";

const wss = new WebSocketServer();

wss.on('connection' , function connection(ws){
        ws.on('error', () =>{
            console.log("error")
        })

        ws.on('message', function message(data :string){
            
        })
})