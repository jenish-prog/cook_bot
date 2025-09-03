package cooking.idea.idea_backend.service;

import cooking.idea.idea_backend.dto.request.SignInRequest;
import cooking.idea.idea_backend.dto.request.SignUpRequest;
import cooking.idea.idea_backend.dto.response.JwtAuthResponse;
import cooking.idea.idea_backend.model.User;
import cooking.idea.idea_backend.repository.UserRepository;
import cooking.idea.idea_backend.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, 
                      PasswordEncoder passwordEncoder, 
                      JwtUtil jwtUtil, 
                      AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    @Transactional
    public JwtAuthResponse signup(SignUpRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }

        // Create new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        // Generate JWT token
        String token = jwtUtil.generateToken(user);
        return new JwtAuthResponse.JwtAuthResponseBuilder()
                .accessToken(token)
                .expiresIn(jwtUtil.getExpirationTime())
                .build();
    }

    public JwtAuthResponse signin(SignInRequest request) {
        // Authenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Get user details
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        User user = userOptional.orElseThrow(() -> 
            new UsernameNotFoundException("User not found with email: " + request.getEmail())
        );

        // Generate JWT token
        String token = jwtUtil.generateToken(user);
        return new JwtAuthResponse.JwtAuthResponseBuilder()
                .accessToken(token)
                .expiresIn(jwtUtil.getExpirationTime())
                .build();
    }
}