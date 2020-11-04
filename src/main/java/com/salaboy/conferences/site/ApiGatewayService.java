package com.salaboy.conferences.site;

import com.salaboy.conferences.site.models.AgendaItem;
import com.salaboy.conferences.site.models.Proposal;
import com.salaboy.conferences.site.models.ServiceInfo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import static org.springframework.cloud.gateway.support.ServerWebExchangeUtils.*;

@SpringBootApplication
public class ApiGatewayService {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayService.class, args);
    }

}

@RestController()
@RequestMapping("/api/")
@Slf4j
class ConferenceSiteUtilController {

    private RestTemplate restTemplate = new RestTemplate();

    @Value("${C4P_SERVICE:http://fmtok8s-c4p}")
    private String C4P_SERVICE;

    @GetMapping("agendaNotAvailable")
    public ServiceInfo agendaGetNotAvailable() {
        log.info(">> agendaGetNotAvailable fallback kicking in.");
        return new ServiceInfo("Agenda Service", "N/A");
    }

    @PostMapping("agendaNotAvailable")
    public ServiceInfo agendaPostNotAvailable() {
        log.info(">> agendaPostNotAvailable fallback kicking in.");
        return new ServiceInfo("Agenda Service", "N/A");
    }

    @GetMapping("c4pNotAvailable")
    public ServiceInfo c4pGetNotAvailable() {
        log.info(">> c4pGetNotAvailable fallback kicking in.");
        return new ServiceInfo("C4P Service", "N/A");
    }

    @PostMapping("c4pNotAvailable")
    public ServiceInfo c4pPostNotAvailable() {
        log.info(">> c4pPostNotAvailable fallback kicking in.");
        return new ServiceInfo("C4P Service", "N/A");
    }

    @PostMapping("emailNotAvailable")
    public ServiceInfo emailPostNotAvailable() {
        log.info(">> emailPostNotAvailable fallback kicking in.");
        return new ServiceInfo("Email Service", "N/A");
    }

    @GetMapping("emailNotAvailable")
    public ServiceInfo emailGetNotAvailable() {
        log.info(">> emailGetNotAvailable fallback kicking in.");
        return new ServiceInfo("Email Service", "N/A");
    }


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
            HttpEntity<String> request =
                    new HttpEntity<String>(content, headers);
            restTemplate.postForObject(C4P_SERVICE, request, String.class);
        }
    }
}

@Controller
class ConferenceSiteController {
    @Value("${version:0.0.0}")
    private String version;

    @Value("${C4P_SERVICE:http://fmtok8s-c4p}")
    private String C4P_SERVICE;

    @Value("${EMAIL_SERVICE:http://fmtok8s-email}")
    private String EMAIL_SERVICE;

    @Value("${AGENDA_SERVICE:http://fmtok8s-agenda}")
    private String AGENDA_SERVICE;

    @GetMapping("/info")
    public String infoWithVersion() {
        return "{ \"name\" : \"API Gateway / User Interface\", \"version\" : \"v" + version + "\", \"source\": \"https://github.com/salaboy/fmtok8s-api-gateway/releases/tag/v" + version + "\" }";
    }


