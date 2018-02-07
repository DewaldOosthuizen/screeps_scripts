let actionMove = require('creep.action.move');
let lookup = require('lookup.find');
let setTarget = require('creep.setTarget');
let errorHandler = require('error.notify');

let harvestResources = {

    run: function(creep, target) {

        try {
            let message = ' is harvesting from: ';

            //Gets the object in memory or initialize object
            let toharvest = setTarget.set(
                creep, target, false, message
            )

            //Get all sources in room
            let allSources = lookup.findSources(creep.room);
            //Check if target is a source
            let isSource = toharvest && toharvest.id !== null ? allSources.some(s => s === toharvest) : false;

            //Reset source if conditions are true
            let isTargetSource = allSources.some(s => s === target);
            target = isTargetSource ? target : allSources[Math.floor((Math.random() * allSources.length - 1) + 1)];

            // console.log(creep.name + " is harvesting from " +  target);
            toharvest = setTarget.set(
                creep,
                target,
                (!toharvest || toharvest === null || !isSource),
                message,
                'Harvest'
            )

            if (creep.harvest(toharvest) == ERR_NOT_IN_RANGE) {
                actionMove.run(creep, toharvest, '#ffaa00'); //orange
            } else {
                creep.harvest(toharvest);
            }
        } catch (e) {
            errorHandler.notify('Error in creep.action.harvest: ', e);
        }

    }

};

module.exports = harvestResources;