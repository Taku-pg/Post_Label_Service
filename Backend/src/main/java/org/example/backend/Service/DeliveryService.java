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
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

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
        String timeStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
        String random = UUID.randomUUID().toString().replace("-", "").substring(0, 10);
        String trackingId = timeStr + "_" + random;

        List<ItemConstructDTO> contents =
                deliveryDTO.getContent()
                        .stream()
                        .map(c -> {
                            Type type = typeRepository
                                    .findTypeByTypeName(c.getType().getType())
                                    .orElseThrow(NoSuchElementException::new);
                            return new ItemConstructDTO(c, type);
                        }).toList();

        Delivery delivery;
        if (deliveryDTO.getDeliveryType().equals("international")) {
            delivery = createInternationalDelivery(trackingId, deliveryDTO, contents);
        } else {
            delivery = createDomesticDelivery(trackingId, deliveryDTO, contents);
        }

        deliveryRepository.save(delivery);

        return trackingId;
    }

    private Delivery createInternationalDelivery(String trackingId,
                                                 DeliveryDTO deliveryDTO,
                                                 List<ItemConstructDTO> contents) {
        DeliveryInformationDTO deliveryInfoDTO = deliveryDTO.getDeliveryInfo();
        SenderDTO newSender = deliveryInfoDTO.getSender();
        ReceiverDTO newReceiver = deliveryInfoDTO.getReceiver();
        return new InternationalDelivery(trackingId,
                deliveryInfoDTO.getDeliveryOption(),
                deliveryInfoDTO.getReturnMethod(),
                newSender,
                newReceiver,
                contents,
                deliveryInfoDTO.getDeliveryPurpose());
    }

    private Delivery createDomesticDelivery(String trackingId,
                                            DeliveryDTO deliveryDTO,
                                            List<ItemConstructDTO> contents) {
        DeliveryInformationDTO deliveryInfoDTO = deliveryDTO.getDeliveryInfo();
        SenderDTO newSender = deliveryInfoDTO.getSender();
        ReceiverDTO newReceiver = deliveryInfoDTO.getReceiver();
        return new DomesticDelivery(trackingId,
                deliveryInfoDTO.getDeliveryOption(),
                deliveryInfoDTO.getReturnMethod(),
                newSender,
                newReceiver,
                contents,
                deliveryInfoDTO.getItemType());
    }

    public SearchedDeliveryStatusDTO searchDelivery(String trackingId) {
        Delivery delivery = deliveryRepository.findDeliveryByTrackingId(trackingId).orElse(null);
        if (delivery == null) return null;

        return deliveryMapper.toDeliveryStatusDTO(delivery);
    }
}
