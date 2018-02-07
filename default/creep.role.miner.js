let roleHarvester = require("creep.role.harvester");
let actionMove = require('creep.action.move');
let errorHandler = require('error.notify');
let actionDump = require('creep.action.dumpResources');

let roleUpgrader = {

    run: function(creep) {
        try {
            if (creep.memory.upgrading && creep.carry.energy === 0) {
                creep.memory.extracting = false;
            }
            if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
                creep.memory.extracting = true;
                creep.say('Extracting')
            }

            if (creep.memory.extracting) {
                let target = creep.pos.findClosestByPath(STRUCTURE_EXTRACTOR);
                if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    actionMove.run(creep, creep.room.controller, '#00ffcc'); //aqua
                }
            } else {
                //Find all structures other than spawn and towers that require energy
                // let targets = lookup.findDumpSites(creep.room);
                let target = creep.pos.findClosestByPath(lookup.findExtractorDumpSite(creep.room));
                
                if (target) {
                    actionDumpResources.run(creep, target);
                } else {
                    roleHarvester.run(creep);
                }
            }
        } catch (e) {
            errorHandler.notify('Error in creep.role.miner: ', e);
        }
    }
};

module.exports = roleUpgrader;