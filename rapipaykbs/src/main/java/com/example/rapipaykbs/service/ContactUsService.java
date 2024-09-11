package com.example.rapipaykbs.service;

import com.example.rapipaykbs.model.ContactUs;
import com.example.rapipaykbs.repository.ContactUsRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContactUsService {

    private final ContactUsRepository contactUsRepository;

    public ContactUsService(ContactUsRepository contactUsRepository) {
        this.contactUsRepository = contactUsRepository;
    }

    // Save a new contact message
    public ContactUs saveMessage(ContactUs contactUs) {
        contactUs.setCreatedAt(LocalDateTime.now()); // Set the current date and time
        return contactUsRepository.save(contactUs);
    }

    // Get all contact messages
    public List<ContactUs> getAllMessages() {
        return contactUsRepository.findAll();
    }

    // Get a specific contact message by ID
    public Optional<ContactUs> getMessageById(String id) {
        return contactUsRepository.findById(id);
    }
}
