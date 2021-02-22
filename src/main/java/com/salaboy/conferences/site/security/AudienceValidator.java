package com.salaboy.conferences.site.security;


import org.slf4j.Logger;

import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.util.Assert;

import java.util.List;

import static org.slf4j.LoggerFactory.*;

public class AudienceValidator implements OAuth2TokenValidator<Jwt> {
    private final Logger log = getLogger(AudienceValidator.class);
    private OAuth2Error error = new OAuth2Error("invalid_token", "The required audience is missing", null);

    private final List<String> allowedAudience;

    public AudienceValidator(List<String> allowedAudience) {
        Assert.notEmpty(allowedAudience, "Allowed audience should not be null or empty.");
        this.allowedAudience = allowedAudience;
    }

    public OAuth2TokenValidatorResult validate(Jwt jwt) {
        List<String> audience = jwt.getAudience();
        if (audience.stream().anyMatch(allowedAudience::contains)) {
            return OAuth2TokenValidatorResult.success();
        } else {
            log.warn("Invalid audience: {}", audience);
            return OAuth2TokenValidatorResult.failure(error);
        }
    }
}
