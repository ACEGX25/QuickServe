// package com.quickserve.app.calendar.entity;

// import jakarta.persistence.*;
// import java.time.LocalDate;
// import java.time.LocalTime;

// @Entity
// @Table(name = "calendar_availability")
// public class CalendarAvailability {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private Long providerId;
//     private LocalDate date;
//     private LocalTime startTime;
//     private LocalTime endTime;

//     public Long getId() { return id; }
//     public Long getProviderId() { return providerId; }
//     public LocalDate getDate() { return date; }
//     public LocalTime getStartTime() { return startTime; }
//     public LocalTime getEndTime() { return endTime; }

//     public void setId(Long id) { this.id = id; }
//     public void setProviderId(Long providerId) { this.providerId = providerId; }
//     public void setDate(LocalDate date) { this.date = date; }
//     public void setStartTime(LocalTime startTime) { this.startTime = startTime; }
//     public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
// }
package com.quickserve.app.calendar.entity;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "calendar_availability")
public class CalendarAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long providerId;
<<<<<<< HEAD
    private Long serviceListingId;

    private OffsetDateTime startTime;
    private OffsetDateTime endTime;

    // ===== GETTERS =====
    public Long getId() {
        return id;
=======
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private boolean booked = false;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
>>>>>>> 4cb25f9 (Add Booking, Calendar, and Notification modules)
    }

    public Long getProviderId() {
        return providerId;
    }

<<<<<<< HEAD
    public Long getServiceListingId() {
        return serviceListingId;
    }

    public OffsetDateTime getStartTime() {
        return startTime;
    }

    public OffsetDateTime getEndTime() {
        return endTime;
    }

    // ===== SETTERS =====
    public void setId(Long id) {
        this.id = id;
    }

=======
>>>>>>> 4cb25f9 (Add Booking, Calendar, and Notification modules)
    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }

<<<<<<< HEAD
    public void setServiceListingId(Long serviceListingId) {
        this.serviceListingId = serviceListingId;
    }

    public void setStartTime(OffsetDateTime startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(OffsetDateTime endTime) {
        this.endTime = endTime;
    }
=======
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public boolean isBooked() {
        return booked;
    }

    public void setBooked(boolean booked) {
        this.booked = booked;
    }
>>>>>>> 4cb25f9 (Add Booking, Calendar, and Notification modules)
}
