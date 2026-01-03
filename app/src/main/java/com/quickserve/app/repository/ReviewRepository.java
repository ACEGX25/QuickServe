package com.quickserve.app.repository;

import com.quickserve.app.model.Review;

import java.util.Optional;

public interface ReviewRepository {
    Optional<Review> findByBookingId(Long bookingId);
    boolean existsByBookingId(Long bookingId);
}
