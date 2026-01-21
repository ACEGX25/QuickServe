package com.quickserve.app.dto;

import java.math.BigDecimal;

public record ServicePerformanceResponse(String serviceName,
                                         long totalBookings,
                                         BigDecimal revenue) {
}
