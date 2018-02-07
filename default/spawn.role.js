let spawner = require('spawn.createCreep');
let lookup = require('lookup.find');

let shuffleArray = function(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

let defaultBodyConstruction = function(spawn, panic, part1, part2) {
    let body = [];
    let extensions = lookup.findRoomExtensions(spawn.room);
    let energycapacity = (panic === false) ? (extensions.length * 100) : lookup.findAllUsableEnergy(spawn.room);

    let moveCount = ((energycapacity / 2) / lookup.calculateCreepBodyCost([MOVE]));
    let part1Count = (((energycapacity / 2) / 2) / lookup.calculateCreepBodyCost([part1]));
    let part2Count = (((energycapacity / 2) / 2) / lookup.calculateCreepBodyCost([part2]));

    if (energycapacity <= 300) {
        moveCount = 0;
        part1Count = 0;
        part2Count = 0;
    } else {
        moveCount = moveCount > 25 ? 25 : moveCount;
        part1Count = part1Count > 15 ? 15 : part1Count;
        part2Count = part2Count > 10 ? 10 : part2Count;
    }

    if (moveCount === 0) {
        body.push(MOVE);
    } else {
        for (let i = 0; i < moveCount; i++) {
            body.push(MOVE);
        }
    }

    if (part1Count === 0) {
        body.push(part1);
    } else {
        for (let i = 0; i < part1Count; i++) {
            body.push(part1);
        }
    }

    if (part2Count === 0) {
        body.push(part2);
    } else {
        for (let i = 0; i < part2Count; i++) {
            body.push(part2);
        }
    }

    return shuffleArray(body);
}


module.exports = {

    /* 
    Body part	            Build cost	        Effect
        MOVE	               50	              - Moves the creep. Reduces creep fatigue by 2/tick. See movement.
        WORK	               100	              - Harvests energy from target source. Gathers 2 energy/tick.
                                                    Constructs a target structure. Builds the designated structure at a construction site, at 5 points/tick, consuming 1 energy/point. See building Costs.
                                                    Repairs a target structure. Repairs a structure for 20 hits/tick. Consumes 0.1 energy/hit repaired, rounded up to the nearest whole number.
        CARRY	               50	              - Stores energy. Contains up to 50 energy units. Weighs nothing when empty.
        ATTACK	               80	              - Attacks a target creep/structure. Deals 30 damage/tick. Short-ranged attack (1 tile).
        RANGED_ATTACK	       150	              - Attacks a target creep/structure. Deals 10 damage/tick. Long-ranged attack (1 to 3 tiles).
        HEAL	               250	              - Heals a target creep. Restores 12 hit points/tick at short range (1 tile) or 4 hits/tick at a distance (up to 3 tiles).
        TOUGH	               10	              - No effect other than the 100 hit points all body parts add. This provides a cheap way to add hit points to a creep.
        CLAIM	               600
    */
    spawnAllocator: function(spawn, panic) {
        //used for transporting energy to structures
        let body = defaultBodyConstruction(spawn, panic, CARRY, WORK);
        spawner.createCreep(spawn, body, 'harvester', 'Allocator');
    },

    spawnEnhancer: function(spawn, panic) {
        //Used for upgrading
        let body = defaultBodyConstruction(spawn, panic, WORK, CARRY);
        spawner.createCreep(spawn, body, 'upgrade', 'Enhancer');
    },

    spawnConstructor: function(spawn, panic) {
        //Used for building construction sites
        let body = defaultBodyConstruction(spawn, panic, WORK, CARRY);
        spawner.createCreep(spawn, body, 'builder', 'Constructor');
    },

    spawnEngineer: function(spawn, panic) {
        //Used for repairing
        let body = defaultBodyConstruction(spawn, panic, WORK, CARRY);
        spawner.createCreep(spawn, body, 'repair', 'Engineer');
    },

    spawnWarrior: function(spawn, panic) {
        //used for close combat battle
        let body = defaultBodyConstruction(spawn, panic, ATTACK, TOUGH);
        spawner.createCreep(spawn, body, 'warrior', 'Warrior');

    },

    spawnArcher: function(spawn, panic) {
        //used for ranged battle
        let body = defaultBodyConstruction(spawn, panic, RANGED_ATTACK, TOUGH);
        spawner.createCreep(spawn, body, 'archer', 'Archer');

    },

    spawnMage: function(spawn, panic) {
        //used for healing injured troops
        let body = defaultBodyConstruction(spawn, panic, HEAL, TOUGH);
        spawner.createCreep(spawn, body, 'healer', 'Mage');

    }

};