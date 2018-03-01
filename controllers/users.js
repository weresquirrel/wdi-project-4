const composition = require('../models/composition');

function usersCompositionsIndex(req, res, next) {
  composition
    .find({ createdBy: req.params.userId })
    .exec()
    .then(compositions => res.json(compositions))
    .catch(next);
}

module.exports = {
  compositionsIndex: usersCompositionsIndex
};
