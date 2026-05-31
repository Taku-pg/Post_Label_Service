package org.example.backend.Entity;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Address {
    private String street;
    private String city;
    private String zip;
    private String country;

    public Address(String street,
                   String city,
                   String zip,
                   String country) {
        if(street == null || city == null || zip == null ){
            throw new IllegalArgumentException("All fields must be filled");
        }
        if(street.isEmpty() || city.isEmpty() || zip.isEmpty() ){
            throw new IllegalArgumentException("All fields must be filled");
        }
        this.street = street;
        this.city = city;
        this.zip = zip;
        this.country = country;
    }
}
