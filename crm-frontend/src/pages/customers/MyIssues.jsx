import { useEffect, useState } from "react";
import { getMyIssues } from "../../services/customerService";

export default function MyIssues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    getMyIssues(localStorage.getItem("email")).then(setIssues);
  }, []);

  return (
    <>
      <h3>My Issues</h3>
      {issues.map(i => (
        <div key={i.id}>{i.title} - {i.status}</div>
      ))}
    </>
  );
}