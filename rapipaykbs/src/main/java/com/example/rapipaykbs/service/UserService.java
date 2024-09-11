package com.example.rapipaykbs.service;

import com.example.rapipaykbs.model.User;
import com.example.rapipaykbs.model.User.Location;
import com.example.rapipaykbs.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findUserById(String id) {
        return userRepository.findById(id);
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // New method to update location and browser info
    public Optional<User> updateUserLocationAndBrowserInfo(String useremail, String ipAddress, Location location,
            User.BrowserInfo browserInfo) {
        return userRepository.findByEmail(useremail).map(user -> {
            user.setLocation(location);
            user.setIpAddress(ipAddress);
            user.setBrowserInfo(browserInfo);
            return userRepository.save(user);
        });
    }
}
