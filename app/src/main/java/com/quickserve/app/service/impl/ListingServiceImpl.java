package com.quickserve.app.service.impl;

import com.quickserve.app.dto.*;
import com.quickserve.app.model.Category;
import com.quickserve.app.model.ListingImage;
import com.quickserve.app.model.ServiceListing;
import com.quickserve.app.model.User;
import com.quickserve.app.repository.ServiceListingRepository;
import com.quickserve.app.repository.UserRepository;
import com.quickserve.app.service.CloudinaryService;
import com.quickserve.app.service.ImageResolverService;
import com.quickserve.app.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ListingServiceImpl implements ListingService {

    private final ServiceListingRepository listingRepository;
    private final UserRepository userRepository;
    private final ImageResolverService imageResolverService;
    private final CloudinaryService cloudinaryService;




    @Override
    public ServiceListing createListing(ServiceListing listing, User provider) {
        listing.setProvider(provider);
        listing.setActive(true);
        return listingRepository.save(listing);
    }

    @Override
    public ServiceListing updateListing(Long listingId, ServiceListing updatedListing, User provider) {

        ServiceListing existing = listingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));


        if (!existing.getProvider().getId().equals(provider.getId())) {
            throw new RuntimeException("Unauthorized update attempt");
        }

        existing.setTitle(updatedListing.getTitle());
        existing.setDescription(updatedListing.getDescription());
        existing.setPrice(updatedListing.getPrice());
        existing.setLocation(updatedListing.getLocation());
        existing.setCategory(updatedListing.getCategory());

        return listingRepository.save(existing);
    }

    @Override
    public void deleteListing(Long listingId, User provider) {
        ServiceListing existing = listingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        if (!existing.getProvider().getId().equals(provider.getId())) {
            throw new RuntimeException("Unauthorized delete attempt");
        }


        existing.setActive(false);
        listingRepository.save(existing);
    }

    @Override
    public ServiceListing getListingById(Long id) {
        return listingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Listing not found"));
    }

    @Override
    public List<ServiceListingResponse> getAllActiveListings() {
        return listingRepository.findByApprovedTrue()
                .stream()
                .map(this::mapToServiceListingResponse)
                .toList();
    }


    @Override
    public List<ServiceListing> getListingsByProvider(User provider) {
        return listingRepository.findByProvider(provider);
    }

    @Override
    public Page<ServiceListingResponse> searchListings(String keyword, Pageable pageable) {
        return listingRepository
                .searchActiveListings(keyword.toLowerCase(), pageable)
                .map(this::mapToServiceListingResponse);
    }


    @Override
    public List<ServiceListingResponse> filterListings(ListingFilterRequest filter) {

        List<ServiceListing> base = listingRepository.findByApprovedTrue();


        if (filter.getCategory() != null) {
            base = base.stream()
                    .filter(l -> l.getCategory() == filter.getCategory())
                    .collect(Collectors.toList());
        }


        if (filter.getLocation() != null && !filter.getLocation().isBlank()) {
            base = base.stream()
                    .filter(l -> l.getLocation().equalsIgnoreCase(filter.getLocation()))
                    .collect(Collectors.toList());
        }


        if (filter.getMinPrice() != null) {
            base = base.stream()
                    .filter(l -> l.getPrice().compareTo(filter.getMinPrice()) >= 0)
                    .collect(Collectors.toList());
        }

        if (filter.getMaxPrice() != null) {
            base = base.stream()
                    .filter(l -> l.getPrice().compareTo(filter.getMaxPrice()) <= 0)
                    .collect(Collectors.toList());
        }



        if (filter.getKeyword() != null && !filter.getKeyword().isBlank()) {
            String kw = filter.getKeyword().toLowerCase();

            base = base.stream()
                    .filter(l ->
                            l.getTitle().toLowerCase().contains(kw) ||
                                    l.getDescription().toLowerCase().contains(kw)
                    )
                    .collect(Collectors.toList());
        }

        return base.stream().map(this::mapToServiceListingResponse).toList();

    }

    private ServiceListingResponse mapToResponse(ServiceListing listing) {
        ServiceListingResponse res = new ServiceListingResponse();
        ServiceListingResponse dto = new ServiceListingResponse();
        dto.setId(listing.getId());
        dto.setTitle(listing.getTitle());
        dto.setDescription(listing.getDescription());
        dto.setLocation(listing.getLocation());
        dto.setCategory(listing.getCategory());
        dto.setPrice(listing.getPrice());

        dto.setProviderId(listing.getProvider().getId());
        dto.setProviderName(listing.getProvider().getUsername());


        return dto;
    }

    @Override
    public ServiceListingResponse createListing(CreateListingRequest request, MultipartFile image) {

        User provider = getCurrentProvider();

        ServiceListing listing = new ServiceListing();
        listing.setTitle(request.getTitle());
        listing.setDescription(request.getDescription());
        listing.setPrice(request.getPrice());
        listing.setLocation(request.getLocation());
        listing.setCategory(request.getCategory());
        listing.setProvider(provider);
        listing.setActive(true);

        // IMPORTANT: prevent NPE
        listing.setImages(new ArrayList<>());

        // Save first to generate ID
        ServiceListing saved = listingRepository.save(listing);

        // Optional image upload
        if (image != null && !image.isEmpty()) {

            String imageUrl = cloudinaryService.upload(image);

            ListingImage listingImage = new ListingImage();
            listingImage.setImageUrl(imageUrl);
            listingImage.setListing(saved);

            saved.getImages().add(listingImage);
            listingRepository.save(saved);
        }

        return mapToServiceListingResponse(saved);
    }



    @Override
    @Transactional(readOnly = true)
    public List<ProviderListingResponse> getProviderListings() {
        User provider = getCurrentProvider();

        return listingRepository.findByProviderId(provider.getId())
                .stream()
                .map(this::mapToProviderListingResponse)
                .toList();
    }




    @Override
    public ServiceListingResponse updateListing(Long listingId, UpdateListingRequest request) {

        User provider = getCurrentProvider();

        ServiceListing listing = listingRepository
                .findByIdAndProviderId(listingId, provider.getId())
                .orElseThrow(() -> new RuntimeException("Listing not found or access denied"));

        if (request.getTitle() != null)
            listing.setTitle(request.getTitle());

        if (request.getDescription() != null)
            listing.setDescription(request.getDescription());

        if (request.getPrice() != null)
            listing.setPrice(request.getPrice());

        if (request.getLocation() != null)
            listing.setLocation(request.getLocation());

        if (request.getCategory() != null)
            listing.setCategory(request.getCategory());

        ServiceListing updated = listingRepository.save(listing);
        return mapToServiceListingResponse(updated);
    }

    @Override
    public void deleteListing(Long listingId) {

        User provider = getCurrentProvider();

        ServiceListing listing = listingRepository
                .findByIdAndProviderId(listingId, provider.getId())
                .orElseThrow(() -> new RuntimeException("Listing not found or access denied"));

        listingRepository.delete(listing);
    }

    private User getCurrentProvider() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }

    private ServiceListingResponse mapToServiceListingResponse(ServiceListing listing) {
        ServiceListingResponse res = new ServiceListingResponse();

        res.setId(listing.getId());
        res.setTitle(listing.getTitle());
        res.setDescription(listing.getDescription());
        res.setLocation(listing.getLocation());
        res.setCategory(listing.getCategory());
        res.setPrice(listing.getPrice());

        res.setProviderId(listing.getProvider().getId());
        res.setProviderName(listing.getProvider().getUsername());

        res.setAverageRating(listing.getAvgRating());
        res.setRatingCount(listing.getRatingCount());
        res.setImages(imageResolverService.resolve(listing));

        return res;
    }


    private ProviderListingResponse mapToProviderListingResponse(ServiceListing listing) {
        ProviderListingResponse res = new ProviderListingResponse();
        res.setId(listing.getId());
        res.setTitle(listing.getTitle());
        res.setPrice(listing.getPrice());
        res.setLocation(listing.getLocation());
        res.setCategory(listing.getCategory());
        return res;
    }

