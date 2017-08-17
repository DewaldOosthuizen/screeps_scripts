var _ = require('lodash');
var errorHandler = require('error.notify');
var roomVisual = require('room.visual');
var lookup = require('lookup.find');

module.exports = {

    createCreep: function(spawn, body, creepRole, creepName) {
        try {

            let cost = lookup.calculateCreepBodyCost(body);
            let energy = Game.rooms[spawn.room.name].energyAvailable;


            if (energy >= cost) {
                var result = spawn.createCreep(body, creepName + '-' + Math.floor((Math.random() * 100) + 1), {
                    role: creepRole
                });

                if (_.isString(result)) {
                    roomVisual.display(
                        spawn.room.name,
                        'Spawning: ' + result + ' in room: ' + spawn.room.name + ' :: [Cost: ' + cost + '], [Spawn energy: ' + spawn.energy + ']',
                        25,
                        49,
                        'white',
                        0.7,
                        'black'
                    );
                }
            } else {
                // console.log('Require ' + (cost - energy) + ' energy to spawn ' + creepName);
            }

        } catch (e) {
            errorHandler.notify('Error in spawn.createCreep: ', e);
        }

    }

};