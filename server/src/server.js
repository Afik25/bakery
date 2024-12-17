// --- 1. Chargement des bibliothèques et des configurations ---
require("dotenv").config("./.env");
require("./database"); // Connexion à la base de données
//
const express = require("express");
const path = require("path");
const fs = require("fs");
const fsPromise = require("fs").promises;
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const https = require("https");
const http = require("http");
//
const credentials = require("./middlewares/credentials");
const corsOptions = require("./middlewares/corsOptions");
const cookieParser = require("cookie-parser");
const logEvents = require("./middlewares/logEvents");
const verifyJWT = require("./middlewares/verifyJWT");
const routes = require("./routes");

// --- 2. Initialisation de l'application Express ---
const app = express();
const HTTP_PORT = process.env.PORT || 9999; // Port pour HTTP (par défaut 9999)
const HTTPS_PORT = process.env.PORT || 9999; // Port pour HTTPS (en production)

// --- 3. Mise en place des middlewares de sécurité ---
app.use(helmet()); // Middleware de sécurité pour sécuriser les en-têtes HTTP

// Limitation du nombre de requêtes (Rate Limiting)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite à 100 requêtes par IP
  message:
    "Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard",
});
app.use(limiter);

// Compression des réponses pour optimiser la bande passante
app.use(compression());

// --- 4. Configuration du logging ---
if (process.env.NODE_ENV === "production") {
  app.use(
    logger("combined", {
      stream: fs.createWriteStream(path.join(__dirname, "logs", "access.log"), {
        flags: "a",
      }),
    })
  );
} else {
  app.use(logger("dev")); // Utilisation du logger "dev" en mode développement
}

// --- 5. Mise en place des middlewares de traitement des requêtes ---
app.use(credentials); // Middleware pour gérer les credentials (authentification)
app.use(cors(corsOptions)); // Middleware pour gérer les CORS (Cross-Origin Resource Sharing)
app.use(express.urlencoded({ extended: true })); // Middleware pour parser les données URL-encoded
app.use(express.json()); // Middleware pour parser les données JSON
app.use(cookieParser()); // Middleware pour parser les cookies

// --- 6. Middleware personnalisé pour le logging des requêtes ---
app.use((req, res, next) => {
  logEvents(
    `${req.headers.host}\t${req.method}\t${req.headers.origin}\t${req.url}`,
    "reqLog.txt"
  );
  next();
});

// --- 7. Middleware de redirection HTTPS en production ---
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    console.log({
      "req.protocol": req.protocol,
      "req.headers.host": req.headers.host,
      "req.url": req.url,
    });
    if (req.protocol !== "https") {
      return res.redirect(301, "https://" + req.headers.host + req.url);
    }
    next();
  });
}

// --- 8. Définition des routes ---
app.use("/api/v1", routes); // Routes de l'API

// --- 9. Mise en place des fichiers statiques ---
app.use(
  express.static(path.join(__dirname, "files"), {
    maxAge: "1d", // Cache pour 1 jour en production
    setHeaders: (res, path) => {
      if (path.endsWith(".html")) {
        res.set("Cache-Control", "public, max-age=0, must-revalidate");
      }
    },
  })
);

// --- 10. Gestion des erreurs : route 404 (non trouvé) ---
app.use((req, res, next) => {
  res.status(404).json({ message: "[SERVER] Not Found" });
});

// --- 11. Middleware pour gestion des erreurs internes du serveur ---
app.use((err, req, res, next) => {
  console.error({ "err.stack": err.stack });
  res.status(500).json({ message: "[SERVER] Something went wrong!" });
});

// --- 12. Configuration HTTPS ---
if (process.env.NODE_ENV === "production") {
  // Lire les fichiers du certificat SSL
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/mariathe.com/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/mariathe.com/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/mariathe.com/chain.pem",
    "utf8"
  );

  const credentialsSSL = { key: privateKey, cert: certificate, ca: ca };

  // Créer le serveur HTTPS
  https.createServer(credentialsSSL, app).listen(HTTPS_PORT, () => {
    console.log(
      `HTTPS Server running int ${process.env.NODE_ENV} at https://${process.env.PROD_DB_HOST}:${HTTPS_PORT}`
    );
  });
} else {
  // En mode développement, démarrer un serveur HTTP classique
  app.listen(HTTP_PORT, () => {
    console.log(
      `HTTP Server running in ${process.env.NODE_ENV} mode at PORT: ${HTTP_PORT}`
    );
  });
}
