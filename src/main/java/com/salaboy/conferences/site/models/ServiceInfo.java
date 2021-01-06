package com.salaboy.conferences.site.models;

public class ServiceInfo {
    private String name;
    private String version;
    private String source;
    private String podId;
    private String podNamepsace;
    private String podNodeName;

    public ServiceInfo() {
    }

    public ServiceInfo(String name, String version, String source) {
        this.name = name;
        this.version = version;
        this.source = source;

    }

    public ServiceInfo(String name, String version, String source, String podId, String podNamepsace, String podNodeName) {
        this.name = name;
        this.version = version;
        this.source = source;
        this.podId = podId;
        this.podNamepsace = podNamepsace;
        this.podNodeName = podNodeName;
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

    public String getPodId() {
        return podId;
    }

    public void setPodId(String podId) {
        this.podId = podId;
    }

    public String getPodNamepsace() {
        return podNamepsace;
    }

    public void setPodNamepsace(String podNamepsace) {
        this.podNamepsace = podNamepsace;
    }

    public String getPodNodeName() {
        return podNodeName;
    }

    public void setPodNodeName(String podNodeName) {
        this.podNodeName = podNodeName;
    }

    @Override
    public String toString() {
        return "ServiceInfo{" +
                "name='" + name + '\'' +
                ", version='" + version + '\'' +
                ", source='" + source + '\'' +
                ", podId='" + podId + '\'' +
                ", podNamepsace='" + podNamepsace + '\'' +
                ", podNodeName='" + podNodeName + '\'' +
                '}';
    }
}
