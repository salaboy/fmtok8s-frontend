package com.salaboy.conferences.site.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.salaboy.conferences.site.websocket.ReactiveWebSocketHandler;
import com.salaboy.conferences.site.models.ClientSession;
import io.cloudevents.CloudEvent;
import io.cloudevents.core.format.EventFormat;
import io.cloudevents.core.provider.EventFormatProvider;
import io.cloudevents.jackson.JsonFormat;
import io.cloudevents.spring.http.CloudEventHttpUtils;
import io.cloudevents.spring.webflux.CloudEventHttpMessageReader;
import io.cloudevents.spring.webflux.CloudEventHttpMessageWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.codec.CodecCustomizer;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.CodecConfigurer;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/")
public class FrontendController {
    private static final Logger log = LoggerFactory.getLogger(FrontendController.class);

    private final ReactiveWebSocketHandler handler;

    private ObjectMapper objectMapper = new ObjectMapper();

    public FrontendController(ReactiveWebSocketHandler handler) {
        this.handler = handler;
    }


    @Configuration
    public static class CloudEventHandlerConfiguration implements CodecCustomizer {

        @Override
        public void customize(CodecConfigurer configurer) {
            configurer.customCodecs().register(new CloudEventHttpMessageReader());
            configurer.customCodecs().register(new CloudEventHttpMessageWriter());
        }

    }

    private void logCloudEvent(CloudEvent cloudEvent) {
        EventFormat format = EventFormatProvider
                .getInstance()
                .resolveFormat(JsonFormat.CONTENT_TYPE);

        log.info("Cloud Event: " + new String(format.serialize(cloudEvent)));

    }

    @PostMapping("events")
    public ResponseEntity<Void> pushDataViaWebSocket(@RequestHeader HttpHeaders headers, @RequestBody ClientSession clientSession) throws JsonProcessingException {

        String clientSessionString = objectMapper.writeValueAsString(clientSession);
        CloudEvent cloudEvent = CloudEventHttpUtils.fromHttp(headers).withData(clientSessionString.getBytes()).build();
        logCloudEvent(cloudEvent);

        log.info("Client Session from Cloud Event Data: " + clientSession.sessionId());
        if (!clientSession.sessionId().contains("mock")) {
            byte[] serialized = EventFormatProvider
                    .getInstance()
                    .resolveFormat(JsonFormat.CONTENT_TYPE)
                    .serialize(cloudEvent);
            String serializedCloudEvent = new String(serialized);
            log.info("Cloud Event Serialized: " + serializedCloudEvent);
            handler.getEmitterProcessor(clientSession.sessionId()).onNext(serializedCloudEvent);
        } else {
            log.info("session id contained mock, not sending to websocket: " + clientSession.sessionId());
        }
        return ResponseEntity.ok().build();
    }


    @PostMapping("session")
    public String createSession() {
        return UUID.randomUUID().toString();
    }

    @PostMapping("reservation")
    public String createReservation() {
        return UUID.randomUUID().toString();
    }

    @GetMapping("sessions")
    public List<String> getSessions() {
        return handler.getSessionsId();
    }

    @GetMapping("processors")
    public Set<String> getProcessors() {
        return handler.getProcessors();
    }
}
