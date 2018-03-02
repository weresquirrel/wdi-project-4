const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { db, env } = require('../config/environment');

const Composition = require('../models/composition');
const User = require('../models/user');
const Sound = require('../models/sound');

mongoose.connect(db[env])
  .then(() => {
    Sound.collection.drop();
    User.collection.drop();
    Composition.collection.drop();
  })
  .then(() => Sound.create(
    [{
      name: 'Ocean\'s waves',
      src: 'link-to-oceans-waves',
      icon: 'ocean-icon'
    }, {
      name: 'Birds singing',
      src: 'link-to-birds-singing',
      icon: 'birds-icon'
    }]
  ))
  .then((sounds) => {
    // console.log(sounds);
    console.log(`${sounds.length} sounds created`);

    return User.create(
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
    );
  })
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
