package org.example.backend.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class DeliveryDTO {
    @NotNull
    @NotEmpty
    private String deliveryType;
    @Valid
    @NotNull
    private DeliveryInformationDTO deliveryInfo;
    @Valid
    @NotNull
    private List<DeliveryItemDTO> contents;
}
