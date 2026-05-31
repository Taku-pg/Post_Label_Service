package org.example.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productName;
    private int amount;
    private float price;
    private float weight;
    private String countryOfOrigin;
    @ManyToOne
    private Type type;
    @ManyToOne
    private Delivery delivery;

    public Item(String productName,
                int amount,
                float price,
                float weight,
                String countryOfOrigin,
                Type type,
                Delivery delivery) {
        if(productName == null || productName.isEmpty()){
            throw new IllegalArgumentException("productName cannot be null or empty");
        }
        if(amount <= 0){
            throw new IllegalArgumentException("amount cannot be negative");
        }
        if(price <= 0){
            throw new IllegalArgumentException("price cannot be negative");
        }
        if(weight <= 0){
            throw new IllegalArgumentException("weight cannot be negative");
        }
        if(type == null){
            throw new IllegalArgumentException("type cannot be null");
        }
        if(delivery == null){
            throw new IllegalArgumentException("delivery cannot be null");
        }
        this.productName = productName;
        this.amount = amount;
        this.price = price;
        this.weight = weight;
        this.countryOfOrigin = countryOfOrigin;
        this.type = type;
        this.delivery = delivery;
    }
}
