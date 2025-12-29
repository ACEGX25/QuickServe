package com.quickserve.app.service.impl;

import com.quickserve.app.dto.BookingRequest;
import com.quickserve.app.model.*;
import com.quickserve.app.repository.*;
import com.quickserve.app.service.BookingService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final ServiceListingRepository serviceListingRepository;
    private final CalendarAvailabilityRepository calendarAvailabilityRepository;
    private final UserRepository userRepository;

    public BookingServiceImpl(
            BookingRepository bookingRepository,
            ServiceListingRepository serviceListingRepository,
            CalendarAvailabilityRepository calendarAvailabilityRepository,
            UserRepository userRepository
    ) {
        this.bookingRepository = bookingRepository;
        this.serviceListingRepository = serviceListingRepository;
        this.calendarAvailabilityRepository = calendarAvailabilityRepository;
        this.userRepository = userRepository;
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

    // ✅ USER BOOKINGS
    @Override
    public List<Booking> getBookingsForUserByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return bookingRepository.findByUserId(user.getId());
    }

    @Override
    public List<Booking> getBookingsForProviderByEmail(String email) {

        User provider = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Provider not found"));

        return bookingRepository.findByProviderId(provider.getId());
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




}
