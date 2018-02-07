let actionClaimController = require('creep.action.claimController');
let actionMove = require('creep.action.move');
let errorHandler = require('error.notify');

let actionExplore = {

    run: function(creep) {
        if (creep.room.controller.my) {
            const exitsObject = Game.map.describeExits(creep.room.name);
            let listOfExists = JSON.stringify(exitsObject).replace("}", "").replace("{", "").split(',');
            console.log(listOfExists);
            // findExitDir(listOfExists, exitDir);

            let firstExit = (listOfExists[0].split(':')).toString().replace("]", "").replace("[", "").split(",");
            console.log(firstExit);
            let exit = JSON.stringify(firstExit).replace("]", "").replace("[", "").split(",");
            console.log(exit);

            // const exitDir = Game.map.findExit(creep.room, exit[1]);
            // exit = creep.pos.findClosestByPath(exitDir);
            actionMove.run(creep, Game.rooms[exit[1]], '#ffaa00');
        } else {
            actionClaimController.run(creep);
        }
    }
};

let findExitDir = function(listOfExits, exitDir) {
    for (let exit in listOfExits) {
        console.log(exit);
    }
}

module.exports = actionExplore;