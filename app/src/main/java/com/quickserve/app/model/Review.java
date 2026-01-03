package com.quickserve.app.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(name = "booking_id", nullable = false, unique = true)
    private Booking booking;

    @ManyToOne(optional = false)
    @JoinColumn(name= "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name="provider_id", nullable = false)
    private User provider;

    @Column(nullable = false)
    private int stars;

    @Column(length = 500)
    private String comment;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
