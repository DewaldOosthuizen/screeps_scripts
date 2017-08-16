var actionLookup = require('action.lookup');
var roleHarvester = require("role.harvester");
var actionConstruct = require('action.construct');
var actionMove = require('action.move');
var actionBuild = require('action.build');
var errorHandler = require('error.notify');
var actionWithdraw = require('action.withdraw');

var roleBuilder = {

  run: function(creep) {
    try {
      if (creep.memory.building && creep.carry.energy == 0) {
        creep.memory.building = false;
      }
      if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
        creep.memory.building = true;
      }

      if (creep.memory.building) {
        var target = actionLookup.findConstructionSites(creep.room);
        if (target && target.length > 0) {
          actionBuild.run(creep, target[0]);
        } else {
          actionConstruct.buildRoadToAllSources();
        }
      } else {
        // var sources = actionLookup.findAllStructuresWithEnergy(creep.room);
        // if (sources && sources.length > 0) {
        //   actionWithdraw.run(creep, sources[0]);
        // } else {
        roleHarvester.run(creep);
        // }
      }
    } catch (e) {
      errorHandler.notify('Error in role.builder: ', e)
    }
  }
};

module.exports = roleBuilder;
