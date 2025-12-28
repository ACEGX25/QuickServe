package com.quickserve.app.calendar.controller;

import com.quickserve.app.calendar.entity.CalendarAvailability;
import com.quickserve.app.calendar.service.CalendarAvailabilityService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/calendar")
public class CalendarAvailabilityController {

    private final CalendarAvailabilityService service;

    public CalendarAvailabilityController(CalendarAvailabilityService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public CalendarAvailability addSlot(@RequestBody CalendarAvailability slot) {
        return service.saveSlot(slot);
    }

    @GetMapping("/available")
    public List<CalendarAvailability> getAvailableSlots(
            @RequestParam Long providerId,
            @RequestParam LocalDate date) {
        return service.getAvailableSlots(providerId, date);
    }
}
