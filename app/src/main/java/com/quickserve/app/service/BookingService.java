package com.quickserve.app.service;

import com.quickserve.app.dto.BookingDetailResponse;
import com.quickserve.app.dto.BookingRequest;
import com.quickserve.app.model.Booking;
import jakarta.validation.Valid;

import java.util.List;

public interface BookingService {


    Booking createBookingByEmail(String email, @Valid BookingRequest request);

    void cancelBookingByEmail(Long bookingId, String email);

    List<Booking> getBookingsForUserByEmail(String email);

    List<Booking> getBookingsForProviderByEmail(String email);

    Booking acceptBookingByEmail(Long bookingId, String email);

    Booking rejectBookingByEmail(Long bookingId, String email);

    Booking completeBookingByEmail(Long bookingId, String email);

    BookingDetailResponse getMyBookingDetailByEmail(Long bookingId, String email);
}
