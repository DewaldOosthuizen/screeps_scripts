let actionPatrol = require('creep.action.patrol');
let lookup = require('lookup.find');
let roleHarvester = require("creep.role.harvester");
let roleBuilder = require("creep.role.builder");
let actionMove = require('creep.action.move');
let actionRepair = require('creep.action.repair');
let errorHandler = require('error.notify');
let actionWithdraw = require('creep.action.withdraw');
let _ = require('lodash');
let actionDumpResources = require('creep.action.dumpResources');

let roleRepair = {

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
                let towers = lookup.findDumpSites(creep.room);
                let canDump = false;
                let target = null;

                if (towers.length > 0) {
                    for (let t in towers) {
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
                roleHarvester.run(creep);
            }

        } catch (e) {
            errorHandler.notify('Error in role.repairer: ', e);
        }

    }
};

module.exports = roleRepair;