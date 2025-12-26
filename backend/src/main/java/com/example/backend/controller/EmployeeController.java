package com.example.backend.controller;

import com.example.backend.entity.Issue;
import com.example.backend.repository.IssueRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    private final IssueRepository issueRepo;

    public EmployeeController(IssueRepository issueRepo) {
        this.issueRepo = issueRepo;
    }

    @GetMapping("/dashboard/{username}")
    public Map<String, Object> dashboard(@PathVariable String username) {
        Map<String, Object> data = new HashMap<>();

        long assigned = issueRepo.countByAssignedEmployee(username);
        long completed = issueRepo.countByAssignedEmployeeAndStatus(username, "RESOLVED");
        long pending = issueRepo.countByAssignedEmployeeAndStatus(username, "OPEN");

        List<Issue> assignedIssues = issueRepo.findByAssignedEmployee(username);

        data.put("assigned", assigned);
        data.put("completed", completed);
        data.put("pending", pending);
        data.put("issues", assignedIssues);

        // Demo Notifications
        List<String> notifications = List.of(
                "Issue #101 assigned",
                "Issue #99 resolved",
                "Deadline approaching"
        );
        data.put("notifications", notifications);

        Map<String, String> profile = new HashMap<>();
        profile.put("name", username);
        profile.put("email", username + "@gmail.com");
        data.put("profile", profile);

        return data;
    }
}