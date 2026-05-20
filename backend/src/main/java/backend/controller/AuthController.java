package backend.controller;

import backend.model.User;
import backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        try {

            String response =
                    authService.register(
                            user.getUsername(),
                            user.getPassword()
                    );

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        boolean isValid =
                authService.login(
                        user.getUsername(),
                        user.getPassword()
                );

        if (isValid) {

            return ResponseEntity.ok("Login successful");

        } else {

            return ResponseEntity
                    .badRequest()
                    .body("Invalid credentials");
        }
    }

    // DELETE USER ON LOGOUT
    @DeleteMapping("/delete/{username}")
    public ResponseEntity<?> deleteUser(
            @PathVariable String username
    ) {

        try {

            authService.deleteUser(username);

            return ResponseEntity
                    .ok("User deleted successfully");

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}