var tasks = require('role.tasks');

module.exports = {
    // @params {Creep} creep //
    run: function( creep ) {
        if (!creep.memory.upgrading) {
            tasks.taskHarvest(creep);
            if (creep.carry.energy >= creep.carryCapacity) {
                creep.memory.upgrading = true;
            }
        } else {
            tasks.taskTransfer(creep, creep.room.controller);
            if (creep.carry.energy <= 0) {
                creep.memory.upgrading = false;
            }
        }
    },
    // @params {StructureSpawn} spawn //
    create: function( spawn ) {
        return spawn.createCreep( [CARRY, MOVE, WORK], {
            role: 'upgrader',
            upgrading: false,
            targetSource: null
        });
    }
};