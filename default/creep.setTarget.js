var errorHandler = require('error.notify');
var creepSay = require('creep.say');
var roomVisual = require('room.visual');
var _ = require('lodash');

var setTarget = {

  set: function (creep, target, overwrite, roomDisplayMessage, sayMessage) {
    try {

      //Check if there is an object in memory to avoid moving around as values change else set the value
      if (!creep.memory.target || creep.memory.target === null || (overwrite && overwrite === true)) {
        creep.memory.target = target
        roomVisual.display(creep.room.name, roomDisplayMessage, 25, 0, 'white', 0.7, 'black');
        creepSay.say(creep, sayMessage);
      }

      var object = Game.getObjectById(creep.memory.target.id);
      var toReturn = object && object !== null ? object : creep.memory.target != null ? creep.memory.target : target;

      // console.log(creep.name + ' target is ' + toReturn);

      return toReturn;

    } catch (e) {
      errorHandler.notify('Error in setTarget: ', e);
      return null;
    }

  }

};


module.exports = setTarget;
