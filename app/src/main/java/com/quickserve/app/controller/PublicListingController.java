package com.quickserve.app.controller;

import com.quickserve.app.dto.*;
import com.quickserve.app.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listings")
@RequiredArgsConstructor
public class PublicListingController {

    private final ListingService listingService;

    /**
     * Public browse (no filters)
     * GET /api/listings
     */
    @GetMapping
    public List<ServiceListingResponse> getAllActiveListings() {
        return listingService.getAllActiveListings();
    }

    /**
     * Public search
     * GET /api/listings/search?keyword=clean
     */
    @GetMapping("/search")
    public List<ServiceListingResponse> searchListings(
            @RequestParam(required = false) String keyword
    ) {
        return listingService.searchListings(keyword);
    }

    /**
     * Public filter
     * POST /api/listings/filter
     */
    @PostMapping("/filter")
    public List<ServiceListingResponse> filterListings(
            @RequestBody ListingFilterRequest filterRequest
    ) {
        return listingService.filterListings(filterRequest);
    }
}
