package com.quickserve.app.service.impl;

import com.quickserve.app.dto.*;
import com.quickserve.app.model.BookingStatus;
import com.quickserve.app.model.Role;
import com.quickserve.app.model.ServiceListing;
import com.quickserve.app.repository.BookingRepository;
import com.quickserve.app.repository.ServiceListingRepository;
import com.quickserve.app.repository.UserRepository;
import com.quickserve.app.repository.projection.CategoryShareProjection;
import com.quickserve.app.repository.projection.MonthlyTrendProjection;
import com.quickserve.app.repository.projection.RatingDistributionProjection;
import com.quickserve.app.repository.projection.TopServiceProjection;
import com.quickserve.app.service.AdminService;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Month;
import java.util.*;

@Service
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final ServiceListingRepository serviceListingRepository;
    private static final List<BookingStatus> ACTIVE_STATUSES =
            List.of(
                    BookingStatus.PENDING,
                    BookingStatus.CONFIRMED
            );




    public AdminServiceImpl(
            UserRepository userRepository,
            BookingRepository bookingRepository,
            ServiceListingRepository serviceListingRepository
    ) {
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.serviceListingRepository = serviceListingRepository;
    }

    /* =========================================================
       EXISTING ADMIN FEATURES (UNCHANGED)
       ========================================================= */

    @Override
    public List<Map<String, Object>> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", user.getId());
                    map.put("name", user.getUsername());
                    map.put("email", user.getEmail());
                    map.put("role", user.getRole());
                    map.put("bookings", bookingRepository.countBookingsByUserId(user.getId()));
                    return map;
                })
                .toList();
    }

    @Override
    public Map<String, Object> getUserStats() {
        return Map.of(
                "totalUsers", userRepository.count(),
                "serviceProviders", userRepository.countByRole(Role.PROVIDER),
                "customers", userRepository.countByRole(Role.CUSTOMER)
        );
    }

    @Override
    public List<Map<String, Object>> getPendingListings() {
        return serviceListingRepository.findByApprovedFalse()
                .stream()
                .map(listing -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", listing.getId());
                    map.put("title", listing.getTitle());
                    map.put("price", listing.getPrice());
                    map.put("location", listing.getLocation());
                    map.put("category", listing.getCategory());
                    map.put("providerId", listing.getProvider().getId());
                    map.put("providerEmail", listing.getProvider().getEmail());
                    map.put("approved", listing.isApproved());
                    return map;
                })
                .toList();
    }

    @Override
    public void approveListing(Long listingId) {
        ServiceListing listing = serviceListingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));
        listing.setApproved(true);
        serviceListingRepository.save(listing);
    }

    @Override
    public void rejectListing(Long listingId) {
        ServiceListing listing = serviceListingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));
        listing.setActive(false);
        serviceListingRepository.save(listing);
    }

    @Override
    public Map<String, Object> getApprovalStats() {
        long pending = serviceListingRepository.countByApprovedFalseAndActiveTrue();
        long approved = serviceListingRepository.countByApprovedTrueAndActiveTrue();
        long rejected = serviceListingRepository.countByApprovedFalseAndActiveFalse();
        long total = serviceListingRepository.count();

        return Map.of(
                "pending", pending,
                "approved", approved,
                "rejected", rejected,
                "totalRequests", total
        );
    }

    /* =========================================================
       DASHBOARD ANALYTICS (DTO-BASED, FIXED)
       ========================================================= */

    @Override
    public AdminDashboardStatsResponse getDashboardStats() {

        BigDecimal avgRatingRaw = BigDecimal.valueOf(serviceListingRepository.getAverageRating());
        double avgRating = avgRatingRaw == null
                ? 0.0
                : avgRatingRaw.setScale(1, RoundingMode.HALF_UP).doubleValue();
        long activeBookings =
                bookingRepository.countActiveBookings(ACTIVE_STATUSES);


        return new AdminDashboardStatsResponse(
                userRepository.count(),
                bookingRepository.count(),
                activeBookings,
                serviceListingRepository.getTotalRevenue(),
                avgRating
        );
    }

    @Override
    public List<RevenueTrendResponse> getRevenueTrend() {

        List<MonthlyTrendProjection> raw = bookingRepository.getMonthlyTrend();

        Map<Integer, MonthlyTrendProjection> map = new HashMap<>();
        for (MonthlyTrendProjection p : raw) {
            map.put(p.getMonth(), p);
        }

        List<RevenueTrendResponse> result = new ArrayList<>();

        for (int m = 1; m <= 12; m++) {
            MonthlyTrendProjection p = map.get(m);

            result.add(new RevenueTrendResponse(
                    Month.of(m).name().substring(0, 3),
                    p != null ? p.getRevenue() : BigDecimal.ZERO,
                    p != null ? p.getBookings() : 0L
            ));
        }

        return result;

    }



    @Override
    public List<RatingDistributionResponse> getRatingDistribution() {

        List<RatingDistributionProjection> raw =
                serviceListingRepository.getRatingDistribution();

        Map<Integer, Long> map = new HashMap<>();
        for (RatingDistributionProjection p : raw) {
            map.put(p.getRating().intValue(), p.getCount());
        }

        List<RatingDistributionResponse> result = new ArrayList<>();
        for (int stars = 1; stars <= 5; stars++) {
            result.add(new RatingDistributionResponse(
                    stars,
                    map.getOrDefault(stars, 0L)
            ));
        }

        return result;
    }


    @Override
    public List<ServiceCategoryShareResponse> getCategoryShare() {

        List<CategoryShareProjection> raw =
                serviceListingRepository.getCategoryShare();

        long total = raw.stream()
                .mapToLong(CategoryShareProjection::getCount)
                .sum();

        return raw.stream()
                .map(p -> {
                    double percentage = total > 0
                            ? Math.round((p.getCount() * 1000.0 / total)) / 10.0
                            : 0.0;

                    return new ServiceCategoryShareResponse(
                            p.getCategory(),
                            percentage
                    );
                })
                .toList();
    }


    @Override
    public List<TopServiceResponse> getTopServices() {

        List<TopServiceProjection> raw =
                serviceListingRepository
                        .getTopServices(PageRequest.of(0, 7))
                        .getContent();

        return raw.stream()
                .map(p -> new TopServiceResponse(
                        p.getTitle(),
                        p.getCategory(),
                        p.getBookings(),
                        p.getRevenue()
                ))
                .toList();
    }


    /* =========================================================
       AGGREGATED DASHBOARD ENDPOINT SUPPORT
       ========================================================= */

    @Override
    public AdminDashboardResponse getDashboard() {
        return new AdminDashboardResponse(
                getDashboardStats(),
                getRevenueTrend(),
                getRatingDistribution(),
                getCategoryShare(),
                getTopServices()
        );
    }
}
