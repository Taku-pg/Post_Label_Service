package org.example.backend.Service;

import jakarta.transaction.Transactional;
import org.example.backend.DTO.*;
import org.example.backend.Entity.Delivery;
import org.example.backend.Entity.DomesticDelivery;
import org.example.backend.Entity.InternationalDelivery;
import org.example.backend.Entity.Type;
import org.example.backend.Repository.DeliveryRepository;
import org.example.backend.Repository.TypeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;
    private final TypeRepository typeRepository;
    private final DeliveryMapper deliveryMapper;

    public DeliveryService(DeliveryRepository deliveryRepository,
                           TypeRepository typeRepository,
                           DeliveryMapper deliveryMapper) {
        this.deliveryRepository = deliveryRepository;
        this.typeRepository = typeRepository;
        this.deliveryMapper = deliveryMapper;
    }

    @Transactional
    public String registerDelivery(DeliveryDTO deliveryDTO) {
        String trackingId = generateUniqueTrackingId();

        List<ItemConstructDTO> contents =
                deliveryDTO.getContents()
                        .stream()
                        .map(c -> {
                            Type type = typeRepository
                                    .findTypeById(c.getType().getId())
                                    .orElseThrow(NoSuchElementException::new);
                            return new ItemConstructDTO(c, type);
                        }).toList();

        Delivery delivery = createDelivery(trackingId, deliveryDTO, contents);

        deliveryRepository.save(delivery);

        return trackingId;
    }

    private String generateUniqueTrackingId() {
        Set<String> trackingIds = deliveryRepository.findAllTrackingIds();
        String trackingId;
        do{
            String timeStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
            String random = UUID.randomUUID().toString().replace("-", "").substring(0, 5);
            trackingId = timeStr + "_" + random;
        }while (trackingIds.contains(trackingId));

        return trackingId;
    }

    private Delivery createDelivery(String trackingId,
                                                 DeliveryDTO deliveryDTO,
                                                 List<ItemConstructDTO> contents) {

        DeliveryInformationDTO deliveryInfoDTO = deliveryDTO.getDeliveryInfo();
        SenderDTO newSender = deliveryInfoDTO.getSender();
        ReceiverDTO newReceiver = deliveryInfoDTO.getReceiver();

        if(deliveryDTO.getDeliveryType().equals("international")){
            return new InternationalDelivery(trackingId,
                    deliveryInfoDTO.getDeliveryOption(),
                    deliveryInfoDTO.getReturnMethod(),
                    newSender,
                    newReceiver,
                    contents,
                    deliveryInfoDTO.getDeliveryPurpose());
        }

        return new DomesticDelivery(trackingId,
                deliveryInfoDTO.getDeliveryOption(),
                newSender,
                newReceiver,
                deliveryInfoDTO.getItemType());

    }

    public SearchedDeliveryStatusDTO searchDelivery(String trackingId) {
        Delivery delivery = deliveryRepository.findDeliveryByTrackingId(trackingId).orElse(null);
        if (delivery == null) return null;

        return deliveryMapper.toDeliveryStatusDTO(delivery);
    }
}
