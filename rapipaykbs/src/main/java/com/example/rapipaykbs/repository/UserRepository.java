package com.example.rapipaykbs.repository;

import com.example.rapipaykbs.model.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    @SuppressWarnings("null")
    Optional<User> findById(String id);

    Optional<User> findByEmail(String email);
}
