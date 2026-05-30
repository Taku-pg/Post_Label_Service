package org.example.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
public class PostOfficeEmployee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private List<String> skills;

    @OneToOne
    private PostOfficeStaff staff;
    @OneToOne
    private Courier courier;

    @ManyToMany
    private List<Delivery> managedDeliveries;

    //staffとcourierのコンストラクト
}
