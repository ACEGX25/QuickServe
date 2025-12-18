package com.quickserve.app.dto;

import com.quickserve.app.model.Category;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class UpdateListingRequest {

    private String title;
    private String description;

    @Positive
    private BigDecimal price;

    private String location;
    private Category category;

    // getters & setters
}
