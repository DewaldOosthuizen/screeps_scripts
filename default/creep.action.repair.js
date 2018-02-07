let actionMove = require('creep.action.move');
let setTarget = require('creep.setTarget');
let errorHandler = require('error.notify');


let repairStructure = {

    run: function(creep, target) {

        try {
            let message = (creep.name + ' is repairing: ' + target);

            //Gets the object in memory or initialize object
            let toRepair = setTarget.set(creep, target, false, message);

            //Reset if conditions are true
            toRepair = setTarget.set(
                creep,
                target,
                (!toRepair || toRepair === null || toRepair.hits === toRepair.hitsMax),
                message,
                'Repair'
            );


            if (creep.repair(toRepair) == ERR_NOT_IN_RANGE) {
                actionMove.run(creep, toRepair, '#663300'); //brown
            } else {
                creep.repair(toRepair)
            }
        } catch (e) {
            errorHandler.notify('Error in creep.action.repair: ', e);
        }

    }

};


module.exports = repairStructure;