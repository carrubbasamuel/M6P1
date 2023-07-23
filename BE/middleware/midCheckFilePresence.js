const upload = require('../middleware/midMulter');


const checkFilePresence = (req, res, next) => {
  if (typeof req.body.coverImg === 'string') {
    return next();
  }

  upload.single('coverImg')(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
    if (req.file) {
      req.file.secure_url = req.file.path;
    }
    
    next();
  });
};

module.exports = checkFilePresence;
