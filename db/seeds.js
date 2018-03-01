const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { db, env } = require('../config/environment');

const Composition = require('../models/composition');
const User = require('../models/user');


mongoose.connect(db[env])
  .then(() => {
    User.collection.drop();
    Composition.collection.drop();
  })
  .then(() => User.create(
    [{
      username: 'Lucy',
      email: 'lucy@lucy.com',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      username: 'Mike',
      email: 'mike@mike.com',
      password: 'password',
      passwordConfirmation: 'password'
    }]
  ))
  .then((users) => {
    console.log(users);
    console.log(`${users.length} users created`);
    return Composition.create(
      [{
        title: 'Zen Garden',
        sounds: [],
        createdBy: users[0].id
      },{
        title: 'Focus background',
        sounds: [],
        createdBy: users[1].id
      }]
    );
  })
  .then(compositions => console.log(`${compositions.length} compositions created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());




// mongoose.connect(dbURI, { useMongoClient: true })
//   .then(db => db.dropDatabase())
//   .then(() => Composition.create(compositionData))
//   .then(compositions => console.log(`${compositions.length} compositions created!`))
//   .catch(err => console.log(err))
//   .finally(() => mongoose.connection.close());
