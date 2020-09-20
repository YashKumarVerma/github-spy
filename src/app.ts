import Worker from "./util";
const worker = new Worker();

worker
  .authenticate()
  .then(() => worker.showUserDetails())
  .then(() => worker.getOrganizationDetails())
  .then(() => worker.filterOrganizations())
  .then(() => worker.getAllRepositories())
  .then(() => worker.filterRepositoryList())
  .then(() => worker.findRepositoryNotInOrder())
  .catch((e) => console.log(e));
