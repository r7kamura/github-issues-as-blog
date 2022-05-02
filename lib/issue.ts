import fs from "fs";

export type Issue = any;

export type IssueComment = any;


export function getIssue({ issueNumber }: { issueNumber: number }): Issue {
  let result;
  listIssues().find((issue) => {
    if (issue.number === issueNumber) {
      result = issue;
      return true;
    }
  });
  return result;
}

export function listIssues(): Array<Issue> {
  const data = loadData("./data/issues.json");
  return Object.keys(data.issues).map((issueNumberString) => {
    return data.issues[issueNumberString];
  });
}

export function listIssueComments({ issueNumber }: { issueNumber: number }): Array<IssueComment> {
  const data = loadData("./data/issue_comments.json");
  const issueCommentsMap = data.issue_comments[issueNumber.toString()];
  return Object.keys(issueCommentsMap).map((issueNumberString) => {
    return issueCommentsMap[issueNumberString];
  });
}

function loadData(filePath: string) {
  const content = fs.readFileSync(filePath, { encoding: "utf-8" });
  return JSON.parse(content);
}