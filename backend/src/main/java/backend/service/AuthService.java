package backend.service;

import backend.model.User;
import backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // REGISTER
    public String register(String username, String password) {

        if (
                userRepository
                        .findByUsername(username)
                        .isPresent()
        ) {

            throw new RuntimeException(
                    "Username already exists"
            );
        }

        User user = new User();

        user.setUsername(username);

        user.setPassword(password);

        userRepository.save(user);

        return "User registered successfully";
    }

    // LOGIN
    public boolean login(
            String username,
            String password
    ) {

        return userRepository
                .findByUsername(username)
                .map(user ->
                        user.getPassword()
                                .equals(password)
                )
                .orElse(false);
    }

    // DELETE USER
    public void deleteUser(String username) {

        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

        userRepository.delete(user);
    }
}