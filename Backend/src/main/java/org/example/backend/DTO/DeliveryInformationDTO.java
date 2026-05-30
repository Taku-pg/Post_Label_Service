package org.example.backend.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DeliveryInformationDTO {

    @Valid
    @NotNull
    private SenderDTO sender;
    @Valid
    @NotNull
    private ReceiverDTO receiver;
    private String itemType;
    @NotNull
    private String deliveryOption;
    private String deliveryPurpose;
    private String returnMethod;
}