//    private ServiceListingResponse toResponse(ServiceListing listing) {
//        return ServiceListingResponse.builder()
//                .id(listing.getId())
//                .title(listing.getTitle())
//                .description(listing.getDescription())
//                .price(listing.getPrice())
//                .location(listing.getLocation())
//                .averageRating(listing.getAvgRating())
//                .providerName(listing.getProvider().getUsername())
//                .build();
//    }


    @Override
    public Page<ServiceListingResponse> getAllActiveListings(Pageable pageable) {
        return listingRepository
                .findByActiveTrue(pageable)
                .map(this::mapToServiceListingResponse);
    }

    @Override
    public ServiceListingResponse updateListing(
            Long listingId,
            UpdateListingRequest request,
            MultipartFile image
    ) {

        User provider = getCurrentProvider();

        ServiceListing listing = listingRepository
                .findByIdAndProviderId(listingId, provider.getId())
                .orElseThrow(() -> new RuntimeException("Listing not found or access denied"));

        // Update fields if present
        if (request.getTitle() != null)
            listing.setTitle(request.getTitle());

        if (request.getDescription() != null)
            listing.setDescription(request.getDescription());

        if (request.getPrice() != null)
            listing.setPrice(request.getPrice());

        if (request.getLocation() != null)
            listing.setLocation(request.getLocation());

        if (request.getCategory() != null)
            listing.setCategory(request.getCategory());

        // OPTIONAL image update
        if (image != null && !image.isEmpty()) {
            String imageUrl = cloudinaryService.upload(image);

            ListingImage listingImage = new ListingImage();
            listingImage.setImageUrl(imageUrl);
            listingImage.setListing(listing);

            // ensure list exists
            if (listing.getImages() == null) {
                listing.setImages(new ArrayList<>());
            }

            listing.getImages().add(listingImage);
        }

        ServiceListing updated = listingRepository.save(listing);
        return mapToServiceListingResponse(updated);
    }




}
