package com.quickserve.app.calendar.repository;

import com.quickserve.app.calendar.entity.CalendarAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

<<<<<<< HEAD
import java.time.OffsetDateTime;
=======
import java.time.LocalDate;
>>>>>>> 4cb25f9 (Add Booking, Calendar, and Notification modules)
import java.util.List;

public interface CalendarAvailabilityRepository
        extends JpaRepository<CalendarAvailability, Long> {

<<<<<<< HEAD
    @Query("""
        SELECT a FROM CalendarAvailability a
        WHERE a.serviceListingId = :listingId
          AND a.startTime <= :start
          AND a.endTime >= :end
    """)
    List<CalendarAvailability> findMatchingAvailability(
            Long listingId,
            OffsetDateTime start,
            OffsetDateTime end
=======
    List<CalendarAvailability> findByProviderIdAndDateAndBookedFalse(
            Long providerId, LocalDate date
>>>>>>> 4cb25f9 (Add Booking, Calendar, and Notification modules)
    );
}
