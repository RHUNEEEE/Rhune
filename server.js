const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Setup
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Host de 'public'-map (optioneel als je statische bestanden hebt)
app.use(express.static('public'));

// Socket.IO logica
io.on('connection', (socket) => {
    console.log('Een gebruiker is verbonden.');

    // Luister naar berichten van de client en stuur ze door
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Verstuur naar alle clients
    });

    socket.on('disconnect', () => {
        console.log('Een gebruiker heeft de verbinding verbroken.');
    });
});

// Start de server
const PORT = process.env.PORT || 3000; // Render gebruikt standaard een poort vanuit een omgeving (env)
server.listen(PORT, () => {
    console.log(`Server draait op poort ${PORT}`);
});
