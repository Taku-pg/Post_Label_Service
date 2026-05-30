package org.example.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DeliveryStatus {
    public enum Status {
        UNPAID,
        PENDING,
        DELIVERING,
        DELIVERED
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private Status status;
    private LocalDate startDate;
    private LocalDate endDate;
    @ManyToOne
    private Delivery delivery;

    public DeliveryStatus(Delivery delivery) {
        if(delivery == null){
            throw new IllegalArgumentException("delivery cannot be null");
        }
        this.delivery = delivery;
        this.status = Status.UNPAID;
        this.startDate = LocalDate.now();
    }

    public DeliveryStatus(Delivery delivery, Status status) {
        if(delivery == null){
            throw new IllegalArgumentException("delivery cannot be null");
        }
        if(status == null){
            throw new IllegalArgumentException("status cannot be null");
        }
        this.delivery = delivery;
        this.status = status;
        this.startDate = LocalDate.now();
    }
}


