package com.quickserve.app.controller;

import com.quickserve.app.dto.BookingDetailResponse;
import com.quickserve.app.dto.BookingRequest;
import com.quickserve.app.model.Booking;
import com.quickserve.app.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // ✅ Create booking (USER)
    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @Valid @RequestBody BookingRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();
        Booking booking = bookingService.createBookingByEmail(email, request);
        return ResponseEntity.ok(booking);
    }

    // ✅ Cancel booking (USER only)
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Void> cancelBooking(
            @PathVariable Long bookingId,
            Authentication authentication
    ) {
        String email = authentication.getName();
        bookingService.cancelBookingByEmail(bookingId, email);
        return ResponseEntity.noContent().build();
    }

    // ✅ Get bookings for logged-in USER
    @GetMapping("/my")
    public ResponseEntity<List<Booking>> getMyBookings(
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(
                bookingService.getBookingsForUserByEmail(email)
        );
    }

    @GetMapping("/my/{id}")
    public ResponseEntity<BookingDetailResponse> getMyBookingDetail(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String email = authentication.getName();

        BookingDetailResponse response =
                bookingService.getMyBookingDetailByEmail(id, email);

        return ResponseEntity.ok(response);
    }


    // ✅ Get bookings for PROVIDER
    @GetMapping("/provider")
    public ResponseEntity<List<Booking>> getProviderBookings(
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(
                bookingService.getBookingsForProviderByEmail(email)
        );
    }

    // ✅ Provider ACCEPT booking
    @PatchMapping("/{bookingId}/accept")
    public ResponseEntity<Booking> acceptBooking(
            @PathVariable Long bookingId,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(
                bookingService.acceptBookingByEmail(bookingId, email)
        );
    }

    // ✅ Provider REJECT booking
    @PatchMapping("/{bookingId}/reject")
    public ResponseEntity<Booking> rejectBooking(
            @PathVariable Long bookingId,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(
                bookingService.rejectBookingByEmail(bookingId, email)
        );
    }

    @PatchMapping("/{bookingId}/completed")
    public ResponseEntity<Booking> completeBooking(
            @PathVariable Long bookingId,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(
                bookingService.completeBookingByEmail(bookingId, email)
        );
    }
}
