package org.example.backend.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.example.backend.Validator.CustomEmail;
import org.example.backend.Validator.Phone;

@Getter
@Setter
@NoArgsConstructor
public class SenderDTO {
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @NotNull
    @CustomEmail
    private String email;
    @NotNull
    @Phone
    private String phone;
    private String company;
    @Valid
    @NotNull
    private AddressDTO address;
}
