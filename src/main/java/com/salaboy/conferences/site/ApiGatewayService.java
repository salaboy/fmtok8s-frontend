package com.salaboy.conferences.site;

import com.salaboy.conferences.site.models.AgendaItem;
import com.salaboy.conferences.site.models.Proposal;
import com.salaboy.conferences.site.models.ServiceInfo;
import io.netty.channel.epoll.EpollDatagramChannel;
import io.opentracing.Tracer;
import io.opentracing.contrib.spring.web.client.TracingExchangeFilterFunction;
import io.opentracing.contrib.spring.web.client.WebClientSpanDecorator;
import io.opentracing.contrib.spring.web.webfilter.TracingWebFilter;
import io.opentracing.contrib.spring.web.webfilter.WebFluxSpanDecorator;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.config.HttpClientCustomizer;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.function.TupleUtils;
import reactor.netty.http.client.HttpClient;
import io.netty.resolver.dns.*;
import reactor.util.function.Tuple3;
import reactor.util.function.Tuples;

import java.net.URI;
import java.net.UnknownHostException;
import java.security.Security;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.regex.Pattern;

import static org.springframework.cloud.gateway.support.ServerWebExchangeUtils.*;

@SpringBootApplication
@Slf4j
public class ApiGatewayService {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayService.class, args);
//        java.security.Security.setProperty("networkaddress.cache.ttl", "0");
//        System.out.println(Security.getProperty("networkaddress.cache.ttl"));
//        System.out.println(System.getProperty("networkaddress.cache.ttl"));

    }

    @Bean
    public WebClient getWebClient(Tracer tracer) {
        return WebClient.builder()
                .filters(
                        (List<ExchangeFilterFunction> x) -> new ArrayList<ExchangeFilterFunction>() {{
                            add(new TracingExchangeFilterFunction(tracer, Collections.singletonList(new WebClientSpanDecorator.StandardTags())));
                        }})
                .build();

    }


    @Configuration
    class TracingConfiguration {
        @Bean
        public TracingWebFilter tracingWebFilter(Tracer tracer) {
            return new TracingWebFilter(
                    tracer,
                    Integer.MIN_VALUE,               // Order
                    Pattern.compile(""),             // Skip pattern
                    Collections.emptyList(),         // URL patterns, empty list means all
                    Arrays.asList(new WebFluxSpanDecorator.StandardTags(), new WebFluxSpanDecorator.WebFluxTags())
            );
        }
    }

    @Component
    class RemoveDnsCacheCustomizer implements HttpClientCustomizer {
        @Override
        public HttpClient customize(HttpClient httpClient) {
            DnsNameResolverBuilder dnsResolverBuilder = new DnsNameResolverBuilder()
                    .channelFactory(EpollDatagramChannel::new)
                    .resolveCache(new DefaultDnsCache(0, 0, 0));
            httpClient.tcpConfiguration(tcpClient -> tcpClient.resolver(new DnsAddressResolverGroup(dnsResolverBuilder)));
            return httpClient;
        }
    }

    public static ExchangeFilterFunction logRequest() {
        return ExchangeFilterFunction.ofRequestProcessor(clientRequest -> {
            log.debug("Request: " + clientRequest.method() + " - " + clientRequest.url());
            clientRequest.headers().forEach((name, values) -> values.forEach(value -> log.info(name + "=" + value)));
            return Mono.just(clientRequest);
        });
    }

}

@RestController()
@RequestMapping("/api/")
@Slf4j
class ConferenceSiteUtilController {

    @Value("${version:0.0.0}")
    private String version;

    @Value("${POD_ID:}")
    private String podId;

    @Value("${POD_NODE_NAME:}")
    private String podNodeName;

    @Value("${POD_NAMESPACE:}")
    private String podNamespace;


    @Value("${C4P_SERVICE:http://fmtok8s-c4p}")
    private String C4P_SERVICE;

