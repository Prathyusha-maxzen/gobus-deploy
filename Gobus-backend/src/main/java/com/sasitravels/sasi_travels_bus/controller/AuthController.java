package com.sasitravels.sasi_travels_bus.controller;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sasitravels.sasi_travels_bus.dto.RegisterEmailRequest;
import com.sasitravels.sasi_travels_bus.dto.PhoneOtpRequest;
import com.sasitravels.sasi_travels_bus.dto.VerifyOtpRequest;

import com.sasitravels.sasi_travels_bus.service.AuthService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
  
    


    
    // ✅ CONSTRUCTOR MUST INITIALIZE BOTH
    public AuthController(AuthService authService) {
          System.out.println("🔥 AuthController LOADED 🔥");
        this.authService = authService;
       
    }

    @PostMapping("/register/email")
    public ResponseEntity<?> registerWithEmailUser(
            @Valid @RequestBody RegisterEmailRequest request) {
                  System.out.println("🔥 REGISTER API HIT 🔥");

        // return ResponseEntity.ok(authService.registerWithEmail(request));
        return ResponseEntity.ok(authService.registerWithEmailUser(request));

    }

    @PostMapping("/register/phone/send-otp")
    public ResponseEntity<?> sendOtpForPhoneLogin(@Valid @RequestBody PhoneOtpRequest request) {
        return ResponseEntity.ok(authService.sendOtpForPhoneLogin(request.getPhone()));
    }

    @PostMapping("/register/phone/verify-otp")
    public ResponseEntity<?> verifyOtpAndLogin(@Valid @RequestBody VerifyOtpRequest request) {
        return ResponseEntity.ok(authService.verifyOtpAndLogin(request.getPhone(), request.getOtp()));
    }


}
