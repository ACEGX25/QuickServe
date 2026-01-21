package com.quickserve.app.repository.projection;

import java.math.BigDecimal;

public interface TopServiceProjection {
    String getTitle();
    String getCategory();
    Long getBookings();
    BigDecimal getRevenue();
}

