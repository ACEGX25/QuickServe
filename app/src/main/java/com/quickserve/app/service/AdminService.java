package com.quickserve.app.service;

import com.quickserve.app.dto.*;

import java.util.List;
import java.util.Map;

public interface AdminService {

    /* ============================
       EXISTING ADMIN OPERATIONS
       (unchanged – still Map-based)
       ============================ */

    List<Map<String, Object>> getAllUsers();

    Map<String, Object> getUserStats();

    List<Map<String, Object>> getPendingListings();

    void approveListing(Long listingId);

    void rejectListing(Long listingId);

    Map<String, Object> getApprovalStats();


    /* ============================
       DASHBOARD ANALYTICS (DTOs)
       ============================ */

    AdminDashboardStatsResponse getDashboardStats();

    List<RevenueTrendResponse> getRevenueTrend();

//    List<ServicePerformanceResponse> getServicePerformance();

    List<RatingDistributionResponse> getRatingDistribution();

    List<ServiceCategoryShareResponse> getCategoryShare();

    List<TopServiceResponse> getTopServices();


    /* ============================
       AGGREGATED DASHBOARD
       ============================ */

    AdminDashboardResponse getDashboard();
}
