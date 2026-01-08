package com.quickserve.app.controller;

import com.quickserve.app.dto.ProviderRatingResponse;
import com.quickserve.app.dto.ReviewResponse;
import com.quickserve.app.model.Review;
import com.quickserve.app.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/reviews")
public class PublicReviewController {

    private final ReviewService reviewService;

    public PublicReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // 1️⃣ Public: provider reviews
    @GetMapping("/provider/{providerId}")
    public List<ReviewResponse> getProviderReviews(@PathVariable Long providerId) {
        return reviewService.getProviderReviews(providerId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // 2️⃣ Public: provider rating summary
    @GetMapping("/provider/{providerId}/rating")
    public ProviderRatingResponse getProviderRating(@PathVariable Long providerId) {

        Double avg = reviewService.getProviderAverageRating(providerId);
        Long count = (long) reviewService.getProviderReviews(providerId).size();

        return new ProviderRatingResponse(avg, count);
    }

    // ---- mapper (duplicate for now, we’ll refactor later) ----
    private ReviewResponse mapToResponse(Review review) {

        ReviewResponse response = new ReviewResponse();
        response.setId(review.getId());
        response.setBookingId(review.getBooking().getId());
        response.setUserId(review.getUser().getId());
        response.setProviderId(review.getProvider().getId());
        response.setStars(review.getStars());
        response.setComment(review.getComment());
        response.setCreatedAt(review.getCreatedAt());

        return response;
    }
}
