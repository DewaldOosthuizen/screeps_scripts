var lookup = require('lookup.find');
var actionDumpResources = require('action.dumpResources');
var actionMove = require('action.move');
var actionHarvest = require('action.harvest');
var errorHandler = require('error.notify');

var roleHarvester = {

    run: function(creep) {

        try {

            if (!creep.memory.harvest && creep.carry.energy === 0) {
                creep.memory.harvest = true;
            } else if (creep.carry.energy === creep.carryCapacity) {
                creep.memory.harvest = false;
            }

            if (creep.memory.harvest) {
                const target = lookup.findDroppedSources(creep.room);
                if (target.length > 0) {
                    if (creep.pickup(target[0]) === ERR_NOT_IN_RANGE) {
                        actionMove.run(creep, Game.getObjectById(target[0]), '#ffaa00');
                    }
                } else {
                    var sources = lookup.findSources(creep.room);
                    if (sources && sources.length > 0) {
                        if (creep.memory.role === "harvester" || creep.memory.role === "transporter" || creep.memory.role === "upgrade") {
                            actionHarvest.run(creep, sources[0]);
                        } else {
                            // var random = Math.floor((Math.random() * sources.length - 1) + 1);
                            actionHarvest.run(creep, sources[1]);
                        }
                    }
                }
            } else {
                var targets = lookup.findDumpSites(creep.room);

                if (targets && targets.length > 0) {
                    var t = targets[0];
                    actionDumpResources.run(creep, t);
                }

            }
        } catch (e) {
            errorHandler.notify("Error in role.harvester: ", e);
        }


    }
};

module.exports = roleHarvester;