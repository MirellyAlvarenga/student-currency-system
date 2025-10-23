package student.currency.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import student.currency.models.AuthRequest;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getLogin(), request.getPassword()));

            if (authentication.isAuthenticated()) {
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                String role = userDetails.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .findFirst()
                        .orElse("USER");

                Map<String, Object> response = new HashMap<>();
                response.put("message", "Login successful");
                response.put("login", userDetails.getUsername());
                response.put("role", role.replace("ROLE_", ""));
                return response;
            } else {
                throw new BadCredentialsException("Invalid login or password");
            }
        } catch (BadCredentialsException ex) {
            throw new RuntimeException("Invalid login or password");
        }
    }
}