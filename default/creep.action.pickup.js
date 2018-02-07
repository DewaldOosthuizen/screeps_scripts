let actionMove = require('creep.action.move');
let errorHandler = require('error.notify');

let pickupResources = {

    run: function(creep, target) {

        try {
            if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                actionMove.run(creep, target, '#ffaa00'); //orange
            } else {
                creep.pickup(target);
            }
        } catch (e) {
            errorHandler.notify('Error in creep.action.pickup: ', e);
        }

    }

};

module.exports = pickupResources;