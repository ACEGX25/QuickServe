package com.quickserve.app.dto;

import com.quickserve.app.repository.ServiceListingRepository;
import com.quickserve.app.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Data
@AllArgsConstructor
public class BookingDetailResponse {

    private Long id;

    // Service info
    private String serviceTitle;

    // Provider info
    private Long providerId;
    private String providerName;

    // Booking info
    private String status;

    private OffsetDateTime startTime;
    private OffsetDateTime endTime;

    private BigDecimal price;
    private Integer durationHours;

    // Review info
    private boolean reviewed;
}
