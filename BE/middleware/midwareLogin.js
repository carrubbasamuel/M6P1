const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SchemaUser = require('../models/SchemaUser');

const generateToken = (user) => {
  const jwtSecretKey = process.env.KEY_JWT; // Sostituisci con una chiave segreta sicura
  const token = jwt.sign({
    userId: user._id,
    email: user.email
  }, jwtSecretKey, {
    expiresIn: '1h', // Scadenza del token (5 ore)
  });
  return token;
};


const bcrypterAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await SchemaUser.findOne({ email });

    if (!user) {
      return res.status(401).send({ statusCode: 401, message: 'Authentication failed' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).send({ statusCode: 401, message: 'Authentication failed' });
    }

    const token = generateToken(user);// Genera il JWT e invialo al client come parte della risposta

    // Includi il token nella risposta
    req.token = token;
    req.user = {
      _id: user._id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      born_date: user.born_date,
      avatar: user.avatar,
    }
    next();
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: 'Internal server error', error });
  }
};

module.exports = bcrypterAuth;
