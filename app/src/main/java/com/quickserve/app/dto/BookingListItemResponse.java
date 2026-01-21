package com.quickserve.app.dto;

import com.quickserve.app.model.BookingStatus;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record BookingListItemResponse(
        Long id,
        String serviceTitle,
        BookingStatus status,
        OffsetDateTime startTime,
        OffsetDateTime endTime,
        BigDecimal price
) {}
