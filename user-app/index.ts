import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
	console.log('New client connected');

	ws.on('message', (message) => {
		console.log(`Received message: ${message}`);
		// Echo the message back
		ws.send(`Server received: ${message}`);
	});

	ws.on('close', () => {
		console.log('Client disconnected');
	});

	ws.on('error', (err) => {
		console.error('WebSocket error:', err);
	});
});

console.log('WebSocket server is running on ws://localhost:8080');
