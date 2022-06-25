package com.salaboy.conferences.site.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import org.springframework.web.reactive.socket.server.WebSocketService;
import org.springframework.web.reactive.socket.server.support.HandshakeWebSocketService;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;
import org.springframework.web.reactive.socket.server.upgrade.ReactorNettyRequestUpgradeStrategy;
import reactor.core.publisher.EmitterProcessor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class ReactiveWebSocketHandler implements WebSocketHandler  {
    private static final Logger log = LoggerFactory.getLogger(ReactiveWebSocketHandler.class);

    private List<String> sessions = new CopyOnWriteArrayList<>();
    private Map<String, EmitterProcessor<String>> processors = new ConcurrentHashMap<>();



    public ReactiveWebSocketHandler() {
    }

    public EmitterProcessor<String> getEmitterProcessor(String id) {
        return processors.get(id);
    }

    public Set<String> getProcessors() {
        return processors.keySet();
    }

    public List<String> getSessionsId() {
        return sessions;
    }

    @Override
    public Mono<Void> handle(WebSocketSession webSocketSession) {

        String sessionId = webSocketSession.getHandshakeInfo().getUri().getQuery().split("=")[1];
        if (sessions.add(sessionId)) {
            log.info("Session Id added: " + sessionId);
            processors.put(sessionId, EmitterProcessor.create());
            Flux<String> cloudEventsFlux = processors.get(sessionId).map(x -> x);

            // Send the session id back to the client
            String msg = String.format("{\"session\":\"%s\"}", sessionId);
            // Register the outbound flux as the source of outbound messages //.filter(cloudEvent -> cloudEvent.contains(sessionId))
            final Flux<WebSocketMessage> outFlux = Flux.concat(Flux.just(msg), cloudEventsFlux)
                    .map(cloudEvent -> {
                        log.info("Sending message to client [{}]: {}", sessionId, cloudEvent);

                        return webSocketSession.textMessage(cloudEvent);
                    });


            return webSocketSession.send(outFlux).and(webSocketSession.receive().doFinally(sig -> {
                log.info("Terminating WebSocket Session (client side) sig: [{}], [{}]", sig.name(), sessionId);
                webSocketSession.close();
                sessions.remove(sessionId);  // remove the stored session id
                processors.remove(sessionId);
                log.info("remove session and processor for id: " + sessionId);
            }).map(WebSocketMessage::getPayloadAsText).log());

        }
        return Mono.empty();

    }
}
