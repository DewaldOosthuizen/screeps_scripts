let actionMove = require('creep.action.move');
let actionPatrol = require('creep.action.patrol');
let lookup = require('lookup.find');
let actionExplore = require('creep.action.explore');
let actionClaimController = require('creep.action.claimController');
let actionSignController = require('creep.action.signController');
let errorHandler = require('error.notify');
let creepSay = require('creep.say');

let roleAttack = {
    run: function(creep) {
        try {
            const target = lookup.findHostileCreeps(creep.room);
            const building = undefined//lookup.findHostileBuildings(creep);
            if (target && target.length > 0) {
                creep.memory.target = null;
                let enemy = target[0];
                if (creep.attack(enemy) === ERR_NOT_IN_RANGE) {
                    actionMove.run(creep, enemy, '#0066ff'); //Blue line
                } else {
                    creep.attack(enemy);
                }
                creepSay.sayGlobal(creep, 'Attack!');
            } else if (building) {
                if (creep.attack(building) === ERR_NOT_IN_RANGE) {
                    actionMove.run(creep, building, '#0066ff');
                } else {
                    creepSay.sayGlobal(creep, 'Destroy!');
                    creep.attack(building);
                }
            } else {
                // creep.memory.target = null;
                for (let flag in Game.flags) {
                    actionPatrol.runToFlag(creep, flag);
                }
            }
        } catch (e) {
            errorHandler.notify('Error in creep.role.attack: ', e);
        }
    }
};

module.exports = roleAttack;