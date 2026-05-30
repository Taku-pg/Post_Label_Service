package org.example.backend.Entity;

import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.DTO.ItemConstructDTO;
import org.example.backend.DTO.NewDeliveryDTO;
import org.example.backend.DTO.ReceiverDTO;
import org.example.backend.DTO.SenderDTO;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InternationalDelivery extends Delivery {
    public enum  Purpose {
        GIFT,
        SALES;

        public static Purpose fromString(String purpose) {
            for (Purpose purposeEnum : Purpose.values()) {
                if (purposeEnum.toString().equalsIgnoreCase(purpose)) {
                    return purposeEnum;
                }
            }
            throw new IllegalArgumentException(String.format("Purpose %s is not a valid Purpose", purpose));
        }
    }

    private Purpose purpose;

    public InternationalDelivery(String trackingId,
                                 String deliveryOption,
                                 String returnMethod,
                                 SenderDTO senderDTO,
                                 ReceiverDTO receiverDTO,
                                 List<ItemConstructDTO> itemConstructDTOS,
                                 String purpose) {
        if(purpose==null || purpose.isEmpty()){

        }
        super(trackingId, deliveryOption, returnMethod, senderDTO, receiverDTO, itemConstructDTOS);
        this.purpose = Purpose.fromString(purpose);
    }
}
