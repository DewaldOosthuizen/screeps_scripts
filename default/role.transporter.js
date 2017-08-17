var roleHarvester = require('role.harvester');
var actionDumpResources = require('action.dumpResources');
var roleRepairer = require('role.repairer');
var errorHandler = require('error.notify');
var lookup = require('lookup.find');

var roleTransporter = {

    run: function(creep) {

        try {
            if (creep.carry.energy === 0) {
                creep.memory.harvest = true;
            }
            if (creep.carry.energy === creep.carryCapacity) {
                creep.memory.harvest = false;
            }


            if (creep.memory.harvest) {
                roleHarvester.run(creep);
            } else {
                //Find all structures other than spawn and towers that require energy
                var targets = lookup.findDumpSites(creep.room);

                if (targets && targets.length > 0) {
                    actionDumpResources.run(creep, targets[0]);
                } else {
                    roleRepairer.run(creep);
                }

            }
        } catch (e) {
            errorHandler.notify('Error in role.transporter', e);
        }
    }
};

module.exports = roleTransporter;