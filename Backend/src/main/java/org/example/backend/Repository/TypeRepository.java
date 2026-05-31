package org.example.backend.Repository;

import org.example.backend.Entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TypeRepository extends JpaRepository<Type, Long> {

    Optional<Type> findTypeById(Long id);
}
