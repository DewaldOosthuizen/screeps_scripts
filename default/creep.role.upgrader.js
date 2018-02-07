let roleHarvester = require("creep.role.harvester");
let actionMove = require('creep.action.move');
let errorHandler = require('error.notify');

let roleUpgrader = {

    run: function(creep) {
        try {
            if (creep.memory.upgrading && creep.carry.energy === 0) {
                creep.memory.upgrading = false;
            }
            if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
                creep.memory.upgrading = true;
                creep.say('Upgrade')
            }

            if (creep.memory.upgrading) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    actionMove.run(creep, creep.room.controller, '#00ffcc');//aqua
                } else {
                    creep.upgradeController(creep.room.controller);
                }
            } else {
                roleHarvester.run(creep);
            }
        } catch (e) {
            errorHandler.notify('Error in role.upgrader: ', e);
        }
    }
};

module.exports = roleUpgrader;