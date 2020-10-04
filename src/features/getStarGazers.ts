import fs from "fs";

/** function to generate list of StarGazers */
export const GetStarGazers = async (__this: any, __repository: string) => {
  const { data } = await __this.client.request(
    `GET /repos/${__repository}/stargazers`
  );

  const userNames: Array<string> = [];
  const fileName = __repository.replace(/\//g, ".");
  data.forEach((starGazer: any) => {
    userNames.push(starGazer.login);
  });
  fs.writeFileSync(
    `./reports/${fileName}.starGazers.report.json`,
    JSON.stringify(userNames)
  );
};
