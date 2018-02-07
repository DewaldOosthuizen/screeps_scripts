let actionMove = require('creep.action.move');
let actionFollow = require('creep.action.follow');
let lookup = require('lookup.find');
let actionSignController = require('creep.action.signController');
let errorHandler = require('error.notify');
let creepSay = require('creep.say');

let roleHealer = {

    run: function(creep) {
        try {
            // Find injured creep
            const target = lookup.findMyDamagedCreeps(creep.room);

            const controller = creep.room.controlelr;

            // If injured creep
            if (target && target.length > 0) {
                if (creep.heal(target[0]) == ERR_NOT_IN_RANGE) {
                    actionMove.run(creep, target[0], '#ffff00');//yellow
                } else {
                    creep.heal(target[0])
                    creepSay.sayGlobal(creep, 'Healing');
                }
            } else if (controller.sign.username !== creep.owner.username) {
                actionSignController.sign(creep, controller, null);
            } else {
                // Find warrior creeps
                let warriors = _.filter(Game.creeps, {
                    memory: {
                        role: 'attack'
                    }
                });
                actionFollow.run(creep, (warriors && warriors.length > 0 ? warriors[0] : null))
            }
        } catch (e) {
            errorHandler.notify('Error in creep.role.healer: ', e);
        }

    }
};

module.exports = roleHealer;