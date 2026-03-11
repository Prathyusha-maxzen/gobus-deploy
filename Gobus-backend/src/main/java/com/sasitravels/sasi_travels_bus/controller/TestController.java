package com.sasitravels.sasi_travels_bus.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String home() {
        return "Sasi Travels Bus API is running!";
    }

    @GetMapping("/test")
    public String test() {
        return "Test endpoint is working!";
    }
}
