package org.example.backend.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DeliveryInformationDTO {
    private SenderDTO sender;
    private ReceiverDTO receiver;
    private String itemType;
    private String deliveryOption;
    private String deliveryPurpose;
    private String returnMethod;
}
