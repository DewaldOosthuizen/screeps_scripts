var _ = require('lodash');

module.exports = {

    getLookupMemorySegment0: function(room) {
        var memoryJSON = JSON.parse(RawMemory.segments[0]);

        //console.log(JSON.stringify(memoryJSON));

        var roomJSON = _.filter(memoryJSON.rooms, function(mem) {
            return mem.roomName === room.name
        });

        // console.log(JSON.stringify(roomJSON));

        return roomJSON[0].lookup[0];
    },

    findMyTowers: function(room) {
        return room.find(
            FIND_MY_STRUCTURES, {
                filter: {
                    structureType: STRUCTURE_TOWER
                }
            }
        );
    },

    findMyDamagedStructures: function(room) {
        var damaged = [];
        
        damaged = room.find(FIND_STRUCTURES, {
              filter: structure => (structure.structureType !== STRUCTURE_WALL && ((structure.hits / structure.hitsMax) * 100) < 20)
        });
        
        if (damaged.length === 0) {
            damaged = room.find(FIND_STRUCTURES, {
                  filter: structure => (structure.structureType !== STRUCTURE_WALL && structure.structureType !== STRUCTURE_RAMPART && (((structure.hits / structure.hitsMax) * 100) < 80))
            });
        }

        if (damaged.length === 0) {
            damaged = room.find(FIND_STRUCTURES, {
                filter: structure => (((structure.hits / structure.hitsMax) * 100) < 80)
            });
        }

        return _.sortBy(damaged, s => ((s.hits / s.hitsMax) * 100));
    },

    findHostileCreeps: function(room) {
        return findHostileCreepsFunc(room);
    },

    findConstructionSites: function(room) {
        var sites = room.find(FIND_CONSTRUCTION_SITES);
        return sites.sort((a, b) => b.progress > a.progress ? b : a);
    },

    findSources: function(room) {
        var sources = room.find(FIND_SOURCES, {
            filter: source => source.energy > 0
        });

        //Sorts sources by buildings having the higest percentage of energy
        return sources.sort((a, b) => ((a.energy / a.energyCapacity) * 100) > ((b.energy / b.energyCapacity) * 100) ? a : b);
    },

    findMyDamagedCreeps: function(room) {
        var creeps = room.find(FIND_MY_CREEPS, {
            filter: object => object.hits < object.hitsMax
        });

        //Sorts creeps by having the least percentage of health
        return _.sortBy(creeps, c => ((c.hits / c.hitsMax) * 100));
    },

    findDumpSites: function(room) {

        //Get all hostiles in the room
        var hostiles = findHostileCreepsFunc(room);
        var target = [];

        //If hostiles have entered the room, all energy should be carried to the tower
        if (hostiles.length > 0) {
            if (target.length === 0) {
                target = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });
            }
        } else {
            if (target.length <= 0) {
                //Find all structures other than spawn and towers that require energy
                target = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType !== STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });

                if (target.length === 0) {
                    target = room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                        }
                    });
                }
            }
        }

        if (target.length === 0) {
            //Find all structures that require energy
            target = findAllDumpSitesFunc(room);
        }


        //Sorts targets by buildings having the least percentage of energy
        var targetsSorted = _.sortBy(target, t => ((t.energy / t.energyCapacity) * 100));

        return targetsSorted;
    },

    findAllStructuresWithEnergy: function(room) {
        var sources = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType !== STRUCTURE_SPAWN && structure.structureType !== STRUCTURE_TOWER && structure.energy > 0;
            }
        });

        //Sorts targets by buildings having the higest percentage of energy
        return sources.sort((a, b) => ((a.energy / a.energyCapacity) * 100) > ((b.energy / b.energyCapacity) * 100) ? a : b);
    },

    findDroppedSources: function(room) {
        var sources = room.find(FIND_DROPPED_RESOURCES);

        //Sorts targets by sources having the higest percentage of energy
        return sources.sort((a, b) => ((a.energy / a.energyCapacity) * 100) > ((b.energy / b.energyCapacity) * 100) ? a : b);
    },

    findAllDumpSites: function(room) {
        return findAllDumpSitesFunc(room);
    },

    countAllCreepsByRole: function(room) {
        return countAllCreepsByRoleFunc(room);
    },

    findRoomExtensions: function(room) {

        //Find all structures other than spawn and towers that require energy
        var extensions = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION);
            }
        });

        return extensions;
    },

    calculateCreepBodyCost: function(body) {
        let cost = _.sum(body.map(function(part) {
            return BODYPART_COST[part]
        }));

        return cost;
    }

};


//Check for friendly
var isFriendlyFunc = function(username) {
    return ["Mizaku", "Jamarkey"].some(friendly => friendly === username);
}


//Find all dumping structures
var findAllDumpSitesFunc = function(room) {

    //Find all structures other than spawn that require energy
    var target = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.energy < structure.energyCapacity;
        }
    });

    //Sorts targets by buildings having the least percentage of energy
    return _.sortBy(target, t => ((t.energy / t.energyCapacity) * 100));
}

var findHostileCreepsFunc = function(room) {
    return room.find(FIND_HOSTILE_CREEPS, {
        filter: hostile => !isFriendlyFunc((hostile && hostile.owner ? hostile.owner.username : "Enemy"))
    });
}

var countHarvesterCreepsFunc = function(myRoom) {
    return _.filter(Game.creeps, {
        room: {
            name: myRoom.name
        },
        memory: {
            role: 'harvester'
        }
    }).length;
}

var countUpgradeCreepsFunc = function(myRoom) {
    return _.filter(Game.creeps, {
        room: {
            name: myRoom.name
        },
        memory: {
            role: 'upgrade'
        }
    }).length;
}

var countBuilderCreepsFunc = function(myRoom) {
    return _.filter(Game.creeps, {
        room: {
            name: myRoom.name
        },
        memory: {
            role: 'builder'
        }
    }).length;
}

var countRepairerCreepsFunc = function(myRoom) {
    return _.filter(Game.creeps, {
        room: {
            name: myRoom.name
        },
        memory: {
            role: 'repair'
        }
    }).length;
}

var countWarriorCreepsFunc = function(myRoom) {
    return _.filter(Game.creeps, {
        room: {
            name: myRoom.name
        },
        memory: {
            role: 'warrior'
        }
    }).length;
}

var countArcherCreepsFunc = function(myRoom) {
    return _.filter(Game.creeps, {
        room: {
            name: myRoom.name
        },
        memory: {
            role: 'archer'
        }
    }).length;
}

var countHealerCreepsFunc = function(myRoom) {
    return _.filter(Game.creeps, {
        room: {
            name: myRoom.name
        },
        memory: {
            role: 'healer'
        }
    }).length;
}

var countTransporterCreepsFunc = function(myRoom) {
    return _.filter(Game.creeps, {
        room: {
            name: myRoom.name
        },
        memory: {
            role: 'transporter'
        }
    }).length;
}


var countAllCreepsByRoleFunc = function(myRoom) {
    var allCreeps = {};

    allCreeps.harvesters = countHarvesterCreepsFunc(myRoom);
    allCreeps.upgraders = countUpgradeCreepsFunc(myRoom);
    allCreeps.builders = countBuilderCreepsFunc(myRoom);
    allCreeps.repairer = countRepairerCreepsFunc(myRoom);
    allCreeps.warriors = countWarriorCreepsFunc(myRoom);
    allCreeps.archers = countArcherCreepsFunc(myRoom);
    allCreeps.healers = countHealerCreepsFunc(myRoom);
    allCreeps.transporters = countTransporterCreepsFunc(myRoom);

    return allCreeps;
}