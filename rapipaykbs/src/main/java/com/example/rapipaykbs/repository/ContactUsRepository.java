package com.example.rapipaykbs.repository;

import com.example.rapipaykbs.model.ContactUs;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactUsRepository extends MongoRepository<ContactUs, String> {
    // Additional query methods can be defined here if needed
}
