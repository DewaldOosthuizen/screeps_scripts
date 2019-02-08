let _ = require('lodash');
let spawnRole = require('spawn.role');
let errorHandler = require('error.notify');
let lookup = require('lookup.find');

let creepSpawn = {

    run: function(myRoom, panic) {
        try {
            let spawnList = myRoom.find(FIND_MY_SPAWNS);
            spawnList.forEach(spawn => {
                if (!spawn.spawning) {

                    let countCreeps = lookup.countAllCreepsByRole(myRoom);

                    if (countCreeps.harvesters < 2) {
                        spawnRole.spawnAllocator(spawn, panic);
                    } else if (countCreeps.upgraders < 2) {
                        spawnRole.spawnEnhancer(spawn, panic);
                    } else if (countCreeps.repairer < 1) {
                        spawnRole.spawnEngineer(spawn, panic);
                    } else if (countCreeps.builders < 1) {
                        spawnRole.spawnConstructor(spawn, panic);
                    } 
                    // else if (countCreeps.warriors < 1) {
                    //     spawnRole.spawnWarrior(spawn, panic);
                    // } else if (countCreeps.archers < 0) {
                    //     spawnRole.spawnArcher(spawn, panic);
                    // } else if (countCreeps.healers < 0) {
                    //     spawnRole.spawnMage(spawn, panic);
                    // }
                }
            });

        } catch (e) {
            errorHandler.notify('Error in creep.spawn: ', e);
        }

    }

};


module.exports = creepSpawn;