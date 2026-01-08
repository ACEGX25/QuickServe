package com.quickserve.app.controller;

import com.quickserve.app.dto.*;
import com.quickserve.app.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
     * Public search (paginated, rating-aware)
     * GET /api/listings/search?keyword=clean&page=0&size=10
     */
    @GetMapping("/search")
    public Page<ServiceListingResponse> searchListings(
            @RequestParam(required = false) String keyword,
            Pageable pageable
    ) {
        return listingService.searchListings(keyword, pageable);
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
