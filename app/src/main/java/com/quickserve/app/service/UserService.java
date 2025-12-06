package com.quickserve.app.service;

import com.quickserve.app.dto.LoginRequest;
import com.quickserve.app.dto.RegisterRequest;
import com.quickserve.app.model.User;

public interface UserService {
    User register(RegisterRequest request);
    String login(LoginRequest request);
}
