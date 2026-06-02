package org.example.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostOfficeStaff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "staff")
    private PostOfficeEmployee employee;

    public PostOfficeStaff(PostOfficeEmployee employee) {
        if(employee == null) {
           throw new IllegalArgumentException("Employee cannot be null");
        }
        this.employee = employee;
    }
}
