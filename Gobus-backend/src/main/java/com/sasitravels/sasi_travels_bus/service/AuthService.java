package com.sasitravels.sasi_travels_bus.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import java.security.SecureRandom;
import java.text.DecimalFormat;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;

import com.sasitravels.sasi_travels_bus.dto.RegisterEmailRequest;
import com.sasitravels.sasi_travels_bus.enums.Role;
import com.sasitravels.sasi_travels_bus.entity.User;
import com.sasitravels.sasi_travels_bus.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, OtpService otpService) {
        this.userRepository = userRepository;
         this.passwordEncoder = passwordEncoder;
         this.otpService = otpService;
    }

   
    public String registerWithEmailUser(RegisterEmailRequest request) {


        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        if (userRepository.findByPhone(request.getPhone()).isPresent()) {
            throw new RuntimeException("Phone already registered");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
         // 🔐 BCrypt encryption
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmailVerified(true);
        user.setPhoneVerified(false);
        user.setRole(Role.USER);

        userRepository.save(user);

        return "User registered successfully";
    }

    public String sendOtpForPhoneLogin(String phone) {
        String otp = generateOtp();

        User user = userRepository.findByPhone(phone).orElseGet(() -> {
            User newUser = new User();
            newUser.setPhone(phone);
            newUser.setRole(Role.USER);
            return newUser;
        });
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10)); // OTP valid for 10 minutes

        userRepository.save(user);
        System.out.println("✅ User saved to MongoDB with Phone: " + phone);

        otpService.sendOtp(phone, otp);

        return "OTP sent successfully to " + phone;
    }

    public String verifyOtpAndLogin(String phone, String otp) {
        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("User not found. Please request an OTP first."));

        if (user.getOtp() == null || !user.getOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP.");
        }

        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP has expired.");
        }

        user.setPhoneVerified(true);
        user.setOtp(null);
        user.setOtpExpiry(null);
        userRepository.save(user);

        // Generate JWT Token
        return Jwts.builder()
                .setSubject(user.getEmail() != null ? user.getEmail() : phone)
                .claim("mobile", phone)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS512)
                .compact();
    }

    private String generateOtp() {
        return new DecimalFormat("000000").format(new SecureRandom().nextInt(999999));
    }

}
