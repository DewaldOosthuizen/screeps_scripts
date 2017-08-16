var actionMove = require('action.move');
var actionPatrol = require('action.patrol');
var actionLookup = require('action.lookup');
var actionExplore = require('action.explore');
var actionClaimController = require('action.claimController');
var actionSignController = require('action.signController');
var errorHandler = require('error.notify');
var creepSay = require('creep.say');

var roleAttack = {

  run: function(creep) {
    try {
      const target = actionLookup.findHostileCreeps(creep.room);
      if (target && target.length > 0) {
        var enemy = Game.getObjectById(target[0]);
        if (creep.attack(enemy) == ERR_NOT_IN_RANGE) {
          actionMove.run(creep, enemy, '#0066ff');
        } else {
          creep.attack(enemy);
        }
        creepSay.sayGlobal(creep, '😡Attack!');
      }
      //   else if (creep.room.controller && !creep.room.controller.my) {
      //     var username = creep.room.controller && creep.room.controller.owner ? creep.room.controller.owner.username : undefined
      //     var isFriendly = actionLookup.run("IS_FRIEND", username);

      //     if (!isFriendly) {
      //       if (ctrl && !ctrl.my && creep.body.some(bodyPart => bodyPart === CLAIM)) {
      //         actionClaimController.run(creep);
      //       } else {
      //         if (creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      //           actionMove.run(creep, creep.room.controller, '#0066ff');
      //         } else {
      //           creepSay.sayGlobal(creep, '😡Attack!');
      //           creep.attackController(creep.room.controller)
      //         }
      //       }
      //     }
      //     creep.say('enemy controller');
      //   }
      //  else if (creep.room.controller.sign.username !== creep.owner.username) {
      //   actionSignController.sign(creep, creep.room.controlelr, null);
      //   creep.say('sign');
      //  }
      else {
        // actionExplore.run(creep);
        actionPatrol.run(creep, 49, 49)
      }
    } catch (e) {
      errorHandler.notify('Error in role.attack: ', e);
    }
  }
};

module.exports = roleAttack;
