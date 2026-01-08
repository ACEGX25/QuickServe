package com.quickserve.app.controller;

import com.quickserve.app.dto.ReviewResponse;
import com.quickserve.app.dto.SubmitReviewRequest;
import com.quickserve.app.model.Review;
import com.quickserve.app.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // ✅ Submit review (AUTH REQUIRED)
    @PostMapping
    public ResponseEntity<ReviewResponse> submitReview(
            @RequestBody SubmitReviewRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();

        Review review = reviewService.submitReviewByEmail(
                email,
                request.getBookingId(),
                request.getStars(),
                request.getComment()
        );

        return ResponseEntity.ok(mapToResponse(review));
    }

    // ✅ Logged-in user review history
    @GetMapping("/history")
    public ResponseEntity<List<ReviewResponse>> getUserReviewHistory(
            Authentication authentication
    ) {
        String email = authentication.getName();

        return ResponseEntity.ok(
                reviewService.getUserReviewHistoryByEmail(email)
                        .stream()
                        .map(this::mapToResponse)
                        .toList()
        );
    }

    // ---- mapper ----
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
