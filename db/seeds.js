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
      // icon: '/static/icons/041-campfire.svg'
      icon: '/static/icons/001-flames.svg'
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
      // icon: '/static/icons/036-sun-sea-and-seagulls.svg'
      icon: '/static/icons/003-sunset.svg'
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
      },{
        username: 'Adam',
        email: 'adam@adam.com',
        password: 'password',
        passwordConfirmation: 'password'
      },{
        username: 'dancing_octopus',
        email: 'd@o.com',
        password: 'password',
        passwordConfirmation: 'password'
      }]
    );
  })
  .then((users) => {
    // console.log(users);
    console.log(`${users.length} users created`);

    return Composition.create(
      [{
        title: 'Zen Garden',
        sounds: [
          {
            id: sounds[1].id,
            volume: 75
          },
          {
            id: sounds[0].id,
            volume: 27
          },
          {
            id: sounds[19].id,
            volume: 14
          },
          {
            id: sounds[5].id,
            volume: 1
          }],
        createdBy: users[0].id
      },{
        title: 'Focus background',
        sounds: [{
          id: sounds[0].id,
          volume: 24
        },{
          id: sounds[8].id,
          volume: 51
        },{
          id: sounds[11].id,
          volume: 28
        }],
        createdBy: users[1].id,
        private: true
      },{
        title: 'Pond',
        sounds: [{
          id: sounds[9].id,
          volume: 42
        },{
          id: sounds[0].id,
          volume: 39
        },{
          id: sounds[17].id,
          volume: 78
        },{
          id: sounds[23].id,
          volume: 43
        }],
        createdBy: users[3].id
      },{
        title: 'Summer Night',
        sounds: [{
          id: sounds[7].id,
          volume: 47
        },{
          id: sounds[3].id,
          volume: 19
        },{
          id: sounds[14].id,
          volume: 41
        },{
          id: sounds[5].id,
          volume: 15
        },{
          id: sounds[23].id,
          volume: 14
        }],
        createdBy: users[0].id
      },{
        title: 'Home',
        sounds: [{
          id: sounds[24].id,
          volume: 33
        },{
          id: sounds[17].id,
          volume: 77
        },{
          id: sounds[23].id,
          volume: 21
        },{
          id: sounds[16].id,
          volume: 26
        }],
        createdBy: users[0].id
      },{
        title: 'open air cafe',
        sounds: [{
          id: sounds[2].id,
          volume: 36
        },{
          id: sounds[1].id,
          volume: 72
        },{
          id: sounds[23].id,
          volume: 43
        }],
        createdBy: users[0].id
      },{
        title: 'Adam\'s super playlist',
        sounds: [{
          id: sounds[7].id,
          volume: 100
        },{
          id: sounds[24].id,
          volume: 54
        },{
          id: sounds[17].id,
          volume: 53
        },{
          id: sounds[11].id,
          volume: 46
        },{
          id: sounds[23].id,
          volume: 53
        },{
          id: sounds[0].id,
          volume: 42
        },{
          id: sounds[19].id,
          volume: 34
        }],
        createdBy: users[2].id
      },{
        title: 'Urban mix',
        sounds: [{
          id: sounds[2].id,
          volume: 31
        },{
          id: sounds[12].id,
          volume: 62
        },{
          id: sounds[15].id,
          volume: 59
        },{
          id: sounds[20].id,
          volume: 51
        }],
        createdBy: users[1].id,
        private: true
      },{
        title: 'machines + rain',
        sounds: [{
          id: sounds[22].id,
          volume: 24
        },{
          id: sounds[8].id,
          volume: 48
        },{
          id: sounds[4].id,
          volume: 36
        },{
          id: sounds[6].id,
          volume: 19
        },{
          id: sounds[11].id,
          volume: 19
        }],
        createdBy: users[1].id
      },{
        title: 'Street',
        sounds: [{
          id: sounds[13].id,
          volume: 12
        },{
          id: sounds[15].id,
          volume: 71
        },{
          id: sounds[20].id,
          volume: 73
        },{
          id: sounds[8].id,
          volume: 30
        },{
          id: sounds[21].id,
          volume: 87
        }],
        createdBy: users[1].id
      },{
        title: 'Cafe noises',
        sounds: [{
          id: sounds[10].id,
          volume: 34
        },{
          id: sounds[18].id,
          volume: 49
        },{
          id: sounds[8].id,
          volume: 24
        },{
          id: sounds[15].id,
          volume: 42
        },{
          id: sounds[20].id,
          volume: 100
        }],
        createdBy: users[3].id,
        private: true
      },{
        title: 'Buzz',
        sounds: [{
          id: sounds[22].id,
          volume: 18
        },{
          id: sounds[4].id,
          volume: 13
        },{
          id: sounds[6].id,
          volume: 21
        },{
          id: sounds[16].id,
          volume: 39
        },{
          id: sounds[3].id,
          volume: 20
        }],
        createdBy: users[1].id
      }]
    );
  })
  .then(compositions => console.log(`${compositions.length} compositions created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
