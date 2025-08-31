import { WebSocketServer , WebSocket } from "ws";

const relay = new WebSocketServer({port : 8083});

let server1socket : WebSocket | null = null;
let server2socket : WebSocket | null = null; 

const servers : WebSocket[] =[]

relay.on('connection' , function connection(ws){
        ws.on('error', () =>{
            console.log("error")
        })

        servers.push(ws)


        ws.on('message', function message(data :string){
            //whenever thers is a message i want to filtter that to othreserver
            servers.map(socket =>{
                socket.send(data);
            })

        })
})