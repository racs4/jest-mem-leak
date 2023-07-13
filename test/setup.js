const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;

let mongoServer;

exports.mochaHooks = {
  beforeEach(done) {
    console.log();
    MongoMemoryServer.create().then((mongoServerInstance) => {
      console.log("mongoServerInstance initialized");
      mongoServer = mongoServerInstance;
      done();
    });
  },

  afterEach(done) {
    mongoServer.stop().then(() => {
      global.gc && global.gc();
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      console.log(
        `The script uses approximately ${Math.round(used * 100) / 100} MB`
      );
      done();
    });
  },
};
