let _ = require('lodash');
let lookup = require('lookup.find');

module.exports = {

    findMyTowers: function(room) {
        let towers = lookup.findMyTowers(room);

        let ids = []
        towers.forEach(tower => ids.push("\"" + tower.id + "\""));
        return ids;
    },

    findMyDamagedStructures: function(room) {
        let damaged = lookup.findMyDamagedStructures(room);

        let ids = [];
        damaged.forEach(object => ids.push("\"" + object.id + "\""));
        return ids;
    },


    findHostileCreeps: function(room) {
        let hostiles = lookup.findHostileCreeps(room);

        let ids = []
        hostiles.forEach(s => ids.push("\"" + s.id + "\""));
        return ids;
    },

    findConstructionSites: function(room) {
        let sites = lookup.findConstructionSites(room);

        let ids = []
        sites.forEach(s => ids.push("\"" + s.id + "\""));
        return ids;
    },

    findSources: function(room) {
        let sources = lookup.findSources(room);

        let ids = []
        sources.forEach(s => ids.push("\"" + s.id + "\""));
        return ids;
    },

    findMyDamagedCreeps: function(room) {
        let creeps = lookup.findMyDamagedCreeps(room);

        let ids = []
        creeps.forEach(s => ids.push("\"" + s.id + "\""));
        return ids;
    },

    findTransporterDumpSites: function(room) {
        let target = lookup.findTransporterDumpSites(room);

        let ids = []
        target.forEach(s => ids.push("\"" + s.id + "\""));
        return ids;
    },

    findHarvesterDumpSites: function(room) {
        //Find all structures other than spawn and towers that require energy
        let target = lookup.findHarvesterDumpSites(room);

        let ids = []
        target.forEach(s => ids.push("\"" + s.id + "\""));
        return ids;
    },

    findAllStructuresWithEnergy: function(room) {
        let sources = lookup.findAllStructuresWithEnergy(room);

        let ids = []
        sources.forEach(s => ids.push("\"" + s.id + "\""));
        return ids;
    },

    findDroppedSources: function(room) {
        let sources = lookup.findDroppedSources(room);

        let ids = []
        sources.forEach(s => ids.push("\"" + s.id + "\""));
        return ids;
    },

    findAllDumpSites: function(room) {
        let dumpSites = lookup.findAllDumpSites(room);

        let ids = []
        dumpSites.forEach(dump => ids.push("\"" + dump.id + "\""));
        return ids;
    }

};