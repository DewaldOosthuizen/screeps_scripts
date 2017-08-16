module.exports = {
    say: function(creep, message) {
        if (creep.memory.say !== message) {
            creep.memory.say = message;
        }
        creep.say(creep.memory.say);
    },

    sayGlobal: function(creep, message) {
        if (creep.memory.say !== message) {
            creep.memory.say = message;
        }
        creep.say(creep.memory.say, true);
    }
};