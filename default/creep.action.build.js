let actionMove = require('creep.action.move');
let setTarget = require('creep.setTarget');
let errorHandler = require('error.notify');

let buildStructure = {

    run: function(creep, target) {

        try {
            let message = (creep.name + ' is building: ' + target);

            //Gets the object in memory or initialize object
            let toBuild = setTarget.set(creep, target, false, message);

            //Reset if conditions are true
            toBuild = setTarget.set(
                creep,
                target,
                (!toBuild || toBuild === null || !Game.constructionSites[toBuild.id] || Game.constructionSites[toBuild.id] === null),
                message,
                'Build'
            );

            if (creep.build(toBuild) == ERR_NOT_IN_RANGE) {
                actionMove.run(creep, toBuild, '#33cc33'); //lime green
            } else {
                creep.build(toBuild);
            }
        } catch (e) {
            errorHandler.notify('Error in creep.action.build: ', e);
        }

    }

};


module.exports = buildStructure;