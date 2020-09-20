require("dotenv").config();
import { Octokit } from "@octokit/core";
import {
  OrganizationSelectorPrompt,
  RepositorySelectorPrompt,
} from "./userInteraction";
import { CheckNecessaryFiles } from "./helper";
class Worker {
  private client: any;
  private user: any;
  private repoList: Array<any> = [];
  private selectedOrgs: Array<any> = [];
  private organizations: Array<any> = [];
  private selectedRepository: Array<any> = [];
  private defaulterRepository: Array<any> = [];

  /** authenticate user based on token */
  authenticate() {
    return new Promise((resolve, reject) => {
      try {
        this.client = new Octokit({
          auth: process.env.token,
        });
        resolve("Authentication Successful");
      } catch (e) {
        reject("Error Authenticating");
      }
    });
  }

  /** show user details */
  showUserDetails() {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.client.request("/user");
        console.log(`Logged in in as ${data.name} / ${data.email}`);
        this.user = data;
        resolve(data);
      } catch (e) {
        reject("Error loading user details");
      }
    });
  }

  /** list all organizations user is member of */
  getOrganizationDetails() {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.client.request(
          `GET /users/${this.user.login}/orgs`
        );

        console.log(`\nOrganizations Fetched :${data.length} `);
        this.organizations = data;

        resolve();
      } catch (e) {
        reject("Error : Cannot get list of all organizations");
      }
    });
  }

  filterOrganizations() {
    return new Promise(async (resolve, reject) => {
      try {
        OrganizationSelectorPrompt(this.organizations)
          .then((resp) => {
            this.selectedOrgs = resp.organization;
            resolve();
          })
          .catch((err) => reject(err));
      } catch (e) {
        reject("Error : Filtering organizations");
      }
    });
  }

  // getAllRepositories
  getAllRepositories() {
    return new Promise(async (resolve, reject) => {
      try {
        this.repoList = [];
        let response;
        for (let i = 0; i < this.selectedOrgs.length; i += 1) {
          response = await this.client.request(
            `GET /orgs/${this.selectedOrgs[i]}/repos`
          );
          this.repoList.push(response.data);
          console.log(`> Processed ${this.selectedOrgs[i]}`);
        }

        resolve();
      } catch (e) {
        console.log(e);
        reject("Error : Filtering organizations");
      }
    });
  }

  filterRepositoryList() {
    return new Promise(async (resolve, reject) => {
      try {
        RepositorySelectorPrompt(this.repoList)
          .then((resp: any) => {
            this.selectedRepository = resp.repos || [];
            resolve(resp);
          })
          .catch((err) => reject(err));
      } catch (e) {
        console.log(e);
        reject("Error: Can't select Repo");
      }
    });
  }

  findRepositoryNotInOrder() {
    return new Promise(async (resolve, reject) => {
      try {
        for (let i = 0; i < this.selectedRepository.length; i += 1) {
          const { data } = await this.client.request(
            `GET /repos/${this.selectedRepository[i]}/contents`
          );

          if (CheckNecessaryFiles(data)) {
            this.defaulterRepository.push(this.selectedRepository[i]);
            console.log(`Checking ${this.selectedRepository[i]} Readme found.`);
          } else {
            console.log(
              `Checking ${this.selectedRepository[i]} Readme not found.`
            );
          }
        }
      } catch (e) {
        console.log(e);
        reject("Error: Can't select Repo");
      }
    });
  }
}

export default Worker;
