var spawner = require('spawn.createCreep');
var actionLookup = require('action.lookup');

module.exports = {

  spawnCollector: function(spawn) {
    //Used for harvesting resources
    
    var body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
    let energy = Game.rooms[spawn.room.name].energyAvailable;

    
    if (energy < actionLookup.calculateCreepBodyCost(body)) {
        body = [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
    }
    if (energy < actionLookup.calculateCreepBodyCost(body)) {
        body = [WORK, CARRY, CARRY, MOVE, MOVE];
    }
    
    if (energy >= actionLookup.calculateCreepBodyCost(body)) {
        spawner.createCreep(spawn, body, 'harvester', 'Collector');
    }
    
  },

  spawnEnhancer: function(spawn) {
    //Used for upgrading
    
    var body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
    let energy = Game.rooms[spawn.room.name].energyAvailable;

    
    if (energy < actionLookup.calculateCreepBodyCost(body)) {
        body = [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
    }
    if (energy < actionLookup.calculateCreepBodyCost(body)) {
        body = [WORK, CARRY, CARRY, MOVE, MOVE];
    }
    
    if (energy >= actionLookup.calculateCreepBodyCost(body)) {
        spawner.createCreep(spawn, body, 'upgrade', 'Enhancer');
    }
  },

  spawnConstructor: function(spawn) {
    //Used for building construction sites
    
    var body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];
    let energy = Game.rooms[spawn.room.name].energyAvailable;

    
    if (energy < actionLookup.calculateCreepBodyCost(body)) {
        body = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];
    }
    if (energy < actionLookup.calculateCreepBodyCost(body)) {
        body = [WORK, CARRY, CARRY, CARRY, MOVE];
    }
    
    if (energy >= actionLookup.calculateCreepBodyCost(body)) {
        spawner.createCreep(spawn, body, 'builder', 'Constructor');
    }
  },

  spawnEngineer: function(spawn) {
    //Used for repairing
    
    var body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];
    let energy = Game.rooms[spawn.room.name].energyAvailable;

    
    if (energy < actionLookup.calculateCreepBodyCost(body)) {
        body = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];
    }
    if (energy < actionLookup.calculateCreepBodyCost(body)) {
        body = [WORK, CARRY, CARRY, CARRY, MOVE];
    }
    
    if (energy >= actionLookup.calculateCreepBodyCost(body)) {
        spawner.createCreep(spawn, body, 'repair', 'Engineer');
    }
  },

  spawnAllocator: function(spawn) {
    //used for transporting energy to structures
    
    var body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
    let energy = Game.rooms[spawn.room.name].energyAvailable;

    
    if (energy < actionLookup.calculateCreepBodyCost(body)) {
        body = [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
    }
    if (energy < actionLookup.calculateCreepBodyCost(body)) {
        body = [WORK, CARRY, CARRY, MOVE, MOVE];
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
