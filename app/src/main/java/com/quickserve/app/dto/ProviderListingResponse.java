package com.quickserve.app.dto;

import com.quickserve.app.model.Category;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class ProviderListingResponse {

    private Long id;
    private String title;
    private BigDecimal price;
    private String location;
    private Category category;

    // getters & setters
}
