import fs from "fs";
import { DirectoryTreeEntry } from "./../interfaces";

const CheckNecessaryFiles = (tree: Array<DirectoryTreeEntry>): Boolean => {
  let flag;
  for (let i = 0; i < tree.length; i += 1) {
    flag = false;
    if (tree[i].name.toLocaleLowerCase() === "readme.md") {
      flag = true;
    }
    break;
  }

  return !flag;
};

export const GetRepositoryWithoutReadme = async (
  __this: any,
  __repository: string
) => {
  const { data } = await __this.client.request(
    `GET /repos/${__repository}/contents`
  );

  const repositoryList: Array<string> = [];
  const fileName = __repository.replace(/\//g, ".");
  if (!CheckNecessaryFiles(data)) {
    repositoryList.push(__repository);
  }
  fs.writeFileSync(
    `./reports/${fileName}.withoutReadme.report.json`,
    JSON.stringify(repositoryList)
  );
};
