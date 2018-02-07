let lookup = require('lookup.find');
let errorHandler = require('error.notify');

let towerCommands = {

    defendRoom: function(myRoom) {
        let towers = lookup.findMyTowers(myRoom);

        try {
            if (towers.length > 0) {
                towers.forEach(tower => {
                    let hostiles = lookup.findHostileCreeps(myRoom);
                    if (hostiles && hostiles.length > 0) {
                        tower.attack(hostiles[0]);
                    } else {
                        repairDamagedStructures(myRoom, tower);
                    }

                });
            }
        } catch (e) {
            errorHandler.notify('Error in structure.tower.commands: ', e);
        }
    }

};

let repairDamagedStructures = function(myRoom, tower) {
    let damagedStructure = lookup.findMyDamagedStructures(myRoom);

    if (damagedStructure && damagedStructure.length > 0) {
        if (((damagedStructure[0].hits / damagedStructure[0].hitsMax) * 100) < 20) {
            tower.repair(damagedStructure[0]);
        } else if (tower.energy > (tower.energyCapacity / 2)) {
            tower.repair(damagedStructure[0]);
        }
    }
}

module.exports = towerCommands;