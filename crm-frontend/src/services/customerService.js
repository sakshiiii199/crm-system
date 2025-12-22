const BASE = "http://localhost:8081/api/customer";

export const getOverview=(email) =>
  fetch(`${BASE}/overview/${email}`).then(res => res.json());

export const raiseIssue = (issue) =>
  fetch(`${BASE}/issue`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(issue),
  }).then(res => res.text());

export const getMyIssues = (email) =>
  fetch(`${BASE}/issues/${email}`).then(res => res.json());

export const getHistory = (email) =>
  fetch(`${BASE}/history/${email}`).then(res => res.json());

export const getProfile = (email) =>
  fetch(`${BASE}/profile/${email}`).then(res => res.json());
