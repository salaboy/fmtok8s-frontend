package com.salaboy.conferences.site.models;

public class ServiceInfo {
    private String name;
    private String version;
    private String source;

    public ServiceInfo() {
    }

    public ServiceInfo(String name, String version, String source) {
        this.name = name;
        this.version = version;
        this.source = source;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    @Override
    public String toString() {
        return "ServiceInfo{" +
                "name='" + name + '\'' +
                ", version='" + version + '\'' +
                ", source='" + source + '\'' +
                '}';
    }
}
