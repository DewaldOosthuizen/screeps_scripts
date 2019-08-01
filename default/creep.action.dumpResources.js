let actionMove = require('creep.action.move');
let setTarget = require('creep.setTarget');
let errorHandler = require('error.notify');


let dumpResources = {

    run: function(creep, target) {

        try {
            let message = (creep.name + ' is dumping at site: ' + target);

            //Gets the object in memory or initialize object
            let dump = setTarget.set(creep, target, false, message);

            let resetDumpSite = (dump.energy === dump.energyCapacity) || (creep.transfer(dump, RESOURCE_ENERGY) === ERR_INVALID_TARGET);

            if (resetDumpSite !== true && resetDumpSite !== false) {
                resetDumpSite = true;
            }

            //Reset target if needed
            dump = setTarget.set(
                creep,
                target,
                resetDumpSite,
                message,
                'Dumping'
            )

            if (creep.transfer(dump, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                actionMove.run(creep, dump, '#ff00ff'); //Purple
            } else {
                creep.transfer(dump, RESOURCE_ENERGY);
            }
        } catch (e) {
            errorHandler.notify('Error in creep.action.dumpResources: ', e);
        }

    }

};


module.exports = dumpResources;