package com.sasitravels.sasi_travels_bus.dto;

import jakarta.validation.constraints.*;

public class RegisterEmailRequest {

    @Email(message = "Invalid email format")
    @NotBlank
    private String email;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String phone;

    @Size(min = 6)
    @Pattern(
        regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&]).+$",
        message = "Password must contain letter, number & special character"
    )
    private String password;

    @NotBlank
    private String confirmPassword;

    // ✅ getters & setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getConfirmPassword() { return confirmPassword; }
    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
