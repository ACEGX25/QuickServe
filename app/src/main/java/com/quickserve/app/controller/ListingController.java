package com.quickserve.app.controller;

import com.quickserve.app.dto.*;
import com.quickserve.app.model.ServiceListing;
import com.quickserve.app.model.User;
import com.quickserve.app.service.ListingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/provider/listings")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;

    /* ================= CREATE ================= */

    @PostMapping
    @PreAuthorize("hasRole('PROVIDER')")
    public ResponseEntity<ServiceListingResponse> createListing(
            @Valid @RequestBody CreateListingRequest request
    ) {
        ServiceListingResponse response = listingService.createListing(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /* ================= READ (Provider Dashboard) ================= */

    @GetMapping
    @PreAuthorize("hasRole('PROVIDER')")
    public ResponseEntity<List<ProviderListingResponse>> getProviderListings() {
        List<ProviderListingResponse> listings = listingService.getProviderListings();
        return ResponseEntity.ok(listings);
    }

    /* ================= UPDATE ================= */

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PROVIDER')")
    public ResponseEntity<ServiceListingResponse> updateListing(
            @PathVariable Long id,
            @Valid @RequestBody UpdateListingRequest request
    ) {
        ServiceListingResponse response = listingService.updateListing(id, request);
        return ResponseEntity.ok(response);
    }

    /* ================= DELETE ================= */

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PROVIDER')")
    public ResponseEntity<Void> deleteListing(@PathVariable Long id) {
        listingService.deleteListing(id);
        return ResponseEntity.noContent().build();
    }
}
