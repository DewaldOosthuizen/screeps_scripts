var actionMove = require('action.move');
var setTarget = require('creep.setTarget');
var errorHandler = require('error.notify');

var actionPatrol = {

    run: function(creep, maxX, maxY) {
        try {
            var positionObject = generateRoomPosition(maxX, maxY);

            var message = (creep.name + ' is now patrolling to ' + positionObject);

            //Gets the object in memory or initialize object
            var target = setTarget.set(creep, positionObject, false, message);

            //Reset if conditions are true
            var targetPosition = Game.rooms[target.roomName].getPositionAt(target.x, target.y);
            setTarget.set(
                creep,
                positionObject,
                (!creep.memory.target || creep.memory.target === null || targetPosition === creep.pos),
                message,
                'ð¤Patrol'
            );

            actionMove.run(creep, Game.rooms[target.roomName].getPositionAt(target.x, target.y), '#ff0000');
        } catch (err) {
            errorHandler.notify('Error in action.patrol: ', err);
        }

    }
};

var generateRoomPosition = function(maxX, maxY) {
    let costs = new PathFinder.CostMatrix;
    var positionObject = new RoomPosition(Math.floor((Math.random() * maxX) + 1), Math.floor((Math.random() * maxY) + 1), creep.room.name);

    if (costs.get(positionObject.x, positionObject.y) === 255) {
        return generateRoomPosition();
    } else {
        return positionObject;
    }
}

module.exports = actionPatrol;