package com.quickserve.app.service;

import com.quickserve.app.model.ServiceListing;

import java.util.List;
import java.util.Map;

public interface AdminService {
    List<Map<String, Object>> getAllUsers();

    Map<String, Object> getUserStats();
    List<Map<String, Object>> getPendingListings();


    void approveListing(Long listingId);

    void rejectListing(Long listingId);

    Map<String, Object> getApprovalStats();

    Map<String, Object> getAnalyticsSummary();

    Map<String, Object> getRevenueAndBookingsTrend();

    List<Map<String, Object>> getServicePerformance();

    List<Map<String, Object>> getRatingDistribution();


}
