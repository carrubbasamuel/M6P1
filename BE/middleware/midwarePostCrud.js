const User = require('../models/SchemaUser');
const SchemaPost = require('../models/SchemaPost');

const elementExistUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: `User with id ${id} not found!`,
      });
    } else {
      req.middle = user;
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};

const elementExistPost = async (req, res, next) => {
    const { id } = req.params;
    try {
        const post = await SchemaPost.findById(id);
        if (!post) {
            return res.status(404).send({
                statusCode: 404,
                message: `Post with id ${id} not found!`,
            });
        } else {
            req.middle = post;
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
        });
    }
};


module.exports = {

    elementExistUser,
    elementExistPost,

}
