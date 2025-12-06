const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Configurar CORS para permitir todas las solicitudes (en desarrollo)
server.use(cors({
  origin: '*', // Permitir desde cualquier origen (cámbialo en producción)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Para manejar solicitudes preflight OPTIONS
server.options('*', cors());

// Middlewares por defecto de json-server
server.use(middlewares);

// Para analizar el cuerpo de las solicitudes
server.use(jsonServer.bodyParser);

// Ruta para verificar el estado del servidor
server.get('/status', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date().toISOString() });
});

// Usar el router de json-server
server.use(router);

// Puerto de Render o local
const PORT = process.env.PORT || 10000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
  console.log(`CORS enabled for all origins`);
});
