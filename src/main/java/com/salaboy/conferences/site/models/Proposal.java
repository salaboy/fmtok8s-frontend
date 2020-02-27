package com.salaboy.conferences.site.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Proposal {
    public enum ProposalStatus {PENDING, DECIDED}

    private String id;
    private String title;
    private String description;
    private boolean approved = false;
    private ProposalStatus status = ProposalStatus.PENDING;

    public Proposal(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public Proposal(String id, String title, String description, boolean approved, ProposalStatus status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.approved = approved;
        this.status = status;
    }

    public Proposal() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public ProposalStatus getStatus() {
        return status;
    }

    public void setStatus(ProposalStatus status) {
        this.status = status;
    }
}
