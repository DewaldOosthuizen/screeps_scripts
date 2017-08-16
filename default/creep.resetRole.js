module.exports = {
    reset: function(creep, forceReset) {

        //Reset all the creep roles based on their names
        if (!creep.memory.role || creep.memory.role === null || forceReset === true) {
            if ((creep.name).includes('Collector')) {
                creep.memory.role = 'harvester'
            } else if ((creep.name).includes('Enhancer')) {
                creep.memory.role = 'upgrade'
            } else if ((creep.name).includes('Constructor')) {
                creep.memory.role = 'builder'
            } else if ((creep.name).includes('Warrior')) {
                creep.memory.role = 'warrior'
            } else if ((creep.name).includes('Archer')) {
                creep.memory.role = 'archer'
            } else if ((creep.name).includes('Mage')) {
                creep.memory.role = 'healer'
            } else if ((creep.name).includes('Engineer')) {
                creep.memory.role = 'repair'
            } else if ((creep.name).includes('Allocator')) {
                creep.memory.role = 'transporter'
            } else {
                creep.memory.role = 'harvester'
            }
        }

    }
};