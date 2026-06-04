package org.example.backend.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.backend.DTO.AddressDTO;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user_")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    @Embedded
    private Address address;
    private String company;

    @OneToOne()
    Delivery sentDelivery;
    @OneToOne()
    Delivery receiveDelivery;

    private User(String firstName,
                 String lastName,
                 String email,
                 String phone,
                 Address address,
                 String company) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.company = company;
    }

    public static User createSender(String firstName,
                                    String lastName,
                                    String email,
                                    String phoneNumber,
                                    AddressDTO addressDTO,
                                    String company,
                                    Delivery sentDelivery) {
        if(firstName == null || firstName.isEmpty()){
            throw new IllegalArgumentException("First name cannot be empty");
        }
        if(lastName == null || lastName.isEmpty()){
            throw new IllegalArgumentException("Last name cannot be empty");
        }
        if(email == null || email.isEmpty()){
            throw new IllegalArgumentException("Email cannot be empty");
        }
        if(phoneNumber == null || phoneNumber.isEmpty()){
            throw new IllegalArgumentException("Phone number cannot be empty");
        }
        if(addressDTO == null){
            throw new IllegalArgumentException("Address cannot be empty");
        }
        if(sentDelivery == null){
            throw new IllegalArgumentException("Delivery cannot be empty");
        }
        Address address = new Address(
                addressDTO.getStreet(),
                addressDTO.getCity(),
                addressDTO.getZip(),
                addressDTO.getCountry()
        );
        User sender = new User(firstName, lastName, email, phoneNumber, address, company);
        sender.setSentDelivery(sentDelivery);
        return sender;
    }

    public static User createReceiver(String firstName,
                                      String lastName,
                                      AddressDTO addressDTO,
                                      String company,
                                      Delivery receiveDelivery) {
        if(firstName == null || firstName.isEmpty()){
            throw new IllegalArgumentException("First name cannot be empty");
        }
        if(lastName == null || lastName.isEmpty()){
            throw new IllegalArgumentException("Last name cannot be empty");
        }
        if(addressDTO == null){
            throw new IllegalArgumentException("Address cannot be empty");
        }
        if(receiveDelivery == null){
            throw new IllegalArgumentException("Delivery cannot be empty");
        }

        Address address = new Address(
                addressDTO.getStreet(),
                addressDTO.getCity(),
                addressDTO.getZip(),
                addressDTO.getCountry()
        );

        User receiver = new User(firstName, lastName, null, null, address, company);
        receiver.setReceiveDelivery(receiveDelivery);
        return receiver;
    }

}
