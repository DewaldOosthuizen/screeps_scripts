var actionDefendRoom = require('action.defendRoom');

var creepSpawn = require('creep.spawn');
var creepResetRole = require('creep.resetRole');
var creepAssignTask = require('creep.assignTask');

var memoryRefresh = require('memory.refresh');

var _ = require('lodash');



module.exports.loop = function() {

    // if (Game.cpu.bucket > 200) {
    //  //Refresh lookups to memory
    //  memoryRefresh.refresh();
    // }

    for (var i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    for (var name in Game.rooms) {
        var room = Game.rooms[name];

        //If no harvesters exist, default other roles to be harvesters
        //TODO: Move to action.lookup.js
        var totalHarvesters = _.filter(Game.creeps, {
            room: {
                name: name
            },
            memory: {
                role: 'harvester'
            }
        }).length;

        var totalTransporters = _.filter(Game.creeps, {
            room: {
                name: name
            },
            memory: {
                role: 'transporter'
            }
        }).length;

        var panic = (totalHarvesters + totalTransporters) === 0;


        //Defend each room with towers
        actionDefendRoom.run(room);

        //Control spawning of creeps for each room
        creepSpawn.run(room, panic);

        //Get all the creeps for the current room
        var roomCreeps = _.filter(Game.creeps, {
            room: {
                name: name
            }
        });

        //Control creeps per room
        roomCreeps.forEach(creep => {
            creepResetRole.reset(creep, false);
            creepAssignTask.assign(creep, panic);

            //   if (Game.time % 1 === 0) {
            //      creepResetRole.reset(creep, true);
            //      console.log('Force reset ' + creep.name + ' role');
            //   }
        });

    }


    Memory.time = Game.time;
}