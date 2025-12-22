import { useState } from "react";
import { raiseIssue } from "../../services/customerService";

export default function RaiseIssue() {
  const [issue, setIssue] = useState({
    title: "",
    description: "",
    category: "Technical",
    customerEmail: localStorage.getItem("email"),
  });

  const submit = async () => {
    alert(await raiseIssue(issue));
  };

  return (
    <>
      <h3>Raise Issue</h3>
      <input placeholder="Title" onChange={e => setIssue({...issue, title:e.target.value})} />
      <textarea placeholder="Description" onChange={e => setIssue({...issue, description:e.target.value})} />
      <button onClick={submit}>Submit</button>
    </>
  );
}