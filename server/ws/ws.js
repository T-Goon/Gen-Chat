const WebSocket = require('ws');

const configureWS = (server) => {
    const wss = WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        ws.on('message', (message, isBinary) => {
            console.log(message.toString(), isBinary);
        });
    });
}

module.exports = configureWS;