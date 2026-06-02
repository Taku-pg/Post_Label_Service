package org.example.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Courier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private List<String> driverLicence;

    @OneToOne(mappedBy = "courier")
    private PostOfficeEmployee postOfficeEmployee;

    public Courier(List<String> driverLicence,  PostOfficeEmployee postOfficeEmployee) {
        if(driverLicence == null ){
            driverLicence = new ArrayList<>();
        }
        if(postOfficeEmployee == null){
            throw new IllegalArgumentException("PostOfficeEmployee cannot be null");
        }
        this.driverLicence = driverLicence;
        this.postOfficeEmployee = postOfficeEmployee;
    }
}
