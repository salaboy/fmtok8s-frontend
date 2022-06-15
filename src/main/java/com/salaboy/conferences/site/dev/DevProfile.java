package com.salaboy.conferences.site.dev;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.reactive.function.client.WebClient;

@Profile("dev")
//@EnableAutoConfiguration(exclude = {SecurityAutoConfiguration.class, TracerAutoConfiguration.class,
//        DefaultAsyncAutoConfiguration.class, JaegerAutoConfiguration.class, ReactorTracingAutoConfiguration.class,
//        ReactiveManagementWebSecurityAutoConfiguration.class})
@Configuration
public class DevProfile {

//    @Autowired
//    private MeterRegistry meterRegistry;

    @Bean
    @LoadBalanced
    public WebClient getWebClient() {
//        MetricsWebClientFilterFunction webClientMetrics = new MetricsWebClientFilterFunction(meterRegistry,
//                new DefaultWebClientExchangeTagsProvider(),
//                "webClientMetrics", null);

//        return WebClient.builder().filter(webClientMetrics).build();
        return WebClient.builder().build();
    }

//    @Bean
//    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
//        return http.csrf().disable()
//                .authorizeExchange()
//                .anyExchange().permitAll()
//                .and()
//                .build();
//    }
}
