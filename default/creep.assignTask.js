let actionConstruct = require('creep.action.construct');
let roleHarvester = require('creep.role.harvester');
let roleUpgrader = require('creep.role.upgrader');
let roleBuilder = require('creep.role.builder');
let roleRepair = require('creep.role.repairer');
let roleHealer = require('creep.role.healer');
let roleAttack = require('creep.role.attack');

module.exports = {
    assign: function(creep, panic) {

        //Assign tasks to each creep based on roles
        if (creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        } else if (creep.memory.role === 'upgrade') {
            roleUpgrader.run(creep);
        } else if (creep.memory.role === 'builder') {
            if (panic) {
                roleHarvester.run(creep);
            } else {
                roleBuilder.run(creep);
            }
        } else if (creep.memory.role === 'warrior' || creep.memory.role === 'archer') {
            roleAttack.run(creep);
        } else if (creep.memory.role === 'healer') {
            roleHealer.run(creep);
        } else if (creep.memory.role === 'repair') {
            if (panic) {
                roleHarvester.run(creep);
            } else {
                roleRepair.run(creep);
            }
        } else if (creep.memory.role === 'transporter') {
            roleHarvester.run(creep);
        }
    }
};