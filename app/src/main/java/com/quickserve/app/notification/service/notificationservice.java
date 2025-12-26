package com.quickserve.app.notification.service;

import com.quickserve.app.notification.entity.notification;
import com.quickserve.app.notification.entity.notification;
import com.quickserve.app.notification.repository.notificationrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class notificationservice {

    @Autowired
    private notificationrepository notificationrepository;

    /**
     * Create notification
     */
    public void createNotification(Long userId, String message) {
        notification notification = new notification();
        notification.setUserId(userId);
        notification.setMessage(message);
        notificationrepository.save(notification);
    }

    /**
     * Booking confirmation notification
     */
    public void sendBookingConfirmation(Long customerId, Long providerId) {

        createNotification(
                customerId,
                "✅ Your booking has been confirmed successfully."
        );

        createNotification(
                providerId,
                "📅 You have received a new booking."
        );
    }

    /**
     * Get user notifications
     */
    public List<notification> getUserNotifications(Long userId) {
        return notificationrepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public void markAsRead(Long notificationId) throws RuntimeException {
        notification notification = notificationrepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setReadStatus(true);
        notificationrepository.save(notification);
    }
}
