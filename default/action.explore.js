var actionClaimController = require('action.claimController');
var actionMove = require('action.move');
var errorHandler = require('error.notify');

var actionExplore = {

  run: function (creep) {
    if (creep.room.controller.my) {
      const exitsObject = Game.map.describeExits(creep.room.name);
      var listOfExists = JSON.stringify(exitsObject).replace("}", "").replace("{", "").split(',');
      findExitDir(listOfExists, exitDir);

      var firstExit = listOfExists[0].split(':');

      const exitDir = Game.map.findExit(creep.room, firstExit);
      const exit = creep.pos.findClosestByRange(exitDir);
      actionMove.run(creep, exit, '#ffaa00');
    } else {
      actionClaimController.run(creep);
    }
  }
};

var findExitDir = function (listOfExits, exitDir) {
  for (var exit in listOfExits) {
    console.log(exit);
  }
}

module.exports = actionExplore;
