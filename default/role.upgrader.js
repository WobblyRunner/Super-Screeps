// Upgrades things //
// Author: Wobbly //

module.exports = {
    /** @param {Creep} creep **/
    run: function( creep ) {
        if (creep.carryCapacity > creep.carry.energy && creep.memory.act != 'upgrade') {
            var sources = creep.room.find(FIND_SOURCES);
            
            var harv = creep.harvest(sources[0]);
            
            if (harv === OK) {
                creep.memory.act = 'harvest';
            } else if (harv === ERR_NOT_IN_RANGE) {
                creep.memory.act = 'move';
                creep.moveTo(sources[0]);
            }
        } else {
            var cntrlr = creep.room.controller;
            
            var trans = creep.transfer(cntrlr, RESOURCE_ENERGY);
            
            if (trans === OK) {
                creep.memory.act = 'upgrade';
            } else if (trans === ERR_NOT_IN_RANGE) {
                creep.memory.act = 'move';
                creep.moveTo(cntrlr);
            } else if (trans === ERR_FULL) {
                creep.memory.act = 'idle';
            } else if (trans === ERR_NOT_ENOUGH_RESOURCES) {
                creep.memory.act = 'think';
            }
        }
        creep.say(creep.memory.act);
    },
    /** @param {Spawn} spawn **/
    create: function( spawn ) {
        return spawn.createCreep([CARRY, MOVE, WORK], { role: 'upgrader' });
    }
};