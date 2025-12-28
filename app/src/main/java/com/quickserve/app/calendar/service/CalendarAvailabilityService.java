package com.quickserve.app.calendar.service;

import com.quickserve.app.calendar.entity.CalendarAvailability;
import com.quickserve.app.calendar.repository.CalendarAvailabilityRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CalendarAvailabilityService {

    private final CalendarAvailabilityRepository repository;

    public CalendarAvailabilityService(CalendarAvailabilityRepository repository) {
        this.repository = repository;
    }

    public CalendarAvailability saveSlot(CalendarAvailability slot) {
        return repository.save(slot);
    }

    public List<CalendarAvailability> getAvailableSlots(Long providerId, LocalDate date) {
        return repository.findByProviderIdAndDateAndBookedFalse(providerId, date);
    }
}
