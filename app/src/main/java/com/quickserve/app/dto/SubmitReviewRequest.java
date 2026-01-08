package com.quickserve.app.dto;

import lombok.Data;

@Data
public class SubmitReviewRequest {
    private Long bookingId;
    private int stars;
    private String comment;
}
