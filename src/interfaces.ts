export interface DirectoryTreeEntry {
  name: String;
  path: String;
  sha: String;
  size: Number;
  url: String;
  html_url: String;
  git_url: String;
  download_url: String;
  type: "file" | "dir";
  _links: Array<String>;
}
