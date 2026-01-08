package com.quickserve.app.repository;

import com.quickserve.app.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByBookingId(Long bookingId);
    boolean existsByBookingId(Long bookingId);
    List<Review> findByUserId(Long userId);
    List<Review> findByProviderId(Long providerId);
    List<Review> findByBooking_ServiceListingId(Long serviceListingId);

}
