package com.example.rapipaykbs.controller;

import com.example.rapipaykbs.model.User;
import com.example.rapipaykbs.model.User.Location;
import com.example.rapipaykbs.service.UserService;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User createdUser = userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User with similar data already exists.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user data provided.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") String id) {
        try {
            Optional<User> user = userService.findUserById(id);
            return user.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).body(null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<User>> getAllUser() {
        try {
            List<User> allUser = userService.getAllUser();
            if (allUser.isEmpty()) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.ok(allUser);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        try {
            Optional<User> user = userService.getUserByEmail(email);
            return user.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).body(null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PatchMapping("/{email}/updateLocationAndBrowserInfo")
    public ResponseEntity<?> updateUserLocationAndBrowserInfo(
            @PathVariable("email") String useremail,
            @RequestBody UpdateUserRequest updateUserRequest) {
        try {
            Location location = new Location(
                    updateUserRequest.getLocation().getLatitude(),
                    updateUserRequest.getLocation().getLongitude());

            User.BrowserInfo browserInfo = new User.BrowserInfo(
                    updateUserRequest.getBrowserInfo().getUserAgent(),
                    updateUserRequest.getBrowserInfo().getLanguage(),
                    updateUserRequest.getBrowserInfo().getPlatform());

            Optional<User> updatedUser = userService.updateUserLocationAndBrowserInfo(
                    useremail, updateUserRequest.getIpAddress(), location, browserInfo);

            return updatedUser.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).body(null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while updating the user");
        }
    }

    // DTO for location and browser info update
    static class UpdateUserRequest {
        private Location location;
        private String ipAddress;
        private BrowserInfo browserInfo;

        public Location getLocation() {
            return location;
        }

        public void setLocation(Location location) {
            this.location = location;
        }

        public String getIpAddress() {
            return ipAddress;
        }

        public void setIpAddress(String ipAddress) {
            this.ipAddress = ipAddress;
        }

        public BrowserInfo getBrowserInfo() {
            return browserInfo;
        }

        public void setBrowserInfo(BrowserInfo browserInfo) {
            this.browserInfo = browserInfo;
        }

        // Inner class for browser info
        static class BrowserInfo {
            private String userAgent;
            private String language;
            private String platform;

            public String getUserAgent() {
                return userAgent;
            }

            public void setUserAgent(String userAgent) {
                this.userAgent = userAgent;
            }

            public String getLanguage() {
                return language;
            }

            public void setLanguage(String language) {
                this.language = language;
            }

            public String getPlatform() {
                return platform;
            }

            public void setPlatform(String platform) {
                this.platform = platform;
            }
        }

        // Inner class for location
        static class Location {
            private String latitude;
            private String longitude;

            public String getLatitude() {
                return latitude;
            }

            public void setLatitude(String latitude) {
                this.latitude = latitude;
            }

            public String getLongitude() {
                return longitude;
            }

            public void setLongitude(String longitude) {
                this.longitude = longitude;
            }
        }
    }
}