    private RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/")
    public String index(Model model) {
        ServiceInfo agendaInfo = null;
        ServiceInfo c4pInfo = null;

        try {
            ResponseEntity<ServiceInfo> agenda = restTemplate.getForEntity(AGENDA_SERVICE + "/info", ServiceInfo.class);
            agendaInfo = agenda.getBody();

        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            ResponseEntity<ServiceInfo> c4p = restTemplate.getForEntity(C4P_SERVICE + "/info", ServiceInfo.class);
            c4pInfo = c4p.getBody();
        } catch (Exception e) {
            e.printStackTrace();
        }

        ResponseEntity<List<AgendaItem>> agendaItemsMonday = null;
        ResponseEntity<List<AgendaItem>> agendaItemsTuesday = null;

        if (agendaInfo != null && !agendaInfo.getVersion().equals("N/A")) {

            try {
                agendaItemsMonday = restTemplate.exchange(AGENDA_SERVICE + "/day/Monday", HttpMethod.GET, null, new ParameterizedTypeReference<List<AgendaItem>>() {
                });
            } catch (Exception e) {
                e.printStackTrace();
            }

            try {
                agendaItemsTuesday = restTemplate.exchange(AGENDA_SERVICE + "/day/Tuesday", HttpMethod.GET, null, new ParameterizedTypeReference<List<AgendaItem>>() {
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        model.addAttribute("version", "v" + version);
        model.addAttribute("agenda", agendaInfo);
        model.addAttribute("c4p", c4pInfo);


        if (agendaItemsMonday != null) {
            model.addAttribute("agendaItemsMonday", agendaItemsMonday.getBody());
        } else {
            List<AgendaItem> cacheMonday = new ArrayList<>();
            cacheMonday.add(new AgendaItem("1", "Cached Author", "Bring Monday Agenda Item from Cache", "Monday", "1pm"));
            model.addAttribute("agendaItemsMonday", cacheMonday);
        }
        if (agendaItemsMonday != null) {
            model.addAttribute("agendaItemsTuesday", agendaItemsTuesday.getBody());
        } else {
            List<AgendaItem> cacheTuesday = new ArrayList<>();
            cacheTuesday.add(new AgendaItem("1", "Cached Author", "Bring Tuesday Agenda Item from Cache", "Tuesday", "1pm"));
            model.addAttribute("agendaItemsTuesday", cacheTuesday);
        }

        return "index";
    }

    @GetMapping("/backoffice")
    public String backoffice(@RequestParam(value = "pending", required = false, defaultValue = "false") boolean pending, Model model) {
        ServiceInfo emailInfo = null;
        ServiceInfo c4pInfo = null;

        System.out.println("Get Pending only: " + pending);

        try {
            ResponseEntity<ServiceInfo> email = restTemplate.getForEntity(EMAIL_SERVICE + "/info", ServiceInfo.class);
            emailInfo = email.getBody();
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            ResponseEntity<ServiceInfo> c4p = restTemplate.getForEntity(C4P_SERVICE + "/info", ServiceInfo.class);
            c4pInfo = c4p.getBody();
        } catch (Exception e) {
            e.printStackTrace();
        }

        List<Proposal> proposals = null;

        if (c4pInfo != null && !c4pInfo.getVersion().equals("N/A")) {
            try {
                proposals = restTemplate.exchange(C4P_SERVICE + "/?pending=" + pending, HttpMethod.GET, null, new ParameterizedTypeReference<List<Proposal>>() {
                }).getBody();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            proposals = new ArrayList<>();
            proposals.add(new Proposal("Error", "There is no Cache that can save you here.", "Call your System Administrator", false, Proposal.ProposalStatus.ERROR));
        }
        model.addAttribute("version", "v" + version);
        model.addAttribute("email", emailInfo);
        model.addAttribute("c4p", c4pInfo);
        model.addAttribute("pending", (pending) ? "checked" : "");

        if (proposals != null) {
            model.addAttribute("proposals", proposals);
        }

        return "backoffice";
    }


//    class LoggingFilter implements GlobalFilter {
//        Log log = LogFactory.getLog(getClass());
//
//        @Override
//        public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
//            Set<URI> uris = exchange.getAttributeOrDefault(GATEWAY_ORIGINAL_REQUEST_URL_ATTR, Collections.emptySet());
//            String originalUri = (uris.isEmpty()) ? "Unknown" : uris.iterator().next().toString();
//            Route route = exchange.getAttribute(GATEWAY_ROUTE_ATTR);
//            URI routeUri = exchange.getAttribute(GATEWAY_REQUEST_URL_ATTR);
//            log.info("Incoming request " + originalUri + " is routed to id: " + route.getId()
//                    + ", uri:" + routeUri);
//            return chain.filter(exchange);
//        }
//    }

}
