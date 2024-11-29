const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3002;

const routes = require("./routes/api");
const routesGastos = require("./routes/routeGastos");
const routeMascota = require("./routes/routeMascota");
const routeClients = require("./routes/routeClients");

(async () => {
  // Conectar a la base de datos antes de iniciar el servidor
  await connectDB();

  // Configuración de CORS
  const allowedOrigins = [
    "http://localhost:3000",
    "https://frontend-app-peluqueria.vercel.app"
  ];
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };

  // Middlewares
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan("tiny"));

  // Rutas
  app.use("/api", routes);
  app.use("/api", routesGastos);
  app.use("/api", routeMascota);
  app.use("/api", routeClients);

  // Solo iniciamos el servidor si no estamos en entorno de pruebas
  if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
      console.log(`Server is starting at ${PORT}`);
    });
  }
})();

// Exportamos la aplicación para pruebas
export default app;
