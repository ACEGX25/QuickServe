package com.quickserve.app.notification.repository;

import com.quickserve.app.notification.entity.notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface notificationrepository extends JpaRepository<notification, Long> {

    List<notification> findByUserIdOrderByCreatedAtDesc(Long userId);
}
