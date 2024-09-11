package com.example.rapipaykbs.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rapipaykbs.model.Login;
import com.example.rapipaykbs.repository.LoginRepository;

@Service
public class LoginService {

    @Autowired
    private final LoginRepository loginRepository;

    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    public Optional<Login> getUserByEmail(String email) {

        return loginRepository.findByEmail(email);

    }

}
