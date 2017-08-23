module.exports = {
    sign: function(creep, target, message) {
        creep.signController(target, (message && message !== null ? message : 'â For the horde â'));
    }
};