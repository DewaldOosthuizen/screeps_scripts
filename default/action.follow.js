var actionPatrol = require('action.patrol');
var actionMove = require('action.move');
var errorHandler = require('error.notify');

var actionFollow = {

  run: function (creep, toFollow) {

    try {
      // If toFollow creep is found follow for support
      if (toFollow) {
        actionMove.run(creep, toFollow, '#0066ff');
        // creep.say("ð£Follow");
      } else {
        actionPatrol.run(creep, 49, 49);
      }
    } catch (e) {
      errorHandler.notify('Error in action.follow: ', e);
    }

  }
};

module.exports = actionFollow;
