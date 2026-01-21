package com.quickserve.app.dto;

import java.math.BigDecimal;

public record TopServiceResponse(String serviceName,
                                 String category,
                                 long bookings,
                                 BigDecimal revenue) {
}
