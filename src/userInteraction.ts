const inquirer = require("inquirer");

const OrganizationSelectorPrompt = (orgs: Array<any>): Promise<any> => {
  return new Promise((resolve, reject) => {
    const orgNames: Array<string> = [];
    orgs.forEach((org) => orgNames.push(org.login));

    inquirer
      .prompt([
        {
          type: "checkbox",
          message: "Select organizations to process repositories : \n",
          name: "organization",
          choices: orgNames,
          validate: function (answer: any) {
            if (answer.length < 1) {
              return "You must choose at least one org.";
            }
            return true;
          },
        },
      ])
      .then((answers: any) => {
        resolve(answers);
      })
      .catch((e: any) => reject(e));
  });
};

const RepositorySelectorPrompt = (repos: Array<any>) => {
  return new Promise((resolve, reject) => {
    const items = [];
    console.log(repos[0][0].name);
    for (let i = 0; i < repos.length; i += 1) {
      items.push(new inquirer.Separator(`> ${repos[i][0].owner.login} `));
      for (let j = 0; j < repos[i].length; j += 1) {
        items.push(repos[i][j].full_name);
      }
    }

    inquirer
      .prompt([
        {
          type: "checkbox",
          message: "Select repositories to run toolchain : \n",
          name: "repos",
          choices: items,
          validate: function (answer: any) {
            if (answer.length < 1) {
              return "You must choose at least one repository.";
            }
            return true;
          },
        },
      ])
      .then((answers: any) => {
        resolve(answers);
      })
      .catch((e: any) => reject(e));
  });
};

export { OrganizationSelectorPrompt, RepositorySelectorPrompt };
