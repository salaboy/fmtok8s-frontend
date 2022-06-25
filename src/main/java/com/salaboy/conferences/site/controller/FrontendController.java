package com.salaboy.conferences.site.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.salaboy.conferences.site.models.Proposal;
import com.salaboy.conferences.site.models.ServiceInfo;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.codec.CodecCustomizer;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.CodecConfigurer;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@RestController
@RequestMapping("/api/")
public class FrontendController {
    private static final Logger log = LoggerFactory.getLogger(FrontendController.class);

    private final WebClient.Builder webClient;

    private final ReactiveWebSocketHandler handler;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Value("${FRONTEND_C4P_SERVICE:http://fmtok8s-c4p}")
    private String C4P_SERVICE;

    public FrontendController(ReactiveWebSocketHandler handler, WebClient.Builder webClient) {
        this.handler = handler;
        this.webClient = webClient;
    }

    @GetMapping("agendaNotAvailable")
    public ServiceInfo agendaGetNotAvailable() {
        log.info(">> agendaGetNotAvailable fallback kicking in.");
        return new ServiceInfo("Agenda Service", "N/A", "https://github.com/salaboy/fmtok8s-agenda-service","N/A", "N/A", "N/A" );
    }

    @PostMapping("agendaNotAvailable")
    public ServiceInfo agendaPostNotAvailable() {
        log.info(">> agendaPostNotAvailable fallback kicking in.");
        return new ServiceInfo("Agenda Service", "N/A", "https://github.com/salaboy/fmtok8s-agenda-service","N/A", "N/A", "N/A" );
    }

    @GetMapping("c4pNotAvailable")
    public ServiceInfo c4pGetNotAvailable() {
        log.info(">> c4pGetNotAvailable fallback kicking in.");
        return new ServiceInfo("C4P Service",  "N/A", "https://github.com/salaboy/fmtok8s-c4p-service", "N/A", "N/A" , "N/A");
    }

    @PostMapping("c4pNotAvailable")
    public ServiceInfo c4pPostNotAvailable() {
        log.info(">> c4pPostNotAvailable fallback kicking in.");
        return new ServiceInfo("C4P Service",  "N/A", "https://github.com/salaboy/fmtok8s-c4p-service", "N/A", "N/A" , "N/A");
    }

    @PostMapping("emailNotAvailable")
    public ServiceInfo emailPostNotAvailable() {
        log.info(">> emailPostNotAvailable fallback kicking in.");
        return new ServiceInfo("Email Service", "N/A", "https://github.com/salaboy/fmtok8s-email-service", "N/A", "N/A" , "N/A");
    }

    @GetMapping("emailNotAvailable")
    public ServiceInfo emailGetNotAvailable() {
        log.info(">> emailGetNotAvailable fallback kicking in.");
        return new ServiceInfo("Email Service", "N/A", "https://github.com/salaboy/fmtok8s-email-service", "N/A", "N/A" , "N/A");
    }

    @PostMapping("/test")
    public void test() {

        List<Proposal> proposals = Arrays.asList(new Proposal(null, "Microservices 101", "Getting Started with microservices.", "Well Known Speaker", "speaker@wellknown.org"),
                new Proposal(null, "AI/ML Trends 2020", "New algorithms and industry trends in applied AI and ML.", "AI/ML Engineer", "ml@unvi.net"),
                new Proposal(null, "The future of Cloud Native Computing", "What's coming in 2030 and beyond.", "Conference Organizer", "info@conf.com"),
                new Proposal(null, "Cloud Events Orchestration", "How to orchestrate Cloud Events in a friendly way.", "Salaboy", "salaboy@mail.com"));


        for (Proposal p : proposals) {
            webClient.build()
                    .post()
                    .uri(C4P_SERVICE)
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(p))
                    .retrieve()
                    .bodyToMono(Proposal.class)
                    .doOnSuccess(result -> {
                        log.info("Proposal Posted Title: {}, description: {}, author: {}, email: {}.", result.title(), result.description(), result.author(), result.email());
                    })
                    .doOnError(result -> {
                        result.fillInStackTrace();
                        log.error("Error Posting Proposal. Cause: {}. Message: {}", result.getCause(), result.getMessage());
                    }).subscribe();


        }
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
