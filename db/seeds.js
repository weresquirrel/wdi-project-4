const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { db, env } = require('../config/environment');

const Composition = require('../models/composition');
const User = require('../models/user');
const Sound = require('../models/sound');

let sounds = [];

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
  .then((dbSounds) => {
    sounds = dbSounds;
    console.log(sounds);
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
        sounds: [
          {
            id: sounds[1].id,
            volume: 42
          },
          {
            id: sounds[0].id,
            volume: 18
          }],
        createdBy: users[0].id
      },{
        title: 'Focus background',
        sounds: [{
          id: sounds[0].id,
          volume: 72
        }],
        createdBy: users[1].id,
        private: true
      }]
    );
  })
  .then(compositions => console.log(`${compositions.length} compositions created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
