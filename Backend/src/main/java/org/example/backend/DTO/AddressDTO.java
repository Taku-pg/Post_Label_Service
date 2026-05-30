package org.example.backend.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class AddressDTO {
    @NotNull
    private String street;
    @NotNull
    private String city;
    @NotNull
    private String zip;
    private String country;
}
