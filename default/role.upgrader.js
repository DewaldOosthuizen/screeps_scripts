var roleHarvester = require("role.harvester");
var actionMove = require('action.move');
var errorHandler = require('error.notify');

var roleUpgrader = {

    run: function(creep) {
        try {
            if (creep.memory.upgrading && creep.carry.energy === 0) {
                creep.memory.upgrading = false;
            }
            if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
                creep.memory.upgrading = true;
                creep.say('⚡Upgrade')
            }

            if (creep.memory.upgrading) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    actionMove.run(creep, creep.room.controller, '#ffffff');
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