package org.example.backend.Entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class PostOfficeStaff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "staff")
    private PostOfficeEmployee employee;
}
