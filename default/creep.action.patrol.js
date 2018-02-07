let actionMove = require('creep.action.move');
let setTarget = require('creep.setTarget');
let errorHandler = require('error.notify');

let actionPatrol = {

    run: function(creep, maxX, maxY) {
        try {
            let positionObject = generateRoomPosition(creep, maxX, maxY);

            let message = (creep.name + ' is now patrolling to ' + positionObject);

            //Gets the object in memory or initialize object
            let target = setTarget.set(creep, positionObject, false, message);

            //Reset if conditions are true
            let targetPosition = Game.rooms[target.roomName].getPositionAt(target.x, target.y);
            target = setTarget.set(
                creep,
                positionObject,
                (!creep.memory.target || creep.memory.target === null || (targetPosition.x === creep.pos.x && targetPosition.y === creep.pos.y)),
                message,
                'Patrol'
            );

            actionMove.run(creep, Game.rooms[target.roomName].getPositionAt(target.x, target.y), '#ff0000');
        } catch (err) {
            errorHandler.notify('Error in creep.action.patrol: ', err);
        }

    },

    runToFlag: function(creep, flag) {
        try {
            let flagObj = Game.flags[flag];
            let message = (creep.name + ' is now patrolling to ' + flag);

            //Gets the object in memory or initialize object
            let target = setTarget.set(creep, flagObj, false, message);
            let nextFlag = Game.flags['Flag' + (Number(target.name.replace(/[^0-9]/g, '')) + 1)];
            if (nextFlag) {
                flagObj = nextFlag;
            } else {
                flagObj = Game.flags['Flag1'];
            }

            //Reset if conditions are true
            target = setTarget.set(
                creep,
                flagObj,
                (!creep.memory.target || creep.memory.target === null || (creep.memory.target.pos.x === creep.pos.x && creep.memory.target.pos.y === creep.pos.y)),
                message,
                'Patrol'
            );
            actionMove.run(creep, Game.flags[target.name], '#ff0000'); //Red
        } catch (err) {
            errorHandler.notify('Error in creep.action.patrol: ', err);
        }

    }
};

let generateRoomPosition = function(creep, maxX, maxY) {
    let costs = new PathFinder.CostMatrix();

    let positionObject = new RoomPosition(Math.floor((Math.random() * maxX) + 1), Math.floor((Math.random() * maxY) + 1), creep.room.name);

    if (costs.get(positionObject.x, positionObject.y) === 255) {
        return generateRoomPosition();
    } else {
        return positionObject;
    }
}

module.exports = actionPatrol;