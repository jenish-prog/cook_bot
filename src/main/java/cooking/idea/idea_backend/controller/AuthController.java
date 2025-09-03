package cooking.idea.idea_backend.controller;

import cooking.idea.idea_backend.dto.request.SignInRequest;
import cooking.idea.idea_backend.dto.request.SignUpRequest;
import cooking.idea.idea_backend.dto.response.JwtAuthResponse;
import cooking.idea.idea_backend.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication", description = "APIs for user authentication and registration")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    @Operation(summary = "Register a new user")
    public ResponseEntity<JwtAuthResponse> signup(@Valid @RequestBody SignUpRequest signUpRequest) {
        return new ResponseEntity<>(authService.signup(signUpRequest), HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    @Operation(summary = "Authenticate user and get JWT token")
    public ResponseEntity<JwtAuthResponse> signin(@Valid @RequestBody SignInRequest signInRequest) {
        return ResponseEntity.ok(authService.signin(signInRequest));
    }
}