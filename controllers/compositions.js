const composition = require('../models/composition');

function compositionsIndex(req, res, next) {
  composition
    .find({ private: false })
    .exec()
    .then(compositions => res.json(compositions))
    .catch(next);
}

function compositionsCreate(req, res, next) {
  composition
    .create({...req.body, createdBy: req.currentUser.id})
    .then(composition => res.status(201).json(composition))
    .catch(next);
}

function compositionsShow(req, res, next) {
  composition
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then((composition) => {
      if(!composition) return res.notFound();
      res.json(composition);
    })
    .catch(next);
}

function compositionsUpdate(req, res, next) {
  composition
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(composition => res.status(200).json(composition))
    .catch(next);
}

function compositionsDelete(req, res, next) {
  composition
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: compositionsIndex,
  create: compositionsCreate,
  show: compositionsShow,
  update: compositionsUpdate,
  delete: compositionsDelete
};
