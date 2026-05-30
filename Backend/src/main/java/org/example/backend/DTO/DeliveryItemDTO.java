package org.example.backend.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class DeliveryItemDTO {
    private String productName;
    private int amount;
    private float price;
    private float weight;
    private String countryOfOrigin;
    private TypeDTO type;
}



