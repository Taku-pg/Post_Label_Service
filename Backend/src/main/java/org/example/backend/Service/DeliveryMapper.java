package org.example.backend.Service;

import org.example.backend.DTO.*;
import org.example.backend.Entity.Delivery;
import org.example.backend.Entity.DomesticDelivery;
import org.example.backend.Entity.InternationalDelivery;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryMapper {

    private final ModelMapper modelMapper;

    DeliveryMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public SearchedDeliveryStatusDTO toDeliveryStatusDTO(Delivery delivery) {
        DeliveryDTO deliveryDTO = toDeliveryDTO(delivery);
        List<DeliveryHistoryDTO> historyDTOs
                = delivery.getDeliveryStatus()
                .stream()
                .map(source ->
                        new DeliveryHistoryDTO(
                                source.getStartDate(),
                                source.getEndDate(),
                                source.getStatus().name()))
                .toList();


        return new SearchedDeliveryStatusDTO(
                delivery.getTrackingId(),
                delivery.getRegisteredDate(),
                deliveryDTO,
                historyDTOs);
    }

    public DeliveryDTO toDeliveryDTO(Delivery delivery) {
        String deliveryType = delivery instanceof InternationalDelivery ? "international" : "domestic";

        SenderDTO senderDTO = modelMapper.map(delivery.getSender(), SenderDTO.class);
        ReceiverDTO receiverDTO = modelMapper.map(delivery.getReceiver(), ReceiverDTO.class);
        DeliveryInformationDTO deliveryInformationDTO;

        if (delivery instanceof DomesticDelivery) {
            deliveryInformationDTO
                    = fromDomestic(senderDTO,receiverDTO,(DomesticDelivery) delivery);
        }else{
            deliveryInformationDTO
                    = fromInternational(senderDTO,receiverDTO,(InternationalDelivery) delivery);
        }

        List<DeliveryItemDTO> itemDTOs
                = delivery.getItems()
                .stream()
                .map( source -> modelMapper.map(source, DeliveryItemDTO.class))
                .toList();

        return new DeliveryDTO(deliveryType, deliveryInformationDTO, itemDTOs);
    }

    private DeliveryInformationDTO fromDomestic(SenderDTO sender,
                                                ReceiverDTO receiver,
                                                DomesticDelivery delivery) {
        return new DeliveryInformationDTO(
                        sender,
                        receiver,
                        delivery.getContentType(),
                        delivery.getDeliveryOption().name(),
                        null,
                        delivery.getReturnMethod().name());
    }

    private DeliveryInformationDTO fromInternational(SenderDTO sender,
                                                ReceiverDTO receiver,
                                                InternationalDelivery delivery) {
        return new DeliveryInformationDTO(
                sender,
                receiver,
                null,
                delivery.getDeliveryOption().name(),
                delivery.getPurpose().name(),
                delivery.getReturnMethod().name());
    }
}

