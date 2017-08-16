var actionMove = require('action.move');
var setTarget = require('creep.setTarget');
var errorHandler = require('error.notify');


var repairStructure = {

    run: function(creep, target) {

        try {
            var message = (creep.name + ' is repairing: ' + target);

            //Gets the object in memory or initialize object
            var toRepair = setTarget.set(creep, target, false, message);

            //Reset if conditions are true
            toRepair = setTarget.set(
                creep,
                target,
                (!toRepair || toRepair === null || toRepair.hits === toRepair.hitsMax),
                message,
                '🔧Repair'
            );


            if (creep.repair(toRepair) == ERR_NOT_IN_RANGE) {
                actionMove.run(creep, toRepair, '#ff00ff');
            } else {
                creep.repair(toRepair)
            }
        } catch (e) {
            errorHandler.notify('Error in action.repair: ', e);
        }

    }

};


module.exports = repairStructure;