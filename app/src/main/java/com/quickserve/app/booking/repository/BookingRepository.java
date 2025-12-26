package com.quickserve.app.booking.repository;

import com.quickserve.app.booking.entity.Booking;
import com.quickserve.app.booking.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
<<<<<<< HEAD

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);
=======
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByCustomerId(Long customerId);
>>>>>>> 4cb25f9 (Add Booking, Calendar, and Notification modules)

    List<Booking> findByProviderId(Long providerId);

    @Query("""
        SELECT b FROM Booking b
        WHERE b.providerId = :providerId
          AND b.startTime < :endTime
          AND b.endTime > :startTime
          AND b.status <> :cancelled
    """)
<<<<<<< HEAD
    List<Booking> findOverlappingBookings(
            Long providerId,
            OffsetDateTime startTime,
            OffsetDateTime endTime,
            BookingStatus cancelled
=======
    boolean existsConflictingBooking(
            @Param("providerId") Long providerId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
>>>>>>> 4cb25f9 (Add Booking, Calendar, and Notification modules)
    );

    Optional<Booking> findByIdAndUserId(Long id, Long userId);
}
