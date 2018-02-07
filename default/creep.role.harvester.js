let lookup = require('lookup.find');
let actionDumpResources = require('creep.action.dumpResources');
let actionPickup = require('creep.action.pickup');
let actionMove = require('creep.action.move');
let actionHarvest = require('creep.action.harvest');
let errorHandler = require('error.notify');
let actionPatrol = require('creep.action.patrol');

let roleHarvester = {

    run: function(creep) {
        try {
            if (creep.carry.energy === 0) {
                creep.memory.harvest = true;
            }
            if (creep.carry.energy === creep.carryCapacity) {
                creep.memory.harvest = false;
            }

            if (creep.memory.harvest) {
                let target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                    filter: val => val.energy > 100
                });
                if (target) {
                    actionPickup.run(creep, target);
                } else {
                    target = lookup.findSourcesClosestToCreep(creep);
                    if (target && target.id && Game.getObjectById(target.id)) {
                        actionHarvest.run(creep, target);
                    } else {
                        creep.memory.target = null;
                        // for (let flag in Game.flags) {
                        //     actionPatrol.runToFlag(creep, flag);
                        // }
                        target = creep.pos.findClosestByPath(STRUCTURE_LINK, {
                            filter: source => source.energy > 0
                        });
                        
                        if (target) {
                            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(target);
                            } else {
                                creep.withdraw(target, RESOURCE_ENERGY);
                            }
                        }
                    }
                }
            } else {
                //Find all structures other than spawn and towers that require energy
                // let targets = lookup.findDumpSites(creep.room);
                let target = lookup.findDumpSitesClosestToCreep(creep);
                if (!target) {
                     let targets = lookup.findDumpSites(creep.room);
                     target = targets[0];
                }
                if (target) {
                    actionDumpResources.run(creep, target);
                }

            }
        } catch (e) {
            errorHandler.notify('Error in creep.role.harvester', e);
        }
    }
};

module.exports = roleHarvester;