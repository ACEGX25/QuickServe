package com.quickserve.app.service.impl;

import com.quickserve.app.model.ServiceListing;
import com.quickserve.app.repository.BookingRepository;
import com.quickserve.app.repository.ServiceListingRepository;
import com.quickserve.app.repository.UserRepository;
import com.quickserve.app.service.AdminService;
import com.quickserve.app.model.Role;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.math.BigDecimal;
import java.time.Month;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminServiceImpl implements AdminService {
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final ServiceListingRepository serviceListingRepository;

    public AdminServiceImpl(UserRepository userRepository, BookingRepository bookingRepository, ServiceListingRepository serviceListingRepository) {
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.serviceListingRepository = serviceListingRepository;
    }

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

        listing.setActive(false);   // soft reject
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

    @Override
    public Map<String, Object> getAnalyticsSummary() {
        return Map.of(
                "totalRevenue", serviceListingRepository.getTotalRevenue(),
                "totalBookings", bookingRepository.count(),
                "totalUsers", userRepository.count(),
                "avgRating", serviceListingRepository.getAverageRating()
        );
    }

    @Override
    public Map<String, Object> getRevenueAndBookingsTrend() {

        List<Object[]> revenueRaw = bookingRepository.getMonthlyRevenue();
        List<Object[]> bookingRaw = bookingRepository.getMonthlyBookings();

        List<String> labels = new ArrayList<>();
        List<BigDecimal> revenue = new ArrayList<>();
        List<Long> bookings = new ArrayList<>();

        for (int month = 1; month <= 12; month++) {
            final int m = month;

            labels.add(Month.of(m).name().substring(0, 3));

            revenue.add(
                    revenueRaw.stream()
                            .filter(r -> ((Number) r[0]).intValue() == m)
                            .map(r -> (BigDecimal) r[1])
                            .findFirst()
                            .orElse(BigDecimal.ZERO)
            );

            bookings.add(
                    bookingRaw.stream()
                            .filter(b -> ((Number) b[0]).intValue() == m)
                            .map(b -> ((Number) b[1]).longValue())
                            .findFirst()
                            .orElse(0L)
            );
        }

        return Map.of(
                "labels", labels,
                "revenue", revenue,
                "bookings", bookings
        );
    }



    @Override
    public List<Map<String, Object>> getServicePerformance() {
        List<Object[]> raw = serviceListingRepository.getServicePerformance();

        return raw.stream()
                .map(row -> Map.of(
                        "category", row[0],
                        "count", row[1]
                ))
                .toList();
    }


    @Override
    public List<Map<String, Object>> getRatingDistribution() {
        List<Object[]> raw = serviceListingRepository.getRatingDistribution();

        return raw.stream()
                .map(row -> Map.of(
                        "stars", row[0],
                        "count", row[1]
                ))
                .toList();
    }




}
