package com.quickserve.app.dto;

import java.util.List;

public record AdminDashboardResponse(
        AdminDashboardStatsResponse stats,
        List<RevenueTrendResponse> revenueTrend,
        List<RatingDistributionResponse> ratingDistribution,
        List<ServiceCategoryShareResponse> categoryShare,
        List<TopServiceResponse> topServices
) {}
