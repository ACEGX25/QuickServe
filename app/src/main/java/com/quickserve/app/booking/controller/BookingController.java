package com.quickserve.app.booking.controller;

<<<<<<< HEAD
import com.quickserve.app.booking.dto.BookingRequest;
=======
>>>>>>> 4cb25f9 (Add Booking, Calendar, and Notification modules)
import com.quickserve.app.booking.entity.Booking;
import com.quickserve.app.booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

<<<<<<< HEAD
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }
=======
    @Autowired
    private BookingService bookingService;
>>>>>>> 4cb25f9 (Add Booking, Calendar, and Notification modules)

    // CREATE BOOKING
    @PostMapping
<<<<<<< HEAD
    public Booking create(@RequestBody BookingRequest request) {
        // TEMP values (JWT later)
        System.out.println("Controller reached");
        return bookingService.createBooking(1L, 10L, request);
    }

    @GetMapping
    public List<Booking> myBookings() {
        return bookingService.getBookingsForUser(1L);
    }

    @PutMapping("/{id}/cancel")
    public String cancel(@PathVariable Long id) {
        bookingService.cancelBooking(id, 1L);
        return "Booking cancelled";
=======
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    // GET BOOKINGS BY CUSTOMER
    @GetMapping("/customer/{customerId}")
    public List<Booking> getCustomerBookings(@PathVariable Long customerId) {
        return bookingService.getBookingsByCustomer(customerId);
    }

    // GET BOOKINGS BY PROVIDER
    @GetMapping("/provider/{providerId}")
    public List<Booking> getProviderBookings(@PathVariable Long providerId) {
        return bookingService.getBookingsByProvider(providerId);
    }

    // CANCEL BOOKING
    @PutMapping("/{bookingId}/cancel")
    public String cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
        return "Booking cancelled successfully";
>>>>>>> 4cb25f9 (Add Booking, Calendar, and Notification modules)
    }
}
