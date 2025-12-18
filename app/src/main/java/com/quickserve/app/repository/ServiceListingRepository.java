package com.quickserve.app.repository;

import com.quickserve.app.model.ServiceListing;
import com.quickserve.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ServiceListingRepository extends JpaRepository<ServiceListing, Long> {
    List<ServiceListing> findByProvider(User provider);
    List<ServiceListing> findByActiveTrue();
    List<ServiceListing> findByCategory(String category);
    List<ServiceListing> findByTitleContainingIgnoreCase(String keyword);
    List<ServiceListing> findByLocationContainingIgnoreCase(String location);
    List<ServiceListing> findByProviderId(Long providerId);
    Optional<ServiceListing> findByIdAndProviderId(Long id, Long providerId);


}
