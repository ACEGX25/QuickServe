package com.quickserve.app.repository.projection;

import java.math.BigDecimal;

public interface MonthlyTrendProjection {

    Integer getMonth();

    Long getBookings();

    BigDecimal getRevenue();
}
