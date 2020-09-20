import { DirectoryTreeEntry } from "./interfaces";

export const CheckNecessaryFiles = (
  tree: Array<DirectoryTreeEntry>
): Boolean => {
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
