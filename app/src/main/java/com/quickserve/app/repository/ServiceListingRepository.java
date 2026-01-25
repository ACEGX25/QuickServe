package com.quickserve.app.repository;

import com.quickserve.app.dto.ServiceListingResponse;
import com.quickserve.app.model.ServiceListing;
import com.quickserve.app.model.User;
import com.quickserve.app.repository.projection.CategoryShareProjection;
import com.quickserve.app.repository.projection.RatingDistributionProjection;
import com.quickserve.app.repository.projection.ServicePerformanceProjection;
import com.quickserve.app.repository.projection.TopServiceProjection;
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
SELECT s.title AS title,
       COUNT(b) AS bookings,
       COALESCE(SUM(s.price), 0) AS revenue
FROM Booking b
JOIN b.serviceListing s
GROUP BY s.id, s.title
ORDER BY COUNT(b) DESC
""")
    List<ServicePerformanceProjection> getServicePerformance();




    @Query("""
SELECT s.avgRating AS rating, COUNT(s) AS count
FROM ServiceListing s
WHERE s.ratingCount > 0
GROUP BY s.avgRating
""")
    List<RatingDistributionProjection> getRatingDistribution();


    Page<ServiceListing> findByActiveTrue(Pageable pageable);
    List<ServiceListing> findByActiveTrue();

    @Query("""
    SELECT s FROM ServiceListing s
    WHERE s.active = true
    AND (
        LOWER(s.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(s.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(s.location) LIKE LOWER(CONCAT('%', :keyword, '%'))
    )
""")
    Page<ServiceListing> searchActiveListings(
            @Param("keyword") String keyword,
            Pageable pageable
    );


    @Query("""
SELECT s.category AS category, COUNT(b) AS count
FROM Booking b
JOIN b.serviceListing s
GROUP BY s.category
""")
    List<CategoryShareProjection> getCategoryShare();

    @Query("""
SELECT s.title AS title,
       s.category AS category,
       COUNT(b) AS bookings,
       COALESCE(SUM(s.price), 0) AS revenue
FROM Booking b
JOIN b.serviceListing s
GROUP BY s.id, s.title, s.category
ORDER BY COUNT(b) DESC
""")
    Page<TopServiceProjection> getTopServices(Pageable pageable);




}
