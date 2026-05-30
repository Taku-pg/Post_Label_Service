package org.example.backend.DTO;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class DeliveryHistoryDTO {
    private LocalDate start;
    private LocalDate end;
    private String status;
}
