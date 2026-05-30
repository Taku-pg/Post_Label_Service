package org.example.backend.Repository;

import org.example.backend.Entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    @Query("""
            select d from Delivery d
                        left join fetch
                                    d.deliveryStatus,
                                    d.items i
                                    left join fetch
                                                i.type
                        where d.trackingId = :trackingId
            """)
    Optional<Delivery> findDeliveryByTrackingId(String trackingId);
}
