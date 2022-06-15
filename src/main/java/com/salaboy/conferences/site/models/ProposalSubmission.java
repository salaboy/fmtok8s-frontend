package com.salaboy.conferences.site.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ProposalSubmission(String id, String title, String description, String author, String email) {


}
