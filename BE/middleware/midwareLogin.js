const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SchemaUser = require('../models/SchemaUser');

const generateToken = (user) => {
  const jwtSecretKey = 'ortigia'; // Sostituisci con una chiave segreta sicura
  const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecretKey, {
    expiresIn: '1h', // Scadenza del token (1 ora)
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

    // Genera il JWT e invialo al client come parte della risposta
    const token = generateToken(user);

    // Includi il token nella risposta
    res.status(200).send({
      statusCode: 200,
      message: 'Login successfully',
      user,
      token,
    });
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: 'Internal server error', error });
  }
};

module.exports = bcrypterAuth;
