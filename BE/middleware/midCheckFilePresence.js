const upload = require('../middleware/midMulter');

// Middleware personalizzato per verificare la presenza del file
const checkFilePresence = (req, res, next) => {
    if (typeof req.body.coverImg === 'string') {
      // Il campo "coverImg" è una stringa, quindi non è stato inviato un file
      // Passa direttamente al successivo middleware
      return next();
    }
    // Il file è presente, prosegui con l'upload utilizzando il middleware upload.single('coverImg')
    return upload.single('coverImg')(req, res, next);
  };

  module.exports = checkFilePresence;