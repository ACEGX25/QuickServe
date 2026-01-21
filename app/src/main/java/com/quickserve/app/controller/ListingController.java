package com.quickserve.app.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.quickserve.app.dto.*;
import com.quickserve.app.model.ServiceListing;
import com.quickserve.app.model.User;
import com.quickserve.app.service.ListingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/provider/listings")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;

    /* ================= CREATE ================= */

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('PROVIDER')")
    public ResponseEntity<ServiceListingResponse> createListing(
            @RequestPart("data") String data,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        CreateListingRequest request =
                mapper.readValue(data, CreateListingRequest.class);

        ServiceListingResponse response =
                listingService.createListing(request, image);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
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
