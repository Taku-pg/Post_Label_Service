package org.example.backend.Entity;

import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.DTO.ItemConstructDTO;
import org.example.backend.DTO.ReceiverDTO;
import org.example.backend.DTO.SenderDTO;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DomesticDelivery extends Delivery {
    private String contentType;

    public DomesticDelivery(String trackingId,
                            String deliveryOption,
                            SenderDTO senderDTO,
                            ReceiverDTO receiverDTO,
                            List<ItemConstructDTO> contents,
                            String contentType) {
        if(contentType==null || contentType.isEmpty()){
            throw  new IllegalArgumentException("Content Type cannot be empty");
        }
        super(trackingId, deliveryOption, senderDTO, receiverDTO, contents);
        this.contentType = contentType;
        super.setReturnMethod(ReturnMethod.SAME);
    }
}
