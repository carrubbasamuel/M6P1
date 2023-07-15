const jwt = require('jsonwebtoken');
const jwtSecretKey = 'ortigia'; // Sostituisci con la stessa chiave segreta usata nella generazione del JWT

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Ottieni il token dall'header "Authorization"
  if (!token) {
    return res.status(401).send({ statusCode: 401, message: 'Unauthorized' });
  }

  jwt.verify(token, jwtSecretKey, (err, decodedToken) => {
    if (err) {
      return res.status(401).send({ statusCode: 401, message: 'Invalid token' });
    }
    req.userId = decodedToken.userId; // Salva l'ID dell'utente dal token nella richiesta
    next();
  });
};

module.exports = verifyToken;
