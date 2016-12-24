// Builds things //
// Author: Wobbly //

module.exports = {
    /** @params {Creep} creep **/
    run: function( creep ) {
        if (creep.carry.energy < creep.carryCapacity && creep.memory.act != 'build') {
            var sources = creep.room.find(FIND_SOURCES);
            var harv = creep.harvest(sources[0]);
            
            if (harv === OK) {
                creep.memory.act = 'harvest';
            } else if (harv === ERR_NOT_IN_RANGE) {
                creep.memory.act = 'move';
                creep.moveTo(sources[0]);
            }
        } else {
            if (creep.memory.target != null && creep.memory.target ) {
                
            } else {
                creep.memory.act = 'think';
                creep.memory.target = creep.room.find(FIND_CONSTRUCTION_SITES)[0];
            }
        }
    },
    /** @params {Spawn} spawn **/
    create: function( spawn ) {
        return spawn.createCreep( [CARRY, MOVE, WORK], { role: 'builder', target: null } );
    }
};