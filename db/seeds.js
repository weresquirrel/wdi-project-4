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
      icon: '/static/icons/040-sea-waves.svg'
    }, {
      name: 'Birds singing',
      src: '/static/sounds/robin.ogg',
      icon: '/static/icons/014-animal.svg'
    }, {
      name: 'Bar noise',
      src: '/static/sounds/bar.ogg',
      icon: '/static/icons/007-coffee.svg'
    }, {
      name: 'Bees',
      src: '/static/sounds/bees.ogg',
      icon: '/static/icons/016-bee.svg'
    }, {
      name: 'Fan',
      src: '/static/sounds/bigFactoryFan.ogg',
      icon: '/static/icons/023-fan.svg'
    }, {
      name: 'Crickets',
      src: '/static/sounds/cricket.ogg',
      icon: '/static/icons/033-cricket.svg'
    }, {
      name: 'Electronic',
      src: '/static/sounds/electronic.ogg',
      icon: '/static/icons/022-electric-tower.svg'
    }, {
      name: 'Fire',
      src: '/static/sounds/fire.ogg',
      icon: '/static/icons/041-campfire.svg'
    }, {
      name: 'Mechanical',
      src: '/static/sounds/freezerDrone.ogg',
      icon: '/static/icons/037-levels.svg'
    }, {
      name: 'Frogs',
      src: '/static/sounds/frogs.ogg',
      icon: '/static/icons/032-toad.svg'
    }, {
      name: 'Guitar',
      src: '/static/sounds/guitar.ogg',
      icon: '/static/icons/004-guitar.svg'
    },{
      name: 'Heavy Rain',
      src: '/static/sounds/heavyRain.ogg',
      icon: '/static/icons/029-rain.svg'
    },{
      name: 'Keyboard',
      src: '/static/sounds/keyboard.ogg',
      icon: '/static/icons/002-keyboard-1.svg'
    },{
      name: 'Noisy Train',
      src: '/static/sounds/noisyTrain.ogg',
      icon: '/static/icons/009-train-2.svg'
    },{
      name: 'Owls',
      src: '/static/sounds/owls.ogg',
      icon: '/static/icons/034-owl.svg'
    },{
      name: 'Passing Train',
      src: '/static/sounds/passingTrain.ogg',
      icon: '/static/icons/010-tube-rails.svg'
    },{
      name: 'Cat',
      src: '/static/sounds/purr.ogg',
      icon: '/static/icons/035-egyptian-cat.svg'
    },{
      name: 'Rain Drops',
      src: '/static/sounds/rainDrops.ogg',
      icon: '/static/icons/028-drop.svg'
    },{
      name: 'Restaurant',
      src: '/static/sounds/restaurant.ogg',
      icon: '/static/icons/008-restaurant.svg'
    },{
      name: 'Seagulls',
      src: '/static/sounds/seagulls.ogg',
      icon: '/static/icons/036-sun-sea-and-seagulls.svg'
    },{
      name: 'Street',
      src: '/static/sounds/street.ogg',
      icon: '/static/icons/018-city.svg'
    },{
      name: 'Traffic',
      src: '/static/sounds/traffic.ogg',
      icon: '/static/icons/024-traffic-light.svg'
    },{
      name: 'Washingmachine',
      src: '/static/sounds/washingmachine.ogg',
      icon: '/static/icons/020-washing-machine.svg'
    },{
      name: 'Wind',
      src: '/static/sounds/wind.ogg',
      icon: '/static/icons/012-sky.svg'
    },{
      name: 'Wind Chimes',
      src: '/static/sounds/windChimes.ogg',
      icon: '/static/icons/001-chimes.svg'
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
