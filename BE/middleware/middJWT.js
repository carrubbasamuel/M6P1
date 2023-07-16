const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.KEY_JWT; // Sostituisci con la stessa chiave segreta usata nella generazione del JWT

const verifyToken = (req, res, next) => {
  console.log('verifyToken');
  console.log(req.headers.authorization);

  const token = req.headers.authorization?.split(' ')[1]; // Ottieni il token dall'header "Authorization"

  if (!token) {
    console.log('No token');
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
