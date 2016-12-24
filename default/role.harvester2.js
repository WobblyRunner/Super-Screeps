// Harvester using the new role.reqs.jobs //
// Author: wobbly //

var ACT = require('enum.ACT');
var JOBS = require('role.reqs.jobs');

module.exports = {
    run: function( creep ) {
        var data = JOBS.harvestEnergyJob(creep);
        creep.memory.act_data = data;
        if (data.act === ACT.HARV_FULLENERGY) {
            JOBS.transferEnergyToJob(creep, Game.spawns['Spawn1']);
        }
    },
    create: function( spawn ) {
        return spawn.createCreep([CARRY, MOVE, WORK], { role: 'harvester', act_data: ACT.NULLSPAWN });
    }
};