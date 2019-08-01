let lookup = require('lookup.find');
let actionDumpResources = require('creep.action.dumpResources');
let actionPickup = require('creep.action.pickup');
let actionMove = require('creep.action.move');
let actionHarvest = require('creep.action.harvest');
let errorHandler = require('error.notify');
let actionRepair = require('creep.action.repair');
let actionBuild = require('creep.action.build');

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
                    target = lookup.findSources(creep.room);
                    // console.log(Math.random() * target.length - 1);
                    // console.log(Math.floor((Math.random() * target.length - 1) + 1));
                    // console.log(target[Math.floor((Math.random() * target.length - 1) + 1)]);
                    target = target[Math.floor((Math.random() * target.length - 1) + 1)]
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

                        if (target[0]) {
                            if (creep.withdraw(target[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(target[0]);
                            } else {
                                creep.withdraw(target[0], RESOURCE_ENERGY);
                            }
                        }
                    }
                }
            } else {
                //Find all structures other than spawn and towers that require energy
                let target = lookup.findDumpSites(creep.room);
                if (!target) {
                    target = target[0]
                } else {
                    target = target[0];
                }

                if (target) {
                    actionDumpResources.run(creep, target);
                } else {
                    target = lookup.findConstructionSites(creep.room);

                    if (target && target.length > 0) {
                        actionBuild.run(creep, target[0]);
                    } else  {
                        target = lookup.findMyDamagedStructures(creep.room);
                        if (target && target.length > 0) {
                            actionRepair.run(creep, target[0]);
                        } 
                    }
                }

            }
        } catch (e) {
            errorHandler.notify('Error in creep.role.harvester', e);
        }
    }
};

module.exports = roleHarvester;