    @GetMapping("/info")
    public ServiceInfo info() {
        return new ServiceInfo(
                "API Gateway / User Interface",
                "v" + version,
                "https://github.com/salaboy/fmtok8s-api-gateway/releases/tag/v" + version,
                podId,
                podNamespace,
                podNodeName);

    }

    @GetMapping("agendaNotAvailable")
    public ServiceInfo agendaGetNotAvailable() {
        log.info(">> agendaGetNotAvailable fallback kicking in.");
        return new ServiceInfo("Agenda Service", "N/A", "N/A");
    }

    @PostMapping("agendaNotAvailable")
    public ServiceInfo agendaPostNotAvailable() {
        log.info(">> agendaPostNotAvailable fallback kicking in.");
        return new ServiceInfo("Agenda Service", "N/A", "N/A");
    }

    @GetMapping("c4pNotAvailable")
    public ServiceInfo c4pGetNotAvailable() {
        log.info(">> c4pGetNotAvailable fallback kicking in.");
        return new ServiceInfo("C4P Service", "N/A", "N/A");
    }

    @PostMapping("c4pNotAvailable")
    public ServiceInfo c4pPostNotAvailable() {
        log.info(">> c4pPostNotAvailable fallback kicking in.");
        return new ServiceInfo("C4P Service", "N/A", "N/A");
    }

    @PostMapping("emailNotAvailable")
    public ServiceInfo emailPostNotAvailable() {
        log.info(">> emailPostNotAvailable fallback kicking in.");
        return new ServiceInfo("Email Service", "N/A", "N/A");
    }

    @GetMapping("emailNotAvailable")
    public ServiceInfo emailGetNotAvailable() {
        log.info(">> emailGetNotAvailable fallback kicking in.");
        return new ServiceInfo("Email Service", "N/A", "N/A");
    }

    @Autowired
    private WebClient webClient;

    @PostMapping("/test")
    public void test() {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String[] proposals = {
                "{" +
                        "\"title\" : \"Microservices 101\"," +
                        "\"description\" : \"Getting Started with microservices.\"," +
                        "\"author\" : \"Well Known Speaker \"," +
                        "\"email\" : \"speaker@wellknown.org\"" +
                        "}"
                , "{" +
                "\"title\" : \"AI/ML Trends 2020\"," +
                "\"description\" : \"New algorithms and industry trends in applied AI and ML \"," +
                "\"author\" : \"AI/ML Engineer\"," +
                "\"email\" : \"ml@unvi.net\"" +
                "}"
                , "{" +
                "\"title\" : \"The future of Cloud Native Computing\"," +
                "\"description\" : \"What's coming in 2021 and beyond \"," +
                "\"author\" : \"Conference Organizer\"," +
                "\"email\" : \"info@conf.com\"" +
                "}"
                , "{" +
                "\"title\" : \"Cloud Events Orchestration\"," +
                "\"description\" : \"How to orchestrate Cloud Events in a friendly way\"," +
                "\"author\" : \"Salaboy\"," +
                "\"email\" : \"salaboy@mail.com\"" +
                "}"

        };
        for (String content : proposals) {

            WebClient.ResponseSpec responseSpec = webClient
                    .post()
                    .uri(C4P_SERVICE)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(content))
                    .retrieve();
            responseSpec.bodyToMono(String.class)
                    .doOnError(t -> {
                        t.printStackTrace();
                        log.error(">> Error contacting C4p Service (" + C4P_SERVICE + ") for test proposal");
                    })
                    .doOnSuccess(s -> log.info("> Request Sent to C4p Service (" + C4P_SERVICE + ") for test proposal OK: "))
                    .subscribe();


        }
    }
}

@Controller
@Slf4j
class ConferenceSiteController {
    @Value("${version:0.0.0}")
    private String version;

    @Value("${POD_ID:}")
    private String podId;

    @Value("${POD_NODE_NAME:}")
    private String podNodeName;

    @Value("${POD_NAMESPACE:}")
    private String podNamespace;

    @Value("${C4P_SERVICE:http://fmtok8s-c4p}")
    private String C4P_SERVICE;

