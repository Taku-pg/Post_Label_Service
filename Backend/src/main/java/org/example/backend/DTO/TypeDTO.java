package org.example.backend.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class TypeDTO {
    @NotNull
    private String type;
    private boolean taxFree;
}
