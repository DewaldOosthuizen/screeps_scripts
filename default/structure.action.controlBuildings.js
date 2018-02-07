let lookup = require('lookup.find');
let errorHandler = require('error.notify');
let towerCommands = require('structure.tower.commands');

let controlBuildings = {

    towerDefendRoom: function(myRoom) {
        towerCommands.defendRoom(myRoom);
    }

};

module.exports = controlBuildings;