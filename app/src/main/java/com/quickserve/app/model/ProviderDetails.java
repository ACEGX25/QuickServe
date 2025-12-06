package com.quickserve.app.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="provider_details")
@Data
public class ProviderDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    private String serviceCategory;
    private Double price;

    private String availability;
}
