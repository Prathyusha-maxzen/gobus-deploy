// package com.sasitravels.sasi_travels_bus.dto;

// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.Pattern;

// public class PhoneOtpRequest {

//     @NotBlank(message = "Phone number is required")
//     @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
//     private String phone;

//     public String getPhone() {
//         return phone;
//     }

//     public void setPhone(String phone) { this.phone = phone; }
// }


















package com.sasitravels.sasi_travels_bus.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class PhoneOtpRequest {

    @NotBlank(message = "Phone number cannot be blank")
    @Pattern(regexp = "^\\+[1-9]\\d{1,14}$", message = "Phone number must be in E.164 format (e.g., +919876543210)")
    private String phone;

    private String otp; // This might also be in a different DTO for verification

    // Getters and Setters
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}
