package org.example.backend.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class ReceiverDTO {
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    private String company;
    @Valid
    @NotNull
    private AddressDTO address;
}
