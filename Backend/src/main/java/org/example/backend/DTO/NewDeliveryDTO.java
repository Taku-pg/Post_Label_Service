package org.example.backend.DTO;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class NewDeliveryDTO{
    private String deliveryType;
    private DeliveryInformationDTO deliveryInfo;
    private List<DeliveryItemDTO> content;
}
