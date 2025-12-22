import { useEffect, useState } from "react";
import { getHistory } from "../../services/customerService";

export default function IssueHistory() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    getHistory(localStorage.getItem("email")).then(setIssues);
  }, []);

  return (
    <>
      <h3>Resolved Issues</h3>
      {issues.map(i => (
        <div key={i.id}>{i.title}</div>
      ))}
    </>
  );
}