package com.quickserve.app.controller;

import com.quickserve.app.model.ServiceListing;
import com.quickserve.app.repository.BookingRepository;
import com.quickserve.app.repository.ReviewRepository;
import com.quickserve.app.repository.ServiceListingRepository;
import com.quickserve.app.repository.UserRepository;
import com.quickserve.app.service.AdminService;
import com.quickserve.app.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.quickserve.app.model.BookingStatus;
import com.quickserve.app.model.Role;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final ServiceListingRepository serviceListingRepository;
    private final AdminService adminService;

    public AdminController(UserRepository userRepository, BookingRepository bookingRepository,ServiceListingRepository serviceListingRepository, AdminService adminService) {
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.serviceListingRepository = serviceListingRepository;
        this.adminService = adminService;

    }


    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("ADMIN OK");
    }

    @GetMapping("/dashboard/stats")
    public Map<String, Object> dashboardStats() {
        return Map.of(
                "totalUsers", userRepository.count(),
                "activeBookings", bookingRepository.countByStatus(BookingStatus.CONFIRMED),
                "revenue", serviceListingRepository.getTotalRevenue(),
                "avgRating", serviceListingRepository.getAverageRating()
        );
    }


    @GetMapping("/users")
    public List<Map<String, Object>> getAllUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/users/stats")
    public Map<String, Object> getUserStats() {
        return adminService.getUserStats();
    }

    // 1️⃣ Get pending listings
    @GetMapping("/approvals")
    public List<Map<String, Object>> getPendingListings() {
        return adminService.getPendingListings();
    }

    // 2️⃣ Approve listing
    @PostMapping("/approvals/{listingId}/approve")
    public ResponseEntity<Void> approveListing(@PathVariable Long listingId) {
        adminService.approveListing(listingId);
        return ResponseEntity.ok().build();
    }

    // 3️⃣ Reject listing
    @PostMapping("/approvals/{listingId}/reject")
    public ResponseEntity<Void> rejectListing(@PathVariable Long listingId) {
        adminService.rejectListing(listingId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/approvals/stats")
    public Map<String, Object> approvalStats() {
        return adminService.getApprovalStats();
    }

    @GetMapping("/analytics/summary")
    public Map<String, Object> analyticsSummary() {
        return adminService.getAnalyticsSummary();
    }

    @GetMapping("/analytics/trends")
    public Map<String, Object> analyticsTrends() {
        return adminService.getRevenueAndBookingsTrend();
    }


    @GetMapping("/analytics/services")
    public List<Map<String, Object>> servicePerformance() {
        return adminService.getServicePerformance();
    }



    @GetMapping("/analytics/ratings")
    public List<Map<String, Object>> ratingDistribution() {
        return adminService.getRatingDistribution();
    }



}
