var lookup = require('lookup.find');
var errorHandler = require('error.notify');

var defendRoom = {

    run: function(myRoom) {

        var towers = lookup.findMyTowers(myRoom);

        try {
            if (towers.length > 0) {
                towers.forEach(tower => {

                    var hostiles = lookup.findHostileCreeps(myRoom);

                    if (hostiles && hostiles.length > 0) {
                        tower.attack(hostiles[0]);
                    } else {
                        var damagedStructure = lookup.findMyDamagedStructures(myRoom);

                        if (damagedStructure && damagedStructure.length > 0) {
                            if (tower.energy > (tower.energyCapacity / 2)) {
                                tower.repair(damagedStructure[0]);
                            }
                        }
                    }

                });
            }
        } catch (e) {
            errorHandler.notify('Error in action.defendRoom: ', e);
        }


    }
};

module.exports = defendRoom;