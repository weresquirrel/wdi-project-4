const router = require('express').Router();
// const secureRoute = require('../lib/secureRoute');
const compositions = require('../controllers/compositions');
const auth = require('../controllers/auth');

// routes go here
router.route('/compositions')
  .get(compositions.index)
  .post(compositions.create);

router.route('/compositions/:id')
  .get(compositions.show)
  .put(compositions.update)
  .delete(compositions.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
