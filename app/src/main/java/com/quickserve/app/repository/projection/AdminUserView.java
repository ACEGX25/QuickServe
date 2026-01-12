package com.quickserve.app.repository.projection;

import com.quickserve.app.model.Role;

import java.time.OffsetDateTime;

public interface AdminUserView {
    Long getId();
    String getName();
    String getEmail();
    String getPhone();
    Role getRole();
    boolean isActive();
    OffsetDateTime getCreatedAt();
    long getBookings();
}