    @Value("${EMAIL_SERVICE:http://fmtok8s-email}")
    private String EMAIL_SERVICE;

    @Value("${AGENDA_SERVICE:http://fmtok8s-agenda}")
    private String AGENDA_SERVICE;

    @Autowired
    private WebClient webClient;

    public Mono<ServiceInfo> getAgendaServiceInfo() {
        WebClient.ResponseSpec agendaInfoResponseSpec = webClient
                .get()
                .uri(AGENDA_SERVICE + "/info")
                .retrieve();

        return agendaInfoResponseSpec.bodyToMono(ServiceInfo.class);
    }

    public Mono<List<AgendaItem>> getMondayAgendaItems() {
        WebClient.ResponseSpec agendaItemsMondayResponseSpec = webClient
                .get()
                .uri(AGENDA_SERVICE + "/day/Monday")
                .retrieve();

        return agendaItemsMondayResponseSpec.bodyToMono(new ParameterizedTypeReference<List<AgendaItem>>() {
        });
    }

    public Mono<List<AgendaItem>> getTuesdayAgendaItems() {
        WebClient.ResponseSpec agendaItemsMondayResponseSpec = webClient
                .get()
                .uri(AGENDA_SERVICE + "/day/Tuesday")
                .retrieve();

        return agendaItemsMondayResponseSpec.bodyToMono(new ParameterizedTypeReference<List<AgendaItem>>() {
        });
    }

    @GetMapping("/")
    public Mono<String> index(Model model) {
        log.info("STarting INdex processing");


        Mono<ServiceInfo> agendaServiceInfo = getAgendaServiceInfo();
        Mono<ServiceInfo> c4PServiceInfo = getC4PServiceInfo();

        Mono<List<AgendaItem>> mondayAgendaItems = getMondayAgendaItems();
        Mono<List<AgendaItem>> tuesdayAgendaItems = getTuesdayAgendaItems();

        mondayAgendaItems.doOnError(t -> {
            model.addAttribute("agendaItemsMonday", Collections.singletonList(new AgendaItem("1", "Cached Author", "Bring Monday Agenda Item from Cache", "Monday", "1pm")));
        });

        tuesdayAgendaItems.doOnError(t -> {
            model.addAttribute("agendaItemsTuesday", Collections.singletonList(new AgendaItem("1", "Cached Author", "Bring Tuesday Agenda Item from Cache", "Tuesday", "1pm")));
        });

        model.addAttribute("version", "v" + version);
        model.addAttribute("podId", podId);
        model.addAttribute("podNamepsace", podNamespace);
        model.addAttribute("podNodeName", podNodeName);

        return Mono.zipDelayError(agendaServiceInfo, c4PServiceInfo, mondayAgendaItems, tuesdayAgendaItems)
                .onErrorResume(
                        (t) -> {
                            t.printStackTrace();
                            log.info("Agenda Service Not available hence returning from cache.");
                            List<AgendaItem> agendaItemsMonday = Collections.singletonList(new AgendaItem("1", "Cached Author", "Bring Monday Agenda Item from Cache", "Monday", "1pm"));
                            List<AgendaItem> agendaItemsTuesday = Collections.singletonList(new AgendaItem("2", "Cached Author", "Bring Tuesday Agenda Item from Cache", "Tuesday", "1pm"));
                            model.addAttribute("agendaItemsMonday", agendaItemsMonday);
                            model.addAttribute("agendaItemsTuesday", agendaItemsTuesday);
                            return Mono.just(
                                    Tuples.of(
                                            new ServiceInfo("Agenda Service", "N/A", "N/A"),
                                            new ServiceInfo("C4P Service", "N/A", "N/A"),
                                            agendaItemsMonday,
                                            agendaItemsTuesday));
                        }
                )
                .map(t -> {

                    model.addAttribute("agenda", t.getT1());
                    model.addAttribute("c4p", t.getT2());
                    model.addAttribute("agendaItemsMonday", t.getT3());
                    model.addAttribute("agendaItemsTuesday", t.getT4());


                    return "index";
                });


    }

