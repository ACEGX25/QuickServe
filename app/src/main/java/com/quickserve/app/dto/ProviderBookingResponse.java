package com.quickserve.app.dto;

import com.quickserve.app.model.BookingStatus;
import com.quickserve.app.model.Category;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

public record ProviderBookingResponse(Long id,
                                      Long userId,
                                      Long serviceListingId,
                                      String serviceTitle,
                                      Category serviceCategory,
                                      OffsetDateTime startTime,
                                      OffsetDateTime endTime,
                                      BookingStatus status) {
}
