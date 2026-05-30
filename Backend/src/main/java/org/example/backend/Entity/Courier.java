package org.example.backend.Entity;

import jakarta.persistence.*;

@Entity
public class Courier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean driverLicence;

    @OneToOne(mappedBy = "courier")
    private PostOfficeEmployee postOfficeEmployee;
}
