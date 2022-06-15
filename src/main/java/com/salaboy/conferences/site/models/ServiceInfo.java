package com.salaboy.conferences.site.models;

public record ServiceInfo(String name,
                          String version,
                          String source,
                          String podId,
                          String podNamepsace,
                          String podNodeName) {
}