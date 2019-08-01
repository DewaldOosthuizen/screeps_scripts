var actionPatrol = require('action.patrol');
var actionMove = require('action.move');
var errorHandler = require('error.notify');

var actionClaimController = {

    run: function(creep) {

        try {
            var ctrl = creep.room.controller;
            if (ctrl && !ctrl.my && creep.body.some(bodyPart => bodyPart === CLAIM)) {
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    actionMove.run(creep, creep.room.controller, '#ffaa00');
                } else {
                    creep.claimController(creep.room.controller);
                    creep.say('âClaiming!');
                }
            } else {
                actionPatrol.run(creep, 49, 49);
            }
        } catch (e) {
            errorHandler.notify('Error in action.claimController: ', e);
        }


    }
};



module.exports = actionClaimController;