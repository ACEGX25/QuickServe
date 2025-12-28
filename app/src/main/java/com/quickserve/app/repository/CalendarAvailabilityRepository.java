package com.quickserve.app.repository;

import com.quickserve.app.model.CalendarAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.OffsetDateTime;
import java.util.List;

public interface CalendarAvailabilityRepository
        extends JpaRepository<CalendarAvailability, Long> {

    // Fetch all availability slots for a provider
    List<CalendarAvailability> findByProviderId(Long providerId);

    // Check overlapping availability slots
    @Query("""
        SELECT c FROM CalendarAvailability c
        WHERE c.providerId = :providerId
          AND c.startTime < :endTime
          AND c.endTime > :startTime
    """)
    List<CalendarAvailability> findOverlappingAvailability(
            @Param("providerId") Long providerId,
            @Param("startTime") OffsetDateTime startTime,
            @Param("endTime") OffsetDateTime endTime
    );
}
