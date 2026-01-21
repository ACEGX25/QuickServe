package com.quickserve.app.controller;


import com.quickserve.app.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("ADMIN OK");
    }

    @GetMapping("/users")
    public List<Map<String, Object>> getAllUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/users/stats")
    public Map<String, Object> getUserStats() {
        return adminService.getUserStats();
    }

    @GetMapping("/approvals")
    public List<Map<String, Object>> getPendingListings() {
        return adminService.getPendingListings();
    }

    @PostMapping("/approvals/{listingId}/approve")
    public ResponseEntity<Void> approveListing(@PathVariable Long listingId) {
        adminService.approveListing(listingId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/approvals/{listingId}/reject")
    public ResponseEntity<Void> rejectListing(@PathVariable Long listingId) {
        adminService.rejectListing(listingId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/approvals/stats")
    public Map<String, Object> approvalStats() {
        return adminService.getApprovalStats();
    }
}

