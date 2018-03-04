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
      src: '/static/sounds/ocean.ogg',
      icon: 'ocean-icon'
    }, {
      name: 'Birds singing',
      src: '/static/sounds/robin.ogg',
      icon: 'birds-icon'
    }, {
      name: 'Bar noise',
      src: '/static/sounds/bar.ogg',
      icon: 'bar-icon'
    }, {
      name: 'Bees',
      src: '/static/sounds/bees.ogg',
      icon: '-icon'
    }, {
      name: 'Fan',
      src: '/static/sounds/bigFactoryFan.ogg',
      icon: '-icon'
    }, {
      name: 'Crickets',
      src: '/static/sounds/cricket.ogg',
      icon: '-icon'
    }, {
      name: 'Electronic',
      src: '/static/sounds/electronic.ogg',
      icon: '-icon'
    }, {
      name: 'Fire',
      src: '/static/sounds/fire.ogg',
      icon: '-icon'
    }, {
      name: 'Mechanic',
      src: '/static/sounds/freezerDrone.ogg',
      icon: '-icon'
    }, {
      name: 'Frogs',
      src: '/static/sounds/frogs.ogg',
      icon: '-icon'
    }, {
      name: 'Guitar',
      src: '/static/sounds/guitar.ogg',
      icon: '-icon'
    },{
      name: 'Heavy Rain',
      src: '/static/sounds/heavyRain.ogg',
      icon: '-icon'
    },{
      name: 'Keyboard',
      src: '/static/sounds/keyboard.ogg',
      icon: '-icon'
    },{
      name: 'Noisy Train',
      src: '/static/sounds/noisyTrain.ogg',
      icon: '-icon'
    },{
      name: 'Owls',
      src: '/static/sounds/owls.ogg',
      icon: '-icon'
    },{
      name: 'Passing Train',
      src: '/static/sounds/passingTrain.ogg',
      icon: '-icon'
    },{
      name: 'Cat',
      src: '/static/sounds/purr.ogg',
      icon: '-icon'
    },{
      name: 'Rain Drops',
      src: '/static/sounds/rainDrops.ogg',
      icon: '-icon'
    },{
      name: 'Restaurant',
      src: '/static/sounds/restaurant.ogg',
      icon: '-icon'
    },{
      name: 'Seagulls',
      src: '/static/sounds/seagulls.ogg',
      icon: '-icon'
    },{
      name: 'Street',
      src: '/static/sounds/street.ogg',
      icon: '-icon'
    },{
      name: 'Traffic',
      src: '/static/sounds/traffic.ogg',
      icon: '-icon'
    },{
      name: 'Washingmachine',
      src: '/static/sounds/washingmachine.ogg',
      icon: '-icon'
    },{
      name: 'Wind',
      src: '/static/sounds/wind.ogg',
      icon: '-icon'
    },{
      name: 'Wind Chimes',
      src: '/static/sounds/windChimes.ogg',
      icon: '-icon'
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
