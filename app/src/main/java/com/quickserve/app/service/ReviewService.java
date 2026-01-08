package com.quickserve.app.service;

import com.quickserve.app.model.Review;

import java.util.List;

public interface ReviewService {
    Review submitReviewByEmail(String email, Long bookingId, int stars, String comment);
    List<Review> getUserReviewHistoryByEmail(String email);
    List<Review> getProviderReviews(Long providerId);
    Double getProviderAverageRating(Long providerId);
    List<Review> getServiceReviews(Long serviceListingId);
    Double getServiceAverageRating(Long serviceListingId);

}
