var actionConstruct = require('action.construct');
var roleTransporter = require('role.transporter');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repairer');
var roleHealer = require('role.healer');
var roleAttack = require('role.attack');

module.exports = {
    assign: function(creep, panic) {

        //Assign tasks to each creep based on roles
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if (creep.memory.role == 'upgrade') {
            roleUpgrader.run(creep);
        } else if (creep.memory.role == 'builder') {
            if (panic) {
                roleHarvester.run(creep);
            } else {
                roleBuilder.run(creep);
            }
        } else if (creep.memory.role === 'warrior' || creep.memory.role === 'archer') {
            roleAttack.run(creep);
        } else if (creep.memory.role == 'healer') {
            roleHealer.run(creep);
        } else if (creep.memory.role == 'repair') {
            if (panic) {
                roleHarvester.run(creep);
            } else {
                roleRepair.run(creep);
            }
        } else if (creep.memory.role == 'transporter') {
            if (panic) {
                roleHarvester.run(creep);
            } else {
                roleTransporter.run(creep);
            }
        }
    }
};