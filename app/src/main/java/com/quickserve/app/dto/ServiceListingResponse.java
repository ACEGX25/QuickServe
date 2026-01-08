// dto/ServiceListingResponse.java
package com.quickserve.app.dto;

import com.quickserve.app.model.Category;
import com.quickserve.app.model.ServiceListing;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceListingResponse {

    private Long id;
    private String title;
    private String description;
    private String location;
    private Category category;
    private BigDecimal price;

    // Provider-safe fields
    private Long providerId;
    private String providerName;

    private BigDecimal averageRating;
    private int ratingCount;

}
