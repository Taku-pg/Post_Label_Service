package org.example.backend.Controller;

import jakarta.validation.Valid;
import org.example.backend.DTO.DeliveryDTO;
import org.example.backend.DTO.SearchedDeliveryStatusDTO;
import org.example.backend.Service.DeliveryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController("/api/v1/delivery")
public class DeliveryController {

    private final DeliveryService deliveryService;

    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @GetMapping("/{trackingId}")
    public ResponseEntity<?> getDelivery(@PathVariable String trackingId) {
        if(trackingId == null || trackingId.isEmpty())
            return ResponseEntity.notFound().build();

        SearchedDeliveryStatusDTO searchedDelivery
                = deliveryService.searchDelivery(trackingId);

        if(searchedDelivery == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(searchedDelivery);
    }

    @PostMapping("/new")
    public ResponseEntity<?> registerNewDelivery(@RequestBody @Valid DeliveryDTO deliveryDTO) {
        return ResponseEntity.ok().build();
    }
}
