package com.quickserve.app.repository.projection;

import java.math.BigDecimal;

public interface ServicePerformanceProjection {
    String getTitle();
    Long getBookings();
    BigDecimal getRevenue();
}

