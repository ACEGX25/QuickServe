package com.quickserve.app.config;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class StartupGuard {

    private final Environment env;

    public StartupGuard(Environment env) {
        this.env = env;
    }

    @PostConstruct
    public void blockAccidentalDev() {
        boolean isDev = env.acceptsProfiles("dev");
        boolean allowed = env.getProperty(
                "app.allow.schema.update",
                Boolean.class,
                false
        );

        if (isDev && !allowed) {
            throw new RuntimeException(
                    "❌ DEV profile active but schema update not confirmed.\n" +
                            "Set CONFIRM_SCHEMA_UPDATE=true to proceed."
            );
        }
    }

}