    public Mono<ServiceInfo> getEmailServiceInfo() {
        WebClient.ResponseSpec emailInfoResponseSpec = webClient
                .get()
                .uri(EMAIL_SERVICE + "/info")
                .retrieve();

        return emailInfoResponseSpec.bodyToMono(ServiceInfo.class);
    }

    public Mono<ServiceInfo> getC4PServiceInfo() {
        WebClient.ResponseSpec c4pResponseSpec = webClient
                .get()
                .uri(C4P_SERVICE + "/info")
                .retrieve();

        return c4pResponseSpec.bodyToMono(ServiceInfo.class);
    }

    public Mono<List<Proposal>> getProposalsList(boolean pending) {
        WebClient.ResponseSpec c4pPendingResponseSpec = webClient
                .get()
                .uri(C4P_SERVICE + "/?pending=" + pending)
                .retrieve();

        return c4pPendingResponseSpec.bodyToMono(new ParameterizedTypeReference<List<Proposal>>() {
        });
    }

    @GetMapping("/backoffice")
    public Mono<String> backoffice(@RequestParam(value = "pending", required = false, defaultValue = "false") boolean pending, Model model) {

        log.info("Get Pending only: " + pending);
        log.info("Starting backoffice processing");

        Mono<ServiceInfo> emailServiceInfo = getEmailServiceInfo();

        Mono<ServiceInfo> c4pServiceInfo = getC4PServiceInfo();

        Mono<List<Proposal>> proposalsList = getProposalsList(pending);

        proposalsList.doOnError(e -> {
            List<Proposal> proposals = new ArrayList<>();
            proposals.add(new Proposal("Error",
                    "There is no Cache that can save you here.",
                    "Call your System Administrator",
                    false, Proposal.ProposalStatus.ERROR));
            model.addAttribute("proposals", proposals);
        });

        model.addAttribute("version", "v" + version);
        model.addAttribute("podId", podId);
        model.addAttribute("podNamepsace", podNamespace);
        model.addAttribute("podNodeName", podNodeName);
        model.addAttribute("pending", (pending) ? "checked" : "");

        return Mono.zipDelayError(emailServiceInfo, c4pServiceInfo, proposalsList)
                .onErrorResume(
                        (t) -> {
                            t.printStackTrace();
                            log.info("C4P Service Not available hence returning from cache.");
                            List<Proposal> proposals = new ArrayList<>();
                            proposals.add(new Proposal("Error",
                                    "There is no Cache that can save you here.",
                                    "Call your System Administrator",
                                    false, Proposal.ProposalStatus.ERROR));
                            model.addAttribute("proposals", proposals);

                            return Mono.just(
                                    Tuples.of(
                                            new ServiceInfo("Email Service", "N/A", "N/A"),
                                            new ServiceInfo("C4P Service", "N/A", "N/A"),
                                            proposals));
                        }
                )
                .map(tuple -> {
                    model.addAttribute("email", tuple.getT1());
                    model.addAttribute("c4p", tuple.getT2());
                    model.addAttribute("proposals", tuple.getT3());
                    return "backoffice";
                });

    }


    class LoggingFilter implements GlobalFilter {
        Log log = LogFactory.getLog(getClass());

        @Override
        public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
            Set<URI> uris = exchange.getAttributeOrDefault(GATEWAY_ORIGINAL_REQUEST_URL_ATTR, Collections.emptySet());
            String originalUri = (uris.isEmpty()) ? "Unknown" : uris.iterator().next().toString();
            Route route = exchange.getAttribute(GATEWAY_ROUTE_ATTR);
            URI routeUri = exchange.getAttribute(GATEWAY_REQUEST_URL_ATTR);
            log.info("Incoming request " + originalUri + " is routed to id: " + route.getId()
                    + ", uri:" + routeUri);
            return chain.filter(exchange);
        }
    }

}
