package com.salaboy.conferences.site.models;

public class AgendaItem {

    private String id;
    private String author;
    private String title;
    private String day;
    private String time;

    public AgendaItem() {
    }

    public AgendaItem(String id, String author, String title, String day, String time) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.day = day;
        this.time = time;

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

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "AgendaItem{" +
                "id='" + id + '\'' +
                ", author='" + author + '\'' +
                ", title='" + title + '\'' +
                ", day='" + day + '\'' +
                ", time='" + time + '\'' +
                '}';
    }
}
