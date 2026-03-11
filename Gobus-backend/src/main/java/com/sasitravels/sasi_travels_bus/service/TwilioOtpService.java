package com.sasitravels.sasi_travels_bus.service;

import com.sasitravels.sasi_travels_bus.config.TwilioConfig;
import com.twilio.Twilio;
import com.twilio.exception.ApiException;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("prod") // This service is active only for the 'prod' profile
public class TwilioOtpService implements OtpService {

    private static final Logger logger = LoggerFactory.getLogger(TwilioOtpService.class);
    private final TwilioConfig twilioConfig;

    public TwilioOtpService(TwilioConfig twilioConfig) {
        this.twilioConfig = twilioConfig;
        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
        logger.info("Twilio initialized with Account SID: {}", twilioConfig.getAccountSid());
        logger.info("Twilio configured with From Number: {}", twilioConfig.getPhoneNumber());
    }

    @Override
    public void sendOtp(String phone, String otp) {
        try {
            logger.info("Using Twilio FROM number: {}", twilioConfig.getPhoneNumber());

            Message.creator(new PhoneNumber(phone), new PhoneNumber(twilioConfig.getPhoneNumber()), "Your BusGo OTP is: " + otp).create();
            logger.info("OTP SMS sent successfully to {}", phone);
        } catch (ApiException e) {
            // This is a specific Twilio exception that gives more details
            logger.error(
                "Twilio API Error sending OTP to {}: Code={}, Message={}", 
                phone, e.getCode(), e.getMessage()
            );

            // Check for common configuration errors (21606 or 21660: 'From' number not owned by account)
            if (e.getCode() != null && (e.getCode() == 21606 || e.getCode() == 21660)) {
                throw new RuntimeException("Twilio Configuration Error: The 'From' number " + twilioConfig.getPhoneNumber() + " is not valid for your account. Please check your application.properties.", e);
            }
            // The frontend can now receive a more informative error
            throw new RuntimeException("Could not send OTP. " + e.getMessage(), e);
        }
    }
}