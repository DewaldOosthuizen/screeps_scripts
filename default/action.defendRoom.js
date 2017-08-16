var actionLookup = require('action.lookup');
var errorHandler = require('error.notify');

var defendRoom = {

  run: function (myRoom) {

    var towers = actionLookup.findMyTowers(myRoom);

    try {
      if (towers.length > 0) {
        towers.forEach(tower => {

          var hostiles = actionLookup.findHostileCreeps(myRoom);

          if (hostiles && hostiles.length > 0) {
            tower.attack(hostiles[0]);
          } else {
            var closestDamagedStructure = actionLookup.findMyDamagedStructures(myRoom);
            
            if (closestDamagedStructure && closestDamagedStructure.length > 0) {
              if (tower.energy > (tower.energyCapacity / 2)) {
                tower.repair(closestDamagedStructure[0]);
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
