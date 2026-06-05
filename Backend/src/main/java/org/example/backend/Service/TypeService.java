package org.example.backend.Service;

import org.example.backend.DTO.TypeDTO;
import org.example.backend.Entity.Type;
import org.example.backend.Repository.TypeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeService {

    private final TypeRepository typeRepository;
    private final ModelMapper modelMapper;

    public TypeService(TypeRepository typeRepository,
                       ModelMapper modelMapper) {
        this.typeRepository = typeRepository;
        this.modelMapper = modelMapper;
    }

    public List<TypeDTO> getAllTypes(){
        List<Type> types = typeRepository.findAll();

        return types.stream()
                .map(t->modelMapper.map(t, TypeDTO.class)).toList();
    }
}
