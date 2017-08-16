var _ = require('lodash');
var lookup = require('action.lookup');

module.exports = {

  findMyTowers: function (room) {
    var towers = lookup.findMyTowers(room);

    var ids = []
    towers.forEach(tower => ids.push("\"" + tower.id + "\""));
    return ids;
  },

  findMyDamagedStructures: function (room) {
    var damaged = lookup.findMyDamagedStructures(room);

    var ids = [];
    damaged.forEach(object => ids.push("\"" + object.id + "\""));
    return ids;
  },


  findHostileCreeps: function (room) {
    var hostiles = lookup.findHostileCreeps(room);

    var ids = []
    hostiles.forEach(s => ids.push("\"" + s.id + "\""));
    return ids;
  },

  findConstructionSites: function (room) {
    var sites = lookup.findConstructionSites(room);

    var ids = []
    sites.forEach(s => ids.push("\"" + s.id + "\""));
    return ids;
  },

  findSources: function (room) {
    var sources = lookup.findSources(room);

    var ids = []
    sources.forEach(s => ids.push("\"" + s.id + "\""));
    return ids;
  },

  findMyDamagedCreeps: function (room) {
    var creeps = lookup.findMyDamagedCreeps(room);

    var ids = []
    creeps.forEach(s => ids.push("\"" + s.id + "\""));
    return ids;
  },

  findTransporterDumpSites: function (room) {
    var target = lookup.findTransporterDumpSites(room);

    var ids = []
    target.forEach(s => ids.push("\"" + s.id + "\""));
    return ids;
  },

  findHarvesterDumpSites: function (room) {
    //Find all structures other than spawn and towers that require energy
    var target = lookup.findHarvesterDumpSites(room);

    var ids = []
    target.forEach(s => ids.push("\"" + s.id + "\""));
    return ids;
  },

  findAllStructuresWithEnergy: function (room) {
    var sources = lookup.findAllStructuresWithEnergy(room);

    var ids = []
    sources.forEach(s => ids.push("\"" + s.id + "\""));
    return ids;
  },

  findDroppedSources: function (room) {
    var sources = lookup.findDroppedSources(room);

    var ids = []
    sources.forEach(s => ids.push("\"" + s.id + "\""));
    return ids;
  },

  findAllDumpSites: function (room) {
    var dumpSites = lookup.findAllDumpSites(room);

    var ids = []
    dumpSites.forEach(dump => ids.push("\"" + dump.id + "\""));
    return ids;
  }

};
