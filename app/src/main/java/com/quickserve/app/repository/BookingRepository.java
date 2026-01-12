package com.quickserve.app.repository;

import com.quickserve.app.model.Booking;
import com.quickserve.app.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Fetch all bookings made by a user
    List<Booking> findByUserId(Long userId);

    // Fetch all bookings for a provider
    List<Booking> findByProviderId(Long providerId);

    // Check overlapping bookings for a provider (excluding cancelled)
    @Query("""
        SELECT b FROM Booking b
        WHERE b.providerId = :providerId
          AND b.startTime < :endTime
          AND b.endTime > :startTime
          AND b.status <> :cancelled
    """)
    List<Booking> findOverlappingBookings(
            @Param("providerId") Long providerId,
            @Param("startTime") OffsetDateTime startTime,
            @Param("endTime") OffsetDateTime endTime,
            @Param("cancelled") BookingStatus cancelled
    );

    // Fetch a booking only if it belongs to the given user
    Optional<Booking> findByIdAndUserId(Long id, Long userId);


    long countByStatus(BookingStatus status);

    @Query("""
    SELECT COUNT(b)
    FROM Booking b
    WHERE b.userId = :userId
""")
    long countBookingsByUserId(Long userId);

    @Query("""
    SELECT EXTRACT(MONTH FROM b.createdAt), COUNT(b)
    FROM Booking b
    GROUP BY EXTRACT(MONTH FROM b.createdAt)
    ORDER BY EXTRACT(MONTH FROM b.createdAt)
""")
    List<Object[]> getMonthlyBookings();

    @Query("""
    SELECT
        EXTRACT(MONTH FROM b.createdAt),
        COALESCE(SUM(s.price), 0)
    FROM Booking b
    JOIN ServiceListing s ON b.serviceListingId = s.id
    WHERE b.status = com.quickserve.app.model.BookingStatus.CONFIRMED
    GROUP BY EXTRACT(MONTH FROM b.createdAt)
    ORDER BY EXTRACT(MONTH FROM b.createdAt)
""")
    List<Object[]> getMonthlyRevenue();



}
