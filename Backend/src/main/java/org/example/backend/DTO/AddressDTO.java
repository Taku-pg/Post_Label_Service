package org.example.backend.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.example.backend.Validator.Zip;

@Getter
@Setter
@NoArgsConstructor
public class AddressDTO {
    @NotNull
    private String street;
    @NotNull
    private String city;
    @NotNull
    @Zip
    private String zip;
    private String country;
}
