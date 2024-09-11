package com.example.rapipaykbs.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rapipaykbs.model.Login;
import com.example.rapipaykbs.service.LoginService;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> loginPassword(@PathVariable String email) {
        try {
            Optional<Login> login = loginService.getUserByEmail(email);
            return login.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(200).body(new Login("User not Found")));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
