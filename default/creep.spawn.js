var _ = require('lodash');
var spawnRole = require('spawn.role');
var errorHandler = require('error.notify');
var lookup = require('lookup.find');

var creepSpawn = {

    run: function(myRoom, useEnergyCostMatrix) {
        try {

            let spawnList = myRoom.find(FIND_MY_SPAWNS);

            spawnList.forEach(spawn => {
                if (!spawn.spawning) {

                    var countCreeps = lookup.countAllCreepsByRole(myRoom);

                    if (countCreeps.harvesters < 1) {
                        spawnRole.spawnCollector(spawn, useEnergyCostMatrix);
                    } else if (countCreeps.upgraders < 2) {
                        spawnRole.spawnEnhancer(spawn, useEnergyCostMatrix);
                    } else if (countCreeps.transporters < 4) {
                        spawnRole.spawnAllocator(spawn, useEnergyCostMatrix);
                    } else if (countCreeps.repairer < 4) {
                        spawnRole.spawnEngineer(spawn, useEnergyCostMatrix);
                    } else if (countCreeps.builders < 2) {
                        spawnRole.spawnConstructor(spawn, useEnergyCostMatrix);
                    } else if (countCreeps.warriors < 0) {
                        spawnRole.spawnWarrior(spawn);
                    } else if (countCreeps.archers < 0) {
                        spawnRole.spawnArcher(spawn);
                    } else if (countCreeps.healers < 0) {
                        spawnRole.spawnMage(spawn);
                    }
                }
            });

        } catch (e) {
            errorHandler.notify('Error in creep.spawn: ', e);
        }

    }

};


module.exports = creepSpawn;