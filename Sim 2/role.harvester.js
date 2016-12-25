var tasks = require('role.tasks');

module.exports = {
    run: function( creep ) {
        if (!creep.memory.depositing) {
            tasks.taskHarvest(creep);
            if (creep.carry.energy >= creep.carryCapacity) {
                creep.memory.depositing = true;
            }
        } else {
            tasks.taskTransfer(creep, Game.spawns['Spawn1']);
            if (creep.carry.energy <= 0) {
                creep.memory.depositing = false;
            }
        }
    },
    create: function( spawn ) {
        return spawn.createCreep( [CARRY, MOVE, WORK], { 
            role: 'harvester',
            depositing: false, targetSource: null
        } );
    }
};