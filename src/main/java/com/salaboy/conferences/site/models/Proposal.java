package com.salaboy.conferences.site.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Proposal (Long id, String title, String description, boolean approved, ProposalStatus status){
    public enum ProposalStatus {PENDING, DECIDED, ERROR}

    public Proposal(
            Long id, String title, String description, boolean approved, ProposalStatus status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.approved = approved;
        if (status != null) {
            this.status = status;
        } else {
            this.status = ProposalStatus.PENDING;
        }
    }
}
