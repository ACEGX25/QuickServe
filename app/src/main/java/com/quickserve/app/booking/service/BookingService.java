package com.quickserve.app.booking.service;

import com.quickserve.app.booking.entity.Booking;
import com.quickserve.app.booking.entity.BookingStatus;
import com.quickserve.app.booking.repository.BookingRepository;
import com.quickserve.app.notification.service.notificationservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

<<<<<<< HEAD
    Booking createBooking(Long userId, Long providerId, BookingRequest request);

    void cancelBooking(Long bookingId, Long userId);

    List<Booking> getBookingsForUser(Long userId);
=======
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private notificationservice notificationservice;

    /**
     * Create booking with conflict check
     */
    public Booking createBooking(Booking booking) {

        boolean conflict = bookingRepository.existsConflictingBooking(
                booking.getProviderId(),
                booking.getStartTime(),
                booking.getEndTime()
        );

        if (conflict) {
            throw new RuntimeException("❌ Time slot already booked");
        }

        booking.setStatus(BookingStatus.CONFIRMED);

        Booking savedBooking = bookingRepository.save(booking);

        // Send notification
        notificationservice.sendBookingConfirmation(
                booking.getCustomerId(),
                booking.getProviderId()
        );

        return savedBooking;
    }

    public List<Booking> getBookingsByCustomer(Long customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    public List<Booking> getBookingsByProvider(Long providerId) {
        return bookingRepository.findByProviderId(providerId);
    }

    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }
>>>>>>> 4cb25f9 (Add Booking, Calendar, and Notification modules)
}
