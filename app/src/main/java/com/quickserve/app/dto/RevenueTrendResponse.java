package com.quickserve.app.dto;

import java.math.BigDecimal;

public record RevenueTrendResponse(String label,        // "Jan", "Feb"
                                   BigDecimal revenue,
                                   long bookings) {
}
