let _ = require('lodash');

module.exports = {

    getLookupMemorySegment0: function(room) {
        let memoryJSON = JSON.parse(RawMemory.segments[0]);

        //console.log(JSON.stringify(memoryJSON));

        let roomJSON = _.filter(memoryJSON.rooms, function(mem) {
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
        let damaged = room.find(FIND_STRUCTURES, {
                    filter: structure => (structure.structureType === STRUCTURE_RAMPART && structure.hits < 15000)
                });
        
        if (damaged.length === 0) {
                damaged = room.find(FIND_STRUCTURES, {
                    filter: structure => (structure.structureType !== STRUCTURE_WALL && structure.structureType !== STRUCTURE_RAMPART && (((structure.hits / structure.hitsMax) * 100) < 80))
                });
        }

        if (damaged.length === 0) {
            damaged = room.find(FIND_STRUCTURES, {
                filter: structure => (structure.structureType === STRUCTURE_WALL || structure.structureType === STRUCTURE_RAMPART && (((structure.hits / structure.hitsMax) * 100) < 20))
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
    
    findHostileBuildings: function(creep) {
        let toReturn;
        let list = []
        for (let flag in Game.flags) {
            flag = Game.flags[flag];
            if (flag.room) {
                let hostiles = flag.room.find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                    return structure.owner && !structure.my
                                }
                });
            
                list.push.apply(list, hostiles);
            }
        
        }
        
        if (list.length > 0) {
            toReturn = creep.pos.findClosestByPath(list);
        } else {
            toReturn = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                                filter: (structure) => {
                                    return structure.owner && !structure.my
                }
            });
        }
        
        
        return toReturn;
    },

    findConstructionSites: function(creep) {
        let toReturn;
        let sites = [];
        
        for (let flag in Game.flags) {
            flag = Game.flags[flag];
            if (flag.room) {
                 sites.push.apply(sites, flag.room.find(FIND_CONSTRUCTION_SITES));
            }
        }
        
        if (sites.length > 0) {
            toReturn = creep.pos.findClosestByPath(sites);
            if (!toReturn) {
                toReturn = sites[0];
            }
        } else {
            toReturn = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        }
        return toReturn;
    },

    findSources: function(room) {
        let sources = room.find(FIND_SOURCES, {
            filter: source => source.energy > 0
        });
        
        //Sorts sources by buildings having the higest percentage of energy
        return sources.sort((a, b) => ((a.energy / a.energyCapacity) * 100) > ((b.energy / b.energyCapacity) * 100) ? a : b);
    },

    findSourcesClosestToCreep: function(creep) {
        let toReturn;
        let sources = [];
        
        // for (let flag in Game.flags) {
        //     flag = Game.flags[flag];
        //     if (flag.room) {
                let sourceList = creep.room.find(FIND_SOURCES, {
                    filter: source => source.energy > 0 && Game.getObjectById(source.id)
                });
                
                sources.push.apply(sources, sourceList);
            // }
        // }
    
        if (sources.length > 0) {
            toReturn = creep.pos.findClosestByPath(sources);
            if (!toReturn) {
                toReturn = sources[0];
            }
        } else {
            toReturn = creep.pos.findClosestByPath(FIND_SOURCES, {
                    filter: source => source.energy > 0
                });
        }
        
       
        return toReturn;
    },

    findMyDamagedCreeps: function(room) {
        let creeps = room.find(FIND_MY_CREEPS, {
            filter: creep => creep.hits < creep.hitsMax
        });

        //Sorts creeps by having the least percentage of health
        return _.sortBy(creeps, c => ((c.hits / c.hitsMax) * 100));
    },

    findDumpSites: function(room) {
        return findDumpSites(room);
    },

    findDumpSitesClosestToCreep: function(creep) {
        return findDumpSitesClosestToCreep(creep);
    },

    findAllUsableEnergy: function(room) {
        let sources = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION) && structure.energy > 0;
            }
        });
        
        return _.sum(sources.map(function(source) {
            return source.energy
        }));
    },

    findDroppedSources: function(room) {
        //Sorts targets by sources having the higest percentage of energy
        return findDroppedSources(room);
    },

    findAllDumpSites: function(room) {
        return findAllDumpSitesFunc(room);
    },

    countAllCreepsByRole: function(room) {
        return countAllCreepsByRoleFunc(room);
    },

    findRoomExtensions: function(room) {
        //Find all structures other than spawn and towers that require energy
        let extensions = room.find(FIND_STRUCTURES, {
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
    },

    findEngineerDumpSites: function(room) {
        return findEngineerDumpSites(room);
    },
    
    //TODO:Fix up
    findExtractorDumpSite: function(room) {
        let buildings = room.find(FIND_STRUCTURES, {
            filter: building => (building.structureType == STRUCTURE_STORAGE || building.structureType == STRUCTURE_CONTAINER) && building.energy > 0
        });

        //Sorts structures by buildings having the loweas percentage of energy
        return sources.sort((a, b) => ((a.store / a.storeCapacity) * 100) < ((b.store / b.storeCapacity) * 100) ? a : b);
    },

    isFriendly: function(username) {
        return ["Mizaku", "Jamarkey"].some(friendly => friendly === username);
    }


};


/* Reusable variables */


//Check for friendly
let isFriendlyFunc = function(username) {
    return ["Mizaku", "Jamarkey"].some(friendly => friendly === username);
}


//Find all dumping structures
let findAllDumpSitesFunc = function(room) {

    //Find all structures other than spawn that require energy
    let target = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.energy < structure.energyCapacity;
        }
    });

    //Sorts targets by buildings having the least percentage of energy
    return _.sortBy(target, t => ((t.energy / t.energyCapacity) * 100));
}

