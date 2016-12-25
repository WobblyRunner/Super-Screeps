var roles = {
    harvester: require('role.harvester2'),
    builder: require('role.builder'),
    upgrader: require('role.upgrader'),
    repairer: require('role.repairer')
};

var counts = {};
var quotas = {
    harvester: 1,
    builder: 0,
    upgrader: 1
};
var shouldSpawn = true;

module.exports.loop = function ( ) {
    counts = {
        harvester: 0,
        builder: 0,
        upgrader: 0
    };
    
    var spawn = Game.spawns['Spawn1'];
    
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if (creep.memory.role === 'harvester') {
            roles.harvester.run(creep);
            counts.harvester++;
        } else if (creep.memory.role === 'builder') {
            roles.builder.run(creep);
            counts.builder++;
        } else if (creep.memory.role === 'upgrader') {
            roles.upgrader.run(creep);
            counts.upgrader++;
        }
    }
    
    if (!spawn.spawning && shouldSpawn) {
        if (quotas.harvester > counts.harvester) {
            roles.harvester.create(spawn);
        } else if (quotas.builder > counts.builder) {
            roles.builder.create(spawn);
        } else if (quotas.upgrader > counts.upgrader) {
            roles.upgrader.create(spawn);
        }
    }
}