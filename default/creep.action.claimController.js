let actionPatrol = require('creep.action.patrol');
let actionMove = require('creep.action.move');
let errorHandler = require('error.notify');

let actionClaimController = {

    run: function(creep) {

        try {
            let ctrl = creep.room.controller;
            if (ctrl && !ctrl.my && creep.body.some(bodyPart => bodyPart === CLAIM)) {
                if (creep.claimController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    actionMove.run(creep, creep.room.controller, '#ffaa00');
                } else {
                    creep.claimController(creep.room.controller);
                    creep.say('Claiming!');
                }
            } else {
                actionPatrol.run(creep, 49, 49);
            }
        } catch (e) {
            errorHandler.notify('Error in creep.action.claimController: ', e);
        }


    }
};



module.exports = actionClaimController;