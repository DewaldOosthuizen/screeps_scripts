var actionMove = require('action.move');
var actionFollow = require('action.follow');
var actionLookup = require('action.lookup');
var actionSignController = require('action.signController');
var errorHandler = require('error.notify');
var creepSay = require('creep.say');

var roleHealer = {

  run: function(creep) {
    try {
      // Find injured creep
      const target = actionLookup.findMyDamagedCreeps(creep.room);

      // If injured creep exits
      if (target && target.length > 0) {
        if (creep.heal(Game.getObjectById(target[0])) == ERR_NOT_IN_RANGE) {
          actionMove.run(creep, Game.getObjectById(target[0]), '#0066ff')
        } else {
          creep.heal(Game.getObjectById(target[0]))
          creepSay.sayGlobal(creep, '⚡Healing');
        }
      } 
    //   else if (creep.room.controller.sign.username !== creep.owner.username) {
    //     actionSignController.sign(creep, creep.room.controlelr, null);
    //   } 
      else {
        // Find warrior creeps
        var warriors = _.filter(Game.creeps, {
          memory: {
            role: 'attack'
          }
        });
        actionFollow.run(creep, (warriors && warriors.length > 0 ? warriors[0] : null))
      }
    } catch (e) {
      errorHandler.notify('Error in role.healer: ', e);
    }

  }
};

module.exports = roleHealer;
