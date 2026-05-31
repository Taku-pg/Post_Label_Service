package org.example.backend.DTO;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@AllArgsConstructor
public class SearchedDeliveryStatusDTO {
    private String trackingId;
    private LocalDate registeredDate;
    private DeliveryDTO delivery;
    private List<DeliveryHistoryDTO> deliveryHistory;
}
