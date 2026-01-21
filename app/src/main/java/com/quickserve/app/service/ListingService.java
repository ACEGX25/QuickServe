package com.quickserve.app.service;

import com.quickserve.app.dto.*;
import com.quickserve.app.model.ServiceListing;
import com.quickserve.app.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ListingService {

    // keep existing methods
    ServiceListing createListing(ServiceListing listing, User provider);
    ServiceListing updateListing(Long listingId, ServiceListing updatedListing, User provider);
    void deleteListing(Long listingId, User provider);
    ServiceListing getListingById(Long id);
    List<ServiceListingResponse> getAllActiveListings();
    List<ServiceListing> getListingsByProvider(User provider);

    Page<ServiceListingResponse> getAllActiveListings(Pageable pageable);


    // 🔥 UPDATED search method
    Page<ServiceListingResponse> searchListings(
            String keyword,
            Pageable pageable
    );

    List<ServiceListingResponse> filterListings(ListingFilterRequest filterRequest);
    ServiceListingResponse createListing(CreateListingRequest request, MultipartFile image);
    List<ProviderListingResponse> getProviderListings();
    ServiceListingResponse updateListing(Long listingId, UpdateListingRequest request);
    void deleteListing(Long listingId);
}
