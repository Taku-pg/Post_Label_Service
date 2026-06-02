package org.example.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    private PostOfficeEmployee(List<String> skills) {
        if (skills == null) {
            skills = new ArrayList<>();
        }
        this.skills = skills;
    }

    public static Courier createCourier(List<String> skills, List<String> driverLicence) {
        PostOfficeEmployee employee = new PostOfficeEmployee(skills);
        Courier courier = new Courier(driverLicence, employee);
        employee.setCourier(courier);
        return courier;
    }

    public static PostOfficeStaff createPostOfficeStaff(List<String> skills) {
        PostOfficeEmployee employee = new PostOfficeEmployee(skills);
        PostOfficeStaff staff = new PostOfficeStaff(employee);
        employee.setStaff(staff);
        return  staff;
    }

    public void toCourier(List<String> driverLicence) {
        if(staff == null || courier != null) {
            throw new IllegalStateException("This employee is already courier");
        }

        Courier courier = new Courier(driverLicence, this);
        setCourier(courier);
        setStaff(null);
    }

    public void toPostOfficeStaff() {
        if(staff != null || courier == null) {
            throw new IllegalStateException("This employee is already office staff");
        }
        PostOfficeStaff staff = new PostOfficeStaff(this);
        setStaff(staff);
        setCourier(null);
    }


}
