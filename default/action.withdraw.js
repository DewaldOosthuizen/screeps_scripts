var actionMove = require('action.move');
var setTarget = require('creep.setTarget');
var errorHandler = require('error.notify');


var actionWithdraw = {

  run: function (creep, target) {

    try {
      var message = (creep.name + ' is withdrawing from ' + target);

      //Gets the object in memory or initialize object
      var toWithdraw = setTarget.set(creep, target, false, message);

      //Reset if conditions are true
      toWithdraw = setTarget.set(
        creep,
        target,
        (!Game.structures[toWithdraw.id] || Game.structures[toWithdraw.id] === null || !toWithdraw.energy || toWithdraw === 0),
        message,
        '🔄Withdraw'

      );

      if (creep.withdraw(toWithdraw, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        actionMove.run(creep, toWithdraw, '#ff00ff');
      } else {
        creep.withdraw(toWithdraw, RESOURCE_ENERGY)
      }
    } catch (e) {
      errorHandler.notify('Error in action.withdraw: ', e);
    }

  }

};


module.exports = actionWithdraw;
