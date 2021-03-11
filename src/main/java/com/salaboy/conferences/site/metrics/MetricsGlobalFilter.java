package com.salaboy.conferences.site.metrics;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.Collections;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import static org.springframework.cloud.gateway.support.ServerWebExchangeUtils.*;

@Component
public class MetricsGlobalFilter implements GlobalFilter, Ordered {
    private Log log = LogFactory.getLog(getClass());

    private final MeterRegistry meterRegistry;
    private Map<String, Counter> routesCounters = new ConcurrentHashMap<>();

    public MetricsGlobalFilter(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;


    }

    public MeterRegistry getMeterRegistry() {
        return meterRegistry;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        Set<URI> uris = exchange.getAttributeOrDefault(GATEWAY_ORIGINAL_REQUEST_URL_ATTR, Collections.emptySet());
        String originalUri = (uris.isEmpty()) ? "Unknown" : uris.iterator().next().toString();
        Route route = exchange.getAttribute(GATEWAY_ROUTE_ATTR);
        URI routeUri = exchange.getAttribute(GATEWAY_REQUEST_URL_ATTR);
        log.info("Incoming request " + originalUri + " is routed to id: " + route.getId()
                + ", uri:" + routeUri);
        if(routesCounters.get(routeUri.toString()) == null){
            System.out.println("Creating counter:  " + routeUri.toString() );
            routesCounters.put(routeUri.toString(), Counter.builder("routes")
                    .tag("type", routeUri.toString())
                    .description("The number of request to the service")
                    .register(meterRegistry));
        }else{
            System.out.println("Incrementing counter:  " + routeUri.toString() );
            routesCounters.get(routeUri.toString()).increment();
        }
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return 0;
    }
}
