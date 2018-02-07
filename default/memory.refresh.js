let lookup = require('lookup.find_by_id');

module.exports = {
    refresh: function() {
        let roomRepesentitive = [];

        for (let roomName in Game.rooms) {
            let room = Game.rooms[roomName];
            roomRepesentitive.push(
                "           " +
                "               {" +
                "                   \"roomName\": \"" + room.name + "\"," +
                "                   \"lookup\": [" +
                "                                   {" +
                "                                       \"findMyTowers\": [" + lookup.findMyTowers(room) + " ], " +
                "                                       \"findMyDamagedStructures\": [" + lookup.findMyDamagedStructures(room) + " ], " +
                "                                       \"findHostileCreeps\": [" + lookup.findHostileCreeps(room) + " ], " +
                "                                       \"findConstructionSites\": [" + lookup.findConstructionSites(room) + " ], " +
                "                                       \"findSources\": [" + lookup.findSources(room) + " ], " +
                "                                       \"findMyDamagedCreeps\": [" + lookup.findMyDamagedCreeps(room) + " ], " +
                "                                       \"findTransporterDumpSites\": [" + lookup.findMyTowers(room) + " ], " +
                "                                       \"findHarvesterDumpSites\": [" + lookup.findHarvesterDumpSites(room) + " ], " +
                "                                       \"findAllStructuresWithEnergy\": [" + lookup.findAllStructuresWithEnergy(room) + " ], " +
                "                                       \"findDroppedSources\": [" + lookup.findDroppedSources(room) + " ], " +
                "                                       \"findAllDumpSites\": [" + lookup.findAllDumpSites(room) + " ] " +
                "                                   }" +
                "                       ]" +
                "               } " +
                "           "
            )
        }

        //Stores all lookups in memory
        RawMemory.segments[0] = "{ \"rooms\": [" + roomRepesentitive + "] }";
    }

};