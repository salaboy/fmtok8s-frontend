package com.salaboy.conferences.site.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@JsonIgnoreProperties(ignoreUnknown = true)
public record ClientSession(String sessionId) {

}
