import type { NextPage } from "next";
import Link from "next/link";
import { getIssue, listIssues, listIssueComments, type Issue, type IssueComment } from "../../lib/issue";
import Time from "../../components/Time";

type Props = {
  issue: Issue;
  issueComments: Array<IssueComment>,
};

const ShowArticle: NextPage<Props> = ({ issue, issueComments }) => {
  return (
    <article>
      <header>
        <Time dateTime={issue.created_at} />
        <h1>{issue.title}</h1>
      </header>
      <footer>
        <p>
          Posted by&nbsp;
          <Link href={issue.user.html_url}>{issue.user.login}</Link>
          &nbsp;at&nbsp;
          <Link href={issue.html_url}>{`#${issue.number}`}</Link>.
        </p>
      </footer>
      <div dangerouslySetInnerHTML={{ __html: issue.bodyHTML }}></div>
    </article>
  );
};

export default ShowArticle;

export async function getStaticPaths() {
  const paths = listIssues().map((issue) => {
    return {
      params: {
        issueNumber: issue.number.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const issueNumber = parseInt(params.issueNumber, 10);
  const issue = getIssue({ issueNumber });
  const issueComments = listIssueComments({ issueNumber });
  return {
    props: {
      issue,
      issueComments,
    },
  };
}