// ACT system enums //
// Author: Wobbly //

module.exports = {
    SPAWNING: 10, IDLING: 100, THINKING: 200, MOVING: 300, TRANSFERING: 400, UPGRADING: 500, HARVESTING: 600,
    TRANS_COMPLETE: 410, TRANS_FAILED: 420,
    HARV_FULLENERGY: 610,
    
    NULLSPAWN: { act: module.exports.SPAWNING, target: null, status: OK }
};