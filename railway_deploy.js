// RAILWAY INSTANT WEBSOCKET SERVER
const WebSocket = require('ws');
const express = require('express');
const app = express();
const server = require('http').createServer(app);

const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
  res.send('WebSocket Server Running!');
});

wss.on('connection', (ws, req) => {
  console.log('New connection:', req.url);
  
  ws.on('message', (data) => {
    console.log('Received data:', data.length, 'bytes');
    
    // Broadcast to all other clients
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
  
  ws.on('close', () => {
    console.log('Connection closed');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});