package com.quickserve.app.dto;

import com.quickserve.app.model.Category;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ListingFilterRequest {

    private Category category;
    private String location;

    // Optional price range filters
    private BigDecimal minPrice;
    private BigDecimal maxPrice;

    // Optional keyword for title search
    private String keyword;

    // For future: rating, date filters, etc.
}