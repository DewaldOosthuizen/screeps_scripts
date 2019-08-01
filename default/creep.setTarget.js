let errorHandler = require('error.notify');
let creepSay = require('creep.say');
let roomVisual = require('room.visual');
let _ = require('lodash');

let setTarget = {

    set: function(creep, target, overwrite, roomDisplayMessage, sayMessage) {
        try {

            //Check if there is an object in memory to avoid moving around as values change else set the value
            if (!creep.memory.target || creep.memory.target === null || (overwrite && overwrite === true)) {
                creep.memory.target = target
                roomVisual.display(creep.room.name, roomDisplayMessage, 25, 0, 'white', 0.7, 'black');
                creepSay.say(creep, sayMessage);

                console.log(creep.name + ' target is ' + creep.memory.target);
            }
            let object = Game.getObjectById(creep.memory.target.id);
            let toReturn = object && object !== null ? object : creep.memory.target != null ? creep.memory.target : target;

            return toReturn;


        } catch (e) {
            errorHandler.notify('Error in setTarget: ', e);
            return null;
        }

    }

};


module.exports = setTarget;