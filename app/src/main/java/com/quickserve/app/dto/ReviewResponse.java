package com.quickserve.app.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Data
public class ReviewResponse {
    private Long id;
    private Long bookingId;
    private Long userId;
    private Long providerId;
    private int stars;
    private String comment;
    private LocalDateTime createdAt;
}
