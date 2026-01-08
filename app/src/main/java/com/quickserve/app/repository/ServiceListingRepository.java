package com.quickserve.app.repository;

import com.quickserve.app.dto.ServiceListingResponse;
import com.quickserve.app.model.ServiceListing;
import com.quickserve.app.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface ServiceListingRepository extends JpaRepository<ServiceListing, Long> {
    // Existing methods (UNCHANGED)
    List<ServiceListing> findByProvider(User provider);
    List<ServiceListing> findByActiveTrue();
    List<ServiceListing> findByCategory(String category);
    List<ServiceListing> findByTitleContainingIgnoreCase(String keyword);
    List<ServiceListing> findByLocationContainingIgnoreCase(String location);
    List<ServiceListing> findByProviderId(Long providerId);
    Optional<ServiceListing> findByIdAndProviderId(Long id, Long providerId);

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


}
