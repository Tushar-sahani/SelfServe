package com.example.rapipaykbs.repository;

import com.example.rapipaykbs.model.Login;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LoginRepository extends MongoRepository<Login, String> {
    Optional<Login> findByEmail(String email);
}
