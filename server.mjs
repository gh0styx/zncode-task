import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '127.0.0.1';
const port = Number(process.env.PORT || 3000);
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

await app.prepare();

const httpServer = createServer((req, res) => handle(req, res));
const io = new Server(httpServer, {
  cors: { origin: '*' },
  path: '/socket.io'
});

const sessions = new Set();

io.on('connection', (socket) => {
  sessions.add(socket.id);
  io.emit('sessions:count', sessions.size);

  socket.on('disconnect', () => {
    sessions.delete(socket.id);
    io.emit('sessions:count', sessions.size);
  });
});

httpServer.listen(port, hostname, () => {
  console.log(`Inventory app ready on http://${hostname}:${port}`);
});
