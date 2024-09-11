package com.example.rapipaykbs.controller;

import com.example.rapipaykbs.model.ContactUs;
import com.example.rapipaykbs.service.ContactUsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contact")
public class ContactUsController {

    private final ContactUsService contactUsService;

    public ContactUsController(ContactUsService contactUsService) {
        this.contactUsService = contactUsService;
    }

    // Endpoint to save a contact message
    @PostMapping
    public ResponseEntity<ContactUs> createMessage(@RequestBody ContactUs contactUs) {
        try {
            ContactUs savedMessage = contactUsService.saveMessage(contactUs);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedMessage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Endpoint to get all contact messages
    @GetMapping("/messages")
    public ResponseEntity<List<ContactUs>> getAllMessages() {
        try {
            List<ContactUs> messages = contactUsService.getAllMessages();
            if (messages.isEmpty()) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.ok(messages);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Endpoint to get a specific contact message by ID
    @GetMapping("/messages/{id}")
    public ResponseEntity<ContactUs> getMessageById(@PathVariable String id) {
        try {
            Optional<ContactUs> message = contactUsService.getMessageById(id);
            return message.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
