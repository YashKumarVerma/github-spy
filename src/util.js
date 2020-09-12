require("dotenv").config();
const { Octokit } = require("@octokit/core");

class Worker {
  /** authenticate user based on token */
  authenticate() {
    return new Promise((resolve, reject) => {
      try {
        this.client = new Octokit({
          auth: process.env.token,
        });
        resolve("Authentication Successful");
      } catch (e) {
        reject("Error Authenticating.");
      }
    });
  }

  /** show user details */
  showUserDetails() {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.client.request("/user");
        console.log(`Loggin in as ${data.name} / ${data.email}`);
        this.user = data;
        resolve(data);
      } catch (e) {
        reject("Error loading user details ");
      }
    });
  }

  /** list all organizations user is member of */
  listOrganizations() {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.client.request(
          `GET /users/${this.user.login}/orgs`
        );

        console.log("\nListing Organizations : ");
        data.map((org) => console.log(`> ${org.login}`));

        resolve();
      } catch (e) {
        reject("Error : ");
      }
    });
  }
}

module.exports = Worker;
