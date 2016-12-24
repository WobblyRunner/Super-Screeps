var roles = {
    harvester: require('role.harvester'),
    builder: require('role.builder'),
    upgrader: require('role.upgrader')
};

var counts = {};

module.exports.loop = function ( ) {
    counts = {
        harvester: 0,
        builder: 0,
        upgrader: 0
    };
    
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
}