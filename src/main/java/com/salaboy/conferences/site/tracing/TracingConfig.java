//package com.salaboy.conferences.site.tracing;
//
//import io.micrometer.core.instrument.MeterRegistry;
//import io.opentracing.Tracer;
//import io.opentracing.contrib.spring.web.client.TracingExchangeFilterFunction;
//import io.opentracing.contrib.spring.web.client.WebClientSpanDecorator;
//import io.opentracing.contrib.spring.web.webfilter.TracingWebFilter;
//import io.opentracing.contrib.spring.web.webfilter.WebFluxSpanDecorator;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.actuate.metrics.web.reactive.client.DefaultWebClientExchangeTagsProvider;
//import org.springframework.boot.actuate.metrics.web.reactive.client.MetricsWebClientFilterFunction;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Profile;
//import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
//import org.springframework.web.reactive.function.client.WebClient;
//
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.Collections;
//import java.util.List;
//import java.util.regex.Pattern;
//
//@Profile("tracing")
//@Configuration
//public class TracingConfig {
//
//    @Autowired
//    private MeterRegistry meterRegistry;
//
//    @Bean
//    public WebClient getWebClient(Tracer tracer) {
//        MetricsWebClientFilterFunction webClientMetrics = new MetricsWebClientFilterFunction(meterRegistry,
//                new DefaultWebClientExchangeTagsProvider(),
//                "webClientMetrics", null);
//        return WebClient.builder()
//                .filters(
//                        (List<ExchangeFilterFunction> x) -> new ArrayList<ExchangeFilterFunction>() {{
//                            add(new TracingExchangeFilterFunction(tracer, Collections.singletonList(new WebClientSpanDecorator.StandardTags())));
//                            add(webClientMetrics);
//                        }})
//                .build();
//
//    }
//
//
//    @Bean
//    public TracingWebFilter tracingWebFilter(Tracer tracer) {
//        return new TracingWebFilter(
//                tracer,
//                Integer.MIN_VALUE,               // Order
//                Pattern.compile(""),             // Skip pattern
//                Collections.emptyList(),         // URL patterns, empty list means all
//                Arrays.asList(new WebFluxSpanDecorator.StandardTags(), new WebFluxSpanDecorator.WebFluxTags())
//        );
//    }
//
//}
