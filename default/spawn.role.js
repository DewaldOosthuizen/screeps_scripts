var spawner = require('spawn.createCreep');
var actionLookup = require('action.lookup');

module.exports = {

    spawnCollector: function(spawn, useEnergyCostMatrix) {
        //Used for harvesting resources

        var body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]; //COST: 800
        let energy = Game.rooms[spawn.room.name].energyAvailable;
        let extensions = actionLookup.findRoomExtensions(spawn.room);

        if (useEnergyCostMatrix) {
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 800
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 700
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 550
                body = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 450
                body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 300
                body = [WORK, CARRY, CARRY, MOVE, MOVE];
            }
        } else {
            if (extensions.length >= 10) {
                //COST: 800
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            } else if (extensions.length >= 8) {
                //COST: 700
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
            } else if (extensions.length >= 5) {
                //COST: 550
                body = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            } else if (extensions.length >= 3) {
                //COST: 450
                body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
            } else {
                //COST: 300
                body = [WORK, CARRY, CARRY, MOVE, MOVE];
            }
        }


        if (energy >= actionLookup.calculateCreepBodyCost(body)) {
            spawner.createCreep(spawn, body, 'harvester', 'Collector');
        }

    },

    spawnEnhancer: function(spawn, useEnergyCostMatrix) {
        //Used for upgrading

        var body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]; //COST: 800
        let energy = Game.rooms[spawn.room.name].energyAvailable;
        let extensions = actionLookup.findRoomExtensions(spawn.room);

        if (useEnergyCostMatrix) {
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 800
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 700
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 550
                body = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 450
                body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 300
                body = [WORK, CARRY, CARRY, MOVE, MOVE];
            }
        } else {
            if (extensions.length >= 10) {
                //COST: 800
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            } else if (extensions.length >= 8) {
                //COST: 700
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
            } else if (extensions.length >= 5) {
                //COST: 550
                body = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            } else if (extensions.length >= 3) {
                //COST: 450
                body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
            } else {
                //COST: 300
                body = [WORK, CARRY, CARRY, MOVE, MOVE];
            }
        }

        if (energy >= actionLookup.calculateCreepBodyCost(body)) {
            spawner.createCreep(spawn, body, 'upgrade', 'Enhancer');
        }
    },

    spawnConstructor: function(spawn, useEnergyCostMatrix) {
        //Used for building construction sites

        var body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]; //COST: 800
        let energy = Game.rooms[spawn.room.name].energyAvailable;

        let extensions = actionLookup.findRoomExtensions(spawn.room);

        if (useEnergyCostMatrix) {
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 800
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 700
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 550
                body = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 450
                body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 300
                body = [WORK, CARRY, CARRY, MOVE, MOVE];
            }
        } else {
            if (extensions.length >= 10) {
                //COST: 800
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            } else if (extensions.length >= 8) {
                //COST: 700
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
            } else if (extensions.length >= 5) {
                //COST: 550
                body = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            } else if (extensions.length >= 3) {
                //COST: 450
                body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
            } else {
                //COST: 300
                body = [WORK, CARRY, CARRY, MOVE, MOVE];
            }
        }

        if (energy >= actionLookup.calculateCreepBodyCost(body)) {
            spawner.createCreep(spawn, body, 'builder', 'Constructor');
        }
    },

    spawnEngineer: function(spawn, useEnergyCostMatrix) {
        //Used for repairing

        var body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]; //COST: 800
        let energy = Game.rooms[spawn.room.name].energyAvailable;
        let extensions = actionLookup.findRoomExtensions(spawn.room);

        if (useEnergyCostMatrix) {
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 800
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 700
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 550
                body = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 450
                body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 300
                body = [WORK, CARRY, CARRY, MOVE, MOVE];
            }
        } else {
            if (extensions.length >= 10) {
                //COST: 800
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            } else if (extensions.length >= 8) {
                //COST: 700
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
            } else if (extensions.length >= 5) {
                //COST: 550
                body = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            } else if (extensions.length >= 3) {
                //COST: 450
                body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
            } else {
                //COST: 300
                body = [WORK, CARRY, CARRY, MOVE, MOVE];
            }
        }

        if (energy >= actionLookup.calculateCreepBodyCost(body)) {
            spawner.createCreep(spawn, body, 'repair', 'Engineer');
        }
    },

    spawnAllocator: function(spawn, useEnergyCostMatrix) {
        //used for transporting energy to structures

        var body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]; //COST: 800
        let energy = Game.rooms[spawn.room.name].energyAvailable;
        let extensions = actionLookup.findRoomExtensions(spawn.room);

        if (useEnergyCostMatrix) {
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 800
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 700
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 550
                body = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 450
                body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
            }
            if (energy < actionLookup.calculateCreepBodyCost(body)) {
                //COST: 300
                body = [WORK, CARRY, CARRY, MOVE, MOVE];
            }
        } else {
            if (extensions.length >= 10) {
                //COST: 800
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            } else if (extensions.length >= 8) {
                //COST: 700
                body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
            } else if (extensions.length >= 5) {
                //COST: 550
                body = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            } else if (extensions.length >= 3) {
                //COST: 450
                body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
            } else {
                //COST: 300
                body = [WORK, CARRY, CARRY, MOVE, MOVE];
            }
        }

        if (energy >= actionLookup.calculateCreepBodyCost(body)) {
            spawner.createCreep(spawn, body, 'transporter', 'Allocator');
        }
    },

    spawnWarrior: function(spawn) {
        //used for close combat battle
        spawner.createCreep(spawn, [MOVE, TOUGH, ATTACK, ATTACK], 'warrior', 'Warrior');
    },

    spawnArcher: function(spawn) {
        //used for ranged battle
        spawner.createCreep(spawn, [MOVE, MOVE, RANGED_ATTACK], 'archer', 'Archer');
    },

    spawnMage: function(spawn) {
        //used for healing injured troops
        spawner.createCreep(spawn, [MOVE, HEAL], 'healer', 'Mage');
    }

};