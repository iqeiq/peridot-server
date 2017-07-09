require('dotenv').config()
const WebSocket = require('ws');
const uuid = require('node-uuid');


// constant 
const WEBSOCKET_PORT = process.env.PERIDOT_WEBSOCKET_PORT || process.env.PORT || 8080;


const wss = new WebSocket.Server({ port: WEBSOCKET_PORT });

wss.broadcast = (data, ws) => {
    wss.clients.forEach(client => {
        if(client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', (ws, req) => {
    ws.uuid = uuid.v4();
    console.log('connect:', ws.uuid, '/ ip =', req.connection.remoteAddress);
    ws.send(JSON.stringify({ type: 'hello', uuid: ws.uuid }));
    ws.on('message', (data) => {
        console.log('message:', data)
        wss.broadcast(data, ws)
    });
});
