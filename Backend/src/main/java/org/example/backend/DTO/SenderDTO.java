package org.example.backend.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class SenderDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String company;
    private AddressDTO address;
}
