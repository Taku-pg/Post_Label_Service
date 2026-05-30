package org.example.backend.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class AddressDTO {
    private String street;
    private String city;
    private String zip;
    private String country;
}
