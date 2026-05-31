package org.example.backend.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Collections;
import java.util.List;

@Getter
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

    public List<DeliveryItemDTO> getContents() {
        return Collections.unmodifiableList(contents);
    }
}
