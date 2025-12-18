package com.quickserve.app.dto;

import com.quickserve.app.model.Category;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProviderListingResponse {

    private Long id;
    private String title;
    private BigDecimal price;
    private String location;
    private Category category;

    // getters & setters
}
