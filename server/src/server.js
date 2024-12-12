// libraries
const express = require("express");
const path = require("path");
const fs = require("fs");
const fsPromise = require("fs").promises;
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
require("dotenv").config("./.env");
require("./database");
const credentials = require("./middlewares/credentials");
const corsOptions = require("./middlewares/corsOptions");
const cookieParser = require("cookie-parser");
const logEvents = require("./middlewares/logEvents");
const verifyJWT = require("./middlewares/verifyJWT");
const routes = require("./routes");
//
// extensions
const app = express();
const PORT = process.env.PORT || 9999;

// Middleware to secure HTTP headers
app.use(helmet());

// Rate limiting middleware for security (adjust the rate limits as needed)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,  // Limit to 100 requests per IP
  message: "Too many requests from this IP, please try again later"
});

// middlewares
app.use(limiter);
app.use(compression());
if (process.env.NODE_ENV === "production") {
  app.use(logger("combined", {
    stream: fs.createWriteStream(path.join(__dirname, "logs", "access.log"), { flags: "a" })
  }));
} else {
  // Use 'dev' logging for development
  app.use(logger("dev"));
}
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  logEvents(
    `${req.headers.host}\t${req.method}\t${req.headers.origin}\t${req.url}`,
    "reqLog.txt"
  );
  next();
});
//app.use(verifyJWT);
app.use("/api/v1", routes);
app.use(express.static(path.join(__dirname, "files"), {
  maxAge: "1d",  // Cache for 1 day in production
  setHeaders: (res, path) => {
    if (path.endsWith(".html")) {
      res.set("Cache-Control", "public, max-age=0, must-revalidate");
    }
  }
}));

// Catch-all 404 handler for missing routes
app.use((req, res, next) => {
  res.status(404).json({ message: "[SERVER] Not Found" });
});
// General error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "[SERVER] Something went wrong!" });
});
//
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode at PORT: ${PORT}`);
});
