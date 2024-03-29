//package com.salaboy.conferences.site.tracing;
//
//import com.salaboy.conferences.site.TextMapAdapter;
//import io.opentracing.Tracer;
//import io.opentracing.contrib.spring.tracer.configuration.TracerAutoConfiguration;
//import io.opentracing.propagation.Format;
//import org.springframework.boot.autoconfigure.AutoConfigureAfter;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
//import org.springframework.cloud.gateway.filter.GatewayFilter;
//import org.springframework.cloud.gateway.filter.GlobalFilter;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Profile;
//import org.springframework.http.server.reactive.ServerHttpRequest;
//
//@Profile("tracing")
//@Configuration
//@ConditionalOnWebApplication
//@ConditionalOnBean(Tracer.class)
//@AutoConfigureAfter(TracerAutoConfiguration.class)
//@ConditionalOnClass(GatewayFilter.class)
//@ConditionalOnProperty(name = "opentracing.spring.cloud.gateway.enabled", havingValue = "true", matchIfMissing = true)
//public class GatewayAutoConfiguration {
//
//    @Bean
//    public GlobalFilter traceIdTransfer(Tracer tracer) {
//        return (exchange, chain) -> {
//            ServerHttpRequest request = exchange.getRequest();
//            ServerHttpRequest.Builder requestBuilder = request.mutate();
//
//            tracer.inject(tracer.activeSpan().context(), Format.Builtin.HTTP_HEADERS,
//                    new TextMapAdapter(request, requestBuilder));
//
//            return chain.filter(exchange.mutate().request(requestBuilder.build()).build());
//        };
//    }
//}
