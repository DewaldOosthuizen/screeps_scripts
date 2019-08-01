let _ = require('lodash');
let errorHandler = require('error.notify');
let roomVisual = require('room.visual');
let lookup = require('lookup.find');

module.exports = {

    createCreep: function(spawn, body, creepRole, creepName) {
        try {

            let cost = lookup.calculateCreepBodyCost(body);

            let result = spawn.createCreep(body, creepName + '-' + Math.floor((Math.random() * 100) + 1), {
                role: creepRole
            });

            // console.log("cost:", cost)
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


        } catch (e) {
            errorHandler.notify('Error in spawn.createCreep: ', e);
        }

    }

};