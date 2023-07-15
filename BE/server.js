const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");



// per leggere le variabili d'ambiente SERVE QUESTO PACCHETTO PER  PROBLEMI SI SICUREZZA
require("dotenv").config();

const app = express();
app.use(cors());




// connessione al DB
mongoose.connect(process.env.MONGO_KEY);


const db = mongoose.connection;
db.on("error", (error) => console.error(error));// se c'è un errore
db.once("open", () => console.log("Connessione al DB avvenuta con successo!"));// se la connessione è avvenuta con successo solo una volta


// import delle routes
const Post = require("./routes/routePost.js");
const User = require("./routes/routeUser.js");

// middleware
app.use(express.json());

const validationToken = require("./middleware/middJWT.js");



// routes
app.use("/", User);
app.use("/", validationToken, Post);




// avvio del server
app.listen(3003, () => console.log("Server avviato con successo!"));
  