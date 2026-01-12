package com.quickserve.app.repository;

import com.quickserve.app.dto.ServiceListingResponse;
import com.quickserve.app.model.ServiceListing;
import com.quickserve.app.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ServiceListingRepository extends JpaRepository<ServiceListing, Long> {
    // Existing methods (UNCHANGED)
    List<ServiceListing> findByProvider(User provider);
    List<ServiceListing> findByApprovedTrue();
    List<ServiceListing> findByCategory(String category);
    List<ServiceListing> findByTitleContainingIgnoreCase(String keyword);
    List<ServiceListing> findByLocationContainingIgnoreCase(String location);
    List<ServiceListing> findByProviderId(Long providerId);
    Optional<ServiceListing> findByIdAndProviderId(Long id, Long providerId);
    List<ServiceListing> findByApprovedFalse();

    // ✅ NEW: Search API method with ratings
    @Query("""
        SELECT new com.quickserve.app.dto.ServiceListingResponse(
            s.id,
            s.title,
            s.description,
            s.location,
            s.category,
            s.price,
            s.provider.id,
            s.provider.username,
            s.avgRating,
            s.ratingCount
        )
        FROM ServiceListing s
        WHERE s.active = true
        AND (
            LOWER(s.title) LIKE LOWER(CONCAT('%', :query, '%'))
            OR LOWER(s.description) LIKE LOWER(CONCAT('%', :query, '%'))
            OR LOWER(s.location) LIKE LOWER(CONCAT('%', :query, '%'))
        )
        """)
    Page<ServiceListingResponse> search(
            @Param("query") String query,
            Pageable pageable
    );

    // Total revenue = sum of prices of active listings
    @Query("""
        SELECT COALESCE(SUM(s.price), 0)
        FROM ServiceListing s
        WHERE s.active = true
    """)
    BigDecimal getTotalRevenue();

    // Platform average rating (weighted-safe, simple)
    @Query("""
        SELECT COALESCE(AVG(s.avgRating), 0)
        FROM ServiceListing s
        WHERE s.ratingCount > 0
    """)
    Double getAverageRating();

    // ---------- APPROVAL STATS ----------

    // Pending = submitted but not yet approved
    long countByApprovedFalseAndActiveTrue();

    // Approved = visible to users
    long countByApprovedTrueAndActiveTrue();

    // Rejected = admin rejected
    long countByApprovedFalseAndActiveFalse();

    @Query("""
    SELECT EXTRACT(MONTH FROM b.createdAt), SUM(s.price)
    FROM Booking b
    JOIN ServiceListing s ON b.serviceListingId = s.id
    WHERE b.status = 'CONFIRMED'
    GROUP BY EXTRACT(MONTH FROM b.createdAt)
    ORDER BY EXTRACT(MONTH FROM b.createdAt)
""")
    List<Object[]> getMonthlyRevenue();


    @Query("""
    SELECT s.category, COUNT(s)
    FROM ServiceListing s
    WHERE s.approved = true
    GROUP BY s.category
""")
    List<Object[]> getServicePerformance();

    @Query("""
    SELECT s.avgRating, COUNT(s)
    FROM ServiceListing s
    WHERE s.ratingCount > 0
    GROUP BY s.avgRating
""")
    List<Object[]> getRatingDistribution();


}
