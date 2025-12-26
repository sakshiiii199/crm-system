package com.example.backend.controller;

import com.example.backend.entity.Issue;
import com.example.backend.entity.User;
import com.example.backend.repository.IssueRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins =  "http://localhost:5173")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepo;
    private final IssueRepository issueRepo;

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {
        Map<String, Object> data = new HashMap<>();

        long totalCustomers = userRepo.findAll().stream().filter(u -> u.getRole().equals("CUSTOMER")).count();
        long totalEmployees = userRepo.findAll().stream().filter(u -> u.getRole().equals("EMPLOYEE")).count();
        long totalIssues = issueRepo.count();
        long resolved = issueRepo.findAll().stream().filter(i -> i.getStatus().equals("Resolved")).count();

        data.put("totalCustomers", totalCustomers);
        data.put("totalEmployees", totalEmployees);
        data.put("totalIssues", totalIssues);
        data.put("resolvedIssues", resolved);
        data.put("issues", issueRepo.findAll());
        data.put("employees", userRepo.findAll());

        return data;
    }

    @PostMapping("/assign/{issueId}/{empName}")
public String assign(@PathVariable long issueId, @PathVariable String empName) {
        Issue i = issueRepo.findById(issueId).orElseThrow();
        i.setAssignedTo(empName);
        i.setStatus("In Progress");
        issueRepo.save(i);

        User emp = userRepo.findByUsername(empName).orElseThrow();
        emp.setIssuesSolved(emp.getIssuesSolved() + 1);
        userRepo.save(emp);
    
        

        return "Assigned";





    }


    
}