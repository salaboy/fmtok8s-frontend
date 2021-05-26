package com.salaboy.conferences.site.dev;

import io.micrometer.core.instrument.MeterRegistry;
import io.opentracing.contrib.java.spring.jaeger.starter.JaegerAutoConfiguration;
import io.opentracing.contrib.spring.cloud.async.DefaultAsyncAutoConfiguration;
import io.opentracing.contrib.spring.cloud.reactor.ReactorTracingAutoConfiguration;
import io.opentracing.contrib.spring.tracer.configuration.TracerAutoConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.autoconfigure.security.reactive.ReactiveManagementWebSecurityAutoConfiguration;
import org.springframework.boot.actuate.metrics.web.reactive.client.DefaultWebClientExchangeTagsProvider;
import org.springframework.boot.actuate.metrics.web.reactive.client.MetricsWebClientFilterFunction;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.reactive.function.client.WebClient;

@Profile("dev")
@EnableAutoConfiguration(exclude = {SecurityAutoConfiguration.class, TracerAutoConfiguration.class,
        DefaultAsyncAutoConfiguration.class, JaegerAutoConfiguration.class, ReactorTracingAutoConfiguration.class,
        ReactiveManagementWebSecurityAutoConfiguration.class})
@Configuration
public class DevProfile {

    @Autowired
    private MeterRegistry meterRegistry;

    @Bean
    @LoadBalanced
    public WebClient getWebClient() {
        MetricsWebClientFilterFunction webClientMetrics = new MetricsWebClientFilterFunction(meterRegistry,
                new DefaultWebClientExchangeTagsProvider(),
                "webClientMetrics", null);

        return WebClient.builder().filter(webClientMetrics).build();
    }

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        return http.csrf().disable()
                .authorizeExchange()
                .anyExchange().permitAll()
                .and()
                .build();
    }
}
