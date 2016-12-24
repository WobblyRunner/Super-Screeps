module.exports = {
    /** @params {Creep} creep **/
    run: function( creep ) {
        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            
        }
    },
    /** @params {Spawn} spawn **/
    create: function( spawn ) {
        return spawn.createCreep( [CARRY, MOVE, WORK], { role: 'repairer' } );
    }
};