package com.quickserve.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProviderRatingResponse {
    private Double averageRating;
    private Long totalReviews;
}
