// dto/ServiceListingResponse.java
package com.quickserve.app.dto;

import com.quickserve.app.model.Category;
import lombok.Data;

import java.math.BigDecimal;

@Data
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
}
