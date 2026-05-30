package org.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.example.backend.Entity.Type;

@Getter
@AllArgsConstructor
public class ItemConstructDTO {
    private DeliveryItemDTO deliveryItemDTO;
    private Type type;
}
