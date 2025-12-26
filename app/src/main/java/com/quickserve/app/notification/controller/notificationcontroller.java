package com.quickserve.app.notification.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.quickserve.app.notification.entity.notification;
import com.quickserve.app.notification.service.notificationservice;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class notificationcontroller {

    @Autowired
    private notificationservice notificationService;

    /**
     * Get logged-in user's notifications
     */
    @GetMapping
    public List<notification> getMyNotifications(Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        return notificationService.getUserNotifications(userId);
    }

    /**
     * Mark notification as read
     */
    @PutMapping("/{id}/read")
    public String markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return "Notification marked as read";
    }
}
