module.exports = {
    buildRoads: function(from, to) {
        let path = Game.getRoom('1-1').findPath(from, to, {
            ignoreCreeps: true
        });
        for (let i in path) {
            let result = Game.getRoom('1-1').createConstructionSite(path[i].x, path[i].y, Game.STRUCTURE_ROAD);
        }
    },

    buildRoadToAllSources: function() {
        let sources = Game.spawns.Spawn1.room.find(Game.SOURCES);

        for (let i in sources) {
            this.buildRoads(Game.spawns.Spawn1.pos, sources[i].pos);
        }
    },

    expandRampartsOutwards: function() {
        let ramparts = Game.getRoom('1-1').find(Game.MY_STRUCTURES, {
            filter: function(struct) {
                return struct.structureType == Game.STRUCTURE_RAMPART
            }
        });

        for (let i in ramparts) {
            let rampart = ramparts[i];

            let positions = [
                [rampart.pos.x - 1, rampart.pos.y],
                [rampart.pos.x, rampart.pos.y - 1],
                [rampart.pos.x, rampart.pos.y - 1],
                [rampart.pos.x, rampart.pos.y + 1],
                [rampart.pos.x - 1, rampart.pos.y - 1],
                [rampart.pos.x + 1, rampart.pos.y - 1],
                [rampart.pos.x - 1, rampart.pos.y + 1],
                [rampart.pos.x - 1, rampart.pos.y - 1]
            ];

            for (let i in positions) {
                let pos = positions[i];
                let tile = Game.getRoom('1-1').lookAt(pos[0], pos[1]);
                let build = true;
                for (let tilei in tile) {
                    let thing = tile[tilei];
                    if (thing.type == 'structure' && thing.structure.structureType == Game.STRUCTURE_RAMPART)
                        build = false;
                    if (thing.type == 'constructionSite')
                        build = false;
                }

                if (build)
                    Game.getRoom('1-1').createConstructionSite(pos[0], pos[1], Game.STRUCTURE_RAMPART);
            }
        }
    }
};