let findHostileCreepsFunc = function(room) {
    return room.find(FIND_HOSTILE_CREEPS, {
        filter: hostile => !isFriendlyFunc((hostile && hostile.owner ? hostile.owner.username : "Enemy"))
    });
}

let countHarvesterCreepsFunc = function(myRoom) {
    return _.filter(Game.creeps, {
        room: {
            name: myRoom.name
        },
        memory: {
            role: 'harvester'
        }
    }).length;
}

let countUpgradeCreepsFunc = function(myRoom) {
    return _.filter(Game.creeps, {
        room: {
            name: myRoom.name
        },
        memory: {
            role: 'upgrade'
        }
    }).length;
}

let countBuilderCreepsFunc = function(myRoom) {
    return _.filter(Game.creeps, {
        room: {
            name: myRoom.name
        },
        memory: {
            role: 'builder'
        }
    }).length;
}

let countRepairerCreepsFunc = function(myRoom) {
    return _.filter(Game.creeps, {
        room: {
            name: myRoom.name
        },
        memory: {
            role: 'repair'
        }
    }).length;
}

let countWarriorCreepsFunc = function(myRoom) {
    return _.filter(Game.creeps, {
        room: {
            name: myRoom.name
        },
        memory: {
            role: 'warrior'
        }
    }).length;
}

let countArcherCreepsFunc = function(myRoom) {
    return _.filter(Game.creeps, {
        room: {
            name: myRoom.name
        },
        memory: {
            role: 'archer'
        }
    }).length;
}

let countHealerCreepsFunc = function(myRoom) {
    return _.filter(Game.creeps, {
        room: {
            name: myRoom.name
        },
        memory: {
            role: 'healer'
        }
    }).length;
}

let countTransporterCreepsFunc = function(myRoom) {
    return _.filter(Game.creeps, {
        room: {
            name: myRoom.name
        },
        memory: {
            role: 'transporter'
        }
    }).length;
}


let countAllCreepsByRoleFunc = function(myRoom) {
    let allCreeps = {};

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

let findDumpSites = function(room) {

    //Get all hostiles in the room
    let hostiles = findHostileCreepsFunc(room);
    let target = [];

    //If hostiles have entered the room, all energy should be carried to the tower
    if (hostiles.length > 0) {
        target = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });
    }
    if (target.length <= 0) {
        //Find all structures other than spawn and towers that require energy
        target = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
            }
        });
    }

    if (target.length <= 0) {
        //Find all structures other than spawn and towers that require energy
        target = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType !== STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });
    }

    if (target.length <= 0) {
        //Find all structures that require energy
        target = findAllDumpSitesFunc(room);
    }

    //Sorts targets by buildings having the least percentage of energy
    let targetsSorted = _.sortBy(target, t => ((t.energy / t.energyCapacity) * 100));

    return targetsSorted;
}

let findDumpSitesClosestToCreep = function(creep) {
    
    //Get all hostiles in the room
    let hostiles = findHostileCreepsFunc(creep.room);
    let target;
    let list = []

    //If hostiles have entered the room, all energy should be carried to the tower
    if (hostiles.length > 0) {
        target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });
    }
    if (!target) {
        for (let flag in Game.flags) {
            flag = Game.flags[flag];
            if (flag.room) {
                let targets = flag.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType !== STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });
             
             list.push.apply(list, targets);   
            }
        }
        
        
        if (list.length > 0) {
            target = creep.pos.findClosestByPath(list);
        } else {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType !== STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });
        }
        
        
    //     //Find all structures other than spawn and towers that require energy
    //     target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    //         filter: (structure) => {
    //             return (structure.structureType === STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
    //         }
    //     });
    }

    // if (!target) {
    //     //Find all structures other than spawn and towers that require energy
    //     target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    //         filter: (structure) => {
    //             return (structure.structureType !== STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
    //         }
    //     });
    // }

    // if (!target) {
    //      //Find all structures other than spawn that require energy
    //         target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    //             filter: (structure) => {
    //                 return structure.energy < structure.energyCapacity;
    //             }
    //         });
    // }

    //Sorts targets by buildings having the least percentage of energy
    // let targetsSorted = _.sortBy(target, t => ((t.energy / t.energyCapacity) * 100));

    return target;
}

let findDroppedSources = function(room) {
    let sources = room.find(FIND_DROPPED_RESOURCES);

    //Sorts targets by sources having the higest percentage of energy
    return sources.sort((a, b) => ((a.energy / a.energyCapacity) * 100) > ((b.energy / b.energyCapacity) * 100) ? a : b);
}

let findEngineerDumpSites = function(room) {

    //Get all hostiles in the room
    let hostiles = findHostileCreepsFunc(room);
    let target = [];

    //If hostiles have entered the room, all energy should be carried to the tower
    if (hostiles.length > 0) {
        target = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });
    }
    if (target.length <= 0) {
        //Find all structures other than spawn and towers that require energy
        target = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType !== STRUCTURE_EXTENSION && structure.structureType !== STRUCTURE_STORAGE && structure.structureType !== STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
            }
        });
    }

    if (target.length <= 0) {
        //Find all structures that require energy
        target = findAllDumpSitesFunc(room);
    }

    //Sorts targets by buildings having the least percentage of energy
    let targetsSorted = _.sortBy(target, t => ((t.energy / t.energyCapacity) * 100));

    return targetsSorted;
}