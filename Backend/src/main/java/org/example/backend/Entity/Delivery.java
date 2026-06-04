package org.example.backend.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.backend.DTO.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class Delivery {

    public enum ReturnMethod {
        SAME, CHEAP, DISCARD;
        public static ReturnMethod fromString(String method) {
            for (ReturnMethod m : ReturnMethod.values()) {
                if (m.name().equalsIgnoreCase(method)) {
                    return m;
                }
            }
            throw new IllegalArgumentException("Invalid return method: " + method);
        }
    }

    @Getter
    public enum DeliveryOption {
        STANDARD(0),
        EXPRESS(150);

        private final int additionalFee;

        DeliveryOption(int additionalFee) {
            this.additionalFee = additionalFee;
        }

        public static DeliveryOption fromString(String option) {
            for(DeliveryOption optionEnum : DeliveryOption.values()) {
                if(optionEnum.name().equalsIgnoreCase(option)) {
                    return optionEnum;
                }
            }
            throw new IllegalArgumentException("Invalid delivery option: " + option);
        }
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String trackingId;
    private LocalDate registeredDate;
    @Enumerated(EnumType.STRING)
    private DeliveryOption deliveryOption;
    @Enumerated(EnumType.STRING)
    private ReturnMethod returnMethod;

    @OneToOne(cascade = CascadeType.ALL)
    private User sender;
    @OneToOne(cascade = CascadeType.ALL)
    private User receiver;

    @OneToMany(mappedBy = "delivery", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Item> items;

    @OneToMany(mappedBy = "delivery",  cascade = CascadeType.ALL)
    private List<DeliveryStatus> deliveryStatus = new ArrayList<>();

    @ManyToMany
    private List<PostOfficeEmployee> postOfficeEmployees = new ArrayList<>();


    protected Delivery(String trackingId,
                       String deliveryOption,
                       SenderDTO senderDTO,
                       ReceiverDTO receiverDTO
                       ) {
        if (trackingId == null || trackingId.isEmpty()) {
            throw new IllegalArgumentException("trackingId cannot be null or empty");
        }
        if (deliveryOption == null || deliveryOption.isEmpty()) {
            throw new IllegalArgumentException("deliveryOption cannot be null");
        }
        if (senderDTO == null) {
            throw new IllegalArgumentException("sender cannot be null");
        }
        if (receiverDTO == null) {
            throw new IllegalArgumentException("receiver cannot be null");
        }

        this.trackingId = trackingId;
        this.registeredDate = LocalDate.now();
        this.deliveryOption = DeliveryOption.fromString(deliveryOption);


        this.sender = User.createSender(
                senderDTO.getFirstName(),
                senderDTO.getLastName(),
                senderDTO.getEmail(),
                senderDTO.getPhone(),
                senderDTO.getAddress(),
                senderDTO.getCompany()
        );

        this.receiver = User.createReceiver(
                receiverDTO.getFirstName(),
                receiverDTO.getLastName(),
                receiverDTO.getAddress(),
                receiverDTO.getCompany()
        );

        deliveryStatus.add(new DeliveryStatus(this));
    }

    public float getTotalPrice() {
        return items.stream().map( i-> i.getPrice()*i.getAmount()).reduce(0.0f, Float::sum);
    }

    public float getTotalWeight() {
        return items.stream().map(i -> i.getWeight() * i.getAmount()).reduce(0.0f, Float::sum);
    }

}