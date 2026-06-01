package org.example.backend.Controller;

import lombok.Getter;
import org.example.backend.DTO.TypeDTO;
import org.example.backend.Service.TypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/type")
public class TypeController {

    private TypeService typeService;

    public TypeController(TypeService typeService) {
        this.typeService = typeService;
    }

    @GetMapping()
    public ResponseEntity<?> getAllType(){
        List<TypeDTO> typeDTOS = typeService.getAllTypes();
        return ResponseEntity.ok(typeDTOS);
    }
}
