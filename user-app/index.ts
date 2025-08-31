import { WebSocketServer , WebSocket as WebSocketwstype } from 'ws';

const port =8085
const wss = new WebSocketServer({ port : port});
interface room {
    Socket  : WebSocketwstype[]//create a websockcer array which contatin the interface array 

}
const rooms : Record<string, room> = {

}

const RELAYER_URL = "ws://localhost:8083"
const relayerSocket = new WebSocket(RELAYER_URL);

relayerSocket.onmessage = ({data}) =>{
   
            const parsedData = JSON.parse(data);

            if(parsedData.type == "chat"){
                const room = parsedData.room;
                rooms[room]?.Socket.map(socket => socket.send(data))
            }
        
    
}


wss.on('connection', (ws) => {
	console.log('New client connected');
    
   
    ws.on('message' , function message(data : string){

           const parsedData = JSON.parse(data);
            console.log(data);
            if(parsedData.type == "join-room"){
                const room = parsedData.room;
                if(!rooms[room]){
                    rooms[room] ={
                        Socket : []
                    }
                }

                rooms[room].Socket.push(ws);
            }
        relayerSocket.send(data)
    })
    });


	

  


console.log(`WebSocket server is running on ${port}`);

