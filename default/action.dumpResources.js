var actionMove = require('action.move');
var setTarget = require('creep.setTarget');
var errorHandler = require('error.notify');


var dumpResources = {

  run: function (creep, target) {

    try {
      var message = (creep.name + ' is dumping at site: ' + target);

      //Gets the object in memory or initialize object
      var dump = setTarget.set(creep, target, false, message);

      var isDumpSiteFull = (dump && dump !== null && dump.energy && dump.energyCapacity ? (dump.energy === dump.energyCapacity) : true);
    //   var resetHarvesterDumpSite = (dump && dump !== null ? (creep.memory.role === 'harvester' && dump.structureType !== STRUCTURE_SPAWN) : true);

      //Reset target if needed

      dump = setTarget.set(
        creep,
        target,
        (isDumpSiteFull),
        message,
        'ðDumping'
      )

      if (creep.transfer(dump, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        actionMove.run(creep, dump, '#ffff00');
      } else {
        creep.transfer(dump, RESOURCE_ENERGY);
      }
    } catch (e) {
      errorHandler.notify('Error in action.dumpResources: ', e);
    }

  }

};


module.exports = dumpResources;
