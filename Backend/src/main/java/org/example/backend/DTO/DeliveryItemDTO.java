package org.example.backend.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class DeliveryItemDTO {
    @NotNull
    private String productName;
    @NotNull
    @Min(1)
    private int amount;
    @NotNull
    private float price;
    @NotNull
    private float weight;
    private String countryOfOrigin;
    @Valid
    @NotNull
    private TypeDTO type;
}



