package com.salaboy.conferences.site.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProposalSubmission {

    private String id;
    private String title;
    private String description;
    private String author;
    private String email;


    public ProposalSubmission(String id, String title, String description, String author, String email) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author = author;
        this.email = email;
    }

    public ProposalSubmission(String title, String description, String author, String email) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.email = email;
    }

    public ProposalSubmission() {
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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
