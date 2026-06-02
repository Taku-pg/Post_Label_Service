package org.example.backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.DTO.DeliveryItemDTO;
import org.example.backend.DTO.ItemConstructDTO;
import org.example.backend.DTO.ReceiverDTO;
import org.example.backend.DTO.SenderDTO;

import java.util.List;
import java.util.stream.Collectors;

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

    @Enumerated(EnumType.STRING)
    private Purpose purpose;

    public InternationalDelivery(String trackingId,
                                 String deliveryOption,
                                 String returnMethod,
                                 SenderDTO senderDTO,
                                 ReceiverDTO receiverDTO,
                                 List<ItemConstructDTO> contents,
                                 String purpose) {
        if(purpose==null || purpose.isEmpty()){
            throw new IllegalArgumentException(String.format("Purpose %s is not a valid Purpose", purpose));
        }
        if(returnMethod==null || returnMethod.isEmpty()){
            throw new IllegalArgumentException(String.format("ReturnMethod %s is not a valid ReturnMethod", returnMethod));
        }
        if(contents==null || contents.isEmpty()){
            throw new IllegalArgumentException(String.format("Contents %s is not a valid Contents", contents));
        }
        super(trackingId, deliveryOption, senderDTO, receiverDTO);
        this.purpose = Purpose.fromString(purpose);
        super.setReturnMethod(ReturnMethod.fromString(returnMethod));

        super.setItems( contents.stream()
                .map(c->{
                            Type type = c.getType();
                            DeliveryItemDTO itemDTO = c.getDeliveryItemDTO();
                            return new Item(
                                    itemDTO.getProductName(),
                                    itemDTO.getAmount(),
                                    itemDTO.getPrice(),
                                    itemDTO.getWeight(),
                                    itemDTO.getCountryOfOrigin(),
                                    type,
                                    this);
                        }
                ).collect(Collectors.toList()));
    }

    public boolean isTaxFree(){
        if(this.purpose.equals(Purpose.SALES)){
            return false;
        }

        for(Item item:super.getItems()){
            if(!item.getType().isTaxFree()){
                return false;
            }
        }

        return true;
    }
}
