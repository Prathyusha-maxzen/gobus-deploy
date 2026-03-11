package com.sasitravels.sasi_travels_bus.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("dev") // This service is active only for the 'dev' profile
public class MockOtpService implements OtpService {

    private static final Logger logger = LoggerFactory.getLogger(MockOtpService.class);

    @Override
    public void sendOtp(String phone, String otp) {
        // In a real application, you would integrate with an SMS gateway like Twilio.
        // For this example, we'll just log the OTP to the console for easy testing.
        logger.info("---- OTP for {} is: {} ----", phone, otp);
    }
}