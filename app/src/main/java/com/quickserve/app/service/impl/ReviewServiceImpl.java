package com.quickserve.app.service.impl;

import com.quickserve.app.model.Booking;
import com.quickserve.app.model.BookingStatus;
import com.quickserve.app.model.Review;
import com.quickserve.app.model.User;
import com.quickserve.app.repository.BookingRepository;
import com.quickserve.app.repository.ReviewRepository;
import com.quickserve.app.repository.UserRepository;
import com.quickserve.app.service.ReviewService;
import jakarta.transaction.Transactional;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository,
                             BookingRepository bookingRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public Review submitReviewByEmail(
            String email,
            Long bookingId,
            int stars,
            String comment
    ) {
        if (stars < 1 || stars > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        // ✅ OWNERSHIP CHECK
        if (!booking.getUserId().equals(user.getId())) {
            throw new AccessDeniedException("You cannot review this booking");
        }

        if (booking.getStatus() != BookingStatus.COMPLETED) {
            throw new IllegalStateException("Booking is not completed");
        }

        // ✅ DOUBLE REVIEW CHECK
        if (reviewRepository.existsByBookingAndUser(booking, user)) {
            throw new IllegalStateException("Review already submitted");
        }

        User provider = userRepository.findById(booking.getProviderId())
                .orElseThrow(() -> new IllegalArgumentException("Provider not found"));

        Review review = new Review();
        review.setBooking(booking);
        review.setUser(user);
        review.setProvider(provider);
        review.setStars(stars);
        review.setComment(comment);

        return reviewRepository.save(review);
    }


    @Override
    public List<Review> getUserReviewHistoryByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return reviewRepository.findByUserId(user.getId());
    }


    @Override
    public List<Review> getProviderReviews(Long providerId) {
        return reviewRepository.findAll()
                .stream()
                .filter(r -> r.getProvider().getId().equals(providerId))
                .toList();
    }

    @Override
    public Double getProviderAverageRating(Long providerId) {
        List<Review> reviews = getProviderReviews(providerId);

        if (reviews.isEmpty()) {
            return 0.0;
        }

        return reviews.stream()
                .mapToInt(Review::getStars)
                .average()
                .orElse(0.0);
    }

    @Override
    public List<Review> getServiceReviews(Long serviceListingId) {
        return reviewRepository.findByBooking_ServiceListingId(serviceListingId);
    }

    @Override
    public Double getServiceAverageRating(Long serviceListingId) {

        List<Review> reviews = reviewRepository
                .findByBooking_ServiceListingId(serviceListingId);

        if (reviews.isEmpty()) {
            return 0.0;
        }

        return reviews.stream()
                .mapToInt(Review::getStars)
                .average()
                .orElse(0.0);
    }

}
