package com.quickserve.app.dto;

import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;

public class BookingRequest {

    @NotNull
    private Long serviceListingId;

    @NotNull
    private OffsetDateTime startTime;

    @NotNull
    private OffsetDateTime endTime;

    // ===== GETTERS =====
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
    public void setServiceListingId(Long serviceListingId) {
        this.serviceListingId = serviceListingId;
    }

    public void setStartTime(OffsetDateTime startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(OffsetDateTime endTime) {
        this.endTime = endTime;
    }
}
