// Harvests things //
// Author: Wobbly //

module.exports = {
    run: function ( creep ) {
        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            
            var harv = creep.harvest(sources[0]);
            
            if (harv === OK) {
                creep.memory.act = 'harvest';
            } else if (harv === ERR_NOT_IN_RANGE) {
                creep.memory.act = 'move';
                creep.moveTo(sources[0]);
            }
        } else {
            var target = Game.spawns['Spawn1'];
            
            var trans = creep.transfer(target, RESOURCE_ENERGY, creep.carryCapacity);
            
            if (trans === OK) {
                creep.memory.act = 'transfer';
            } else if (trans === ERR_NOT_IN_RANGE) {
                creep.memory.act = 'move';
                creep.moveTo(target);
            } else if (trans === ERR_FULL) {
                creep.memory.act = 'idle';
            }
        }
        creep.say(creep.memory.act);
    },
    create: function( spawn ) {
        return spawn.createCreep([CARRY, MOVE, WORK], { role: 'harvester' });
    }
}