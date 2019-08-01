var actionPatrol = require('action.patrol');
var lookup = require('lookup.find');
var roleHarvester = require("role.harvester");
var roleBuilder = require("role.builder");
var actionMove = require('action.move');
var actionRepair = require('action.repair');
var errorHandler = require('error.notify');
var actionWithdraw = require('action.withdraw');
var _ = require('lodash');
var actionDumpResources = require('action.dumpResources');

var roleRepair = {

    run: function(creep) {
        try {
            if (creep.memory.repair && creep.carry.energy === 0) {
                creep.memory.repair = false;
            }
            if (!creep.memory.repair && creep.carry.energy === creep.carryCapacity) {
                creep.memory.repair = true;
            }

            // console.log(creep.name + ' - creep.memory.repair: ' + creep.memory.repair);
            if (creep.memory.repair) {
                var towers = lookup.findMyTowers(creep.room);
                var canDump = false;
                var target = null;

                if (towers.length > 0) {
                    for (var t in towers) {
                        target = towers[t];
                        if (target.energy < target.energyCapacity) {
                            canDump = true;
                            break;
                        }
                    }
                }

                if (canDump) {
                    actionDumpResources.run(creep, target)
                } else {
                    target = lookup.findMyDamagedStructures(creep.room);

                    if (target && target.length > 0) {
                        actionRepair.run(creep, target[0]);
                    } else {
                        roleBuilder.run(creep);
                    }
                }

            } else {
                // var sources = lookup.findAllStructuresWithEnergy(creep.room);
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