import { WebSocketServer , WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

interface room {
    Socket  : WebSocket[] //create a websockcer array which contatin the interface array 

}
const rooms : Record<string, room> = {

}
wss.on('connection', (ws) => {
	console.log('New client connected');

	ws.on('message', function message(data : string) {
            const parsedData = JSON.parse(data);
            if(parsedData.type == "join-room"){
                const room = parsedData.room;
                if(!rooms[room]){
                    rooms[room] ={
                        Socket : []
                    }
                }

                rooms[room].Socket.push(ws);
            }

            if(parsedData.type == "chat"){
                const room = parsedData.room;
                rooms[room]?.Socket.map(socket => socket.send(data))
            }

    });

	ws.on('close', () => {
		console.log('Client disconnected');
	});

	ws.on('error', (err) => {
		console.error('WebSocket error:', err);
	});

    ws.send("something");
});

console.log('WebSocket server is running on ws://localhost:8080');

