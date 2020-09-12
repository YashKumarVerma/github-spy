const Worker = require("./util");
const worker = new Worker();

worker
  .authenticate()
  .then(() => worker.showUserDetails())
  .then(() => worker.listOrganizations());
