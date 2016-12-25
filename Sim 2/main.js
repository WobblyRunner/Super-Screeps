roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader')
};

Memory.sourceVacancy = { }; // [ID] = creepsHarvesting
Memory.creepCount = { }; // [ROLE] = count

module.exports.loop = function( ) {
    
    var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
    for (var src in sources)
        Memory.sourceVacancy[sources[src].id] = 0;
    
    Memory.creepCount = {
        harvesters: 0, upgraders: 0 };
    
    for (var v in Game.creeps) {
        var creep = Game.creeps[v];
        
        if (creep.memory.targetSource != null) {
            Memory.sourceVacancy[creep.memory.targetSource]++;
        }
        
        switch (creep.memory.role) {
            case 'harvester':
                roles.harvester.run(creep);
                Memory.creepCount.harvesters++;
                break;
            case 'upgrader':
                roles.upgrader.run(creep);
                Memory.creepCount.upgraders++;
                break;
        }
    }
}