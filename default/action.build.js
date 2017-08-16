var actionMove = require('action.move');
var setTarget = require('creep.setTarget');
var errorHandler = require('error.notify');

var buildStructure = {

  run: function(creep, target) {

    try {
      var message = (creep.name + ' is building: ' + target);

      //Gets the object in memory or initialize object
      var toBuild = setTarget.set(creep, target, false, message);

      //Reset if conditions are true
      var toBuild = setTarget.set(
        creep,
        target,
        (!toBuild || toBuild === null || !Game.constructionSites[toBuild.id] || Game.constructionSites[toBuild.id] === null),
        message,
        'ð¨Build'
      );

      if (creep.build(toBuild) == ERR_NOT_IN_RANGE) {
        actionMove.run(creep, toBuild, '#33cc33');
      } else {
        creep.build(toBuild);
      }
    } catch (e) {
      errorHandler.notify('Error in action.build: ', e);
    }

  }

};


module.exports = buildStructure;
