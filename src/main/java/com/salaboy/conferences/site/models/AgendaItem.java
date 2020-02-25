package com.salaboy.conferences.site.models;

import java.util.Date;

public class AgendaItem {

    private String id;
    private String author;
    private String title;
    private Date talkTime;

    public AgendaItem() {
    }

    public AgendaItem(String id, String author, String title, Date talkTime) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.talkTime = talkTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getTalkTime() {
        return talkTime;
    }

    public void setTalkTime(Date talkTime) {
        this.talkTime = talkTime;
    }
}
