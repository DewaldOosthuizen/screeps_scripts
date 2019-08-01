let lookup = require('lookup.find');
let roleHarvester = require("creep.role.harvester");
let actionConstruct = require('creep.action.construct');
let actionMove = require('creep.action.move');
let actionBuild = require('creep.action.build');
let errorHandler = require('error.notify');
let actionWithdraw = require('creep.action.withdraw');
let roleUpgrader = require('creep.role.upgrader');

let roleBuilder = {

    run: function(creep) {
        try {
            if (creep.memory.building && creep.carry.energy === 0) {
                creep.memory.building = false;
            }
            if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
                creep.memory.building = true;
            }

            if (creep.memory.building) {
                let target = lookup.findConstructionSites(creep.room);
                if (target) {
                    actionBuild.run(creep, target[0]);
                } else {
                    // actionConstruct.buildRoadToAllSources();
                    roleUpgrader.run(creep);
                }
            } else {
                // let sources = lookup.findAllStructuresWithEnergy(creep.room);
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