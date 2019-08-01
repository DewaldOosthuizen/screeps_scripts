var errorHandler = require('error.notify');

var actionMove = {

    run: function(creep, target, color) {

        try {
            // Perform pathfinding only if we have enough CPU
            var resources = Game.cpu.tickLimit - Game.cpu.getUsed();
            //   console.log(resources);
            //   if (resources > 20) {
            creep.moveTo(target, {
                visualizePathStyle: {
                    stroke: color
                }
            });
            //   }
        } catch (e) {
            errorHandler.notify('Error in actionMove:' + creep.name + ' could not moving to ' + target, e);
        }
    }

};

module.exports = actionMove;