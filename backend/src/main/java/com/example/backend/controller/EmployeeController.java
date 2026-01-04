package com.example.backend.controller;

import com.example.backend.entity.Issue;
import com.example.backend.entity.User;
import com.example.backend.repository.IssueRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class EmployeeController {

    private final IssueRepository issueRepo;
    private final UserRepository userRepo;

    /** ---------------- DASHBOARD ---------------- */
    @GetMapping("/dashboard/{email}")
    public Map<String, Object> dashboard(@PathVariable String email) {
        Map<String, Object> data = new HashMap<>();

        User emp = userRepo.findByEmail(email).orElse(null);
        if (emp == null) return data;

        String username = emp.getUsername();

        // STATS
        long assigned = issueRepo.countByAssignedEmployee(username);
        long completed = issueRepo.countByAssignedEmployeeAndStatus(username, "Resolved");
        long pending = issueRepo.countByAssignedEmployeeAndStatus(username, "In Progress");

        data.put("assigned", assigned);
        data.put("completed", completed);
        data.put("pending", pending);

        // ASSIGNED ISSUES LIST
        List<Issue> issues = issueRepo.findByAssignedEmployee(username);
        data.put("issues", issues);

        // NOTIFICATIONS (Dynamic)
        List<String> notifs = new ArrayList<>();
        for (Issue issue : issues) {
            if (issue.getStatus().equals("In Progress")) {
                notifs.add("Issue #" + issue.getId() + " is in progress.");
            }
            if (issue.getStatus().equals("Resolved")) {
                notifs.add("Issue #" + issue.getId() + " has been resolved.");
            }
        }
        data.put("notifications", notifs);

        // PROFILE
        Map<String, Object> profile = new HashMap<>();
        profile.put("name", emp.getUsername());
        profile.put("email", emp.getEmail());
        profile.put("role", emp.getRole());
        data.put("profile", profile);

        return data;
    }

    /** ---------------- UPDATE ISSUE STATUS ---------------- */
    @PostMapping("/update-status/{id}/{status}")
    public String updateStatus(@PathVariable Long id, @PathVariable String status) {
        Issue issue = issueRepo.findById(id).orElseThrow();
        issue.setStatus(status);
        issueRepo.save(issue);
        return "Status Updated";
    }
}