var actionMove = require('action.move');
var lookup = require('lookup.find');
var setTarget = require('creep.setTarget');
var errorHandler = require('error.notify');

var harvestResources = {

    run: function(creep, target) {

        try {
            var message = ' is harvesting from: ';

            //Gets the object in memory or initialize object
            var toharvest = setTarget.set(
                creep, target, false, message
            )

            //Get all sources in room
            var allSources = lookup.findSources(creep.room);
            //Check if target is a source
            var isSource = toharvest && toharvest.id !== null ? allSources.some(s => s === toharvest) : false;

            //Reset source if conditions are true
            var isTargetSource = allSources.some(s => s === target);
            target = isTargetSource ? target : allSources[Math.floor((Math.random() * allSources.length - 1) + 1)];


            toharvest = setTarget.set(
                creep,
                target,
                (!toharvest || toharvest === null || !isSource),
                message,
                '💱Harvest'
            )

            if (creep.harvest(toharvest) == ERR_NOT_IN_RANGE) {
                actionMove.run(creep, toharvest, '#ffaa00');
            } else {
                creep.harvest(toharvest);
            }
        } catch (e) {
            errorHandler.notify('Error in action.harvest: ', e);
        }

    }

};


module.exports = harvestResources;