var actionPatrol = require('action.patrol');
var actionLookup = require('action.lookup');
var roleHarvester = require("role.harvester");
var roleBuilder = require("role.builder");
var actionMove = require('action.move');
var actionRepair = require('action.repair');
var errorHandler = require('error.notify');
var actionWithdraw = require('action.withdraw');

var roleRepair = {

  run: function(creep) {
    try {
      if (creep.memory.repair && creep.carry.energy === 0) {
        creep.memory.repair = false;
        // creep.say('♻️Harvest')
      }
      if (!creep.memory.repair && creep.carry.energy === creep.carryCapacity) {
        creep.memory.repair = true;
      }

      // console.log(creep.name + ' - creep.memory.repair: ' + creep.memory.repair);
      if (creep.memory.repair) {
        var target = actionLookup.findMyDamagedStructures(creep.room);
        
        if (target && target.length > 0) {
            // for (var t in target) {
            //     if (creep.pos.isNearTo(target[t])) {
                    actionRepair.run(creep, target[0]);
            //     }
            // }
        } 
        else {
          roleBuilder.run(creep);
        }
      } 
      else {
        // var sources = actionLookup.findAllStructuresWithEnergy(creep.room);
        // if (sources && sources.length > 0) {
        //   actionWithdraw.run(creep, sources[0]);
        // } else {
        roleHarvester.run(creep);
        // }
      }

    } catch (e) {
      errorHandler.notify('Error in role.repairer: ', e);
    }

  }
};

module.exports = roleRepair;
