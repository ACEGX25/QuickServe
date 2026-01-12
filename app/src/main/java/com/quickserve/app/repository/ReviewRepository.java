package com.quickserve.app.repository;

import com.quickserve.app.model.Booking;
import com.quickserve.app.model.Review;
import com.quickserve.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByBookingId(Long bookingId);
    boolean existsByBookingId(Long bookingId);
    List<Review> findByUserId(Long userId);
    List<Review> findByProviderId(Long providerId);
    List<Review> findByBooking_ServiceListingId(Long serviceListingId);
    boolean existsByBookingAndUser(Booking booking, User user);
 }
