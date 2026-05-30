package org.example.backend.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class ReceiverDTO {
    private String firstName;
    private String lastName;
    private String company;
    private AddressDTO address;
}
