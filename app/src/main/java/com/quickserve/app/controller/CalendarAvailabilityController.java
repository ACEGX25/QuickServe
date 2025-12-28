package com.quickserve.app.controller;

import com.quickserve.app.model.CalendarAvailability;
import com.quickserve.app.model.User;
import com.quickserve.app.repository.CalendarAvailabilityRepository;
import com.quickserve.app.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendar")
public class CalendarAvailabilityController {

    private final CalendarAvailabilityRepository calendarRepository;
    private final UserRepository userRepository;

    public CalendarAvailabilityController(
            CalendarAvailabilityRepository calendarRepository,
            UserRepository userRepository
    ) {
        this.calendarRepository = calendarRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<CalendarAvailability> addAvailability(
            @Valid @RequestBody CalendarAvailability request,
            Authentication authentication
    ) {
        String email = authentication.getName();

        User provider = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new IllegalArgumentException("End time must be after start time");
        }

        request.setProviderId(provider.getId());
        return ResponseEntity.ok(calendarRepository.save(request));
    }

    @GetMapping("/my")
    public ResponseEntity<List<CalendarAvailability>> getMyAvailability(
            Authentication authentication
    ) {
        String email = authentication.getName();

        User provider = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        return ResponseEntity.ok(
                calendarRepository.findByProviderId(provider.getId())
        );
    }
}
