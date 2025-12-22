package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final UserRepository userRepository;

    public AdminController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 🔹 DASHBOARD COUNTS (REAL DATA)
    @GetMapping("/stats")
    public Map<String, Long> getDashboardStats() {
        Map<String, Long> stats = new HashMap<>();

        stats.put("customers", userRepository.countByRole("CUSTOMER"));
        stats.put("employees", userRepository.countByRole("EMPLOYEE"));

        return stats;
    }

    // 🔹 GET ALL EMPLOYEES
    @GetMapping("/employees")
    public List<User> getEmployees() {
        return userRepository.findByRole("EMPLOYEE");
    }

    // 🔹 GET ALL CUSTOMERS
    @GetMapping("/customers")
    public List<User> getCustomers() {
        return userRepository.findByRole("CUSTOMER");
    }
}
