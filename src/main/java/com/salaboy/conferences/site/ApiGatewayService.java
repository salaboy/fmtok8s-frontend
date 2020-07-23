package com.salaboy.conferences.site;

import com.salaboy.conferences.site.models.AgendaItem;
import com.salaboy.conferences.site.models.Proposal;
import com.salaboy.conferences.site.models.ServiceInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@SpringBootApplication
public class ApiGatewayService {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayService.class, args);
    }

}

@Controller
class ConferenceSiteController {
    @Value("${version:0}")
    private String version;

    @GetMapping("/info")
    public String infoWithVersion() {
        return "{ \"name\" : \"API Gateway / User Interface\", \"version\" : \"" + version + "\", \"source\": \"https://github.com/salaboy/fmtok8s-api-gateway/releases/tag/v"+version+"\" }";
    }

    @Value("${C4P_SERVICE:http://fmtok8s-c4p}")
    private String C4P_SERVICE;

    @Value("${EMAIL_SERVICE:http://fmtok8s-email}")
    private String EMAIL_SERVICE;

    @Value("${AGENDA_SERVICE:http://fmtok8s-agenda}")
    private String AGENDA_SERVICE;

    private RestTemplate restTemplate = new RestTemplate();

    @PostMapping
    public void test(){
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
        for(String content : proposals) {
            HttpEntity<String> request =
                    new HttpEntity<String>(content, headers);


            String personResultAsJsonStr =
                    restTemplate.postForObject(C4P_SERVICE + "/", request, String.class);
        }
    }

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
            ResponseEntity<ServiceInfo> sponsors = restTemplate.getForEntity(C4P_SERVICE + "/info", ServiceInfo.class);
            c4pInfo = sponsors.getBody();
        } catch (Exception e) {
            e.printStackTrace();
        }

        ResponseEntity<List<AgendaItem>> agendaItemsMonday = null;
        ResponseEntity<List<AgendaItem>> agendaItemsTuesday = null;

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


        model.addAttribute("version", version);
        model.addAttribute("agenda", agendaInfo);
        model.addAttribute("c4pURL", C4P_SERVICE);
        model.addAttribute("agendaURL", AGENDA_SERVICE);
        model.addAttribute("c4p", c4pInfo);


        if (agendaItemsMonday != null) {
            model.addAttribute("agendaItemsMonday", agendaItemsMonday.getBody());
        }
        if (agendaItemsMonday != null) {
            model.addAttribute("agendaItemsTuesday", agendaItemsTuesday.getBody());
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

        ResponseEntity<List<Proposal>> proposals = null;

        try {
            proposals = restTemplate.exchange(C4P_SERVICE + "/?pending=" + pending, HttpMethod.GET, null, new ParameterizedTypeReference<List<Proposal>>() {
            });
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            ResponseEntity<ServiceInfo> c4p = restTemplate.getForEntity(C4P_SERVICE + "/info", ServiceInfo.class);
            c4pInfo = c4p.getBody();
        } catch (Exception e) {
            e.printStackTrace();
        }

        model.addAttribute("version", version);
        model.addAttribute("c4pURL", C4P_SERVICE);
        model.addAttribute("email", emailInfo);
        model.addAttribute("c4p", c4pInfo);
        model.addAttribute("pending", (pending) ? "checked" : "");

        if (proposals != null) {
            model.addAttribute("proposals", proposals.getBody());
        }

        return "backoffice";
    }

}
