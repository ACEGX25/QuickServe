package com.quickserve.app.dto;

import java.math.BigDecimal;

public record AdminDashboardStatsResponse(long totalUsers,
                                          long totalBookings,
                                          long activeBookings,
                                          BigDecimal totalRevenue,
                                          double averageRating) {
}
