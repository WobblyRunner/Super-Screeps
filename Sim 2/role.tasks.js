function findOpenSource( room ) {
    var retval = null;
    var i = 0;
    while (retval === null) {
        for (var v in Memory.sourceVacancy) {
            if (Memory.sourceVacancy[v] <= i) {
                retval = v;
            }
        }
        i++;
    }
    return retval;
}

module.exports = {
    // @params {Creep} creep //
    taskHarvest: function( creep ) {
        if(creep.memory.targetSource === null) {
            creep.memory.targetSource = findOpenSource(creep.room);
        }
        var trg = Game.getObjectById(creep.memory.targetSource);
        var harv = creep.harvest(trg);
        if (harv === ERR_NOT_IN_RANGE) {
            return creep.moveTo(trg);
        } else {
            return harv;
        }
    },
    // @params {Creep} creep {Structure} struct //
    taskTransfer: function( creep, struct ) {
        var trans = creep.transfer(struct, RESOURCE_ENERGY);
        if (creep.memory.targetSource)
            creep.memory.targetSource = null;
        if (trans == ERR_NOT_IN_RANGE) {
            return creep.moveTo(struct);
        } else {
            return trans;
        }
    }
};