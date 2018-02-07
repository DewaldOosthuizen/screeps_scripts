let actionPatrol = require('creep.action.patrol');
let actionMove = require('creep.action.move');
let errorHandler = require('error.notify');

let actionFollow = {

    run: function(creep, toFollow) {

        try {
            // If toFollow creep is found follow for support
            if (toFollow) {
                actionMove.run(creep, toFollow, '#0066ff');
                // creep.say("Follow");
            } else {
                actionPatrol.run(creep, 49, 49);
            }
        } catch (e) {
            errorHandler.notify('Error in creep.action.follow: ', e);
        }

    }
};

module.exports = actionFollow;