const Worker = require("./util");
const worker = new Worker();

worker
  .authenticate()
  .then(() => worker.showUserDetails())
  .then(() => worker.getOrganizationDetails())
  .then(() => worker.filterOrganizations())
  .then(() => worker.getAllRepositories())
  .catch((e) => console.log(e));
