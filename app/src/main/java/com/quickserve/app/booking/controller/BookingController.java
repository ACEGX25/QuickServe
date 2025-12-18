package com.quickserve.app.booking.controller;


import com.quickserve.app.booking.dto.BookingRequest;
import com.quickserve.app.booking.entity.Booking;
import com.quickserve.app.booking.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService BookingService) {
        this.bookingService = BookingService;
    }

    @PostMapping
    public Booking create(@RequestBody BookingRequest request) {
        return bookingService.createBooking(request);
    }

    @GetMapping
    public List<Booking> getAll() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    public Booking getById(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    @PutMapping("/{id}/cancel")
    public String cancel(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return "Booking cancelled";
    }
}