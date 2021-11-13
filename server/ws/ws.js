const WebSocket = require('ws');

const configureWS = (server) => {
    const wss = WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        ws.on('message', (message, isBinary) => {

            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(message);
                }
              });

        });
    });
}

module.exports = configureWS;