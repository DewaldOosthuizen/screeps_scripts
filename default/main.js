let actionControlBuildings = require('structure.action.controlBuildings');

let creepSpawn = require('creep.spawn');
let creepResetRole = require('creep.resetRole');
let creepAssignTask = require('creep.assignTask');

let memoryRefresh = require('memory.refresh');

let _ = require('lodash');



module.exports.loop = function() {

    for (let i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    for (let name in Game.rooms) {
        let room = Game.rooms[name];

        //If no harvesters exist, default other roles to be harvesters
        //TODO: Move to lookup.find.js
        let totalHarvesters = _.filter(Game.creeps, {
            room: {
                name: name
            },
            memory: {
                role: 'harvester'
            }
        }).length;

        let panic = (totalHarvesters === 0);

        //Defend each room with towers, if no enemies repair damaged structures
        actionControlBuildings.towerDefendRoom(room);

        //Control spawning of creeps for each room
        creepSpawn.run(room, panic);

        //Get all the creeps for the current room
        let roomCreeps = _.filter(Game.creeps, {
            room: {
                name: name
            }
        });

        //Control creeps per room
        roomCreeps.forEach(creep => {
            creepResetRole.reset(creep, false);
            creepAssignTask.assign(creep, panic);
            // creep.memory.target = null;
        });

    }

    Memory.time = Game.time;
}