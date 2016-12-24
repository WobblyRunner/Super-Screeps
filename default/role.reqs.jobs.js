/// I got a yob! ///
// Author: Wobbly //

var ACT = require('enum.ACT');

module.exports = {
    // Returns ACT object //
    // @params {Creep} creep {Structure} targ //
    moveToJob: function ( creep, targ ) {
        var mov = creep.moveTo(targ);
        return { act: ACT.MOVING, target: targ, status: mov };
    },
    // Returns ACT object //
    // @params {Creep} creep //
    harvestEnergyJob: function( creep ) {
        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            //var target = sources[0]; // TODO: Include a more robust target finding system
            var sta = creep.harvest(sources[0]);
            
            if (sta === OK) {
                return { act: ACT.HARVESTING, target: sources[0], status: OK };
            } else if (sta === ERR_NOT_IN_RANGE) {
                return module.exports.moveToJob(creep, sources[0]);
            }
        } else {
            return { act: ACT.HARV_FULLENERGY, target: creep, status: OK };
        }
    },
    // Returns ACT object //
    // @params {Creep} creep {Structure} targ //
    transferEnergyToJob: function( creep, targ ) {
        var sta = creep.transfer(targ, RESOURCE_ENERGY);
        if (sta === OK) {
            return { act: ACT.TRANSFERING, target: targ, status: OK };
        } else if (sta === ERR_NOT_IN_RANGE) {
            return module.exports.moveToJob(creep, targ);
        } else if (sta === ERR_FULL) {
            return { act: ACT.TRANS_COMPLETE, target: targ, status: ERR_FULL };
        } else if (sta === ERR_NOT_ENOUGH_RESOURCES) {
            return { act: ACT.TRANS_FAILED, target: targ, status: ERR_NOT_ENOUGH_RESOURCES };
        } else {
            return { act: ACT.TRANS_FAILED, target: targ, status: sta };
        }
    }
};