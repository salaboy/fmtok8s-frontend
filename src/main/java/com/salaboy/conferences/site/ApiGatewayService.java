package com.salaboy.conferences.site;

import com.salaboy.conferences.site.metrics.MetricsGatewayGlobalFilter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@Slf4j
public class ApiGatewayService {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayService.class, args);
    }

    @Autowired
    private MetricsGatewayGlobalFilter globalFilter;

    @Bean
    public MetricsGatewayGlobalFilter getGlobalFilter() {
        return globalFilter;
    }
}

