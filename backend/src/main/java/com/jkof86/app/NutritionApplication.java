package com.jkof86.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication (scanBasePackages = "com.jkof86")
@EntityScan("com.jkof86.models")
@EnableJpaRepositories("com.jkof86.repositories")
public class NutritionApplication {

    public static void main(String[] args) {
        SpringApplication.run(NutritionApplication.class, args);
    }
}