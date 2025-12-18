package com.quickserve.app.service;

import com.quickserve.app.dto.*;
import com.quickserve.app.model.ServiceListing;
import com.quickserve.app.model.User;

import java.util.List;

public interface ListingService {
    ServiceListing createListing(ServiceListing listing, User provider);
    ServiceListing updateListing(Long listingId, ServiceListing updatedListing, User provider);
    void deleteListing(Long listingId, User provider);
    ServiceListing getListingById(Long id);
    List<ServiceListingResponse> getAllActiveListings();
    List<ServiceListing> getListingsByProvider(User provider);
    List<ServiceListingResponse> searchListings(String keyword);
    List<ServiceListingResponse> filterListings(ListingFilterRequest filterRequest);
    ServiceListingResponse createListing(CreateListingRequest request);
    List<ProviderListingResponse> getProviderListings();
    ServiceListingResponse updateListing(Long listingId, UpdateListingRequest request);
    void deleteListing(Long listingId);


}
