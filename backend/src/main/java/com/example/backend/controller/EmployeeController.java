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

    /** DASHBOARD DATA RETURN */
    @GetMapping("/dashboard/{email}")
    public Map<String, Object> dashboard(@PathVariable String email) {
        Map<String, Object> data = new HashMap<>();

        // get user by email
        User emp = userRepo.findByEmail(email).orElse(null);
        if (emp == null) return data;

        String username = emp.getUsername();

        // Stats
        long assigned = issueRepo.countByAssignedEmployee(username);
        long completed = issueRepo.countByAssignedEmployeeAndStatus(username, "Resolved");
        long pending = issueRepo.countByAssignedEmployeeAndStatus(username, "In Progress");

        data.put("assigned", assigned);
        data.put("completed", completed);
        data.put("pending", pending);

        // Assigned Issue List
        List<Issue> myIssues = issueRepo.findByAssignedEmployee(username);
        data.put("issues", myIssues);

        // Notifications (static example)
        List<String> notifications =List.of(
            "Issue #101 assigned",
            "Issue #99 resolved",
            "Deadline approaching"
        );
        data.put("notifications",  notifications);

        // Employee profile
        Map<String, Object> profile = new HashMap<>();
        profile.put("name", emp.getUsername());
        profile.put("email", emp.getEmail());
        data.put("profile", profile);

        return data;
    }

    @PostMapping("/update-status/{id}/{status}")
public String updateStatus(@PathVariable Long id, @PathVariable String status) {
    Issue issue = issueRepo.findById(id).orElseThrow();
    issue.setStatus(status);
    issueRepo.save(issue);
    return "Status Updated";
}

}