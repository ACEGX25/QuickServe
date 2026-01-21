package com.quickserve.app.service.impl;

import com.quickserve.app.dto.BookingDetailResponse;
import com.quickserve.app.dto.BookingListItemResponse;
import com.quickserve.app.dto.BookingRequest;
import com.quickserve.app.dto.ProviderBookingResponse;
import com.quickserve.app.model.*;
import com.quickserve.app.repository.*;
import com.quickserve.app.service.BookingService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final ServiceListingRepository serviceListingRepository;
    private final CalendarAvailabilityRepository calendarAvailabilityRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;





    public BookingServiceImpl(
            BookingRepository bookingRepository,
            ServiceListingRepository serviceListingRepository,
            CalendarAvailabilityRepository calendarAvailabilityRepository,
            UserRepository userRepository,
            ReviewRepository reviewRepository
    ) {
        this.bookingRepository = bookingRepository;
        this.serviceListingRepository = serviceListingRepository;
        this.calendarAvailabilityRepository = calendarAvailabilityRepository;
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
    }

    // ✅ CREATE BOOKING (USER)
    @Override
    @Transactional
    public Booking createBookingByEmail(String email, BookingRequest request) {

        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new IllegalArgumentException("End time must be after start time");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        ServiceListing listing = serviceListingRepository
                .findById(request.getServiceListingId())
                .orElseThrow(() -> new IllegalArgumentException("Service listing not found"));

        Long providerId = listing.getProvider().getId();

        // ✅ Check availability
        List<CalendarAvailability> availabilitySlots =
                calendarAvailabilityRepository.findOverlappingAvailability(
                        providerId,
                        request.getStartTime(),
                        request.getEndTime()
                );

        boolean covered = availabilitySlots.stream().anyMatch(slot ->
                !slot.getStartTime().isAfter(request.getStartTime()) &&
                        !slot.getEndTime().isBefore(request.getEndTime())
        );

        if (!covered) {
            throw new IllegalStateException("Provider is not available for the selected time");
        }

        // ✅ Check booking overlap
        List<Booking> overlappingBookings =
                bookingRepository.findOverlappingBookings(
                        providerId,
                        request.getStartTime(),
                        request.getEndTime(),
                        BookingStatus.CANCELLED
                );

        if (!overlappingBookings.isEmpty()) {
            throw new IllegalStateException("Selected time slot is already booked");
        }

        Booking booking = new Booking();
        booking.setUserId(user.getId());
        booking.setProviderId(providerId);
        booking.setServiceListingId(listing.getId());
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());
        booking.setStatus(BookingStatus.PENDING);

        return bookingRepository.save(booking);
    }

    // ✅ CANCEL BOOKING (USER ONLY)
    @Override
    @Transactional
    public void cancelBookingByEmail(Long bookingId, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Booking booking = bookingRepository.findByIdAndUserId(bookingId, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingListItemResponse> getBookingsForUserByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bookingRepository.findByUserId(user.getId())
                .stream()
                .map(this::mapToBookingListItem)
                .toList();
    }


    private BookingListItemResponse mapToBookingListItem(Booking booking) {
        ServiceListing listing = booking.getServiceListing();

        String title = "[Deleted service]";
        BigDecimal price = BigDecimal.ZERO;

        if (listing != null) {
            title = listing.getTitle();
            price = listing.getPrice();
        }

        return new BookingListItemResponse(
                booking.getId(),
                title,
                booking.getStatus(),
                booking.getStartTime(),
                booking.getEndTime(),
                price
        );
    }




    @Override
    @Transactional(readOnly = true)
    public List<ProviderBookingResponse> getBookingsForProviderByEmail(String email) {

        User provider = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Provider not found"));

        return bookingRepository.findByProviderId(provider.getId())
                .stream()
                .map(booking -> {

                    ServiceListing listing = booking.getServiceListing();

                    String title = "[Deleted service]";
                    Category category = null;

                    if (listing != null) {
                        title = listing.getTitle();
                        category = listing.getCategory(); // enum → SAFE
                    }

                    return new ProviderBookingResponse(
                            booking.getId(),
                            booking.getUserId(),
                            booking.getServiceListingId(),
                            title,
                            category,
                            booking.getStartTime(),   // OffsetDateTime
                            booking.getEndTime(),     // OffsetDateTime
                            booking.getStatus()
                    );
                })
                .toList();
    }



    // ✅ PROVIDER ACCEPT BOOKING
    @Override
    @Transactional
    public Booking acceptBookingByEmail(Long bookingId, String email) {

        User provider = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Provider not found"));

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        // ownership check
        if (!booking.getProviderId().equals(provider.getId())) {
            throw new IllegalStateException("You are not allowed to accept this booking");
        }

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new IllegalStateException("Only PENDING bookings can be accepted");
        }

        booking.setStatus(BookingStatus.CONFIRMED);
        return bookingRepository.save(booking);
    }

    // ✅ PROVIDER REJECT BOOKING
    // ✅ PROVIDER REJECT BOOKING
    @Override
    @Transactional
    public Booking rejectBookingByEmail(Long bookingId, String email) {

        User provider = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Provider not found"));

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        // ownership check
        if (!booking.getProviderId().equals(provider.getId())) {
            throw new IllegalStateException("You are not allowed to reject this booking");
        }

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new IllegalStateException("Only PENDING bookings can be rejected");
        }

        // 🔥 IMPORTANT FIX
        booking.setStatus(BookingStatus.CANCELLED);

        return bookingRepository.save(booking);
    }

    @Override
    @Transactional
    public Booking completeBookingByEmail(Long bookingId, String email) {
        User provider = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Provider not found"));

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        if (!booking.getProviderId().equals(provider.getId())) {
            throw new IllegalStateException("You are not allowed to complete this booking");
        }

        if (booking.getStatus() != BookingStatus.CONFIRMED) {
            throw new IllegalStateException("Only CONFIRMED bookings can be completed");
        }

        booking.setStatus(BookingStatus.COMPLETED);

        return bookingRepository.save(booking);
    }

    public BookingDetailResponse getMyBookingDetailByEmail(Long bookingId, String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = bookingRepository
                .findByIdAndUserId(bookingId, user.getId())
                .orElseThrow(() ->
                        new AccessDeniedException("Booking not found or access denied")
                );

        ServiceListing listing = serviceListingRepository
                .findById(booking.getServiceListingId())
                .orElseThrow(() ->
                        new RuntimeException("Service listing not found")
                );

        User provider = userRepository
                .findById(booking.getProviderId())
                .orElseThrow(() ->
                        new RuntimeException("Provider not found")
                );

        long durationHours = Duration.between(
                booking.getStartTime(),
                booking.getEndTime()
        ).toHours();

        boolean reviewed = reviewRepository.existsByBookingAndUser(booking, user);


        return new BookingDetailResponse(
                booking.getId(),
                listing.getTitle(),        // service title
                provider.getId(),         // provider id
                provider.getUsername(),       // provider name (or getFullName)
                booking.getStatus().name(),
                booking.getStartTime(),
                booking.getEndTime(),
                listing.getPrice(),
                (int) durationHours,
                reviewed                   // reviewed (not implemented yet)
        );
    }



}
