const inquirer = require("inquirer");

const OrganizationSelectorPrompt = (orgs) => {
  return new Promise((resolve, reject) => {
    const orgNames = [];
    orgs.forEach((org) => orgNames.push(org.login));

    inquirer
      .prompt([
        {
          type: "checkbox",
          message: "Select organizations to process repositories : \n",
          name: "organization",
          choices: orgNames,
          validate: function (answer) {
            if (answer.length < 1) {
              return "You must choose at least one org.";
            }
            return true;
          },
        },
      ])
      .then((answers) => {
        resolve(answers);
      })
      .catch((e) => reject(e));
  });
};

const RepositorySelectorPrompt = (repos) => {
  return new Promise((resolve, reject) => {
    const orgNames = [];
    orgs.forEach((org) => orgNames.push(org.login));

    inquirer
      .prompt([
        {
          type: "checkbox",
          message: "Select organizations to process repositories : \n",
          name: "organization",
          choices: orgNames,
          validate: function (answer) {
            if (answer.length < 1) {
              return "You must choose at least one org.";
            }
            return true;
          },
        },
      ])
      .then((answers) => {
        resolve(answers);
      })
      .catch((e) => reject(e));
  });
};

module.exports = {
  OrganizationSelectorPrompt,
};
