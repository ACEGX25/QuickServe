package com.quickserve.app.model;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "service_listings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String title;

    @NotBlank
    private String description;

    @NotNull
    @Positive
    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @NotBlank
    private String location;

    @Enumerated(EnumType.STRING)
    private Category category;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_id", nullable = false, updatable = false)
    private User provider;

    @JsonManagedReference
    @OneToMany(mappedBy = "listing", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ListingImage> images;

    private boolean active = true;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    @Column(name = "avg_rating", precision = 2, scale = 1)
    private BigDecimal avgRating = BigDecimal.valueOf(0.0);

    @Column(name = "rating_count")
    private Integer ratingCount = 0;

    @Column(nullable = false)
    private boolean approved = false;

}
